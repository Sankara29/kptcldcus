// ** React Imports
// import { Document, Page } from 'react-pdf';

import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check, Calendar } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Fragment } from 'react'
import { format } from "date-fns";
import React, { Component } from 'react';



// import App from "./waitListDataTable";
import Moment from 'moment';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
import logo from '@src/assets/images/logo/oterra.jpg';


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
  Col,
  Modal,
  CardText,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import API_URL from "../../../config";
import { width } from "@mui/system";


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

let LINK = ""
let id = 1;
const ValidationThirdPartyComponents = () => {
  let navigate = useNavigate();
  const [rowData, setRowData] = useState();
  const [ShowPDF, setShowPDF] = useState(false)
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewData, setPreviewData] = useState('');
  // ** State
  const [stayNotification, setStayNotification] = useState(false)
  const [openPreviewBill, setopenPreviewBill] = useState(false)
  // ** State
  const [data, setData] = useState(null);
  const [ShowPOSInvPDF, setShowPOSInvPDF] = useState('')
  const [InvURL, setInvURL] = useState([])


  const [open, setOpen] = useState('0')
  const [showIHGuestDataModal, setshowIHGuestDataModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flag, setFlag] = useState(false)
  const [ihGuestdata, setIHGuestdata] = useState([])



  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Booking Id', field: 'bookingID', suppressSizeToFit: true, maxWidth: 130 },
    { headerName: 'Status', field: 'reservationStatus', maxWidth: 120 },
    { headerName: 'Guest Name', field: 'guestName', maxWidth: 200 },
    { headerName: 'Arrival', field: 'arrivalDate', maxWidth: 120 },
    { headerName: 'Departure', field: 'departureDate', maxWidth: 120 },
    { headerName: 'Package', field: 'PackageDescription', maxWidth: 150 },
    { headerName: 'Company', field: 'accountName', maxWidth: 200 },
    {
      headerName: 'Room',
      cellRenderer: params => `${params.data.roomNumber} (${params.data.roomType})`,
      maxWidth: 150
    },
    {
      headerName: 'Adult + Child',
      cellRenderer: params => `${params.data.numberOfAdults} + ${params.data.numberOfChildren}`,
      maxWidth: 150
    },
    { headerName: 'Action', cellRendererFramework: (params) => { return (<Button color='primary' onClick={showIHGuestData}>View</Button>) }, suppressSizeToFit: true, maxWidth: 148 },




  ]);
  const showIHGuestData = () => {
    setshowIHGuestDataModal(true)
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

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
  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      autoHeight: true,
      wrapText: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ));


  useEffect(() => {

    fetchx(API_URL + `/getReservationForFrontDeskInHouseGuestPOS?hotelID=1`)
      .then(result => result.json())
      .then(data => {
        // console.log(data)
        setRowData(data['data'])
        setIHGuestdata(data['data'])
      })

  }, [])


  const cellClickedListener = useCallback((event) => {
    const clickedColumn = event.data;
    // console.log(clickedColumn)
    setIHGuestdata(event.data)
    // console.log('cellClicked', event);

  }, []);

  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({});


  return (
    <div>



      <Card>
        <CardHeader>
          <CardTitle tag="h4"><b>In-House Guest List</b></CardTitle>
        </CardHeader>
      </Card>

      {/* {flag == true && */}
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
      {/* } */}
      <Card>

        {/* {flag == true && */}

        <div className="ag-theme-alpine" style={{ height: 520 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            paginationAutoPageSize='true'
            paginationPageSize='10'
            pagination='true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
            onCellClicked={cellClickedListener}

          // onGridReady={onGridReady}

          />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        {/* } */}

      </Card>

      <Modal
        isOpen={showIHGuestDataModal}
        toggle={() => setshowIHGuestDataModal(false)}
        className='modal-dialog-centered'
        centered
        footer={null}
      >

        <ModalHeader className='modal-lg' >
        <h5 style={{ fontSize: '20px', fontWeight: 'bold'}}><b>Guest Details</b></h5>
        </ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>

          <div>
            <Row>
              <Col>
                <h5><b> Guest Name :       </b> {ihGuestdata.guestName}</h5>
                <h5><b> Arrival Date :       </b> {ihGuestdata.arrivalDate}</h5>
                <h5><b> Departure Date :     </b> {ihGuestdata.departureDate}</h5>
                <h5><b> Room :     </b> {ihGuestdata.roomNumber} ({ihGuestdata.roomType})</h5>
                <h5><b> Adult + Child :   </b> {ihGuestdata.numberOfAdults} + {ihGuestdata.numberOfChildren}</h5>
                <h5><b> Reservation Status :     </b> {ihGuestdata.reservationStatus}</h5>
                <h5><b> Company :     </b> {ihGuestdata.accountName}</h5>
                <h5><b> Comments :     </b> {ihGuestdata.comments}</h5>
              </Col>
            </Row>

          </div>




          <div align='end' className='buttons'>
            <Button outline className='me-1' color='secondary' onClick={() => setshowIHGuestDataModal(false)}>
              CANCEL
            </Button>
          </div>


          {/* </div> */}

        </ModalBody>

      </Modal>


    </div>

  );
};

export default ValidationThirdPartyComponents;
