
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
const colourOptions = [
    { value: '1', label: 'Active' },
  { value: '0', label: 'In Active' },

]

const defaultValues = {
  // hotelID: '',
  marketGroup: '',
  description: '',
  activeStatus: null
}

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data.marketGroup.length && data.description.length) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        "marketGroup": data.marketGroup,
        "description": data.description,
        "isActive": data.activeStatus.value
      })
      console.log(createmarketGroup)
      let res = fetchx(API_URL + "/marketGroup", {
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
                <strong>Market Group</strong>: {data.marketGroup}
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
      marketGroup: '',
      description: '',
      activeStatus: ''
    })
  }

  return (
    <div>

    
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Market Group</CardTitle>
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
                <Label className='form-label' for='marketGroup'>
                  Market Group
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.marketGroup === null || !data.marketGroup.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='marketGroup'
                    name='marketGroup'
                    control={control}
                    placeholder='marketGroup'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.marketGroup === null || !data.marketGroup.length)
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
