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
import API_URL from "../../../config";
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Edit2,Search,} from "react-feather";

const MySwal = withReactContent(Swal)
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
  state: '',
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

const Floor = ({ stepper2, data1 }) => {
  const [selectedValue, setSelectedOption] = useState("");
  //console.log(data1)
  const handleDropdownChange = (event) => {
        setSelectedOption(event.value);

    //console.log(event.value); // print the selected value to console
    if (selectedValue == "agent") {
      //console.log("hi");
      //         setitemOptions([{ value: "1", label: "Active" }])
    } else if (selectedValue == "company") {
      //         setitemOptions([{ value: "1", label: "Active" }])
    } else {
      //         setitemOptions({ value: "0", label: "InActive" })
    }
  };

  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const handleEditClick = () => {
    setIsEditEnabled(true);
  };

  const [selectedValue1,  setSelectedValue1] = useState(data1.accountType);
  const [selectedValue2,  setSelectedValue2] = useState(data1.country);
  const [selectedValue3,  setSelectedValue3] = useState(data1.accountManagerID);
  const [selectedValue4,  setSelectedValue4] = useState(data1.financialAssociateID);

  const [reload, setreload] = useState(true)
const [load, setload] = useState(true)

  // console.log(data1)
//BTC Approved

  const defaultReason1 = {
      value: data1.accountType,
      label: data1.accountType,    
    };


    const defaultReason2 = {
        value: data1.country,
        label: data1.name,    
      };


      const handleChange3 = (selectedOption3) => {
        setSelectedValue3(selectedOption3.value);
        //console.log(selectedOption3.value)
        //console.log(localStorage.getItem('accountManagerID'))
        localStorage.removeItem('accountManagerID')
        localStorage.setItem('accountManagerID', selectedOption3.label);
        localStorage.setItem('accountManagerID', selectedOption3.value);
    
        //console.log(localStorage.getItem('accountManagerID'))
        //console.log(localStorage.getItem('accountManagerID'))
        setreload(false)
        setTimeout(()=>{setreload(true)},1)
      };
    
      const defaultReason3 = {
          value: data1.accountManagerID,
          label: data1.AccountAssociateName,    
        };
    
    
        const handleChange4 = (selectedOption2) => {
          setSelectedValue2(selectedOption2.value);
          //console.log(selectedOption2.value)
          //console.log(localStorage.getItem('financialAssociateID'))
          localStorage.removeItem('financialAssociateID')
          localStorage.setItem('financialAssociateID', selectedOption2.label);
          localStorage.setItem('financialAssociateID', selectedOption2.value);
      
          //console.log(localStorage.getItem('financialAssociateID'))
          //console.log(localStorage.getItem('financialAssociateID'))
          setreload(false)
          setTimeout(()=>{setreload(true)},1)
        };
      
        const defaultReason4 = {
            value: data1.financialAssociateID,
            label: data1.financialAssociateName,    
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
    //console.log("cellClicked", event);
    //console.log(event['data'])
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
  //console.log(localStorage.getItem(['companyID']))

  let navigate = useNavigate();
  const [flag,setflag] = useState(false)


  const onSubmit = (data) => {
    //console.log(data);
    //console.log("flag",flag)
    setData(data);
    data["accountType"] = selectedValue;
    if (data.accountType !== null && data.accountName !== null) {
      //console.log(data);
      let createmarketGroup = JSON.stringify({
        "accountName": data.accountsName1,
        "addressLine1": data.addressOne1,
        "accountType": data.accountType === "" ? data1.accountType : data.accountType,
        "commision": data.commision1,
        "accountManagerID": selectedValue3,
        "email": data.emailBasic,
        "addressLine2": data.addressTwo2,
        "gstID": data.gst,
        "financialAssociateID": selectedValue4,
        "secondaryEmail": data.secondaryemail1,
        "country":data.country1 === undefined ?  data1.country :  data.country1.value,
        "isActive": 1,
        "notes": data.notes1,
        "phoneNumber": data.phoneNumber1,
        "state": data.states11,
        "IATA": data.iataNumber1,
        "postalCode": data.postalcode1,
        "city": data.city1,
        "ZOHOCompanyName":data.ZOHOCompanyName1,
        "customer_platform_id":data.customer_platform_id1

      });
      //console.log(createmarketGroup);
      //console.log("hi");
      let res = fetchx(API_URL + `/updateaccounts?companyid=${ data1.companyid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: createmarketGroup,
      })
        .then((result) => result.json())
        .then((resp) => {        
          //console.log(resp);
          //console.log(resp["data"])
          //console.log(data)
          //console.log(resp["accountsName"])
          //console.log(flag==true)
          //console.log(flag)
          //console.log(flag==false)
         if(flag==true){
            const swalInstance = MySwal.fire({
       text: 'Company Basic Details Edited Successfully!',
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
         navigate('');
       }
     }); 
         //  navigate('');
          //console.log('Save and exit after form submit')
         
         }
         else if(flag==false){
          const swalInstance = MySwal.fire({
            text: 'Company Basic Details Edited Successfully. Edit BTC Details!',
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
              stepper2.next(); 
            }
          }); 
        
         //console.log('Save and next after form submit')
        }
        })
        .catch((error) => {
          //console.log(error);
        });
      // .then((res) => {
      //   //console.log(res);
      //   if (res['status'] == 200) {
      //     fetchx(API_URL + '/floor?hotelID=1&floor=1&blockID=1')
      //       .then(result => result.json())
      //       .then(rowData => {
      //         setRowData(rowData['data'])
      //         console.log(rowData['data'])
      //       })
      //   }

      // });
      // toast(
      //   <div className="d-flex">
      //     <div className="me-1">
      //       <Avatar size="sm" color="success" icon={<Check size={12} />} />
      //     </div>
      //     <div className="d-flex flex-column">
      //       <h6>Form Submitted!</h6>
      //       <h4>Floor Added Successfull</h4>
      //     </div>
      //   </div>
      // );
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
      state: '',
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
              <Col md="3" sm="12">
                    <div className="mb-1">
                      <Label className="form-label" for="accounts">
                      Account Types
                      </Label>       
                      <Controller
                        id="accounts"
                        control={control}
                        name="accounts"
                        render={({ field }) => (
                          <Select
                          defaultValue={defaultReason1}
                           id="accounts" 
                          options={accountType}
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            className={classnames("react-select", )}
                        {...field}
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
                  <Col md="3" sm="12">
                    <div className="mb-1">
                      <Label className="form-label" for="account1">
                      Account Manager
                      </Label>       
                      <Controller
                        id="account1"
                        control={control}
                        name="account1"
                        render={({ field }) => (
                          <Select
                          defaultValue={defaultReason3}
                           id="account1" 
                          options={accountManager}
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            className={classnames("react-select", )}
                        {...field}
                        onChange={handleChange3} 
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
              <Col md="3" sm="12">
                    <div className="mb-1">
                      <Label className="form-label" for="financial1">
                      Financial Associate
                      </Label>       
                      <Controller
                        id="financial1"
                        control={control}
                        name="financial1"
                        render={({ field }) => (
                          <Select
                          defaultValue={defaultReason4}
                           id="financial1" 
                          options={accountManager}
                            classNamePrefix="select"
                            theme={selectThemeColors}
                            className={classnames("react-select", )}
                        {...field}
                        onChange={handleChange4} 
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
                        // onChange={handleChange2} 
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
                  <Label className="form-label" for="states11">
                  State 
                  </Label>
                  <Controller
                    control={control}
                    id="states11"
                    name="states11"
                    render={({ field }) => (
                      <Input
                      defaultValue={data1["state"]}
                        placeholder="State"
                        invalid={errors.states11 && true}
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
              {/* <Edit2 style={{ height: "20px" }}  onClick={() =>{EditData(params.data)}} align='end' />
               */}
                <Edit2 style={{ height: "20px" }}  onClick={handleEditClick} align='end' />
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="ZOHOCompanyName1">
                  ZOHOCompanyName
                  </Label>
                  <Controller
                    defaultValue={data1["ZOHOCompanyName"]}
                    control={control}
                    id="ZOHOCompanyName1"
                    name="ZOHOCompanyName1"
                    render={({ field }) => (
                      <Input
                      disabled={!isEditEnabled}

                        placeholder="ZOHOCompanyName"
                        // invalid={errors.city && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="customer_platform_id1">
                  Customer Platform ID
                  </Label>
                  <Controller
                    defaultValue={data1["customer_platform_id"]}
                    control={control}
                    id="customer_platform_id1"
                    name="customer_platform_id1"
                    render={({ field }) => (
                      <Input
                      disabled={!isEditEnabled}

                        placeholder="customer_platform_id"
                        // invalid={errors.city && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>
            <div className='d-flex justify-content-between'>
           <div className='d-flex'>
           <Button className='me-1' color='primary' type='submit' onClick={()=>setflag(false)}>
           Save And Next
           </Button>
           <Button className="me-1" color="primary" type='submit' onClick={()=>setflag(true)}>
           Save And Exit
           </Button>
           {/* <Button outline color='secondary' type='reset' onClick={handleReset}>
           Reset
           </Button> */}
           </div>           
            </div>
          </Form></div>
     
    </div>
  );
};

export default Floor;
