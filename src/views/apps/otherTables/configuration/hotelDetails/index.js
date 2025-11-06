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
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

// import App from './datagrid'
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

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    console.log(data)
    setData(data)
    if (data.hotelName !== null && data.email !== null && data.phoneNumber!== null && data.address!== null  && data.city!== null  && data.state!== null && data.country!== null  && data.logo!== null  && data.fax!== null  && data.currency!== null  && data.hotelGroups!== null ) {
      console.log(data)
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
      console.log(createemail)
      let res = fetchx(API_URL + "/hotelDetails", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createemail
      }).then((res) => {
        console.log(res)
      });
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Submitted!</h6>
            <ul className='list-unstyled mb-0'>
              <li>
                <strong>Hotel Name</strong>: {data.hotelName}
              </li>
              <li>
                <strong>Email</strong>: {data.email}
              </li>
              <li>
                <strong>Address</strong>: {data.address}
              </li>
              <li>
                <strong>Currency</strong>: {data.currency.value}
              </li>
            </ul>
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
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Hotel Details</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='hotelName'>
                  Hotel Name
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.hotelName === null || !data.hotelName.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='hotelName'
                    name='hotelName'
                    control={control}
                    placeholder='hotelName'
                    render={({ field }) => (
                      <Cleave
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
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='email'>
                  Email
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.email === null || !data.email.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='email'
                    name='email'
                    control={control}
                    placeholder='email'
                    render={({ field }) => (
                      <Cleave
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
            <Col>
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
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='address'>
                  Address
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.address === null || !data.address.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='address'
                    name='address'
                    control={control}
                    placeholder='address'
                    render={({ field }) => (
                      <Cleave
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
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='city'>
                  City
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.city === null || !data.city.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='city'
                    name='city'
                    control={control}
                    placeholder='city'
                    render={({ field }) => (
                      <Cleave
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
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='state'>
                  State
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.state === null || !data.state.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='state'
                    name='state'
                    control={control}
                    placeholder='state'
                    render={({ field }) => (
                      <Cleave
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
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='postalCode'>
                  Postal Code
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.postalCode === null || !data.postalCode.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='postalCode'
                    name='postalCode'
                    control={control}
                    placeholder='postalCode'
                    render={({ field }) => (
                      <Cleave
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
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='country'>
                  Country
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.country === null || !data.country.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='country'
                    name='country'
                    control={control}
                    placeholder='country'
                    render={({ field }) => (
                      <Cleave
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
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='logo'>
                  Logo
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.logo === null || !data.logo.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='logo'
                    name='logo'
                    control={control}
                    placeholder='logo'
                    render={({ field }) => (
                      <Cleave
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
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='fax'>
                  FAX
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.fax === null || !data.fax.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='fax'
                    name='fax'
                    control={control}
                    placeholder='fax'
                    render={({ field }) => (
                      <Cleave
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
            <Col md='6' sm='12'>
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
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='hotelGroups'>
                  Hotel Groups
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.hotelGroups === null || !data.hotelGroups.length)
                    })}
                  >
                  </InputGroupText>
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
    </Card>
<App/>
    </div>
  )
}

export default ValidationThirdPartyComponents
