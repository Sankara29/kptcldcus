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
import Moment from "moment";
import React from "react";
import { selectThemeColors } from "@utils";
import API_URL from "../../../config";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Card,
  Form,
  Row,
  Col,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from "react";
// const id = '1';
import { useNavigate } from "react-router-dom";
// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const defaultValues = {
  salutation1: null,
  name1: "",
  lastName1: "",
  email1: "",
  phoneNumber: "",
  gstID: "",
  nationality: null,
  dob: "",
  vipID: null,
  addressOne1: "",
  addressTwo: "",
  anniversary1: "",
  companyID1: null,
  country1: null,
  states1: "",
  notes: "",
  city: "",
  postalCode1: "",
  guestpreferencenotes1: null,
};

let companyID = [
  fetchx(API_URL + "/getGuestProfileCompanyID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      companyID = resp["data"];
    }),
];

let lastRate = [
  fetchx(API_URL + "/getGuestProfileLastRateID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      lastRate = resp["data"];
    }),
];

let lastRoomID = [
  fetchx(API_URL + "/getGuestProfileLastRoomID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      lastRoomID = resp["data"];
    }),
];

let vipID = [
  fetchx(API_URL + "/getGuestProfileVipID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      vipID = resp["data"];
    }),
];

let countryOptions = [
  fetchx(API_URL + "/getGuestProfileCountry?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      countryOptions = resp["data"];
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

const Floor = ({ stepper2, type, data1 }) => {

  const [defaultValue, setDefaultValue] = useState(null);

  const [selectedValue1, setSelectedValue1] = useState(data1.salutation);
  const [selectedValue3, setSelectedValue3] = useState(data1.companyID);
  const [selectedValue4, setSelectedValue4] = useState(data1.vipID);

  const [reload, setreload] = useState(true);
  const [load, setload] = useState(true);

  //Salutation
  const handleChange1 = (selectedOption1) => {
    setSelectedValue1(selectedOption1.value);
    localStorage.removeItem("salutation");
    localStorage.setItem("salutation", selectedOption1.label);
    localStorage.setItem("salutation", selectedOption1.value);
    setreload(false);
    setTimeout(() => {
      setreload(true);
    }, 1);
  };

  const handleChange3 = (selectedOption3) => {
    setSelectedValue3(selectedOption3.value);
 
    localStorage.removeItem("companyID");
    localStorage.setItem("companyID", selectedOption3.label);
    localStorage.setItem("companyID", selectedOption3.value);


    setreload(false);
    setTimeout(() => {
      setreload(true);
    }, 1);
  };

  const handleChange4 = (selectedOption4) => {
    setSelectedValue4(selectedOption4.value);

    localStorage.removeItem("vipID");
    localStorage.setItem("vipID", selectedOption4.label);
    localStorage.setItem("vipID", selectedOption4.value);

    setreload(false);
    setTimeout(() => {
      setreload(true);
    }, 1);
  };

  const defaultReason = {
    value: data1.country,
    label: data1.countryName,
  };
  //Salutation
  const defaultReason1 = {
    value: data1.salutation,
    label: data1.salutation,
  };

  const defaultReason2 = {
    value: data1.nationality,
    label: data1.nationalityName,
  };

  const defaultReason3 = {
    value: data1.companyID,
    label: data1.accountName,
  };

  const defaultReason4 = {
    value: data1.vipID,
    label: data1.vipType,
  };
  // Ag Grid
  const [rowData, setRowData] = useState();

  const [centeredModal, setCenteredModal] = useState(false);

  const gridRef = useRef();
  const cellClickedListener = useCallback((event) => {
    localStorage.setItem("id", data1["id"]);
    setautofill(true);
    setShowForm(false);
    seteditable(true);
    setTimeout(() => {
      setShowForm(true);
    }, 200);
    setenableEditBtn(false);
  }, []);

  // ** Hooks
  const {
    setError,
    formState: { errors },
    setValue,
  } = useForm();

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control, watch } = useForm({ defaultValues });
  let navigate = useNavigate();

  const beginDate = watch("beginDate");
  const today = Moment().format("YYYY-MM-DD");
  const options = {
    maxDate: today,
  };
  const twelveYearsAgo = Moment().subtract(12, "years").format("YYYY-MM-DD");

  const doboptions = {
    maxDate: twelveYearsAgo,
  };

  const [flag, setflag] = useState(false);

  const onSubmit = (data) => {
    setData(data);
    if (data.firstName !== null && data.lastName !== null) {
      let createmarketGroup = JSON.stringify({
        salutation: selectedValue1,
        firstName: data.names,
        lastName: data.surname,
        email: data.emailBasic,
        phoneNumber: data.phonenumber,
        gstID: data.gst,
        nationality:
          (data.nationalities === undefined)
          ? data1.nationality
          : (data.nationalities === null)
            ? null
            : data.nationalities.value,
        dob:
          data.beginDate1 === data1.dob
            ? data.beginDate1
            : Moment(String(new Date(data.beginDate1[0]))).format("YYYY-MM-DD"),
        vipID: 
        (data.vip1 === undefined)
        ? data1.vipID
        : (data.vip1 === null)
          ? null
          : data.vip1.value,
        addressOne: data.addresses,
        addressTwo: data.addressTwo2,
        anniversary:
          data.aniver1 === data1.anniversary
            ? data.aniver1
            : Moment(String(new Date(data.aniver1[0]))).format("YYYY-MM-DD"),
        companyID: selectedValue3,
        country:
        (data.countries === undefined)
        ? data1.country
        : (data.countries === null)
          ? null
          : data.countries.value,
        state: data.states11,
        city: data.city1,
        postalCode: data.postalCode2,
        notes: data.notes1,
        guestpreferencenotes: data.guestnotes1,
      });
      let columnsToUpdate = createmarketGroup;
      let res = fetchx(API_URL + `/updateguestprofile?id=${data1.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: columnsToUpdate,
      })
        .then((result) => result.json())
        .then((resp) => {
          
          localStorage.setItem("id", data1["id"]);
          
          if (flag == true) {
            const swalInstance = MySwal.fire({
              text: "Guest Edited Successfully!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Close",
              allowOutsideClick: false,
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
            swalInstance.then((result) => {
              if (result.isConfirmed) {
                navigate("");
              }
            });
           
          } else if (flag == false) {
            const swalInstance = MySwal.fire({
              text: "Guest Edited Successfully. Edit ID Details!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Close",
              allowOutsideClick: false,
              customClass: {
                confirmButton: "btn btn-danger",
              },
            });
            swalInstance.then((result) => {
              if (result.isConfirmed) {
                stepper2.next();
              }
            });

          }
        })
        .catch((error) => {
        });
    }
  };

  const handleReset = () => {
    reset({
      salutation1: null,
      name1: "",
      lastName1: "",
      email1: "",
      phoneNumber: "",
      gstID: "",
      nationality: "",
      dob: "",
      vipID: null,
      addressOne1: "",
      addressTwo: "",
      anniversary1: "",
      companyID1: null,
      country1: null,
      states11: "",
      notes: "",
      city: "",
      postalCode1: "",
      guestpreferencenotes11: "",
    });
  };

  window.onload = function () {
    localStorage.clear();
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="salu">
                    Salutation <spam style={{ color: "red" }}>*</spam>
                  </Label>
                  <Controller
                    required
                    id="salu"
                    control={control}
                    name="salu"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        defaultValue={defaultReason1}
                        options={salutations}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.salu === null,
                        })}
                        {...field}
                        onChange={handleChange1}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="names">
                    First Name <spam style={{ color: "red" }}>*</spam>
                  </Label>
                  <Controller
                    defaultValue={data1["firstName"]}
                    control={control}
                    id="names"
                    name="names"
                    render={({ field }) => (
                      <Input
                        required
                        placeholder="Name"
                        invalid={errors.names && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="surname">
                    Last Name <spam style={{ color: "red" }}>*</spam>
                  </Label>
                  <Controller
                    defaultValue={data1["lastName"]}
                    control={control}
                    id="surname"
                    name="surname"
                    render={({ field }) => (
                      <Input
                        required
                        placeholder="Last Name"
                        invalid={errors.surname && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="emailBasic">
                    Email
                  </Label>
                  <Controller
                    defaultValue={data1["email"]}
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
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="phonenumber">
                    Phone Number
                  </Label>

                  <Controller
                    id="phonenumber"
                    name="phonenumber"
                    control={control}
                    placeholder="1 234 567 8900"
                    render={({ field }) => (
                      <Cleave
                        pattern="^(?:\+[0-9]{10,13}|[0-9]{10,13})$"
                        title="Phone number Can take Max 12 digits with Country Code, 10 digits without Country Code"
                        {...field}
                        value={data1["phoneNumber"]}
                        className={classnames("form-control")}
                        options={{ phone: true, phoneRegionCode: "IN" }}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="vip1">
                    VIP Status
                  </Label>
                  <Controller
                    id="vip1"
                    control={control}
                    name="vip1"
                    render={({ field }) => (
                      <Select
                        defaultValue={defaultReason4}
                        isClearable
                        options={vipID}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          // "is-invalid": data !== null && data.vip1 === null,
                        })}
                        {...field}
                        // onChange={handleChange4}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="beginDate1">
                    Date Of Birth
                  </Label>
                  <Controller
                    defaultValue={data1["dob"]}
                    control={control}
                    id="beginDate1"
                    name="beginDate1"
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        options={doboptions}
                        placeholder="YYYY-MM-DD "
                        className={classnames("form-control", {})}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="aniver1">
                    Anniversary
                  </Label>
                  <Controller
                    defaultValue={data1["anniversary"]}
                    control={control}
                    id="aniver1"
                    name="aniver1"
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        options={options}
                        placeholder="YYYY-MM-DD "
                        className={classnames("form-control", {
                          // 'is-invalid': data !== null && data.aniver1 === null
                        })}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="addresses">
                    Address One
                  </Label>
                  <Controller
                    defaultValue={data1["addressOne"]}
                    control={control}
                    id="addresses"
                    name="addresses"
                    render={({ field }) => (
                      <Input
                        placeholder="Address One"
                        invalid={errors.addresses && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="addressTwo2">
                    Address 2
                  </Label>
                  <Controller
                    control={control}
                    id="addressTwo2"
                    name="addressTwo2"
                    render={({ field }) => (
                      <Input
                        defaultValue={data1["addressTwo"]}
                        placeholder="Address Two"
                        invalid={errors.addressTwo2 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="city1">
                    City
                  </Label>
                  <Controller
                    control={control}
                    id="city1"
                    name="city1"
                    render={({ field }) => (
                      <Input
                        defaultValue={data1["city"]}
                        placeholder="city1"
                        invalid={errors.city1 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="states11">
                    State
                  </Label>
                  <Controller
                    control={control}
                    id="states11"
                    name="states11"
                    render={({ field }) => (
                      <Input
                        defaultValue={data1["state"]}
                        placeholder="State"
                        invalid={errors.states11 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="countries">
                    Country
                  </Label>
                  <Controller
                    // defaultValue={defaultReason}
                    id="countries"
                    control={control}
                    name="countries"
                    render={({ field }) => (
                      <Select
                        isClearable
                        defaultValue={defaultReason}
                        options={countryOptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select")}
                        {...field}
                        // onChange={handleChange}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="postalCode2">
                    PostalCode
                  </Label>
                  <Controller
                    control={control}
                    id="postalCode2"
                    name="postalCode2"
                    render={({ field }) => (
                      <Input
                        defaultValue={data1["postalCode"]}
                        //     pattern='[0-9-]{1,15}'
                        // title="Postal Code can contain numbers . It cannnot contain alphabets and special characters."
                        pattern="[a-zA-Z0-9\-]+"
                        title="Postal Code can contain numbers, alphabets and hyphens only"
                        placeholder="postalCode"
                        invalid={errors.postalCode2 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="gst">
                    GST Number
                  </Label>
                  <Controller
                    control={control}
                    id="gst"
                    name="gst"
                    render={({ field }) => (
                      <Input
                        defaultValue={data1["gstID"]}
                        placeholder="gst"
                        invalid={errors.gst && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="nationalities">
                    Nationality
                  </Label>
                  <Controller
                    // defaultValue={defaultReason}
                    id="nationalities"
                    control={control}
                    name="nationalities"
                    render={({ field }) => (
                      <Select
                        isClearable
                        defaultValue={defaultReason2}
                        options={countryOptions}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select")}
                        {...field}
                        // onChange={handleChange}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="membershipType1">
                    Company Name
                  </Label>
                  <Controller
                    id="membershipType1"
                    control={control}
                    name="membershipType1"
                    render={({ field }) => (
                      <Select
                        // required
                        isClearable
                        defaultValue={defaultReason3}
                        options={companyID}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid":
                            data !== null && data.membershipType1 === null,
                        })}
                        {...field}
                        onChange={handleChange3}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="4" sm="12" className="mb-1">
                <div className="mb-1">
                  <Controller
                    defaultValue={data1["notes"]}
                    control={control}
                    id="notes1"
                    name="notes1"
                    render={({ field }) => (
                      <InputGroup>
                        <InputGroupText>Profile Notes</InputGroupText>
                        <Input
                          isClearable
                          placeholder=" Profile Notes"
                          type="textarea"
                          // pattern='[A-Za-z_]{1,15}'
                          // title=" guestpreferencenotes can contain alphabets . It cannnot contain numbers and special characters." required
                          invalid={errors.notes1 && true}
                          {...field}
                        />
                      </InputGroup>
                    )}
                  />
                </div>
              </Col>

              <Col md="5" sm="12" className="mb-1">
                <div className="mb-1">
                  <Controller
                    defaultValue={data1["guestpreferencenotes"]}
                    control={control}
                    id="guestnotes1"
                    name="guestnotes1"
                    render={({ field }) => (
                      <InputGroup>
                        <InputGroupText>Guest Preference Notes</InputGroupText>
                        <Input
                          isClearable
                          placeholder=" Guest Preference Notes"
                          type="textarea"
                          // pattern='[A-Za-z_]{1,15}'
                          // title=" guestpreferencenotes can contain alphabets . It cannnot contain numbers and special characters." required
                          invalid={errors.guestnotes1 && true}
                          {...field}
                        />
                      </InputGroup>
                    )}
                  />
                </div>
              </Col>
            </Row>

            <div className="vertically-centered-modal">
              <Modal
                isOpen={centeredModal}
                toggle={() => setCenteredModal(!centeredModal)}
                className="modal-xl"
              >
                <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
                  Vertically Centered
                </ModalHeader>
                <ModalBody>{/* <ViewModal /> */}</ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    onClick={() => setCenteredModal(!centeredModal)}
                  >
                    Accept
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
            <div align='end' className='buttons' >
              {/* <div className="d-flex"> */}
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  onClick={() => setflag(false)}
                >
                  Save And Next
                </Button>
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  onClick={() => setflag(true)}
                >
                  Save And Exit
                </Button>
                <Button
                  outline
                  color="secondary"
                  type="reset"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              {/* </div> */}
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Floor;
