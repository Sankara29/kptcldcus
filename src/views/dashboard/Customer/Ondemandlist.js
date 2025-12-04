
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, Accordion, AccordionItem, AccordionHeader, AccordionBody, Table } from 'reactstrap';
import { Info, Search } from 'react-feather';
import NodeDataGrid from './pop';
import dayjs from 'dayjs';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FileText } from "react-feather";
import Loader from './Loader.js';
import API_URL from '../../../config.js';


const NodeList = () => {
    const gridRef = useRef();
    const [data, setData] = useState([]);





    const [searchText, setSearchText] = useState('');

    const fetchData = async () => {
        try {


            const res = await fetch(`${API_URL}/get-commands-by-dcu`);
            if (!res.ok) throw new Error(res.statusText);
            const json = await res.json() || {};
            const commData = json.data || []

            setData(commData);
        } catch (error) {
            console.error("Error fetching nodes with meters or TM:", error);
            setData([]);
        }
    };





    useEffect(() => {
        fetchData();
    }, []);


    const formatDate = (value) => {
        if (!value) return "";                     // handle null
        if (value.includes("T")) return value.split("T").join(" ");
        return value;
    };
    // --- Column definitions ---
    const columnDefs = useMemo(() => {
        if (!data || data.length === 0) return [];

        const cols = [
            { headerName: "DCU No", field: "dcu_id", flex: 2 },
            { headerName: "Meter No", field: "meter_no", flex: 2 },
            { headerName: "Command", field: "ondemand_data", flex: 2 },
            { headerName: "Created At", field: "created_at", flex: 2, valueFormatter: params => formatDate(params.value) },
            { headerName: "Acknowledged_at", field: "acknowledged_at", flex: 2, valueFormatter: params => formatDate(params.value) },
            { headerName: "status", field: "status", flex: 2 },
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
        minWidth: 80  // Enforce min size
    }), []);

    const onSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        gridRef.current.api.setQuickFilter(value); // AG Grid built-in search
    };



    return (
        <div className="container-fluid mt-3">
            <h1 className="mb-3">DCU Wise Ondemand History</h1>

            {/* 🔍 Search bar */}
            <div className="d-flex align-items-center mb-3">
                {/* <Search size={18} style={{ marginRight: '8px' }} /> */}
                <Input
                    type="text"
                    placeholder="Search DCU No..."
                    value={searchText}
                    onChange={onSearchChange}
                    style={{ maxWidth: '300px' }}
                />

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
                        // gridOptions={gridOptions}
                        // getRowStyle={gridOptions.getRowStyle}
                        suppressHorizontalScroll
                    />
                ) : (
                    <Loader />
                )}
            </div>


        </div>
    );
};

export default NodeList;




