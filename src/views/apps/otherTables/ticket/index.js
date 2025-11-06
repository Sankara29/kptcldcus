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
import App from "./ticketDataTable";

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



const defaultValues = {
  createdBy: "",
  createdAt: null,
  room: "",
  area: "",
  category  : "",
  priority : "",
  subject: "",
  description  : "",
  fileUpload : "",
  status: "",
  agent  : "",
  SLADateAndTime : null,
};


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
      data.createdBy !== null &&
      data.createdAt !== null &&
      data.room !== null&&
      data.area!==null &&
      data.category !== null &&
      data.priority !== null &&
      data.subject !== null &&
      data.description !== null &&
      data.fileUpload !== null &&
      data.status !== null &&
      data.agent !== null &&
      data.SLADateAndTime!== null
    ) {
      console.log(data);
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "createdBy": data.createdBy,
        "createdAt": data.createdAt,
        "room": data.room,
        "area": data.area,
        "category": data.category,
        "priority": data.priority,
        "subject": data.subject,
        "description": data.description,
        "fileUpload": data.fileUpload,
        "status": data.status,
        "agent": data.agent,
        "SLADateAndTime": data.SLADateAndTime,
      });
      console.log(createasset);
      let res = fetchx(API_URL + "/addticket", {
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
                <strong>Created By</strong>: {data.createdBy}
              </li>
              <li>
                <strong>Created At</strong>: {data.String(new Date(data.createdAt[0]))}
              </li>
              <li>
                <strong>Room</strong>: {data.room}
              </li>
              <li>
                <strong>Area</strong>: {data.area}
              </li>
              <li>
                <strong>Category</strong>: {data.category}
              </li>
              <li>
                <strong>Priority</strong>: {data.priority}
              </li>
              <li>
                <strong>Subject</strong>: {data.subject}
              </li>
              <li>
                <strong>Description</strong>: {data.description}
              </li>
              <li>
                <strong>File Upload</strong>: {data.fileUpload}
              </li>
              <li>
                <strong>Subject</strong>: {data.status}
              </li>
              <li>
                <strong>Agent</strong>: {data.agent}
              </li>
              <li>
                <strong>SLA Date And Time</strong>: {String(new Date(data.SLADateAndTime[0]))}
              </li>
             
             
            </ul>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      createdBy: "",
      createdAt: null,
      room: "",
      area: "",
      category  : "",
      priority : "",
      subject: "",
      description  : "",
      fileUpload : "",
      status: "",
      agent  : "",
      SLADateAndTime : null,
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Ticket</CardTitle>
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
            <div className='mb-1'>
            <Label className='form-label' for='createdBy'>
            Created By
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='createdBy'
              name='createdBy'
              render={({ field }) => <Input className={classnames({
                "is-invalid": data !== null && (data.createdBy === null || !data.createdBy.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='createdAt'>
            Created At
            </Label>
            <Controller
              control={control}
              id='createdAt'
              name='createdAt'
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.createdAt === null
                  })}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='room'>
            Room
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.room=== null || !data.room.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='room'
                name='room'
                control={control}
                placeholder='room'
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.room === null || !data.room.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='area'>
            Area
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='area'
              name='area'
              render={({ field }) => <Input className={classnames({
                "is-invalid": data !== null && (data.area === null || !data.area.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='category'>
            Category
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.category=== null || !data.category.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='category'
                name='category'
                control={control}
                placeholder='category'
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.category === null || !data.category.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='priority'>
            Priority
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='priority'
              name='priority'
              render={({ field }) => <Input className={classnames({
                "is-invalid": data !== null && (data.priority === null || !data.priority.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='subject'>
            Subject
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='subject'
              name='subject'
              render={({ field }) => <Input className={classnames({
                "is-invalid": data !== null && (data.subject === null || !data.subject.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='description'>
            Description
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='description'
              name='description'
              render={({ field }) => <Input className={classnames({
                "is-invalid": data !== null && (data.description === null || !data.description.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='fileUpload'>
            File Upload
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='fileUpload'
              name='fileUpload'
              render={({ field }) => <Input type='file'className={classnames({
                "is-invalid": data !== null && (data.fileUpload === null || !data.fileUpload.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='status'>
            Status
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='status'
              name='status'
              render={({ field }) => <Input className={classnames({
                "is-invalid": data !== null && (data.status === null || !data.status.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='agent'>
            Agent
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.agent=== null || !data.agent.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='agent'
                name='agent'
                control={control}
                placeholder='agent'
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.agent === null || !data.agent.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='SLADateAndTime'>
            SLA Date And Time
            </Label>
            <Controller
              control={control}
              id='SLADateAndTime'
              name='SLADateAndTime'
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.SLADateAndTime === null
                  })}
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
    <App/>
    </div>
  );
};

export default ValidationThirdPartyComponents;
