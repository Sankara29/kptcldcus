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
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

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
  IRD: "",
  dineIn: "",
  takeAway: "",
  NC:"",
  OnlineOrders:""
};

let id=1;
const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();
// ** State
const [open, setOpen] = useState('0')

const toggle = id => {
  open === id ? setOpen() : setOpen(id)
}

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160,  },
    {headerName: 'Store ID',field: 'storeID',suppressSizeToFit: true},
    {headerName: 'IRD',field: 'IRD'},
    {headerName: 'dineIn',field: 'dineIn'},
    {headerName: 'takeAway',field: 'takeAway'},
    {headerName: 'NC',field: 'NC'},
    {headerName: 'IRD',field: 'IRD'},
    {headerName: 'onlineOrders',field: 'onlineOrders'},

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
    // console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    // console.log("Clicked")
    fetchx(API_URL+'/getordertype?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    // console.log(rowData['data'])
    })
  },[]);  

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    // console.log(data)
    if (
      data.storeID !== null &&
      data.IRD !== null &&
      data.dineIn !== null &&
      data.takeAway!==null&&
      data.NC !== null &&
      data.OnlineOrders !== null
          ) {
      // console.log(data);
      let createasset = JSON.stringify({
        "storeID": data.storeID,
        "IRD": data.IRD,
        "dineIn": data.dineIn,
        "takeAway": data.takeAway,
        "NC": data.NC,
        "onlineOrders": data.OnlineOrders,
      });
      // console.log(createasset);
      let res = fetchx(API_URL+"/addordertype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        // console.log(res);
        if(res['status']==200){
          // setTimeout(() => {  window.location.reload(true); }, 4000);          
          fetchx(API_URL+'/getordertype?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    // console.log(rowData['data'])
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
            <h4>Wait-List Added Successfully</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      storeID: "",
      IRD: "",
      dineIn: "",
      takeAway: "",
      NC:"",
      OnlineOrders:""
    });
  };

  return (
    <div>
    <Card>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'>Add Order Type</AccordionHeader>
        <AccordionBody accordionId='1'>
      {/* <CardHeader>
        <CardTitle tag="h4">Order Type</CardTitle>
      </CardHeader> */}
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="storeID">
              Store ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText>
              <Controller
                id="storeID"
                name="storeID"
                control={control}
                render={({ field }) => (
                  <Cleave
                    {...field}
                    pattern="[0-9]*" title="Only Numbers Allowed" required
                    placeholder="Enter Store ID"
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.storeID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="IRD">
            IRD
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.Name === null,
                })}
              ></InputGroupText>
              <Controller
                id="IRD"
                name="IRD"
                control={control}
                placeholder="IRD"
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
                  placeholder="Enter IRD"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.IRD === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          
         
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="dineIn">
            Dine In
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.dineIn === null || !data.dineIn.length)
                })}
              ></InputGroupText>
              <Controller
                id="dineIn"
                name="dineIn"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ]*" title="Only Alphabets Allowed" required
                  placeholder="dineIn"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.dineIn === null || !data.dineIn.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="takeAway">
            Take Away
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.takeAway === null || !data.takeAway.length)
                })}
              ></InputGroupText>
              <Controller
                id="takeAway"
                name="takeAway"
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ]*" title="Only Alphabets Allowed" required
                  placeholder="takeAway"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.takeAway === null || !data.takeAway.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="NC">
              NC
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText>
              <Controller
                id="NC"
                name="NC"
                control={control}
                placeholder="NC"
                render={({ field }) => (
                  <Cleave
                    {...field}
                    pattern="[aA-zZ]*" title="Only Alphabets Allowed" required
                    placeholder="Enter NC"
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.storeID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="OnlineOrders">
            Online Orders 
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.Name === null,
                })}
              ></InputGroupText>
              <Controller
                id="OnlineOrders"
                name="OnlineOrders"
                control={control}
                placeholder="OnlineOrders"
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
                  placeholder="Enter OnlineOrders"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.IRD === null,
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
