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
import { Card, Form, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText, Input } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

// import App from './datagrid' 
// import { specialDescription } from '../repeat'
// const colourOptions = [
//   { value: '1', label: 'Active' },
//   { value: '0', label: 'InActive' },
  
// ]

const defaultValues = {
    specialCode: '',
    specialDescription: '',
    
    
}

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data.specialCode.length && data.specialDescription.length) {
        console.log(data)
        let createasset = JSON.stringify({
          "specialCode"   : data.specialCode,
          "specialDescription" : data.specialDescription,
          
        })
        console.log(createasset)
        let res = fetchx(API_URL + "/specials", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: createasset
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
                <strong>Special Code</strong>: {data.specialCode}
              </li>
                            
            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
        specialCode: '',
        specialDescription: ''
        
        
    })
  }

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Specials</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>

        <div className='mb-1'>
            <Label className='form-label' for='specialCode'>
              Special Code
            </Label>
            <InputGroup className='input-group-merge'>
              
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.specialCode === null || !data.specialCode.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='specialCode'
                name='specialCode'
                control={control}
                placeholder='specialCode'
                render={({ field }) => (
                  <Cleave
                  pattern="[A-Z]).{8,}" title="This must Contain Number" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.specialCode === null || !data.specialCode.length)
                    })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                  />
                )}
              />
            </InputGroup>
          </div>
          
          <div className='mb-1'>
            <Label className='form-label' for='specialDescription'>
            specialDescription
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.specialDescription === null || !data.specialDescription.length)
                })}
              >               
              </InputGroupText>
              <Controller
                id='specialDescription'
                name='specialDescription'
                control={control}
                placeholder='specialDescription'
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.specialDescription === null || !data.specialDescription.length)
                    })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                  />
                )}
              />
            </InputGroup>
          </div>

          

            
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
<App/>
    </div>
  )
}

export default ValidationThirdPartyComponents