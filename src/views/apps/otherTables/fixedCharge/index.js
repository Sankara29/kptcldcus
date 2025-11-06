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
import App from "./fixedChargeDataTable";
import Moment from 'moment'

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
import { useRef, useEffect, useMemo, useCallback} from 'react';
const id = '1';


const frequencyOptions = [
  { value: "Once", label: "Once" },
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Yearly", label: "Yearly" },
];



const defaultValues = {
      reservation: "",
      guestProfileID: "",
      frequency: null,
      beginDate: null,
      endDate  : null,
      transactionCode: "",
      amount: "",
      quantity: "",
      supplement: "",

};

const FixedCharge = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Reservation ID',field: 'reservation'},
    {headerName: 'Guest Profile ID',field: 'guestProfileID'},
    {headerName: 'Frequency',field: 'frequency',suppressSizeToFit: true},
    {headerName: 'Start Date',field: 'beginDate'},
    {headerName: 'End Date',field: 'endDate'},
    {headerName: 'Transaction Code',field: 'transactionCode',suppressSizeToFit: true},
    {headerName: 'Amount',field: 'amount'},
    {headerName: 'Quantity',field: 'quantity'},
    {headerName: 'Supplement',field: 'supplement'},
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

  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetchx(API_URL + '/getfixedCharge?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  }, []); 



  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    if (
      // data.hotelID !== null &&
      data.reservation !== null &&
      data.guestProfileID !== null &&
      data.frequency !== null &&
      data.beginDate!==null &&
      data.endDate !== null &&
      data.transactionCode !== null &&
      data.amount !== null &&
      data.quantity !== null &&
      data.supplement !== null
    ) {
      console.log(data);
      let createFixedCharge = JSON.stringify({
        // "hotelID": data.hotelID,
        "reservation": data.reservation,
        "guestProfileID": data.guestProfileID,
        "frequency": data.frequency.value,
        "beginDate": (Moment(String(new Date(data.beginDate[0]))).format('YYYY-MM-DD')),
        "endDate": (Moment(String(new Date(data.endDate[0]))).format('YYYY-MM-DD')) ,
        "transactionCode": data.transactionCode,
        "amount": data.amount,
        "quantity": data.quantity,
        "supplement": data.supplement,

      });
      console.log(createFixedCharge);
      let res = fetchx(API_URL + "/addfixedcharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createFixedCharge,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetchx(API_URL + '/getfixedcharge?hotelID='+id)
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
            <h4>Fixed Charge Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      reservation: "",
      guestProfileID: "",
      frequency: null,
      beginDate: null,
      endDate  : null,
      transactionCode: "",
      amount: "",
      quantity: "",
      supplement: "",
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Fixed Charge</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="hotelID">
              Hotel ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText>
              <Controller
                id="hotelID"
                name="hotelID"
                control={control}
                placeholder="hotel ID"
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.hotelID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="reservation">
            Reservation ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.reservation === null || !data.reservation.length)
                })}
              ></InputGroupText>
              <Controller
                id="reservation"
                name="reservation"
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder="Reservation ID"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.reservation === null || !data.reservation.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='guestProfileID'>
            Guest Profile ID
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.guestProfileID=== null || !data.guestProfileID.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='guestProfileID'
                name='guestProfileID'
                control={control}
                placeholder='guestProfileID'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.guestProfileID === null || !data.guestProfileID.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="frequency">
            Frequency
            </Label>
            <Controller
              id="frequency"
              control={control}
              name="frequency"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={frequencyOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.frequency === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="beginDate">
            Start Date
            </Label>
            <Controller
              control={control}
              id='beginDate'
              name='beginDate'
              render={({ field }) => (
                <Flatpickr
                required
                  placeholder='YYYY-MM-DD'
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.beginDate === null
                  })}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="endDate">
            End Date
            </Label>
            <Controller
              control={control}
              id='endDate'
              name='endDate'
              render={({ field }) => (
                <Flatpickr
                required
                  placeholder='YYYY-MM-DD'
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.endDate === null
                  })}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='transactionCode'>
            Transaction Code
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.transactionCode=== null || !data.transactionCode.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='transactionCode'
                name='transactionCode'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder='Transaction Code'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.transactionCode === null || !data.transactionCode.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='amount'>
            Amount
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.amount=== null || !data.amount.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='amount'
                name='amount'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder='Amount'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.amount === null || !data.amount.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='quantity'>
            Quantity
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.quantity=== null || !data.quantity.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='quantity'
                name='quantity'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder='Quantity'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.quantity === null || !data.quantity.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='supplement'>
            Supplement
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.supplement=== null  || !data.supplement.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='supplement'
                name='supplement'
                control={control}
                render={({ field }) => (
                  <Cleave
                  type='text' required
                  placeholder='Supplement'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.supplement === null  || !data.supplement.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
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
          </Col>
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
            // paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
    </Card>
    {/* <App/> */}
    </div>
  );
};

export default FixedCharge;
