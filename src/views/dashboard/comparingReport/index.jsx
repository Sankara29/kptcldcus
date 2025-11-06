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
import Select from 'react-select'
import classnames from 'classnames'
import { Download, Info } from "react-feather";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Pop from "./Pop";

const ComparingReport = () => {
    const navigate = useNavigate();
    const [isDownloading, setIsDownloading] = useState(false)
    const { control } = useForm({});
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState(null); // 'asc' | 'desc' | null
    const itemsPerPage = 10;
    const [completedIds, setCompletedIds] = useState([]);
    const [isDark, setIsDark] = useState(true);
    const [fullDetails, setFullDetails] = useState([])

    const toggleTheme = () => setIsDark(!isDark);
    const gridRef = useRef()
    const [openLogs, setOpenLogs] = useState(false)

    const [filters, setFilters] = useState({
        station_name: 'All',
        feeder_name: 'All',

        slno: '',
        feederId: '',
        id: ''
    });

    // Fetch data


    const fetchData = async () => {
        const res = await fetch('https://testhotel2.prysmcable.com/v27/getall');
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

    useEffect(() => {
        fetch('https://testhotel2.prysmcable.com/v27/completed_kptcl_surveys')
            .then(res => res.json())
            .then(json => {
                const ids = (json.data || []).map(item => item.slno);
                setFullDetails(json.data)
                setCompletedIds(ids);
            })
            .catch(err => console.error("Error fetching completed IDs:", err));
    }, []);


    // Auth check
    // useEffect(() => {
    //     const auth = sessionStorage.getItem('auths');
    //     if (!auth) navigate('/');
    // }, [navigate]);

    // Unique filter options
    // const uniqueCircles = ['All', ...new Set(data.map(d => d.station_name).filter(Boolean))];
    const uniqueCircles = useMemo(() => (
        [...new Set(data.map(n => n.station_name))].filter(Boolean).map(gp => ({ label: gp, value: gp }))
    ), [data])
    // const uniqueEscoms = ['All', ...new Set(data.map(d => d.feeder_name).filter(Boolean))];
    const uniqueEscoms = useMemo(() => (
        [...new Set(data.map(n => n.feeder_name))].filter(Boolean).map(gp => ({ label: gp, value: gp }))
    ), [data])

    const filteredData = (() => {
        // Step 1: Filter by completed IDs and user-defined filters
        const filtered = data
            .filter(item => completedIds.includes(item.slno))
            .filter(item => {
                if (filters.station_name !== 'All' && item.station_name !== filters.station_name) return false;
                if (filters.feeder_name !== 'All' && item.feeder_name !== filters.feeder_name) return false;

                if (filters.slno?.trim()) {
                    const slno = (item?.slno ?? '').toString().trim();
                    const input = filters.slno.trim();
                    if (!slno.startsWith(input)) return false;
                }

                return true;
            });

        // Step 2: Group by station_name and keep only the first occurrence
        const seenStations = new Set();
        const grouped = [];

        for (const item of filtered) {
            if (!seenStations.has(item.station_name)) {
                seenStations.add(item.station_name);
                grouped.push(item);
            }
        }

        // Step 3: Sort by slno numerically
        return grouped.sort((a, b) => {
            const aSlno = Number(a.slno) || 0;
            const bSlno = Number(b.slno) || 0;
            return aSlno - bSlno;
        });
    })();

    // Sort by SLNO
    const sortedData = [...filteredData]

    // const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const paginatedData = sortedData;
    const toggleSortOrder = () => {
        const nextOrder = sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc';
        setSortOrder(nextOrder);
        setCurrentPage(1);
    };

    const updateFilter = (key, value) => {
        console.log(value, 'RRRRRRRRRRRRRR')
        setFilters(prev => ({ ...prev, [key]: value?.value }));
        setCurrentPage(1);
    };

    const columnDefs = useMemo(() => [
        { headerName: 'SLNO', field: 'slno', flex: 1 },
        { headerName: 'Area', field: 'area', flex: 1 },
        { headerName: 'Station Name', field: 'station_name', flex: 2 },
        { headerName: 'Feeder Name', field: 'feeder_name', flex: 2 },

        {
            headerName: 'More Info',
            cellRendererFramework: (params) => (
                <Button
                    color="primary"
                    style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleCellRightClicks(params)}
                >
                    <Info style={{ marginRight: '8px' }} />
                    More Info
                </Button>
            ),
            flex: 1,
            cellStyle: { textAlign: 'center', padding: 0 }
        },
    ], [navigate]);


    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        flex: 1,
        filterParams: { buttons: ['apply', 'reset'] }
    }), [])

    const onGridReady = (params) => {
        gridRef.current = params.api
    }

    const getFilteredData = () => {
        return data
            .filter(item => completedIds.includes(item.slno)) // Only show completed IDs
            .filter(item => {
                if (filters?.station_name !== 'All' && item.station_name !== filters?.station_name) return false;
                if (filters?.feeder_name !== 'All' && item.feeder_name !== filters?.feeder_name) return false;



                if (filters.slno?.trim()) {
                    const slno = (item?.slno ?? '').toString().trim();
                    const input = filters.slno.trim();
                    if (!slno.startsWith(input)) return false;
                }



                return true;
            }).sort((a, b) => {
                // Normalize feeding station names for comparison


                // Parse SLNO safely to numbers
                const aSlno = Number(a.slno) || 0;
                const bSlno = Number(b.slno) || 0;
                if (aSlno !== bSlno) return aSlno - bSlno;


            });
    };
    const sortData = (arr) => {
        if (!sortOrder) return arr;
        return [...arr].sort((a, b) => {
            const aVal = Number(a.slno) || 0;
            const bVal = Number(b.slno) || 0;
            return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        });
    };
    const fetchGenInfoById = async (id) => {
        try {
            console.log(fullDetails, id)
            const res = fullDetails.find((data) => data.slno == id);
            if (res) return res;
            return null;
        } catch {
            return null;
        }
    };
    const exportTableWithGenInfo = async () => {
        try {
            setIsDownloading(true)
            // Filtered + sorted + paginated data
            const filtered = getFilteredData();
            const sorted = sortData(filtered);
            const paginated = sorted;

            // Fetch gen_info for each row in current page
            // const combined = await Promise.all(
            //     paginated.map(async (item) => {
            //         const genInfo = await fetchGenInfoById(item.slno);
            //         console.log(genInfo, "RRRRRR")
            //         return { ...item, ...genInfo };
            //     })
            // );
            const combined = [];
            for (const item of paginated) {
                const genInfo = await fetchGenInfoById(item.slno);
                if (genInfo) {
                    combined.push({ ...item, ...genInfo });
                } else {
                    combined.push(item); // Or skip, depending on your needs
                }
            }

            // Prepare worksheet JSON rows
            const feederTypeMap = {
                1: 'INDUSTRIAL',
                2: 'IP(Agriculture)',
                3: 'NJY',
                4: 'RURAL',
                5: 'URBAN',
                6: 'WATER SUPPLY',
                7: 'IDLE',
                8: 'STN AUX'
            };

            const worksheetData = combined.map(row => ({
                'Slno': row.slno,
                'Remark': row.remarks,
                'Meter_no': row.meter_no,
                'Meter_make': row.meter_make,
                'Feeder_name': row.feeder_name,
                'Feeder_type': row.feeder_type != null ? feederTypeMap[row.feeder_type] || 'UNKNOWN' : 'NULL',
                'Completed_at': row.completed_at,
                'station_name': row.station_name,
                'Area': row.area
            }));

            // Create Excel workbook and sheet
            const ws = XLSX.utils.json_to_sheet(worksheetData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Data");

            // Write and save file
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'exported_data.xlsx');
        } catch (err) {
            console.error('Export failed:', err);
            alert('Failed to export data.');
        } finally {
            setIsDownloading(false)
        }
    };
    const [slno, setSlno] = useState(null)
    const handleCellRightClicks = async (params) => {

        const res = await fetch('https://testhotel2.prysmcable.com/v27/getall');
        const json = await res.json();
        const data = json.data || [];
        const stationName = params.data.station_name;
        const feedersForStation = data.filter(
            d => d.station_name === stationName
        );

        if (!feedersForStation || feedersForStation.length === 0) {
            console.warn("No feeders found for station:", stationName);
            return;
        }

        const Ids = feedersForStation.map(d => d.slno);

        console.log("Selected Station:", stationName);
        console.log("Feeders:", feedersForStation);
        console.log("IDs:", Ids);

        setSlno(Ids);

        setOpenLogs(true)


    };
    console.log(uniqueEscoms, 'rrr')
    return (
        <>
            <h1>KPTCL BONTON</h1>
            <Row className='align-items-center mb-2' >

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
                <Col md='3' sm='6' >
                    <Button
                        color="primary"
                        style={{ width: '150px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => exportTableWithGenInfo()}
                    >
                        {isDownloading ? (
                            <div className="spinner-border spinner-border-sm text-light" role="status" />
                        ) : (
                            <>
                                <Download style={{ marginRight: '8px' }} />
                                Download
                            </>
                        )}
                    </Button>
                </Col>
                {/* Count */}
                <Col md='3' sm='6'>
                    <h5 className='mt-2'>Total/Finished: {`${data.length}/${paginatedData.length}`}</h5>
                </Col>

            </Row>

            <div className="ag-theme-alpine" style={{ height: '674px', width: '100%' }}>
                {paginatedData.length > 0 ? (
                    <AgGridReact
                        ref={gridRef}
                        rowData={paginatedData}
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


            <Modal
                isOpen={openLogs}
                toggle={() => setOpenLogs(!openLogs)}
                style={{
                    maxWidth: '95%',
                    width: '95%',
                    maxHeight: '80vh',
                    // overflowY: 'auto',
                    // marginTop: '5vh'
                    // overflowY: 'scroll', // still enables scrolling
                    // scrollbarWidth: 'none' // Firefox
                }}
            >
                <ModalHeader toggle={() => setOpenLogs(!openLogs)}></ModalHeader>
                <ModalBody className="pb-3 px-sm-1 mx-2">

                    <Pop id={slno} />

                </ModalBody>
            </Modal>
        </>
    )
}

export default ComparingReport;