// ** React Imports
// import { Document, Page } from 'react-pdf';

import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";


// import App from "./waitListDataTable";
import Moment from 'moment';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Input,
  Card,
  Form,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Modal,
  CardText,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

import { useRef, useEffect, useMemo, useCallback} from 'react';
import API_URL from "../../../config";


import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

const FoodTypeOptions = [
  { value: "Restaurant", label: "Restaurant" },
  { value: "Spa", label: "Spa" },
  { value: "Laundry", label: "Laundry" },
  { value: "Minibar", label: "Minibar" },

];


const isAllowanceOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const discountAllowedOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
  
];

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];

const statusOptions = [
    { value: 'Enable', label: 'Enable' },
   { value: 'Disable', label: 'Disable' },
  ]

const defaultValues = {
  storeID: "",
  foodID: "",
  FoodType: "",
};

let LINK = ""
let id=1;
const ValidationThirdPartyComponents = () => {
  let navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const [ShowPDF,setShowPDF] = useState(false)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
// ** State
const [open, setOpen] = useState('0')
const [showConfirmationModal, setShowConfirmationModal] = useState(false);
const toggle = id => {
  open === id ? setOpen() : setOpen(id)
}
  const gridRef = useRef();

//  `cgstAmt`, `sgstAmt`, `TransactionID`, `addedUser`, `roundOff`, `description`, `tips`, `guestType`, 
  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'hotelID',field: 'hotelID',suppressSizeToFit: true,maxWidth: 100,  },
    {headerName: 'Store ID',field: 'storeID',suppressSizeToFit: true,maxWidth: 100,},
    {headerName: 'billNo',field: 'billNo',maxWidth: 100,},
    {headerName: 'billNoDisplay',field: 'billNoDisplay',maxWidth: 150,},
    {
      headerName: "View Bill",
      maxWidth: 140,
      cellRenderer: (event) => {
        return (<Button color='primary' onClick={()=>{showPDF(event)}}>View PDF</Button>)
      }
    },
    {headerName: 'billDateTime',field: 'billDateTime'},
    {headerName: 'orderID',field: 'orderID',maxWidth: 100,},
    {headerName: 'KOTno',field: 'KOTno',maxWidth: 100,},
    {headerName: 'pax',field: 'pax',maxWidth: 100,},
    {headerName: 'tableNo',field: 'tableNo',maxWidth: 100,},
    // {headerName: 'linkToRoom',field: 'linkToRoom',maxWidth: 100,},
    {headerName: 'subTotal',field: 'subTotal',maxWidth: 100,},
    {headerName: 'totalAmount',field: 'totalAmount',maxWidth: 100,},
    // {headerName: 'classDiscount',field: 'classDiscount',maxWidth: 100,},
    // {headerName: 'amtDiscount',field: 'amtDiscount',maxWidth: 100,},
    // {headerName: 'billStatus',field: 'billStatus',maxWidth: 100,},
    // {headerName: 'paymentType',field: 'paymentType',maxWidth: 100,},
    // {headerName: 'itemRecordID',field: 'itemRecordID',maxWidth: 100,},
    // {headerName: 'classAmount',field: 'classAmount',maxWidth: 100,},
    {headerName: 'guestName',field: 'guestName',maxWidth: 130,},
    {headerName: 'guestCompanyGSTno',field: 'guestCompanyGSTno',maxWidth: 130,},
    {headerName: 'mobileNo',field: 'mobileNo',maxWidth: 130,},
    // {headerName: 'reason',field: 'reason',maxWidth: 100,},
    // {headerName: 'paymentBreakup',field: 'paymentBreakup',maxWidth: 100,},
    {headerName: 'cgstAmt',field: 'cgstAmt',maxWidth: 100,},
    {headerName: 'sgstAmt',field: 'sgstAmt',maxWidth: 100,},
    {headerName: 'roundOff',field: 'roundOff',maxWidth: 100,},
    {
      headerName: "Action",
      maxWidth: 140,
      cellRenderer: () => {
        return  <>
        <Button color='primary' onClick={showPaymentPage}>
          Resettle
        </Button>

      
      </>
      }
    },
    // {headerName: 'guestType',field: 'guestType',maxWidth: 100,},
    


  ]);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const showPDF =(event)=>{
    setShowPDF(!ShowPDF)
    //////console.log(event.data.billNoDisplay)
    let billDisp = event.data.billNoDisplay.replaceAll('/','_')
    billDisp = billDisp.replace('-','')
    //////console.log(billDisp)
    ////console.log('SPA_2324_32.pdf')
    sessionStorage.setItem('billNoDisplay',billDisp+".pdf")
    let LINK = "http://122.166.2.21/POS/Ebill/"+sessionStorage.getItem('billNoDisplay')
    // const newTab = window.open('about:blank', '_blank');
    //     setTimeout(()=>{ newTab.location.href = '/apps/POSconfiguration/PDF'},1000) // Replace '/new-page' with the actual URL you want to open in the new tab

  }
  const gridApiRef = useRef(null);

  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
  };
  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      wrapText: true,
      filterParams :{
      buttons : ['apply','reset']
      }
    }
  ));

  const cellClickedListener = useCallback( event => {
    ////console.log('cellClicked', event);
    // localStorage.setItem('itemID', row.itemID)
    ////console.log('cellClicked', event['data']['billNo']);

    localStorage.setItem("billNo", event['data']['billNo'])

  }, []);

  useEffect(() => {


    fetchx(API_URL+"/getAllBills", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hotelID: 1,
      })
    })
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    ////console.log(rowData['data'])
    ////console.log(rowData['data']['0']['billNo'])
   
    
    })
  },[]);  

  // ** State
  const [data, setData] = useState(null);

  const showPaymentPage =() =>{
    ////console.log("Hi")
    setShowConfirmationModal(true)
  }
  const handleConfirmation = () => {
    // setShowConfirmationModal(false);
  };
  const onSubmit = (data1) => {

    fetchx(API_URL+'/resettlePaymentMode', {
        method: 'PUT',
        body: JSON.stringify({
            "hotelID": 1,
            "storeID": localStorage.getItem('storeID'),
            "FolioNo":0,
            "billNo":localStorage.getItem('billNo'),
            "reason": data1.reason,

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then((post) => {
            if (post['statuscode'] == 200) {
                setTimeout(() => { navigate('/apps/posconfiguration/DisplayBill') }, 100);
            } 
            else {
               setTimeout(() => { navigate('/apps/Bills') }, 100);
            }
            // ////console.log(post)
            // billNo = post['data']['billNo']

        })
        .catch((err) => {
            // ////console.log(err.message);
        });


};
   // ** Hooks
   const { reset, handleSubmit, control, formState: { errors }
  } = useForm({});
  return (
    <div>
     <h4>Bills</h4>
    <Card>
       
    <div className="ag-theme-alpine" style={{ height: 620}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
            // onGridReady={onGridReady}
            
            />
      </div>
      </Card>
        {/* Confirmation Modal */}
        <Modal
                isOpen={showConfirmationModal}
                toggle={() =>  setShowConfirmationModal(false)}
                className='modal-dialog-centered'
                centered
                footer={null}
            >

                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '100%', position: 'relative' }}> */}
                <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
                    <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Confirm Resettle Bill</ModalHeader>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                
                 {/* <Form> */}
                    <Col sm='12' className='mb-1'>
                        <div className="mb-1">
                            <InputGroup className="input-group-merge">
                                <Controller
                                    id='reason'
                                    name='reason'
                                    control={control}
                                    rules={{ required: 'Reason is Required' }}
                                    render={({ field }) => (
                                        <Input
                                            type='text' // Changed from 'type="type"'
                                            required
                                            placeholder='Write the reason for Resettle'
                                            style={{ width: '90%', height: '100px', margin: '0 auto' }}
                                            {...field}
                                        />
                                    )}
                                />
                            </InputGroup>
                            {errors.reason && <span className='text-danger'>Write the reason for Resettle</span>}
                        </div>
                    </Col>
                    <Row>

                        <Col sm="12" md="6" className="mb-2">
                            <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={() => setShowConfirmationModal(false)}>
                                CANCEL
                            </Button>
                        </Col>
                        <Col sm="12" md="6" className="mb-2">
                            <Button className="me-1" color="danger" style={{ width: "100%" }} type="submit" >
                                SUBMIT
                            </Button>
                        </Col>
                    </Row>
                </Form>
                {/* </div> */}

            </Modal>
     {ShowPDF && <div>
      <Document file={"http://122.166.2.21/POS/Ebill/"+sessionStorage.getItem('billNoDisplay')} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>}
      {/* <Modal isOpen={ShowPDF} toggle={() => setShowPDF(!ShowPDF)} style={{height:'200px'}} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowPDF(!ShowPDF)}>POS Invoice</ModalHeader>
       
          <iframe height={'500px'} src={"http://122.166.2.21/POS/Ebill/"+sessionStorage.getItem('billNoDisplay')}> </iframe>
      </Modal> */}
    {/* <App/> */}
    </div>
    
  );
};

export default ValidationThirdPartyComponents;
