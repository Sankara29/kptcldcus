
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Accordion, AccordionItem, AccordionHeader, AccordionBody, Table, ModalFooter } from 'reactstrap';
import { Info, Search } from 'react-feather';
import NodeDataGrid from './pop';
import dayjs from 'dayjs';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FileText } from "react-feather";
import Loader from './Loader.js';
import CommandModal from './CommandModal.js';
import API_URL from '../../../config.js';


const NodeList = () => {
    const gridRef = useRef();
    const [data, setData] = useState([]);

    // --- First modal: show meters ---
    const [modalMetersOpen, setModalMetersOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [nodeMeters, setNodeMeters] = useState([]);

    // --- Second modal: show meter details ---
    const [modalDetailOpen, setModalDetailOpen] = useState(false);
    const [selectedMeter, setSelectedMeter] = useState(null);
    const [selectedType, setSelectedType] = useState('instantaneous');
    const [communicationData, setCommunicationData] = useState(null);

    // --- Accordion state ---
    const [openOuter, setOpenOuter] = useState(null);
    const [openNode, setOpenNode] = useState(null);
    const [openMeters, setOpenMeters] = useState(null);

    // --- Remark modal state ---
    const [modalRemarkOpen, setModalRemarkOpen] = useState(false);
    const [selectedNodeForRemark, setSelectedNodeForRemark] = useState(null);
    const [remarkInput, setRemarkInput] = useState('');

    // --- Open remark modal ---
    const openRemarkModal = (node) => {
        setSelectedNodeForRemark(node);
        setRemarkInput(node.remark || ''); // Pre-fill if exists
        setModalRemarkOpen(true);
    };

    // --- Close remark modal ---
    const closeRemarkModal = () => {
        setModalRemarkOpen(false);
        setSelectedNodeForRemark(null);
        setRemarkInput(''); xl
    };

    // --- Submit remark ---
    const submitRemark = async () => {
        if (!selectedNodeForRemark || !remarkInput.trim()) {
            alert('Please enter a remark.'); // Or use toast/error handling
            return;
        }

        // Update local data state
        // setData(prevData =>
        //     prevData.map(item =>
        //         item.node_id === selectedNodeForRemark.node_id
        //             ? { ...item, remark: remarkInput.trim() }
        //             : item
        //     )
        // );

        // TODO: Optionally save to API, e.g.,
        await fetch('https://api.ms-tech.in/v11/addRemark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dcu_id: selectedNodeForRemark.node_id,
                remark: remarkInput.trim()
            })
        });


        closeRemarkModal();
        fetchData()
        // Optional: Show success message
        // alert('Remark saved successfully!');
    };

    const toggleOuter = (id) => setOpenOuter(openOuter === id ? null : id);
    const toggleNode = (id) => setOpenNode(openNode === id ? null : id);
    const toggleMeters = (id) => setOpenMeters(openMeters === id ? null : id);

    const [searchText, setSearchText] = useState('');

    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [imageList, setImageList] = useState([]);

    const toggleImageModal = () => setImageModalOpen(!imageModalOpen);

    // const fetchData = async () => {
    //     try {


    //         const res = await fetch('https://testpms.ms-tech.in/v23/node-status-customer');
    //         if (!res.ok) throw new Error(res.statusText);
    //         const json = await res.json() || {};
    //         const commData = json.data || []

    //         setData(commData);
    //     } catch (error) {
    //         console.error("Error fetching nodes with meters or TM:", error);
    //         setData([]);
    //     }
    // };

    const fetchData = async () => {
        try {
            // 1️⃣ Get all nodes first
            const res = await fetch('https://testpms.ms-tech.in/v23/node-status-customer');
            if (!res.ok) throw new Error(res.statusText);

            const json = await res.json() || {};
            const commData = json.data || [];

            // Separate keys by prefix (node_id starts with NSDCU40 or NSDCU70)
            const keys40 = commData
                .filter(item =>
                    item.node_id?.startsWith("NSDCU40") ||
                    item.node_id?.startsWith("NSDCU90")
                )
                .map(item => `v_${item.node_id}`);

            const keys70 = commData
                .filter(item => item.node_id?.startsWith("NSDCU70"))
                .map(item => `v_${item.node_id}`);

            let tmResults = {};

            // 2️⃣ Fetch for NSDCU40 (Series 4)
            if (keys40.length > 0) {
                const tmResponse = await fetch('https://api.ms-tech.in/v17/get-multiple-hashes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ keys: keys40, fields: ["tm", "REMARK", "cv"] })
                });

                const data40 = await tmResponse.json();
                for (const item of data40.data || []) {
                    const nodeId = item.key.replace(/^v_/, '');
                    tmResults[nodeId] = item.data.tm;
                    tmResults[nodeId + '_REMARK'] = item.data.REMARK || null;
                    tmResults[nodeId + '_cv'] = item.data.cv || null;
                }
            }


            // 3️⃣ Fetch for NSDCU70 (Series 7)
            if (keys70.length > 0) {
                const tmResponse = await fetch('https://api.ms-tech.in/v11/getdcutm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ keys: keys70, fields: ["tm", "REMARK"] })
                });

                const data70 = await tmResponse.json();

                for (const item of data70.data || []) {
                    const nodeId = item.key.replace(/^v_/, '');
                    tmResults[nodeId] = item.data.tm;
                    tmResults[nodeId + '_REMARK'] = item.data.REMARK || null;
                    tmResults[nodeId + '_cv'] = item.data.cv || null;
                }
            }

            // 4️⃣ Merge TM data into commData objects
            const mergedData = commData.map(node => ({
                ...node,
                tm: tmResults[node.node_id] || null,
                remark: tmResults[node.node_id + '_REMARK'] || null,
                cv: tmResults[node.node_id + '_cv'] || null
            }));

            setData(mergedData);
        } catch (error) {
            console.error("Error fetching nodes with meters or TM:", error);
            setData([]);
        }
    };




    useEffect(() => {
        fetchData();
    }, []);


    const [slno, setSlno] = useState(null);
    const openMetersModal = async (data) => {
        setSelectedNode(data.node_id);

        const meters = data.meters || [];


        setNodeMeters(meters);
        setSlno(data?.customer?.SLNO || null);
        openDetailModal(data.node_id, meters?.[0].meter_no, data?.customer?.SLNO)
        // setModalMetersOpen(true);
    };


    const closeMetersModal = () => {
        setModalMetersOpen(false);
        // setSelectedNode(null);
        setNodeMeters([]);
    };

    const MapButtonRenderer = (props) => {
        const data3 = props.value;

        if (!data3 || !data3.latitude || !data3.longitude) {
            return <span>No Map</span>;
        }

        const lat = data3.latitude;
        const lon = data3.longitude;

        const openMap = () => {
            const url = `https://www.google.com/maps?q=${lat},${lon}`;
            window.open(url, "_blank");
        };

        return (
            <Button
                onClick={openMap}
                size="sm"
                style={{ width: '100%', height: '100%' }}
            >
                View Map
            </Button>
        );
    };




    // --- Column definitions ---
    const columnDefs = useMemo(() => {
        if (!data || data.length === 0) return [];

        const cols = [
            { headerName: "NameIPP", field: "customer.NAMEOFIPP", flex: 2 },
            { headerName: "ESCOM", field: "customer.ESCOM", flex: 1 },
            { headerName: "IPPID", field: "customer.ID", flex: 1 },
            {
                headerName: 'installed_at',
                field: 'installed_at',
                flex: 1,
                valueFormatter: (params) => {
                    const value = params.value;
                    if (!value) return 'Not Communicated';

                    // Clean microseconds if present
                    let cleanedValue = value;
                    if (typeof value === 'string' && value.includes('.')) {
                        cleanedValue = value.split('.')[0]; // Remove everything after the decimal point
                    }

                    let date = dayjs(cleanedValue, 'YYYY-MM-DD HH:mm:ss', true);
                    if (!date.isValid()) {
                        date = dayjs(cleanedValue, 'YYYY-MM-DD', true);
                    }

                    return date.isValid() ? date.format('MMM-DD-YY') : 'Not Communicated';
                },
                exportValueGetter: (params) => {
                    const value = params.value;
                    if (!value) return 'Not Communicated';

                    // Clean microseconds if present
                    let cleanedValue = value;
                    if (typeof value === 'string' && value.includes('.')) {
                        cleanedValue = value.split('.')[0]; // Remove everything after the decimal point
                    }

                    let date = dayjs(cleanedValue, 'YYYY-MM-DD HH:mm:ss', true);
                    if (!date.isValid()) {
                        date = dayjs(cleanedValue, 'YYYY-MM-DD', true);
                    }

                    return date.isValid() ? date.format('YYYY-MM-DD') : 'Not Communicated';
                },
                filter: 'agDateColumnFilter',
                filterParams: {
                    suppressAndOrCondition: true,
                    browserDatePicker: true,
                    applyButton: true,
                    clearButton: true,
                    comparator: (filterDate, cellValue) => {
                        if (!cellValue) return -1;
                        const cellDate = dayjs(cellValue, 'YYYY-MM-DD HH:mm:ss').startOf('day');
                        const fDate = dayjs(filterDate).startOf('day');
                        if (!cellDate.isValid() || !fDate.isValid()) return 0;

                        if (cellDate.isBefore(fDate)) return -1;
                        if (cellDate.isAfter(fDate)) return 1;
                        return 0;
                    }
                }
            },
            {
                headerName: 'dcu_comm_status',
                field: 'tm',
                flex: 1,
                valueFormatter: (params) => {
                    const date = dayjs(params.value, 'MM/DD/YY HH:mm:ss');
                    return date.isValid() ? date.format('MMM-DD') : 'Not Communicated';
                },
                exportValueGetter: (params) => {
                    const date = dayjs(params.value, 'MM/DD/YY HH:mm:ss');
                    return date.isValid() ? date.format('YYYY-MM-DD') : 'Not Communicated';
                },
                filter: 'agDateColumnFilter',
                filterParams: {
                    // filterOptions: ['equals', 'notEqual'],
                    suppressAndOrCondition: true,
                    browserDatePicker: true,
                    applyButton: true,
                    clearButton: true,
                    comparator: (filterDate, cellValue) => {
                        if (!cellValue) return -1;
                        const cellDate = dayjs(cellValue, 'MM/DD/YY HH:mm:ss').startOf('day');
                        const fDate = dayjs(filterDate).startOf('day');
                        if (!cellDate.isValid() || !fDate.isValid()) return 0;

                        if (cellDate.isBefore(fDate)) return -1;
                        if (cellDate.isAfter(fDate)) return 1;
                        return 0;
                    }
                }
            },
            { headerName: "PLANT", field: "customer.PLANTTYPE", flex: 1 },
            { headerName: "CAPACITY", field: "customer.INSTALLEDCAPACITY_MW", flex: 1 },
            { headerName: 'DCU_ID', field: 'node_id', flex: 2 },
            {
                headerName: "Remark",
                flex: 2,
                valueGetter: (params) => {
                    const remark = params.data?.remark;
                    const customerRemark = params.data?.customer?.remarks;
                    return remark ?? customerRemark ?? "—";
                }
            },
            {
                headerName: 'Remark',
                cellRendererFramework: (params) => (
                    <Button
                        color="info"
                        size="sm"
                        style={{ width: '100%', height: '80%' }}
                        onClick={() => openRemarkModal(params.data)}
                    >
                        {params.data.REMARK ? 'Edit Remark' : 'Add Remark'}
                    </Button>
                ),
                flex: 1,
                cellStyle: { textAlign: 'center', padding: "6px", }
            },
            {
                headerName: "MAP",
                field: "customer.data3",
                // cellRenderer: MapButtonRenderer,
                cellRendererFramework: (params) => {
                    let data3 = params.value;

                    // Normalize:
                    // If array → take first element
                    // If object → keep it
                    if (Array.isArray(data3)) {
                        data3 = data3[0];
                    }

                    // Now safe checks
                    if (!data3 || !data3.latitude || !data3.longitude) {
                        return <span>No Map</span>;
                    }

                    const { latitude: lat, longitude: lon } = data3;

                    const openMap = () => {
                        const url = `https://www.google.com/maps?q=${lat},${lon}`;
                        window.open(url, "_blank");
                    };

                    return (
                        <Button
                            onClick={openMap}
                            size="sm"
                            style={{ width: '100%', height: '80%' }}
                        >
                            View Map
                        </Button>
                    );
                },
                flex: 1,
                cellStyle: { textAlign: 'center', padding: "6px", }
            },
            {
                headerName: "IMAGE",
                field: "customer.data3",
                cellRendererFramework: (params) => {
                    const data3 = params.value;

                    const openImage = () => {
                        // Normalize data
                        let images = [];
                        if (Array.isArray(data3)) {
                            images = data3;
                        } else if (data3) {
                            images = [data3];
                        }

                        setImageList(images);
                        setImageModalOpen(true);
                    };

                    return (
                        <Button
                            onClick={openImage}
                            size="sm"
                            style={{ width: '100%', height: '80%' }}
                        >
                            View Image
                        </Button>
                    );
                },
                flex: 1,
                cellStyle: { textAlign: 'center', padding: "6px", }
            }
            ,
            {
                headerName: 'Meter Details',
                cellRendererFramework: (params) => (
                    <Button
                        color="primary"
                        size="sm"
                        style={{ width: '100%', height: '80%' }}
                        onClick={() => openMetersModal(params.data)}
                    >
                        {/* <Info style={{ marginRight: '8px' }} /> */}
                        Meter details
                    </Button>
                ),
                flex: 1,
                cellStyle: { textAlign: 'center', padding: "6px", }
            },
        ];
        return cols;
    }, [data]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        flex: 1,
        resizable: true,
        wrapHeaderText: true, // for AG Grid Enterprise >= 27
        autoHeaderHeight: true, // Touch/drag resize
        filterParams: { buttons: ['apply', 'reset'] },
        minWidth: 80,
        cellStyle: {
            whiteSpace: "normal",   // allow wrapping
            lineHeight: "20px"
        },
        autoHeight: true
    }), []);

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        gridRef.current.api.setQuickFilter(value); // AG Grid built-in search
    };
    const totalNodes = communicationData?.total_nodes || 0;
    const communicatedNodes = communicationData?.communicated_nodes || 0;
    const successRate = totalNodes ? ((communicatedNodes / totalNodes) * 100).toFixed(0) : 0;

    const openDetailModal = (selectedNode, meterNumber) => {
        setSelectedMeter(meterNumber);
        setModalDetailOpen(true);
        setSelectedNode(selectedNode); // ensure node is set
    };

    const closeDetailModal = () => {
        setModalDetailOpen(false);
        setSelectedMeter(null);
        // setSelectedNode(null);
    };
    const todayDate = dayjs().format('MM/DD/YY'); // today in same format as tm
    const todaysGettimeCount = data?.filter(node => {
        if (!node.tm) return false;
        // Compare only date part
        return dayjs(node.tm, 'MM/DD/YY HH:mm:ss').format('MM/DD/YY') === todayDate;
    }).length || 0;

    const dcualivecount = totalNodes ? ((todaysGettimeCount / totalNodes) * 100).toFixed(0) : 0;
    const exportToExcel = (data, filename) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, `${filename}.xlsx`);
    };
    const date = dayjs().format('YYYY-MM-DD');
    const gridOptions = {
        getRowStyle: (params) => {
            const meters = params.data?.meters || [];

            // Check if all meters have data_today true
            const allTrue = meters.length > 0 && meters.every(m => m.data_today === true);

            return {
                backgroundColor: allTrue ? 'white' : '#ffe5e5', // light red background if any false
            };
        },
    };

    const [openOndemand, setOpenOndemand] = useState(false);
    const handleOndemand = (meterNo) => {
        setSelectedMeter(meterNo);
        setOpenOndemand(true); // This will open the Ondemand modal or page
    }
    const [showCommands, setModalShowCommands] = useState(false);
    const [showMapp, setModalShowMap] = useState(false);

    const handleShowCommands = () => {
        setModalShowCommands(true);
    };

    const handleCloseCommandModal = () => {
        setModalShowCommands(false);
    };

    const handleShowMap = () => {
        setModalShowMap(true);
    }

    const handleCloseMapModal = () => {
        setModalShowMap(false);
    }
  const downloadExcel = () => {

    // ⭐ Add your flattenRow function inside here (or outside globally)
    const flattenRow = (row) => {
        const firstImg = row.customer?.data3?.[0];

        return {
            node_id: row.node_id,
            SLNO: row.customer?.SLNO || "",
            IPPID: row.customer?.ID || "",
            ESCOM: row.customer?.ESCOM || "",
            NAMEOFIPP: row.customer?.NAMEOFIPP || "",
            PLANTTYPE: row.customer?.PLANTTYPE || "",
            INSTALLEDCAPACITY_MW: row.customer?.INSTALLEDCAPACITY_MW || "",
            installed_at: row.installed_at || "",

            meter_numbers: row.meters?.map(m => m.meter_no).join(", ") || "",

            // ⭐ Location added
            location: firstImg
                ? `${firstImg.latitude}, ${firstImg.longitude}`
                : "",

            remarks: row.customer?.REMARK || ""
        };
    };

    // ⭐ Build formatted rows
    const rowData = [];
    gridRef.current.api.forEachNode((node) => {
        rowData.push(flattenRow(node.data)); // <-- IMPORTANT
    });

    exportToExcel(rowData, `IPP_Consumers_Wise_DCU_List_${date}`);
};
const handleDataPop=(node_id)=>{
    const nodeData=data.find(item=>item.node_id===node_id);
    setSelectedNode(node_id);

        const meters = nodeData.meters || [];


        setNodeMeters(meters);
        setSlno(nodeData?.customer?.SLNO || null);
        openDetailModal(nodeData.node_id, meters?.[0].meter_no, nodeData?.customer?.SLNO)

}
    
    return (
        <div className="container-fluid mt-3">
            <h1 className="mb-3">IPP Consumers Wise DCU List</h1>

            {/* 🔍 Search bar */}
            <div className="d-flex align-items-center mb-3">
                {/* <Search size={18} style={{ marginRight: '8px' }} /> */}
                <Input
                    type="text"
                    placeholder="Search Anything..."
                    value={searchText}
                    onChange={onSearchChange}
                    style={{ maxWidth: '300px' }}
                />
                <Button
                    color="success"
                    className="ms-3"
                    onClick={() => handleShowMap()}
                >

                    View Map
                </Button>
                   <Button
                    color="success"
                    className="ms-3"
                    onClick={() => downloadExcel()}
                >

                    Download Excel
                </Button>
                {/* <Button
                    color="success"
                    className="ms-3"
                    onClick={() => handleShowCommands()}
                >

                    Ondemand Commands
                </Button> */}
            </div>






            <div className="ag-theme-alpine" style={{ height: 'calc(100vh - 200px)', width: '98%' }}>
                {data.length > 0 ? (
                    <AgGridReact
                        ref={gridRef}
                        rowData={data}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        animateRows
                        rowSelection="multiple"
                        pagination
                        paginationPageSize={12}
                        gridOptions={gridOptions}
                        getRowStyle={gridOptions.getRowStyle}
                        suppressHorizontalScroll
                        rowHeight={null}
                    />
                ) : (
                    <Loader />
                )}
            </div>

            {/* First Modal: show meters with numbers */}
            <Modal size="md" isOpen={modalMetersOpen} toggle={closeMetersModal}>
                <ModalHeader toggle={closeMetersModal}>
                    Node Meters - {selectedNode}
                </ModalHeader>
                <ModalBody>
                    {nodeMeters.length > 0 ? (
                        <div>
                            {nodeMeters.map(({ meter_no, customer, value }, index) => (
                                <div
                                    key={meter_no}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '8px',
                                        padding: '4px 8px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <span>meter{index + 1}</span>
                                    <Button
                                        color="secondary"
                                        size="sm"
                                        onClick={() => openDetailModal(meter_no, selectedNode)} // send only meter number
                                    >
                                        {meter_no}
                                    </Button>
                                    <Button
                                        color="secondary"
                                        size="sm"
                                        onClick={() => handleOndemand(meter_no)}
                                    >
                                        On Demand
                                    </Button>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No meters found for this node.</p>
                    )}
                </ModalBody>
            </Modal>

            {/* Second Modal: detailed NodeDataGrid */}
            <Modal size="xl" isOpen={modalDetailOpen} toggle={closeDetailModal}>
                <ModalHeader toggle={closeDetailModal}>
                    Meter Details - {selectedMeter} (Node: {selectedNode})
                </ModalHeader>
                <ModalBody>
                    {selectedMeter && (
                        <NodeDataGrid
                            node_id={selectedNode}
                            meter_id={selectedMeter}
                            type={selectedType}
                            nodeMeters={nodeMeters}
                            slno={slno}
                        />
                    )}
                </ModalBody>
            </Modal>

            {/* Remark Modal */}
            <Modal isOpen={modalRemarkOpen} toggle={closeRemarkModal}>
                <ModalHeader toggle={closeRemarkModal}>
                    Remark for Node: {selectedNodeForRemark?.node_id}
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="textarea"
                        placeholder="Enter remark..."
                        value={remarkInput}
                        onChange={(e) => setRemarkInput(e.target.value)}
                        rows={4}
                    />
                    <div className="d-flex justify-content-end mt-3">
                        <Button color="secondary" className="me-2" onClick={closeRemarkModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={submitRemark}>
                            Submit
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
            <CommandModal isOpen={openOndemand} toggle={() => setOpenOndemand(false)} meterNo={selectedMeter} dcu_id={selectedNode} />
            {showCommands && <CommandModals
                isOpen={showCommands}
                toggle={handleCloseCommandModal} />}

            <Modal isOpen={imageModalOpen} toggle={toggleImageModal} size="lg">
                <ModalHeader toggle={toggleImageModal}>
                    Images
                </ModalHeader>

                <ModalBody>
                    {imageList.length === 0 && (
                        <div>No Images Found</div>
                    )}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "10px",
                        }}
                    >
                        {imageList.map((img, index) => {
                            const imgUrl = `https://testhotel2.prysmcable.com/v24/images/${img.documentID}`;
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "5px",
                                        borderRadius: "6px",
                                        textAlign: "center"
                                    }}
                                >
                                    <img
                                        src={imgUrl}
                                        alt="Document"
                                        style={{
                                            width: "100%",
                                            height: "180px",
                                            objectFit: "cover",
                                            borderRadius: "5px"
                                        }}
                                    />
                                    {/* <div style={{ marginTop: "5px", fontSize: "12px" }}>
                                        Type: {img.imagetype}
                                    </div> */}
                                </div>
                            );
                        })}
                    </div>
                </ModalBody>
                {/* 
                <ModalFooter>
                    <Button color="secondary" onClick={toggleImageModal}>
                        Close
                    </Button>
                </ModalFooter> */}
            </Modal>

            <Modal isOpen={showMapp} toggle={handleCloseMapModal} size="xl">
                <ModalHeader toggle={handleCloseMapModal}>
                    DCU Map View
                </ModalHeader>
                <ModalBody>
                    <CustomerMap data={data} handleDataPop={handleDataPop}/>
                </ModalBody>
            </Modal>


        </div>
    );
};

export default NodeList;




const CommandModals = ({ isOpen, toggle }) => {
    const [commands, setCommands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;   // You can make this dynamic

    useEffect(() => {
        const fetchCommands = async () => {
            try {
                const res = await fetch(`${API_URL}/get-commands-by-dcu`);
                const data = await res.json();
                if (data.success) {
                    setCommands(data.data);
                    setCurrentPage(1);
                } else {
                    setCommands([]);
                }
            } catch (err) {
                console.error('Failed to fetch commands', err);
                setCommands([]);
            }
        };

        if (isOpen) {
            fetchCommands();
        }
    }, [isOpen]);

    // Pagination calculations
    const totalPages = Math.ceil(commands.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentPageData = commands.slice(startIndex, startIndex + rowsPerPage);

    const goPrev = () => setCurrentPage(p => Math.max(p - 1, 1));
    const goNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="xl">
            <ModalHeader toggle={toggle}>
                Previous On-Demand Commands & Status
            </ModalHeader>
            <ModalBody>
                <Table bordered striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Meter No</th>
                            <th>DCU_ID</th>
                            <th>Command</th>
                            <th>Created At</th>
                            <th>Acknowledged_at</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((cmd, index) => (
                            <tr key={cmd.id}>
                                <td>{startIndex + index + 1}</td>
                                <td>{cmd.meter_no}</td>
                                <td>{cmd.dcu_id}</td>
                                <td>{cmd.ondemand_data}</td>
                                <td>{new Date(cmd.created_at).toLocaleString()}</td>
                                <td>{cmd.acknowledged_at ? new Date(cmd.acknowledged_at).toLocaleString() : 'N/A'}</td>
                                <td>{cmd.status}</td>
                            </tr>
                        ))}

                        {currentPageData.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-muted">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                        className="btn btn-secondary"
                        disabled={currentPage === 1}
                        onClick={goPrev}
                    >
                        Prev
                    </button>

                    <span>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        className="btn btn-secondary"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={goNext}
                    >
                        Next
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};








import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "800px" };

const defaultCenter = { lat: 15.3173, lng: 75.7139 }; // India center

const isToday = (tmString) => {
    if (!tmString) return false;

    const tmDate = dayjs(tmString);
    if (!tmDate.isValid()) {
        console.error("Invalid date format for tm:", tmString);
        return false;
    }

    const today = dayjs();
    // Compare only the date parts as strings to avoid timezone/time issues
    return tmDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD');
};


const CustomerMap = ({ data,handleDataPop }) => {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [seriesFilter, setSeriesFilter] = useState('all');
    const [comm,setComm]=useState("all") // 'all', 'NSDCU9', 'NSDCU7', 'NSDCU4'

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBcVEASQUZyZzPauv09vgorl5Lr990eRyU",
    });

    // Filter only by DCU Series (node_id prefix)
     const filteredData = data?.filter(({ node_id, tm }) => {
        // DCU Series filter
        if (seriesFilter !== 'all' && !node_id?.startsWith(seriesFilter)) {
            return false;
        }

        // Communication filter
        if (comm !== 'all') {
            const isCommunicated = isToday(tm);
            if (comm === 'communicated' && !isCommunicated) return false;
            if (comm === 'not-communicated' && isCommunicated) return false;
        }

        return true;
    });
  

    if (!isLoaded) return <div>Loading Map…</div>;

    return (
        <div>
            {/* DCU Series Filter */}
            <div style={{
                marginBottom: 16,
                padding: 12,
                backgroundColor: '#f8f9fa',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap'
            }}>
                <div>
                    <label style={{ fontWeight: 'bold', marginRight: 10 }}>DCU Series:</label>
                    <select
                        value={seriesFilter}
                        onChange={(e) => setSeriesFilter(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            fontSize: '14px',
                            borderRadius: '6px',
                            border: '1px solid #ccc'
                        }}
                    >
                        <option value="all">All Series</option>
                        <option value="NSDCU9">NSDCU9 Series</option>
                        <option value="NSDCU7">NSDCU7 Series</option>
                        <option value="NSDCU4">NSDCU4 Series</option>
                    </select>
                </div>

                <div>
        <label style={{ fontWeight: 'bold', marginRight: 10 }}>Comm Status:</label>
        <select
            value={comm}  // reusing the same state name (now means comm status)
            onChange={(e) => setComm(e.target.value)}
            style={{
                padding: '8px 12px',
                fontSize: '14px',
                borderRadius: '6px',
                border: '1px solid #ccc'
            }}
        >
            <option value="all">All DCUs</option>
            <option value="communicated">Communicated Today (Green)</option>
            <option value="not-communicated">Not Communicated Today (Red)</option>
        </select>
    </div> 

                <div style={{ color: '#555', fontSize: '14px' }}>
                    Showing: <strong>{filteredData?.length || 0}</strong> DCUs
                </div>
            </div>

            <GoogleMap
            key={`${seriesFilter}-${comm}`}
                mapContainerStyle={containerStyle}
                zoom={6}
                center={defaultCenter}
            >
                {filteredData?.map(({ customer, tm, node_id, index }) => {
                    const d = customer?.data3;
                    if (!d) return null;

                    const first = Array.isArray(d) ? d[0] : d;
                    if (!first) return null;

                    const lat = parseFloat(first.latitude);
                    const lng = parseFloat(first.longitude);
                    if (isNaN(lat) || isNaN(lng)) return null;
const markerColor = isToday(tm)
                        ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                        : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
                  
                    return (
                        <Marker
                            key={`marker-${index}`}
                            position={{ lat, lng }}
                            icon={markerColor}
                            onClick={() =>
                                setSelectedMarker({
                                    ...first,
                                    customer,
                                    tm,
                                    node_id
                                })
                            }
                        />
                    );
                })}

                {/* Info Window */}
                {selectedMarker && (
                    <InfoWindow
                        position={{
                            lat: parseFloat(selectedMarker.latitude),
                            lng: parseFloat(selectedMarker.longitude),
                        }}
                        onCloseClick={() => setSelectedMarker(null)}
                    >
                        <div style={{ maxWidth: 280, fontSize: '14px' }}>
                            <h3 style={{ margin: '0 0 8px 0', color: '#1a73e8' }}>
                                {selectedMarker.customer.NAMEOFIPP}
                            </h3>
                            <p style={{ margin: '4px 0' }}><b>ESCOM:</b> {selectedMarker.customer.ESCOM}</p>
                            <p style={{ margin: '4px 0' }}><b>Capacity:</b> {selectedMarker.customer.INSTALLEDCAPACITY_MW} MW</p>
                            <p style={{ margin: '4px 0' }}><b>SL No:</b> {selectedMarker.customer.SLNO}</p>
                            <p style={{margin: '4px 0' }}><b>PLANTTYPE:</b> {selectedMarker.customer.PLANTTYPE || 'Not Communicated'}</p>
                            <p style={{ margin: '4px 0' }}><b>Last Update:</b> {selectedMarker.tm || 'Never'}</p>
                            <p style={{ margin: '6px 0', padding: '6px 8px', backgroundColor: '#e8f0fe', borderRadius: 4 ,cursor:"pointer"}} onClick={()=>{handleDataPop(selectedMarker.node_id);}}>
                                <b>DCU ID:</b> {selectedMarker.node_id}
                            </p>
                            <button style={{
                                marginTop: 10,
                                padding: '8px 16px',
                                backgroundColor: '#4285F4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                width: '100%'
                            }}>
                                <a
                                    href={`https://www.google.com/maps?q=${selectedMarker.latitude},${selectedMarker.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: 'white' }}
                                >
                                    Open in Google Maps
                                </a>
                            </button>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
    );
};


// const CustomerMap = ({ data }) => {
//     const [selectedMarker, setSelectedMarker] = useState(null);
//     const [filter, setFilter] = useState('all');

//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey: "AIzaSyBcVEASQUZyZzPauv09vgorl5Lr990eRyU",
//     });
//     const filteredData = data?.filter(({ tm }) => {
//         if (filter === 'all') return true;
//         const isCommunicated = isToday(tm);

//         return filter === 'communicated' ? isCommunicated : !isCommunicated;
//     });
//     if (!isLoaded) return <div>Loading Map…</div>;
//     console.log("Map data:99999", filteredData);

//     return (
//         <div>
//             <div style={{ marginBottom: 10, display: 'flex', gap: 10 }}>
               
//             </div>
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 zoom={6}
//                 center={defaultCenter}
//             >
//                 {filteredData?.map(({ customer, tm, node_id, index, }) => {
//                     const d = customer?.data3;

//                     // If no data3 → skip
//                     if (!d) return null;

//                     // Normalize to a single object
//                     const first =
//                         Array.isArray(d) ? d[0] : d;


//                     if (!first) return null;

//                     const lat = parseFloat(first.latitude);
//                     const lng = parseFloat(first.longitude);

//                     if (!lat || !lng) return null;

//                     const markerColor = isToday(tm)
//                         ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
//                         : "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
//                     // const markerColor = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

//                     return (
//                         <Marker
//                             key={`marker-${index}`}
//                             position={{ lat, lng }}
//                             icon={markerColor}
//                             onClick={() =>
//                                 setSelectedMarker({
//                                     ...first,
//                                     customer, tm, node_id
//                                 })
//                             }
//                         />
//                     );
//                 })}


//                 {selectedMarker && (
//                     <InfoWindow
//                         position={{
//                             lat: parseFloat(selectedMarker.latitude),
//                             lng: parseFloat(selectedMarker.longitude),
//                         }}
//                         onCloseClick={() => setSelectedMarker(null)}
//                     >
//                         <div style={{ maxWidth: 250 }}>
//                             <h3 style={{ marginBottom: 4 }}>
//                                 {selectedMarker.customer.NAMEOFIPP}
//                             </h3>

//                             <p style={{ margin: 0 }}>
//                                 <b>ESCOM:</b> {selectedMarker.customer.ESCOM}
//                             </p>
//                             <p style={{ margin: 0 }}>
//                                 <b>Capacity:</b> {selectedMarker.customer.INSTALLEDCAPACITY_MW} MW
//                             </p>
//                             <p style={{ margin: "4px 0" }}>
//                                 <b>SL No:</b> {selectedMarker.customer.SLNO}
//                             </p>
//                             <p style={{ margin: "4px 0" }}>
//                                 <b>Updated:</b> {selectedMarker.tm}
//                             </p>
//                             <p style={{ margin: "4px 0" }}>
//                                 <b>DCU ID:</b> {selectedMarker.node_id}
//                             </p>
//                             <button style={{
//                                 marginTop: 8,
//                                 padding: '6px 12px',
//                                 backgroundColor: '#4285F4',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '4px',
//                                 cursor: 'pointer',
//                             }}>
//                                 <a
//                                     href={`https://www.google.com/maps?q=${selectedMarker.latitude},${selectedMarker.longitude}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     style={{ textDecoration: 'none', color: 'inherit' }}
//                                 >
//                                     Open in Google Maps
//                                 </a>
//                             </button>

//                         </div>
//                     </InfoWindow>
//                 )}
//             </GoogleMap>
//         </div>

//     );
// };
