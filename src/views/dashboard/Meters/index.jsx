import axios from "axios";
import { Col, Input, Label, Row, Button, Modal, ModalHeader, ModalBody, Breadcrumb, BreadcrumbItem, Table } from "reactstrap";
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { selectThemeColors } from '@utils'
import { useForm, Controller } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Settings, Plus, Info } from "react-feather";
import API_URL from "../../../config";
import toast from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import AddMeterModal from "./addMeter";
import CommandModal from "./CommandModal";


const OverView = () => {
    const navigate = useNavigate();
    const { control } = useForm({});
    const [data, setData] = useState([]);
    const gridRef = useRef()
    const location = useLocation();
    const { dcu_id } = location.state || {};


    // Fetch data


    const fetchData = async (dcu_id) => {
        const res = await fetch(`${API_URL}/meters?dcu_id=${dcu_id}`);
        if (!res.ok) {
            console.error('Failed to fetch data:', res.statusText);
            return;
        }
        const json = await res.json();
        setData(json.data || []);

    };
    useEffect(() => {

        fetchData(dcu_id);
    }, [dcu_id]);



    const columnDefs = useMemo(() => [
        { headerName: 'Meter No', field: 'meter_no', flex: 2 },
        { headerName: 'Make', field: 'meter_make', flex: 2 },
        { headerName: 'Method', field: 'method', flex: 2 },
        { headerName: 'Location', field: 'location', flex: 2 },
        { headerName: 'Address', field: 'address', flex: 2 },

        {
            headerName: 'Files Info',
            cellRendererFramework: (params) => (
                <Button
                    color="primary"
                    style={{
                        width: '100%',
                        height: '80%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => handleCellRightClicks(params.data.meter_no)}
                >
                    <Info style={{ marginRight: '8px' }} />
                    Files Info
                </Button>
            ),
            flex: 2,
            cellStyle: { textAlign: 'center', padding: 0 }
        },
        {
            headerName: 'Config',
            cellRendererFramework: (params) => (
                <Button
                    color="primary"
                    style={{
                        width: '100%',
                        height: '80%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => handleMeterConfig(params.data)}
                >
                    <Settings style={{ marginRight: '8px' }} />
                    Config
                </Button>
            ),
            flex: 2,
            cellStyle: { textAlign: 'center', padding: 0 }
        },
        {
            headerName: 'Ondemand',
            cellRendererFramework: (params) => (
                <Button
                    color="primary"
                    style={{
                        width: '100%',
                        height: '80%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => { handleOndemand(params.data.meter_no) }} // Navigate to Ondemand page with meter_no
                >
                    <Info style={{ marginRight: '8px' }} />
                    Ondemand
                </Button>
            ),
            flex: 2,
            cellStyle: { textAlign: 'center', padding: 0 }
        }

    ], []);
    const [selectedMeter, setSelectedMeter] = useState(null);

    const handleMeterConfig = (meter) => {
        setSelectedMeter(meter); // Pass to modal
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedMeter(null);
    };
    const [meterNo, setMeterNo] = useState(null);
    const [modalMeterOpen, setModalMeterOpen] = useState(false);
    const handleCellRightClicks = (meterNo) => {
        setMeterNo(meterNo);
        setModalMeterOpen(true);
    };
    const [openOndemand, setOpenOndemand] = useState(false);
    const handleOndemand = (meterNo) => {
        setSelectedMeter(meterNo);
        setOpenOndemand(true); // This will open the Ondemand modal or page
    }
    const handleModalOndemandClose = () => {
        setOpenOndemand(false);
        setSelectedMeter(null);
    };



    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        flex: 1,
        filterParams: { buttons: ['apply', 'reset'] }
    }), [])

    const onGridReady = (params) => {
        gridRef.current = params.api
    }
    const [modalOpen, setModalOpen] = useState(false);

    const handleAddMeter = async (newMeter, isEdit) => {
        try {


            if (newMeter.method === 'Ethernet') {
                delete newMeter.baud_rate;
                delete newMeter.data_bits;
                delete newMeter.parity;
                delete newMeter.stop_bits;
                delete newMeter.slave_id_size;
            }
            if (isEdit) {
                const res = await fetch(`${API_URL}/meter/${newMeter.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMeter)
                });
                if (!res.ok) throw new Error('Failed to add meter')
                const updatedRes = await fetch(`${API_URL}/meters?dcu_id=${dcu_id}`);
                const allMeters = await updatedRes.json()
                const filtered = allMeters.data.filter(m => m.dcu_id === newMeter.dcu_id)
                setData(filtered)

                toast.success('Meter Updated successfully!')
            } else {
                const response = await fetch(`${API_URL}/add-meter`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMeter)
                })



                if (!response.ok) throw new Error('Failed to add meter')

                const updatedRes = await fetch(`${API_URL}/meters?dcu_id=${dcu_id}`);
                const allMeters = await updatedRes.json()
                const filtered = allMeters.data.filter(m => m.dcu_id === newMeter.dcu_id)
                setData(filtered)

                toast.success('Meter added successfully!')
            }
        } catch (err) {
            console.error(err)
            toast.error(`Error: ${err.message}`)
        }
    }


    const [files, setFiles] = useState([]);
    useEffect(() => {
        if (!modalMeterOpen || !meterNo) return;

        const fetchFiles = async () => {
            try {
                const res = await fetch(`${API_URL}/meter/${meterNo}/files`);
                const data = await res.json(); // Ensure you're reading the JSON body

                if (data.success) {
                    setFiles(data.files);
                } else {
                    setFiles([]);
                }
            } catch (err) {
                console.error('Error fetching files:', err);
                setFiles([]);
            }
        };

        fetchFiles();
    }, [modalMeterOpen, meterNo]);

    console.log('Files:', files);

    const handleDownload = (file) => {
        window.open(`${API_URL}/meter/${meterNo}/download/${file}`, '_blank');
    };
    const [showCommands, setModalShowCommands] = useState(false);

    const handleShowCommands = () => {
        setModalShowCommands(true);
    };

    const handleCloseCommandModal = () => {
        setModalShowCommands(false);
    };
    return (
        <>
            <Breadcrumb>

                <BreadcrumbItem>
                    <a href="/dashboard/Dcu">
                        DCU
                    </a>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <a href="/dashboard/Meters">
                        Meters
                    </a>
                </BreadcrumbItem>

            </Breadcrumb>
            <h1>Meters In DCU ID - {dcu_id}</h1>
            {/* <Row className='d-flex justify-content-between  align-items-end mb-4' >

                <Col md='3' sm='6'>
                    <Label className='form-label'>Search</Label>
                    <Input
                        type='text'
                        placeholder='Search anything...'
                        onChange={(e) => {
                            if (gridRef.current) {
                                gridRef.current.setQuickFilter(e.target.value);
                            }
                        }}
                    />
                </Col>
                <Col md='2' sm='6' className='d-flex justify-content-end align-items-center'>
                    <Col md='2' sm='6' className='d-flex justify-content-end align-items-center'>
                        <Button color="secondary" onClick={() => handleShowCommands(dcu_id)}>
                            Ondemand Commands
                        </Button>
                    </Col>
                    <Col md='2' sm='6' className='d-flex justify-content-end align-items-center'>
                        <Button
                            color='primary'
                            onClick={() => setModalOpen(true)}

                        >
                            <Plus style={{ marginRight: '8px' }} size={20} />
                            Add Meter
                        </Button>
                    </Col>
                </Col>

            </Row> */}
            <Row className='d-flex justify-content-between align-items-end mb-4'>

                {/* 🔍 Search Field */}
                <Col md='4' sm='12' className='mb-2 mb-md-0'>
                    <Label className='form-label'>Search</Label>
                    <Input
                        type='text'
                        placeholder='Search anything...'
                        onChange={(e) => {
                            if (gridRef.current) {
                                gridRef.current.setQuickFilter(e.target.value);
                            }
                        }}
                    />
                </Col>

                {/* 🧭 Buttons Group */}
                <Col md='8' sm='12' className='d-flex justify-content-end gap-2'>
                    <Button color='primary' onClick={() => handleShowCommands(dcu_id)}>
                        Ondemand Commands
                    </Button>
                    <Button color='primary' onClick={() => setModalOpen(true)}>
                        <Plus style={{ marginRight: '8px' }} size={20} />
                        Add Meter
                    </Button>
                </Col>

            </Row>
            <div className="ag-theme-alpine" style={{ height: '674px', width: '100%' }}>
                {data.length > 0 ? (
                    <AgGridReact
                        ref={gridRef}
                        rowData={data}
                        columnDefs={columnDefs}
                        animateRows
                        rowSelection="multiple"
                        pagination
                        paginationPageSize={12}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                    // onCellContextMenu={handleCellRightClick}
                    />
                ) : <p>No Data Found</p>}
            </div>


            <AddMeterModal
                isOpen={modalOpen}
                toggle={handleModalClose}
                dcuId={dcu_id}
                onSubmit={handleAddMeter}
                meterData={selectedMeter}
            />
            <CommandModal isOpen={openOndemand} toggle={() => setOpenOndemand(false)} meterNo={selectedMeter} dcu_id={dcu_id} />
            {showCommands && <CommandModals dcuId={dcu_id}
                isOpen={showCommands}
                toggle={handleCloseCommandModal} />}
            <Modal isOpen={modalMeterOpen} toggle={() => setModalMeterOpen(!modalMeterOpen)} size="lg">
                <ModalHeader toggle={() => setModalMeterOpen(!modalMeterOpen)}>Files for Meter {meterNo}</ModalHeader>
                <ModalBody>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                {/* <th>View</th> */}
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file, idx) => (
                                <tr key={idx}>
                                    <td>{file}</td>
                                    {/* <td>
                                        <Button
                                            color="info"
                                            onClick={() => window.open(`${API_URL}/meter/${meterNo}/download/${file}?view=true`, '_blank')}
                                        >
                                            View
                                        </Button>
                                    </td> */}
                                    <td>
                                        <Button
                                            color="primary"
                                            onClick={() => window.open(`${API_URL}/meter/${meterNo}/download/${file}`, '_blank')}
                                        >
                                            Download
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </>
    )
}

export default OverView;



const CommandModals = ({ dcuId, isOpen, toggle }) => {
    const [commands, setCommands] = useState([]);

    useEffect(() => {
        const fetchCommands = async () => {
            if (!dcuId) return;
            try {
                const res = await fetch(`${API_URL}/get-commands-by-dcu/${dcuId}`);
                const data = await res.json();
                if (data.success) {
                    setCommands(data.data);
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
    }, [dcuId, isOpen]);

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Commands for DCU: {dcuId}</ModalHeader>
            <ModalBody>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Meter No</th>
                            <th>Command</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commands.map((cmd, index) => (
                            <tr key={cmd.id}>
                                <td>{index + 1}</td>
                                <td>{cmd.meter_no}</td>
                                <td>{cmd.ondemand_data}</td>
                                <td>{new Date(cmd.created_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </ModalBody>
        </Modal>
    );
};
