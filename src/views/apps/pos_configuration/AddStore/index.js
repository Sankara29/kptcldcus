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
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, UncontrolledAccordion } from 'reactstrap'

// ** Custom Components
import Avatar from "@components/avatar";
import API_URL from "../../../../config";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

// ** Custom Components
import Wizard from "@components/wizard";

// // ** Steps
import Editstore from "./editstore";




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
  Col,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from 'react';

const FoodTypeOptions = [
  { value: "Food", label: "Food" },
  { value: "Beverages", label: "Beverages" },
  { value: "Liquor", label: "Liquor" },
  { value: "Smoke", label: "Smoke" },
  { value: "Others", label: "Others" },


];


const isAllowanceOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const kotprintoptions = [
  { value: "Enable", label: "Enable" },
  { value: "Disable", label: "Disable" },

];

const irdptions = [
  { value: "Enable", label: "Enable" },
  { value: "Disable", label: "Disable" },
];

const statusOptions = [
  { value: 'Enable', label: 'Enable' },
  { value: 'Disable', label: 'Disable' },
]

const defaultValues = {
  storeID: "",
  restaurantName: "",
  tableCount: "",
  status: "",
  IRD: "",
  KOTprint: "",
  DisplayCode: "",
};


let id = 1;
const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();
  // ** State
  const [open, setOpen] = useState('0')
  let navigate = useNavigate();
  const [show, actionButton] = useState(false);
  const [filldata, setfilldata] = useState({});
  const [showEdit, editButton] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [checkboxChecked1, setCheckboxChecked1] = useState(false)

  

  // ** State
  const [stepper, setStepper] = useState(null);

  // ** Ref
  const ref = useRef(null);
  const [stepper2, setstepper2] = useState(null);

  const MySwal = withReactContent(Swal)
  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked)
  }
  const handleCheckboxChange1 = () => {
    setCheckboxChecked1(!checkboxChecked1)
  }

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'ID',
      field: 'id',
      cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },
      headerClass: "text-center",
      maxWidth: 100
    },
    {
      headerName: 'Hotel ID',
      field: 'hotelID',
      cellStyle: { 'text-align': 'center', 'background-color': 'pink' },
      headerClass: "text-center",
      maxWidth: 100
    },
    {
      headerName: 'Store ID',
      field: 'storeID',
      cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },
      headerClass: "text-center",
      maxWidth: 100
    },
    {
      headerName: 'Store Name',
      field: 'restaurantName',
      cellStyle: { 'text-align': 'center', 'background-color': 'pink' },
      headerClass: "text-center",
      maxWidth: 260
    },
    {
      headerName: 'Table Count',
      field: 'tableCount',
      cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },
      headerClass: "text-center",
      maxWidth: 100

    },
    {
      headerName: 'status',
      field: 'status',
      cellStyle: { 'text-align': 'center', 'background-color': 'pink' },
      headerClass: "text-center",
      maxWidth: 160,
    },
    {
      headerName: 'IRD',
      field: 'IRD',
      cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },
      headerClass: "text-center",
      maxWidth: 150
    },
    {
      headerName: 'KOTprint',
      field: 'KOTprint',
      cellStyle: { 'text-align': 'center', 'background-color': 'pink' },
      headerClass: "text-center",
      maxWidth: 150,
    },
    {
      headerName: 'DisplayCode',
      field: 'DisplayCode',
      cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },
      headerClass: "text-center",
      maxWidth: 150
    },
    {
      headerName: "Action", field: "numAvlRooms", suppressSizeToFit: true, maxWidth: 120,
      cellRendererFramework: (params) => (
        <Button color="primary" onClick={() => actionButton(!show)}> View  </Button>),
    },
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
    setfilldata(event["data"]);

  }, []);

  useEffect(() => {
    fetchx(API_URL + '/getrestaurantlist?hotelID=1')
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
      })
  }, []);

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
     data.IRD = checkboxChecked ? "Enable" : "Disable";
     data.KOTprint = checkboxChecked1 ? "Enable" : "Disable";
    if (
      data.storeID !== null &&
      data.restaurantName !== null &&
      data.tableCount !== null &&
      data.status !== null &&
      data.IRD !== null &&
      data.KOTprint !== null &&
      data.DisplayCode!== null

    ) {
      let restaurantData = JSON.stringify({
        "hotelID": 1,
        "storeID": data.storeID,
        'restaurantName': data.restaurantName,
        'tableCount': data.tableCount,
        "status": "Enable",
        'IRD': data.IRD,
        'KOTprint': data.KOTprint,
        "DisplayCode": data.DisplayCode,

      });
      let res = fetchx(API_URL + '/addrestaurant', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: restaurantData,
      }).then((res) => {
        if (res['status'] == 200) {

          const swalInstance = MySwal.fire({
            text: "Store Added Successfully",
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
              fetchx(API_URL + '/getrestaurantlist?hotelID=1')
                .then(result => result.json())
                .then(rowData => {
                  setRowData(rowData['data'])
                })
            }
          });
        }
      });
     

    }
  };

  const handleReset = () => {
    reset({
      hotelID: "",
      storeID: "",
      restaurantName: "",
      tableCount: "",
      status: "",
      IRD: "",
      KOTprint: "",
      DisplayCode: "",
    });
  };

  const steps = [
    {
      id: "store ",
      title: "Overview",
      subtitle: "Enter Store  Details.",
      // icon: <FileText size={18} />,
      content: (
        <Editstore data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },

  ];
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
            <AccordionHeader targetId='1'>Add Store</AccordionHeader>
            <AccordionBody accordionId='1'>
              {/* <CardHeader>
        <CardTitle tag="h4">Menu Items</CardTitle>
      </CardHeader> */}
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>

                  <Col md='4' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="storeID">
                        Store ID
                        </Label>
                        <InputGroup className="input-group-merge">
                     
                          <Controller
                            id="storeID"
                            name="storeID"
                            control={control}

                            render={({ field }) => (
                              <Cleave
                                pattern="[0-9]*" title="Type Only Numbers"
                                required

                                placeholder="Store ID"
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid":
                                    data !== null && (data.storeID === null || !data.storeID.length)
                                })}
                              />
                            )}
                          />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md='4' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="restaurantName">
                          Store Name
                        </Label>
                         
                          <Controller
                            id="restaurantName"
                            name="restaurantName"
                            control={control}
                            placeholder="restaurantName"
                            render={({ field }) => (
                              <Input
                                //   pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
                                placeholder="Enter restaurantName"
                                required
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid": data !== null && data.restaurantName === null,
                                })}
                              />
                            )}
                          />
                      </div>
                    </Col>
                    <Col md='4' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="tableCount">
                          Table Count
                        </Label>
                        <InputGroup className="input-group-merge">
                          {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.reservation === null || !data.reservation.length)
                })}
              ></InputGroupText> */}
                          <Controller
                            id="tableCount"
                            name="tableCount"
                            control={control}

                            render={({ field }) => (
                              <Cleave
                                pattern="[0-9]*" title="Type Only Numbers"
                                required

                                placeholder="tableCount"
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid":
                                    data !== null && (data.tableCount === null || !data.tableCount.length)
                                })}
                              />
                            )}
                          />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md='4' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="DisplayCode">
                          Invoice Display Code
                        </Label>
                        <InputGroup className="input-group-merge">
                          {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText> */}
                          <Controller
                            id="DisplayCode"
                            name="DisplayCode"
                            control={control}
                            render={({ field }) => (
                              <Cleave
                                {...field}
                                // pattern="[0-9]*" title="Only Numbers Allowed" 
                                required
                                placeholder="Enter DisplayCode "
                                className={classnames("form-control", {
                                  "is-invalid": data !== null && data.DisplayCode === null,
                                })}
                              />
                            )}
                          />
                        </InputGroup>
                      </div>
                    </Col>
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
                      options={statusOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.ReactSelect === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col> */}
                    {/* <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='IRD'>
                  IRD
                </Label>
                <Controller
                  id='IRD'
                  control={control}
                  name='IRD'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={irdptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.ReactSelect === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col> */}
            <Col md='2' sm='8' className='pt-3'>
                <div className='form-check form-check-inline'>
                  <Input  type='checkbox' id='basic-cb-unchecked' checked={checkboxChecked}
                    onChange={handleCheckboxChange} />
                  <Label for='IRD' className='form-check-label'>
                  Include Inhouse guests
                  </Label>
                </div>
              </Col>
              <Col md='2' sm='8' className='pt-3'>
                <div className='form-check form-check-inline'>
                  <Input  type='checkbox' id='basic-cb-unchecked' checked={checkboxChecked1}
                    onChange={handleCheckboxChange1} />
                  <Label for='KOTprint' className='form-check-label'>
                    KOT Print
                  </Label>
                </div>
              </Col>


                    <div className="d-flex">
                      <Button className="me-1" color="primary" FoodType="submit" >
                        Submit
                      </Button>
                      <Button
                        outline
                        color="secondary"
                        FoodType="reset"
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

      <div>
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
      </div>
      {/* {Preview Restaurant Details} */}

      <Card>


        <div className="ag-theme-alpine" style={{ height: 620 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            paginationAutoPageSize='true'
            paginationPageSize='15'
            pagination='true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
          // onGridReady={onGridReady}

          />
        </div>
      </Card>
      <Card>
        <Modal
          isOpen={show}
          toggle={() => actionButton(!show)}
          className="modal-lg">
          <ModalHeader toggle={() => actionButton(!show)}>
            {" "}
            View Store Details...{" "}
          </ModalHeader>
          <ModalBody>
            <div>
              <div className="d-flex" style={{ paddingBottom: '20px' }}>
                <Button
                  className="me-1"
                  style={{ marginLeft: "auto" }}
                  color="primary"

                  onClick={() => {
                    filldata.length != 0 && editButton(!showEdit);
                  }} >
                  Edit
                </Button>
              </div>
              <Card>
                <div>

                  <Row>

                    <Col>
                      <Col>
                        <Row>
                          <Col>
                            <div className="mb-1">
                              <Row>
                                <UncontrolledAccordion defaultOpen='1'>
                                  <AccordionItem>
                                    <AccordionHeader
                                      style={{ backgroundColor: "#F2E5D9" }}
                                      targetId="1"
                                    >
                                      <b> Store Details </b>
                                    </AccordionHeader>
                                    <AccordionBody accordionId="1">
                                      <Row>
                                        <Col>
                                          <div>

                                            <br></br>
                                            <h6>Hotel ID :<b> {filldata["hotelID"]}</b></h6>
                                            <h6> Store ID : <b> {filldata["storeID"]}</b></h6>
                                            <h6> Store Name :<b>{filldata["restaurantName"]}</b> </h6>
                                            <h6>Table Count : <b>{filldata["tableCount"]}</b>  </h6>
                                            <h6> Display Code : <b> {filldata["DisplayCode"]}</b></h6>
                                            <h6> IRD : <b> {filldata["IRD"]}</b></h6>
                                            <h6> Kot Print : <b> {filldata["KOTprint"]}</b></h6>



                                          </div>
                                        </Col>


                                      </Row>
                                    </AccordionBody>
                                  </AccordionItem>
                                </UncontrolledAccordion>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </Col>

                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </ModalBody>
        </Modal>
      </Card>
      {/* Edit Restaurant Details */}
      <Card>
        <div className="vertically-centered-modal">
          <Modal
            isOpen={showEdit}
            toggle={() => editButton(!showEdit)}
            // className="modal-lg"
            className="modal-xl"

          >
            <ModalHeader toggle={() => editButton(!showEdit)}>
              Welcome...
            </ModalHeader>
            <ModalBody>
              <Card>
                <div className="modern-horizontal-wizard">
                  <Wizard
                    type="modern-horizontal"
                    ref={ref}
                    steps={steps}
                    options={{
                      linear: false,
                    }}
                    instance={(el) => setstepper2(el)}
                  />
                </div>
              </Card>
            </ModalBody>

          </Modal>
        </div>
      </Card>
      {/* <App/> */}
    </div>
  );
};

export default ValidationThirdPartyComponents;

