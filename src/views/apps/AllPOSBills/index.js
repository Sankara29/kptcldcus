
// ** React Imports
import { useState } from 'react'
import Select from "react-select";

import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import Moment from 'moment'
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, Input, InputGroup, InputGroupText, Table, Modal, ModalHeader, ModalBody, } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'


// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import API_URL from "../../../config";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import Avatar from "@components/avatar";
import { Check } from "react-feather";
import { XCircle } from "react-feather";
// ** Utils
import { selectThemeColors } from "@utils";
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
let is_test = false




const AllPOSBills = () => {

  // AG Grid
  const [Today,setToday] = useState()

  const [flag, setFlag] = useState(false)
  const [rowData, setRowData] = useState([]);
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

//   const gridApiRef = useRef(null);

  const gridRef = useRef();
  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ));

  const cellClickedListener = useCallback(event => {
    // console.log('cellClicked', event);
  }, []);


  // ** State
  const [storeOptions, setStoreOptions] = useState([]);
  const [colSummaryData, setColSummaryData] = useState([])
  


  let navigate = useNavigate();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Bill No', field: 'billNoDisplay' , suppressSizeToFit: true, maxWidth: 160 },
    {
      headerName: 'View Invoice', cellRendererFramework: (params) => <Button color='primary' style={{ width: 140 }} onClick={() => {
        getFinalInvoice(params.data)


      }} >View Invoice</Button>, suppressSizeToFit: true, maxWidth: 180
    },
    { headerName: 'Send', cellRendererFramework: (params) => {
      
          
      {if(params.data.billStatus!=='cancelled'){return (
        
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
    { headerName: 'Customer Name', field: 'guestName',maxWidth: 180 },
    { headerName: 'Company Name', field: 'BTCCompany',maxWidth: 150},

    { headerName: 'Payment', field: 'paymentModes',maxWidth: 150},
    { headerName:"Round Off",field:'roundOff',maxWidth:160},
    { headerName: 'Status', field: 'billStatus',maxWidth: 120 },
    { headerName: 'Bill Date', field: 'billDateTime' ,maxWidth: 180},

    { headerName: 'Steward', field: 'stewardName',maxWidth: 120 }, 
    {headerName: 'subTotalAfterDisc',field: 'subTotalAfterDisc',width:250},
    {headerName: 'GuestGST',field: 'GuestGST',width: 230},
    {headerName: 'BTCCompanyGST',field: 'CompanyGST',width: 230},
    { headerName: 'Resettle Reason', field: 'resettleReason' },
    { headerName: 'isVoid', field: 'isVoid',maxWidth: 120 },
    { headerName: 'Void Reason', field: 'voidReason' },

  ]);
  useEffect(() => {

    fetchx(API_URL + "/getBusinessDate", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hotelID: 1,
          })
    }).then(result => result.json())
    .then(resp => {
       // console.log(resp['data'])
        setToday(resp['data'][0]['businessDate'])
        let res = fetchx(API_URL + "/getAllPOSBills", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "hotelID": 1,
            "fromDate": Moment(String(new Date(resp['data'][0]['businessDate']))).format("YYYY-MM-DD"),
            "toDate": Moment(String(new Date(resp['data'][0]['businessDate']))).format("YYYY-MM-DD")
          })
        }).then(data => data.json())
          .then((res) => {

            // console.log(res);
            // console.log(res["data"][0]);
            
            if(res['statusCode']==200){
              const modifiedData = res["data"].map(item => {
                console.log(item);
                item.billDateTime =  Moment(String(new Date(item.billDateTime))).format("YYYY-MM-DD")
                // Check if item.paymentBreakup is not null and is an array
                const paymentBreakupArray = item.paymentBreakup ? JSON.parse(item.paymentBreakup) : [];
                
                const combinedPaymentModes = paymentBreakupArray.map(payment => payment.paymentMode).join(', ');
    
                console.log(combinedPaymentModes);
    
                return { ...item, paymentModes: combinedPaymentModes };
              });
    
              console.log(modifiedData);
              setRowData(modifiedData)
            }
          });
      }).catch((error) => {
       // console.log(error)
      })
    fetchx(API_URL + '/getStoreList?hotelID=1')
      .then(result => result.json())
      .then(resp => {
        const responseData = resp['data'];
        // console.log(responseData);

        // setStoreOptions(options);
        setStoreOptions(responseData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });

     
  }, [Today!=undefined])
  // ** Hooks

  let defaultValues = {
   
    frmdate: Moment((new Date(Today))).format('YYYY-MM-DD'),
    todate : Moment((new Date(Today))).format('YYYY-MM-DD'),
    
  }
    const { reset, handleSubmit, control } = useForm({ defaultValues })

  const GetAllPOSBills = data => {
    
    const storeIDs = data.storeID && data.storeID.map(item => item.value);
    // console.log(storeIDs)
    let createmarketGroup;
    if (storeIDs && storeIDs.length === 0) {
      // console.log("In if")
      createmarketGroup = JSON.stringify({
        "hotelID": 1,
        "fromDate": Moment(String(new Date(data.frmdate[0]))).format("YYYY-MM-DD"),
        "toDate": Moment(String(new Date(data.todate[0]))).format("YYYY-MM-DD")
      })
    }
    else {
      // console.log("In Else")
      createmarketGroup = JSON.stringify({
        "hotelID": 1,
        "storeID": storeIDs,
        "fromDate": Moment(String(new Date(data.frmdate[0]))).format("YYYY-MM-DD"),
        "toDate": Moment(String(new Date(data.todate[0]))).format("YYYY-MM-DD")
      })
    }
    // console.log(storeIDs)

    setData(data)
    setFlag(true)

    // console.log(createmarketGroup)

    let res = fetchx(API_URL + "/getAllPOSBills", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: createmarketGroup
    }).then(data => data.json())
      .then((res) => {
        // console.log(res);
        // console.log(res["data"][0]);
        if(res['statusCode']==200){
          const modifiedData = res["data"].map(item => {
            console.log(item);
            item.billDateTime =  Moment(String(new Date(item.billDateTime))).format("YYYY-MM-DD")

            // Check if item.paymentBreakup is not null and is an array
            const paymentBreakupArray = item.paymentBreakup ? JSON.parse(item.paymentBreakup) : [];
            
            const combinedPaymentModes = paymentBreakupArray.map(payment => payment.paymentMode).join(', ');

            console.log(combinedPaymentModes);

            return { ...item, paymentModes: combinedPaymentModes };
          });

          console.log(modifiedData);
          setRowData(modifiedData)
        }
      });


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

  const params = {
    fileName: 'POSInvoices ', // Set your desired file name here
  };

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv(params);
  }, []);
  const handleReset = () => {
    reset({

      block: ''
    })
  }
  const downloadCSV = () => {
    const csvData = [];
    // Get the table
    const table = document.querySelector('table');

    // Include the header row from the <thead>
    const headerRow = table.querySelector('thead tr');
    const headerData = [];
    const headerCells = headerRow.querySelectorAll('th');
    headerCells.forEach((headerCell) => {
        headerData.push(headerCell.textContent.trim());
    });
    csvData.push(headerData.join(','));

    // Iterate through rows and cells of the <tbody>
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach((row) => {
        const rowData = [];
        const cells = row.querySelectorAll('td');
        cells.forEach((cell) => {
            rowData.push(cell.textContent.trim());
        });
        csvData.push(rowData.join(','));
    });

    // Combine all rows into a CSV string
    const csvString = csvData.join('\n');

    // Create a Blob and download link
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table_data.csv';

    // Trigger the download
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
};
  const [composeOpen, setcomposeOpen] = useState(false)
  const [toggleCompose, settoggleCompose] = useState(false)
  const [guestEmail,setguestEmail] = useState()
  const [CompleteData,setCompleteData] = useState()
  const [guestSelect,setguestSelect] = useState(false)

   
const SendEmail = (data) =>{
  // console.log(guestEmail)
  // console.log(CompleteData)
  // if(data['email-to'] == undefined){
  //   data['email-to'] = guestEmail
  // }

  let billno = CompleteData.billNoDisplay.replaceAll("/", "_").replaceAll("-", "")

  // console.log(data)

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
      if(resp.statusCode==200){
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

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

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
            <Card>
        <CardHeader>
          <CardTitle tag='h4'>All POS Bills</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(GetAllPOSBills)}>
            <Row>
              <Col md='4' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='storeID'>
                    Store Name <spam style={{ color: 'red' }}>*</spam>
                  </Label>
                  <Controller
                    id="storeID"
                    control={control}
                    name="storeID"
                    render={({ field }) => (
                      <Select
                        isMulti
                        // required
                        isClearable
                        options={storeOptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              {Today!=undefined && <><Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="frmdate1">
                    From Date<spam style={{ color: 'red' }}>*</spam>
                  </Label>
                  <Controller
                    control={control}
                    id="frmdate"
                    name="frmdate"
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        required
                        
                        options={{ allowInput: true }}
                        placeholder="YYYY-MM-DD "
                        className={classnames("form-control", {
                        })}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="todate1">
                    To Date<spam style={{ color: 'red' }}>*</spam>
                  </Label>
                  <Controller
                    control={control}
                    id="todate"
                    name="todate"
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        required
                        defaultValue={defaultValues['todate']}

                        options={{ allowInput: true }}
                        placeholder="YYYY-MM-DD "
                        className={classnames("form-control", {
                        })}
                      />
                    )}
                  />
                </div>
              </Col>
              </>
}
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit'>
                  Submit
                </Button>
                <Button outline color='secondary' type='reset' onClick={handleReset}>
                  Reset
                </Button>
                <span style={{ margin: '10px' }}></span>
                {/* <Button className='me-1' color='primary' type='submit' onClick={onBtnExport}> */}
                {/* <div className='inline-spacing' align="right" style={{ margin: '2px 0' }}> */}
            {/* <Button.Ripple color='primary' style={{ marginTop: '22px'}} onClick={onBtnExport} disabled={rowData.length==0} >Download CSV file</Button.Ripple> */}
            {/* </div> */}
            <Button className='me-1' color='primary' type='submit' onClick={onBtnExport} >

Download
</Button>
              </div>
            </Row>
          </Form>
        </CardBody>
      </Card>
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
            getRowStyle={getRowStyle}
            // gridOptions={gridOptions}
          // onGridReady={onGridReady}

          />
          </div>
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
          
      <Modal isOpen={ShowPOSInvPDF} toggle={() => setShowPOSInvPDF(!ShowPOSInvPDF)} style={{ height: '200px' }} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShowPOSInvPDF(!ShowPOSInvPDF)}>PMS Invoice</ModalHeader>

        <iframe style={{ height: '85vh' }} src={InvURL}> </iframe>
      </Modal>
    </div>
  )

  }
export default AllPOSBills
