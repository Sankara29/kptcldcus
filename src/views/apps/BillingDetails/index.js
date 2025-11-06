// ** React Imports
// import { Document, Page } from 'react-pdf';

import { useState } from "react";
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



// import App from "./waitListDataTable";
import Moment from 'moment';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
import logo from '@src/assets/images/logo/oterra.jpg';


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
import { useRef, useEffect, useMemo, useCallback } from 'react';
import API_URL from "../../../config";
import { width } from "@mui/system";

// Import ag-grid
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flag, setFlag] = useState(false)
  // ** State
  const [data, setData] = useState(null);

  const [open, setOpen] = useState('0')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'BILL NO', field: 'billNoDisplay', cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' }, headerClass: "text-center", maxWidth: 200 },

    {
      headerName: 'ORDER NO', field: 'orderID',
      cellStyle: { 'text-align': 'center', 'background-color': 'pink' },
     maxWidth: 130 
    },
    { headerName: 'Table No', field: 'tableNo' ,cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },
    maxWidth: 120 },

    { headerName: 'AMOUNT', field: 'totalAmount', cellStyle: { 'text-align': 'center', 'background-color': 'pink' },  maxWidth: 130 },
    { headerName: 'CUSTOMER NAME', field: 'guestName', cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },  maxWidth: 180 },
    { headerName: 'Payment', field: 'paymentModes',cellStyle: { 'text-align': 'center', 'background-color': 'pink' },
    maxWidth: 150},


    { headerName: 'STATUS', field: 'billStatus', cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' }, 
    maxWidth: 120 },
    { headerName: 'Bill Date', field: 'billDateTime' , cellStyle: { 'text-align': 'center', 'background-color': 'pink' },
    maxWidth: 180},

    { headerName: 'STEWARD', field: 'stewardName', cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' }, maxWidth: 120 },
  ]);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
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
      // columnSpacing: 10,
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
          //console.log(resp['data'])
          setPreviewData(resp['data'][0])

        })
        .catch((err) => {
          //console.log(err.message);
        });
      setopenPreviewBill(true);
    }

    //console.log('cellClicked', event);
    const billNo = event.data.billNo;
    //console.log('Bill Number:', billNo);
    // setPreviewData(event['data'])
    localStorage.setItem("billNo", billNo);
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
      setSelectedDate(formattedDate);
    }
  };

  // useEffect(() => {
  //   if(selectedDate){
  //   const storeID = localStorage.getItem('storeID');
  //   const apiUrl = `${API_URL}/getAllBillsByDate?hotelID=1&storeID=${storeID}&dateTime=${selectedDate}`;

  //   fetchx(apiUrl)
  //     .then(result => result.json())
  //     .then(data => {
  //       if (data.statusCode === 403) {
  //         setRowData([]);
  //         setErrorMessage('');
  //       } else {
  //         const modifiedData = data['data'].map(item => {
  //           const paymentBreakupArray = JSON.parse(item.paymentBreakup);
  //           const combinedPaymentModes = paymentBreakupArray.map(payment => payment.paymentMode).join(', ');
  //           return { ...item, paymentModes: combinedPaymentModes };
  //         });
  //         //console.log(modifiedData)
  //         setRowData(modifiedData);
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error fetching data:", error);
  //       setRowData([]);
  //     });
  //   }

  // }, [selectedDate]);
  // const fetchData = (date) => {
  //   if (date) {
  //     // const storeID = localStorage.getItem('storeID');
  //     const storeID = sessionStorage.getItem('storeID');
  //     //console.log(storeID)

  //     fetchx(API_URL + '/getAllBillsByDate?hotelID=1&storeID=' + storeID + '&dateTime=' + date)
  //       .then(result => result.json())
  //       .then(data => {
  //         if (data['statusCode'] === 403) {
  //           setRowData([]);
  //         } else {
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
    if (date) {
      // const storeID = localStorage.getItem('storeID');
      const storeID = sessionStorage.getItem('storeID');
      //console.log(storeID)

      fetchx(API_URL + '/getAllBillsByDate?hotelID=1&storeID=' + storeID + '&dateTime=' + date)
        .then(result => result.json())
        .then(data => {
          if (data['statusCode'] === 403) {
            setRowData([]);
          } else {
            const modifiedData = data['data'].map(item => {
              //console.log(item);
  
              const paymentBreakupArray = item.paymentBreakup ? JSON.parse(item.paymentBreakup) : [];
              
              const combinedPaymentModes = paymentBreakupArray.map(payment => payment.paymentMode).join(', ');
  
              //console.log(combinedPaymentModes);
  
              return { ...item, paymentModes: combinedPaymentModes };
            });
            setRowData(modifiedData);
          }
        })
        .catch(error => {
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
    //console.log("Hi")
    setShowConfirmationModal(true)
  }
  const handleConfirmation = () => {
  };
  const onSubmit = (data1) => {
    // console.log(JSON.stringify({
    //   "hotelID": 1,
    //   "storeID": localStorage.getItem('storeID'),
    //   "FolioNo": 0,
    //   "billNo": localStorage.getItem('billNo'),
    //   "reason": data1.reason,

    // }))
    fetchx(API_URL + '/resettlePaymentMode', {
      method: 'PUT',
      body: JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "FolioNo": 0,
        "billNo": localStorage.getItem('billNo'),
        "reason": data1.reason,

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        // console.log(post)
        if (post['statuscode'] == 200) {
          setTimeout(() => { navigate('/apps/posconfiguration/DisplayBill') }, 100);
        }
        if (post['statusCode'] == 403) {
          setShowConfirmationModal(false)

          //console.log("hi")
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
       

      })
      .catch((err) => {
      });


  };
  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({});

  const toggleModal1 = () => {
    setopenPreviewBill(!openPreviewBill)
  }
  function inWords(num) {
    var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    var n; 

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
  return (

    <div>
      <Button.Ripple
        color="primary"
        outline
        size="sm"
        style={{ marginBottom: '10px' }}
        onClick={() => navigate('/apps/AllPOSBills')}
      >
        Back
      </Button.Ripple>
      <div>
        <Modal
          isOpen={openPreviewBill}
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
                <h6 className='mb-25'>Guest Name : {previewData['guestName']}</h6>
                <h6 className='mb-0'>Pax : {previewData['pax']} </h6>
              </div>
              <div className='mt-md-1 mt-3'>
                <h4>Outlet Name : <span>{localStorage.getItem('RestaurantSelected')}</span></h4>
                <h4>Bill Number : {previewData['billNoDisplay']}</h4>
                <h6>Date : {previewData['billDateTime']}</h6>

                <h6 className='invoice-number'>FSSAI No : 10018043002066</h6>
                <h6>Table Number : {localStorage.getItem('tableNumber')}</h6>
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
                <Col className='d-flex justify-content-center'>
                  <div style={{ paddingLeft: '68%' }}>

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
                            <p className='invoice-total-title'>
                              <strong>{item.item.toUpperCase()} : {typeof item.value === 'number' ? item.value.toFixed(2) : item.value}</strong>
                            </p>
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
                    {previewData.paymentBreakup.map((row, index) => (
                      <React.Fragment key={index}>
                        <h5>Payment Mode: {row.paymentMode}</h5>
                        <div>
                          <h5>Amount in Words : {previewData.total === 0 ? 'Zero' : inWords(previewData.total)}</h5>
                        </div>
                      </React.Fragment>
                    ))}

                  </>
                }


              </div>
            </CardBody>


            {/* <hr className='invoice-spacing' /> */}
            <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '40px' }} ></div>

            <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '40px' }} ></div>
            
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
      <Card >
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
      <Card>
     
        {flag == true &&

        <div className="ag-theme-alpine"  style={{ height: 520}}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            // paginationAutoPageSize='true'
            paginationPageSize='10'
            pagination='true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}

          />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        }
      </Card>
      <Modal
        isOpen={showConfirmationModal}
        toggle={() => setShowConfirmationModal(false)}
        className='modal-dialog-centered'
        centered
        footer={null}
      >

        
        <ModalHeader className='modal-lg'>Confirm Resettle Bill
        </ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20' >

          <Form onSubmit={handleSubmit(onSubmit)}>

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
                        type='text' 
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
            <div align='end' className='buttons'>
              <Button outline className='me-1' color='secondary' onClick={() => setShowConfirmationModal(false)}>
                CANCEL
              </Button>
              <Button color='primary' className='me-1' type="submit" >
                SUBMIT
              </Button>
            </div>
          </Form>


        </ModalBody>

      </Modal>
    </div>

  );
};

export default ValidationThirdPartyComponents;
