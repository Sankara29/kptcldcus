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
import { useRef, useEffect, useMemo, useCallback} from 'react';

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

const FoodTypeOptions = [
  { value: "Created", label: "Created" },
  { value: "Settled", label: "Settled" },


];
const OrderTypeOptions = [
  { value: "IRD", label: "IRD" },
  { value: "Dine-in", label: "Dine-in" },
  { value: "Take Away", label: "Take Away" },
  { value: "NC", label: "NC" },
  { value: "Online Orders", label: "Online Orders" },


];

const CreatedByOptions = [
  { value: "217", label: "217" },
  { value: "543", label: "543" },

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

const statusOptions = [
    { value: 'Enable', label: 'Enable' },
   { value: 'Disable', label: 'Disable' },
  ]

const defaultValues = {
  storeID: "",
  orderID:"",
  orderType:"",
  tableID:"",
  createdBy:"",
  orderStatus:"",
  noOfPeople:""
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
    {headerName: 'orderID',field: 'orderID'},
    {headerName: 'orderType',field: 'orderType'},
    {headerName: 'tableID',field: 'tableID'},
    {headerName: 'createdBy',field: 'createdBy'},
    {headerName: 'orderStatus',field: 'orderStatus'},
    {headerName: 'noOfPeople',field: 'noOfPeople'},


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
    fetchx(API_URL+'/getorders?hotelID='+id)
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
      data.orderID !== null &&
      data.orderType.value !== null &&
      data.tableID!==null&&
      data.createdBy.value !== null &&
      data.orderStatus.value !== null &&
      data.noOfPeople!==null
    ) {
      // console.log(data);
      let Orders = JSON.stringify({
        "storeID": data.storeID,
        "orderID": data.orderID,
        "orderType": data.orderType.value,

        "tableID": data.tableID,
        "createdBy": data.createdBy.value,
        "orderStatus": data.orderStatus.value,
        "noOfPeople": data.noOfPeople,
      });
      // console.log(Orders);
      let res = fetchx(API_URL+"/addorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: Orders,
      }).then((res) => {
        // console.log(res);
        if(res['status']==200){
          // setTimeout(() => {  window.location.reload(true); }, 4000);          
          fetchx(API_URL+'/getorders?hotelID='+id)
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
      orderID:"",
      orderType:"",
      tableID:"",
      createdBy:"",
      orderStatus:"",
      noOfPeople:""
    });
  };

  return (
    <div>
    <Card>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'>Add Orders</AccordionHeader>
        <AccordionBody accordionId='1'>
      {/* <CardHeader>
        <CardTitle tag="h4">Orders</CardTitle>
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
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="orderID">
            order ID
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.menuGroup === null,
                })}
              ></InputGroupText> */}
              <Controller
                id="orderID"
                name="orderID"
                control={control}
                placeholder="orderID"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed"
                  placeholder="Enter orderID"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.orderID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>


          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="orderType">
            Order Type
            </Label>
            <Controller
              id="orderType"
              control={control}
              name="orderType"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={OrderTypeOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.orderType === null,
                  })}
                  {...field}
                  
                />
              )}
            />
          </div>
          </Col>

          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="tableID">
            Table ID
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.menuGroup === null,
                })}
              ></InputGroupText> */}
              <Controller
                id="tableID"
                name="tableID"
                control={control}
                placeholder="tableID"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed"
                  placeholder="Enter tableID"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.tableID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>


          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="createdBy">
            Created By
            </Label>
            <Controller
              id="createdBy"
              control={control}
              name="createdBy"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={CreatedByOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.createdBy === null,
                  })}
                  {...field}
                  
                />
              )}
            />
          </div>
          </Col>

         
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="orderStatus">
            Order Status
            </Label>
            <Controller
              id="orderStatus"
              control={control}
              name="orderStatus"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={FoodTypeOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.orderStatus === null,
                  })}
                  {...field}
                  
                />
              )}
            />
          </div>
          </Col>

         
        
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="noOfPeople">
            No of People
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.reservation === null || !data.reservation.length)
                })}
              ></InputGroupText> */}
              <Controller
                id="noOfPeople"
                name="noOfPeople"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed"
                                   placeholder="noOfPeople"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.noOfPeople === null || !data.noOfPeople.length)
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
