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
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, Input,InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback} from 'react';
let name = 'abc';
import API_URL from '../../../../config'

const colourOptions = [
  { value: 'rupee', label: 'Rupee' },
  { value: 'usd', label: 'USD' },
  // { value: 'red', label: 'Red' },
  // { value: 'orange', label: 'Orange' }
]

const defaultValues = {
  hotelName: '',
  email: '',
  phoneNumber: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  logo: '',
  fax: '',
  currency: null,
  hotelGroups: ''
}

const HotelDetails = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'name',field: 'name',suppressSizeToFit: true,maxWidth: 120},
    {headerName: 'Email ',field: 'email',suppressSizeToFit: true ,maxWidth: 120},
    {headerName: 'Phone Number ',field: 'phoneNumber',suppressSizeToFit: true,maxWidth: 120},
    {headerName: 'Address ',field: 'address',suppressSizeToFit: true ,maxWidth: 120},
    {headerName: 'City ',field: 'city',suppressSizeToFit: true ,maxWidth: 120},
    {headerName: 'State ',field: 'state',suppressSizeToFit: true,maxWidth: 120},
    {headerName: 'postalCode ',field: 'postalCode',suppressSizeToFit: true ,maxWidth: 120},
    {headerName: 'Country ',field: 'country',suppressSizeToFit: true ,maxWidth: 120},
    {headerName: 'Logo ',field: 'logo',suppressSizeToFit: true ,maxWidth: 120},
    {headerName: 'fax ',field: 'Fax',suppressSizeToFit: true ,maxWidth: 120},
    {headerName: 'Currency ',field: 'currency',suppressSizeToFit: true ,maxWidth: 120},
    {headerName: 'hotelGroup ',field: 'hotelGroup',suppressSizeToFit: true ,maxWidth: 120},
    
  ]);

  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      filterParams :{
        buttons : ['apply','reset']
      }
    }
  ));

  const cellClickedListener = useCallback( event => {
    // console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetchx(API_URL +'/getHotelDetails')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);

  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    // console.log(data)
    setData(data)
    if (data.hotelName !== null && data.email !== null && data.phoneNumber!== null && data.address!== null  && data.city!== null  && data.state!== null && data.country!== null  && data.logo!== null  && data.fax!== null  && data.currency!== null  && data.hotelGroups!== null ) {
      // console.log(data)
      let createemail = JSON.stringify({
        "name": data.hotelName,
        "email": data.email,
        "phoneNumber":data.phoneNumber,
        "address": data.address,
        "city":data.city,
        "state": data.state,
        "postalCode": data.postalCode,
        "country": data.country,
        "logo": data.logo,
        "fax": data.fax,
        "currency": data.currency.value,
        "hotelGroup": data.hotelGroups
       
      })
      // console.log(createemail)
      let res = fetchx(API_URL +'/HotelDetails', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createemail
      }).then((res) => {
        // console.log(res);
        if(res['status']==200){
          fetchx(API_URL +'/HotelDetails?hotelID=1')
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
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
      <h4>Hotel Details Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      hotelName: '',
      email: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      logo: '',
      fax: '',
      currency: '',
      hotelGroups: ''
    })
  }

  return (
    <div>
    {/* <Card>
      <CardHeader>
        <CardTitle tag='h4'>Hotel Details</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='hotelName'>
                  Hotel Name
                </Label>
                <InputGroup className='input-group-merge'>
              
                  <Controller
                    id='hotelName'
                    name='hotelName'
                    control={control}
                    placeholder='hotelName'
                    render={({ field }) => (
                      <Input
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.hotelName === null || !data.hotelName.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='email'>
                  Email
                </Label>
                <InputGroup className='input-group-merge'>
                 
                  <Controller
                    id='email'
                    name='email'
                    control={control}
                    placeholder='email'
                    render={({ field }) => (
                      <Input
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.email === null || !data.email.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='phone-number'>
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
                    placeholder='91 234 567 8900'
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
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='address'>
                  Address
                </Label>
                <InputGroup className='input-group-merge'>
           
                  <Controller
                    id='address'
                    name='address'
                    control={control}
                    placeholder='address'
                    render={({ field }) => (
                      <Input
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.address === null || !data.address.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='city'>
                  City
                </Label>
                <InputGroup className='input-group-merge'>
                
                  <Controller
                    id='city'
                    name='city'
                    control={control}
                    placeholder='city'
                    render={({ field }) => (
                      <Input
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.city === null || !data.city.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='state'>
                  State
                </Label>
                <InputGroup className='input-group-merge'>
                  
                  <Controller
                    id='state'
                    name='state'
                    control={control}
                    placeholder='state'
                    render={({ field }) => (
                      <Input
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.state === null || !data.state.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='postalCode'>
                  Postal Code
                </Label>
                <InputGroup className='input-group-merge'>
              
                  <Controller
                    id='postalCode'
                    name='postalCode'
                    control={control}
                    placeholder='postalCode'
                    render={({ field }) => (
                      <Input
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.postalCode === null || !data.postalCode.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <InputGroup className='input-group-merge'>
                 
                  <Controller
                    id='country'
                    name='country'
                    control={control}
                    placeholder='country'
                    render={({ field }) => (
                      <Input
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.country === null || !data.country.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='logo'>
                  Logo
                </Label>
                <InputGroup className='input-group-merge'>
                 
                  <Controller
                    id='logo'
                    name='logo'
                    control={control}
                    placeholder='logo'
                    render={({ field }) => (
                      <Input
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.logo === null || !data.logo.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='fax'>
                  FAX
                </Label>
                <InputGroup className='input-group-merge'>
                  
                  <Controller
                    id='fax'
                    name='fax'
                    control={control}
                    placeholder='fax'
                    render={({ field }) => (
                      <Input
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.fax === null || !data.fax.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='currency'>
                  Currency
                </Label>
                <Controller
                  id='currency'
                  control={control}
                  name='currency'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={colourOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.ReactSelect === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='hotelGroups'>
                  Hotel Groups
                </Label>
                <InputGroup className='input-group-merge'>
         
                  <Controller
                    id='hotelGroups'
                    name='hotelGroups'
                    control={control}
                    placeholder='hotelGroups'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.hotelGroups === null || !data.hotelGroups.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>

            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
              <Button outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Row>
        </Form>
      </CardBody>
    </Card> */}
    <div className="ag-theme-alpine" style={{ height: 220}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            // paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
{/* <App/> */}
    </div>
  )
}

export default HotelDetails;
