import { useState,useEffect,useRef , useMemo, useCallback } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from '@utils'
import { Input, Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader,Modal, ModalHeader, ModalBody, } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

// import RateDetails from "./rateDetails"
import API_URL from '../../../../config'
import Moment from 'moment'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

sessionStorage.removeItem('RateCodesID')
const MySwal = withReactContent(Swal)


const defaultValues = {
  // hotelID: '',
  rateCode: '',
  description: '',
  rateCategory: null,
  marketCode: null,
  source: null,
  beginDate: '',
  sellDate: '',
  package: null,
  transactionCode: null,
  pkgtransactionCode: '',
  printRate: null,
  discount: null,
  discountAmount:'',
  discountPercentage:'',
  isActive:1,
  dayUse: null,
  complementary: null,
  houseUse: null,
  day: null
}

let packages = [
  fetchx(API_URL + '/getRateCodePackageID?hotelID=1 ')
    .then(result => result.json())
    .then(resp => {
      packages = resp['data']
    })
]

let sources = [
  fetchx(API_URL + '/getRateCodeSourceID?hotelID=1 ')
    .then(result => result.json())
    .then(resp => {
      sources = resp['data']
    })
]

let marketCodes = [
  fetchx(API_URL + '/getRateCodeMarketID?hotelID=1 ')
    .then(result => result.json())
    .then(resp => {
      marketCodes = resp['data']
    })
]


let rateCategory = [
  fetchx(API_URL + '/getRateCodeRateCategory?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      rateCategory = resp['data']
    })
]



let transactionCode = [
  fetchx(API_URL + '/getRateCodeTransactionID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      transactionCode = resp['data']
    })
]

let packagetransactionCode = [
  fetchx(API_URL + '/getRateCodeTransactionID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      packagetransactionCode = resp['data']
    })
]



const rateCode = ({stepper}) => {

  const { setError, formState: { errors }} = useForm()
  const [data, setData] = useState(null)
  const { reset, handleSubmit, control,watch } = useForm({ defaultValues })
  const [selectedPackage, setSelectedPackage] = useState(null); 
  const [selectedValue, setSelectedValue] = useState(); 
  const [transactionData, setTransactionData] = useState([]);
  const [rateCodes, setRateCode] = useState();
  const gridRef1 = useRef(null)
  const [rowData2, setRowData2] = useState();
  const gridRef = useRef();
  const [selectedCompany, setSelectedCompany] = useState({});
  const [selectedValue1,setSelectedValue1] = useState([])
  const [TransactionCodeData,setTransactionCodeData] = useState([])
  useEffect(() => {
    fetchx(API_URL +"/getAccomadationTransactionCode?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setTransactionCodeData(rowData["data"][0]['id']));


    fetchx(API_URL +"/getCompleteAccountDetails?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData2(rowData["data"]));

      
      
  }, []);
  

//TransactionCode
const [columnDefs2, setColumnDefs2] = useState([
  { headerName: 'Account ID', field: 'accountID', maxWidth: 100 },
      { headerName: 'Company Name', field: 'accountName', maxWidth: 300 },
      // { headerName: 'Rate Code', field: 'rateCodeIDs', maxWidth: 300 },
      { headerName: 'Address Line 1', field: 'addressLine1', maxWidth: 300 },
      { headerName: 'Address Line 2', field: 'addressLine2', maxWidth: 300 },
      { headerName: 'City', field: 'city', maxWidth: 110 },
      { headerName: 'State', field: 'state', maxWidth: 110 },
      { headerName: 'Country', field: 'country', maxWidth: 110 },
      { headerName: "Action",
        maxWidth: 140,
        cellRenderer: (params) => {
          return (<Button color='primary' onClick={cellClickedListener1}>Select</Button>)
        }
      },
]);



const onFilterTextBoxChanged2 = useCallback(() => {
  gridRef.current.api.setQuickFilter(
    document.getElementById("filter-text-box").value
  );
}, []);


  const cellClickedListener1 = (event) => {
       setTransactionData (event['data'])
       setSelectedCompany(event['data'])
       setRateCode(false)
    }


    const defaultColDef = useMemo(() => ({
      suppressSizeToFit: true,
      autoHeight: true,
      resizable: true,
      // editable: true,
      sortable: true,
      filter: true,
      singleClickEdit: true,
      filterParams: {
        buttons: ["apply", "reset"],
      },
    }));

  const packagetransactionCode = (selectedPackage) => {
    fetchx(API_URL + `/getPackageTransactionCode?id=${selectedPackage.value}&hotelID=1`)
    .then(result => result.json())
    .then(resp => {
      // setSelectedValue (JSON.stringify(resp['data']))
      setSelectedValue(resp['data'][0]['description']) 
      setSelectedValue1(resp['data'][0]['transactionCodeID']) 

    })
  }


  const beginDate = watch('beginDate');
  const today = Moment().format('YYYY-MM-DD');
  const options = {
    minDate: today
  };
  const optionsToDate = {
    minDate: (Moment(String(new Date(beginDate))).format('YYYY-MM-DD')) // Set the minimum date as fromDate or today if fromDate is not selected
  };
  const [flag,setflag] = useState(false)
  let navigate = useNavigate();  

  const onSubmit = data => {
    setData(data)
    
      let createrateCode = JSON.stringify({
        "rateCode": data.rateCode,
        "description": data.description,
        "beginSellDate": (data.beginDate === undefined ? null : Moment(String(new Date(data.beginDate[0]))).format('YYYY-MM-DD')),
        "endSellDate": (data.sellDate === undefined ? null : Moment(String(new Date(data.sellDate[0]))).format('YYYY-MM-DD')),
        "marketID": data.marketCode === null ? null :data.marketCode.value,
        "sourceID": data.source === null ? null :data.source.value,        
        // "packageID": selectedPackage=== null ? null :selectedPackage.value,
        "packageID":selectedPackage.value,
        "tansactionCodeID": TransactionCodeData,
        // "packageTransactionCodeID":selectedValue1 === null? null : selectedValue1,
        "packageTransactionCodeID":selectedValue1,
        "printRate":1,
        "discount":0,
        "discountAmount": 200,
        "discountPercentage":10,
        "dayUse": 0,
        "complementary": 0,
        "houseUse": 0,
        "daysApplicable": 1,
        "isActive":1,      
        "rateCategoryID":data.rateCategory === null ? null :data.rateCategory.value,
        "hotelID":1,
        "accData": transactionData["accountID"]
            })
      localStorage.setItem("RateCode",data.rateCode )
      let res = fetchx(API_URL+"/addRateCodeDetails", {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: createrateCode
      }).then(data => data.json())
      // .then(result => result.json())
      .then(resp => {
        sessionStorage.setItem('RateCodesID', resp['data'])
        if(flag==true){
          if(resp['statusCode']==200){         
          const swalInstance = MySwal.fire({
            text: 'Rate Code Added Successfully!',
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
        }
        else{
          const swalInstance = MySwal.fire({
            text: resp.message,
            // icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            allowOutsideClick: false, 
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
            }
          });
        }
      }
        else if(flag==false){
                 if(resp['statusCode']==200){ 
          const swalInstance = MySwal.fire({
            text: 'RateCode Created Successfully! ',
            // icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            allowOutsideClick: false,
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
            }
          }); 
             }
        else{
          const swalInstance = MySwal.fire({
            text: resp.message,
            // icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            allowOutsideClick: false, 
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
            }
          });
        }
        }
          
      }).catch((error) => {
      })
  }

   const handleReset = () => {
    reset({
      // hotelID: '',
      rateCode: '',
      description: '',
      rateCategory: null,
      marketCode: null,
      source: null,
      beginDate: '',
      sellDate: '',
      package: null,
      transactionCode: null,
      pkgtransactionCode: '',
      printRate: null,
      discount: null,
      dayUse: null,
      complementary: null,
      houseUse: null,
      day: null
    })
  }
  window.onload = function() {
    localStorage.clear();
  };



  const handleCompanyClear = () => {
    setSelectedCompany()
  };




  return (
    <div>

<div>
        <Modal isOpen={rateCodes} toggle={() => setRateCode(!rateCodes)} className='modal-xl'>
         <ModalHeader className='modal-lg' toggle={() => setRateCode(!rateCodes)}> View Transaction Codes</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>  
          <div>
          <Row className='mb-1'>
          <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="fullName">
            Search
          </Label>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged2}
          />
        </Col>
                        <Col md='3' sm='12' className='me-1'>
                          <br></br>
                         
                        </Col>
                      </Row>
                      <Row>
                      <div className="ag-theme-alpine" style={{ height: 540 }}>
                        <AgGridReact
                          ref={gridRef}
                          rowData={rowData2}
                          columnDefs={columnDefs2}
                          animateRows={true}
                          rowSelection="multiple"
                          onCellClicked={cellClickedListener1}
                          paginationPageSize="10"
                          pagination="true"
                          defaultColDef={defaultColDef}
                          headerColor="ddw-primary"
                        />
                       </div>
                      </Row>  
          </div>       
         
          </ModalBody>
       </Modal>
      </div>


              <Form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <Row>              
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='rateCode'>
                      Rate Code <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='rateCode'
                      name='rateCode'
                      render={({ field }) => <Input 
                      // pattern="[a-zA-Z  ]*" title="Type Only Alphabets" 
                      placeholder='Rate Code'
                         required
                        invalid={errors.rateCode && true} {...field} />}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='description'>
                      Description <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='description'
                      name='description'
                      render={({ field }) => <Input
                      required
                       placeholder='Description' 
                        invalid={errors.description && true} {...
                        field} />}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='rateCategory'>
                      Rate Category <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      id='rateCategory'
                      control={control}
                      name='rateCategory' sources
                      render={({ field }) => (
                        <Select
                        required
                          isClearable
                          options={rateCategory}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.rateCategory === null })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='marketCode'>
                      Market Code
                    </Label>
                    <Controller
                      id='marketCode'
                      control={control}
                      name='marketCode'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={marketCodes}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 
                            // 'is-invalid': data !== null && data.marketCode === null 
                          })
                          }
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='source'>
                      Source
                    </Label>
                    <Controller
                      id='source'
                      control={control}
                      name='source'
                      render={({ field }) => (
                        <Select
                          isClearable
                          options={sources}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 
                            // 'is-invalid': data !== null && data.source === null
                           })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='beginDate'>
                      Begin Date <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      control={control}
                      id='beginDate'
                      name='beginDate'
                      render={({ field }) => (
                        <Flatpickr
                        required
                          {...field}
                          options={options}placeholder='YYYY-MM-DD '
                          className={classnames('form-control', {
                            'is-invalid': data !== null && data.beginDate === null
                          })}
                        />
                      )}
                    />
                  </div>
                </Col>
                
                <Col md='3' sm='12'>
                <div className='mb-1'>
                            <Label className='form-label' for='sellDate'>
                            Sell Date <spam style={{color:'red'}}>*</spam>
                            </Label>
                            <Controller
                              control={control}
                              id='sellDate'
                              name='sellDate'
                              render={({ field }) => (
                                <Flatpickr
                                required
                                  placeholder='YYYY-MM-DD'
                                  {...field}
                                  options={optionsToDate}
                                  // options={{ allowInput: true }}
                                  className={classnames('form-control', {
                                    'is-invalid': data !== null && data.sellDate === null
                                  })}
                                />
                              )}
                            />
                          </div>
               
                </Col>                
                <Col md='3' sm='12'>
                    <div className='mb-1'>
                      <Label className='form-label' htmlFor='package'>
                        Package <spam style={{color:'red'}}>*</spam>
                      </Label>
                      <Controller
                        id='package'
                        control={control}
                        name='package'
                        render={({ field }) => (
                          <Select
                            isClearable
                            options={packages}
                            classNamePrefix='select'
                            theme={selectThemeColors}
                            className={classnames('react-select', {
                              'is-invalid': data !== null && data.package === null
                            })}
                            // {...field}
                            onChange={(selectedOption) => {
                              // Update the selectedPackage state with the selected value
                              setSelectedPackage(selectedOption);
                              packagetransactionCode(selectedOption)
                            }}
                          />
                        )}
                      />
                    </div>
                  </Col>
                
                 <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="pkgtransactionCode">
                     Package Transaction Code
                    </Label>
                    <Controller
                      control={control}
                      id="pkgtransactionCode"
                      name="pkgtransactionCode"
                      render={({ field }) => (
                        <Input
                        // defaultValue={selectedValue['description'] }
                          disabled={true}
                          placeholder="pkgtransactionCode"
                          //invalid={errors.names && true}
                          {...field}
                          value={selectedValue}
                        />
                      )}
                    />
                  </div>
                      </Col> 


                      
                 {transactionData && (
  <Col md="3" sm="12">
    <div className="mb-1">
      <Label className="form-label" for="accName">
        Accounts
      </Label>
      <Controller
        required
        control={control}
        id="accName"
        name="accName"
        render={({ field }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              onClick={() => setRateCode(!rateCodes)}
              placeholder="Company Name"
              invalid={errors.accName && true}
              {...field}
              value={selectedCompany !== undefined ? selectedCompany.accountName : ''}
            />
            <span
              style={{
                color: 'red',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                padding: '0',
                fontSize: 'inherit',
                marginLeft: '5px',
              }}
              size="sm"
              onClick={handleCompanyClear}
            >
              X
            </span>
          </div>
        )}
      />
    </div>
  </Col>
)}

              </Row>
            </div>

              <br/>
        
           <div align='end' className='buttons'>
           <Button className='me-1' color='primary' type='submit' onClick={()=>setflag(false)}>
           Proceed
           </Button>
        
           <Button outline color='secondary' type='reset' onClick={handleReset}>
           Reset
           </Button>
           </div>
           
          </Form>  

    </div>
  )
}
export default rateCode;