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

// import App from './datagrid'

const defaultValues = {
  accountsName: "",
  addressLine1: "",
  accountType: null,
  commission: "",
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
  state: null,
  iataNumber: "",
  postalcode: "",
  // rateCode: null,
  city: "",
};

let rateCodes = [
  fetchx(API_URL + "/getAccountsRateCode?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      rateCodes = resp["data"];
      // console.log(rateCodes)
    }),
];

let accountManager = [
  fetchx(API_URL + "/getAccountUser?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      accountManager = resp["data"];
      // console.log(accountManager)
    }),
];

// let financialAssociateIDs = [
//   fetchx(API_URL + '/getAccountUser?hotelID=1')
//     .then(result => result.json())
//     .then(resp => {
//       // console.log(resp['data'])
//       financialAssociateIDs = resp['assosiate']
//       console.log(financialAssociateIDs)
//     })
// ]

let countryOptions = [
  fetchx(API_URL + "/getGuestProfileCountry?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      countryOptions = resp["data"];
      // console.log(countryOptions)
    }),
];

const activeOptions = [
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
  console.log(data1)
  const handleDropdownChange = (event) => {
        setSelectedOption(event.value);

    console.log(event.value); // print the selected value to console
    if (selectedValue == "agent") {
      console.log("hi");
      //         setitemOptions([{ value: "1", label: "Active" }])
    } else if (selectedValue == "company") {
      //         setitemOptions([{ value: "1", label: "Active" }])
    } else {
      //         setitemOptions({ value: "0", label: "InActive" })
    }
  };

  const [selectedValue1,  setSelectedValue1] = useState(data1.accountType);
  const [selectedValue2,  setSelectedValue2] = useState(data1.country);
  const [selectedValue3,  setSelectedValue3] = useState(data1.accountType);
  const [selectedValue4,  setSelectedValue4] = useState(data1.accountType);

  const [reload, setreload] = useState(true)
const [load, setload] = useState(true)

  // console.log(data1)
//BTC Approved
const handleChange1 = (selectedOption1) => {
    setSelectedValue1(selectedOption1.value);
    console.log(selectedOption1.value)
    console.log(localStorage.getItem('accountType'))
    localStorage.removeItem('accountType')
    localStorage.setItem('accountType', selectedOption1.label);
    localStorage.setItem('accountType', selectedOption1.value);

    console.log(localStorage.getItem('accountType'))
    console.log(localStorage.getItem('accountType'))
    setreload(false)
    setTimeout(()=>{setreload(true)},1)
  };

  const defaultReason = {
      value: data1.accountType,
      label: data1.accountType,    
    };


    const handleChange2 = (selectedOption2) => {
      setSelectedValue2(selectedOption2.value);
      console.log(selectedOption2.value)
      console.log(localStorage.getItem('country'))
      localStorage.removeItem('country')
      localStorage.setItem('country', selectedOption2.label);
      localStorage.setItem('country', selectedOption2.value);
  
      console.log(localStorage.getItem('country'))
      console.log(localStorage.getItem('country'))
      setreload(false)
      setTimeout(()=>{setreload(true)},1)
    };
  
    const defaultReason2 = {
        value: data1.country,
        label: data1.country,    
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

  useEffect(() => {
    fetchx(API_URL + "/floor?hotelID=1&floor=1&blockID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
  }, []);

  // ** Hooks
  const {
    setError,
    formState: { errors },
  } = useForm();

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues });
  console.log(localStorage.getItem(['companyID']))
  const onSubmit = (data) => {
    setData(data);
    data["accountType"] = selectedValue;
    console.log(data);
    if (data.accountType !== null && data.accountName !== null) {
      console.log(data);
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        // "hotelID": data.hotelID,
        companyid: localStorage.getItem(['companyID']),
        "accountName": data.accountsName1,
        "addressLine1": data.addressOne1,
        "accountType": selectedValue1,
        "commision": data.commision1,
        "accountManagerID": data.accountManagerID1.value,
        "email": data.emailBasic,
        "addressLine2": data.addressTwo2,
        "gstID": data.gst,
        "financialAssociateID": data.financialAssociateID1.value,
        "secondaryEmail": data.secondaryemail1,
        "country": selectedValue2,
        "isActive": data.isActive1.value,
        notes: data.notes1,
        "phoneNumber": data.phoneNumber1,
        "state": data.state1.value,
        "IATA": data.iataNumber1,
        "postalCode": data.postalcode1,
        // "rateCode": data.rateCode1.value,
        "city": data.city1,
      });
      console.log(createmarketGroup);
      console.log("hi");
      let res = fetchx(API_URL + `/updataccounts?companyid=${localStorage.getItem(['companyID'])}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: createmarketGroup,
      })
        .then((result) => result.json())
        .then((resp) => {
        
          console.log(resp);
          console.log(resp["data"])
          console.log(data)
          console.log(resp["accountsName"])
        })
        .catch((error) => {
          console.log(error);
        });
      // .then((res) => {
      //   console.log(res);
      //   if (res['status'] == 200) {
      //     fetchx(API_URL + '/floor?hotelID=1&floor=1&blockID=1')
      //       .then(result => result.json())
      //       .then(rowData => {
      //         setRowData(rowData['data'])
      //         console.log(rowData['data'])
      //       })
      //   }

      // });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Floor Added Successfull</h4>
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
      commission: "",
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
      state: null,
      iataNumber: "",
      postalcode: "",
      // rateCode: null,
      city: "",
    });
  };

  return (
    <div>     
      <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="accountsName1">
                    Accounts Name
                  </Label>
                  <Controller
                    defaultValue={data1["accountName"]}
                    control={control}
                    id="accountsName1"
                    name="accountsName1"
                    render={({ field }) => (
                      <Input
                        placeholder="Accounts Name"
                        invalid={errors.accountsName1 && true}
                        {...field}
                        
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="addressOne1">
                    Address 1
                  </Label>
                  <Controller
                    defaultValue={data1["addressLine1"]}
                    control={control}
                    id="addressOne1"
                    name="addressOne1"
                    render={({ field }) => (
                      <Input
                        placeholder="Address 1"
                        invalid={errors.addressOne1 && true}
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
                  defaultValue={defaultReason}
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
                    <Label className="form-label" for="commision1">
                      commision
                    </Label>
                    <Controller
                      defaultValue={data1["commision"]}
                      control={control}
                      id="commision1"
                      name="commision1"
                      render={({ field }) => (
                        <Input
                          placeholder="commision"
                          // pattern='[0-9_]{1,15}'
                          // title="commision can contain numbers . It cannnot contain alphabets and special characters."
                          invalid={errors.commision1 && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
              )}

              <Col md="3" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="accountManagerID1">
                    Account Manager
                  </Label>
                  <Controller
                  // defaultValue={accountManager[2]}
                    id="accountManagerID1"
                    control={control}
                    name="accountManagerID1"
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
                    defaultValue={data1["email"]}
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
                  <Label className="form-label" for="addressTwo2">
                    Address 2
                  </Label>
                  <Controller
                    defaultValue={data1["addressLine2"]}
                    control={control}
                    id="addressTwo2"
                    name="addressTwo2"
                    render={({ field }) => (
                      <Input
                        placeholder="Address 2"
                        invalid={errors.addressTwo2 && true}
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
                    defaultValue={data1["gstID"]}
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
                  <Label className="form-label" for="financialAssociateID1">
                    Financial Associate
                  </Label>
                  <Controller
                  //  defaultValue={accountManager[2]}
                    id="financialAssociateID1"
                    control={control}
                    name="financialAssociateID1"
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
                  <Label className="form-label" for="secondaryemail1">
                    Secondary Email
                  </Label>
                  <Controller
                    defaultValue={data1["secondaryEmail"]}
                    control={control}
                    id="secondaryemail1"
                    name="secondaryemail1"
                    render={({ field }) => (
                      <Input
                        type="secondaryemail1"
                        placeholder="Alternative Email"
                        invalid={errors.secondaryemail1 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                    <div className="mb-1">
                      <Label className="form-label" for="country1">
                        Country
                      </Label>       
                      <Controller
                        id="country1"
                        control={control}
                        name="country1"
                        render={({ field }) => (
                          <Select
                          defaultValue={defaultReason2}
                           id="country1" 
                          options={countryOptions}
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            className={classnames("react-select", )}
                        {...field}
                        onChange={handleChange2} 
                          />
                        )}
                      />
                    </div>
                  </Col>
                  {/* <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="countries">
                  Country
                  </Label>
                  <Controller
                    // defaultValue={defaultReason}
                    id="countries"
                    control={control}
                    name="countries"
                    render={({ field }) => (
                      <Select
                        isClearable
                        defaultValue={defaultReason}
                        options={countryOptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", )}
                        {...field}
                        onChange={handleChange} 
                      />
                    )}
                  />
                </div>
              </Col>   */}
              <Col md="3" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="isActive1">
                    Active Status
                  </Label>
                  <Controller
              defaultValue={activeOptions[0]}

                    id="isActive1"
                    control={control}
                    name="isActive1"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={activeOptions}
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
                  <Label className="form-label" for="notes1">
                    Notes
                  </Label>
                  <Controller
                   defaultValue={data1["notes"]}
                    control={control}
                    id="notes1"
                    name="notes1"
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
                  <Label className='form-label' for='phonenumber1'>
                    Phone Number
                  </Label>
                  <InputGroup className='input-group-merge'>
                    {/* <InputGroupText
                      className={classnames({
                        // 'is-invalid': data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
                      })}
                    >
                      IN (+91)
                    </InputGroupText> */}
                    <Controller
                    defaultValue={data1["phoneNumber"]}
                      id='phoneNumber1'
                      name='phoneNumber1'
                      control={control}
                      placeholder='+91 234 567 8900'
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

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="state1">
                    State
                  </Label>
                  <Controller
                     defaultValue={stateOptions[1]}
                    id="state1"
                    control={control}
                    name="state1"
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={stateOptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          // "is-invalid": data !== null && data.state === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="iataNumber1">
                    IATA Number
                  </Label>
                  <Controller
                   defaultValue={data1["IATA"]}
                    control={control}
                    id="iataNumber1"
                    name="iataNumber1"
                    render={({ field }) => (
                      <Input
                        placeholder="IATA Number"
                        // invalid={errors.iataNumber && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="postalcode1">
                    Postalcode
                  </Label>
                  <Controller
                    defaultValue={data1["postalCode"]}
                    control={control}
                    id="postalcode1"
                    name="postalcode1"
                    render={({ field }) => (
                      <Input
                        placeholder="PostalCode"
                        // invalid={errors.postalcode && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
{/* 
              <Col md="3" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="rateCode1">
                    Rate Code
                  </Label>
                  <Controller
                  defaultValue={rateCodes[0]}

                    id="rateCode1"
                    control={control}
                    name="rateCode1"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        options={rateCodes}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          // "is-invalid": data !== null && data.rateCode === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col> */}

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="city1">
                    City
                  </Label>
                  <Controller
                    defaultValue={data1["city"]}
                    control={control}
                    id="city1"
                    name="city1"
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
                Submit
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
              <Button
                color="primary"
                className="btn-next"
                onClick={() => stepper.next()}
              >
                <span className="align-middle d-sm-inline-block d-none">
                  Next
                </span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button>
            </div>
          </Form></div>
     
    </div>
  );
};

export default Floor;
