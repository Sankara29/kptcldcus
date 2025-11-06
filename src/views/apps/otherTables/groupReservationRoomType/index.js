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
import App from "./groupReservationDataTable";

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
const id = '1';


const defaultValues = {
      groupReservation: "",
      roomType: "",
      rateCode: "",
      rateAmount: "",
      numberOfRooms  : "",
      numberOfPickedRooms: "",

};






const groupReservationRoomType = () => {


  // Ag Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Group Reservation',field: 'groupReservation'},
    {headerName: 'Room Type',field: 'roomType'},
    {headerName: 'Rate Code',field: 'rateCode',suppressSizeToFit: true},
    {headerName: 'Rate Amount',field: 'rateAmount'},
    {headerName: 'NumbeOf Rooms',field: 'numberOfRooms'},
    {headerName: 'Number Of Picked Rooms',field: 'numberOfPickedRooms',suppressSizeToFit: true},
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
    fetchx(API_URL + '/getgroupreservationroomtype?hotelID='+id)
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


// Submit Function
  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    if (
      // data.hotelID !== null &&
      
      data.groupReservation !== null &&
      data.roomType !== null &&
      data.rateCode !== null &&
      data.rateAmount!==null &&
      data.numberOfRooms !== null &&
      data.numberOfPickedRooms !== null
    ) {
      console.log(data);
      let createGroupReservationRoomType = JSON.stringify({
        // "hotelID": data.hotelID,
        "groupReservation": data.groupReservation,
        "roomType": data.roomType,
        "rateCode": data.rateCode,
        "rateAmount": data.rateAmount,
        "numberOfRooms": data.numberOfRooms ,
        "numberOfPickedRooms": data.numberOfPickedRooms,

      });
      console.log(createGroupReservationRoomType);
      let res = fetchx(API_URL + "/addgroupreservationroomtype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createGroupReservationRoomType,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetchx(API_URL + '/getgroupreservationroomtype?hotelID='+id)
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
            <h4>Group Reservation Room Type Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      groupReservation: "",
      roomType: "",
      rateCode: "",
      rateAmount: "",
      numberOfRooms  : "",
      numberOfPickedRooms: "",
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Group Reservation Room Type</CardTitle>
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
            <Label className="form-label" for="groupReservation">
            Group Reservation ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.groupReservation === null || !data.groupReservation.length)
                })}
              ></InputGroupText>
              <Controller
                id="groupReservation"
                name="groupReservation"
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder="Group Reservation ID"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.groupReservation === null || !data.groupReservation.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='roomType'>
            Room Type
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.roomType=== null || !data.roomType.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='roomType'
                name='roomType'
                control={control}
                placeholder='guestProfileID'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.roomType === null || !data.roomType.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='rateCode'>
            Rate Code
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.rateCode=== null || !data.rateCode.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='rateCode'
                name='rateCode'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder='Rate Code'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.rateCode === null || !data.rateCode.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='rateAmount'>
            Rate Amount
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.rateAmount=== null || !data.rateAmount.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='rateAmount'
                name='rateAmount'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder='Rate Amount'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.rateAmount === null || !data.rateAmount.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='numberOfRooms'>
            Number of Rooms
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.numberOfRooms=== null || !data.numberOfRooms.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='numberOfRooms'
                name='numberOfRooms'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder='Number Of Rooms'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.numberOfRooms === null || !data.numberOfRooms.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='numberOfPickedRooms'>
            Number of Picked Rooms
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.numberOfPickedRooms=== null  || !data.numberOfPickedRooms.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='numberOfPickedRooms'
                name='numberOfPickedRooms'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder='Number Of Picked Rooms'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.numberOfPickedRooms === null  || !data.numberOfPickedRooms.length)
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

export default groupReservationRoomType;
