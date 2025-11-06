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
import withReactContent from 'sweetalert2-react-content'

import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


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
import 'ag-grid-enterprise';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

const SessionOptions = [
  { value: "Lunch", label: "Lunch" },
  { value: "Breakfast", label: "Breakfast" },
  { value: "Dinner", label: "Dinner" },

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



const defaultValues = {
  storeID: "",
  sessionName: "",
  status: "",
};

const colourOptions = [
  { value: 'Enable', label: 'Enable' },
  { value: 'Disable', label: 'Disable' },
]


let id = 1;
const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();
  // ** State
  const [open, setOpen] = useState('0')
  const [updatedrowData, setupdatedRowData] = useState([]);
  const [showsavebtn,setshowsavebtn] = useState(false)
  const [showPrevbtn,setshowPrevbtn] = useState(false)



const MySwal = withReactContent(Swal)
let navigate = useNavigate();


  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id', suppressSizeToFit: true, maxWidth: 160, },
    { headerName: 'Store ID', field: 'storeID', suppressSizeToFit: true },
    { headerName: 'Store Name', field: 'restaurantName', suppressSizeToFit: true },
    { headerName: 'Session Name', field: 'sessionName' },
    { headerName: 'Session startTime', field: 'startTime', suppressSizeToFit: true ,editable: true},
    { headerName: 'Session endTime', field: 'endTime', suppressSizeToFit: true,editable: true },
    // {headerName: 'status',field: 'status'},

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
  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ));

  const cellClickedListener = useCallback(event => {
    // console.log('cellClicked', event);
  }, []);


  const updatedRowsList = []

  const onCellValueChanged = useCallback( event => {
    // console.log('onCellValueChanged', event);
    updatedRowsList[event.data.id] = event.data
    // updatedRowsList[1] = event.data
    setupdatedRowData(updatedRowsList);

     
    // console.log(updatedRowsList)
          // console.log(updatedrowData[i])
       
  }, []);


  useEffect(() => {
    // console.log("Clicked")
    fetchx(API_URL + '/getSessionDetails?hotelID=' + id)
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
        // console.log(rowData['data'])
      })
  }, []);

  function ReloadTable() {
    // console.log("updatedrowData")
    // console.log(updatedrowData)
    // console.log("updatedrowData:", updatedrowData);
    // console.log("rowData before setRowData:", rowData);
    setRowData(updatedrowData)
    // console.log(rowData)
    setshowsavebtn(true)
    setshowPrevbtn(true)
  }


  function handlePreviewChanges () {
    updatedrowData.forEach(data => {
      // console.log(data)
    const updateditem = JSON.stringify({
      "hotelID":data['hotelID'],
      "storeID":data['storeID'],
      "sessionName":data['sessionName'],
      "startTime":data['startTime'],
      "endTime":data['endTime'],
      "id":data['id']
    })
   

    // console.log(updateditem)
    fetchx(API_URL+'/updateSessionDetails', {
  method: 'PUT',
  body: updateditem,
  headers: {
     'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then((post) => {
      // console.log(post)
      if(post['statusCode'] == 200) {
        const swalInstance = MySwal.fire({
          text: 'Session Details updated Successfully!',
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Close',
          allowOutsideClick: false,
          customClass: {
              confirmButton: 'btn btn-danger'
          }
      });

      swalInstance.then((result) => {
          if (result.isConfirmed) {
              navigate('');
          }
      });
      }
  })
  .catch((err) => {
     console.log(err.message);
  });
  
})

  }
  function handlePrevbtn () {
    navigate('');
  }
  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    // console.log(data)
    if (
      data.storeID !== null &&
      data.sessionName !== null &&
      // data.status.value !== null
      data.startTime !== null &&
      data.endTime !== null 
    ) {
      // console.log(data);
      let createasset = JSON.stringify({
        "hotelID" : 1,
        "storeID": data.storeID.value,
        "sessionName": data.sessionName,
        "status": "created",
        "startTime" : data.startTime,
        "endTime" : data.endTime,
      });
      // console.log(createasset);
      let res = fetchx(API_URL + "/addsession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        // console.log(res);
        if (res['status'] == 200) {

          const swalInstance = MySwal.fire({
            text: "Session Details Added Successfully",
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });

          swalInstance.then((result) => {
            if (result.isConfirmed) {
                navigate('')
            //   setpaymentInfoModal(false)
            fetchx(API_URL + '/getSessionDetails?hotelID=' + id)
            .then(result => result.json())
            .then(rowData => {
              setRowData(rowData['data'])
              // console.log(rowData['data'])
            })
            }
          });

         
        }
      });
      
    }
  };

  const handleReset = () => {
    reset({
      storeID: "",
      sessionName: "",
      status: "",
    });
  };

  const storeOptions = JSON.parse(sessionStorage.getItem('storeOptions'));
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);
  return (
    <div>
      <Card>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId='1'>Add Sessions</AccordionHeader>
            <AccordionBody accordionId='1'>
              {/* <CardHeader>
        <CardTitle tag="h4"> Sessions </CardTitle>
      </CardHeader> */}
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col md="4" sm="12" className="mb-1">
                      <div className="mb-1">
                        <Label className="form-label" for="storeID">
                          store Name <spam style={{ color: "red" }}>*</spam>
                        </Label>
                        <Controller
                          id="storeID"
                          control={control}
                          name="storeID"
                          render={({ field }) => (
                            <Select
                              isClearable
                              // defaultValue={defaultStatus2}
                              // options={sessionStorage.getItem('storeOptions')}
                              options={storeOptions}
                              classNamePrefix="select"
                              theme={selectThemeColors}
                              className={classnames("react-select",)}
                              {...field}
                            // onChange={handleChange1}
                            />
                          )}
                        />
                      </div>
                    </Col>

                    {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="sessionName">
            Session Name
            </Label>
            <Controller
              id="sessionName"
              control={control}
              name="sessionName"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={SessionOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.sessionName === null,
                  })}
                  {...field}
                  
                />
              )}
            />
          </div>
          </Col> */}
                    <Col md='4' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="sessionName">
                          Session Name
                        </Label>
                       
                          <Controller
                            id="sessionName"
                            name="sessionName"
                            control={control}
                            placeholder="sessionName"
                            render={({ field }) => (
                              <Cleave
                                pattern="[aA-zZ]*" title="Only Alphabets Allowed"
                                placeholder="Enter sessionName"
                                required
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid": data !== null && data.sessionName === null,
                                })}
                              />
                            )}
                          />
                      </div>
                    </Col>
                    <Col md="4" sm="8">
                      <div className="mb-1">
                        <Label className="form-label" for="startTime">
                          Session StartTime <spam style={{ color: "red" }}>*</spam>
                        </Label>
                        <Controller
                          // defaultValue=''
                          control={control}
                          id="startTime"
                          name="startTime"
                          render={({ field }) => (
                            <Input
                              required
                              type="time"
                              placeholder="ETD"
                              invalid={errors.startTime && true}
                              // defaultValue={details.pickUpTime}
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    <Col md="4" sm="8">
                      <div className="mb-1">
                        <Label className="form-label" for="endTime">
                          Session Endtime <spam style={{ color: "red" }}>*</spam>
                        </Label>
                        <Controller
                          // defaultValue=''
                          control={control}
                          id="endTime"
                          name="endTime"
                          render={({ field }) => (
                            <Input
                              required
                              type="time"
                              placeholder="ETD"
                              invalid={errors.endTime && true}
                              // defaultValue={details.pickUpTime}
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </Col>


                    {/* 
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="timings">
              Timings
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText>
              <Controller
                id="timings"
                name="timings"
                control={control}
                placeholder="timings"
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ0-9]*" title="Special Characters are not Allowed" 
                  placeholder="Enter timings"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.sessionName === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}

                    {/* <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='status'>
                  Status
                </Label>
                <Controller
                  id='status'
                  control={control}
                  name='status'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={colourOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.ReactSelect === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col> */}




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
      <Row>
          {/* <Col sm='12'> */}
          {/* <div className='inline-spacing' align="right" style={{ margin: '2px 0' }}> */}
            {/* <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='primary' size='sm' onClick={onBtnExport} >Download CSV file</Button.Ripple> */}
            {/* <Button.Ripple color='primary' size='sm' onClick={Gulbarga}>Gulbarga</Button.Ripple>
            <Button.Ripple color='primary' size='sm' onClick={Bangalore}>Blr</Button.Ripple>
            <Button.Ripple color='primary' size='sm' onClick={Testnode}>Test Nodes</Button.Ripple> */}
            {/* <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} disabled={updatedrowData.length==0} color='primary' size='sm' onClick={ReloadTable} >Preview Changes</Button.Ripple> */}
           {/* {showsavebtn && <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='primary' size='sm' onClick={handlePreviewChanges} >Save</Button.Ripple>} */}
           {/* {showPrevbtn && <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='primary' size='sm' onClick={handlePrevbtn} >Back</Button.Ripple>} */}

            
          {/* </div> */}
          {/* </Col> */}
          <div>
    <div className="d-flex align-items-center justify-content-between">
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
      <Col sm="auto">
        <div className="inline-spacing" align="right" style={{ margin: '2px 0' }}>
          <Button.Ripple
            style={{ 'margin-right': '10px', 'margin-bottom': '10px' }}
            disabled={updatedrowData.length === 0}
            color="primary"
            size="sm"
            onClick={ReloadTable}
          >
            Preview Changes
          </Button.Ripple>
          {showsavebtn && (
            <Button.Ripple
              style={{ 'margin-right': '10px', 'margin-bottom': '10px' }}
              color="primary"
              size="sm"
              onClick={handlePreviewChanges}
            >
              Save
            </Button.Ripple>
          )}
          {showPrevbtn && (
            <Button.Ripple
              style={{ 'margin-right': '10px', 'margin-bottom': '10px' }}
              color="primary"
              size="sm"
              onClick={handlePrevbtn}
            >
              Back
            </Button.Ripple>
          )}
        </div>
      </Col>
    </div>
  </div>
      </Row>
      <Card>
        <div className="ag-theme-alpine" style={{ height: 520 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            onCellValueChanged = {onCellValueChanged}
            paginationAutoPageSize='true'
            paginationPageSize='10'
            pagination='true'
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
