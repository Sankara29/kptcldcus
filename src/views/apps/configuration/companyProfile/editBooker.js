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

// 

const Floor = ({ stepper, type, data1 }) => {
  console.log(data1)
  const [idDetail, setIDDetails] = useState();

 
  // Ag Grid
  const [rowData1, setRowData] = useState();

  const gridRef = useRef();
  const lookupValue = (mappings, key) => {
    return mappings[key]
  }
 console.log(localStorage.getItem(['companyID']))
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
    //   editable: true,
    },
    {
      headerName: "Email ID",
      field: "emailID",
      suppressSizeToFit: true,
      maxWidth: 200,
    //   editable: true,
    },
    {
      headerName: "Phone No.",
      field: "phone",
      suppressSizeToFit: true,
      maxWidth: 140,
    //   editable: true,
    },
    {
      headerName: "Address",
      field: "addressLine1",
      suppressSizeToFit: true,
      maxWidth: 115,
    //   editable: true,
    },
    {
      headerName: "Country",
      field: "country",
      suppressSizeToFit: true,
      maxWidth: 110,
    //   editable: true,
    },
    {
      headerName: "State",
      field: "state",
      suppressSizeToFit: true,
      maxWidth: 110,
    //   editable: true,
    },
    {
      headerName: "City",
      field: "city",
      suppressSizeToFit: true,
      maxWidth: 110,
    //   editable: true,
    },
    {
      headerName: "PostalCode",
      field: "postalCode",
      suppressSizeToFit: true,
      maxWidth: 125,
    //   editable: true,
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

  console.log(localStorage.getItem(['companyID']))


  // Get Booker Details
  useEffect(() => {
    fetchx(API_URL + `/getbooker?hotelID=1&accountID=${localStorage.getItem(['companyName'])}`)
      .then((result) => result.json())
      .then((rowData) => 
    //   console.log(rowData['data']),
      setRowData(rowData["data"])
   ).catch((err) => {
    console.error('Error:', err);
   })
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

//   console.log(data1.companyid)
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
    //     if(res['status']==200){
    //       // setTimeout(() => {  window.location.reload(true); }, 4000);          
    //       fetchx(API_URL + `/getbooker?hotelID=1&accountID=${data1.companyid}`)
    // .then(result => result.json())
    // .then(rowData => {setRowData(rowData['data'])
    // console.log(rowData['data'])
    // })
    //     }
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
  return (
    <div>      

      {/* // AG Grid to Display ID Details */}
      <div className="ag-theme-alpine" style={{ height: 220 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData1} 
                    columnDefs={columnDefs}
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
                
    </div>
  );
};

export default Floor;
