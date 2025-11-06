// ** React Imports
import { useState } from "react";

// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Card,
  Form,
  Row,
  Col,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from "react";

import API_URL from "../../../../config";
const defaultValues = {
  accountsName: "",
  addressLine1: "",
  accountType: null,
  commision: "",
  accountManagerID: null,
  email: "",
  addressTwo: "",
  gstID: "",
  financialAssociateID: null,
  secondaryemail: "",
  country: null,
  isActive: null,
  notes: "",
  phoneNumber: "",
  state: "",
  iataNumber: "",
  postalcode: "",
  // rateCode: null,
  city: "",
};

let rateCodes = [
  fetchx(API_URL +"/getAccountsRateCode?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      rateCodes = resp["data"];
      // console.log(rateCodes)
    }),
];

let accountManager = [
  fetchx(API_URL +"/getAccountUser?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      accountManager = resp["data"];
      // console.log(accountManager)
    }),
];

// let financialAssociateIDs = [
//   fetchx(API_URL +'/getAccountUser?hotelID=1')
//     .then(result => result.json())
//     .then(resp => {
//       // console.log(resp['data'])
//       financialAssociateIDs = resp['assosiate']
//       console.log(financialAssociateIDs)
//     })
// ]

let countryOptions = [
  fetchx(API_URL +"/getGuestProfileCountry?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      countryOptions = resp["data"];
      // console.log(countryOptions)
    }),
];

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];

const accountType = [
  { value: "agent", label: "Agent" },
  { value: "company", label: "Company" },
  { value: "group", label: "Group" },
];

const stateOptions = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "HimachalPradesh", label: "Himachal Pradesh" },
  { value: "Jammu Kashmir", label: "Jammu Kashmir" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "MadhyaPradesh", label: "Madhya Pradesh" },
  { value: "Maharastra", label: "Maharastra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "TamilNaidu", label: "TamilNaidu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Uttarpradesh", label: "Uttarpradesh" },
  { value: "WestBengal", label: "West Bengal" },
];

const Floor = ({ stepper, data1 }) => {
  const [selectedValue, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.value);

    console.log(event.value); // print the selected value to console
    if (selectedValue == "agent") {
      console.log("hi");
      //         setitemOptions([{ value: "1", label: "Active" }])
    } else if (selectedValue == "company") {
      console.log("hi");
      //         setitemOptions([{ value: "1", label: "Active" }])
    } else {
      //         setitemOptions({ value: "0", label: "InActive" })
    }
  };

  // Ag Grid
  const [rowData, setRowData] = useState();

  const [centeredModal, setCenteredModal] = useState(false);

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Hotel ID",
      field: "hotelID",
      suppressSizeToFit: true,
      maxWidth: 160,
    },
    { headerName: "Floor ", field: "floor", suppressSizeToFit: true },
    {
      headerName: "Block ID",
      field: "blockID",
      suppressSizeToFit: true,
      maxWidth: 160,
    },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
    console.log(event['data'])
  }, []);

  // useEffect(() => {
  //   fetchx(API_URL +"/floor")
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData["data"]));
  // }, []);

  // ** Hooks
  const {
    setError,
    formState: { errors },
  } = useForm();

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    data["accountType"] = selectedValue;
    console.log(data);
    console.log(data.accountManagerID);
    console.log(data.financialAssociateID);
    console.log(data.commision);
    localStorage.setItem('data2',JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem('data2')))   
    if (data.accountType !== null && data.accountName !== null) {
      console.log(data);
      let createmarketGroup = JSON.stringify({
        accountName: data.accountsName,
        addressLine1: data.addressOne,
        accountType: data.accountType,
        commision: data.commision === null ? null : data.commision,
        accountManagerID: data.accountManagerID === null ? null : data.accountManagerID.value , 
        email: data.email,
        addressLine2: data.addressTwo,
        gstID: data.gst,
        financialAssociateID: data.financialAssociateID === null ? null : data.financialAssociateID.value, 
        secondaryEmail: data.secondaryemail,
        country: data.country === null ? null : data.country.value, 
        isActive:data.isActive === null ? null : data.isActive.value,  
        notes: data.notes,
        phoneNumber: data.phoneNumber,
        state: data.state,
        IATA: data.iataNumber,
        postalCode: data.postalcode,
        // rateCode: data.rateCode === null ? null : data.rateCode.value, 
        city: data.city,
      });
      console.log(createmarketGroup);
      console.log("hi");
      let res = fetchx(API_URL +" ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createmarketGroup,
      })
        .then((result) => result.json())
        .then((resp) => { 
          localStorage.setItem("companyData", resp["data"]);
          localStorage.setItem("accountName", resp["accountsName"]);
          console.log(resp);
          console.log(resp["data"])
          ////////////////////data present here
          console.log(data)
          console.log(resp["accountsName"])
          stepper.next()
        })
        .catch((error) => {
          console.log(error);
        });
     
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Company Details Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      accountsName: "",
      addressLine1: "",
      accountType: null,
      commision: "",
      accountManagerID: null,
      email: "",
      addressLine2: "",
      gstID: "",
      financialAssociateID: null,
      secondaryemail: "",
      country: null,
      isActive: null,
      notes: "",
      phoneNumber: "",
      state: "",
      iataNumber: "",
      postalcode: "",
      // rateCode: null,
      city: "",
    });
  };

  return (
    <div>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">Accounts</CardTitle>
        </CardHeader>
        <CardBody>
      
        </CardBody>
      </Card> */}
      <div>    <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="accountsName">
                    Accounts Name
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="accountsName"
                    name="accountsName"
                    render={({ field }) => (
                      <Input
                        placeholder="Accounts Name"
                        invalid={errors.name && true}
                        {...field}
                        value={data1["accountsName"]}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="addressOne">
                    Address 1
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="addressOne"
                    name="addressOne"
                    render={({ field }) => (
                      <Input
                        placeholder="Address 1"
                        invalid={errors.addressOne && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="accountType">
                    Account Types
                  </Label>
                  <Controller
                    id="accountType"
                    control={control}
                    name="accountType"
                    render={({ field }) => (
                      <Select
                        theme={selectThemeColors}
                        className="react-select"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[1]}
                        name="accountType"
                        options={accountType}
                        isClearable
                        onChange={handleDropdownChange}
                      />
                    )}
                  />
                </div>
              </Col>
              {selectedValue === "agent" && (
                <Col md="3" sm="12" className="mb-1">
                  <div className="mb-1">
                    <Label className="form-label" for="commision">
                      commision
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="commision"
                      name="commision"
                      render={({ field }) => (
                        <Input
                          placeholder="commision"
                          // pattern='[0-9_]{1,15}'
                          // title="commision can contain numbers . It cannnot contain alphabets and special characters."
                          invalid={errors.commision && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
              )}

              <Col md="3" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="accountManagerID">
                    Account Manager
                  </Label>
                  <Controller
                    id="accountManagerID"
                    control={control}
                    name="accountManagerID"
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={accountManager}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          // "is-invalid":
                          //   data !== null && data.accountManagerID === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="emailBasic">
                    Email
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="emailBasic"
                    name="emailBasic"
                    render={({ field }) => (
                      <Input
                        type="email"
                        placeholder="bruce.wayne@email.com"
                        invalid={errors.emailBasic && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="addressTwo">
                    Address 2
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="addressTwo"
                    name="addressTwo"
                    render={({ field }) => (
                      <Input
                        placeholder="Address 2"
                        invalid={errors.addressTwo && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="gst">
                    GST ID
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="gst"
                    name="gst"
                    render={({ field }) => (
                      <Input
                        placeholder="gst"
                        invalid={errors.gst && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="financialAssociateID">
                    Financial Associate
                  </Label>
                  <Controller
                    id="financialAssociateID"
                    control={control}
                    name="financialAssociateID"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={accountManager}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          // "is-invalid":
                          //   data !== null && data.financialAssociateID === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="secondaryemail">
                    Secondary Email
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="secondaryemail"
                    name="secondaryemail"
                    render={({ field }) => (
                      <Input
                        type="secondaryemail"
                        placeholder="Alternative Email"
                        invalid={errors.secondaryemail && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
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
                        isClearable
                        options={countryOptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          // "is-invalid": data !== null && data.country === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="isActive">
                    Active Status
                  </Label>
                  <Controller
                    id="isActive"
                    control={control}
                    name="isActive"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={activeoptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          // "is-invalid": data !== null && data.isActive === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="notes">
                    Notes
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="notes"
                    name="notes"
                    render={({ field }) => (
                      <Input
                        placeholder=" notes"
                        // pattern="[A-Za-z_]{1,15}"
                        // title=" notes can contain alphabets . It cannnot contain numbers and special characters."
                        // invalid={errors.notes && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='3' sm='12'>
                <div className='mb-1'>
                  <Label className='form-label' for='phonenumber'>
                    Phone Number
                  </Label>
                  <InputGroup className='input-group-merge'>
                    
                    <Controller
                      id='phone-number'
                      name='phoneNumber'
                      control={control}
                      placeholder='1 234 567 8900'
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          // value={data1['phoneNumber']}
                          className={classnames('form-control', {
                            // 'is-invalid': data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
                          })}
                          options={{ phone: true, phoneRegionCode: 'IN' }}
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>

              <Col md='3' sm='12'>
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
                  //  required
                  //  pattern='[Aa-Zz ]{1,15}'
                  //   title="state should  contain alphabets. Cannot contain numbers and special characters." 
                    placeholder='state' invalid={errors.state && true} {...field}
                    // value={data1['state']} 
                    />}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="iataNumber">
                    IATA Number
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="iataNumber"
                    name="iataNumber"
                    render={({ field }) => (
                      <Input
                        placeholder="Last Name"
                        // invalid={errors.iataNumber && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="postalcode">
                    Postalcode
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="postalcode"
                    name="postalcode"
                    render={({ field }) => (
                      <Input
                        placeholder="postalcode"
                        // invalid={errors.postalcode && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

             

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="city">
                    City
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="city"
                    name="city"
                    render={({ field }) => (
                      <Input
                        placeholder="City"
                        // invalid={errors.city && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>

            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                Save
              </Button>
              <Button
                className="me-1"
                outline
                color="secondary"
                type="reset"
                onClick={handleReset}
              >
                Reset
              </Button>
              {/* <Button
                color="primary"
                className="btn-next"
                onClick={() => }
              >
                <span className="align-middle d-sm-inline-block d-none">
                  Next
                </span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button> */}
            </div>
          </Form></div>
      {/* <div className="ag-theme-alpine" style={{ height: 520 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData} columnDefs={columnDefs}
          animateRows={true} rowSelection='multiple'
          onCellClicked={cellClickedListener}
          // paginationAutoPageSize = 'true'
          paginationPageSize='10'
          pagination='true'
          defaultColDef={defaultColDef}
          headerColor="ddw-primary"

        />
      </div>
 */}
    </div>
  );
};

export default Floor;
