// ** React Imports
import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
// import App from "./waitListDataTable";
import Moment from 'moment';

// ** Custom Components
import Avatar from "@components/avatar";
import API_URL from "../../../../config";


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

import { useRef, useEffect, useMemo, useCallback} from 'react';

// ** Reactstrap Imports
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const TypeOptions = [
  { value: "Restaurant", label: "Restaurant" },
  { value: "Spa", label: "Spa" },
  { value: "Laundry", label: "Laundry" },
  { value: "Minibar", label: "Minibar" },

];


const isAllowanceOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const discountAllowedOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
  
];

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];



const defaultValues = {
  storeID: "",
  Name: "Nayana",
  phone: "",
  imgURL:"",
  Type:null,
  billingaddress:"",
  gstno:"",
  
};

let id=1;
const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();
	const [selectedFile, setSelectedFile] = useState();
// ** State
const [open, setOpen] = useState('0')

const toggle = id => {
  open === id ? setOpen() : setOpen(id)
}

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0])
	};
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160,  },
    // {headerName: 'Hotel ID',field: 'storeID',suppressSizeToFit: true},
    {headerName: 'storeID',field: 'storeID' ,editable: true},
    {headerName: 'name',field: 'name'},
    {headerName: 'phNo',field: 'phNo'},
    {headerName: 'type',field: 'type'},
    {headerName: 'billingAddress',field: 'billingAddress'},
    {headerName: 'gstNo',field: 'gstNo'},
    {headerName: 'Image',field: 'imgURL'},

  ]);
  const gridApiRef = useRef(null);

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

  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      filterParams :{
      buttons : ['apply','reset']
      }
    }
  ));

  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  const updatedRowsList = {}

  const onCellValueChanged = useCallback( event => {
    console.log('onCellValueChanged', event);
    updatedRowsList[event.data.id] = event.data
  }, []);


  useEffect(() => {
    console.log("Clicked")
    fetchx(API_URL+'/getstorefrontinfo?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  },[]);  

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    if (
      data.storeID !== null &&
      data.Name !== null &&
      data.phone !== null &&
      data.imgURL!==null&&
      data.Type.value!==null&&
      data.billingAddress!==null&&
      data.gstno!==null    ) {
      console.log(data);
      let storefront = JSON.stringify({
        // "storeID": data.storeID,
        "storeID": data.storeID,
        "name": data.Name,
        "phNo": data.phone,
        "type": data.Type.value,
        "billingAddress": data.billingaddress,
        "gstNo": data.gstno,
        "imgURL": selectedFile.name,
      });
      console.log(storefront);
      let res = fetchx(API_URL+"/addstorefront", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: storefront,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          // setTimeout(() => {  window.location.reload(true); }, 4000);    
                
          fetchx(API_URL+'/getstorefrontinfo?hotelID='+id)
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
            <h4>store front Added Successfully</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      storeID: "",
      Name: "",
      phone: "",
      imgURL:"",
      Type:null,

      billingaddress:"",
      gstno:"",


    });
  };

  return (
    <div>
    <Card>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'>Add Store Front</AccordionHeader>
        <AccordionBody accordionId='1'>
      <CardHeader>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="storeID">
              Store ID
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText> */}
              <Controller
                id="storeID"
                name="storeID"
                control={control}
                placeholder="hotel ID"
                render={({ field }) => (
                  <Cleave
                  
                    {...field}
                    pattern="[0-9]*" title="Only Numbers Allowed" required
                    placeholder="Enter Store ID"
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.storeID === null,
                    })}
                    value={4564}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="Name">
              Name
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.Name === null,
                })}
              ></InputGroupText> */}
              <Controller
                id="Name"
                name="Name"
                control={control}
                placeholder="Name"
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
                  placeholder="Enter Name"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.Name === null,
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
              {/* <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.phone=== null || !data.phone.length)
                })}
              >
                IND (+91)
              </InputGroupText> */}
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
          <div className="mb-1">
            <Label className="form-label" for="imgURL">
              Image
            </Label>
            <InputGroup className="input-group-merge">
              <Controller
                id="imgURL"
                name="imgURL"
                control={control}
                placeholder="imgURL"
                render={({ field }) => (
                  // <Cleave
                  <Input type="file" name="file" onChange={changeHandler} required/>
              //     type="file"
                  
              //     // pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
              //     placeholder="Enter Name"
              //     required
              //       {...field}
              //       className={classnames("form-control", {
              //         "is-invalid": data !== null && data.imgURL === null,
              //       })}
              //       onChange={changeHandler}
                  // />
                )}
              />
            </InputGroup>
            
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="Type">
            Type
            </Label>
            <Controller
              id="Type"
              control={control}
              name="Type"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={TypeOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.Type.value === null,
                  })}
                  {...field}
                  
                />
              )}
            />
          </div>
          </Col>
          
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="billingaddress">
            Billing Address
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.billingaddress === null || !data.billingaddress.length)
                })}
              ></InputGroupText> */}
              <Controller
                id="billingaddress"
                name="billingaddress"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                   pattern="[aA-zZ]*" title="Only Alphabets Allowed" required
                  placeholder="Enter Billing Address"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.billingaddress === null || !data.billingaddress.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="gstno">
            GST number
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.gstno === null || !data.gstno.length)
                })}
              ></InputGroupText> */}
              <Controller
                id="gstno"
                name="gstno"
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder="Enter GST number"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.gstno === null || !data.gstno.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>

          
          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit" >
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
      </AccordionBody>
      </AccordionItem>
      </Accordion>
    </Card>
    <Card>
    <div className="ag-theme-alpine" style={{ height: 520}}>
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
            // onGridReady={onGridReady}
            
            />
      </div>
      </Card>
    {/* <App/> */}
    </div>
  );
};

export default ValidationThirdPartyComponents;
