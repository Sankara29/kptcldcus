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

import App from "./datagrid"
// const colourOptions = [
//   { value: 'status', label: '---Select Status---' },
//   { value: 'active', label: 'Active' },
//   { value: 'inactive', label: 'In Active' },
//   // { value: 'red', label: 'Red' },
//   // { value: 'orange', label: 'Orange' }
// ]

const defaultValues = {
 
  reservation: '',
  visaNumber: '',
  guestProfileID: '',
  issueDate: '',
  expiryDate: ''

}

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if ( data.reservation!== null && data.visaNumber!== null && data.guestProfileID!== null&& data.issueDate !== null & data.expiryDate !== null) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        
        "reservation"   : data.reservation,
          "visaNumber" : data.visaNumber,
          "guestProfileID":data.guestProfileID,
          "issueDate" : data.issueDate.value,
          "ExpiryDate" : data.expiryDate.value
      })
      console.log(createmarketGroup)
      let res = fetchx(API_URL + "/visaDetails", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
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
                <strong>Reservation</strong>: {data.reservation}
              </li>
              

            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
     
      reservation: '',
      visaNumber: '',
      guestProfileID: '',
      issueDate: '',
      expiryDate: ''
    })
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Visa Details</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
             
              <Col>
                <div className='mb-1'>
                  <Label className='form-label' for='reservation'>
                    Reservation
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText
                      className={classnames({
                        'is-invalid': data !== null && (data.reservation === null || !data.reservation.length)
                      })}
                    >
                    </InputGroupText>
                    <Controller
                      id='reservation'
                      name='reservation'
                      control={control}
                      placeholder='reservation'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          className={classnames('form-control', {
                            'is-invalid': data !== null && (data.reservation === null || !data.reservation.length)
                          })}
                        // options={{ phone: true, phoneRegionCode: 'US' }}y
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>

              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='visaNumber'>
                    Visa Number
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText
                      className={classnames({
                        'is-invalid': data !== null && (data.visaNumber === null || !data.visaNumber.length)
                      })}
                    >
                    </InputGroupText>
                    <Controller
                      id='visaNumber'
                      name='visaNumber'
                      control={control}
                      placeholder='visaNumber'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          className={classnames('form-control', {
                            'is-invalid': data !== null && (data.visaNumber === null || !data.visaNumber.length)
                          })}
                        // options={{ phone: true, phoneRegionCode: 'US' }}y
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>

              <Col md='6' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='guestProfileID'>
                    Guest Profile ID
                  </Label>
                  <InputGroup className='input-group-merge'>
                    <InputGroupText
                      className={classnames({
                        'is-invalid': data !== null && (data.guestProfileID === null || !data.guestProfileID.length)
                      })}
                    >
                    </InputGroupText>
                    <Controller
                      id='guestProfileID'
                      name='guestProfileID'
                      control={control}
                      placeholder='guestProfileID'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          className={classnames('form-control', {
                            'is-invalid': data !== null && (data.guestProfileID === null || !data.guestProfileID.length)
                          })}
                        // options={{ phone: true, phoneRegionCode: 'US' }}y
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>


              <Col md='6' sm='12'>
              <div className='mb-1'>
            <Label className='form-label' for='issueDate'>
              Issue Date
            </Label>
            <Controller
              control={control}
              id='issueDate'
              name='issueDate'
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.reactFlatpickr === null
                  })}
                />
              )}
            />
          </div>        
              </Col>
              
              <Col md='6' sm='12'>
              <div className='mb-1'>
            <Label className='form-label' for='expiryDate'>
            Expiry Date
            </Label>
            <Controller
              control={control}
              id='expiryDate'
              name='expiryDate'
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.reactFlatpickr === null
                  })}
                />
              )}
            />
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
