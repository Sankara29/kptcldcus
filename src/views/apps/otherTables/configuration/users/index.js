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
import { Card, Form, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'


const colourOptions = [
  { value: '1', label: 'Active' },
  { value: '0', label: 'InActive' },

]

const isstaff = [
  { value: '1', label: 'Yes' },
  { value: '0', label: 'No' },

]

const issuperUser = [
  { value: '1', label: 'Yes' },
  { value: '0', label: 'No' },

]

const departmentNames = [
  { value: 'Reservation', label: 'Reservation' },
  { value: 'Front', label: 'Front Office' },
  { value: 'Housekeeping', label: 'Housekeeping' },
  { value: 'Accounts', label: 'Accounts' },
  { value: 'Developments', label: 'Developments' },
  { value: 'Others', label: 'Others' },

]

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  department: null,
  accountManager: null,
  activeStatus: null,
  staff: null,
  superUser: null
}

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data.firstName !== null && data.lastName !== null && data.email !== null && data.password !== null && data.lastName !== null) {
      console.log(data)
      let createasset = JSON.stringify({
        "firstName": data.firstName,
        "lastName": data.lastName,
        "Email": data.email,
        "Password": data.password,
        "Department": data.department,
        "Account Manager": data.accountManager,
        "activeStatus": data.activeStatus.value,
        "Staff": data.staff,
        
      })
      console.log(createasset)
      let res = fetchx(API_URL + "/user", {
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
                <strong>First Name</strong>: {data.firstName}
              </li>
              <li>
                <strong>Last Name</strong>: {data.lastName}
              </li>

            </ul>
          </div>
        </div>
      )
    }
  }

  const handleReset = () => {
    reset({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      department: '',
      accountManager: null,
      activeStatus: null,
      staff: null,
      superUser: null
    })
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>User </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <div className='mb-1'>
              <Label className='form-label' for='firstName'>
                First Name
              </Label>
              <InputGroup className='input-group-merge'>
                <InputGroupText
                  className={classnames({
                    'is-invalid': data !== null && (data.firstName === null || !data.firstName.length)
                  })}
                >
                </InputGroupText>
                <Controller
                  id='firstName'
                  name='firstName'
                  control={control}
                  placeholder='firstName'
                  render={({ field }) => (
                    <Cleave
                      {...field}
                      className={classnames('form-control', {
                        'is-invalid': data !== null && (data.firstName === null || !data.firstName.length)
                      })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                    />
                  )}
                />
              </InputGroup>
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='lastName'>
                lastName
              </Label>
              <InputGroup className='input-group-merge'>
                <InputGroupText
                  className={classnames({
                    'is-invalid': data !== null && (data.lastName === null || !data.lastName.length)
                  })}
                >
                </InputGroupText>
                <Controller
                  id='lastName'
                  name='lastName'
                  control={control}
                  placeholder='lastName'
                  render={({ field }) => (
                    <Cleave
                      {...field}
                      className={classnames('form-control', {
                        'is-invalid': data !== null && (data.lastName === null || !data.lastName.length)
                      })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                    />
                  )}
                />
              </InputGroup>
            </div>

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
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                    />
                  )}
                />
              </InputGroup>
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='password'>
                Password
              </Label>
              <InputGroup className='input-group-merge'>
                <InputGroupText
                  className={classnames({
                    'is-invalid': data !== null && (data.password === null || !data.password.length)
                  })}
                >
                </InputGroupText>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  placeholder='password'
                  render={({ field }) => (
                    <Cleave
                      {...field}
                      className={classnames('form-control', {
                        'is-invalid': data !== null && (data.password === null || !data.password.length)
                      })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                    />
                  )}
                />
              </InputGroup>
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='department'>
                Department
              </Label>
              <Controller
                id='department'
                control={control}
                name='department'
                render={({ field }) => (
                  <Select
                    isClearable
                    options={departmentNames}
                    classNamePrefix='select'
                    theme={selectThemeColors}
                    className={classnames('react-select', { 'is-invalid': data !== null && data.department === null })}
                    {...field}
                  />
                )}
              />
            </div>

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
                                    className={classnames('react-select', { 'is-invalid': data !== null && data.activeStatus === null })}
                                    {...field}
                                />
                            )}
                        />
                    </div>
           

            <div className='mb-1'>
              <Label className='form-label' for='staff'>
                Staff
              </Label>
              <Controller
                id='staff'
                control={control}
                name='staff'
                render={({ field }) => (
                  <Select
                    isClearable
                    options={isstaff}
                    classNamePrefix='select'
                    theme={selectThemeColors}
                    className={classnames('react-select', { 'is-invalid': data !== null && data.staff === null })}
                    {...field}
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='superUser'>
                Super User
              </Label>
              <Controller
                id='superUser'
                control={control}
                name='superUser'
                render={({ field }) => (
                  <Select
                    isClearable
                    options={issuperUser}
                    classNamePrefix='select'
                    theme={selectThemeColors}
                    className={classnames('react-select', { 'is-invalid': data !== null && data.superUser === null })}
                    {...field}
                  />
                )}
              />
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
    </div>
  )
}

export default ValidationThirdPartyComponents
