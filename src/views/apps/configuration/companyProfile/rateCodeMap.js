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
// AG Grid
import { AgGridReact } from "ag-grid-react";
import "/node_modules/ag-grid-community/styles/ag-grid.css";
import "/node_modules/ag-grid-community/styles/ag-theme-alpine.css";
import { useRef, useEffect, useMemo, useCallback } from "react";

import API_URL from "../../../../config";
import { ArrowLeft, ArrowRight } from "react-feather";
// const id = '1';
import AccountRateCodeMapping from "./accrateCodeMap";


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
      headerName: "Rate Code",
      field: "rateCode",
      suppressSizeToFit: true,
      checkboxSelection: true, headerCheckboxSelection: true, maxWidth: 300
   ,
    },
    {
      headerName: "Description",
      field: "description",
      suppressSizeToFit: true,
      maxWidth: 140,
      
    },
    {
      headerName: "Begin Date",
      field: "beginSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
      
    },
    {
      headerName: "SellDate",
      field: "endSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
      
    },
    {
      headerName: "Days Applicable",
      field: "daysApplicable",
      maxWidth: 140,
      
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
    fetchx(API_URL + "/getRateCode?accountID=1")
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
        <Modal isOpen={idDetail} toggle={() => setIDDetails(!idDetail)} className='modal-xl'>
         <ModalHeader className='modal-lg' toggle={() => setIDDetails(!idDetail)}>
         Add RateCodes
         </ModalHeader>
         <ModalBody className='pb-3 px-sm-5 mx-20'>
       <AccountRateCodeMapping/>
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
             Add Rate Code
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
