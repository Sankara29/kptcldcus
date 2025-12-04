import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useRef, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { Collapse, DatePicker, Select, Spin } from 'antd';
import { Button, Modal, Table } from 'reactstrap';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionBody
} from 'reactstrap';

import CommandModal from './CommandModal';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
// import { set } from 'date-fns';
const { Option } = Select;
import Papa from "papaparse";
// import { set } from 'date-fns';


export default function NodeDataGrid({ node_id, meter_id, nodeMeters, slno }) {
    const [selectedType, setSelectedType] = useState('load');
    const [gridData, setGridData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const gridRef = useRef();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [selectedMeter, setSelectedMeter] = useState(meter_id || (nodeMeters.length > 0 ? nodeMeters[0] : null));
    const [slnoData, setSlnoData] = useState(null);
    const [open, setOpen] = useState('1');
    const [ondemandMeter, setOndemandMeter] = useState(null);
    const [dateRange, setDateRange] = useState([
        dayjs().subtract(3, 'day'),
        dayjs()
    ]);
    const [gettime, setGettime] = useState(null);
    const [heartbeatModalOpen, setHeartbeatModalOpen] = useState(false);





    const fetchTableData = async (type, dates) => {
        setLoading(true);
        setError(null);

        try {
            const [start, end] = dates;
            const fromStr = start.format("YYYY-MM-DD");
            const toStr = end.format("YYYY-MM-DD");

            let url = `https://testpms.ms-tech.in/v23/node-data/${node_id}?table=${type}&from=${fromStr}&to=${toStr}`;

            if (selectedMeter) {
                url += `&meter=${selectedMeter}`;
            }

            const res = await fetch(url);
            const result = await res.json();

            if (!res.ok || result.status !== 'success') {
                throw new Error(result.message || 'Failed to fetch data');
            }

            const data = result.data.map((row, idx) => ({
                ...row,
                meter_no: row.meter_id || row.meter_no || selectedMeter || `meter${idx + 1}`,
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
        if (dateRange && dateRange[0] && dateRange[1]) {
            fetchTableData(selectedType, dateRange);
        }
    }, [node_id, selectedType, dateRange, selectedMeter]);

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
    const [openOndemand, setOpenOndemand] = useState(false);
    const handleOndemand = (meterNo) => {
        setOndemandMeter(meterNo);
        setOpenOndemand(true); // This will open the Ondemand modal or page
    }
    const fetchSlnoData = async () => {
        if (!slno) return;
        try {
            const sql = `select * from kptcl_gen_dcu where slno='${slno}' order by created_at desc limit 1;`;
            const queryApi = "https://testhotel2.prysmcable.com/v24/query-checker";
            const response = await fetch(queryApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sql: sql })  // NOTE: send one query at a time
            });
            if (!response.ok) throw new Error(`Failed to fetch ${type}`);

            const csvText = await response.text(); // get CSV text
            const parsed = Papa.parse(csvText, { header: true });
            const data = parsed.data;

            setSlnoData(data);
            // Process the data as needed
        } catch (error) {
            console.error('Error fetching slno data:', error);
        }

    }

    useEffect(() => {
        fetchSlnoData();
    }, [slno]);

    const handleheadbeat = async () => {
        try {
            const response = await fetch(`https://testpms.ms-tech.in/v15/gwid-time-kptcl/${node_id}`, {
                method: 'GET',
            });
            const result = await response.json();

            setGettime(result)

            setHeartbeatModalOpen(true);

        } catch (error) {
            alert(`Error sending DCU Heartbeat command: ${error.message}`);
        }
    }


    return (
        <div>
            <div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
                {
                    nodeMeters.length > 1 && (
                        <Select
                            value={selectedMeter}
                            onChange={(value) => {
                                setSelectedMeter(value);
                            }}
                            style={{ width: 180 }}
                        >
                            {nodeMeters.map((meter) => (
                                <Option
                                    key={meter.meter_no}
                                    value={meter.meter_no}
                                >
                                    {meter.meter_no}
                                </Option>
                            ))}
                        </Select>
                    )
                }

                <Select value={selectedType} onChange={setSelectedType} style={{ width: 180 }}>
                    <Option value="load">Load</Option>
                    <Option value="event">Event</Option>
                    <Option value="billing">Billing</Option>
                    <Option value="dailyload">Daily Load</Option>
                </Select>
                {/* <DatePicker
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    format="YYYY-MM-DD"
                /> */}
                <DatePicker.RangePicker
                    value={dateRange}
                    onChange={(range) => setDateRange(range)}
                    format="YYYY-MM-DD"
                />
                <Button
                    color="success"
                    className="ms-1"
                    onClick={() => handleheadbeat()}
                >

                    DCU Heartbeat
                </Button>
            </div>
            <Accordion open={open} toggle={(id) => setOpen(open === id ? undefined : id)}>
                <AccordionItem>
                    <AccordionHeader targetId="1">
                        Meter Details & OnDemand
                    </AccordionHeader>

                    <AccordionBody accordionId="1">
                        {slnoData ? (
                            <Table bordered striped size="sm">
                                <thead>
                                    <tr>
                                        <th>Meter Type</th>
                                        <th>Meter Number</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Main Meter</td>
                                        <td>  {(slnoData?.[0]?.main_meter_number ?? nodeMeters?.[0]?.meter_no)
                                            ?.split(",")[0]
                                            ?.trim() || ""}
                                        </td>
                                        <td>
                                            <Button
                                                color="success"
                                                size="sm"
                                                onClick={() => handleOndemand(
                                                    (slnoData?.[0]?.main_meter_number ||
                                                        nodeMeters?.[0]?.meter_no ||
                                                        "")
                                                        .split(",")[0]
                                                        .trim()
                                                )}
                                            >
                                                OnDemand
                                            </Button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Check Meter</td>
                                        <td>  {(slnoData?.[0]?.check_meter_number ?? nodeMeters?.[1]?.meter_no)
                                            ?.split(",")[0]
                                            ?.trim() || ""}
                                        </td>
                                        <td>
                                            <Button
                                                color="success"
                                                size="sm"
                                                onClick={() => handleOndemand(
                                                    (slnoData?.[0]?.check_meter_number ||
                                                        nodeMeters?.[1]?.meter_no ||
                                                        "")
                                                        .split(",")[0]
                                                        .trim()
                                                )}
                                            >
                                                OnDemand
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        ) : (
                            <div>No meter data found</div>
                        )}
                    </AccordionBody>
                </AccordionItem>
            </Accordion>

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
            <CommandModal isOpen={openOndemand} toggle={() => setOpenOndemand(false)} meterNo={ondemandMeter ?? meter_id} dcu_id={node_id} />
            {gettime !== null && gettime.length && (<HeartbeatModal
                isOpen={heartbeatModalOpen}
                toggle={() => setHeartbeatModalOpen(false)}
                data={gettime}
            />)}
        </div>
    );
}






function HeartbeatModal({ isOpen, toggle, data }) {

    const itemsPerPage = 15;
    const [currentPage, setCurrentPage] = useState(1);

    // Pagination Logic
    const totalItems = data?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data?.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };


    // Apply pagination only if more than 12 record

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg">
            <div style={{ maxHeight: "700px", width: '100%', display: 'flex', flexDirection: 'column', alignItems: "center", overflowY: "auto" }}>
                <h5>DCU Heartbeat Data</h5>

                <div style={{ maxHeight: "700px", width: '98%', overflowY: "auto" }}>
                    <Table bordered striped size="sm" className="mt-2">
                        <thead style={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 1 }}>
                            <tr>
                                <th>Node ID</th>
                                <th>IMEI</th>
                                <th>CSQ</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData?.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.node_id}</td>
                                    <td>{row.imei}</td>
                                    <td>{row.csq}</td>
                                    <td>{dayjs(row.tms).format('YYYY-MM-DD HH:mm')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination className="align-items-center w-150">
                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink first onClick={() => handlePageChange(1)} />
                        </PaginationItem>

                        <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
                        </PaginationItem>

                        {[...Array(totalPages).keys()].map((num) => (
                            <PaginationItem active={currentPage === num + 1} key={num}>
                                <PaginationLink onClick={() => handlePageChange(num + 1)}>
                                    {num + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>

                        <PaginationItem disabled={currentPage === totalPages}>
                            <PaginationLink last onClick={() => handlePageChange(totalPages)} />
                        </PaginationItem>
                    </Pagination>
                )}
            </div>
        </Modal>
    );
}
