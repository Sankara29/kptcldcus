import { useRef, useState } from "react";
import { useForm, Controller } from 'react-hook-form'
import { Input, Card, Form, Row, Col, Label,Button   } from 'reactstrap'
import { useEffect, useMemo, useCallback } from "react";
import API_URL from "../../../config";
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

const MySwal = withReactContent(Swal)

let rateCodes = [
    fetchx(API_URL +"/getAccountsRateCode?hotelID=1")
      .then((result) => result.json())
      .then((resp) => {
        // //console.logresp['data'])
        rateCodes = resp["data"];
        // //console.lograteCodes)
      }),
  ];
  

const Companydetails = () => {

    const defaultValues1 = {
      reservationid: '',
      source: '',
      companyID: '',
      packageID: null,
    }
  
    const [data, setData] = useState(null)
    const [filldata, setfilldata] = useState(false)
    const [rowData, setRowData] = useState()
    const { reset, handleSubmit, control } = useForm({ defaultValues1 })
    const { setError, formState: { errors } } = useForm()
    const gridRef1 = useRef()
    const [room, setRoom] = useState([]);
    const [roomIDs, setRoomID] = useState()

  
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
        //console.logJSON.parse(localStorage.getItem('data2')))   
        if (data.accountType !== null && data.accountName !== null) {
          //console.logdata);
          let createmarketGroup = JSON.stringify({
            accountID: localStorage.getItem('companyID'),
            rateCodeID: roomIDs,
            hotelID:1
          });
          //console.logcreatemarketGroup);
          //console.log"hi");
          let res = fetchx(API_URL+"/addRateCodeAccountMapping", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: createmarketGroup,
          })
            .then((result) => result.json())
            .then((resp) => {             
              //console.logresp);
              //console.logresp["data"])
              //console.logdata)
              //console.logresp["accountsName"])
              const swalInstance = MySwal.fire({
                text: 'Account Rate Code Mapping Successfully Done!',
                icon: 'success',
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
          // toast(
          //   <div className="d-flex">
          //     <div className="me-1">
          //       <Avatar size="sm" color="success" icon={<Check size={10} />} />
          //     </div>
          //     <div className="d-flex flex-column">
          //       <h6>Account RateCode Mapping Done</h6>
          //     </div>
          //   </div>
          // );
        }
      };
    //API to get company list
    useEffect(() => {
      fetchx(API_URL + "/getRateCode?hotelID=1")
        .then((result) => result.json())
        .then((rowData) => setRowData(rowData["data"]));
    }, []);


    //Ag-grid column definition
    const [columnDefs] = useState([
      { headerName: 'RateCode ID', field: 'id', maxWidth: 100 },
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
    //Modal close function
    const onDiscard = () => {
      setBasicModal(false)
    }
    let navigate = useNavigate();

    const navigatepage = () => {navigate('');  };
   
    //reset function
    const handleReset = () => {
      setfilldata(false)
      reset({
        source: '',
        companyID: '',
        packageID: null
      })
    }
    const gridRef2 = useRef();

      //// OncheckBox Click
      const onSelectionChanged = (event) => {
        let allAccounts = event.api.getSelectedRows()
        // //console.logallAccounts
        //     )       
        let accountID = [];
        let rateCodeIDs = [];
              allAccounts.forEach(element => {
          accountID.push(element.id)
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
        //console.log"localStorage.getItem('companyData')")
    }  
    return (
      <div>  
            <Form onSubmit={handleSubmit(onSubmit)}>
                             <div>                
                      {/* <div>
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
                      </div> */}
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
                
                        </div>                 
                </div>
              <br></br>
              <div className='button' align='end'>
              <Button color='primary' className='me-1' type='button' onClick={navigatepage}>
            Exit
        </Button>
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
  export default Companydetails;