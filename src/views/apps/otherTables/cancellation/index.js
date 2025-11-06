// ** React Imports
import { useState } from "react";
import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import App from "./cancellationDataTable";
import Moment from "moment";

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
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import {useRef, useEffect, useMemo, useCallback} from 'react';
const id='1'


const reasonOptions = [
  { value: "Change of Plans", label: "Change of Plans" },
  { value: "Duplicate Booking", label: "Duplicate Booking" },
  { value: "Flight Cancelled", label: "Flight Cancelled" },
  { value: "General Cancellation", label: "General Cancellation" },
  { value: "Group Cancelled", label: "Group Cancelled" },
  { value: "Visa Issue", label: "Visa Issue" },
  { value: "Others", label: "Others" },
];

const cancellationOptions = [
  { value: "withPayment", label: "With Payment" },
  { value: "withoutPayment", label: "Without Payment" },
];


const defaultValues = {
      reservationID: "",
      groupReservationID: "",
      reasonCode: null,
      remarks: "",
      cancellationType: null,
      paymentTransaction: "",
      cancellationDate: null,
};

const Cancellation = () => {

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });


const [rowData, setRowData] = useState();

const gridRef = useRef();

const [columnDefs, setColumnDefs] = useState([
  {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
  {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
  {headerName: 'Reservation',field: 'reservation'},
  {headerName: 'Group Reservation',field: 'groupReservation'},
  {headerName: 'Reason Code',field: 'reasonCode'},
  {headerName: 'Remarks',field: 'remarks'},
  {headerName: 'Cancellation Type',field: 'cancellationType'},
  {headerName: 'Payment Transaction',field: 'paymentTransaction'},
  {headerName: 'Cancellation Date',field: 'cancellationDate'},
]);

const defaultColDef = useMemo( ()=> (
  {
    sortable: true, 
    filter: true,
    filterParams :{
    buttons : ['apply','reset']
    }
  }
));

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

const cellClickedListener = useCallback( event => {
  console.log('cellClicked', event);
}, []);

useEffect(() => {
  fetchx(API_URL + '/getcancellation?hotelID='+id)
  .then(result => result.json())
  .then(rowData => {setRowData(rowData['data'])
  console.log(rowData['data'])
  })
}, []);

  const onSubmit = (data) => {
    setData(data);
    if (
      data.reservationID!==null &&
      data.groupReservationID!==null&&
      data.reasonCode!==null &&
      data.remarks!==null &&
      data.paymentTransaction!==null &&
      data.cancellationType !== null &&
      data.cancellationDate !== null
    ) {
      console.log(data);
      let createcancellation = JSON.stringify({
        "reservation": data.reservationID,
        "groupReservation": data.groupReservationID,
        "reasonCode": data.reasonCode.value,
        "remarks": data.remarks,
        "cancellationType": data.cancellationType.value,
        "paymentTransaction": data.paymentTransaction,
        "cancellationDate": (Moment(String(new Date(data.cancellationDate[0]))).format('YYYY-MM-DD')),
      });


      console.log(createcancellation);
      let res = fetchx(API_URL + "/addcancellation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createcancellation,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetchx(API_URL + '/getcancellation?hotelID='+id)
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
            <h4>Cancellation Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      reservationID: "",
      groupReservationID: "",
      reasonCode: null,
      remarks: "",
      cancellationType: null,
      paymentTransaction: "",
      cancellationDate: null,
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Cancellation</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="reservationID">
            Reservation ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.reservationID === null || !data.reservationID.length)
                })}
              ></InputGroupText>
              <Controller
                id="reservationID"
                name="reservationID"
                control={control}
                placeholder="Reservation ID"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.reservationID === null || !data.reservationID.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="groupReservationID">
              Group Reservation ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.name === null || !data.groupReservationID.length)
                })}
              ></InputGroupText>
              <Controller
                id="groupReservationID"
                name="groupReservationID"
                control={control}
                placeholder="Group Reservation ID"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.groupReservationID === null || !data.groupReservationID.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="reasonCode">
            Reason Code
            </Label>
            <Controller
              id="reasonCode"
              control={control}
              name="reasonCode"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={reasonOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select ", {
                    "is-invalid": data !== null && data.reasonCode === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='remarks'>
            Remarks
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='remarks'
              name='remarks'
              render={({ field }) => <Input type='text' required className={classnames({
                "is-invalid": data !== null && (data.remarks === null || !data.remarks.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
         
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="cancellationType">
            Cancellation Type
            </Label>
            <Controller
              id="cancellationType"
              control={control}
              name="cancellationType"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={cancellationOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select ", {
                    "is-invalid": data !== null && data.cancellationType === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="paymentTransaction">
            Payment Transaction
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.paymentTransaction === null   || !data.paymentTransaction.length),
                })}
              ></InputGroupText>
              <Controller
                id="paymentTransaction"
                name="paymentTransaction"
                control={control}
                placeholder="Payment Transaction"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.paymentTransaction === null  || !data.paymentTransaction.length),
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="cancellationDate">
            Cancellation Date
            </Label>
            <Controller
              control={control}
              id='cancellationDate'
              name='cancellationDate'
              render={({ field }) => (
                <Flatpickr
                required
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.cancellationDate === null
                  })}
                />
              )}
            />
          </div>
          </Col>
          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit">
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
    <App/>
    </div>
  );
};

export default Cancellation;
