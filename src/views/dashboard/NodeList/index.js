
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import API_URL from '../../../config'
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap'
import { Info } from 'react-feather'


const index = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const gridRef = useRef()
    // Fetch data

    const fetchData = async () => {
        try {
            const res = await fetch(`https://testpms.ms-tech.in/v21/nodelist`);
            if (!res.ok) {
                console.error('Failed to fetch data:', res.statusText);
                return;
            }
            const json = await res.json();  // array of objects

            const nodes = (json || []).map(item => item.node);

            // Example: build transformed for second API
            const transformed = {
                keys: nodes.map(meter => `v_${meter.replace("NSTG", "NSGW")}`),
                fields: ["tm"]
            };
            // Fetch tm values
            const response = await fetch('https://api.ms-tech.in/v14/get-multiple-hashes-redis2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transformed)
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const hashes = await response.json();
            const hashesData = hashes.data || [];

            // Merge node + tm
            const meternoObjects = nodes.map(meterno => {
                const key = `v_${meterno.replace("NSTG", "NSGW")}`;
                const match = hashesData.find(item => item.key === key);

                return {
                    node: meterno,
                    tm: match?.data?.tm || null,
                    cv: match?.data?.cv || null
                };
            });
            setData(meternoObjects);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);



    const columnDefs = useMemo(() => [
        { headerName: 'Node', field: 'node', flex: 2 },
        { headerName: "gettime", field: "tm", flex: 2 },  {
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
                    onClick={() => { navigate(`/dashboard/node_list_meter`, { state: { node: params.data.node } }) }}
                >
                    <Info style={{ marginRight: '8px' }} />
                    Meter Info
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
    return (
        <>

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

        </>
    )
}

export default index;