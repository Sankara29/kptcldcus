
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
import App from "./roomInventoryforecastDataTable";
import Moment from "moment";

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
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import './Assettable.css';
import {useRef, useEffect, useMemo, useCallback} from 'react';
let id=1;


const defaultValues = {
    roomType: "",
    date: null,
    noOfUnits	: "",
};





let roomTypeID = [
  fetchx(API_URL + '/getRoomInventorytForecastRoomTypeID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      roomTypeID = resp['data']
      console.log(roomTypeID)
    })
  ]
  

const RoomInventoryForecast = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160,  },
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Room Type',field: 'roomType'},
    {headerName: 'Date',field: 'date', suppressSizeToFit: true, maxWidth: 500},
    {headerName: 'Number Of Units',field: 'noOfUnits'},

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
    fetchx(API_URL + '/getroominventoryforecast?hotelID'+id)
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
    if (
      data.roomType !== null &&
      data.date !== null &&
      data.noOfUnits !==null
    )
     {
      console.log(data);
      let createRoomInventoryForecast = JSON.stringify({
        "roomType": data.roomType.value,
        "date": (Moment(String(new Date(data.date[0]))).format('YYYY-MM-DD')),
        "noOfUnits": data.noOfUnits
      });
      console.log(createRoomInventoryForecast);
      let res = fetchx(API_URL + "/addroominventoryforecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createRoomInventoryForecast,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetchx(API_URL + '/getroominventoryforecast?hotelID='+id)
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
            <h4>Room Inventory Forecast Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      roomType: null,
      date: null,
      noOfUnits	: "",
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Room Inventory Forecast</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='roomType'>
              Room Type
            </Label>
            <Controller
                    id='roomType'
                    control={control}
                    name='roomType'
                    render={({ field }) => (
                      <Select
                      required
                        isClearable
                        options={roomTypeID}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.roomType === null })}
                        {...field}
                      />
                    )}
                  />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="date">
            Date
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.date === null
                })}
              ></InputGroupText>
              <Controller
                id="date"
                name="date"
                control={control}
                render={({ field }) => (
                  <Flatpickr
                  required
                  placeholder="YYYY-MM-DD"
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.date === null
                  })}
                />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='noOfUnits'>
              Number of Units
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.noOfUnits=== null || !data.noOfUnits.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='noOfUnits'
                name='noOfUnits'
                control={control}
                placeholder='Number of Units'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.noOfUnits === null || !data.noOfUnits.length)
                    })}
                  />
                )}
              />
            </InputGroup>
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

export default RoomInventoryForecast;
