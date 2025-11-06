// ** React Imports
import { useContext } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, X } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  FormFeedback,
  UncontrolledTooltip
} from 'reactstrap'
// API_URL

// ** Illustrations Imports
import illustrationsLight from '@src/assets/images/pages/login-v2.svg'
import illustrationsDark from '@src/assets/images/pages/login-v2-dark.svg'
import API_URL from '../../../config'
import { useNavigate } from "react-router-dom"

// ** Styles
import '@styles/react/pages/page-authentication.scss'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const defaultValues = {
  password: 'vidya12',
  loginEmail: 'a@gmail.com'
}

sessionStorage.removeItem('userName')

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
    // } = useForm({ defaultValues })
  } = useForm({})

  const source = skin === 'dark' ? illustrationsDark : illustrationsLight

  // const onSubmit = data => {
  //   if (Object.values(data).every(field => field.length > 0)) {
  //     useJwt
  //       .login({ email: "a@gmail.com", password: "vidya12" })
  //       .then(res => {
  //         const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
  //         dispatch(handleLogin(data))
  //         ability.update(res.data.userData.ability)
  //         navigate(getHomeRouteForLoggedInUser(data.role))
  //         // toast(t => (
  //         //   <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
  //         // ))
  //       })
  //       .catch(err => setError('loginEmail', {
  //           type: 'manual',
  //           message: err.response.data.error
  //         })
  //       )
  //   } else {
  //     for (const key in data) {
  //       if (data[key].length === 0) {
  //         setError(key, {
  //           type: 'manual'
  //         })
  //       }
  //     }
  //   }
  // }


  const handleError = (message) => {
    return MySwal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-danger'
      },
      allowOutsideClick: false,
      confirmButtonText: 'Close',
      confirmButtonColor: 'danger',
      buttonsStyling: false
    })
  }


  const onSubmit = data => {
    const logincred = JSON.stringify({
      email: data.loginEmail,
      password: data.password,
      hotelid: data.hotelID
    })
    fetchx(API_URL + "/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: logincred
    }) .then(res => res.json())
    .then(resp => {
    if(resp['userlevel'] === undefined){
      sessionStorage.setItem('userName', resp['nameofuser'])
      if (Object.values(data).every(field => field.length > 0)) { 
        useJwt
          .login({ email: "a@gmail.com", password: "vidya12" })
          .then(res => {
            const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
            dispatch(handleLogin(data))
            ability.update(res.data.userData.ability)
            navigate(getHomeRouteForLoggedInUser(data.role))
          })
          .catch(err => setError('loginEmail', {
            type: 'manual',
            message: err.response.data.error
          })
          )
      } else {
        for (const key in data) {
          if (data[key].length === 0) {
            setError(key, {
              type: 'manual'
            })
          }
        }
      }
      // handleError(resp['message'])
    }
    else {
        sessionStorage.setItem('userName', resp['nameofuser'])
        if (Object.values(data).every(field => field.length > 0)) { 
          useJwt
            .login({ email: "a@gmail.com", password: "vidya12" })
            .then(res => {
              const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
              dispatch(handleLogin(data))
              ability.update(res.data.userData.ability)
              navigate(getHomeRouteForLoggedInUser(data.role))
            })
            .catch(err => setError('loginEmail', {
              type: 'manual',
              message: err.response.data.error
            })
            )
        } else {
          for (const key in data) {
            if (data[key].length === 0) {
              setError(key, {
                type: 'manual'
              })
            }
          }
        }
      }
    })
  }



  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <link rel="icon" href="/oterra.png" />
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to RDPR! 👋
            </CardTitle>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>

              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Username
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      // type='email'
                      // placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
                {errors.loginEmail && <FormFeedback>{errors.loginEmail.message}</FormFeedback>}
              </div>

              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  {/* <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link> */}
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
              </div>

              {/* <div className='mb-1'>
                <Label className='form-label' for='hotelID'>
                  hotelID
                </Label>
                <Controller
                  id='hotelID'
                  name='hotelID'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      invalid={errors.loginEmail && true}
                      {...field}
                    />

                  )}
                />
              </div> */}

              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>

              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
