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
import Moment from "moment";

// ** Reactstrap Imports
import {
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
  Modal, ModalHeader, ModalBody,
} from "reactstrap";
import { Plus } from "react-feather";

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
import { ArrowLeft, ArrowRight } from "react-feather";
// const id = '1';


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

const stateOptions = [
  { value: 'Daman', label: 'Daman' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'HimachalPradesh', label: 'Himachal Pradesh' },
  { value: 'Jammu Kashmir', label: 'Jammu Kashmir' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Ladakh', label: 'Ladakh' },
  { value: 'Lakshadweep', label: 'Lakshadweep' },
  { value: 'MadhyaPradesh', label: 'Madhya Pradesh' },
  { value: 'Maharastra', label: 'Maharastra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Puducherry', label: 'Puducherry' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'TamilNaidu', label: 'TamilNaidu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Uttarpradesh', label: 'Uttarpradesh' },
]

let countryOptions = [
  fetchx(API_URL +"/getGuestProfileCountry?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      countryOptions = resp["data"];
      // setOptions(response.data);            

      // console.log(vipID)
    }),
];

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];

const Floor = ({ stepper, type, data1 }) => {
  console.log(data1.companyid)
  const [idDetail, setIDDetails] = useState();

 
  // Ag Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();
  const lookupValue = (mappings, key) => {
    return mappings[key]
  }

  let colourMappings = [
    fetchx(API_URL + "/getGuestProfileCountry?hotelID=1")
      .then((result) => result.json())
      .then((resp) => {
        // console.log(resp['data'])
        colourMappings = resp["data"];
        // setOptions(response.data);            
  
        // console.log(vipID)
      }),
  ];


  const extractKeys = (mappings) => {
    return Object.keys(mappings)
  }
  const colourCodes = extractKeys(colourMappings)
  
  // Get Booker Details
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Name",
      field: "name",
      suppressSizeToFit: true,
      maxWidth: 140,
      editable: true,
    },
    {
      headerName: "Email ID",
      field: "emailID",
      suppressSizeToFit: true,
      maxWidth: 200,
      editable: true,
    },
    {
      headerName: "Phone No.",
      field: "phone",
      suppressSizeToFit: true,
      maxWidth: 140,
      editable: true,
    },
    {
      headerName: "Address",
      field: "addressLine1",
      suppressSizeToFit: true,
      maxWidth: 115,
      editable: true,
    },
    {
      headerName: "Country",
      field: "country",
      suppressSizeToFit: true,
      maxWidth: 110,
      editable: true,
    },
    {
      headerName: "State",
      field: "state",
      suppressSizeToFit: true,
      maxWidth: 110,
      editable: true,
    },
    {
      headerName: "City",
      field: "city",
      suppressSizeToFit: true,
      maxWidth: 110,
      editable: true,
    },
    {
      headerName: "PostalCode",
      field: "postalCode",
      suppressSizeToFit: true,
      maxWidth: 125,
      editable: true,
    },
     ]);


     // ON CELL VALUE CHANGE
     
  const onCellValueChanged = useCallback(event => {
    console.log('onCellValueChanged', event)
    console.log('hiii')
    // const ID = event.data.id
    // const PCODE = event.data.packageCode
    console.log(event.data)
    const updatedItem = JSON.stringify({
      accountID: event.data.companyid,
      name: event.data.name,
      emailID:event.data.emailID,
      phone:event.data.phone,
      addressLine1:event.data.addressLine1,
      country:event.data.country,
      state:event.data.state,
      city:event.data.city,
      postalCode:event.data.postalCode
    })
    console.log(updatedItem)
    fetchx(API_URL + `/updatebooker?accountID=${data1.companyid}`, {
      method: 'PUT',
      body: updatedItem,
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])



  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  // Get Booker Details
  useEffect(() => {
    fetchx(API_URL + `/getbooker?hotelID=1&accountID=${data1.companyid}`)
      .then((result) => result.json())
      .then((rowData) => 
      setRowData(rowData["data"]));
  }, []);


  // ** Hooks
  const {
    setError,
    formState: { errors },
  } = useForm();

  // ** State
  const [data, setData] = useState(null);

  const [selectedValue, setSelectedOption] = useState("");


  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues });

  console.log(data1.companyid)
 // Add Booker Details
  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    {
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "accountID":data1.companyid,        
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
        // "attachment":id.file
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
          fetchx(API_URL + `/getbooker?hotelID=1&accountID=${data1.companyid}`)
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


  // window.onload = function() {
  //     localStorage.clear();
  //   };


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
  const [modal, setModal] = useState(false);

  const handleModal = () => setModal(!modal);

  return (
    <div>
        <Modal isOpen={idDetail} toggle={() => setIDDetails(!idDetail)} className='modal-lg'>
         <ModalHeader className='modal-lg' toggle={() => setIDDetails(!idDetail)}>
         Add Booker
         </ModalHeader>
         <ModalBody className='pb-3 px-sm-5 mx-20'>
         <div>
           <Form onSubmit={handleSubmit(onSubmit)}>
               <Row>
              
               <Col md='3' sm='12'>
                     <div className='mb-1'>
                       <Label className='form-label' for='name'>
                         Name
                       </Label>
                       <Controller
                         defaultValue=''
                         control={control}
                         id='name'
                         name='name'
                         render={({ field }) => <Input placeholder='Name' invalid={errors.name && true} {...field}
                         // value={data1['name']} 
                         />}
                       />
                     </div>
                   </Col>
               <Col md='3' sm='12' className='mb-1'>
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
               <Col md='3' sm='12' className='mb-1'>
               <div className='mb-1'>
                 <Label className='form-label' for='phone'>
                   Phone
                 </Label>
                 <InputGroup className='input-group-merge'>
                 
                   <Controller
                     id='phone'
                     name='phone'
                     control={control}
                     render={({ field }) => (
                       <Cleave
                       // pattern="[6-9]{1}[0-9]{9}" 
                       // title="Phone number with 7-9 and remaing 9 digit with 0-9" required
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
                   render={({ field }) => <Input type="text" pattern="^[#.0-9a-zA-Z\s,-]+$" title="Invalid email address" 
                   required className={classnames({
                     "is-invalid": data !== null && (data.addressLine1 === null || !data.addressLine1.length)
                   })} {...field}/>}
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
                   render={({ field }) => <Input type='text' pattern="^[#.0-9a-zA-Z\s,-]+$" title="Invalid email address" 
                   required className={classnames({
                     "is-invalid": data !== null && (data.addressLine2 === null || !data.addressLine2.length)
                   })} {...field}/>}
                 />
                 </InputGroup>
               </div>
               </Col>
               
               <Col md='3' sm='12' className='mb-1'>
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
                       options={countryOptions}
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
               <Col md='3' sm='12' className='mb-1'>
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
                       options={stateOptions}
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
                       pattern="[aA-zZ]*" title="Type Only Alphabets" required
                         {...field}
                         className={classnames("form-control", {
                           "is-invalid":
                             data !== null && (data.city === null || !data.city.length)
                         })}
                       />
                     )}
                   />
                 {/* </InputGroup> */}
               </div>
               </Col>
               <Col md='3' sm='12' className='mb-1'>
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
                      //  pattern="[0-9]{6}" title="Contains Only Numbers Max 6 Character" required
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
               <Col md='3' sm='12' className='mb-1'>
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
          </div>
         </ModalBody>
         </Modal>


      {/* // AG Grid to Display ID Details */}
      <div className="ag-theme-alpine" style={{ height: 220 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData} columnDefs={columnDefs}
                    animateRows={true} 
                    rowSelection='multiple'
                    onCellClicked={cellClickedListener}
                    // paginationAutoPageSize = 'true'
                    onCellValueChanged={onCellValueChanged}
                    paginationPageSize='10'
                    pagination='true'
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"

                />
            </div>
            <br></br>
            <br></br>


            <div align='end' className='buttons'>
             <Button color='primary' className='me-1' type='submit' onClick={() => {setIDDetails(!idDetail) }}>
             Add ID Details
             </Button>
             </div>
      <br></br>
      <br></br>
      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            Previous
          </span>
        </Button>
        <Button
          color="primary"
          className="btn-next"
          onClick={() => stepper.next()}
        >
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </div>
  );
};

export default Floor;
