
// import React, { useState, useEffect, useMemo } from 'react';
// import moment from 'moment';
// import ApexCharts from 'react-apexcharts';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Input, Label, Row, Col } from 'reactstrap';

// import 'bootstrap/dist/css/bootstrap.min.css';


// const BarChart = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { node_id } = location.state || {};

//     const [energyData, setEnergyData] = useState([]);
//     const [waterData, setWaterData] = useState([]);
//     const [billingData, setBillingData] = useState({});
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [waterMonth, setWaterMonth] = useState([]);
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');

//     const chartsPerPage = 5;
//     const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [dlResponse, billingResponse, waterResponse] = await Promise.all([
//                     fetch('https://testpms.ms-tech.in/v15/getDlReport'),
//                     fetch('https://testpms.ms-tech.in/v15/getBillingReport'),
//                     fetch('https://testpms.ms-tech.in/v15/getWaterReport')
//                 ]);
//                 const dlResult = await dlResponse.json();
//                 const billingResult = await billingResponse.json();
//                 const waterResult = await waterResponse.json();

//                 if (Array.isArray(dlResult.data)) {
//                     setEnergyData(dlResult.data.reverse());
//                 }
//                 if (Array.isArray(waterResult.data)) {
//                     setWaterMonth(formatWaterData(waterResult.data));
//                 }
//                 if (Array.isArray(dlResult.water)) {
//                     setWaterData(dlResult.water);
//                 }
//                 if (billingResult.statusCode === 200) {
//                     setBillingData(formatBillingData(billingResult.data));
//                 }
//             } catch (err) {
//                 console.error('Data fetch error:', err);
//             }
//         };
//         fetchData();
//     }, []);

//     const formatBillingData = (data) => {
//         const formatted = {};
//         data.forEach(({ gwid, month_start, monthly_kWh, mdwimp, PF }) => {
//             if (!formatted[gwid]) formatted[gwid] = {};
//             formatted[gwid][month_start] = {
//                 kWh: (parseFloat(monthly_kWh) / 1000).toFixed(2),
//                 MDkW: (parseFloat(mdwimp) / 1000).toFixed(2),
//                 PF: parseFloat(PF).toFixed(2),
//             };
//         });
//         return formatted;
//     };

//     const formatWaterData = (data) => {
//         const formatted = {};
//         data.forEach(({ node_id, usage_month, total_monthly_usage }) => {
//             if (!formatted[node_id]) formatted[node_id] = {};
//             formatted[node_id][usage_month] = {
//                 total_monthly_usage: parseFloat(total_monthly_usage / 1000).toFixed(2),
//             };
//         });
//         return formatted;
//     };

//     const formatDate = (dateString) => {
//         const [date, time = '00:00:00'] = dateString.split(' ');
//         const [year, month, day] = date.split('-').map((part) => part.padStart(2, '0'));
//         return moment(`${year}-${month}-${day} ${time}`, 'YYYY-MM-DD HH:mm:ss').format('MMM DD');
//     };

//     const groupedEnergy = useMemo(() => {
//         const filtered = energyData.filter(({ timeclock }) => {
//             if (!startDate && !endDate) return true;
//             const dateOnly = moment(timeclock.split(' ')[0], 'YYYY-MM-DD');
//             const isAfterStart = startDate ? dateOnly.isSameOrAfter(moment(startDate)) : true;
//             const isBeforeEnd = endDate ? dateOnly.isSameOrBefore(moment(endDate)) : true;
//             return isAfterStart && isBeforeEnd;
//         });

//         // return filtered.reduce((acc, { gwid, timeclock, daily_whimp }) => {
//         //     const date = formatDate(timeclock);
//         //     const currentWh = parseFloat(daily_whimp) / 1000;
//         //     if (!acc[gwid]) acc[gwid] = { dates: [], deltas: [] };
//         //     acc[gwid].dates.push(date);
//         //     acc[gwid].deltas.push(currentWh);
//         //     return acc;
//         // }, {});
//         return filtered.reduce((acc, { gwid, timeclock, daily_whimp }) => {
//             const originalDate = moment(timeclock.split(' ')[0], 'YYYY-MM-DD');
//             const shiftedDate = originalDate.subtract(1, 'days').format('MMM DD'); // shift 1 day back
//             const currentWh = parseFloat(daily_whimp) / 1000;
//             if (!acc[gwid]) acc[gwid] = { dates: [], deltas: [] };
//             acc[gwid].dates.push(shiftedDate);
//             acc[gwid].deltas.push(currentWh);
//             return acc;
//         }, {});
//     }, [energyData, startDate, endDate]);

//     const groupedWater = useMemo(() => {
//         return waterData.reduce((acc, { node_id, date, water_usage }) => {
//             const formattedDate = moment(date, 'YYYY-MM-DD').format('MMM DD');
//             if (!acc[node_id]) acc[node_id] = {};
//             acc[node_id][formattedDate] = parseFloat(water_usage);
//             return acc;
//         }, {});
//     }, [waterData]);

//     const filteredGWIDs = Object.keys(groupedEnergy).filter((gwid) =>
//         gwid.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const totalPages = Math.ceil(filteredGWIDs.length / chartsPerPage);
//     const currentPageData = filteredGWIDs.slice(
//         (currentPage - 1) * chartsPerPage,
//         currentPage * chartsPerPage
//     );

//     const tableCellStyle = {
//         padding: '8px',
//         border: '1px solid #ccc',
//         textAlign: 'left'
//     };

//     const buttonStyle = {
//         padding: '10px 20px',
//         fontSize: '16px',
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//         margin: '0 10px'
//     };

//     useEffect(() => {
//         if (node_id) setSearchTerm(node_id);
//     }, [node_id]);

//     return (
//         <div>
//             <h2>Energy & Water Consumption by Nodes</h2>
//             <p>Total Unique Nodes: {filteredGWIDs.length}</p>


//             <Row className="mb-4">
//                 <Col md={3}>
//                     <Label for="searchNode">Search NodeId</Label>
//                     <Input
//                         id="searchNode"
//                         type="text"
//                         placeholder="Search NodeId..."
//                         value={searchTerm}
//                         onChange={(e) => {
//                             setSearchTerm(e.target.value);
//                             setCurrentPage(1);
//                         }}
//                     />
//                 </Col>

//                 <Col md={3}>
//                     <Label for="startDate">From Date</Label>
//                     <Input
//                         id="startDate"
//                         type="date"
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                     />
//                 </Col>

//                 <Col md={3}>
//                     <Label for="endDate">To Date</Label>
//                     <Input
//                         id="endDate"
//                         type="date"
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                     />
//                 </Col>
//             </Row>

//             {currentPageData.map((gwid) => {
//                 const { dates, deltas } = groupedEnergy[gwid];
//                 const waterSeries = dates.map(date => groupedWater[gwid]?.[date] ?? 0);

//                 const limit = isMobile ? 20 : dates.length;

//                 const displayDates = dates.slice(-limit);
//                 const displayDeltas = deltas.slice(-limit);
//                 const displayWater = waterSeries.slice(-limit);

//                 const options = {
//                     chart: {
//                         type: 'bar',
//                         height: 350,
//                         stacked: false,
//                         events: {
//                             dataPointSelection: (event, chartContext, config) => {
//                                 if (config.seriesIndex === 0) {
//                                     navigate('/dashboard/Dl/energyByNodeId', {
//                                         state: { node_id: gwid }
//                                     });
//                                 }
//                             }
//                         }
//                     },
//                     xaxis: {
//                         categories: displayDates,
//                         title: { text: 'Date' },
//                         labels: {
//                             formatter: (value) => moment(value, 'MMM DD').format('DD')
//                         }
//                     },
//                     tooltip: {
//                         x: {
//                             formatter: (value) => moment(value, 'MMM DD').format('MMM DD')
//                         }
//                     },
//                     yaxis: [
//                         {
//                             title: { text: 'Energy (kWh)' },
//                             labels: { formatter: val => val.toFixed(2) }
//                         },
//                         {
//                             opposite: true,
//                             title: { text: 'Water (Litres)' },
//                             labels: { formatter: val => val.toFixed(0) }
//                         }
//                     ],
//                     colors: ['#4CAF50', '#2196F3'],
//                     plotOptions: {
//                         bar: {
//                             columnWidth: '40%',
//                             dataLabels: { position: 'top' }
//                         }
//                     },
//                     dataLabels: { enabled: false },
//                     title: {
//                         text: `Energy & Water Consumption - ${gwid}`,
//                         align: 'center'
//                     },
//                     legend: {
//                         position: 'top'
//                     }
//                 };

//                 const series = [
//                     { name: 'Energy (kWh)', data: displayDeltas },
//                     { name: 'Water (Litres)', data: displayWater }
//                 ];

//                 return (
//                     <div key={gwid} style={{ marginBottom: '40px' }}>
//                         <div style={{ width: '100%', overflowX: 'auto' }}>
//                             <ApexCharts
//                                 options={options}
//                                 series={series}
//                                 type="bar"
//                                 height={350}
//                                 width={'100%'}
//                             />
//                         </div>

//                         <h4 style={{ marginTop: '10px' }}>Billing Data</h4>
//                         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//                             <thead>
//                                 <tr style={{ backgroundColor: '#f0f0f0' }}>
//                                     <th style={tableCellStyle}>Month</th>
//                                     <th style={tableCellStyle}>Units (kWh)</th>
//                                     <th style={tableCellStyle}>MDkW</th>
//                                     <th style={tableCellStyle}>PF</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {billingData[gwid] ? (
//                                     Object.entries(billingData[gwid])
//                                         .sort(([a], [b]) => new Date(`${a}-01`) - new Date(`${b}-01`))
//                                         .map(([month, value]) => (
//                                             <tr key={month}>
//                                                 <td style={tableCellStyle}>{moment(month, 'YYYY-MM-DD').format('MMMM')}</td>
//                                                 <td style={tableCellStyle}>{value.kWh}</td>
//                                                 <td style={tableCellStyle}>{value.MDkW}</td>
//                                                 <td style={tableCellStyle}>{value.PF}</td>
//                                             </tr>
//                                         ))
//                                 ) : (
//                                     <tr>
//                                         <td style={tableCellStyle} colSpan="4">No billing data available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>

//                         <h4 style={{ marginTop: '10px' }}>Water Data</h4>
//                         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//                             <thead>
//                                 <tr style={{ backgroundColor: '#f0f0f0' }}>
//                                     <th style={tableCellStyle}>Month</th>
//                                     <th style={tableCellStyle}>Water Used (m³)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {waterMonth[gwid] ? (
//                                     Object.entries(waterMonth[gwid])
//                                         .map(([month, value]) => (
//                                             <tr key={month}>
//                                                 <td style={tableCellStyle}>{moment(month, 'YYYY-MM-DD').format('MMMM')}</td>
//                                                 <td style={tableCellStyle}>{value.total_monthly_usage}</td>
//                                             </tr>
//                                         ))
//                                 ) : (
//                                     <tr>
//                                         <td style={tableCellStyle} colSpan="2">No water data available</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 );
//             })}

//             <div style={{ marginTop: '20px', textAlign: 'center' }}>
//                 <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={buttonStyle}>Previous</button>
//                 <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
//                 <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={buttonStyle}>Next</button>
//             </div>
//         </div>
//     );
// };

// export default BarChart;


import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import ApexCharts from 'react-apexcharts';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Label, Row, Col, Button, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'

const BarChart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { node_id } = location.state || {};

    const [energyData, setEnergyData] = useState([]);
    const [waterData, setWaterData] = useState([]);
    const [billingData, setBillingData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [waterMonth, setWaterMonth] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [viewMode, setViewMode] = useState('chart'); // chart or table

    const chartsPerPage = 5;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dlResponse, billingResponse, waterResponse] = await Promise.all([
                    fetch('https://testpms.ms-tech.in/v15/getDlReport'),
                    fetch('https://testpms.ms-tech.in/v15/getBillingReport'),
                    fetch('https://testpms.ms-tech.in/v15/getWaterReport')
                ]);
                const dlResult = await dlResponse.json();
                const billingResult = await billingResponse.json();
                const waterResult = await waterResponse.json();

                if (Array.isArray(dlResult.data)) setEnergyData(dlResult.data.reverse());
                if (Array.isArray(waterResult.data)) setWaterMonth(formatWaterData(waterResult.data));
                if (Array.isArray(dlResult.water)) setWaterData(dlResult.water);
                if (billingResult.statusCode === 200) setBillingData(formatBillingData(billingResult.data));
            } catch (err) {
                console.error('Data fetch error:', err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (node_id) setSearchTerm(node_id);
    }, [node_id]);

    const formatBillingData = (data) => {
        const formatted = {};
        data.forEach(({ gwid, month_start, monthly_kWh, mdwimp, PF }) => {
            if (!formatted[gwid]) formatted[gwid] = {};
            formatted[gwid][month_start] = {
                kWh: (parseFloat(monthly_kWh) / 1000).toFixed(2),
                MDkW: (parseFloat(mdwimp) / 1000).toFixed(2),
                PF: parseFloat(PF).toFixed(2),
            };
        });
        return formatted;
    };

    const formatWaterData = (data) => {
        const formatted = {};
        data.forEach(({ node_id, usage_month, total_monthly_usage }) => {
            if (!formatted[node_id]) formatted[node_id] = {};
            formatted[node_id][usage_month] = {
                total_monthly_usage: parseFloat(total_monthly_usage / 1000).toFixed(2),
            };
        });
        return formatted;
    };

    const groupedEnergy = useMemo(() => {
        const filtered = energyData.filter(({ timeclock }) => {
            if (!startDate && !endDate) return true;
            const dateOnly = moment(timeclock.split(' ')[0], 'YYYY-MM-DD');
            const isAfterStart = startDate ? dateOnly.isSameOrAfter(moment(startDate)) : true;
            const isBeforeEnd = endDate ? dateOnly.isSameOrBefore(moment(endDate)) : true;
            return isAfterStart && isBeforeEnd;
        });

        return filtered.reduce((acc, { gwid, timeclock, daily_whimp }) => {
            const shiftedDate = moment(timeclock.split(' ')[0], 'YYYY-MM-DD').subtract(1, 'days').format('MMM DD');
            const currentWh = parseFloat(daily_whimp) / 1000;
            if (!acc[gwid]) acc[gwid] = { dates: [], deltas: [] };
            acc[gwid].dates.push(shiftedDate);
            acc[gwid].deltas.push(currentWh);
            return acc;
        }, {});
    }, [energyData, startDate, endDate]);

    const groupedWater = useMemo(() => {
        return waterData.reduce((acc, { node_id, date, water_usage }) => {
            const formattedDate = moment(date, 'YYYY-MM-DD').format('MMM DD');
            if (!acc[node_id]) acc[node_id] = {};
            acc[node_id][formattedDate] = parseFloat(water_usage);
            return acc;
        }, {});
    }, [waterData]);

    const filteredGWIDs = Object.keys(groupedEnergy).filter((gwid) =>
        gwid.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredGWIDs.length / chartsPerPage);
    const currentPageData = filteredGWIDs.slice((currentPage - 1) * chartsPerPage, currentPage * chartsPerPage);

    const tableCellStyle = {
        padding: '8px',
        border: '1px solid #ccc',
        textAlign: 'left'
    };

    const renderChartOrTable = (gwid) => {
        const { dates, deltas } = groupedEnergy[gwid];
        const waterSeries = dates.map(date => groupedWater[gwid]?.[date] ?? 0);
        const limit = isMobile ? 20 : dates.length;

        const displayDates = dates.slice(-limit);
        const displayDeltas = deltas.slice(-limit);
        const displayWater = waterSeries.slice(-limit);

        if (viewMode === 'chart') {
            const options = {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: false,
                    events: {
                        dataPointSelection: (event, chartContext, config) => {
                            if (config.seriesIndex === 0) {
                                navigate('/dashboard/Dl/energyByNodeId', {
                                    state: { node_id: gwid }
                                });
                            }
                        }
                    }
                },
                xaxis: {
                    categories: displayDates,
                    title: { text: 'Date' }
                },
                yaxis: [
                    { title: { text: 'Energy (kWh)' }, labels: { formatter: val => val.toFixed(2) } },
                    { opposite: true, title: { text: 'Water (Litres)' }, labels: { formatter: val => val.toFixed(0) } }
                ],
                colors: ['#4CAF50', '#2196F3'],
                plotOptions: { bar: { columnWidth: '40%' } },
                dataLabels: { enabled: false },
                title: { text: `Energy & Water - ${gwid}`, align: 'center' },
                legend: { position: 'top' }
            };

            const series = [
                { name: 'Energy (kWh)', data: displayDeltas },
                { name: 'Water (Litres)', data: displayWater }
            ];

            return <><ApexCharts options={options} series={series} type="bar" height={350} />
                <h4 style={{ marginTop: '10px' }}>Billing Data</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={tableCellStyle}>Month</th>
                            <th style={tableCellStyle}>Units (kWh)</th>
                            <th style={tableCellStyle}>MDkW</th>
                            <th style={tableCellStyle}>PF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billingData[gwid] ? (
                            Object.entries(billingData[gwid])
                                .sort(([a], [b]) => new Date(`${a}-01`) - new Date(`${b}-01`))
                                .map(([month, value]) => (
                                    <tr key={month}>
                                        <td style={tableCellStyle}>{moment(month, 'YYYY-MM-DD').format('MMMM')}</td>
                                        <td style={tableCellStyle}>{value.kWh}</td>
                                        <td style={tableCellStyle}>{value.MDkW}</td>
                                        <td style={tableCellStyle}>{value.PF}</td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td style={tableCellStyle} colSpan="4">No billing data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <h4 style={{ marginTop: '10px' }}>Water Data</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={tableCellStyle}>Month</th>
                            <th style={tableCellStyle}>Water Used (m³)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waterMonth[gwid] ? (
                            Object.entries(waterMonth[gwid])
                                .map(([month, value]) => (
                                    <tr key={month}>
                                        <td style={tableCellStyle}>{moment(month, 'YYYY-MM-DD').format('MMMM')}</td>
                                        <td style={tableCellStyle}>{value.total_monthly_usage}</td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td style={tableCellStyle} colSpan="2">No water data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>;
        }

        // Table view
        return (
            <>
                <h4 style={{ marginTop: '10px' }}>Energy & Water Data for Node: {gwid}</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f0f0f0' }}>
                        <tr>
                            <th style={tableCellStyle}>Date</th>
                            <th style={tableCellStyle}>Energy (kWh)</th>
                            <th style={tableCellStyle}>Water (Litres)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayDates.map((date, index) => (
                            <tr key={index}>
                                <td style={tableCellStyle}>{date}</td>
                                <td style={tableCellStyle}>{displayDeltas[index]}</td>
                                <td style={tableCellStyle}>{displayWater[index]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h4 style={{ marginTop: '20px' }}>Billing Data for Node: {gwid}</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={tableCellStyle}>Month</th>
                            <th style={tableCellStyle}>Units (kWh)</th>
                            <th style={tableCellStyle}>MDkW</th>
                            <th style={tableCellStyle}>PF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billingData[gwid] ? (
                            Object.entries(billingData[gwid])
                                .sort(([a], [b]) => new Date(`${a}-01`) - new Date(`${b}-01`))
                                .map(([month, value]) => (
                                    <tr key={month}>
                                        <td style={tableCellStyle}>{moment(month, 'YYYY-MM-DD').format('MMMM')}</td>
                                        <td style={tableCellStyle}>{value.kWh}</td>
                                        <td style={tableCellStyle}>{value.MDkW}</td>
                                        <td style={tableCellStyle}>{value.PF}</td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td style={tableCellStyle} colSpan="4">No billing data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <h4 style={{ marginTop: '20px' }}>Water Data for Node: {gwid}</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f0f0f0' }}>
                            <th style={tableCellStyle}>Month</th>
                            <th style={tableCellStyle}>Water Used (m³)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waterMonth[gwid] ? (
                            Object.entries(waterMonth[gwid])
                                .map(([month, value]) => (
                                    <tr key={month}>
                                        <td style={tableCellStyle}>{moment(month, 'YYYY-MM-DD').format('MMMM')}</td>
                                        <td style={tableCellStyle}>{value.total_monthly_usage}</td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td style={tableCellStyle} colSpan="2">No water data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        );
    };
    const viewOptions = [
        { value: 'chart', label: 'Chart' },
        { value: 'table', label: 'Table' },
    ];
    return (
        <div>
            <h2>Energy & Water Consumption by Nodes</h2>
            <Row className="mb-4">
                <Col md={3}>
                    <Label for="searchNode">Search NodeId</Label>
                    <Input
                        id="searchNode"
                        type="text"
                        placeholder="Search NodeId..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </Col>
                <Col md={3}>
                    <Label for="startDate">From Date</Label>
                    <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Label for="endDate">To Date</Label>
                    <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Col md={5} style={{ height: '10px' }}>
                        <Label for="viewModeSelect">View Mode</Label>
                        <Select
                            id="viewModeSelect"
                            options={viewOptions}
                            value={viewOptions.find(option => option.value === viewMode)}
                            onChange={(selectedOption) => setViewMode(selectedOption.value)}
                        />
                    </Col>
                </Col>
            </Row>

            {currentPageData.map((gwid) => (
                <div key={gwid} style={{ marginBottom: '40px' }}>
                    {renderChartOrTable(gwid)}
                </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    color="primary"
                >
                    Previous
                </Button>
                <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
                <Button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    color="primary"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default BarChart;
