// ** React Imports
import { useState } from "react";

import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
// ** Styles
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

const defaultValues = {
  IDType1: null,
  idNumber1: "",
  issueDate1: "",
  expiryDate1: "",
  issuePlace1: "",
  name1: "",
  idFile1: "",
};


const Floor = ({data1 }) => {
  console.log(data1)
  console.log(localStorage.getItem('id'))

  // Ag Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: "IDType", field: "IDType", suppressSizeToFit: true,maxWidth: 120,},
    { headerName: "idNumber ", field: "idNumber", suppressSizeToFit: true ,maxWidth: 150,},
    { headerName: "Name",field: "nameOnDocument",suppressSizeToFit: true,maxWidth: 100,},    
    // { headerName: "Issue Date ", field: "issueDate", suppressSizeToFit: true,maxWidth: 140, },
    { headerName: "ExpiryDate ", field: "expiryDate", suppressSizeToFit: true,maxWidth: 120, },
    // { headerName: "IssuePlace ", field: "issuePlace", suppressSizeToFit: true ,maxWidth: 120,},
    { headerName: "Document File ", field: "idFile", suppressSizeToFit: true ,maxWidth: 160,},
     ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  useEffect(() => {
    fetchx(API_URL + `/getiddetails?guestID=${data1.id}`)
      .then((result) => {
        console.log(result); // Log the result here
        return result.json();
      })
      .then((rowData) => {
        setRowData(rowData["data"]);
      });
  }, [data1.id ]);
  

  console.log(rowData)
  console.log(localStorage.getItem("id1"));

  // ** Hooks
  const { control } = useForm({ defaultValues });


  const [modal, setModal] = useState(false);

  const handleModal = () => setModal(!modal);

  return (
    <div>
      {/* // AG Grid to Display ID Details */}
      <div className="ag-theme-alpine" style={{ height: 220 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData} columnDefs={columnDefs}
                    animateRows={true} 
                    rowSelection='multiple'
                    onCellClicked={cellClickedListener}                   
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"

                />
            </div>
          
    </div>
  );
};

export default Floor;