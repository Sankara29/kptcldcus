// ** React Imports
// import { Document, Page } from 'react-pdf';

import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check, Calendar } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Fragment } from 'react'
import { format } from "date-fns";
import React, { Component } from 'react';


import { XCircle } from "react-feather";

// import App from "./waitListDataTable";
import Moment from 'moment';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

import Avatar from "@components/avatar";
import 'ag-grid-enterprise'

// ** Utils
import { selectThemeColors } from "@utils";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
import logo from '@src/assets/images/logo/oterra.jpg';
let is_test = false

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
  Table,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from 'react';
import API_URL from "../../../config";
import { width } from "@mui/system";


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
let id = 1;
const ValidationThirdPartyComponents = () => {
  let navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const [ShowPDF, setShowPDF] = useState(false)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewData, setPreviewData] = useState('');
  // ** State
  const [stayNotification, setStayNotification] = useState(false)
  const [openPreviewBill, setopenPreviewBill] = useState(false)
  // ** State
  const [data, setData] = useState(null);
  const [ShowPOSInvPDF, setShowPOSInvPDF] = useState('')
  const [InvURL, setInvURL] = useState([])


  const [open, setOpen] = useState('0')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flag, setFlag] = useState(false)

  

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Bill No', field: 'billNoDisplay' , suppressSizeToFit: true, maxWidth: 160 },
    {
      headerName: 'POS Invoice', cellRendererFramework: (params) => <Button color='primary' style={{ width: 140 }} onClick={() => {
        getFinalInvoice(params.data)


      }} >View</Button>, suppressSizeToFit: true, maxWidth: 180
    },
    { headerName: 'Send', cellRendererFramework: (params) => {
      
      {if(params.data.billStatus!=='cancelled'){    
      return (
        
    <Button color='primary' style={{ width: 90 }} onClick={() =>{
      setCompleteData(params.data)
      setguestEmail('')
      setguestSelect(true)
      setcomposeOpen(true)
    }} >Email</Button>)}}}, suppressSizeToFit: true,maxWidth:160 },
    { headerName: 'Outlet', field: 'restaurantName' },
    { headerName: 'Order No', field: 'orderID', maxWidth: 120 },
    { headerName: 'Table No', field: 'tableNo' ,maxWidth: 120 },
    { headerName: 'Amount', field: 'totalAmount',maxWidth: 120  },
    { headerName: 'Resettle', cellRendererFramework: (params) => {if(params.data.billStatus!=='cancelled'){ return (<Button color='primary' style={{ width: 128 }} onClick={showPaymentPage}>Resettle</Button>) }}, suppressSizeToFit: true, maxWidth: 148 },
    // { headerName: 'Void Bill', cellRendererFramework: (params) => {if(params.data.billStatus!=='cancelled'){ return (<Button color='primary' style={{ width: 128 }} onClick={()=>{setshowVoidBillModal(true)}}>Void</Button>) }}, suppressSizeToFit: true, maxWidth: 148 },
    { headerName: 'Customer Name', field: 'guestName',maxWidth: 180 },
    { headerName: 'Company Name', field: 'BTCCompany',maxWidth: 150},
    { headerName: 'Payment', field: 'paymentModes',maxWidth: 150},
    { headerName: 'Status', field: 'billStatus',maxWidth: 120 },
    { headerName: 'Bill Date', field: 'billDateTime' ,maxWidth: 180},
    { headerName: 'Steward', field: 'stewardName',maxWidth: 120 },
        // { headerName: 'isVoid', field: 'isVoid',maxWidth: 120 },
    // { headerName: 'Void Reason', field: 'voidReason' },
    { headerName: 'Resettle Reason', field: 'resettleReason' },

  ]);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

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
  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      wrapText: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ));

  const cellClickedListener = useCallback((event) => {
    const clickedColumn = event.column.colId;
    if (clickedColumn === 'billNoDisplay') {

      fetchx(API_URL + '/getBillDetails?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + event.data.orderID + '&billNo=' + event.data.billNo)
        .then(result => result.json())
        .then(resp => {
          console.log(resp['data'])
          setPreviewData(resp['data'][0])

        })
        .catch((err) => {
          console.log(err.message);
        });
      setopenPreviewBill(true);
    }

    console.log('cellClicked', event);
    const billNo = event.data.billNo;
    console.log('Bill Number:', billNo);
    localStorage.setItem("billNo", billNo);
    const folioNumber = event.data.FolioNo
    console.log("Folio Number:",folioNumber)
    localStorage.setItem("FolioNumber",folioNumber)
  }, []);



  const [Today, setToday] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Fetch today's date from your API
    fetchx(API_URL + "/getBusinessDatePOS", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hotelID: 1 })
    })
      .then((res) => res.json())
      .then(postres => {
        const businessDate = postres.data[0].businessDate;
        console.log(businessDate)
        setToday(businessDate);

        // Set the initial selected date to today
        setSelectedDate(businessDate);
      })
      .catch(error => {
        console.error("Error fetching business date:", error);
        // Handle the error as needed
      });
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const handleDateChange = (selectedDates) => {
    if (selectedDates.length > 0) {
      const formattedDate = formatDate(new Date(selectedDates[0]));
      console.log(formattedDate)
      setSelectedDate(formattedDate);
    }
  };

  // useEffect(() => {
  //   if (selectedDate) {

  //     const storeID = localStorage.getItem('storeID');
  //     fetchx(API_URL + '/getAllBillsByDate?hotelID=1&storeID=' + storeID + '&dateTime=' + selectedDate)
  //       .then(result => result.json())
  //       .then(data => {
  //         console.log(data)
  //         if (data['statusCode'] === 403) {
  //           setRowData([]);
  //         } else {
  //           const modifiedData = data['data'].map(item => {
  //             const paymentBreakupArray = JSON.parse(item.paymentBreakup);
  //             const combinedPaymentModes = paymentBreakupArray.map(payment => payment.paymentMode).join(', ');
  //             return { ...item, paymentModes: combinedPaymentModes };
  //           });
  //           console.log(modifiedData)
  //           // setRowData(data['data']);
  //           setRowData(modifiedData);

  //         }
  //       })
  //       .catch(error => {
  //         setRowData([]);
  //       });
  //   }
  // }, [selectedDate]);
  // const fetchData = (date) => {
  //   console.log(date)
  // console.log(`hotelID=1&storeID=${localStorage.getItem('storeID')}&dateTime=${date}`);
  //   if (date) {
  //     const storeID = localStorage.getItem('storeID');
  //     fetchx(API_URL + '/getAllBillsByDate?hotelID=1&storeID=' + storeID + '&dateTime=' + date)
  //       .then(result => result.json())
  //       .then(data => {
  //         console.log(data)
  //         if (data['statuscode'] === 403) {
  //           setRowData([]);
  //         } else {
  //           console.log(data)
  //           const modifiedData = data['data'].map(item => {
  //             const paymentBreakupArray = JSON.parse(item.paymentBreakup);
  //             const combinedPaymentModes = paymentBreakupArray.map(payment => payment.paymentMode).join(', ');
  //             return { ...item, paymentModes: combinedPaymentModes };
  //           });
  //           setRowData(modifiedData);
  //         }
  //       })
  //       .catch(error => {
  //         setRowData([]);
  //       });
  //   }
  // };
  const fetchData = (date) => {
    console.log(date);
    console.log(`hotelID=1&storeID=${localStorage.getItem('storeID')}&dateTime=${date}`);
  
    if (date) {
      const storeID = localStorage.getItem('storeID');
      fetchx(API_URL + '/getAllBillsByDate?hotelID=1&storeID=' + storeID + '&dateTime=' + date)
        .then(result => result.json())
        .then(data => {
          console.log(data);
  
          if (data['statuscode'] === 403 || !data['data'] || !Array.isArray(data['data'])) {
            setRowData([]);
          } else {
            console.log(data['data']);
            const modifiedData = data['data'].map(item => {
              console.log(item);
  
              // Check if item.paymentBreakup is not null and is an array
              const paymentBreakupArray = item.paymentBreakup ? JSON.parse(item.paymentBreakup) : [];
              
              const combinedPaymentModes = paymentBreakupArray.map(payment => payment.paymentMode).join(', ');
  
              console.log(combinedPaymentModes);
  
              return { ...item, paymentModes: combinedPaymentModes };
            });
  
            console.log(modifiedData);
  
            setRowData(modifiedData);
          }
        })
        .catch(error => {
          console.error(error);
          setRowData([]);
        });
    }
  };
  const onSubmit1 = () => {
    setIsSubmitted(true);
    setFlag(true)
    fetchData(selectedDate);
  };

  useEffect(() => {
    if (isSubmitted && selectedDate) {
      fetchData(selectedDate);
      setIsSubmitted(false);
    }
  }, [isSubmitted, selectedDate]);


  const showPaymentPage = () => {
    setShowConfirmationModal(true)
  }
  const handleConfirmation = () => {
    // setShowConfirmationModal(false);
  };
  const onSubmit = (data1) => {
    console.log(data1)
    const requestBody = {
      "hotelID": 1,
      "storeID": localStorage.getItem('storeID'),
      "FolioNo": localStorage.getItem('FolioNumber'),
      "billNo": localStorage.getItem('billNo'),
      "reason": data1.reason,
    };
  
    // fetchx(API_URL + '/resettlePaymentMode', {
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     "hotelID": 1,
    //     "storeID": localStorage.getItem('storeID'),
    //     "FolioNo": 0,
    //     "billNo": localStorage.getItem('billNo'),
    //     "reason": data1.reason,

    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    fetchx(API_URL + '/resettlePaymentMode', {
      method: 'PUT',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post)
        // if (post['statuscode'] == 200) {
        //   setTimeout(() => { navigate('/apps/posconfiguration/DisplayBill') }, 100);
        // }
        if (post['statuscode'] == 200) {
          console.log(requestBody)
        if (requestBody.FolioNo === 0 || requestBody.FolioNo === "0") {
          setTimeout(() => { navigate('/apps/posconfiguration/DisplayBill') }, 100);
        } else {
          setTimeout(() => { navigate('/apps/posconfiguration/SplitPayment') }, 100);
        }
      }
        if (post['statusCode'] == 403) {
          setShowConfirmationModal(false)

          const swalInstance = MySwal.fire({
            text: post['message'],
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger',
            },
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {

              setTimeout(() => { navigate('') }, 100);

            }
          });
        }
        // else {
        //    setTimeout(() => { navigate('/apps/POSBills') }, 100);
        // }
        // console.log(post)
        // billNo = post['data']['billNo']

      })
      .catch((err) => {
        // console.log(err.message);
      });


  };
  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({});

  const toggleModal1 = () => {
    setopenPreviewBill(!openPreviewBill)
  }

  const getFinalInvoice = (data) => {
    if(!is_test){
      fetchx(API_URL + "/gets3DocumentIDPOS", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelID: 1,
          DocName:'POSInvoice',
          transactionID:'',
          // reservationID:reservationID,
          billNo:data.billNoDisplay.replaceAll("/", "_").replaceAll("-", "")
            })
      }).then(result => result.json())
      .then(resp => {
          if(resp.statusCode==200){
           
            setInvURL(API_URL+'/images/'+resp['data'])
            setShowPOSInvPDF(true)
      
      
          }
          
        }).catch((error) => {
        })
  
      }else{
        let url = API_URL+'/imagepaths/POS_Invoice/POSInvoice_'+data.hotelID+'_'+data.billNoDisplay.replaceAll("/","_").replaceAll("-","")+'.pdf'
          setInvURL(url)
          setShowPOSInvPDF(true)
      }


  }
  function inWords(num) {
    var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    var b = ['', '', 'Twenty', 'Thirty', 'Fourty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    var n; // Declare 'n' as a variable

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees only ' : '';
    return str;
  }






  const [composeOpen, setcomposeOpen] = useState(false)
  const [toggleCompose, settoggleCompose] = useState(false)
  const [guestEmail,setguestEmail] = useState()
  const [CompleteData,setCompleteData] = useState()
  const [guestSelect,setguestSelect] = useState(false)

   
const SendEmail = (data) =>{
  console.log(guestEmail)
  console.log(CompleteData)
  // if(data['email-to'] == undefined){
  //   data['email-to'] = guestEmail
  // }

  let billno = CompleteData.billNoDisplay.replaceAll("/", "_").replaceAll("-", "")

  console.log(data)
  console.log(JSON.stringify({
    type:'POSInvoice',
    amount:-1*CompleteData.Amount,
    toAddress:guestEmail,
    ccAddress:'',
    BillNo:billno
      }))
  fetchx(API_URL + "/sendemailtestPOS", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type:'POSInvoice',
      amount:CompleteData.totalAmount,
      toAddress:guestEmail,
      ccAddress:'',
      BillNo:billno,
      orderID:CompleteData.orderID,
      BillDate:CompleteData.billDateTime,
      hotelID:1,
      storeID:CompleteData.storeID
        })
  }).then(result => result.json())
  .then(resp => {
      console.log(resp)
      if(resp.statusCode==200){
        console.log(resp)
        setcomposeOpen(false)
        toast(
          <div className="d-flex">
            <div className="me-1">
              <Avatar size="sm" color="success" icon={<Check size={12} />} />
            </div>
            <div className="d-flex flex-column">
              <h6>Email sent successfully</h6>
              {/* <h4>Wait-List Added Successfully</h4> */}
            </div>
          </div>
        );
      }
      
    }).catch((error) => {
      console.log(error)
      setcomposeOpen(false)
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="danger" icon={<XCircle size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Could not send Email</h6>
            {/* <h4>Wait-List Added Successfully</h4> */}
          </div>
        </div>
      );
    })

 
}

  // Function to handle input change
  const handleEmailChange = (event) => {
    setguestEmail(event.target.value); // Update the guestEmail state with the input value
  };


  const getRowStyle = params => {

    if(params.data && params.data.billStatus === 'cancelled' && params.data.isVoid === 0){
      return { background: '#E3C020' };
    }
    if (params.data && params.data.isVoid === 1) {
      // return { background: '#3598db' };
      return { background: '#E73131' };

      

    }
    return null;
  };


  return (
    <div>
      <div>
        <Modal
          isOpen={openPreviewBill}
          // toggle={toggleModal1}
          size="lg"
          className='modal-dialog-centered'
          onCancel={() => setopenPreviewBill(false)}
          centered
          footer={null}
        >
          <ModalHeader toggle={toggleModal1}>
          </ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20 '  >
            <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
              <div>

                <div className='logo-wrapper'>

                  <img src={logo} alt="Logo" />
                </div>
                {/* <h6 className='mb-25'>Guest Name : {previewData['guestName']}</h6> */}
                <h6 className='mb-25'>Guest Name : {previewData && previewData['guestName']}</h6>

                {/* <h6 className='mb-25'>Room Number:506 </h6> */}
                <h6 className='mb-0'>Pax : {previewData['pax']} </h6>
              </div>
              <div className='mt-md-1 mt-3'>
                <h4>Outlet Name : <span>{localStorage.getItem('RestaurantSelected')}</span></h4>
                <h4>Bill Number : {previewData['billNoDisplay']}</h4>
                {/* <strong><p className='invoice-date-title'> {`Date: ${format(new Date(previewData['billDateTime']), 'dd-MMM-yy')}  Time: ${format(new Date(previewData['billDateTime']), 'HH:mm')}`}</p> </strong> */}
                <h6>Date : {previewData['billDateTime']}</h6>

                <h6 className='invoice-number'>FSSAI No : 10018043002066</h6>
                {/* <h6>Table Number : {localStorage.getItem('TableSelected')}</h6> */}
                <h6>Table Number : {previewData['tableNo']}</h6>

                {/* <h6>User : {previewData['steward']}</h6> */}
                <h6>User : {previewData['stewardName']}</h6>


              </div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th className='py-1'>Item Name</th>
                  <th className='py-1'>Quantity</th>
                  <th className='py-1'>Price</th>
                </tr>
              </thead>
              <tbody>

                {previewData.length != 0 && previewData['items'].map((row, index) => (

                  <tr className='border-bottom'>
                    <td className='py-1'>
                      <p className='card-text fw-bold mb-25' id={"itemID" + index}> {row.itemName}</p>
                    </td>
                    <td className='py-1'>
                      <span className='fw-bold'>{row.qty}</span>
                    </td>
                    <td className='py-1'>
                      <span className='fw-bold'>{row.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <CardBody className='invoice-padding pb-0'>
              <Row className='invoice-sales-total-wrapper'>
                <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>

                </Col>
                <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
                  <div className='invoice-total-wrapper'>
                    <div className='invoice-total-item'>
                    </div>
                    <div className='invoice-total-item'>
                      {/* <p className='invoice-total-title'><strong>SUBTOTAL : {parseFloat(previewData.subTotal).toFixed(2)}</strong></p> */}
                      {/* <p className='invoice-total-title'>{item.value}</p>/ */}
                    </div>
                    {previewData.classDiscDisplay &&
                      <>
                        {previewData.classDiscDisplay.map((item, index) => (
                          <div key={index} className='invoice-total-item'>
                            {/* <p className='invoice-total-title'><strong>{item.item.toUpperCase()} : {item.value}</strong></p> */}
                            <strong>{item.item.toUpperCase()} : {typeof item.value === 'number' ? item.value.toFixed(2) : item.value}</strong>

                            {/* <p className='invoice-total-title'>{item.value}</p> */}
                          </div>
                        ))}
                      </>
                    }
                    {previewData.Round != 0 && <div className='invoice-total-item'>
                      {/* <p className='invoice-total-title'><strong>ROUND OFF : {(parseFloat(previewData.roundOff)).toFixed(2)}</strong></p> */}
                      {/* <p className='invoice-total-amount'>{(data.roundOff).toFixed(2)}</p> */}
                    </div>
                    }

                    {/* <hr className='my-50' /> */}
                    <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>

                    <div className='invoice-total-item'>
                      <p className='invoice-total-title'><strong>TOTAL : {(parseFloat(previewData.total)).toFixed(2)}</strong></p>

                    </div>
                    {/* <hr className='my-50' /> */}
                    <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>

                  </div>
                </Col>
              </Row>
              <h5>Check Closed </h5>
              <div className='mt-md-1 mt-3'>
                {previewData.paymentBreakup &&
                  <>
                    <React.Fragment>
                      <h5>
                        Payment Mode: {previewData['paymentBreakup'].map((row, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && ', '}
                            {row.paymentMode}
                          </React.Fragment>
                        ))}
                      </h5>

                      <div>
                        <h5>Amount in Words : {previewData.total === 0 ? 'Zero' : inWords(previewData['total'])}</h5>
                      </div>

                    </React.Fragment>
                  </>
                }

              </div>
            </CardBody>


            {/* <hr className='invoice-spacing' /> */}
            <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>


            {/* Invoice Note */}
            <CardBody className='invoice-padding pt-0'>
              <Row>
                <Col sm='12'>
                  <span>
                    <strong><p>GSTIN No. 29AABCV0552G1ZF</p></strong>
                    <p>CIN: U72200KA1999PLC025275</p>
                    <p>THE OTERRA</p>
                    <p>A unit of Velankani Information Systems Limited</p>
                    <p>43, Electronic City,Phase 1,Hosur Road, Bangalore 560100 India</p>
                    <p>T: +91 80 3003 0303 F: +91 80 3985 4519 W: www.theoterra.com</p>
                  </span>
                </Col>
              </Row>
            </CardBody>
          </ModalBody>

          {/* </div> */}

        </Modal>
      </div>
      {/* <Card style={{ height: '40px' }}>
        <Row>
          <Col>
            <h4 className="m-0">
              Bill settlement history
            </h4>
          </Col>
          <Col className="d-flex justify-content-end">
            <Flatpickr
              value={selectedDate}
              onChange={handleDateChange}
              style={{ width: '100px', height: '40px' }}
            />
          </Col>
        </Row>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle tag="h4"><b>Bill settlement history</b></CardTitle>
        </CardHeader>
      </Card>
      <Row>
          <Col md='4' sm='12' className='mb-1'>

            <div className='mb-1'>
              <Label className='form-label' for='Date'>
                Date
              </Label>
              <Controller
                control={control}
                id='Date'
                name='Date'
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    required
                     value={selectedDate}
              onChange={handleDateChange}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.Date === null || data.Date === '')
                    })}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='4' sm='12'>
          <Button style={{ marginTop: '22px' }} type='submit' color='primary' onClick={handleSubmit(onSubmit1)}>
              Submit
            </Button>
          </Col>
        </Row>
        <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="fullName">
            Search
          </Label>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        </Col>
      <Card>

        {/* <div className="ag-theme-alpine" style={{ height: '550px', width: '1300px' }}> */}
        {flag == true &&

        <div className="ag-theme-alpine" style={{ height: 520 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            paginationAutoPageSize='true'
            paginationPageSize='10'
            pagination='true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
            getRowStyle={getRowStyle}
          // onGridReady={onGridReady}

          />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        }
        {/* <div className="ag-theme-alpine" style={{ height: '520' }}>
  <AgGridReact
    ref={gridRef}
    rowData={rowData}
    columnDefs={columnDefs}
    animateRows={true}
    rowSelection='multiple'
    onCellClicked={cellClickedListener}
    pagination={false} // Set pagination to false
    defaultColDef={defaultColDef}
    headerColor="ddw-primary"
    gridOptions={gridOptions}
  />
  {errorMessage && <p>{errorMessage}</p>}
</div> */}

      </Card>
      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmationModal}
        toggle={() => setShowConfirmationModal(false)}
        className='modal-dialog-centered'
        centered
        footer={null}
      >

        {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '100%', position: 'relative' }}> */}
        {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
          <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Confirm Resettle Bill</ModalHeader>
        </div> */}
        <ModalHeader className='modal-lg'>Confirm Resettle Bill
          {/* <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Generate Invoice</span> */}
        </ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20' >

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
            {/* <Row>

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
          </Row> */}
            <div align='end' className='buttons'>
              <Button outline className='me-1' color='secondary' onClick={() => setShowConfirmationModal(false)}>
                CANCEL
              </Button>
              <Button color='primary' className='me-1' type="submit" >
                SUBMIT
              </Button>
            </div>
          </Form>

          {/* </div> */}

        </ModalBody>

      </Modal>

      {/* <Modal isOpen={ShowPDF} toggle={() => setShowPDF(!ShowPDF)} style={{height:'200px'}} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowPDF(!ShowPDF)}>POS Invoice</ModalHeader>
       
      </Modal> */}
      {/* <App/> */}

      <Modal isOpen={ShowPOSInvPDF} toggle={() => setShowPOSInvPDF(!ShowPOSInvPDF)} style={{ height: '200px' }} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowPOSInvPDF(!ShowPOSInvPDF)}>PMS Invoice</ModalHeader>

        <iframe style={{ height: '85vh' }} src={InvURL}> </iframe>
      </Modal>





            {/* //Email Template */}
            <Modal
      style={{height:'200px'}}
      className='modal-dialog-centered modal-lg'
      isOpen={composeOpen}
      toggle={() => setcomposeOpen(!composeOpen)}
    >
      <ModalHeader toggle={() => setcomposeOpen(!composeOpen)} className='bg-transparent'>Send Email</ModalHeader>
      <ModalBody >

      <Form className='compose-form' onSubmit={handleSubmit(SendEmail)}>
      {/* { guestSelect && <div className='compose-mail-form-field'>
           <Label for='email-to' className='form-label'>
              To:
            </Label>
            <div className='flex-grow-1'>
                <InputGroup className="input-group-merge">
                  <Controller
                    id="email-to"
                    name="email-to"
                    control={control}
                    
                    render={({ field }) => (
                      <Input
                      required
                      defaultValue={guestEmail}
                        {...field}
                      />
                    )}
                  />
                </InputGroup>
            </div>
          </div>} */}
          <div className='compose-mail-form-field'>
          <Label htmlFor='email-to' className='form-label'>
        To:
      </Label>
      <div className='flex-grow-1'>
      <InputGroup className="input-group-merge">
        <Input
            type="text"
            id="email-to"
            name="email-to"
            value={guestEmail} // Set the value to guestEmail state
            onChange={handleEmailChange} // Handle input changes
            required
          />
        </InputGroup>
      </div>
    </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginTop: '22px' }} type='submit' color='primary'>
               Send
               </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
    </div>

  );
};

export default ValidationThirdPartyComponents;
