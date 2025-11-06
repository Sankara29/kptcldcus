import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { Plus } from 'react-feather';
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const ModelData = ({ isOpen, toggle, method, data }) => {
    const gridRef = useRef()
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        flex: 1,

        wrapText: true,             // Enables text wrapping
        autoHeight: true,           // Adjusts row height to fit wrapped text
        filterParams: { buttons: ['apply', 'reset'] },
        // cellStyle: {                // Optional: ensures cell allows wrapping
        //     whiteSpace: 'normal',
        //     wordBreak: 'break-word'
        // }
    }), [])

    const onGridReady = (params) => {
        gridRef.current = params.api
    }

    const columnDefs = useMemo(() => [
        { headerName: 'meterNo', field: 'meterno', flex: 2 },
        { headerName: "data", field: "data", flex: 4 },
        { headerName: "create_at", field: "created_at_text", flex: 2 }
    ], []);

    return (
        <div >
            <Modal isOpen={isOpen} toggle={toggle} centered style={{ maxWidth: "93% !important" }} className="increases-width" >
                <ModalHeader toggle={toggle}>
                    {method}
                </ModalHeader>
                <ModalBody>
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
                </ModalBody>

            </Modal>
        </div>
    );
};

export default ModelData;
