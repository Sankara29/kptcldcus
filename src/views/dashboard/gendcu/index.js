
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Accordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import { Info, Search } from 'react-feather';
import NodeDataGrid from './pop';
import dayjs from 'dayjs';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FileText } from "react-feather";


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
        setRemarkInput('');
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

    const fetchData = async () => {
        try {
            // --- Generate keys ---
            const keys = [];
            for (let i = 1; i <= 200; i++) {
                const id = String(i).padStart(5, '0');
                keys.push(`v_NSDCU7${id}`);
            }

            // --- Fetch TM values ---
            const tmResponse = await fetch('https://api.ms-tech.in/v11/getdcutm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keys: keys, fields: ["tm", "REMARK"] })
            });
            const tmData = await tmResponse.json();

            // Map tm values for easy lookup by node_id (without 'v_')
            const tmMap = {};
            for (const item of tmData.data || []) {
                const nodeId = item.key.replace(/^v_/, '');
                tmMap[nodeId] = item.data.tm;
                tmMap[nodeId + '_REMARK'] = item.data.REMARK || null;
            }

            // --- Fetch nodes-with-meters ---
            const nodeRes = await fetch('https://testpms.ms-tech.in/v23/nodes-with-meters');
            if (!nodeRes.ok) throw new Error(nodeRes.statusText);
            const nodeJson = await nodeRes.json();
            let nodes = nodeJson.data || [];

            const res = await fetch('https://testpms.ms-tech.in/v23/node-status');
            if (!res.ok) throw new Error(res.statusText);
            const json = await res.json() || {};
            const commData = json.data || []
            const commMap = {};
            setCommunicationData(json);

            for (const item of commData) {
                commMap[item.node_id] = item.installed_at || null;
            }

            // --- Attach tm value to each node ---
            nodes = nodes.map(node => ({
                ...node,
                tm: tmMap[node.node_id] || null, installed_at: commMap[node.node_id] || null,
                REMARK: tmMap[node.node_id + '_REMARK'] || null
            }));
            console.log("Fetched nodes with meters and TM:", nodes);

            setData(nodes);
        } catch (error) {
            console.error("Error fetching nodes with meters or TM:", error);
            setData([]);
        }
    };

    const fetchCommunicationData = async () => {
        try {
            const res = await fetch('https://testpms.ms-tech.in/v23/node-status');
            if (!res.ok) throw new Error(res.statusText);
            const json = await res.json();
            setCommunicationData(json);
        } catch (error) {
            console.error("Error fetching node communication data:", error);
            setCommunicationData(null);
        }
    };

    useEffect(() => {
        fetchData();
        fetchCommunicationData();
    }, []);

    // --- Open first modal: show meters ---
    // const openMetersModal = (node) => {
    //     // store entire node object
    //     setSelectedNode(node);

    //     // Extract meter key-value pairs dynamically
    //     const meters = Object.keys(node)
    //         .filter(k => k.startsWith('meter') && node[k] !== null && node[k] !== '')
    //         .map(k => ({ key: k, value: node[k] })); // include meter number
    //     console.log("Meters for node", node.node_id, meters);



    //     setNodeMeters(meters);
    //     setModalMetersOpen(true);
    // };

    const openMetersModal = async (node) => {
        setSelectedNode(node);

        const meters = Object.keys(node)
            .filter(k => k.startsWith('meter') && node[k] !== null && node[k] !== '')
            .map(k => ({ key: k, value: node[k] }));

        console.log("Meters for node", node.node_id, meters);

        // Fetch customer data for each meter
        const fetchedMeters = await Promise.all(meters.map(async (m) => {
            try {
                const sql = `
    SELECT NAMEOFIPP
    FROM ipp_data
    WHERE CHECK_METER_SL_NO='${m.value}'
    OR MAIN_METER_SL_NO='${m.value}';
`.trim();


                const response = await fetch("https://testhotel2.prysmcable.com/v24/query-checker", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({ sql })
                });

                const text = await response.text();
                const rows = text.split("\n");

                let customer = "N/A";
                if (rows.length > 1) {
                    const columns = rows[0].split(",");
                    const values = rows[1].split(",");
                    const nameIndex = columns.indexOf("NAMEOFIPP");
                    if (nameIndex !== -1 && values[nameIndex]) {
                        customer = values[nameIndex].trim();
                    }
                }

                return { ...m, customer };
            } catch (err) {
                console.error("Error fetching customer:", err);
                return { ...m, customer: "N/A" };
            }
        }));

        setNodeMeters(fetchedMeters);
        setModalMetersOpen(true);
    };


    const closeMetersModal = () => {
        setModalMetersOpen(false);
        setSelectedNode(null);
        setNodeMeters([]);
    };



    // --- Column definitions ---
    const columnDefs = useMemo(() => {
        if (!data || data.length === 0) return [];

        const cols = [
            { headerName: 'Node', field: 'node_id', flex: 2 },
            {
                headerName: 'dcu_comm_status',
                field: 'tm',
                flex: 2,
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
            //installed_at
            {
                headerName: 'installed_at',
                field: 'installed_at',
                flex: 2,
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

                        // Clean microseconds if present
                        let cleanedValue = cellValue;
                        if (typeof cellValue === 'string' && cellValue.includes('.')) {
                            cleanedValue = cellValue.split('.')[0]; // Remove everything after the decimal point
                        }

                        let cellDate = dayjs(cleanedValue, 'YYYY-MM-DD HH:mm:ss', true);
                        if (!cellDate.isValid()) {
                            cellDate = dayjs(cleanedValue, 'YYYY-MM-DD', true);
                        }

                        const fDate = dayjs(filterDate).startOf('day');

                        if (!cellDate.isValid() || !fDate.isValid()) return 0;
                        if (cellDate.isBefore(fDate)) return -1;
                        if (cellDate.isAfter(fDate)) return 1;
                        return 0;
                    }
                }
            }, { headerName: 'Remark', field: 'REMARK', flex: 2 }, {
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
                cellStyle: { textAlign: 'center', padding: 0 }
            },
            {
                headerName: 'Meter Info',
                cellRendererFramework: (params) => (
                    <Button
                        color="primary"
                        style={{
                            width: '100%',
                            height: '80%',

                        }}
                        onClick={() => openMetersModal(params.data)}
                    >
                        {/* <Info style={{ marginRight: '8px' }} /> */}
                        Meter Info
                    </Button>
                ),
                flex: 1,
                cellStyle: { textAlign: 'center', padding: 0 }
            },
        ];
        return cols;
    }, [data]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        flex: 1,
        filterParams: { buttons: ['apply', 'reset'] },
        resizable: true,
    }), []);

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        gridRef.current.api.setQuickFilter(value); // AG Grid built-in search
    };
    const totalNodes = communicationData?.total_nodes || 0;
    const communicatedNodes = communicationData?.communicated_nodes || 0;
    const successRate = totalNodes ? ((communicatedNodes / totalNodes) * 100).toFixed(0) : 0;

    const openDetailModal = (meterNumber, selectedNode) => {
        setSelectedMeter(meterNumber);
        setModalDetailOpen(true);
        setSelectedNode({ node_id: selectedNode }); // ensure node is set
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


    return (
        <div className="container-fluid mt-3">
            <h1 className="mb-3">Gen Dcu List</h1>

            {/* 🔍 Search bar */}
            <div className="d-flex align-items-center mb-3">
                {/* <Search size={18} style={{ marginRight: '8px' }} /> */}
                <Input
                    type="text"
                    placeholder="Search Node ID..."
                    value={searchText}
                    onChange={onSearchChange}
                    style={{ maxWidth: '300px' }}
                />
            </div>

            {/* Nodes Communication Summary */}
            <div className="mb-4 p-3 border rounded shadow-sm bg-light">
                <h5>Nodes Communication Summary</h5>
                <div className="d-flex justify-content-between mt-2">
                    <span>Total Nodes: {totalNodes}</span>
                    <span>Today's Gettime: {todaysGettimeCount}</span>
                    <span>Communicated: {communicatedNodes}</span>
                    <span>Success Rate: {successRate}%</span>
                    <span> DCU live : {dcualivecount}%</span>
                </div>
            </div>
            {communicationData?.data && (
                <Accordion open={openOuter} toggle={toggleOuter}>
                    {data?.length > 0 && communicationData?.data && (
                        <Accordion open={openOuter === 'today-no-data' ? 'today-no-data' : null} toggle={() => toggleOuter('today-no-data')}>
                            <AccordionItem key="today-no-data">
                                <AccordionHeader targetId="today-no-data">
                                    Gettime Today but No Data Received
                                    {/* <FileText
                                        size={18}
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const filtered = data.filter((node) => {
                                                const isToday = dayjs(node.tm, 'MM/DD/YY HH:mm:ss').format('MM/DD/YY') === todayDate;
                                                const commNode = communicationData.data.find(c => c.node_id === node.node_id);
                                                const allFail = commNode?.meters?.every(m => !m.data_today);
                                                return isToday && allFail;
                                            });
                                            exportToExcel(filtered, `today_no_data_${date}_007`);
                                        }}
                                    /> */}
                                    <FileText
                                        size={18}
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            const filtered = [];

                                            data.forEach((node) => {
                                                const isToday = dayjs(node.tm, "MM/DD/YY HH:mm:ss").format("MM/DD/YY") === todayDate;

                                                const commNode = communicationData.data.find(
                                                    (c) => c.node_id === node.node_id
                                                );

                                                if (commNode && isToday) {
                                                    const allFail = commNode.meters?.every((m) => !m.data_today);

                                                    if (allFail) {
                                                        commNode.meters.forEach((meter) => {
                                                            filtered.push({
                                                                node_id: node.node_id,
                                                                meter_no: meter.meter_no || "N/A",
                                                                data_today: meter.data_today ? "Success" : "Fail",
                                                                last_tm: node.tm || null,
                                                                // dcu_id: node.dcu_id || "N/A",
                                                            });
                                                        });
                                                    }
                                                }
                                            });

                                            console.log("Filtered All-Fail Meters:", filtered);
                                            exportToExcel(filtered, `today_no_data_${date}_007`);
                                        }}
                                    />

                                </AccordionHeader>
                                <AccordionBody accordionId="today-no-data">
                                    <Accordion flush open={openNode} toggle={toggleNode}>
                                        {data
                                            .filter((node) => {
                                                // 1️⃣ Check if TM is today
                                                const isToday =
                                                    dayjs(node.tm, 'MM/DD/YY HH:mm:ss').format('MM/DD/YY') === todayDate;

                                                // 2️⃣ Find matching communication node
                                                const commNode = communicationData.data.find(
                                                    (c) => c.node_id === node.node_id
                                                );

                                                // 3️⃣ Determine if all meters have data_today = false
                                                const allFail =
                                                    commNode &&
                                                    commNode.meters?.length > 0 &&
                                                    commNode.meters.every((m) => !m.data_today);

                                                return isToday && allFail;
                                            })
                                            .map((node) => (
                                                <AccordionItem key={node.node_id}>
                                                    <AccordionHeader targetId={`node-no-data-${node.node_id}`}>
                                                        {node.node_id} — ❌ Gettime Today but No Data
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`node-no-data-${node.node_id}`}>
                                                        <div
                                                            style={{
                                                                padding: '10px',
                                                                border: '1px solid #ddd',
                                                                borderRadius: '5px',
                                                                backgroundColor: '#f8d7da',
                                                            }}
                                                        >
                                                            <strong>Gettime:</strong> {node.tm || 'N/A'}
                                                            <br />
                                                            <strong>Status:</strong> No Meters Reported Data Today
                                                        </div>
                                                    </AccordionBody>
                                                </AccordionItem>
                                            ))}
                                    </Accordion>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    )}

                    {data?.length > 0 && communicationData?.data && (
                        <Accordion open={openOuter === 'today-partial' ? 'today-partial' : null} toggle={() => toggleOuter('today-partial')}>
                            <AccordionItem key="today-partial">
                                <AccordionHeader targetId="today-partial">
                                    Gettime Today but Partial Data Received

                                    <FileText
                                        size={18}
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                            e.stopPropagation();

                                            const filtered = [];

                                            data.forEach((node) => {
                                                const isToday =
                                                    dayjs(node.tm, "MM/DD/YY HH:mm:ss").format("MM/DD/YY") === todayDate;

                                                const commNode = communicationData.data.find(
                                                    (c) => c.node_id === node.node_id
                                                );

                                                if (commNode && isToday) {
                                                    const hasSuccess = commNode.meters?.some((m) => m.data_today);
                                                    const hasFail = commNode.meters?.some((m) => !m.data_today);

                                                    if (hasSuccess && hasFail) {
                                                        // For each meter, mark success or fail
                                                        commNode.meters.forEach((meter) => {
                                                            filtered.push({
                                                                node_id: node.node_id,
                                                                meter_no: meter.meter_no || "N/A",
                                                                data_today: meter.data_today ? "Success" : "Fail",
                                                                last_tm: node.tm || null,
                                                                // dcu_id: node.dcu_id || "N/A",
                                                            });
                                                        });
                                                    }
                                                }
                                            });

                                            console.log("Filtered Partial Data Meters:", filtered);

                                            exportToExcel(filtered, `today_partial_data_${date}_007`);
                                        }}
                                    />

                                </AccordionHeader>
                                <AccordionBody accordionId="today-partial">
                                    <Accordion flush open={openNode} toggle={toggleNode}>
                                        {data
                                            .filter((node) => {
                                                const isToday =
                                                    dayjs(node.tm, 'MM/DD/YY HH:mm:ss').format('MM/DD/YY') === todayDate;
                                                const commNode = communicationData.data.find(
                                                    (c) => c.node_id === node.node_id
                                                );

                                                if (!commNode || !isToday) return false;

                                                const meters = commNode.meters || [];
                                                const hasSuccess = meters.some((m) => m.data_today);
                                                const hasFail = meters.some((m) => !m.data_today);

                                                return hasSuccess && hasFail; // partial case
                                            })
                                            .map((node) => {
                                                const commNode = communicationData.data.find(
                                                    (c) => c.node_id === node.node_id
                                                );
                                                return (
                                                    <AccordionItem key={node.node_id}>
                                                        <AccordionHeader targetId={`node-partial-${node.node_id}`}>
                                                            {node.node_id} — ⚠️ Partial Data Received
                                                        </AccordionHeader>
                                                        <AccordionBody accordionId={`node-partial-${node.node_id}`}>
                                                            <div
                                                                style={{
                                                                    padding: '10px',
                                                                    border: '1px solid #ddd',
                                                                    borderRadius: '5px',
                                                                    backgroundColor: '#fff3cd',
                                                                }}
                                                            >
                                                                <strong>Gettime:</strong> {node.tm || 'N/A'}
                                                                <br />
                                                                <strong>Meter Data Status:</strong>
                                                                <div style={{ marginTop: '8px' }}>
                                                                    {commNode.meters.map((m) => (
                                                                        <div
                                                                            key={m.meter_no}
                                                                            style={{
                                                                                display: 'flex',
                                                                                justifyContent: 'space-between',
                                                                                alignItems: 'center',
                                                                                marginBottom: '6px',
                                                                                padding: '4px 8px',
                                                                                border: '1px solid #ddd',
                                                                                borderRadius: '4px',
                                                                                backgroundColor: m.data_today
                                                                                    ? '#d4edda'
                                                                                    : '#f8d7da',
                                                                            }}
                                                                        >
                                                                            <span>{m.meter_no}</span>
                                                                            <span>
                                                                                {m.data_today ? '✅ Success' : '❌ Missed'}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </AccordionBody>
                                                    </AccordionItem>
                                                );
                                            })}
                                    </Accordion>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    )}



                    <AccordionItem key="all-nodes">
                        <AccordionHeader targetId="all-nodes">All Nodes Commucation Details
                            {/* <FileText
                            size={18}
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                exportToExcel(communicationData.data, `all_nodes_${date}_007`);
                            }}
                        /> */}
                            <FileText
                                size={18}
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                    e.stopPropagation();

                                    const allMeters = [];

                                    communicationData.data.forEach((commNode) => {

                                        commNode.meters?.forEach((meter) => {
                                            const commNodes = data.find(
                                                (c) => c.node_id === commNode.node_id
                                            );
                                            allMeters.push({
                                                node_id: commNode.node_id,
                                                meter_no: meter.meter_no || "N/A",
                                                data_today: meter.data_today ? "Success" : "Fail",
                                                last_tm: commNodes.tm || null,
                                            });
                                        });
                                    });

                                    console.log("All Node Meter Data:", allMeters);
                                    exportToExcel(allMeters, `all_nodes_${date}_007`);
                                }}
                            />

                        </AccordionHeader>
                        <AccordionBody accordionId="all-nodes">

                            <Accordion flush open={openNode} toggle={toggleNode}>
                                {communicationData.data.map((node) => (
                                    <AccordionItem key={node.node_id}>
                                        <AccordionHeader
                                            targetId={`node-${node.node_id}`}
                                            style={{
                                                backgroundColor: node.success ? '#e6ffed' : '#fff5f5',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {node.node_id} —{" "}
                                            <span style={{ color: node.success ? 'green' : 'red' }}>
                                                {node.success ? '✅ All Success' : '⚠️ Partial'}
                                            </span>
                                        </AccordionHeader>

                                        <AccordionBody accordionId={`node-${node.node_id}`}>

                                            <Accordion flush open={openMeters} toggle={toggleMeters}>
                                                <AccordionItem key={`${node.node_id}-meters`}>
                                                    <AccordionHeader targetId={`${node.node_id}-meters`}>
                                                        Meters
                                                    </AccordionHeader>
                                                    <AccordionBody accordionId={`${node.node_id}-meters`}>
                                                        {node.meters && node.meters.length > 0 ? (
                                                            node.meters.map((m, index) => (
                                                                <div
                                                                    key={`${node.node_id}-${m.meter_no}-${index}`}
                                                                    style={{
                                                                        display: 'flex',
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center',
                                                                        marginBottom: '6px',
                                                                        padding: '6px 10px',
                                                                        border: '1px solid #ddd',
                                                                        borderRadius: '5px',
                                                                        backgroundColor: m.data_today ? '#d4edda' : '#f8d7da',
                                                                    }}
                                                                >
                                                                    <span>{m.meter_no}</span>
                                                                    <span>{m.data_today ? '✅ Success' : '❌ Failure'}</span>
                                                                    <Button
                                                                        color="secondary"
                                                                        size="sm"
                                                                        onClick={() => openDetailModal(m.meter_no, node.node_id)}
                                                                    >
                                                                        Details
                                                                    </Button>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p className="text-muted">No meters found for this node.</p>
                                                        )}
                                                    </AccordionBody>
                                                </AccordionItem>
                                            </Accordion>
                                        </AccordionBody>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
            )}


            <div className="ag-theme-alpine" style={{ width: '100%', height: '700px', marginTop: '20px' }}>
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
                    />
                ) : (
                    <p className="text-center mt-3">No Data Found</p>
                )}
            </div>

            {/* First Modal: show meters with numbers */}
            <Modal size="md" isOpen={modalMetersOpen} toggle={closeMetersModal}>
                <ModalHeader toggle={closeMetersModal}>
                    Node Meters - {selectedNode?.node_id}
                </ModalHeader>
                <ModalBody>
                    {nodeMeters.length > 0 ? (
                        <div>
                            {nodeMeters.map(({ key, customer, value }) => (
                                <div
                                    key={key}
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
                                    <span>{key}-{customer}</span>
                                    <Button
                                        color="secondary"
                                        size="sm"
                                        onClick={() => openDetailModal(value, selectedNode.node_id)} // send only meter number
                                    >
                                        {value}
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
                    Meter Details - {selectedMeter} (Node: {selectedNode?.node_id})
                </ModalHeader>
                <ModalBody>
                    {selectedMeter && (
                        <NodeDataGrid
                            node_id={selectedNode?.node_id}
                            meter_id={selectedMeter}
                            type={selectedType}
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
        </div>
    );
};

export default NodeList;

