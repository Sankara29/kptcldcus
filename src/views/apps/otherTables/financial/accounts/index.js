

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

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
// AG Grid
import { AgGridReact } from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
// const id = '1';

// // import App from './datagrid'

const defaultValues = {

  accountsName: '',
  accountTypes: '',
  emailBasic: '',
  phoneNumber: '',
  addressOne: '',
  addressTwo: '',
  country: '',
  state: '',
  city: '',
  postalcode: '',
  gst: '',
  iataNumber: '',
  salutation: '',

  anniversary: '',
  createdAt: '',
  dob: '',

  emailBasic: '',
  notes: '',
  rateCode: '',
  lastVisit: '',
  isActive: null,
  isBacklisted: null,
  companyID: null,
  lastRateID: null,
  lastRoomID: null,
  negotiatedRateID: null,
  accontManagerID: null,
}


let rateCodes = [
  fetchx('http://localhost:14700/getAccountsRateCode?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      rateCodes = resp['data']
      console.log(rateCodes)
    })
]

let accountManager = [
  fetchx('http://localhost:14700/getGuestProfileaccontManagerID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      accountManager = resp['data']
      console.log(accountManager)
    })
]

let associates = [
  fetchx('http://localhost:14700/getAccountsAssociate?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      associates = resp['assosiate']
      console.log(associates)
    })
]

const btcApproved = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];

// const accountType = [
//   { value: "FIT", label: "FIT" },
//   { value: "Corporate", label: "Corporate" },
// ];

const countryOptions = [

  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Anguilla', label: 'Anguilla' },
  { value: 'Antarctica', label: 'Antarctica' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'India', label: 'India' },
  { value: 'Others', label: 'Others' },

]

const accountType = [
  { value: "agent", label: "Agent" },
  { value: "company", label: "Company" },
];

const stateOptions = [
  { value: 'Daman', label: 'Daman' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'HimachalPradesh', label: 'Himachal Pradesh' },
  { value: 'Jammu Kashmir', label: 'Jammu Kashmir' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Ladakh', label: 'Ladakh' },
  { value: 'Lakshadweep', label: 'Lakshadweep' },
  { value: 'MadhyaPradesh', label: 'Madhya Pradesh' },
  { value: 'Maharastra', label: 'Maharastra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Puducherry', label: 'Puducherry' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'TamilNaidu', label: 'TamilNaidu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Uttarpradesh', label: 'Uttarpradesh' },
]





const Floor = () => {

  const [selectedValue, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.value);

    console.log(event.value); // print the selected value to console
    if (selectedValue == 'agent') {
      console.log("hi")
      //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else if (selectedValue == 'company') {
      console.log("hi")
      //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else {

      //         setitemOptions({ value: "0", label: "InActive" })
    }
  };

  // Ag Grid
  const [rowData, setRowData] = useState();

  const [centeredModal, setCenteredModal] = useState(false)

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Floor ', field: 'floor', suppressSizeToFit: true },
    { headerName: 'Block ID', field: 'blockID', suppressSizeToFit: true, maxWidth: 160 },
  ]);

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
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetchx(API_URL + '/floor?hotelID=1&floor=1&blockID=1')
      .then(result => result.json())
      .then(rowData => setRowData(rowData['data']))
  }, []);


  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()



  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    console.log(data)
    if (
      data.floor !== null &&
      data.blockID !== null
    ) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        // "hotelID": data.hotelID,
        "firstName": data.accountsName,
        "lastName": data.iataNumber,
        "salutation": data.createdBy,
        "accountTypes": data.accountTypes,
        "addressOne": data.addressOne,
        "addressTwo": data.addressTwo,
        "country": data.country.value,
        "state": data.state.value,
        "city": data.city,
        "postalCode": data.postalcode,
        "Gst": data.gst,
        "anniversary": data.anniversary,
        "createdAt": data.createdAt,
        "dob": data.dob,
        "phoneNumber": data.phoneNumber,
        "email": data.emailBasic,
        "notess": data.notes,
        "rateCode": data.rateCode,
        "lastVisit": data.lastVisit,
        "isActive": data.isActive.value,
        "isBacklisted": data.isBacklisted.value,
        "companyID": data.companyID.value,
        "lastRateID": data.lastRateID.value,
        "lastRoomID": data.lastRoomID.value,
        "negotiatedRateID": data.negotiated.value,
        "accontManagerID": data.accontManagerID.value,
      })
      console.log(createmarketGroup)
      console.log("hi")
      let res = fetchx("http://localhost:14700/guestProfile", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
        console.log(res);
        if (res['status'] == 200) {
          fetchx(API_URL + '/floor?hotelID=1&floor=1&blockID=1')
            .then(result => result.json())
            .then(rowData => {
              setRowData(rowData['data'])
              console.log(rowData['data'])
            })
        }

      });
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Submitted!</h6>
            <h4>Floor Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      accountsName: '',
      iataNumber: '',
      salutation: '',
      accountTypes: '',
      addressOne: '',
      addressTwo: '',
      country: '',
      state: '',
      city: '',
      postalcode: '',
      gst: '',
      anniversary: '',
      createdAt: '',
      dob: '',
      phoneNumber: '',
      emailBasic: '',
      notes: '',
      rateCode: '',
      lastVisit: '',
      isActive: null,
      isBacklisted: null,
      companyID: null,
      lastRateID: null,
      lastRoomID: null,
      negotiated: null,
      accontManagerID: null,
    })
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Accounts</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='accountsName'>
                    Accounts Name
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='accountsName'
                    name='accountsName'
                    render={({ field }) => <Input placeholder='Accounts Name' invalid={errors.accountsName && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="accountTypes">
                    Account Types
                  </Label>
                  <Controller
                    id="accountTypes"
                    control={control}
                    name="accountTypes"
                    render={({ field }) => (
                      <Select
                        theme={selectThemeColors}
                        className='react-select'
                        classNamePrefix='select'
                        // defaultValue={colourOptions[1]}
                        name='accountTypes'
                        options={accountType}
                        isClearable
                        onChange={handleDropdownChange}
                      />
                    )}
                  />
                </div>
              </Col>
              {selectedValue === 'agent' && (
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                    <Label className="form-label" for="comission">
                      Comission
                    </Label>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='comission'
                      name='comission'
                      render={({ field }) => <Input placeholder='comission'
                        pattern='[0-9_]{1,15}'
                        title="comission can contain numbers . It cannnot contain alphabets and special characters." required
                        invalid={errors.comission && true} {...field} />}
                    />
                  </div>
                </Col>
              )}
              <Col md='6' sm='12'>
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
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='phonenumber'>
                    Phone Number
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText
                      className={classnames({
                        'is-invalid': data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
                      })}
                    >
                      IN (+91)
                    </InputGroupText>
                    <Controller
                      id='phone-number'
                      name='phoneNumber'
                      control={control}
                      placeholder='1 234 567 8900'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          className={classnames('form-control', {
                            'is-invalid': data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
                          })}
                          options={{ phone: true, phoneRegionCode: 'IN' }}
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='addressOne'>
                    Address 1
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='addressOne'
                    name='addressOne'
                    render={({ field }) => <Input placeholder='Address 1' invalid={errors.addressOne && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='addressTwo'>
                    Address 2
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='addressTwo'
                    name='addressTwo'
                    render={({ field }) => <Input placeholder='Address 2' invalid={errors.addressTwo && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
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
                        className={classnames('react-select', { 'is-invalid': data !== null && data.country === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
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
                        className={classnames('react-select', { 'is-invalid': data !== null && data.state === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='city'>
                    City
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='city'
                    name='city'
                    render={({ field }) => <Input placeholder='Last Name' invalid={errors.city && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='postalcode'>
                    Postalcode
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='postalcode'
                    name='postalcode'
                    render={({ field }) => <Input placeholder='postalcode' invalid={errors.postalcode && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="isActive">
                    Active Status
                  </Label>
                  <Controller
                    id="isActive"
                    control={control}
                    name="isActive"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={activeoptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.isActive === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='gst'>
                    GST ID
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='gst'
                    name='gst'
                    render={({ field }) => <Input placeholder='gst' invalid={errors.gst && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='iataNumber'>
                    IATA Number
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='iataNumber'
                    name='iataNumber'
                    render={({ field }) => <Input placeholder='Last Name' invalid={errors.iataNumber && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="isBtcApproved">
                    BTC Approved
                  </Label>
                  <Controller
                    id="isBtcApproved"
                    control={control}
                    name="isBtcApproved"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={btcApproved}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.isBtcApproved === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='email'>
                    Secondary Email
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='email'
                    name='email'
                    render={({ field }) => (
                      <Input
                        type='email'
                        placeholder='bruce.wayne@email.com'
                        invalid={errors.email && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='createdBy'>
                    Created By
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='createdBy'
                    name='createdBy'
                    render={({ field }) => <Input placeholder='Last Name' invalid={errors.createdBy && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='createdAt'>
                    Created At
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='createdAt'
                    name='createdAt'
                    render={({ field }) => <Input placeholder='Last Name' invalid={errors.createdAt && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='modifiedBy'>
                    Modified By
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='modifiedBy'
                    name='modifiedBy'
                    render={({ field }) => <Input placeholder='Last Name' invalid={errors.modifiedBy && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='modifiedAt'>
                    Modified At
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='modifiedAt'
                    name='modifiedAt'
                    render={({ field }) => <Input placeholder='Last Name' invalid={errors.modifiedAt && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="rateCode">
                    Rate Code
                  </Label>
                  <Controller
                    id="rateCode"
                    control={control}
                    name="rateCode"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={rateCodes}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.rateCode === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='6' sm='12' className='mb-1'>
                <div className='mb-1'>
                  <Label className='form-label' for='notes'>
                    Notes
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='notes'
                    name='notes'
                    render={({ field }) => <Input placeholder=' notes'
                      pattern='[A-Za-z_]{1,15}'
                      title=" notes can contain alphabets . It cannnot contain numbers and special characters." required
                      invalid={errors.notes && true} {...field} />}
                  />
                </div>
              </Col>
              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="accontManagerID">
                    Account Manager
                  </Label>
                  <Controller
                    id="accontManagerID"
                    control={control}
                    name="accontManagerID"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={accountManager}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.accontManagerID === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='6' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="financialAssociate">
                    Financial Associate
                  </Label>
                  <Controller
                    id="financialAssociate"
                    control={control}
                    name="financialAssociate"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={associates}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.financialAssociate === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>



            </Row>

            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
              <Button outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
            </div>

          </Form>
        </CardBody>
      </Card>
      <div className="ag-theme-alpine" style={{ height: 520 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData} columnDefs={columnDefs}
          animateRows={true} rowSelection='multiple'
          onCellClicked={cellClickedListener}
          // paginationAutoPageSize = 'true'
          paginationPageSize='10'
          pagination='true'
          defaultColDef={defaultColDef}
          headerColor="ddw-primary"

        />
      </div>



    </div>
  )
}

export default Floor;
