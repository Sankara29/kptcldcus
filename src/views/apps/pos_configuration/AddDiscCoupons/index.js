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
import { useRef, useEffect, useMemo, useCallback} from 'react';

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

// ** Reactstrap Imports
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const StoreOptions = [
  { value: "1", label: "24@43" },
  { value: "2", label: "Alloro" },
  { value: "3", label: "Banquet" },
  { value: "4", label: "East" },
  { value: "5", label: "IRD" },
  { value: "6", label: "Terminus" },

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
  Food: 0,
  Name: "",
  Liquor: 0,
  softDrinks:0,
  smokes:0,
  others:0,
  
};

let id=1;
const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();
	const [selectedFile, setSelectedFile] = useState();
// ** State
const [open, setOpen] = useState('1')

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
    {headerName: 'Food',field: 'Food'},
    {headerName: 'name',field: 'name'},
    {headerName: 'softDrinks',field: 'softDrinks'},
    {headerName: 'smokes',field: 'smokes'},
    {headerName: 'others',field: 'others'},

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
      data.Store.value !== null &&
      data.Food !== null &&
      data.Startdate !== null &&
      data.enddate !== null &&
      data.Name !== null &&
      data.Liquor !== null &&
      data.softDrinks!==null&&
      data.smokes!==null  &&
      data.others!==null   ) {
      let storefront = JSON.stringify({
       "storeID": data.Store.value,
        "food": data.Food,
        "name": data.Name,
        "liquor": data.Liquor,
        "softDrinks": data.softDrinks,
        "smokes": data.smokes,
        "others": data.others,
        "startDate"   : Moment(String(new Date(data.Startdate[0]))).format('YYYY-MM-DD'), 
        "endDate"   : Moment(String(new Date(data.enddate[0]))).format('YYYY-MM-DD') 

      });
      console.log(storefront);
      let res = fetchx(API_URL+"/adddisccoupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: storefront,
      }).then((res) => {
        console.log(res);

      });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Discount Coupons Added Successfully</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      Food: 0,
      Name: "",
      Liquor: 0,
      softDrinks:0,
      smokes:0,
      others:0,


    });
  };

  return (
    <div>
    <Card>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'>Add Discount Coupons</AccordionHeader>
        <AccordionBody accordionId='1'>
      <CardHeader>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="Store">
            Store
            </Label>
            <Controller
              id="Store"
              control={control}
              name="Store"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={StoreOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.Store.value === null,
                  })}
                  {...field}
                  
                />
              )}
            />
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
          <div className="mb-1">
            <Label className="form-label" for="Food">
              Food
            </Label>
            <InputGroup className="input-group-merge">
              <Controller
                id="Food"
                name="Food"
                control={control}
                render={({ field }) => (
                  <Cleave
                  
                    {...field}
                    pattern="[0-9]*" title="Only Numbers Allowed and should be less than 50" required 
                    options={{ numeral: true, numeralPositiveOnly: true, maxNum: 50 }}
                                        placeholder="Food Discount in percentage"
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.Food === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='Liquor'>
              Liquor
            </Label>
            <InputGroup className='input-group-merge'>
              <Controller
                id='Liquor'
                name='Liquor'
                control={control}
                render={({ field }) => (
                    <Cleave
                  
                    {...field}
                    pattern="[0-9]*" title="Only Numbers Allowed and should be less than 50" required 
                    options={{ numeral: true, numeralPositiveOnly: true, maxNum: 50 }}
                                        placeholder="Enter Store ID"
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.Liquor === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="softDrinks">
            soft Drinks
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.softDrinks === null || !data.softDrinks.length)
                })}
              ></InputGroupText> */}
              <Controller
                id="softDrinks"
                name="softDrinks"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed and should be less than 50" required 
                  options={{ numeral: true, numeralPositiveOnly: true, maxNum: 50 }}
                                    placeholder="Enter Billing Address"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && data.softDrinks === null 
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="smokes">
            Smokes
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.smokes === null || !data.smokes.length)
                })}
              ></InputGroupText> */}
              <Controller
                id="smokes"
                name="smokes"
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed and should be less than 50" required 
                  options={{ numeral: true, numeralPositiveOnly: true, maxNum: 50 }}
                                    placeholder="Enter GST number"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && data.smokes === null 
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="others">
            Others
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.others === null || !data.others.length)
                })}
              ></InputGroupText> */}
              <Controller
                id="others"
                name="others"
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed and should be less than 50" required 
                  options={{ numeral: true, numeralPositiveOnly: true, maxNum: 50 }}
                  placeholder="Enter GST number"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && data.others === null 
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>

          <div className='mb-1'>
            <Label className='form-label' for='Startdate'>
            Start date
            </Label>
            <Controller
              control={control}
              id='Startdate'
              name='Startdate'
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  required
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && (data.Startdate === null || data.Startdate==='')
                  })}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>

          <div className='mb-1'>
            <Label className='form-label' for='enddate'>
            End date
            </Label>
            <Controller
              control={control}
              id='enddate'
              name='enddate'
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  required
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && (data.enddate === null || data.enddate==='')
                  })}
                />
              )}
            />
          </div>
          </Col>
          
          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit" >
              Submit
            </Button>
            {/* <Button
              outline
              color="secondary"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </Button> */}
          </div>
          </Row>
        </Form>
      </CardBody>
      </AccordionBody>
      </AccordionItem>
      </Accordion>
    </Card>
    {/* <Card>
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
      </Card> */}
    {/* <App/> */}
    </div>
  );
};

export default ValidationThirdPartyComponents;
