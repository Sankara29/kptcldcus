// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Select from 'react-select'
import toast from 'react-hot-toast'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import { Check } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import Moment from 'moment';

// ** Custom Components
import Avatar from '@components/avatar'

import { ArrowLeft, ArrowRight } from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

import ViewModal from "./preference"
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from 'react';
import API_URL from '../../../config'
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const defaultValues = {
  salutation: null,
  name: '',
  lastName:'',
  email: '',
  phoneNumber: '',
  gstID: '',
  nationality: '',
  dob: '',
  vipID: null,
  addressOne: '',
  addressTwo: '',
  anniversary: '',
  companyID: null,
  country: null,
  state: null,
  notes: '',
  city: '',
  postalCode: '',
  guestpreferencenotes: null, 
}

let companyID = [
  fetchx(API_URL +'/getGuestProfileCompanyID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      companyID = resp['data']
    })
]

let lastRate = [
  fetchx(API_URL +'/getGuestProfileLastRateID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      lastRate = resp['data']
    })
]

let lastRoomID = [
  fetchx(API_URL +'/getGuestProfileLastRoomID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      lastRoomID = resp['data']
    })
]

let negotiated = [
  fetchx(API_URL +'/getGuestProfileLastRoomID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      negotiated = resp['data']
    })
]

let vipID = [
  fetchx(API_URL +'/getGuestProfileVipID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // // console.log(resp['data'])
      vipID = resp['data']
      // // console.log(vipID)
    })
]

let countryOptions = [
  fetchx(API_URL+'/getGuestProfileCountry?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      countryOptions = resp['data']
      // // console.log(vipID)
    })
]
const isBlackListed = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const salutations = [
  { value: "Mr", label: "Mr." },
  { value: "Mrs", label: "Mrs." },
  { value: "Ms", label: "Ms." },
  { value: "Dr", label: "Dr." },
  { value: "Mast.", label: "Mast.." },
  { value: "Prof", label: "Prof." },
  { value: "Capt", label: "Capt." },
  { value: "Wg Cdr.", label: "Wg Cdr." },
  { value: "Major.", label: "Major." },
];

// const stateOptions = [
//   { value: 'Daman', label: 'Daman' },
//   { value: 'Delhi', label: 'Delhi' },
//   { value: 'Goa', label: 'Goa' },
//   { value: 'Gujarat', label: 'Gujarat' },
//   { value: 'Haryana', label: 'Haryana' },
//   { value: 'HimachalPradesh', label: 'Himachal Pradesh' },
//   { value: 'Jammu Kashmir', label: 'Jammu Kashmir' },
//   { value: 'Jharkhand', label: 'Jharkhand' },
//   { value: 'Karnataka', label: 'Karnataka' },
//   { value: 'Kerala', label: 'Kerala' },
//   { value: 'Ladakh', label: 'Ladakh' },
//   { value: 'Lakshadweep', label: 'Lakshadweep' },
//   { value: 'MadhyaPradesh', label: 'Madhya Pradesh' },
//   { value: 'Maharastra', label: 'Maharastra' },
//   { value: 'Manipur', label: 'Manipur' },
//   { value: 'Meghalaya', label: 'Meghalaya' },
//   { value: 'Mizoram', label: 'Mizoram' },
//   { value: 'Nagaland', label: 'Nagaland' },
//   { value: 'Odisha', label: 'Odisha' },
//   { value: 'Puducherry', label: 'Puducherry' },
//   { value: 'Punjab', label: 'Punjab' },
//   { value: 'Rajasthan', label: 'Rajasthan' },
//   { value: 'Sikkim', label: 'Sikkim' },
//   { value: 'TamilNaidu', label: 'TamilNaidu' },
//   { value: 'Telangana', label: 'Telangana' },
//   { value: 'Uttarpradesh', label: 'Uttarpradesh' },
// ]
localStorage.removeItem('guestID')


const Floor = ({stepper, type ,data1}) => {
  // // console.log(ata1)

  // Ag Grid
  const [rowData, setRowData] = useState();
  const [centeredModal, setCenteredModal] = useState(false)
  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ));

  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control ,watch} = useForm({ defaultValues })
  let navigate = useNavigate();  


  const beginDate = watch('beginDate');
  // console.log(beginDate)
 const today = Moment().format('YYYY-MM-DD');
 const options = {
   maxDate: today
 };
 const twelveYearsAgo = Moment().subtract(12, 'years').format('YYYY-MM-DD'); // Calculate 12 years ago

 const doboptions = {
   maxDate: twelveYearsAgo
 };

 const [flag,setflag] = useState(false)

  const onSubmit = (data) => {
     // console.log("flag",flag)
    // setData(data)
    // // console.log(ata)
    if (
      data.firstName !== null &&
      data.name !== null
    ) {
      // // console.log(ata.dob)
      let createmarketGroup = JSON.stringify({
        "salutation":data.salutation.label,
        "firstName": data.name,
        "lastName": data.lastName,
        "email": data.emailBasic,
        "phoneNumber": data.phoneNumber,
        "gstID": data.gst,
        "nationality":data.nationality === null ? null : data.nationality.value, 
        "dob": (data.dob === '' ? null : Moment(String(new Date(data.dob[0]))).format('YYYY-MM-DD')),
        "vipID": data.vipID === null ? null : data.vipID.value,
        "addressOne": data.addressOne,
        "addressTwo": data.addressTwo,
        "anniversary": (data.anniversary === '' ? null : Moment(String(new Date(data.anniversary[0]))).format('YYYY-MM-DD')),
        "companyID": data.companyID === null ? null : data.companyID.value,
        "country":data.country === null ? null : data.country.value,
        "state": data.state,
        "notes": data.notes,
        "city": data.city,
        "postalCode": data.postalCode,
        "guestpreferencenotes":data.guestpreferencenotes,        
      })
      // console.log(createmarketGroup)
      // console.log("hi")    
      let res = fetchx(API_URL + "/guestProfile", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then(result => result.json())
      .then(resp => {
        localStorage.setItem('guestID',resp['data'])
        // console.log(resp)
        // stepper.next()
        // setTimeout(() => { navigate('') }, 100);
        if (resp.statusCode == 200) {
          fetchx(API_URL + `/getGuestProfileNew?hotelID=1`)
              .then(result => result.json())
              .then(rowData => {
                  setRowData(rowData['data'])
                  // console.log(rowData['data'])
              })    

 // console.log(flag==true)
 // console.log(flag)
 // console.log(flag==false)
if(flag==true){
  const swalInstance = MySwal.fire({
    text: 'Guest Details Added Successfully!',
    icon: 'success',
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
//  navigate('');
 // console.log('Save and exit after form submit')

}
else if(flag==false){
  const swalInstance = MySwal.fire({
    text: 'Guest Details Added Successfully!Please  add ID Details',
    icon: 'success',
    buttonsStyling: false,
    confirmButtonText: 'Close',
    allowOutsideClick: false, 
    customClass: {
      confirmButton: 'btn btn-danger'
    }
  });
  swalInstance.then((result) => {
    if (result.isConfirmed) {
      stepper.next(); 
    }
  }); 
//  stepper.next(); 
 // console.log('Save and next after form submit')
}

      }
      }).catch((error) => {
        // console.log(error)
      })         
    }
  }

  const handleReset = () => {
    reset({
      salutation: null,
      firstName: '',
      lastName:'',
      email: '',
      phoneNumber: '',
      gstID: '',
      nationality: '',
      dob: '',
      vipID: null,
      addressOne: '',
      addressTwo: '',
      anniversary: '',
      companyID: null,
      country: null,
      state: '',
      notes: '',
      city: '',
      postalCode: '',
      guestpreferencenotes: null,  
     })
  }

  window.onload = function() {  
    localStorage.clear();
  };

  return (
    <div>         
          <Form onSubmit={handleSubmit(onSubmit)}>          
            <Row>
              <Col md='3' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="salutation">
                    Salutation <spam style={{color:'red'}}>*</spam>
                  </Label>
                  <Controller
                    id="salutation"
                    control={control}
                    name="salutation"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={salutations}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.salutation === null,
                        })}
                        {...field}
                        // value={data1['salutation']}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='name'>
                    First Name <spam style={{color:'red'}}>*</spam>
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='name'
                    name='name'
                    render={({ field }) => <Input 
                   required
                  //  pattern='[A-Za-z]{1,15}'
                  //   title="Name should  contain alphabets. Cannot contain numbers and special characters." 
                    placeholder='Name' invalid={errors.name && true} {...field}
                    // value={data1['name']} 
                    />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='lastName'>
                    Last Name <spam style={{color:'red'}}>*</spam>
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='lastName'
                    name='lastName'
                    render={({ field }) => <Input required
                    // pattern='[A-Za-z]{1,15}'
                    // title="Name should  contain alphabets. Cannot contain numbers and special characters."  
                    placeholder='lastName' 
                    invalid={errors.lastName && true}
                     {...field}
                    />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='emailBasic'>
                    Email
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='emailBasic'
                    name='emailBasic'
                    render={({ field }) => (
                      <Input
                        type='email'
                        placeholder='bruce.wayne@email.com'
                        invalid={errors.emailBasic && true}
                        {...field}
                        // value={data1['email']}
                      />
                    )}
                  />
                </div>
              </Col>
              {/* <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='phoneNumber'>
                    Phone Number
                  </Label>
                  <InputGroup className='input-group-merge'>
                    
                    <Controller
                      id='phoneNumber'
                      name='phoneNumber'
                      control={control}
                      placeholder='1 234 567 8900'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          className={classnames('form-control', {
                            // 'is-invalid': data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
                          })}
                          options={{ phone: true, phoneRegionCode: 'IN' }}
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col> */}
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='phoneNumber'>
                  Phone Number 
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='phoneNumber'
                    name='phoneNumber'
                    render={({ field }) => <Input   
                    pattern="^(?:\+[0-9]{10,13}|[0-9]{10,13})$" 
                    title="Phone number Can take Max 12 digits with Country Code, 10 digits without Country Code"                 
                    placeholder=' Phone Number ' invalid={errors.name && true} {...field}                   
                    />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className="mb-1">
                  <Label className="form-label" for="vipID">
                    VIP Status
                  </Label>
                  <Controller
                    id="vipID"
                    control={control}
                    name="vipID"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={vipID}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        // className={classnames("react-select", {
                        //   "is-invalid": data !== null && data.vipID === null,
                        // })}
                        {...field}
                        // value={data1['vipID']}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='dob'>
                     Date Of Birth
                  </Label>
                  <Controller
                    control={control}
                    id='dob'
                    name='dob'
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        // value={data1['dob']}
                        options={doboptions}
                        placeholder='YYYY-MM-DD '
                        className={classnames('form-control', {
                          // 'is-invalid': data !== null && data.dob === null
                        })}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='anniversary'>
                    Anniversary
                  </Label>
                  <Controller
                    control={control}
                    id='anniversary'
                    name='anniversary'
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        // value={data1['anniversary']}
                        options={options} 
                        placeholder='YYYY-MM-DD '
                        className={classnames('form-control', {
                          'is-invalid': data !== null && data.anniversary === null
                        })}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='addressOne'>
                    Address Line One
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='addressOne'
                    name='addressOne'
                    render={({ field }) => <Input 
                    placeholder='Address 1' invalid={errors.addressOne && true} 
                    {...field}
                     />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='addressTwo'>
                  Address Line Two
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='addressTwo'
                    name='addressTwo'
                    render={({ field }) => <Input placeholder='Address 2' invalid={errors.addressTwo && true} 
                    {...field} 
                    // value={data1['addressTwo']}
                    />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                    <div className='mb-1'>
                      <Label className='form-label' for='city'>
                        City
                      </Label>
                      <Controller
                        defaultValue=''
                        control={control}
                        id='city'
                        name='city'
                        render={({ field }) => <Input placeholder='City' invalid={errors.city && true} {...field} 
                        // value={data1['city']}
                        />}
                      />
                    </div>
                  </Col>
                  <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='state'>
                    State
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='state'
                    name='state'
                    render={({ field }) => <Input 
                  //  required
                  //  pattern='[Aa-Zz ]{1,15}'
                  //   title="state should  contain alphabets. Cannot contain numbers and special characters." 
                    placeholder='state' invalid={errors.state && true} {...field}
                    // value={data1['state']} 
                    />}
                  />
                </div>
              </Col>
                  
              {/* <Col md='3' sm='12'>
                    <div className='mb-1'>
                      <Label className='form-label' for='state'>
                        State
                      </Label>
                      <Controller
                        id='state'
                        control={control}
                        name='state'
                        render={({ field }) => (
                          <Select
                            isClearable
                            options={stateOptions}
                            classNamePrefix='select'
                            theme={selectThemeColors}
                            // className={classnames('react-select', { 'is-invalid': data !== null && data.state === null })}
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </Col> */}
              <Col>
                <Row md='4' sm='12'>
                  <Col md='3' sm='12'>
                    <div className='mb-1'>
                      <Label className='form-label' for='country'>
                        Country
                      </Label>
                      <Controller
                        id='country'
                        control={control}
                        name='country'
                        render={({ field }) => (
                          <Select
                            isClearable
                            options={countryOptions}
                            classNamePrefix='select'
                            theme={selectThemeColors}
                            // className={classnames('react-select', { 'is-invalid': data !== null && data.country === null })}
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </Col>
                  <Col md='3' sm='12'>
                    <div className='mb-1'>
                      <Label className='form-label' for='postalCode'>
                        PostalCode
                      </Label>
                      <Controller
                        defaultValue=''
                        control={control}
                        id='postalCode'
                        name='postalCode'
                        render={({ field }) => <Input 
                        pattern="[a-zA-Z0-9\-]+"
                        title="Postal Code can contain numbers, alphabets and hyphens only"
                        // pattern="[1-9][0-9]{5}" 
                        // title="Postal Code can contain numbers and can take 6 digits"    
                        placeholder='postalCode' invalid={errors.postalCode && true} 
                        {...field} 
                        // value={data1['postalCode']}
                        />}
                      />
                    </div>
                  </Col>
                 
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='gst'>
                    GST Number
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='gst'
                    name='gst'
                    render={({ field }) => <Input 
                    pattern='[A-Z0-9]{1,15}'
                    title="GST Number can contain numbers and Capital alphabets. It cannnot contain special characters."                         
                    placeholder='GST Number' 
                    invalid={errors.gst && true} {...field}
                    // value={data1['gstID']}
                     />}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='nationality'>
                    Nationality
                  </Label>
                  <Controller
                    id='nationality'
                    control={control}
                    name='nationality'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={countryOptions}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        // className={classnames('react-select', { 'is-invalid': data !== null && data.nationality === null })}
                        {...field}
                        // value={data1['nationality']}
                      />
                    )}
                  />
                </div>
              </Col>                
              <Col md='3' sm='12'>
                <div className="mb-1">
                  <Label className="form-label" for="companyID">
                    Company Name
                  </Label>
                  <Controller
                    id="companyID"
                    control={control}
                    name="companyID"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={companyID}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        // className={classnames("react-select", {
                        //   "is-invalid": data !== null && data.companyID === null,
                        // })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              
                  <Col md='4' sm='12' className='mb-1'>
                    <div className='mb-1'>
                      {/* <Label className='form-label' for='notes'>
                          Profile Notes
                        </Label> */}
                      <Controller
                        defaultValue=''
                        control={control}
                        id='notes'
                        name='notes'
                        render={({ field }) =>
                          // <textarea  rows="4" cols="23">
                          // Notes
                          // </textarea>
                          <InputGroup>
                            <InputGroupText>Profile Notes</InputGroupText>
                            <Input placeholder=' notes'
                              type='textarea'
                              pattern='[A-Za-z_]{1,15}'
                              title=" notes can contain alphabets . It cannnot contain numbers and special characters." 
                              invalid={errors.notes && true} {...field}
                              // value={data1['notes']}
                            />
                          </InputGroup>
                        }
                      />
                    </div>
                  </Col>

                
                  <Col md='5' sm='12' className='mb-1'>
                    <div className='mb-1'>
                     
                      <Controller
                        defaultValue=''
                        control={control}
                        id='guestpreferencenotes'
                        name='guestpreferencenotes'
                        render={({ field }) =>
                          <InputGroup>
                            <InputGroupText>Guest Preference Notes</InputGroupText>
                            <Input placeholder=' guestpreferencenotes'
                              type='textarea'
                              // pattern='[A-Za-z_]{1,15}'
                              // title=" guestpreferencenotes can contain alphabets . It cannnot contain numbers and special characters." required
                              invalid={errors.guestpreferencenotes && true} {...field} 
                              // value={data1['guestpreferencenotes']}
                              />
                          </InputGroup>

                        }
                      />

                    </div>
                  </Col>
                </Row>
              </Col>

            </Row>
            <div className='vertically-centered-modal'>
           
              <Modal isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className='modal-xl'>
                <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Vertically Centered</ModalHeader>
                <ModalBody>
                  <ViewModal />
                </ModalBody>
                <ModalFooter>
                  <Button color='primary' onClick={() => setCenteredModal(!centeredModal)}>
                    Accept
                  </Button>{' '}
                </ModalFooter>
              </Modal>
            </div>
       <div className='d-flex justify-content-between'>
          <div className='d-flex'>
          <Button className='me-1' color='primary' type='submit' onClick={()=>setflag(false)}>
          Save And Next
          </Button>
          <Button className="me-1" color="primary" type='submit' onClick={()=>setflag(true)}>
          Create Guest
          </Button>
          <Button outline color='secondary' type='reset' onClick={handleReset}>
          Reset
          </Button>
          </div> 
      </div>
          </Form>
    </div>
  )
}

export default Floor;