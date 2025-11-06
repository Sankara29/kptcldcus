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
 
  block: ''

}

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if ( data.block.length) {
      console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        "block": data.block,
      })
      console.log(createmarketGroup)
      let res = fetchx(API_URL + "/block", {
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
                <strong>Block</strong>: {data.block}
              </li>

            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
    
      block: ''
    })
  }

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Block</CardTitle>
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
                <Label className='form-label' for='block'>
                  Block
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.block === null || !data.block.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='block'
                    name='block'
                    control={control}
                    placeholder='block'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.block === null || !data.block.length)
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
