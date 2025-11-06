// ** React Imports
// import { Document, Page } from 'react-pdf';
import { useState } from "react";
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
// ** Custom Components
import Avatar from "@components/avatar";
// ** Utils
import { selectThemeColors } from "@utils";
// ** Third Party Components
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
  const [stayNotification, setStayNotification] = useState(false)
  const [data, setData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [flag, setFlag] = useState(false)
  const [open, setOpen] = useState('0')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Order No', field: 'orderID', maxWidth: 120 },
    { headerName: 'Table No', field: 'tableNo', maxWidth: 120 },
    { headerName: 'Pax', field: 'pax', maxWidth: 120 },
    { headerName: 'Date Time', field: 'createdAt', maxWidth: 200 },
    { headerName: 'OrderType', field: 'orderType', headerClass: "text-center", maxWidth: 200 },
    { headerName: 'KOT Status', field: 'status', maxWidth: 200 },
    { headerName: 'Steward', field: 'createdBy', maxWidth: 200 },
    { headerName: 'Guest Type', field: 'guestType', maxWidth: 200 },
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
      // columnSpacing: 10,
    },
  };
  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      wrapText: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ));

  const [Today, setToday] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchx(API_URL + "/getBusinessDatePOS", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hotelID: 1 })
    })
      .then((res) => res.json())
      .then(postres => {
        const businessDate = postres.data[0].businessDate;
        // console.log(businessDate)
        setToday(businessDate);
        setSelectedDate(businessDate);
      })
      .catch(error => {
        console.error("Error fetching business date:", error);
      });
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const handleDateChange = (selectedDates) => {
    if (selectedDates.length > 0) {
      const formattedDate = formatDate(new Date(selectedDates[0]));
      // console.log(formattedDate)
      setSelectedDate(formattedDate);
    }
  };


  const fetchData = (date) => {

    if (date) {
      const storeID = localStorage.getItem('storeID');
      // fetchx(API_URL + `/getrunningKOTs?hotelID=1&storeID=`)
      fetchx(API_URL + '/getAllOrdersByDate?hotelID=1&storeID=' + storeID + '&dateTime=' + date)

        .then(result => result.json())
        .then(data => {
          // console.log(data['data'])
          setRowData(data['data'])
        })
        .catch(error => {
          setRowData([]);
        });
    }
  };


  // useEffect(() => {

  //   fetchx(API_URL + `/getrunningKOTs?hotelID=1&storeID=1`)
  //   .then(result => result.json())
  //   .then(data => {
  //     console.log(data)
  //     setRowData(data['data'])
  //   })

  //   },[])
  const onSubmit1 = () => {
    setIsSubmitted(true);
    setFlag(true)
    fetchData(selectedDate);
  };

  useEffect(() => {
    if (isSubmitted && selectedDate) {
      fetchData(selectedDate);
      setIsSubmitted(false);
    }
  }, [isSubmitted, selectedDate]);

  const showPaymentPage = () => {
    // console.log("Hi")
    setShowConfirmationModal(true)
  }

  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({});


  
  return (
    // <div>
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag="h4"><b>Orders</b></CardTitle>
        </CardHeader>
      </Card>
      <Row>
          <Col md='4' sm='12' className='mb-1'>

            <div className='mb-1'>
              <Label className='form-label' for='Date'>
                Date
              </Label>
              <Controller
                control={control}
                id='Date'
                name='Date'
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    required
                     value={selectedDate}
              onChange={handleDateChange}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.Date === null || data.Date === '')
                    })}
                  />
                )}
              />
            </div>
          </Col>
          <Col md='4' sm='12'>
          <Button style={{ marginTop: '22px' }} type='submit' color='primary' onClick={handleSubmit(onSubmit1)}>
              Submit
            </Button>
          </Col>
        </Row>

        {flag == true &&
        <div className="ag-theme-alpine" style={{ height: 520 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            // onCellClicked={cellClickedListener}
            paginationAutoPageSize='true'
            paginationPageSize='10'
            pagination='true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
          // onGridReady={onGridReady}
          />
        </div>
        }            
    </div>

  );
};

export default ValidationThirdPartyComponents;
