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
import App from "./roomTypeDataTable";

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

const roomTypeOptions = [
  { value: "KSUP", label: "KSUP" },
  { value: "TSUP", label: "TSUP" },
  { value: "KDLX", label: "KDLX" },
  { value: "TDLX", label: "TDLX" },
  { value: "KCLB", label: "KCLB" },
  { value: "PM", label: "PM" },
];



const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];



const defaultValues = {
  // hotelID: "",
      roomType: null,
      maxAdults: "",
      maxChildren: "",
      totalNumOfRooms: "",
      isActive: null,
      roomClassID: "",
}

const ValidationThirdPartyComponents = () => {
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
      data.roomType !== null &&
      data.maxAdults !== null &&
      data.maxChildren!==null &&
      data.totalNumOfRooms!==null &&
      data.isActive !== null &&
      data.roomClassID !== null
    ) {
      console.log(data);
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "roomType": data.roomType.value,
        "maxAdults": data.maxAdults,
        "maxChildren": data.maxChildren,
        "totalNumOfRooms": data.totalNumOfRooms,
        "isActive": data.isActive.value,
        "roomClassID": data.roomClassID,
        
      });
      console.log(createasset);
      let res = fetchx(API_URL + "/addroomtype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        console.log(res);
      });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <ul className="list-unstyled mb-0">
              {/* <li>
                <strong>Hotel ID</strong>: {data.hotelID}
              </li> */}
              <li>
                <strong>Room Type</strong>: {data.roomType.value}
              </li>
              <li>
                <strong>Maximum Adults</strong>: {data.maxAdults}
              </li>
              <li>
                <strong>Maximum Childrens</strong>: {data.maxChildren}
              </li>
              <li>
                <strong>Total Number of Rooms</strong>: {data.totalNumOfRooms}
              </li>
              <li>
                <strong>Active Status</strong>: {data.isActive.value}
              </li>
              <li>
                <strong>Room Class ID</strong>: {data.roomClassID}
              </li>
              
              
            </ul>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: "",
      roomType: null,
      maxAdults: "",
      maxChildren: "",
      totalNumOfRooms: "",
      isActive: null,
      roomClassID: "",
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Room Type</CardTitle>
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
            <Label className="form-label" for="roomType">
            Room Type
            </Label>
            <Controller
              id="roomType"
              control={control}
              name="roomType"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={roomTypeOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.roomType === null,
                  })}
                  {...field}
                  
                />
              )}
            />
          </div>
          </Col>
         
         
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="maxAdults">
              Maximum Adults
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.maxAdults === null || !data.maxAdults.length)
                })}
              ></InputGroupText>
              <Controller
                id="maxAdults"
                name="maxAdults"
                control={control}
                placeholder="maxAdults"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.maxAdults === null || !data.maxAdults.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='maxChildren'>
              Maximum Childrens
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.maxChildren== null || !data.maxChildren.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='maxChildren'
                name='maxChildren'
                control={control}
                placeholder='maxChildren'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.maxChildren === null || !data.maxChildren.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='totalNumOfRooms'>
            Total Number Of Rooms
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.totalNumOfRooms == null || !data.totalNumOfRooms.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='totalNumOfRooms'
                name='totalNumOfRooms'
                control={control}
                placeholder='totalNumOfRooms'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.totalNumOfRooms=== null || !data.totalNumOfRooms.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="isActive">
              Is Active
            </Label>
            <Controller
              id="isActive"
              control={control}
              name="isActive"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={activeoptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.isActive === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='roomClassID'>
            Room Class ID
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.roomClassID == null || !data.roomClassID.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='roomClassID'
                name='roomClassID'
                control={control}
                placeholder='roomClassID'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.roomClassID=== null || !data.roomClassID.length)
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
    <App/>
    </div>
  );
};

export default ValidationThirdPartyComponents;
