// ** React Imports
import { useState } from "react";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import {    Button,Modal, ModalHeader, ModalBody,} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import API_URL from "../../../config";
import AccountRateCodeMapping from "./accrateCodeMap";




const Floor = ({  data1 }) => {
  //console.log(data1.companyid)
  const [idDetail, setIDDetails] = useState();
  let navigate = useNavigate();

 
  // Ag Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();
 
  let colourMappings = [
    fetchx(API_URL + "/getGuestProfileCountry?hotelID=1")
      .then((result) => result.json())
      .then((resp) => {
        colourMappings = resp["data"];
      }),
  ];

  // Get Booker Details
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Rate Code",
      field: "rateCode",
      suppressSizeToFit: true,
      checkboxSelection: true, headerCheckboxSelection: true, maxWidth: 300
   ,
    },
    {
      headerName: "Description",
      field: "description",
      suppressSizeToFit: true,
      maxWidth: 140,
      
    },
    {
      headerName: "Begin Date",
      field: "beginSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
      
    },
    {
      headerName: "SellDate",
      field: "endSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
      
    },
    {
      headerName: "Days Applicable",
      field: "daysApplicable",
      maxWidth: 140,
      
    },
     ]);


     // ON CELL VALUE CHANGE
     
  const onCellValueChanged = useCallback(event => {
    //console.log('onCellValueChanged', event)
    //console.log('hiii')
    // const ID = event.data.id
    // const PCODE = event.data.packageCode
    //console.log(event.data)
    const updatedItem = JSON.stringify({
      accountID: event.data.companyid,
      name: event.data.name,
      emailID:event.data.emailID,
      phone:event.data.phone,
      addressLine1:event.data.addressLine1,
      country:event.data.country,
      state:event.data.state,
      city:event.data.city,
      postalCode:event.data.postalCode
    })
    //console.log(updatedItem)
    fetchx(API_URL + `/updatebooker?accountID=${data1.companyid}`, {
      method: 'PUT',
      body: updatedItem,
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((post) => {
        //console.log(post)
      })
      .catch((err) => {
        //console.log(err.message)
      })
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

  // Get Booker Details
  useEffect(() => {
    fetchx(API_URL + `/getLatestRateCode?accountID=${data1.companyid}&hotelID=1`)
      .then((result) => result.json())
      .then((rowData) => 
      setRowData(rowData["data"]));
  }, []);


  // ** Hooks
  const {
    setError,
    formState: { errors },
  } = useForm();

  
  //console.log(data1.companyid)

  const navigatepage = () => {
    navigate('');
};


  return (
    <div>
        <Modal isOpen={idDetail} toggle={() => setIDDetails(!idDetail)} className='modal-xl'>
         <ModalHeader className='modal-lg' toggle={() => setIDDetails(!idDetail)}>
         Add RateCodes
         </ModalHeader>
         <ModalBody className='pb-3 px-sm-5 mx-20'>
       <AccountRateCodeMapping/>
         </ModalBody>
         </Modal>


      {/* // AG Grid to Display ID Details */}
      <div className="ag-theme-alpine" style={{ height: 220 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData} columnDefs={columnDefs}
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
            <br></br>
            <br></br>


            <div align='end' className='buttons'>
             <Button color='primary' className='me-1' type='submit' onClick={() => {setIDDetails(!idDetail) }}>
             Add Rate Code
             </Button>
             <Button color='primary' className='me-1' type='button' onClick={navigatepage}>
            Exit
        </Button>
             </div>
     
    </div>
  );
};

export default Floor;
