// ** React Imports
import { useState } from "react";
import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
// import App from "./dataTable";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Input,
  Card,
  Form,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText,
  Row,
  Col
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import './Assettable.css';
import {useRef, useEffect, useMemo, useCallback} from 'react';
const id='1'

const countryoptions = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Australia", label: "Australia" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Bhutan", label: "Bhutan" },
  { value: "Hong Kong", label: "Hong Kong" },
  { value: "India", label: "India" },
  { value: "Japan", label: "Japan" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
];

const stateoptions = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Rajasthan", label: "Rajasthan" },
];

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];



const defaultValues = {
  // hotelID: "",
      account: "",
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

const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Account',field: 'account'},
    {headerName: 'Name',field: 'name'},
    {headerName: 'Email ID',field: 'emailID'},
    {headerName: 'Phone',field: 'phone'},
    {headerName: 'Address Line1',field: 'addressLine1'},
    {headerName: 'Address Line2',field: 'addressLine2'},
    {headerName: 'Country',field: 'country'},
    {headerName: 'State',field: 'state'},
    {headerName: 'City',field: 'city'},
    {headerName: 'Postal Code',field: 'postalCode'},
    {headerName: 'Is Active',field: 'isActive'},

  ]);

  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      filterParams :{
      buttons : ['apply','reset']
      }
    }
  ));

  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
  };

  useEffect(() => {
    fetchx(API_URL + '/getbooker?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  }, []);
  
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);


  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    if (data.account.length,
      // data.hotelID !== null &&
      data.account !== null &&
      data.name !== null &&
      data.emailID!==null &&
      data.phone.length!==null &&
      data.addressLine1 !== null &&
      data.addressLine2 !== null &&
      data.country !== null &&
      data.city !== null &&
      data.postalCode !== null &&
      data.isActive !== null
    ) {
      console.log(data);
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "account": data.account,
        "name": data.name,
        "emailID": data.emailID,
        "phone": data.phone,
        "addressLine1": data.addressLine1,
        "addressLine2": data.addressLine2,
        "country": data.country.value,
        "state": data.state.value,
        "city": data.city,
        "postalCode": data.postalCode,
        "isActive": data.isActive.value,
      });
      console.log(createasset);
      let res = fetchx(API_URL + "/addbooker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          // setTimeout(() => {  window.location.reload(true); }, 4000);          
          fetchx(API_URL + '/getbooker?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
        }
      });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Booker Details Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      hotelID: "",
      account: "",
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
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Booker</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="hotelID">
              Hotel ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText>
              <Controller
                id="hotelID"
                name="hotelID"
                control={control}
                placeholder="hotel ID"
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.hotelID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="account">
            Account
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.account === null || !data.account.length)
                })}
              ></InputGroupText>
              <Controller
                id="account"
                name="account"
                control={control}
                render={({ field }) => (
                  <Cleave
                  placeholder="Account"
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.account === null || !data.account.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='name'>
              Name
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='name'
              name='name'
              render={({ field }) => <Input Placeholder="Name" pattern="[aA-zZ]*" title="Type Only Alphabets" required  className={classnames({
                "is-invalid": data !== null && (data.name === null || !data.name.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          {/* <div className="mb-1">
            <Label className="form-label" for="name">
              Name
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.name === null || !data.name.length)
                })}
              ></InputGroupText>
              <Controller
                id="name"
                name="name"
                control={control}
                placeholder="Name"
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.name === null || !data.name.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div> */}
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="emailID">
              Email
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.emailID === null || !data.emailID.length)
                })}
              ></InputGroupText>
              <Controller
                id="emailID"
                name="emailID"
                control={control}
                type="email"
                render={({ field }) => (
                  <Cleave
                  placeholder="emailID"
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" 
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.emailID === null || !data.emailID.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='phone'>
              Phone
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.phone=== null || !data.phone.length)
                })}
              >
                IND (+91)
              </InputGroupText>
              <Controller
                id='phone'
                name='phone'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[6-9]{1}[0-9]{9}" 
                  title="Phone number with 7-9 and remaing 9 digit with 0-9" required
                  placeholder='8234567892'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.phone === null || !data.phone.length)
                    })}
                    options={{ phone: true, phoneRegionCode: 'IND' }}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
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
              render={({ field }) => <Input type="text" pattern="^[#.0-9a-zA-Z\s,-]+$" title="Invalid email address" 
              required className={classnames({
                "is-invalid": data !== null && (data.addressLine1 === null || !data.addressLine1.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
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
              render={({ field }) => <Input type='text' pattern="^[#.0-9a-zA-Z\s,-]+$" title="Invalid email address" 
              required className={classnames({
                "is-invalid": data !== null && (data.addressLine2 === null || !data.addressLine2.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="country">
              Country
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
                    "is-invalid": data !== null && data.country === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="state">
              State
            </Label>
            <Controller
              id="state"
              control={control}
              name="state"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={stateoptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.state === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="city">
              City
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.city === null || !data.city.length)
                })}
              ></InputGroupText>
              <Controller
                id="city"
                name="city"
                control={control}
                placeholder="city"
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ]*" title="Type Only Alphabets" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.city === null || !data.city.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="postalCode">
              Postal Code
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.postalCode === null || !data.postalCode.length)
                })}
              ></InputGroupText>
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
                      "is-invalid":
                        data !== null && (data.postalCode === null || !data.postalCode.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="isActive">
              Is Active
            </Label>
            <Controller
              id="isActive"
              control={control}
              name="isActive"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={activeoptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.isActive === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit">
              Submit
            </Button>
            <Button
              outline
              color="secondary"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          </Row>
        </Form>
      </CardBody>
    </Card>
    <Card>
    <div className="ag-theme-alpine" style={{ height: 520}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
            // onGridReady={onGridReady}
            
            />
      </div>
      </Card>
    {/* <App/> */}
    </div>
  );
};

export default ValidationThirdPartyComponents;
