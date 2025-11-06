// ** React Imports
import { useState } from "react";

// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";
import { Collapse  } from 'reactstrap'

// ** Image
import collapseImg from '@src/assets/images/slider/04.jpg'
// ** Reactstrap Imports
import {
  Card,
  Form,
  Row,
  Col,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import {
  Circle,
  ChevronDown,
  PlusCircle,
  Eye,
  ArrowRightCircle,
  AlertTriangle,
} from "react-feather";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
// AG Grid
import { AgGridReact } from "ag-grid-react";
import "/node_modules/ag-grid-community/styles/ag-grid.css";
import "/node_modules/ag-grid-community/styles/ag-theme-alpine.css";
import { useRef, useEffect, useMemo, useCallback } from "react";
import API_URL from "../../../../config";


const defaultValues = {
  // hotelID: '',
  floor: "",
  blockID: null,
};

let blockID = [
  fetchx(API_URL + "/getfloorblockid?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      blockID = resp["data"];
      console.log(blockID);
    }),
];

const RegistrationForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  // const [popoverOpen, setPopoverOpen] = useState(false);
  const [filldata, setfilldata] = useState({});
  // ** Hooks
  const {
    setError,
    formState: { errors },
  } = useForm();

  // window.location.reload(true);
  // Ag Grid
  const [rowData, setRowData] = useState();
  const [visibleA, setVisibleA] = useState(false)
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Name", field: "name",suppressSizeToFit: true, maxWidth: 120, },
    { headerName: "Email ID", field: "emailID",suppressSizeToFit: true,maxWidth:175, },
    { headerName: "Phone No.", field: "phone",suppressSizeToFit: true, maxWidth: 120, },
    { headerName: "Address", field: "addressLine1",suppressSizeToFit: true, maxWidth: 115 },
    // { headerName: "Address Line2", field: "addressLine2" },
    { headerName: "Country", field: "country",suppressSizeToFit: true, maxWidth: 110},
    { headerName: "State", field: "state",suppressSizeToFit: true, maxWidth: 110 },
    { headerName: "City", field: "city",suppressSizeToFit: true, maxWidth: 110 },
    { headerName: "PostalCode", field: "postalCode" ,suppressSizeToFit: true, maxWidth: 125},
    // { headerName: "Is Active", field: "isActive" },
  ]);

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
    fetchx(API_URL + "/getbooker?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData["data"]);
        console.log(rowData["data"]);
      });
  }, []);

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues });
  const [value, setValue] = useState("");

  const onSubmit = (data) => {
    setData(data);
    console.log(data);
    if (data.floor !== null && data.blockID !== null) {
      console.log(data);
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        floor: data.floor,
        blockID: data.blockID.value,
      });
      console.log(createmarketGroup);
      console.log("hi");
      let res = fetchx(API_URL + "/floor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createmarketGroup,
      }).then((res) => {
        console.log(res);
        if (res["status"] == 200) {
          fetchx(API_URL + "/getbooker?hotelID=?")
            .then((result) => result.json())
            .then((rowData) => {
              setRowData(rowData["data"]);
              console.log(rowData["data"]);
            });
        }
      });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Floor Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleReset = () => {
    reset({
      // hotelID: '',
      floor: "",
      blockID: null,
    });
  };

  return (
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
                        <div className="hoverUnderline" onClick={() => {setAssign(!assign);
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
                        <div className="hoverUnderline">BTC Details</div>{" "}
                      </li>
                      <li>
                        {" "}
                        <div className="hoverUnderline">Booker Details</div>
                      </li>
                      <li>
                        {" "}
                        <div className="hoverUnderline">Other Details</div>{" "}
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
                    <Card>
                      <CardTitle style={{ backgroundColor: "#F2E5D9" }}>
                        Overview
                        <Button  className='mb-2' color='flat-secondary' onClick={toggle}>
                        <ChevronDown style={{ height: "20px" }} />
                      </Button>
                      </CardTitle>
                      <Collapse isOpen={isOpen}>
                     <div className='d-flex p-1 border'>
                     <span>
                      <Col md="16" sm="12" className="mb-1">
                      <Row>
                        <Col md="6" sm="12" className="mb-1">
                          <div>
                            <h5>
                              <b>Company Basic Details</b>
                            </h5>
                            <br></br>
                            <h6>
                              Account Name: <b>{filldata["accountName"]} </b>
                            </h6>
                            <h6>
                              Email: <b>{filldata["email"]} </b>
                            </h6>
                            <h6>
                              Phone Number:<b>{filldata["phoneNumber"]} </b>{" "}
                            </h6>
                          </div>
                        </Col>

                        <Col md="6" sm="12" className="mb-1">
                          <div>
                            <h5>
                              <b> Address Details</b>
                            </h5>
                            <br></br>
                            <h6>
                              Address One:<b> {filldata["addressLine1"]} </b>{" "}
                            </h6>
                            <h6>
                              Country:<b> {filldata["country"]}</b>{" "}
                            </h6>
                            <h6>
                              State: <b>{filldata["state"]} </b>
                            </h6>
                            <h6>
                              City:<b>{filldata["city"]} </b>{" "}
                            </h6>
                            <h6>
                              PostalCode:<b> {filldata["postalCode"]}</b>{" "}
                            </h6>
                          </div>
                        </Col>
                      </Row>
                      </Col>
                      </span>
                      </div>
                     </Collapse>                      
                    </Card>
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
                    <Card>
                      <CardTitle style={{ backgroundColor: "#F2E5D9" }}>
                        Account Details
                        <Button  className='mb-2' color='flat-secondary' onClick={toggle}>
                        <ChevronDown style={{ height: "20px" }} />
                      </Button>
                      </CardTitle>
                      <Collapse isOpen={isOpen}></Collapse>
                      <Row>
                        <Col>
                          <Row>
                            <Col>
                            <h6>
                                RateCode :<b> {filldata["rateCode"]}</b>{" "}
                              </h6>
                            </Col>
                            <Col>
                              <h6>
                                AccountType: <b>{filldata["accountType"]} </b>
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
                                <b> {filldata["secondaryEmail"]}</b>{" "}
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
                                <b> {filldata["accountManagerID"]}</b>{" "}
                              </h6>
                            </Col>
                            <Col>
                              <h6>
                                financialAssociateID:
                                <b> {filldata["financialAssociateID"]} </b>
                              </h6>
                            </Col>
                            <Col></Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
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
                    <Card>
                      <CardTitle style={{ backgroundColor: "#F2E5D9" }}>
                        BTC Details
                      </CardTitle>
                      <Row>
                        <Col>
                          <Row>
                            <Col>
                              <h6>
                                BTC Approved:
                                <b> {filldata["isBTCApproved"]} </b>
                              </h6>
                            </Col>
                            <Col>
                              <h6>
                                {" "}
                                Credit Limit:<b>
                                  {" "}
                                  {filldata["creditLimit"]}
                                </b>{" "}
                              </h6>
                            </Col>
                            <Col>
                              <h6>
                                {" "}
                                Tenure:<b> {filldata["tenure"]}</b>{" "}
                              </h6>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>

          <br></br>

          <Col>
            <Row>
              <div className="mb-1">
                <Row>
                  <Card>
                    <CardTitle style={{ backgroundColor: "#F2E5D9" }}>
                      Booker Details
                      
                    </CardTitle>
                    <div className="ag-theme-alpine" style={{ height: 200 }}>
                      <AgGridReact
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
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
                    </div>
                  </Card>
                </Row>
              </div>
            </Row>
          </Col>

          <br></br>

          <Col>
            <Row>
              <Col>
                <div className="mb-1">
                  <Row>
                    <Card>
                      <CardTitle style={{ backgroundColor: "#F2E5D9" }}>
                        Rate Code Room Rates
                       
                      </CardTitle>
                      <Row>
                        {/* <Col>
                          <Row>
                            <Col>
                              <h6>
                                IATA:<b> {filldata["IATA"]} </b>
                              </h6>
                            </Col>
                            <Col>
                              <h6>
                                Secondary Email:
                                <b> {filldata["secondaryEmail"]}</b>{" "}
                              </h6>
                            </Col>
                            <Col>
                              <h6>
                                RateCode :<b> {filldata["rateCode"]}</b>{" "}
                              </h6>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <h6>
                                Notes:<b>{filldata["notes"]} </b>{" "}
                              </h6>
                            </Col>
                            <Col>
                              <h6>
                                accountManagerID:
                                <b> {filldata["accountManagerID"]}</b>{" "}
                              </h6>
                            </Col>
                            <Col>
                              <h6>
                                financialAssociateID:
                                <b> {filldata["financialAssociateID"]} </b>
                              </h6>
                            </Col>
                          </Row>
                        </Col> */}
                      </Row>
                    </Card>
                  </Row>
                </div>
              </Col>
            </Row>
          </Col>

          {/* </Form> */}
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationForm;
