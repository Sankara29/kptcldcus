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
import API_URL from "../../../config";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

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
  Edit2,
  PlusCircle,
  Eye,
  ArrowRightCircle,
  AlertTriangle,
} from "react-feather";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from "react";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
// const id = '1';
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

// import App from './datagrid'

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

const salutations = [
  { value: "Mr", label: "Mr." },
  { value: "Mrs", label: "Mrs." },
  { value: "Ms", label: "Ms." },
  { value: "Dr", label: "Dr." },
  { value: "Mast.", label: "Mast.." },
  { value: "Prof", label: "Prof." },
  { value: "Capt", label: "Capt." },
  { value: "Wg Cdr.", label: "Wg Cdr." },
  { value: "Major.", label: "Major." },
];


const RegistrationForm = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [filldata, setfilldata] = useState({});
  // ** Hooks
  const {
    setError,
    formState: { errors },
  } = useForm();

  // window.location.reload(true);
  // Ag Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true,maxWidth: 160},
    {
      headerName: "Floor ",
      field: "floor",
      suppressSizeToFit: true,
      cellStyle: { "text-align": "center", "background-color": "#F1E39B" },
      maxWidth: 140,
    },
    {
      headerName: "Block",
      field: "block",
      suppressSizeToFit: true,
      cellStyle: { "text-align": "center", "background-color": "pink" },
      maxWidth: 140,
    },
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
    fetchx(API_URL + "/floor?hotelID=1&floor=1&blockID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
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
          fetchx(API_URL + "/floor?hotelID=1&floor=1&blockID=1")
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
        <Col md="3" sm="12" className="mb-1" l>
          <div>
            <Card style={{ backgroundColor: "#F2E5D9" }}>
              <Row className="cardBody">
                <Col md="10" sm="12" className="mb-1">
                  {/* <div><h5><Edit2 style={{height:'20px'}}/>Modify/Update</h5></div> */}
                  <div>
                    <ul>
                      <li>
                        {" "}
                        <div
                          className="hoverUnderline"
                          onClick={() => {
                            setAssign(!assign);
                            localStorage.removeItem("id");
                          }}
                        >
                          Overview
                        </div>{" "}
                      </li>
                      <li>
                        {" "}
                        <div className="hoverUnderline">
                          CompanyID & GST ID
                        </div>{" "}
                      </li>
                      <li>
                        {" "}
                        <div className="hoverUnderline">ID Details</div>{" "}
                      </li>
                      <li>
                        {" "}
                        <div className="hoverUnderline">Membership Details</div>
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
                      </CardTitle>
                      <Row>
                        <Col>
                          <div>
                            <h5>
                              <b>
                                Basic Details
                                <Button.Ripple color="flat-secondary" id="controlledPopover">
                                  <Edit2 style={{ height: "20px" }} />
                                </Button.Ripple>                               
                                <Popover placement="right" isOpen={popoverOpen} target="controlledPopover" toggle={() => setPopoverOpen(!popoverOpen)}>
                                  <PopoverHeader>
                                    Controlled Popover
                                  </PopoverHeader>
                                  <PopoverBody>
                                  <Card>
                                    <CardBody>        
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                          <Row>
                                          <Col md="8" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="salutation1">
                    Salutation
                  </Label>
                  <Controller
                    // defaultValue={salutations[2]}
                    id="salutation1"
                    control={control}
                    name="salutation1"
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={salutations}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid":
                            data !== null && data.salutation1 === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>            
              <Col md="8" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="name1">
                    Name
                  </Label>
                  <Controller
                    // defaultValue={data1["name"]}
                    control={control}
                    id="name1"
                    name="name1"
                    render={({ field }) => (
                      <Input
                        placeholder="name"
                        invalid={errors.name1 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="8" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="emailBasic">
                    Email
                  </Label>
                  <Controller
                    // defaultValue={data1["email"]}
                    control={control}
                    id="emailBasic"
                    name="emailBasic"
                    render={({ field }) => (
                      <Input
                        placeholder="emailBasic"
                        invalid={errors.emailBasic && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="8" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="phonenumber">
                    Phone Number
                  </Label>
                  <InputGroup className="input-group-merge">
                    <InputGroupText
                      className={classnames({
                        "is-invalid":
                          data !== null &&
                          (data.phoneNumber === null ||
                            !data.phoneNumber.length),
                      })}
                    >
                      IN (+91)
                    </InputGroupText>
                    <Controller
                      id="phone-number"
                      name="phoneNumber"
                      control={control}
                      placeholder="1 234 567 8900"
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          // value={data1["phoneNumber"]}
                          className={classnames("form-control", {
                            "is-invalid":
                              data !== null &&
                              (data.phoneNumber === null ||
                                !data.phoneNumber.length),
                          })}
                          options={{ phone: true, phoneRegionCode: "IN" }}
                        />
                      )}
                    />
                  </InputGroup>
                </div>
              </Col>
                                          </Row>
                                         </Form>
                                    </CardBody>
                                 </Card>
                                  </PopoverBody>
                                </Popover>
                              </b>
                            </h5>
                            <br></br>
                            <h6>
                              Name:
                              <b>
                                {filldata["salutation"] + filldata["name"]}
                              </b>
                            </h6>
                            <h6>
                              Email: <b>{filldata["email"]}</b>{" "}
                            </h6>
                            <h6>
                              Phone Number: <b> {filldata["phoneNumber"]}</b>{" "}
                            </h6>
                          </div>
                        </Col>

                        <Col>
                          <div>
                            <h5>
                              <b>
                                {" "}
                                Address Details{" "}
                                <Button.Ripple color="flat-secondary">
                                  {" "}
                                  <Edit2 style={{ height: "20px" }} />
                                </Button.Ripple>{" "}
                              </b>
                            </h5>
                            <br></br>

                            <h6>
                              Address One: <b>{filldata["addressOne"]}</b>{" "}
                            </h6>
                            {/* <h6>
                        Address Two: <b>{filldata["addressTwo"]}</b>{" "}
                      </h6> */}
                            <h6>
                              Anniversary Date: <b>{filldata["anniversary"]}</b>{" "}
                            </h6>
                            <h6>
                              Company: <b>{filldata["accountName"]}</b>{" "}
                            </h6>
                            <h6>
                              Country: <b>{filldata["country"]}</b>{" "}
                            </h6>
                            <h6>
                              State: <b>{filldata["state"]}</b>{" "}
                            </h6>
                            <h6>
                              City: <b>{filldata["city"]}</b>{" "}
                            </h6>
                            <h6>
                              PostalCode: <b>{filldata["postalCode"]}</b>{" "}
                            </h6>
                          </div>
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
                        Company Details and GST
                      </CardTitle>
                      <Row>
                        <Col>
                          <Row>
                            <Col>
                              {" "}
                              <h6>
                                Company: <b>{filldata["accountName"]}</b>
                              </h6>{" "}
                            </Col>

                            <Col>
                              {" "}
                              <h6>
                                {" "}
                                GST Number: <b>{filldata["gstID"]}</b>{" "}
                              </h6>{" "}
                            </Col>
                            <Col>
                              {" "}
                              <h6>
                                VIP ID :<b>{filldata["vipType"]} </b>{" "}
                              </h6>{" "}
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
              <Col>
                <div className="mb-1">
                  <Row>
                    <Card>
                      <CardTitle style={{ backgroundColor: "#F2E5D9" }}>
                        ID Details
                      </CardTitle>
                      <Row>
                        <Col>
                          <Row>
                            <Col>
                              {" "}
                              <h6>
                                {" "}
                                ID Type: {filldata["data.idDetails.IDType"]}
                              </h6>{" "}
                            </Col>
                            <Col>
                              {" "}
                              <h6> ID Number: {filldata["idNumber"]}</h6>{" "}
                            </Col>
                            <Col>
                              {" "}
                              <h6>
                                {" "}
                                Expiry Date: {filldata["expiryDate"]}
                              </h6>{" "}
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
              <Col>
                <div className="mb-1">
                  <Row>
                    <Card>
                      <CardTitle style={{ backgroundColor: "#F2E5D9" }}>
                        Membership Details
                      </CardTitle>
                      <Row>
                        <Col>
                          <Row>
                            <Col>
                              {" "}
                              <h6>
                                Membership Type: {filldata["membetshipType"]}{" "}
                              </h6>{" "}
                            </Col>
                            <Col>
                              {" "}
                              <h6>
                                Membership Number:{" "}
                                {filldata["membetshipDetails"]}{" "}
                              </h6>{" "}
                            </Col>
                            <Col>
                              {" "}
                              <h6>
                                {" "}
                                Membership Level: {filldata["level"]}
                              </h6>{" "}
                            </Col>
                          </Row>
                          <br></br>
                          <Row>
                            <Col>
                              {" "}
                              <h6>
                                Membership Since: {filldata["membershipSince"]}{" "}
                              </h6>{" "}
                            </Col>
                            <Col>
                              {" "}
                              <h6>
                                {" "}
                                Membership Expiry: {filldata["expiryDate"]}
                              </h6>{" "}
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
              <Col>
                <div className="mb-1">
                  <Row>
                    <Card>
                      <CardTitle style={{ backgroundColor: "#F2E5D9" }}>
                        Other Details
                      </CardTitle>
                      <Row>
                        <Col>
                          {/* 
                  
                  */}
                          <Row>
                            <Col>
                              {" "}
                              <h6>
                                DOB: <b> {filldata["dob"]}</b>{" "}
                              </h6>
                            </Col>
                            <Col>
                              {" "}
                              <h6>
                                Anniversary Date:{" "}
                                <b>{filldata["anniversary"]}</b>{" "}
                              </h6>
                            </Col>
                            <Col>
                              {" "}
                              <h6>
                                Notes:<b>{filldata["notes"]} </b>{" "}
                              </h6>
                            </Col>
                            <Col>
                              {" "}
                              <h6>
                                {" "}
                                Guest Preference Notes:{" "}
                                <b>{filldata["guestpreferencenotes"]} </b>{" "}
                              </h6>{" "}
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

          {/* </Form> */}
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationForm;
