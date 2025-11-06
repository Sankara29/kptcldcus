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
import API_URL from "../../../config";


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

const statusOptions = [
    { value: 'Enable', label: 'Enable' },
   { value: 'Disable', label: 'Disable' },
  ]

const defaultValues = {
  storeID: "",
  foodID: "",
  FoodType: "",
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

//  `hotelID`, `storeID`, `orderID`, `FolioNo`, `billNo`, `kotNo`, `tableNo`, `itemID`, `itemName`, `specialInstruction`, `breakCourse`, `qty`, `taxGroup`, `amount`, `classification`, `menuGroup`, `billStatus`, `orderStatus`, `pax`, `steward`, `addedPOSuser`, `modifiedPOSuser`, `sessionTime`, `addedTime`, `modifiedTime`, `reprintCount`, `reprintReason`, `modifyReason`, `prevTableNo`
  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'hotelID',field: 'hotelID',suppressSizeToFit: true,maxWidth: 100,  },
    {headerName: 'Store ID',field: 'storeID',suppressSizeToFit: true,maxWidth: 100,},
    {headerName: 'billNo',field: 'billNo',maxWidth: 100,},
    {headerName: 'FolioNo',field: 'FolioNo',maxWidth: 130,},
    {headerName: 'orderID',field: 'orderID',maxWidth: 100,},
    {headerName: 'kotNo',field: 'kotNo',maxWidth: 100,},
    {headerName: 'pax',field: 'pax',maxWidth: 100,},
    {headerName: 'tableNo',field: 'tableNo',maxWidth: 100,},
    {headerName: 'itemID',field: 'itemID',maxWidth: 100,},
    {headerName: 'itemName',field: 'itemName'},
    {headerName: 'specialInstruction',field: 'specialInstruction',maxWidth: 100,},
    {headerName: 'breakCourse',field: 'breakCourse',maxWidth: 120,},
    {headerName: 'qty',field: 'qty',maxWidth: 100,},
    {headerName: 'taxGroup',field: 'taxGroup',maxWidth: 120,},
    {headerName: 'amount',field: 'amount',maxWidth: 100,},
    {headerName: 'classification',field: 'classification',maxWidth: 100,},
    {headerName: 'menuGroup',field: 'menuGroup'},
    // {headerName: 'reason',field: 'reason',maxWidth: 100,},
    // {headerName: 'paymentBreakup',field: 'paymentBreakup',maxWidth: 100,},
    {headerName: 'addedTime',field: 'addedTime'},
    {headerName: 'reprintReason',field: 'reprintReason',maxWidth: 100,},
    {headerName: 'modifyReason',field: 'modifyReason',maxWidth: 100,},
    // {headerName: 'guestType',field: 'guestType',maxWidth: 100,},



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
      wrapText: true,
      filterParams :{
      buttons : ['apply','reset']
      }
    }
  ));

  const cellClickedListener = useCallback( event => {
    // console.log('cellClicked', event);
  }, []);

  useEffect(() => {


    fetchx(API_URL+"/getAllOrders", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hotelID: 1,
      })
    })
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    // console.log(rowData['data'])
    })
  },[]);  

  // ** State
  const [data, setData] = useState(null);

 
  return (
    <div>
    <h4>Orders</h4>
    <Card>
    

    <div className="ag-theme-alpine" style={{ height: 620}}>
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
