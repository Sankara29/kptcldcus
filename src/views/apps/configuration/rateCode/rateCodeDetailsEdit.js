import { useState } from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from '@utils'
import { Input, Card, Form, Row, Col, Label, Button ,Modal,
  ModalBody,
  ModalHeader} from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
import { useRef, useEffect, useMemo, useCallback } from 'react';
import API_URL from '../../../../config'
import Moment from "moment";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Extras from './rateCodeExtraAdd'
import AccountMap from './editaccRateMap'
// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

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
  pkgtransactionCode: null,
  printRate: null,
  discount: null,
  discountAmount:'',
  discountPercentage:'',
  isActive:1,
  dayUse: null,
  complementary: null,
  houseUse: null,
  daysApplicable: null
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


   const rateCode = ({data1}) => {
    const [extras,  setExtras]    = useState();
    const [accountMap,setAccountMap] = useState()
    const [selectedValue,  setSelectedValue]    = useState(data1.rateCategoryID);
    const [selectedValue1, setSelectedValue1]   = useState(data1.marketCodeID);
    const [selectedValue2, setSelectedValue2]   = useState(data1.sourceID);
    const [selectedValue3, setSelectedValue3]   = useState(data1.transactionCodeID);
    const [selectedValue4, setSelectedValue4]   = useState(data1.packageID);
    const [selectedValue5, setSelectedValue5]   = useState(data1.printRate);
    const [selectedValue6, setSelectedValue6]   = useState(data1.discount);
    const [selectedValue7, setSelectedValue7]   = useState(data1.dayUse);
    const [selectedValue8, setSelectedValue8]   = useState(data1.complementary);
    const [selectedValue9, setSelectedValue9]   = useState(data1.houseUse);
    const [selectedValue10, setSelectedValue10] = useState(data1.daysApplicable);
    const {setError,formState: { errors }} = useForm()
    const [rowData, setRowData] = useState();
    const [show, actionButton] = useState(false);
    const [data, setData] = useState(null)
    const { reset, handleSubmit, control } = useForm({ defaultValues })
    let navigate = useNavigate();  
    const [flag,setflag] = useState(false)  
    const [reload, setreload] = useState(true)
    const [load, setload] = useState(true)
  
    //Country And Nationality
    const handleChange = (selectedOption) => {
        setSelectedValue(selectedOption.value);
        localStorage.removeItem('rateCategory')
        localStorage.setItem('rateCategory', selectedOption.label);
        localStorage.setItem('rateCategory', selectedOption.value);
        setreload(false)
        setTimeout(()=>{setreload(true)},1)
      };

      const handleChange1 = (selectedOption1) => {
        setSelectedValue1(selectedOption1.value);
        localStorage.removeItem('marketCode')
        localStorage.setItem('marketCode', selectedOption1.value);
        localStorage.setItem('marketCode', selectedOption1.value);
        setreload(false)
        setTimeout(()=>{setreload(true)},1)
      };

      const handleChange2 = (selectedOption2) => {
        setSelectedValue2(selectedOption2.value);
        localStorage.removeItem('sourceCode')
        localStorage.setItem('sourceCode', selectedOption2.label);
        localStorage.setItem('sourceCode', selectedOption2.value);
        setreload(false)
        setTimeout(()=>{setreload(true)},1)
      };

      const handleChange3 = (selectedOption3) => {
        setSelectedValue3(selectedOption3.value);
        localStorage.removeItem('transactionCode')
        localStorage.setItem('transactionCode', selectedOption3.value);
        localStorage.setItem('transactionCode', selectedOption3.value);
        setreload(false)
        setTimeout(()=>{setreload(true)},1)
      };
  
      const handleChange4 = (selectedOption4) => {
        setSelectedValue4(selectedOption4.value);
        localStorage.removeItem('packageCode')
        localStorage.setItem('packageCode', selectedOption4.label);
        localStorage.setItem('packageCode', selectedOption4.value);
    
        setreload(false)
        setTimeout(()=>{setreload(true)},1)
      };

      const defaultReason = {
        value: data1.rateCategory,
        label: data1.rateCategory,    
      }; 

      const defaultReason1 = {
        value: data1.marketCode,
        label: data1.marketCode,    
      }; 

      const defaultReason2 = {
        value: data1.sourceID,
        label: data1.sourceCode,    
      };
    
      const defaultReason3 = {
        value: data1.transactionCode,
        label: data1.transactionCode,    
      }; 
    
      const defaultReason4 = {
        value: data1.packageCode,
        label: data1.packageCode,    
      };

      const [TransactionCodeData,setTransactionCodeData] = useState([])


  useEffect(() => {
    fetchx(API_URL + '/getRateCode?hotelID=1')
      .then(result => result.json())
      .then(rowData => setRowData(rowData['data']))

      fetchx(API_URL +"/getAccomadationTransactionCode?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setTransactionCodeData(rowData["data"][0]['id']));
  }, []);


  const onSubmit = (data) => {
    setData(data);
    if (data.firstName !== null && data.name !== null) {
      let createmarketGroup = JSON.stringify({
        // id: data1.id,
        "rateCode": data.rateCode1,
        "description": data.description1,
        "beginSellDate":data.beginDate1 === data1["beginSellDate"] ? data.beginDate1 : Moment(String(new Date(data.beginDate1[0]))).format("YYYY-MM-DD"),
        // (data.beginDate1 === undefined ? null : Moment(String(new Date(data.beginDate1[0]))).format('YYYY-MM-DD')), 
        "endSellDate":data.sellDate1 === data1["endSellDate"] ? data.sellDate1 : Moment(String(new Date(data.sellDate1[0]))).format("YYYY-MM-DD"),
        //  (data.sellDate1 === undefined ? null : Moment(String(new Date(data.sellDate1[0]))).format('YYYY-MM-DD')), 
        "marketID":selectedValue1,
        "sourceID": selectedValue2,        
        "packageID": selectedValue4,
        "tansactionCodeID": TransactionCodeData,
        "packageTransactionCodeID": selectedValue3,
        "printRate": selectedValue5,
        "discount": selectedValue6,
        "discountAmount": 200,
        "discountPercentage":10,
        "dayUse": selectedValue7,
        "complementary": selectedValue8,
        "houseUse":selectedValue9,
        "daysApplicable": selectedValue10,
         "isActive":1,
        "rateCategoryID":selectedValue,
      }); 
      let columnsToUpdate = createmarketGroup
      let res = fetchx(API_URL + `/updateRateCode?id=${data1.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: columnsToUpdate,
        }
      )
        .then((result) => result.json())
        .then((resp) => {
                localStorage.setItem("id", data1["id"]);
                 if(flag==true){
            const swalInstance = MySwal.fire({
       text: 'Rate Code Details Edited Successfully!',
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
         //  navigate('');
         
         }
        //  else if(flag==false){
        //   const swalInstance = MySwal.fire({
        //     text: 'Rate Code Details Edited Successfully. Edit Rates Details!',
        //     icon: 'success',
        //     buttonsStyling: false,
        //     confirmButtonText: 'Close',
        //     customClass: {
        //       confirmButton: 'btn btn-danger'
        //     }
        //   });
        //   swalInstance.then((result) => {
        //     if (result.isConfirmed) {      
        //       stepper2.next(); 
        //     }
        //   }); 
        
        // }
        })
        .catch((error) => {
         //console.log(error);
        });
         }
  };
 

  return (
    <div>

{/* Account MAP */}
<div>
        <Modal  isOpen={accountMap} toggle={() => setAccountMap(!accountMap)}className="modal-lg"  >
          <ModalHeader className="modal-lg"toggle={() => setAccountMap(!accountMap)} >
           Account Map
          </ModalHeader>
          <ModalBody className="pb-3 px-sm-1 mx-20">            
            <AccountMap data1= {data1}/>
          </ModalBody>
        </Modal>
      </div>
    
{/* Extras Mapping */}
 <div>
        <Modal  isOpen={extras} toggle={() => setExtras(!extras)}className="modal-lg"  >
          <ModalHeader className="modal-lg"toggle={() => setExtras(!extras)} >
           Extras
          </ModalHeader>
          <ModalBody className="pb-3 px-sm-1 mx-20">            
            <Extras data1= {data1}/>
          </ModalBody>
        </Modal>
      </div>

          <Form onSubmit={handleSubmit(onSubmit)}>

            <div>
              <Row>            
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='rateCode1'>
                      Rate Code <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                    disabled={true}
                      defaultValue={data1["rateCode"]}
                      control={control}
                      id='rateCode1'
                      name='rateCode1'
                      render={({ field }) => <Input 
                    //   defaultValue={data1["rateCode1"]}
                      placeholder='Rate Code'
                     required
                      invalid={errors.rateCode1 && true} {...field} />}
                    />
                  </div>
                </Col>
                

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='description1'>
                      Description <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue={data1["description"]}
                      control={control}
                      id='description1'
                      name='description1'
                      render={({ field }) => <Input 
                      placeholder='Description' 
                        invalid={errors.description1 && true} {...
                        field} />}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
               <div className='mb-1'>
                 <Label className='form-label' for='rateCategory1'>
                 Rate Category <spam style={{color:'red'}}>*</spam>
                 </Label>
                 <Controller
                 required
                   id='rateCategory1'
                   control={control}
                   name='rateCategory1'
                   render={({ field }) => (
                     <Select
                     
                       isClearable
                       defaultValue={defaultReason}
                       options={rateCategory}
                       classNamePrefix='select'
                       theme={selectThemeColors}
                       className={classnames('react-select', 
                       { 'is-invalid': data !== null && data.rateCategory1 === null })}
                       {...field}
                       onChange={handleChange} 
                     />
                   )}
                 />
               </div>
              </Col> 
              <Col md='3' sm='12'>
               <div className='mb-1'>
                 <Label className='form-label' for='marketCode1'>
                 Market Code <spam style={{color:'red'}}>*</spam>
                 </Label>
                 <Controller
                 required
                   id='marketCode1'
                   control={control}
                   name='marketCode1'
                   render={({ field }) => (
                     <Select                     
                       isClearable
                       defaultValue={defaultReason1}
                       options={rateCategory}
                       classNamePrefix='select'
                       theme={selectThemeColors}
                       className={classnames('react-select', 
                       { 'is-invalid': data !== null && data.marketCode1 === null })}
                       {...field}
                       onChange={handleChange1} 
                     />
                   )}
                 />
               </div>
              </Col> 
             
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='source1'>
                      Source 
                    </Label>
                    <Controller
                      id='source1'
                      control={control}
                      name='source1'
                      render={({ field }) => (
                        <Select
                        defaultValue={defaultReason2}
                          isClearable
                          options={sources}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.source1 === null })}
                          {...field}
                          onChange={handleChange2} 
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='beginDate1'>
                      Begin Date
                    </Label>
                    <Controller
                      defaultValue={data1["beginSellDate"]}
                      control={control}
                      id='beginDate1'
                      name='beginDate1'
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          defaultValue={data1["beginSellDate"]}
                          options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                          className={classnames('form-control', {
                            'is-invalid': data !== null && data.beginDate1 === null
                          })}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='sellDate1'>
                      Sell Date
                    </Label>
                    <Controller
                     defaultValue={data1["endSellDate"]}
                      control={control}
                      id='sellDate1'
                      name='sellDate1'
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                          className={classnames('form-control', {
                            'is-invalid': data !== null && data.sellDate1 === null
                          })}
                        />
                      )}
                    />
                  </div>
                </Col>

                
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='package1'>
                      Package
                    </Label>
                    <Controller
                      id='package1'
                      control={control}
                      name='package1'
                      render={({ field }) => (
                        <Select
                        defaultValue={defaultReason4}
                          isClearable
                          options={packages}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.package1 === null })}
                          {...field}
                          onChange={handleChange4} 
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md='3' sm='12'>
                  <div className='mb-1'>
                    <Label className='form-label' for='pkgtransactionCode1'>
                      Pkg Transaction Code
                    </Label>
                    <Controller
                      id='pkgtransactionCode1'
                      control={control}
                      name='pkgtransactionCode1'
                      render={({ field }) => (
                        <Select
                        defaultValue={defaultReason3}
                          isClearable
                          options={transactionCode}
                          classNamePrefix='select'
                          theme={selectThemeColors}
                          className={classnames('react-select', { 'is-invalid': data !== null && data.pkgtransactionCode1 === null })}
                          {...field}
                          onChange={handleChange3} 

                        />
                      )}
                    />
                  </div>
                </Col>       

              </Row>
            </div>

                          <br/>
           <div align='end' className='buttons'>
           <Button className="me-1" color="primary" type='submit' onClick={()=> setAccountMap(!extras)}>
           Update Account Mapping
           </Button>
           <Button className="me-1" color="primary" type='submit' onClick={()=> setExtras(!extras)}>
           Update RateCode Extars
           </Button>
            <Button className="me-1" color="primary" type='submit' onClick={()=>setflag(true)}>
           Update And Exit
           </Button>
                    </div>           

          </Form>
    </div>
  )
}

export default rateCode;