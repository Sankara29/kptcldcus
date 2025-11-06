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
import API_URL from '../../../../config'
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

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { Accordion, AccordionBody, AccordionHeader, AccordionItem,Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, } from 'reactstrap'
import {useRef, useEffect, useMemo, useCallback} from 'react';
const id='1'
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal)
// const countryoptions = [
//   { value: "Afghanistan", label: "Afghanistan" },
//   { value: "Australia", label: "Australia" },
//   { value: "Bangladesh", label: "Bangladesh" },
//   { value: "Bhutan", label: "Bhutan" },
//   { value: "Hong Kong", label: "Hong Kong" },
//   { value: "India", label: "India" },
//   { value: "Japan", label: "Japan" },
//   { value: "United Kingdom", label: "United Kingdom" },
//   { value: "United States", label: "United States" },
// ];
let countryoptions = [
  fetchx(API_URL+'/getGuestProfileCountry?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      countryoptions = resp['data']
      console.log(vipID)
    })
]

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

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
];


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

const ValidationThirdPartyComponents = ({data1}) => {
     // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()


  const [rowData, setRowData] = useState();
  const [popUp, setPopUp] = useState(false);
  const [oldValue, setOldValue] = useState(null);
  const gridRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");

  const lookupValue = (mappings, key) => {
    return mappings[key]
  }
  const colourMappings = {
    1: 'Active',
    0 : 'Inactive',
  }
  const extractKeys = (mappings) => {
    return Object.keys(mappings)
  }
  const colourCodes = extractKeys(colourMappings)

  const [columnDefs, setColumnDefs] = useState([
     {headerName: 'Name',field: 'name',cellStyle: {'background-color': '#F1E39B'}},
    {headerName: 'Email ID',field: 'emailID',cellStyle: {'background-color': 'pink'}},
    {headerName: 'Phone',field: 'phone',cellStyle: {'background-color': '#F1E39B'},maxWidth: 120},
    {headerName: 'Address Line1',field: 'addressLine1',cellStyle: {'background-color': 'pink'},maxWidth: 120},
    {headerName: 'Address Line2',field: 'addressLine2',cellStyle: {'background-color': '#F1E39B'},maxWidth: 120},
    {headerName: 'Country',field: 'country',cellStyle: {'background-color': 'pink'},maxWidth: 120},
    {headerName: 'State',field: 'state',cellStyle: {'background-color': '#F1E39B'},maxWidth: 120},
    {headerName: 'City',field: 'city',cellStyle: {'background-color': 'pink'},maxWidth: 120},
    {headerName: 'Postal Code',field: 'postalCode',cellStyle: {'background-color': '#F1E39B'},maxWidth: 120},
    // {headerName: 'Is Active',field: 'isActive'},
    {headerName: 'Status', field: 'isActive', cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },suppressSizeToFit: true,maxWidth: 150,editable: true,cellEditor: 'agSelectCellEditor', cellEditorParams: {values: colourCodes }, valueFormatter: (params) => { return lookupValue(colourMappings, params.value)},filter: 'agSetColumnFilter'},
  ]);


  const [newActiveStatus, setNewActiveStatus] = useState(null);
  const [roomClass, setRoomClassID] = useState(null);

  const onCellValueChanged = useCallback(event => {
    // console.log('onCellValueChanged', event)
    // console.log('data after changes is: ', event.data);
  //  console.log(event)
   let isActive=Number(event.data.isActive);
  //  console.log(isActive)
  //  console.log(event.data.isActive)
 
   let OldValue=oldValue  
  //  console.log(oldValue)
  //  console.log(OldValue)
 
     let ID=event.data['id']
     const IDNumber = event.data.id;
     setRoomClassID(IDNumber); 
  //  console.log(ID)
  //  console.log(event.data.id)
   

    let newActive = event.data.isActive;
    // console.log(newActive)
  //  const oldRoomType = event.oldValue.split("(")[0];
  //   setPrice(newRoomType)
  //   setBasePriceID(ID)
      
    if (event.data.isActive !== oldValue) {
      const newActiveStatus = event.data.isActive;
      setNewActiveStatus(newActiveStatus); 
                 const oldActiveStatus = oldValue;
    // setFullData(RoomType,oldRoomType,newRoomType,event.data.date)
    setPopUp("Do You  Want to change Booker Status ?");
    
    } 

  const updatedItem = JSON.stringify({            
     isActive:event.newValue.split("(")[0]
     })
    //  console.log(updatedItem)
     fetchx(API_URL+ `/updateBookerDetails`, {
     method: 'PUT',
     body: updatedItem,
     headers: {
     'Content-type': 'application/json'
     }
     })
     .then((res) => res.json())
     .then((post) => {
      // const swalInstance = MySwal.fire({
      //   text: 'Updated Active Status Successfully!',
      //   icon: 'success',
      //   buttonsStyling: false,
      //   confirmButtonText: 'Close',
      //   customClass: {
      //     confirmButton: 'btn btn-danger'
      //   }
      // });
      // swalInstance.then((result) => {
      //   if (result.isConfirmed) {
          // navigate('');
      //   }
      // }); 
    //  console.log(post)
     })
     .catch((err) => {
     console.log(err.message)
     })         
    }, [])


  // console.log(newActiveStatus)
console.log(roomClass)

// const gridApi = useRef();

function Confirm (event){
const updatedItem = JSON.stringify({
isActive:newActiveStatus, 
id:roomClass
})
console.log(updatedItem)
fetchx(API_URL+ `/updateBookerDetails`, {
method: 'PUT',
body: updatedItem,
headers: {
'Content-type': 'application/json'
}
})
.then((res) => res.json())
.then((post) => {
 const swalInstance = MySwal.fire({
        text: 'Updated  Status Successfully!',
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
console.log(post)
if(post.statusCode === 200){
setPopUp(false)
fetchx(API_URL + '/getbooker?hotelID=1')
.then(result => result.json())
.then(rowData =>{
console.log(rowData['data'])     
}
)
}
})
.catch((err) => {
console.log(err.message)
})
}

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
  const [open, setOpen] = useState('')

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  
  useEffect(() => {
    fetchx(API_URL + '/getbooker?hotelID=1')
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    // console.log(rowData['data'])
    })
  }, []);
  
  const cellClickedListener = useCallback(event => {
    // console.log('cellClicked', event.data);
    // console.log('cellClicked', event.data.isActive);
    
    const currentValue = event.data.isActive;
    // console.log(currentValue);
    
    setOldValue(currentValue); // Update the state variable
}, []);

console.log("oldValue",oldValue)

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })

  let navigate = useNavigate();  

  const onSubmit = (data) => {
    setData(data);
    // console.log(data)
   {
      
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "accountID":null,
        "name": data.name,
        "emailID": data.emailID,
        "phone": data.phone,
        "addressLine1": data.addressLine1,
        "addressLine2": data.addressLine2,
        "country": data.country === null ? null : data.country.value,
        "state": data.state,
        "city": data.city,
        "postalCode": data.postalCode,
        "isActive": 1,
      });
      // console.log(createasset);
      // console.log("API_URL=="+API_URL)
      let res = fetchx(API_URL+"/addbooker", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createasset
      }).then(data => data.json())
      .then((res) => {
        // console.log(res);
        // console.log(data);
        if(res['statusCode']==200){
          fetchx( API_URL +  '/getbooker?hotelID='+id)
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
          const swalInstance = MySwal.fire({
            text: 'Booker Added Successfully!',
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
        })
        }
        else{
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
      
      });
      // toast(
      //   <div className="d-flex">
      //     <div className="me-1">
      //       <Avatar size="sm" color="success" icon={<Check size={12} />} />
      //     </div>
      //     <div className="d-flex flex-column">
      //       <h6>Form Submitted!</h6>
      //       <h4>Booker Details Added Successfull</h4>
      //     </div>
      //   </div>
      // );
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
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div>
         <div className="disabled-animation-modal">
 <Modal
 isOpen={popUp}
 toggle={() => setPopUp(!popUp)}
 className="modal-sm"
 >
 {" "}
 {/*onClosed={onDiscard}*/}
 <ModalHeader
 className="modal-sm"
 toggle={() => {
 setPopUp(!popUp);
 }}
 >
 Need To Check..
 </ModalHeader>
 <ModalBody className="pb-3 px-sm-2 mx-20">
 <div>
 <b>{popUp}</b>
 <br></br>
 <br></br>
 <div className="d-flex">
 <Button
 color="primary"
 className="me-1"
 // className="text-center"
 onClick={() => Confirm()}
 >
 Confirm
 </Button>
 <Button
 color="danger"
 className="me-1"
 // className="text-center"
 onClick={() => {
  setPopUp(false) , navigate('');  
}}
 >
 Cancel
 </Button>
 </div>
 </div>
 </ModalBody>
 </Modal>
 </div>
   <div>
   <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Booker </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
   <Form onSubmit={handleSubmit(onSubmit)}>
               <Row>
              
               <Col md='3' sm='12'>
                     <div className='mb-1'>
                       <Label className='form-label' for='name'>
                         Name <spam style={{color:'red'}}>*</spam>
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
                   Email <spam style={{color:'red'}}>*</spam>
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
                   Phone <spam style={{color:'red'}}>*</spam>
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
                   render={({ field }) => <Input 
                   required
                  className={classnames({
                    //  "is-invalid": data !== null && (data.addressLine2 === null || !data.addressLine2.length)
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
                          //  "is-invalid":
                            //  data !== null && (data.city === null || !data.city.length)
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
                   Postal Code <spam style={{color:'red'}}>*</spam>
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
                          //  "is-invalid":
                          //    data !== null && (data.postalCode === null || !data.postalCode.length)
                         })}
                       />
                     )}
                   />
                 </InputGroup>
               </div>
               </Col>
               {/* <Col md='3' sm='12' className='mb-1'>
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
               </Col> */}
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
          </AccordionBody>
      </AccordionItem>
      </Accordion>
   </div>
   <br></br>
   <div>
        <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="fullName">
            Search
          </Label>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        </Col>
      </div>

    {/* <Card> */}
    <div className="ag-theme-alpine" style={{ height: 540}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            onCellValueChanged={onCellValueChanged}
            paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
            
            />
      </div>
      {/* </Card> */}
    {/* <App/> */}
    </div>
  );
};

export default ValidationThirdPartyComponents;
