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
import API_URL from "../../../../config";


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

const ItemList = [
  { value: "Item1", label: "Item1" },
  { value: "Item2", label: "Item2" },
  { value: "Item3", label: "Item3" },

];
const Status = [
  { value: "Cancelled", label: "Cancelled" },
  { value: "Confirmed", label: "Confirmed" },
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
  orderID: "",
  tableID: "",
  itemList: "",
  Status:"",
  KOTnumber:""
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
    {headerName: 'tableID',field: 'tableID'},
    {headerName: 'itemList',field: 'itemList'},
    {headerName: 'status',field: 'status'},
    {headerName: 'kotNumber',field: 'kotNumber'},
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
    fetchx(API_URL+'/getKOTdata?hotelID='+id)
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
      data.tableID!==null &&
      data.itemList.value!==null&&
      data.Status.value!==null&&
      data.KOTnumber!==null


    ) {
      // console.log(data);
      let createasset = JSON.stringify({
        "storeID": data.storeID,
        "orderID": data.orderID,
        "tableID": data.tableID,
        "itemList": data.itemList.value,
        "status": data.Status.value,
        "kotNumber": data.KOTnumber,
      });
      // console.log(createasset);
      let res = fetchx(API_URL+"/addKOTdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        // console.log(res);
        if(res['status']==200){
          // setTimeout(() => {  window.location.reload(true); }, 4000);          
          fetchx(API_URL+'/getKOTdata?hotelID='+id)
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
      orderID: "",
      tableID: "",
      itemList: "",
      Status:"",
      KOTnumber:""

    });
  };

  return (
    <div>
    <Card>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'>Add KOT data</AccordionHeader>
        <AccordionBody accordionId='1'>
      {/* <CardHeader>
        <CardTitle tag="h4">KOT data
        </CardTitle>
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
            <Label className="form-label" for="itemList">
            Item List
            </Label>
            <Controller
              id="itemList"
              control={control}
              name="itemList"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={ItemList}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.itemList === null,
                  })}
                  {...field}
                  
                />
              )}
            />
          </div>
          </Col>


         
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="Status">
            Status
            </Label>
            <Controller
              id="Status"
              control={control}
              name="Status"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={Status}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.Status === null,
                  })}
                  {...field}
                  
                />
              )}
            />
          </div>
          </Col>

         
        
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="KOTnumber">
            KOT number
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.reservation === null || !data.reservation.length)
                })}
              ></InputGroupText> */}
              <Controller
                id="KOTnumber"
                name="KOTnumber"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" 
                                   placeholder="KOTnumber"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.KOTnumber === null || !data.KOTnumber.length)
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
