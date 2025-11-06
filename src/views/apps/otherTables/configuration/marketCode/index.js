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
   { value: '1', label: 'Active' },
  { value: '0', label: 'InActive' },
  // { value: 'red', label: 'Red' },
  // { value: 'orange', label: 'Orange' }
]

const defaultValues = {
  // hotelID: '',
  marketCode: '',
  description: '',
  activeStatus: null,
  marketGroupID:''
}

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if ( data.marketCode.length && data.marketGroupID.length) {
      console.log(data)
      let createmarketCode = JSON.stringify({
        // "hotelID": data.hotelID,
        "marketCode": data.marketCode,
        "description": data.description,
        "isActive": data.activeStatus.value,
        "marketGroupID": data.marketGroupID
      })
      console.log(data.marketCode)
      console.log(createmarketCode)
      let res = fetchx(API_URL + "/marketCode", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketCode
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
              {/* <li>
                <strong>Hotel ID</strong>: {data.hotelID}
              </li> */}
              <li>
                <strong>market Code</strong>: {data.marketCode}
              </li>
              <li>
                <strong>Description</strong>: {data.description}
              </li>
              <li>
                <strong>Active Status</strong>: {data.activeStatus.value}
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      // hotelID: '',
      marketCode: '',
      description: '',
      activeStatus: '',
      marketGroupID:''
    })
  }

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>market Code</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='hotelID'>
                  Hotel ID
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.hotelID === null || !data.hotelID.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='hotelID'
                    name='hotelID'
                    control={control}
                    placeholder='hotelID'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.hotelID === null || !data.hotelID.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col> */}
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='marketCode'>
                  market Code
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.marketCode === null || !data.marketCode.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='marketCode'
                    name='marketCode'
                    control={control}
                    placeholder='marketCode'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.marketCode === null || !data.marketCode.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='description'>
                  Description
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.description === null || !data.description.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='description'
                    name='description'
                    control={control}
                    placeholder='description'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.description === null || !data.description.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='activeStatus'>
                  Active Status
                </Label>
                <Controller
                  id='activeStatus'
                  control={control}
                  name='activeStatus'
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
            <Col  md='6' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='marketGroupID'>
            Market Group ID
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.marketGroupID === null || !data.marketGroupID.length)
                })}
              >                
              </InputGroupText>
              <Controller
                id='marketGroupID'
                name='marketGroupID'
                control={control}
                placeholder='marketGroupID'
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.marketGroupID === null || !data.marketGroupID.length)
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
