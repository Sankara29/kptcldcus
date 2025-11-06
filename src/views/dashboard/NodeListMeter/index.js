
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import API_URL from '../../../config'
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { Info } from 'react-feather'
import { useLocation } from 'react-router-dom'
import ModelData from './modelData'


const index = () => {
    const [data, setData] = useState([]);
    const gridRef = useRef()
    const location = useLocation();
    const { node } = location.state || {};
    const [meterData, setMeterData] = useState([])
    // Fetch data


    const fetchData = async (node) => {
        const res = await fetch(`https://testpms.ms-tech.in/v21/nodelist/${node}`);
        if (!res.ok) {
            console.error('Failed to fetch data:', res.statusText);
            return;
        }
        const json = await res.json();

        const meternoObjects = (json?.meterno_list || []).map(meterno => ({ meterno }));
        setData(meternoObjects || []);

    };
    useEffect(() => {

        fetchData(node);
    }, [node]);
    const [selectMethod, setSelectedMethod] = useState(null)
    const handleData = async (method, meter) => {
        try {
            // table, meterno
            console.log(method, meter)
            const res = await fetch(`https://testpms.ms-tech.in/v21/meterdata?table=${method}&meterno=${meter}`);
            if (!res.ok) {
                console.error('Failed to fetch data:', res.statusText);
                return;
            }
            setModalOpen(true)
            setSelectedMethod(method)
            const json = await res.json();
            setMeterData([...(json || [])].reverse());

        } catch (error) {
            console.log(error)
        }

    }



    const columnDefs = useMemo(() => [
        { headerName: 'meterNo', field: 'meterno', flex: 2 },
        {
            headerName: 'IP',
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
                    onClick={() => { handleData("instantaneousdata", params.data.meterno) }}
                >
                    <Info style={{ marginRight: '8px' }} />
                    IP Data
                </Button>
            ),
            flex: 2,
            cellStyle: { textAlign: 'center', padding: 0 }
        }, {
            headerName: 'Event',
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
                    onClick={() => { handleData("eventdata", params.data.meterno) }}
                >
                    <Info style={{ marginRight: '8px' }} />
                    Event Data
                </Button>
            ),
            flex: 2,
            cellStyle: { textAlign: 'center', padding: 0 }
        }, {
            headerName: 'daily',
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
                    onClick={() => { handleData("dailyloaddata", params.data.meterno) }}
                >
                    <Info style={{ marginRight: '8px' }} />
                    daily Data
                </Button>
            ),
            flex: 2,
            cellStyle: { textAlign: 'center', padding: 0 }
        },
        {
            headerName: 'Load',
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
                    onClick={() => { handleData("loaddata", params.data.meterno) }}
                >
                    <Info style={{ marginRight: '8px' }} />
                    Load data
                </Button>
            ),
            flex: 2,
            cellStyle: { textAlign: 'center', padding: 0 }
        }, {
            headerName: 'Billing',
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
                    onClick={() => { handleData("billingdata", params.data.meterno) }}
                >
                    <Info style={{ marginRight: '8px' }} />
                    Billing
                </Button>
            ),
            flex: 2,
            cellStyle: { textAlign: 'center', padding: 0 }
        }

    ], []);
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        flex: 1,
        filterParams: { buttons: ['apply', 'reset'] }
    }), [])

    const onGridReady = (params) => {
        gridRef.current = params.api
    }
    const handleModalClose = () => {
        setModalOpen(false);
        setMeterData(null);
        setSelectedMethod(null)
    };
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div style={{ width: "100%" }}>
            <Breadcrumb>

                <BreadcrumbItem>
                    <a href="/dashboard/node_list">
                        node_list
                    </a>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                    <a href="/dashboard/node_list_meter">
                        Meters
                    </a>
                </BreadcrumbItem>

            </Breadcrumb>
            <h1>Node List</h1>
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

            {meterData?.length && <ModelData
                isOpen={modalOpen}
                toggle={handleModalClose}
                data={meterData}
                method={selectMethod}
            />}



        </div>
    )
}

export default index;