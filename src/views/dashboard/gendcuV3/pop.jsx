import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useRef, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { DatePicker, Select, Spin } from 'antd';
const { Option } = Select;

export default function NodeDataGrid({ node_id, meter_id }) {
    const [selectedType, setSelectedType] = useState('load');
    const [gridData, setGridData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const gridRef = useRef();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    // --- Fetch data from API ---
    const fetchTableData = async (type, date) => {
        setLoading(true);
        setError(null);
        try {
            const dateStr = date.format('YYYY-MM-DD');
            let url = `https://testpms.ms-tech.in/v23/node-data/${node_id}?table=${type}&date=${dateStr}`;
            if (meter_id) {
                url += `&meter=${meter_id}`; // pass meter_id to API
            }

            const res = await fetch(url);
            const result = await res.json();
            if (!res.ok || result.status !== 'success') {
                throw new Error(result.message || 'Failed to fetch data');
            }

            const data = result.data.map((row, idx) => ({
                ...row,
                meter_no: row.meter_id || row.meter_no || meter_id || `meter${idx + 1}`,
                node_id,
                realtime: row.timeclock || row.load_timeclock || row.event_timeclock || null
            }));
            setGridData(data);
        } catch (err) {
            setError(err.message);
            setGridData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData(selectedType, selectedDate);
    }, [node_id, meter_id, selectedType, selectedDate]);

    // --- Responsive handling ---
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // --- Columns ---
    const columnDefs = useMemo(() => {
        const baseColumns = [
            { headerName: 'Node ID', field: 'node_id' },
            { headerName: 'Meter No', field: 'meterno' },
            {
                headerName: 'Time',
                field: 'realtime',
                filter: 'agDateColumnFilter',
                valueFormatter: (params) =>
                    params.value ? dayjs(params.value).format('YYYY-MM-DD HH:mm') : '',
            },
        ];

        let typeColumns = [];
        switch (selectedType) {
            case 'instantaneous':
                typeColumns = [
                    { headerName: 'L1 Current', field: 'l1current' },
                    { headerName: 'L2 Current', field: 'l2current' },
                    { headerName: 'L3 Current', field: 'l3current' },
                    { headerName: 'Active Power', field: 'activepower' },
                    { headerName: 'Frequency', field: 'frequency' },
                    { headerName: 'L1 Voltage', field: 'l1voltage' },
                    { headerName: 'L2 Voltage', field: 'l2voltage' },
                    { headerName: 'L3 Voltage', field: 'l3voltage' },
                ];
                break;
            case 'load':
                typeColumns = [
                    { headerName: 'Block Energy Wh Export', field: 'blockenergywhexport' },
                    { headerName: 'Block Energy Wh Import', field: 'blockenergywhimport' },
                    { headerName: 'Avg Load Frequency', field: 'avgloadfrequency' },
                    { headerName: 'Net Active Energy', field: 'netactiveenergy' },
                    { headerName: 'L1 Voltage', field: 'l1avgloadvoltage' },
                    { headerName: 'L2 Voltage', field: 'l2avgloadvoltage' },
                    { headerName: 'L3 Voltage', field: 'l3avgloadvoltage' },
                ];
                break;
            case 'event':
                typeColumns = [
                    { headerName: 'Cum Wh Export', field: 'cumwhexport' },
                    { headerName: 'Cum Wh Import', field: 'cumwhimport' },
                    { headerName: 'L1 Voltage', field: 'l1voltage' },
                    { headerName: 'L2 Voltage', field: 'l2voltage' },
                    { headerName: 'L3 Voltage', field: 'l3voltage' },
                    { headerName: 'L1 Current', field: 'l1current' },
                    { headerName: 'L2 Current', field: 'l2current' },
                    { headerName: 'L3 Current', field: 'l3current' },
                ];
                break;
            case 'billing':
                typeColumns = [
                    { headerName: 'cumvahexport', field: 'cumvahexport' },
                    { headerName: 'cumkvarhlag', field: 'cumkvarhlag' },
                    { headerName: 'cumkvarhlead', field: 'cumkvarhlead' },
                    { headerName: 'cumwhexport', field: 'cumwhexport' },
                    { headerName: 'exportpowerfactor', field: 'exportpowerfactor' },
                ];
                break;
            case 'dailyload':
                typeColumns = [
                    { headerName: 'cumvahexport', field: 'cumvahexport' },
                    { headerName: 'cumvahimport', field: 'cumvahimport' },
                    { headerName: 'cumwhimport', field: 'cumwhimport' },
                    { headerName: 'cumwhexport', field: 'cumwhexport' },
                    { headerName: 'reactiveenergyhigh', field: 'reactiveenergyhigh' },
                    { headerName: 'reactiveenergylow', field: 'reactiveenergylow' },
                ];
                break;
            default:
                typeColumns = [];
        }

        let allColumns = [...baseColumns, ...typeColumns];

        if (screenWidth < 768) allColumns = allColumns.slice(0, 5); // responsive

        return allColumns;
    }, [selectedType, screenWidth]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        flex: 1,
        wrapHeaderText: true,
        autoHeaderHeight: true,
        filterParams: { buttons: ['apply', 'reset'] },
    }), []);

    return (
        <div>
            <div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
                <Select value={selectedType} onChange={setSelectedType} style={{ width: 180 }}>
                    <Option value="load">Load</Option>
                    <Option value="event">Event</Option>
                    <Option value="billing">Billing</Option>
                    <Option value="dailyload">Daily Load</Option>
                </Select>
                <DatePicker
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    format="YYYY-MM-DD"
                />
            </div>

            {loading ? (
                <div className="loading"><Spin /> Loading...</div>
            ) : error ? (
                <div className="loading" style={{ color: 'red' }}>{error}</div>
            ) : gridData.length === 0 ? (
                <div className="loading">No Data Found</div>
            ) : (
                <div className="ag-grid-wrapper" style={{ width: '100%', overflowX: 'auto' }}>
                    <div
                        className="ag-theme-alpine"
                        style={{
                            width: screenWidth < 768 ? '800px' : '100%',
                            height: '500px',
                            overflowX: 'auto'
                        }}
                    >
                        <AgGridReact
                            ref={gridRef}
                            rowData={gridData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            animateRows
                            rowSelection="multiple"
                            pagination
                            paginationPageSize={12}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
