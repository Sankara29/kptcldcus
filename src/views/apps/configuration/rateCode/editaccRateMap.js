// ** React Imports
import { useRef, useState } from "react";
import { Fragment } from "react";
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import {
  Button,
  Modal,
  Collapse,
  CardTitle,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";
import classnames from "classnames";
// ** Custom Components
import { Input, Card, Form, Row, Col, Label,   } from 'reactstrap'

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useEffect, useMemo, useCallback } from "react";
import API_URL from "../../../../config";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const Companydetails = (data1) => {
  //console.logdata1);
    const defaultValues1 = {
      reservationid: '',
      source: '',
      companyID: '',
      packageID: null,
    }
  
    const [data, setData] = useState(null)
    const [source1, setsource] = useState('')
    const [filldata, setfilldata] = useState(false)
    const [rowData, setRowData] = useState()
    const [fullAddress, setAddress] = useState()
    const { reset, handleSubmit, control } = useForm({ defaultValues1 })
    const { setError, formState: { errors } } = useForm()
    const gridRef1 = useRef()

    const [room, setRoom] = useState([]);
    const [roomIDs, setRoomID] = useState()
    let navigate = useNavigate();  
  
    //ag-grid cell clcked value
    const cellClickedListener = useCallback(event => {
      //console.logevent)
      localStorage.setItem('companyName', event['data']['accountID'])
      localStorage.setItem('rateCodeIDs', event['data']['rateCodeID'])
      localStorage.setItem('AccountName', event['data']['accountName'])
      setfilldata(event['data']['accountName'])
    })
  
  
    //On submit function
    const onSubmit = (data) => {
        setData(data);
        //console.logdata);
        localStorage.setItem('data2',JSON.stringify(data));
        // //console.logJSON.parse(localStorage.getItem('data2')))   
        if (data.accountType !== null && data.accountName !== null) {
          //console.logdata);
          let createmarketGroup = JSON.stringify({
            accountID: roomIDs,
            rateCodeID: data1.data1.id,
            hotelID:1
          });
          //console.logcreatemarketGroup);
          //console.log"hi");
          let res = fetchx(API_URL+"/addAccountRateCodeMapping", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: createmarketGroup,
          })
            .then((result) => result.json())
            .then((resp) => {  
              const swalInstance = MySwal.fire({
                text: 'Accounts Mapped Successfully!',
                // icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'Close',
                customClass: {
                  confirmButton: 'btn btn-danger'
                }
              });
              swalInstance.then((result) => {
                if (result.isConfirmed) {
                  navigate('');
                }
              });            
           
            })
            .catch((error) => {
              //console.logerror);
            });    
        }
      };
    //API to get company list
    useEffect(() => {
      fetchx(API_URL + `/getCompanyList?hotelID=1`)
        .then(result => result.json())
        .then(rowData => {
          setRowData(rowData['data'])
          setAddress((rowData['data']['addressLine1'] + rowData['data']['addressLine2']))
        })
    }, [])
    
    //Ag-grid column definition
    const [columnDefs] = useState([
      // { headerName: 'Account ID', field: 'accountID', maxWidth: 100 },
      { headerName: 'Company Name', field: 'accountName',checkboxSelection: true, headerCheckboxSelection: true, maxWidth: 400 },
      // { headerName: 'Rate Code', field: 'rateCodeIDs', maxWidth: 300 },
      { headerName: 'Address Line 1', field: 'addressLine1', maxWidth: 300 },
      { headerName: 'Address Line 2', field: 'addressLine2', maxWidth: 300 },
      { headerName: 'City', field: 'city', maxWidth: 110 },
      { headerName: 'State', field: 'state', maxWidth: 110 },
      { headerName: 'Country', field: 'country', maxWidth: 110 },
      // {
      //   headerName: "Action",
      //   maxWidth: 140,
      //   cellRenderer: () => {
      //     return (<Button color='primary' onClick={onDiscard}>Select</Button>)
      //   }
      // },
      // { headerName: 'GSTID', field: 'gstID', maxWidth: 300 },
  
      // { headerName: 'Mobile Number', field: 'phoneNumber', maxWidth: 300 },
      // { headerName: 'Email ID', field: 'email', maxWidth: 300 },
      // {
      //   cellRenderer: () => {
      //     return (<Button color='primary' onClick={() => setAssign(!assign)} >View Profile</Button>)
      //   }
      // }
    ])
    //Search element
    const onFilterTextBoxChanged = useCallback(() => {
      gridRef1.current.api.setQuickFilter(
        document.getElementById('filter-text-box').value
      )
    }, [])
    //ag-grid column defn
    const defaultColDef = useMemo(() => (
      {
        sortable: true,
        filter: true,
        filterParams: {
          buttons: ['apply', 'reset']
        }
      }
    ))
   
   
    //reset function
    const handleReset = () => {
      setfilldata(false)
      reset({
        source: '',
        companyID: '',
        packageID: null
      })
    }

      //// OncheckBox Click
      const onSelectionChanged = (event) => {
        let allAccounts = event.api.getSelectedRows()
        //console.logallAccounts
                   
        let accountID = [];
        let rateCodeIDs = [];
              allAccounts.forEach(element => {
          accountID.push(element.accountID)
          rateCodeIDs.push(element.rateCodeIDs)         
                //console.logaccountID)
                //console.lograteCodeIDs)
            });
        setRoomID(accountID)
        setRoom(rateCodeIDs)
        // setRoomIDStatus(roomIDStatus)
        if (allAccounts.length === 0) {
            setRoomID()
            setRoom()
            setRoomIDStatus()

        }
    }  
    return (
      <div>  
            <Form onSubmit={handleSubmit(onSubmit)}>
                             <div>                
                      <div>
                        <Row className='mb-1'>
                          <Col md='3' sm='12' className='me-1'>
                            <Label className='form-label' for='fullName'>
                              Search
                            </Label>
                            <Input
                              type="text"
                              id="filter-text-box"
                              placeholder="Filter..."
                              onInput={onFilterTextBoxChanged}
                            />
                          </Col>                          
                        </Row>
                      </div>
                      <div className="ag-theme-alpine" style={{ height: 520 }}>
                        <AgGridReact
                          ref={gridRef1}
                          rowData={rowData}
                          columnDefs={columnDefs}
                          animateRows={true}
                          onCellClicked={cellClickedListener}
                          onGridReady={params => {
                            params.api.sizeColumnsToFit();
                        }}
                        rowSelection='multiple'
                        onSelectionChanged={onSelectionChanged}
                        rowMultiSelectWithClick={true}
                          paginationPageSize='10'
                          pagination='true'
                          defaultColDef={defaultColDef}
                          headerColor="ddw-primary"
                        />                       
                      </div> 
                      <div>
                      {/* <Col md="3" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="rateCode">
                    Select Rate Code
                  </Label>
                  <Controller
                    id="rateCode"
                    control={control}
                    name="rateCode"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={rateCodes}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {                       
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col> */}
                        </div>                 
                </div>
              <br></br>
              <div className='button' align='end'>
                <Button className='me-1' style={{ align: 'right' }} outline color='secondary' type='reset' onClick={handleReset} >
                  Reset
                </Button>
                <Button className='me-1' color='primary' type='submit' style={{ align: 'right' }}>
                  Submit
                </Button>
              </div>
  
            </Form>
      </div>
    )  
  }



  const AccountMapping = ({stepper2,data1}) => {
    //console.logdata1)
    const [rowData, setRowData] = useState();
    const gridRef = useRef();
    const [show, actionButton] = useState(false);
    let navigate = useNavigate();
    const[addRateCode, setaddRateCode] = useState(false);
    const [show1, actionButton1] = useState(false);

    const [columnDefs, setColumnDefs] = useState([
      {headerName: "Company ",field: "accountName", suppressSizeToFit: true, maxWidth: 100,},
      {headerName: "Rate Code ",field: "rateCode", suppressSizeToFit: true, maxWidth: 100,},
      { headerName: "Description", field: "description"    ,maxWidth: 135 },
      { headerName: 'BeginSellDate', field: 'beginSellDate',maxWidth: 150 },
      { headerName: 'End Sell Date', field: 'endSellDate'  ,maxWidth: 150 },
      { headerName: "Package Code ", field: 'packageCode'  ,maxWidth: 150 },
      { headerName: "Market Code", field: 'marketCode'     ,maxWidth: 135 },
      { headerName: 'Source Code ', field:'sourceCode'     ,maxWidth: 135 },
    //   {headerName: "Action",field: "numAvlRooms", suppressSizeToFit: true, maxWidth: 140,cellRendererFramework: (params) => (
    //     <Button color="primary" onClick={() => {
    //        actionButton(!show); }}> View
    //     </Button>
    //   ),
    // },
    {headerName: "Action",field: "numAvlRooms", suppressSizeToFit: true, maxWidth: 140,cellRendererFramework: (params) => (
      <Button color="primary" onClick={() => {
         actionButton1(!show1); }}> Remove
      </Button>
    ),
    },
    ]);
  
    const defaultColDef = useMemo(() => ({
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ["apply", "reset"],
      },
    }));

    const [rateCodeIDdata, setRateCodeID] = useState([]);
    const [completeData, setCompleteData] = useState([]);

    const rates = [];
    
    const cellClickedListener = useCallback((event) => {
      //console.log"cellClicked", event);

     rates.push(event.data.rateCodeID);
     setCompleteData(event.data);
     setRateCodeID(rates);
    }, []);
    //console.logcompleteData)

    //console.lograteCodeIDdata[0])

    useEffect(() => {
      // //console.loglocalStorage.getItem["id"]);
      fetchx(API_URL + `/getRatecodeAccount?hotelID=1&rateCodeID=${data1.id}}`)
        .then((result) => result.json())
        .then((rowData) => setRowData(rowData["data"]));
      //console.logrowData);
    }, []);
    //console.logrowData);
   
    const navigatepage = () => {
      navigate('');
  };

  //console.lograteCodeIDdata);

  function Confirm() {
      const updatedItem = JSON.stringify({
      id : completeData.id,
      hotelID:1,
      accountID:completeData.accountID,
      rateCodeID: completeData.rateCodeID,      
    });
       fetchx(API_URL + `/deleteAccontRateCodeMap`, {      
      method: "POST",
      body: updatedItem,
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        fetchx(API_URL + `/getRatecodeAccount?hotelID=1&rateCodeID=${data1.id}}`)
        .then((result) => result.json())
        .then((rowData) => setRowData(rowData["data"]));
               const swalInstance = MySwal.fire({
          text: "Removed Account Mapped  Successfully!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Close",
          allowOutsideClick: false,
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
            actionButton1(false);
          }
        });
      })
      .then((post) => {
                if (post.statusCode === 200) {
          setPopUp(false);
          fetchx(API_URL + `/getAccRatecode?hotelID=1&accountID=${data1.companyid}`)
            .then((result) => result.json())
            .then((rowData) => {
            });
        }
      })
      .catch((err) => {
        // console.logerr.message);
      });
  }

    return (
      <div>
          <div>
        <Modal isOpen={show} toggle={() => actionButton(!show)} className="modal-lg">
          <ModalHeader toggle={() => actionButton(!show)}> Modify RateCode Details </ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>         
             {/* <RateCodeRoomRates ratecodeViewRates={rcViewRates}/>         */}
          </ModalBody>
         </Modal>
        </div> 

        <div>
        <Modal isOpen={show1} toggle={() => actionButton1(!show1)} className="modal-sm">
          <ModalHeader toggle={() => actionButton1(!show1)}>  Need To Check..</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>         
             {/* <RateCodeRoomRates ratecodeViewRates={rcViewRates}/>         */}
             <div>
              <b> "Do You Want to Remove Attached Company ?";</b>
              <br></br>
              <br></br>
              <div className="d-flex">
                <Button
                  color="primary"
                  className="me-1"
                  // className="text-center"
                  onClick={() => Confirm()}
                >
                  Confirm
                </Button>
                <Button
                  color="danger"
                  className="me-1"
                  // className="text-center"
                  onClick={() => {
                    actionButton1(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
         </Modal>
        </div> 

        <div>
        <Modal isOpen={addRateCode} toggle={() => setaddRateCode(!addRateCode)} className='modal-xl'>
          <ModalHeader className='modal-lg' toggle={() => setaddRateCode(!addRateCode)}> Add RateCodes</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>
            {/* <AccountRateCodeMapping data1={data1} /> */}
            <Companydetails data1={data1}/>
          </ModalBody>
        </Modal>
      </div>  

      <div>
      <Button className='me-1' color='primary' type='submit' onClick={() => {setaddRateCode(!addRateCode) }}>
           Add Accounts
           </Button>    
      </div>
      <br/>
      

        <div className="ag-theme-alpine" style={{ height: 150 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            rowSelection="multiple"
            onCellClicked={cellClickedListener}
            // paginationAutoPageSize = 'true'
            // paginationPageSize="10"
            // pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
          />
        </div>
        <br/>
        <div align='end' className='buttons'>    
      
           <Button color='primary' className='me-1' type='submit' onClick={() => {stepper2.next()}}>
             Next
             </Button>                 
        <Button color="primary" className="me-1" type="button" onClick={navigatepage}>
            Exit
        </Button>
        {/* <Button className='me-1' color='primary' type='submit' onClick={()=> stepper2.next()}>
           Save And Next
           </Button> */}
             </div>
      </div>
    );
  };



  export default AccountMapping;