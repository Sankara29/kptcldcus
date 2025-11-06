
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
import Moment from 'moment';

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {Input,Card,Form,Label,Button,CardBody,CardTitle,CardHeader,InputGroup,InputGroupText,Row,Col
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import App from "./roomInventoryDataTable";
import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';// import './Assettable.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
const id='1'
const date='2023-02-02'
const roomID='30'

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];



const defaultValues = {
      roomID: "",
      numAvlRooms: "",
      numSellCtrlRooms: "",
      numOodRooms: "",
      numOverbookedRooms  : "",
      sellLimit: "",
      date: null,
      roomTypeID: "",
};


let roomTypeID = [
  fetchx(API_URL + '/getRoomInventoryRoomTypeID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      roomTypeID = resp['data']
      console.log(roomTypeID)
    })
  ]

const RoomInventory = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    // {headerName: 'Room ID',field: 'roomID'},
    {headerName: 'Inventory Date',field: 'date'},
    {headerName: 'KSUP',field: '0'},
    {headerName: 'TSUP',field: '1'},
    {headerName: 'KDLX',field: '2'},
    {headerName: 'TDLX',field: '3'},
    {headerName: 'KCLB',field: '4'},
    {headerName: 'TCLB',field: '5'},
    {headerName: 'EXE',field: '6'},


    // {headerName: 'Number of Avalable Rooms',field: 'numAvlRooms'},
    // {headerName: 'Number of Sell Control Rooms',field: 'numSellCtrlRooms'},
    // {headerName: 'Number of OOD Rooms',field: 'numOodRooms'},
    // {headerName: 'Number of Overbooked Rooms',field: 'numOverbookedRooms'},
    // {headerName: 'Sell Limit',field: 'sellLimit'},
    // {headerName: 'Room Type ID',field: 'roomTypeID',
    // headerValueGetter: function () {
    //   return roomTypeID;
    // }
    //  valueGetter: params => params.data.roomTypeID,
    // cellRendererFramework: params => {
    //   const { data } = params;
    //   const inventory_date = data.inventory_date;
    //   const numAvlRooms = data.numAvlRooms[inventory_date];
    //   return numAvlRooms;
    // }
    // },

  ]);
console.log(roomTypeID)
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
    fetchx(API_URL + '/getinventory?hotelID=1')
    .then(result => result.json())
    .then(rowData =>{
      // for(let i=0; i<10;i++){
      console.log(rowData['data'])
      let tabledata =[]
      let keylist = Object.keys(rowData['data'])
      // console.log(keylist)
      keylist.forEach(element =>{
        // console.log(rowData['data'][element]['roomtype'])
        // console.log(rowData['data'][element][0]['roomtype'])
        let myjson = {'date':rowData['data'][element]['date']}
        
        rowData['data'][element]['roomtype'].forEach((i,roomtype)=>{
             console.log(roomtype)
             myjson[roomtype] = rowData['data'][element]['roomcount'][i-1]
        })
        tabledata.push(myjson)
      })
console.log(tabledata)
setRowData(tabledata)
    }
    )
    
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
      data.roomID !== null &&
      data.numAvlRooms !== null &&
      data.numSellCtrlRooms &&
      data.numOodRooms!==null &&
      data.numOverbookedRooms !== null &&
      data.sellLimit !== null &&
      data.date !== null &&
      data.roomTypeID !== null
    ) {
      console.log(data);
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "roomID": data.roomID,
        "numAvlRooms": data.numAvlRooms,
        "numSellCtrlRooms": data.numSellCtrlRooms,
        "numOodRooms": data.numOodRooms,
        "numOverbookedRooms": data.numOverbookedRooms,
        "sellLimit": data.sellLimit,
        "date":(Moment(String(new Date(data.date[0]))).format('YYYY-MM-DD')),
        "roomTypeID": data.roomTypeID.value,
      });
      console.log(createasset);
      let res = fetchx(API_URL + "/addroominventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetchx(API_URL + '/getroominventory?hotelID='+id)
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
            <h4>Room Inventory Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      roomID: "",
      numAvlRooms: "",
      numSellCtrlRooms: "",
      numOodRooms: "",
      numOverbookedRooms  : "",
      sellLimit: "",
      date: null,
      roomTypeID: null,
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Room Inventory</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='6' sm='12' className='mb-1'>
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
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="roomID">
            Room ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.roomID === null || !data.roomID.length)
                })}
              ></InputGroupText>
              <Controller
                id="roomID"
                name="roomID"
                control={control}
                placeholder="Room ID"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.roomID === null || !data.roomID.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='numAvlRooms'>
            Number of Avalable Rooms
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.numAvlRooms=== null || !data.numAvlRooms.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='numAvlRooms'
                name='numAvlRooms'
                control={control}
                placeholder='numAvlRooms'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.numAvlRooms === null || !data.numAvlRooms.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='numSellCtrlRooms'>
            Number of Sell Control Rooms
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.numSellCtrlRooms=== null || !data.numSellCtrlRooms.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='numSellCtrlRooms'
                name='numSellCtrlRooms'
                control={control}
                placeholder='numSellCtrlRooms'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.numSellCtrlRooms === null || !data.numSellCtrlRooms.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='numOodRooms'>
            Number of OOD Rooms
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.numOodRooms=== null || !data.numOodRooms.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='numOodRooms'
                name='numOodRooms'
                control={control}
                placeholder='numOodRooms'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.numOodRooms === null || !data.numOodRooms.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='numOverbookedRooms'>
            Number of Overbooked Rooms
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.numOverbookedRooms=== null || !data.numOverbookedRooms.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='numOverbookedRooms'
                name='numOverbookedRooms'
                control={control}
                placeholder='1234567892'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.numOverbookedRooms === null || !data.numOverbookedRooms.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='sellLimit'>
            Sell Limit
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.sellLimit=== null || !data.sellLimit.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='sellLimit'
                name='sellLimit'
                control={control}
                placeholder='sellLimit'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.sellLimit === null || !data.sellLimit.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="date">
             Date
            </Label>
            <Controller
              control={control}
              id='date'
              name='date'
              render={({ field }) => (
                <Flatpickr
                required
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.date === null
                  })}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='roomTypeID'>
            Room Type ID
            </Label>
            <Controller
                    id='roomTypeID'
                    control={control}
                    name='roomTypeID'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={roomTypeID}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.roomTypeID === null })}
                        {...field}
                      />
                    )}
                  />
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
    {/* <App/> */}
    </div>
  );
};

export default RoomInventory;
