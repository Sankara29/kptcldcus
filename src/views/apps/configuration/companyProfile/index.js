// ** React Imports
import { useRef, useState } from "react";
import { Fragment } from "react";

// ** Reactstrap Imports
import {
  Button,
  Modal,
  Collapse,
  CardTitle,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

import {
  Circle,
  ChevronDown,
  PlusCircle,
  Eye,
  ArrowRightCircle,
  AlertTriangle,
} from "react-feather";
// ** Custom Components
import Wizard from "@components/wizard";

// // ** Steps
import CompanyInformation from "./companyInformation";
import BTC from "./btc";
import Booker from "./booker";

import RateCodes from "./rateCode"
// import AccountDetails from './steps/AccountDetails'

// // **Steps2
import EditCompanyInformation from "./editCompanyInformation";
// import EditBooker from "./editBooker";
import EditBooker from "./editBookerDetails";
import EditBTC from "./editBtc"
import RateCodeDetails from "./rateCode"

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";
import { Card, Row, Col } from "reactstrap";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'


import { useEffect, useMemo, useCallback } from "react";
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem,} from "reactstrap";
// import ViewCompany from "./viewCompanyProfile";
// import Rates from "./rate";
import "./hover.scss";
import API_URL from "../../../../config";
import { data } from "jquery";
import EditbookerDetails from './editBooker'
import AccountRateCodeMapping from "./accrateCodeMap";
import RateCodeMap from "./rateCodeMap"


const RateCodeBasicDetails = () => {
  const [rowData, setRowData] = useState();
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Rate Code ",
      field: "rateCode",
      suppressSizeToFit: true,
      maxWidth: 160,
    },
    { headerName: "Description", field: "description" },
    { headerName: 'BeginSellDate', field: 'beginSellDate' },
    { headerName: 'End Sell Date', field: 'endSellDate' },
    { headerName: "Package Code ", field: "packageCode" },
    { headerName: "Market Code", field: "marketCode" },
    { headerName: 'Source Code ', field:'sourceCode' }
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  console.log(localStorage.getItem(['companyID']))
  useEffect(() => {
    console.log(localStorage.getItem(['companyID']));
    fetchx(API_URL + `/getAccRatecode?hotelID=1&accountID=${localStorage.getItem(['companyID'])}`)
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
    console.log(rowData);
  }, []);
  console.log(rowData);
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div className="ag-theme-alpine" style={{ height: 150 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
          // paginationAutoPageSize = 'true'
          // paginationPageSize="10"
          // pagination = 'true'
          defaultColDef={defaultColDef}
          headerColor="ddw-primary"
        />
      </div>
    </div>
  );
};

const RateCodeRooms = () => {
  const [rowData, setRowData] = useState();
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Rate Code ",
      field: "rateCode",
      suppressSizeToFit: true,
      maxWidth: 160,
      sort:'asc'
    },
    {
      headerName: "Room Type ",
      field: "roomType",
      suppressSizeToFit: true,
      maxWidth: 160,
    },
    { headerName: "One Adult Price", field: "oneAdultPrice" },
    { headerName: 'Two Adult Price', field: 'twoAdultPrice' },
    { headerName: 'Three Adult Price', field: 'threeAdultPrice' },
    { headerName: "Extra Adult Price ", field: "extraAdultPrice" },
    { headerName: "Extra Child Price", field: "extraChildPrice" },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem["id"]);
    fetchx(API_URL + `/getAccRatecodeRoomRate?accountID=214`)
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
    console.log(rowData);
  }, []);
  console.log(rowData);
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div className="ag-theme-alpine" style={{ height: 250 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
          // paginationAutoPageSize = 'true'
          // paginationPageSize="10"
          // pagination = 'true'
          defaultColDef={defaultColDef}
          headerColor="ddw-primary"
        />
      </div>
    </div>
  );
};


const WizardModern = () => {
  const [accordion1Submitted, setAccordion1Submitted] = useState(false);

  // ** States
  const [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState('1')

  const [rowData5, setRowData5] = useState();

  const [rowData4, setRowData4] = useState();

 
  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id); 
  };
  // console.log(data1)

  // AGgrid
  // const [rowData, setRowData] = useState();
  const [filldata, setfilldata] = useState(" ");
  const [autofill, setautofill] = useState(false);
  const [editable, seteditable] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [enableEditBtn, setenableEditBtn] = useState(true);
  // const gridRef = useRef();
  const [showEdit, editButton] = useState(false);

  const [show, actionButton] = useState(false);

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Accounts Name",
      field: "accountName",
      suppressSizeToFit: true,
      maxWidth: 280,
      cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },
    },
    {
      headerName: "Account Type",
      field: "accountType",
      suppressSizeToFit: true,
      maxWidth: 140,
      cellStyle: { textAlign: "center", backgroundColor: "pink" },
    },
    {
      headerName: "Rate Code",
      field: "rateCode",
      suppressSizeToFit: true,
      maxWidth: 130,
      cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },
    },
    //  { headerName: 'Email', field: 'email', suppressSizeToFit: true, maxWidth: 130 },

    {
      headerName: "Country",
      field: "country",
      suppressSizeToFit: true,
      maxWidth: 120,
      cellStyle: { textAlign: "center", backgroundColor: "pink" },
    },
    {
      headerName: "State",
      field: "state",
      suppressSizeToFit: true,
      maxWidth: 110,
      cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },
    },
    {
      headerName: "City",
      field: "city",
      suppressSizeToFit: true,
      maxWidth: 120,
      cellStyle: { textAlign: "center", backgroundColor: "pink" },
    },
    {
      headerName: "GST ID ",
      field: "gstID",
      suppressSizeToFit: true,
      maxWidth: 180,
      cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },
    },
    {
      headerName: "Action",
      field: "numAvlRooms",
      suppressSizeToFit: true,
      maxWidth: 120,
      cellRendererFramework: (params) => (
        <Button color="primary" onClick={() => actionButton(!show)}>          
          View
        </Button>
      ),
    },

  ]);
  console.log(["country"]['id'])
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  //get Complete account details
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
    console.log(event["data"]);
    // console.log(event["rowIndex"]);
    // setfilldata(event['data'])
    fetchx(API_URL + "/getCompleteAccountDetails?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData["data"]);
        localStorage.setItem('companyName', event['data']['companyid'])
        // console.log(rowData["data"]);
        // console.log(rowData["data"][event["rowIndex"]]);        
        setfilldata(rowData["data"][event["rowIndex"]]);
        // localStorage.setItem('id',(rowData["data"][event["rowIndex"]["companyid"]]));
        // console.log(rowData["data"][event["rowIndex"]["companyid"]])
        // console.log(localStorage.getItem(id));
        
      });
  }, []);


  localStorage.setItem('companyID',(filldata.companyid));
  localStorage.setItem('rateCodeID',(filldata.rateCode));


    //get Complete account details
  useEffect(() => {
    fetchx(API_URL + "/getCompleteAccountDetails?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
  }, []);

  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  const [basicModal, setBasicModal] = useState(false);

  // ** Ref
  const ref = useRef(null);
   // Account Details Page
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "companyInformation", 
      title: " Basic Company Information",
      subtitle: "Enter Your Company Information.",
      content: (
        <CompanyInformation
          data1={filldata}
          stepper={stepper}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "btc",
      title: "BTC Details",
      subtitle: "Add BTC Details",
      // icon: <User size={18} />,
      content: <BTC data1={filldata} stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "booker",
      title: "Booker",
      subtitle: "Enter Booker Details",
      // icon: <MapPin size={18} />,
      content: <Booker stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "RateCodeMap",
      title: "Mapping Rate Codes ",
      // subtitle: "Enter Booker Details",
      // icon: <MapPin size={18} />,
      content: <RateCodeMap data1={filldata}  stepper={stepper} type="wizard-modern" />,
    },
    // {
    //   id: "accRateCodeMap",
    //   title: "Account RateCode Mapping",
    //   // subtitle: "Enter Booker Details",
    //   // icon: <MapPin size={18} />,
    //   content: <AccountRateCodeMapping data1={filldata}  stepper={stepper} type="wizard-modern" />,
    // },    
  ];
    //Edit Account Details Page
  const [stepper2, setstepper2] = useState(null);
  const steps2 = [
    {
      id: "companyInformation",
      title: "Company Information",
      subtitle: "Edit Your Company Information.",
      // icon: <FileText size={18} />,
      content: (
        <EditCompanyInformation
          data1={filldata}
          stepper={stepper}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "btc",
      title: "BTC Details",
      subtitle: "Edit BTC Details",
      // icon: <User size={18} />,
      content: <EditBTC data1={filldata} stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "editBooker",
      title: "Bookers",
      subtitle: "Edit Booker Details",
      // icon: <MapPin size={18} />,
      content: (
        <EditBooker data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
    {
      id: "rateCode",
      title: "RateCode",
      subtitle: "View Rate Code Details",
      // icon: <MapPin size={18} />,
      content: (
        <RateCodeDetails data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },  
  ];

  return (
    <div>

      {/* /// Create Account Details /// */}
      <div>
      <UncontrolledAccordion >
      <AccordionItem >
            <AccordionHeader targetId="1">
              <h4>
                <b> Create Company Information </b>{" "}
              </h4>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <div className="modern-horizontal-wizard">
                <Wizard
                  type="modern-horizontal"
                  ref={ref}
                  steps={steps}
                  options={{
                    linear: false,
                  }}
                  instance={(el) => setStepper(el)}
                />
              </div>
            </AccordionBody>
          </AccordionItem>
        </UncontrolledAccordion>
      </div>


     {/* //// getCompleteAccountDetails AG Grid ////////// */}
      <div>
        <Card>
          <div className="ag-theme-alpine" style={{ height: 540 }}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              animateRows={true}
              rowSelection="multiple"
              onCellClicked={cellClickedListener}
              // paginationAutoPageSize = 'true'
              paginationPageSize="10"
              pagination="true"
              defaultColDef={defaultColDef}
              headerColor="ddw-primary"
            />
          </div>
        </Card>
      </div>


      {/* //////Edit Account Details Page */}
      <Card>
        <div className="vertically-centered-modal">
          <Modal
            isOpen={showEdit}
            toggle={() => editButton(!showEdit)}
            className="modal-xl"
          >
            <ModalHeader toggle={() => editButton(!showEdit)}>
              Account Information
            </ModalHeader>
            <ModalBody>
              <Card>
                <div className="modern-horizontal-wizard">
                  <Wizard
                    type="modern-horizontal"
                    ref={ref}
                    steps={steps2}
                    options={{
                      linear: false,
                    }}
                    instance={(el) => setstepper2(el)}
                  />
                </div>
              </Card>
            </ModalBody>
            {/* <ModalFooter>
              <Button
                color="primary"
                onClick={() => setDisabledModal(!disabledModal)}
              >
                Continue
              </Button>
            </ModalFooter> */}
          </Modal>
        </div>
      </Card>

      <Card>
        <Modal
          isOpen={show}
          toggle={() => actionButton(!show)}
          className="modal-xl"
        >
          <ModalHeader toggle={() => actionButton(!show)}>
            {" "}
            Account Information...{" "}
          </ModalHeader>
          <ModalBody>
            <div>
              <div className="d-flex">
                <Button
                  className="me-1"
                  style={{ marginLeft: "auto" }}
                  color="primary"
                  onClick={() => {
                    filldata.length != 0 && editButton(!showEdit);
                  }}
                >
                  Edit
                </Button>
              </div>
              <Card>
                <div>
                  <div>
                    <p>
                      {" "}
                      <b>
                        <center>VIEW PROFILE</center>{" "}
                      </b>{" "}
                    </p>
                  </div>
                  <Row>
                    <Col md="2" sm="12" className="mb-1" l>
                      <div>
                        <Card style={{ backgroundColor: "#F2E5D9" }}>
                          <Row className="cardBody">
                            <Col md="10" sm="12" className="mb-1">
                              {/* <div><h5><Edit2 style={{height:'20px'}}/>Modify/Update</h5></div> */}
                              <div>
                                <ul>
                                  <li>
                                    <div
                                      className="hoverUnderline"
                                      onClick={() => {
                                        setAssign(!assign);
                                        localStorage.removeItem("id");
                                      }}
                                    >
                                      Overview
                                    </div>
                                  </li>
                                  <li>
                                    {" "}
                                    <div className="hoverUnderline">
                                      Account Details
                                    </div>{" "}
                                  </li>
                                  <li>
                                    {" "}
                                    <div className="hoverUnderline">
                                      BTC Details
                                    </div>{" "}
                                  </li>
                                  <li>
                                    {" "}
                                    <div className="hoverUnderline">
                                      Booker Details
                                    </div>
                                  </li>
                                  <li>
                                    {" "}
                                    <div className="hoverUnderline">
                                      Other Details
                                    </div>{" "}
                                  </li>
                                </ul>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </div>
                    </Col>
                    <Col>
                      {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
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
                                    <b> Overview </b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                <Card> 
                                    <div className="d-flex p-1 border">
                                      <span>
                                        <Col md="16" sm="12" className="mb-1">
                                          <Row>
                                            <Col
                                              md="6"
                                              sm="12"
                                              className="mb-1"
                                            >
                                              <div>
                                                <h5>
                                                  <b>Company Basic Details</b>
                                                </h5>
                                                <br></br>
                                                <h6>
                                                  Account Name:{" "}
                                                  <b>
                                                    {filldata["accountName"]}{" "}
                                                  </b>
                                                </h6>
                                                <h6>
                                                  Email:{" "}
                                                  <b>{filldata["email"]} </b>
                                                </h6>
                                                <h6>
                                                  Phone Number:
                                                  <b>
                                                    {filldata["phoneNumber"]}{" "}
                                                  </b>{" "}
                                                </h6>
                                              </div>
                                            </Col>

                                            <Col
                                              md="6"
                                              sm="12"
                                              className="mb-1"
                                            >
                                              <div>
                                                <h5>
                                                  <b> Address Details</b>
                                                </h5>
                                                <br></br>
                                                <h6>
                                                  Address One:
                                                  <b>
                                                    {" "}
                                                    {
                                                      filldata["addressLine1"]
                                                    }{" "}
                                                  </b>{" "}
                                                </h6>
                                                <h6>
                                                  Country:
                                                  <b>
                                                    {" "}
                                                    {filldata["country"]}
                                                  </b>{" "}
                                                </h6>
                                                <h6>
                                                  State:{" "}
                                                  <b>{filldata["state"]} </b>
                                                </h6>
                                                <h6>
                                                  City:
                                                  <b>
                                                    {filldata["city"]}{" "}
                                                  </b>{" "}
                                                </h6>
                                                <h6>
                                                  PostalCode:
                                                  <b>
                                                    {" "}
                                                    {filldata["postalCode"]}
                                                  </b>{" "}
                                                </h6>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </span>
                                    </div>                                  
                                </Card>
                                </AccordionBody>
                                </AccordionItem>
                              </UncontrolledAccordion>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <br></br>

                      <Col>
                        <Row>
                          <Col>
                            <div className="mb-1">
                              <Row>
                              <UncontrolledAccordion >
                                <AccordionItem>
                                  <AccordionHeader
                                    style={{ backgroundColor: "#F2E5D9" }}
                                    targetId="1"
                                  >
                                    <b> Account Details </b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                <Card>
                                  
                                  <Row>
                                    <Col>
                                      <Row>
                                        <Col>
                                          <h6>
                                            RateCode :
                                            <b> {filldata["rateCode"]}</b>{" "}
                                          </h6>
                                        </Col>
                                        <Col>
                                          <h6>
                                            AccountType:{" "}
                                            <b>{filldata["accountType"]} </b>
                                          </h6>
                                        </Col>
                                        <Col>
                                          <h6>
                                            GST ID:<b>{filldata["gstID"]} </b>{" "}
                                          </h6>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <h6>
                                            IATA:<b> {filldata["IATA"]} </b>
                                          </h6>
                                        </Col>
                                        <Col>
                                          <h6>
                                            Secondary Email:
                                            <b>
                                              {" "}
                                              {filldata["secondaryEmail"]}
                                            </b>{" "}
                                          </h6>
                                        </Col>
                                        {/* <Col>
                              <h6>
                                RateCode :<b> {filldata["rateCode"]}</b>{" "}
                              </h6>
                            </Col> */}

                                        <Col>
                                          <h6>
                                            Notes:<b>{filldata["notes"]} </b>{" "}
                                          </h6>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <h6>
                                            accountManagerID:
                                            <b>
                                              {" "}
                                              {filldata["accountManagerID"]}
                                            </b>{" "}
                                          </h6>
                                        </Col>
                                        <Col>
                                          <h6>
                                            financialAssociateID:
                                            <b>
                                              {" "}
                                              {
                                                filldata["financialAssociateID"]
                                              }{" "}
                                            </b>
                                          </h6>
                                        </Col>
                                        <Col></Col>
                                      </Row>
                                    </Col>                                    
                                  </Row>
                                </Card>
                                </AccordionBody>
                                </AccordionItem>
                              </UncontrolledAccordion>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <br></br>

                      <Col>
                        <Row>
                          <Col>
                            <div className="mb-1">
                              <UncontrolledAccordion>
                                <AccordionItem>
                                  <AccordionHeader
                                    style={{ backgroundColor: "#F2E5D9" }}
                                    targetId="1"
                                  >
                                    <b> BTC Details</b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                    <Row>
                                      <Col>
                                        <Row>
                                          <Col>
                                            <h6>
                                              BTC Approved:
                                              <b>
                                                {" "}
                                                {filldata["isBTCApproved"]}{" "}
                                              </b>
                                            </h6>
                                          </Col>
                                          <Col>
                                            <h6>
                                              {" "}
                                              Credit Limit:
                                              <b>
                                                {" "}
                                                {filldata["creditLimit"]}
                                              </b>{" "}
                                            </h6>
                                          </Col>
                                          <Col>
                                            <h6>
                                              {" "}
                                              Tenure:
                                              <b> {filldata["tenure"]}</b>{" "}
                                            </h6>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </AccordionBody>
                                </AccordionItem>
                              </UncontrolledAccordion>
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <br></br>

                      <Col>
                        <Row>
                          <div className="mb-1">
                            <Row>
                              <UncontrolledAccordion>
                                <AccordionItem>
                                  <AccordionHeader
                                    style={{ backgroundColor: "#F2E5D9" }}
                                    targetId="1"
                                  >
                                    <b> Booker Details</b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                    {/* <div
                                      className="ag-theme-alpine"
                                      style={{ height: 200 }}
                                    >
                                      <AgGridReact
                                        ref={gridRef}
                                        rowData={rowData4}
                                        columnDefs={columnDefs2}
                                        animateRows={true}
                                        rowSelection="multiple"
                                        onCellClicked={cellClickedListener}
                                        paginationAutoPageSize="true"
                                        paginationPageSize="10"
                                        // pagination="true"
                                        defaultColDef={defaultColDef}
                                        headerColor="ddw-primary"
                                        gridOptions={gridOptions}
                                        // onGridReady={onGridReady}
                                      />
                                    </div> */}
                                    <EditbookerDetails/>
                                  </AccordionBody>
                                </AccordionItem>
                              </UncontrolledAccordion>                             
                            </Row>
                          </div>
                        </Row>
                      </Col>

                      <br></br>

                      <Col>
                        <Row>
                          <Col>
                            <div className="mb-1">
                              {/* <Row>
                                <UncontrolledAccordion>
                                  <AccordionItem>
                                    <AccordionHeader
                                      style={{ backgroundColor: "#F2E5D9" }}
                                      targetId="1"
                                    >
                                      <b> Rate Code Details </b>
                                    </AccordionHeader>
                                    <AccordionBody accordionId="1">
                                      <Card>
                                        <Row>
                                          

                                         
                                        </Row>
                                        <RateCodeBasicDetails/>
                                      
                                      </Card>
                                    </AccordionBody>
                                  </AccordionItem>
                                </UncontrolledAccordion>
                              </Row> */}
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      {/* </Form> */}
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </ModalBody>
          <ModalFooter>
         
          </ModalFooter>
        </Modal>
      </Card>

      {/* <ViewCompany /> */}
    </div>
  );
};
export default WizardModern;
