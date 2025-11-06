import axios from "axios";
import { Col, Input, Label, Row, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
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
import AddDCUModal from "./AddDCU";
import toast from 'react-hot-toast';


const OverView = () => {
    const navigate = useNavigate();
    const { control } = useForm({});
    const [data, setData] = useState([]);
    const gridRef = useRef()
    // Fetch data


    const fetchData = async () => {
        const res = await fetch(`${API_URL}/dcus`);
        if (!res.ok) {
            console.error('Failed to fetch data:', res.statusText);
            return;
        }
        const json = await res.json();
        setData(json.data || []);

    };
    useEffect(() => {

        fetchData();
    }, []);



    const columnDefs = useMemo(() => [
        { headerName: 'DCU ID', field: 'dcu_id', flex: 2 },
        { headerName: 'DCU IP', field: 'dcu_ip', flex: 2 },
        { headerName: 'Location', field: 'dcu_location', flex: 2 },
        { headerName: 'File Location', field: 'dcu_file_location', flex: 3 },

        {
            headerName: 'Config Info',
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
                    onClick={() => handleCellRightClicks(params.data)}
                >
                    <Settings style={{ marginRight: '8px' }} />
                    Configuration
                </Button>
            ),
            flex: 2,
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => { navigate(`/dashboard/Meters`, { state: { dcu_id: params.data.dcu_id } }) }}
                >
                    <Info style={{ marginRight: '8px' }} />
                    Meter Info
                </Button>
            ),
            flex: 2,
            cellStyle: { textAlign: 'center', padding: 0 }
        }
    ], []);
    const [selectedDCU, setSelectedDCU] = useState(null);
    const handleCellRightClicks = (params) => {
        setSelectedDCU(params);
        setModalOpen(true);
    };
    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedDCU(null);
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

    const handleAddDCU = async (newDCU, isEdit) => {
        try {
            if (isEdit) {
                // If editing, update the existing DCU
                const response = await fetch(`${API_URL}/dcu/${newDCU.dcu_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newDCU),
                });
                if (!response.ok) {
                    console.error('Failed to update DCU:', response.statusText);
                    alert('Failed to update DCU.');
                    toast.error('Something went wrong!');
                    return;
                }
                fetchData()
                toast.success('DCU updated successfully!');
            } else {
                // 1. POST request to add new DCU
                const response = await fetch(`${API_URL}/add-dcu`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newDCU),
                });

                if (!response.ok) {
                    console.error('Failed to add DCU:', response.statusText);
                    alert('Failed to add DCU.');
                    toast.error('Something went wrong!');
                    return;
                }

                // 2. Refetch updated DCU list
                const res = await fetch(`${API_URL}/dcus`);
                if (!res.ok) {
                    console.error('Failed to fetch updated DCU list:', res.statusText);
                    return;
                }

                const json = await res.json();
                setData(json.data || []);
                fetchData()
                toast.success('DCU added successfully!');
            }
        } catch (error) {
            console.error('Error in handleAddDCU:', error);
            toast.error(`❌ ${err.message}`);
        }
    };
    return (
        <>
            <h1>DCU Dashboard</h1>
            <Row className='d-flex justify-content-between  align-items-end mb-4' >

                {/* Node ID Search */}
                <Col md='3' sm='6'>
                    {/* <div className='mb-1'> */}
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
                    {/* </div> */}
                </Col>
                <Col md='2' sm='6' className='d-flex justify-content-end align-items-center'>
                    <Button
                        color='primary'
                        onClick={() => setModalOpen(true)}

                    >
                        <Plus style={{ marginRight: '8px' }} size={20} />
                        Add DCU
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


            <AddDCUModal
                isOpen={modalOpen}
                toggle={handleModalClose}
                onSubmit={handleAddDCU}
                data={selectedDCU}
            />
        </>
    )
}

export default OverView;