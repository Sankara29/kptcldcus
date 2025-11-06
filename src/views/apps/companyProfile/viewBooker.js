import { useState } from "react";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from "react";
import API_URL from "../../../config";

const Floor = ({ data1 }) => {
  //console.log(data1)
  const [rowData1, setRowData1] = useState();
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  // Get Booker Details
  useEffect(() => {
    fetchx(API_URL + `/getbookerByCompanyId?hotelID=1&accountID=${data1.companyid}`)
      .then((result) => result.json())
      .then((rowData) => {
        //console.log(rowData['data']);
        setRowData1(rowData["data"]);
      });
  }, [data1.companyid]);  
  // Get Booker Details
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Name", field: "name", suppressSizeToFit: true, maxWidth: 140,},
    { headerName: "Email ID", field: "emailID", suppressSizeToFit: true, maxWidth: 200,},
    { headerName: "Phone No.", field: "phone", suppressSizeToFit: true, maxWidth: 140,},
    { headerName: "Address", field: "addressLine1", suppressSizeToFit: true, maxWidth: 115,},
    { headerName: "Country", field: "country", suppressSizeToFit: true, maxWidth: 110,},
    { headerName: "State", field: "state", suppressSizeToFit: true, maxWidth: 110,},
    { headerName: "City", field: "city", suppressSizeToFit: true, maxWidth: 110,},
    { headerName: "PostalCode", field: "postalCode", suppressSizeToFit: true, maxWidth: 125,},
     ]);


     // ON CELL VALUE CHANGE
     
  const onCellValueChanged = useCallback(event => {
    //console.log('onCellValueChanged', event)
    //console.log(event.data)
  }, [])



  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    //console.log("cellClicked", event);
  }, []);


  return (
    <div>    
            {/* // AG Grid to Display ID Details */}
      <div className="ag-theme-alpine" style={{ height: 220 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData1} 
                    columnDefs={columnDefs}
                    animateRows={true} 
                    rowSelection='multiple'
                    onCellClicked={cellClickedListener}
                    // paginationAutoPageSize = 'true'
                    onCellValueChanged={onCellValueChanged}
                    paginationPageSize='10'
                    pagination='true'
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"

                />
            </div>
                
    </div>
  );
};

export default Floor;