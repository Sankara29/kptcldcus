import { useState, useEffect } from "react";
import Select from "react-select";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import API_URL from "../../../config";
import { selectThemeColors } from "@utils";
import { Input, Card, Form, Label, Button, InputGroup, InputGroupText, Row, Col } from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

const id = '1'
import { useNavigate } from 'react-router-dom';
import classnames from "classnames";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

let countryoptions = [
  fetchx(API_URL + '/getGuestProfileCountry?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      countryoptions = resp['data']
    })
]

const defaultValues = {
  accountID: "",
  name: "",
  emailID: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  country: null,
  state: null,
  city: "",
  postalCode: "",
  isActive: null,
};

const ValidationThirdPartyComponents = ({ stepper, data1 }) => {
  const { setError, formState: { errors } } = useForm()
  const [rowData, setRowData] = useState();
  const [data, setData] = useState(null);
  const { reset, handleSubmit, control } = useForm({ defaultValues })
  let navigate = useNavigate();
  const [flag, setflag] = useState(false)


  useEffect(() => {
    fetchx(API_URL + '/getbooker?hotelID=' + id)
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
      })
  }, []);


  const onSubmit = (data) => {
    setData(data);
    {
      let createasset = JSON.stringify({
        "accountID": sessionStorage.getItem('companyID'),
        "name": data.name,
        "emailID": data.emailID,
        "phone": data.phone,
        "addressLine1": data.addressLine1,
        "addressLine2": data.addressLine2,
        "country": data.country.value,
        "state": data.state,
        "city": data.city,
        "postalCode": data.postalCode,
        "isActive": 1,
      });

      fetchx(API_URL + "/addbooker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then(data => data.json())
        .then((res) => {

          if (flag == true) {
            if (res['statusCode'] == 200) {
              fetchx(API_URL + `/getbookerByCompanyId?hotelID=1&accountID=${sessionStorage.getItem('companyID')}`)
                .then(result => result.json())
                .then(rowData => {
                  setRowData(rowData['data'])
                  const swalInstance = MySwal.fire({
                    text: 'Booker Details Added Successfully!',
                    buttonsStyling: false,
                    confirmButtonText: 'Close',
                    allowOutsideClick: false,
                    customClass: {
                      confirmButton: 'btn btn-danger'
                    }
                  });
                  swalInstance.then((result) => {
                    if (result.isConfirmed) {
                      navigate('');
                    }
                  });
                })
            }
            else {
              const swalInstance = MySwal.fire({
                text: res.message,
                icon: 'error',
                buttonsStyling: false,
                confirmButtonText: 'Close',
                allowOutsideClick: false,
                customClass: {
                  confirmButton: 'btn btn-danger'
                }
              });
              swalInstance.then((result) => {
                if (result.isConfirmed) {
                  navigate('');
                }
              });
            }       
          }

          else if (flag == false) {

            if (res['statusCode'] == 200) {
              fetchx(API_URL + `/getbookerByCompanyId?hotelID=1&accountID=${sessionStorage.getItem('companyID')}`)
                .then(result => result.json())
                .then(rowData => {
                  setRowData(rowData['data'])
                  //console.logrowData['data'])
                  const swalInstance = MySwal.fire({
                    text: 'Booker Details Added Successfully! Please Map Rate Codes ',
                    icon: 'success',
                    buttonsStyling: false,
                    confirmButtonText: 'Close',
                    allowOutsideClick: false,
                    customClass: {
                      confirmButton: 'btn btn-danger'
                    }
                  });
                  swalInstance.then((result) => {
                    if (result.isConfirmed) {
                      stepper.next();
                    }
                  });
                })
            }
            else {
              const swalInstance = MySwal.fire({
                text: res.message,
                icon: 'error',
                buttonsStyling: false,
                confirmButtonText: 'Close',
                allowOutsideClick: false,
                customClass: {
                  confirmButton: 'btn btn-danger'
                }
              });
              swalInstance.then((result) => {
                if (result.isConfirmed) {
                  navigate('');
                }
              });
            }
          }

        });

    }
  };
  const handleReset = () => {
    reset({
      accountID: "",
      name: "",
      emailID: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      country: null,
      state: null,
      city: "",
      postalCode: "",
      isActive: null,
    });
  };

  return (
    <div>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>


            <Col md='3' sm='12' className='mb-1'>
              <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Name <spam style={{ color: 'red' }}>*</spam>
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='name'
                  name='name'
                  render={({ field }) =>
                    <Input
                      required
                      placeholder='Name' invalid={errors.name && true} {...field}
                    // value={data1['name']} 
                    />}
                />
              </div>
            </Col>

            <Col md='3' sm='12' className='mb-1'>
              <div className="mb-1">
                <Label className="form-label" for="emailID">
                  Email <spam style={{ color: 'red' }}>*</spam>
                </Label>
                <InputGroup className="input-group-merge">
                  <Controller
                    id="emailID"
                    name="emailID"
                    control={control}
                    type="email"
                    render={({ field }) => (
                      <Cleave
                        required
                        placeholder="emailID"
                        pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address"

                        {...field}
                        className={classnames("form-control", {
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>

            <Col md='3' sm='12' className='mb-1'>
              <div className='mb-1'>
                <Label className='form-label' for='phone'>
                  Phone <spam style={{ color: 'red' }}>*</spam>
                </Label>
                <InputGroup className='input-group-merge'>
                  <Controller
                    id='phone'
                    name='phone'
                    control={control}
                    render={({ field }) => (
                      <Cleave
                        required
                        pattern="[6-9]{1}[0-9]{9}"
                        title="Phone number with 7-9 and remaing 9 digit with 0-9"
                        placeholder='8234567892'
                        {...field}
                        className={classnames('form-control', {
                          //  'is-invalid': data !== null && (data.phone === null || !data.phone.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>

            <Col md='3' sm='12' className='mb-1'>
              <div className='mb-1'>
                <Label className='form-label' for='addressLine1'>
                  Address Line 1
                </Label>
                <InputGroup className="input-group-merge">
                  <Controller
                    defaultValue=''
                    control={control}
                    id='addressLine1'
                    name='addressLine1'
                    render={({ field }) => <Input
                      required
                      className={classnames({
                        //  "is-invalid": data !== null && (data.addressLine1 === null || !data.addressLine1.length)
                      })} {...field} />}
                  />
                </InputGroup>
              </div>
            </Col>

            <Col md='3' sm='12' className='mb-1'>
              <div className='mb-1'>
                <Label className='form-label' for='addressLine2'>
                  Address Line 2
                </Label>
                <InputGroup className="input-group-merge">
                  <Controller
                    defaultValue=''
                    control={control}
                    id='addressLine2'
                    name='addressLine2'
                    render={({ field }) => <Input
                      required
                      className={classnames({
                        //  "is-invalid": data !== null && (data.addressLine2 === null || !data.addressLine2.length)
                      })} {...field} />}
                  />
                </InputGroup>
              </div>
            </Col>

            <Col md='3' sm='12' className='mb-1'>
              <div className="mb-1">
                <Label className="form-label" for="country">
                  Country<spam style={{ color: 'red' }}>*</spam>
                </Label>
                <Controller
                  id="country"
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <Select
                      required
                      isClearable
                      options={countryoptions}
                      classNamePrefix="select"
                      theme={selectThemeColors}
                      className={classnames("react-select", {
                        //  "is-invalid": data !== null && data.country === null,
                      })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col>

            <Col md='3' sm='12' className='mb-1'>
              <div className='mb-1'>
                <Label className='form-label' for='state'>
                  State
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='state'
                  name='state'
                  render={({ field }) => <Input
                    required
                    pattern="[a-zA-Z ]*" title="Type Only Alphabets"
                    placeholder='state' invalid={errors.state && true} {...field}
                  />}
                />
              </div>
            </Col>

            <Col md='3' sm='12' className='mb-1'>
              <div className="mb-1">
                <Label className="form-label" for="city">
                  City
                </Label>
                <Controller
                  id="city"
                  name="city"
                  control={control}
                  placeholder="city"
                  render={({ field }) => (
                    <Cleave
                      required
                      pattern="[a-zA-Z ]*" title="Type Only Alphabets"
                      {...field}
                      className={classnames("form-control", {
                      })}
                    />
                  )}
                />
              </div>
            </Col>

            <Col md='3' sm='12' className='mb-1'>
              <div className="mb-1">
                <Label className="form-label" for="postalCode">
                  Postal Code <spam style={{ color: 'red' }}>*</spam>
                </Label>
                <InputGroup className="input-group-merge">

                  <Controller
                    id="postalCode"
                    name="postalCode"
                    control={control}
                    placeholder="postalCode"
                    render={({ field }) => (
                      <Cleave
                        pattern="[0-9]{6}" title="Contains Only Numbers Max 6 Character" required
                        {...field}
                        className={classnames("form-control", {
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>

            <div className='d-flex justify-content-between'>
              <div className='d-flex'>

                <Button className='me-1' outline color='secondary' type='reset' onClick={handleReset}>
                  Reset
                </Button>

                <Button className="me-1" color="primary" type='submit' onClick={() => setflag(true)}>
                  Create Booker
                </Button>

                <Button className='me-1' color='primary' type='submit' onClick={() => setflag(false)}>
                  Save And Next
                </Button>
              </div>
            </div>


          </Row>
        </Form>
      </div>
      <br></br>

    </div>
  );
};

export default ValidationThirdPartyComponents;