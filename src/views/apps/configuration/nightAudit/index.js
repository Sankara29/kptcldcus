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
// API_URL
import API_URL from '../../../../config'


const colourOptions = [
  { value: 'NotCompleted', label: 'Not Completed' },
  { value: 'Completed', label: 'Completed' },
  // { value: 'inactive', label: 'In Active' },
  // { value: 'red', label: 'Red' },
  // { value: 'orange', label: 'Orange' }
]

const defaultValues = {
  hotelID: '',
  businessDate:'',
  notes: '',
  createdBy : ''
  
}

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data.hotelID.length && data.businessDate.length && data.notes.length && data.notes.length  && data.createdBy .length) {
      console.log(data)
      let createnotes = JSON.stringify({
        "hotelID": data.hotelID,
        "notes": data.notes,
        "createdBy ": data.createdBy ,
      
      })
      console.log(createnotes)
      let res = fetchx(API_URL + "/notes", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createnotes
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
                <strong>Hotel ID</strong>: {data.hotelID}
              </li>
              <li>
                <strong>Notes</strong>: {data.notes}
              </li>
              <li>
                <strong>Created By </strong>: {data.createdBy }
              </li>
              
            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      hotelID: '',
      notes: '',
      createdBy : ''
      
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Night Audit</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='6' sm='12'>
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
            </Col>

            <Col  md='6' sm='12'>
            <div className='mb-1'>
            <Label className='form-label' for='businessDate'>
             Business Date
            </Label>
            <Controller
              control={control}
              id='businessDate'
              name='reactFlatpickr'
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
                <Label className='form-label' for='notes'>
                  Notes
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.notes === null || !data.notes.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='notes'
                    name='notes'
                    control={control}
                    placeholder='notes'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.notes === null || !data.notes.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>

            <Col  md='6' sm='12'>
            <div className='mb-1'>
            <Label className='form-label' for='createdAt  '>
            Created At
            </Label>
            <Controller
              control={control}
              id='createdAt  '
              name='reactFlatpickr'
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
                <Label className='form-label' for='createdBy '>
                  Created By 
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.createdBy  === null || !data.createdBy .length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='createdBy '
                    name='createdBy '
                    control={control}
                    placeholder='createdBy '
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.createdBy  === null || !data.createdBy .length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>

            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='country&StateCheck'>
                   Country And State Check
                </Label>
                <Controller
                  id='country&StateCheck'
                  control={control}
                  name='country&StateCheck'
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
  )
}

export default ValidationThirdPartyComponents
