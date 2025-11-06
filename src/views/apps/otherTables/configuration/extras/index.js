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
import App from "./extrasDataTable";

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

const typeOptions = [
  { value: 'Percentage', label: 'Percentage' },
  { value: 'Amount', label: 'Amount' },
  { value: 'Pieces', label: 'Pieces' },
  { value: 'Trips', label: 'Trips' },
]

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];



const defaultValues = {
  // hotelID: "",
      extraCode: '',
      description: "",
      groupID: "",
      subGroupID: "",
      remarks: "",
      type: null,
      percentage: "",
      amount: "",
      pieces: '',
      trips: "",
      isActive: null
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
      data.extraCode !== null &&
      data.description !== null &&
      data.groupID!==null &&
      data.subGroupID!==null &&
      data.remarks !== null &&
      data.type !== null &&
      data.percentage !== null &&
      data.amount !== null &&
      data.pieces !== null &&
      data.trips !== null &&
      data.isActive !== null

    ) {
      console.log(data);
      let createExtra = JSON.stringify({
        // "hotelID": data.hotelID,
        "extraCode": data.extraCode,
        "description": data.description,
        "groupID": data.groupID,
        "subGroupID": data.subGroupID,
        "remarks": data.remarks,
        "type": data.type.value,
        "percentage": data.percentage,
        "amount": data.amount,
        "pieces": data.pieces,
        "trips": data.trips,
        "isActive": data.isActive.value,
      });
      console.log(createExtra);
      let res = fetchx(API_URL + "/addextra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createExtra,
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
            <h4>Extras Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: "",
      extraCode: '',
      description: "",
      groupID: "",
      subGroupID: "",
      remarks: "",
      type: null,
      percentage: "",
      amount: "",
      pieces: '',
      trips: "",
      isActive: null
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Extras</CardTitle>
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
            <Label className='form-label' for='extraCode'>
              Extra Code
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='extraCode'
              name='extraCode'
              render={({ field }) => <Input placeholder='Extra Code' required className={classnames({
                "is-invalid": data !== null && (data.extraCode === null || !data.extraCode.length)
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
              render={({ field }) => <Input required placeholder="Description" className={classnames({
                "is-invalid": data !== null && (data.description === null || !data.description.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="transactionCode">
            Group ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.groupID === null || !data.groupID.length)
                })}
              ></InputGroupText>
              <Controller
                id="groupID"
                name="groupID"
                control={control}
                render={({ field }) => (
                  <Cleave
                  placeholder="GoupID"
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.groupID === null || !data.groupID.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="subGroupID">
            Sub Group ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.subGroupID === null || !data.subGroupID.length)
                })}
              ></InputGroupText>
              <Controller
                id="subGroupID"
                name="subGroupID"
                control={control}
                render={({ field }) => (
                  <Cleave
                  placeholder="subGroupID"
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.subGroupID === null || !data.subGroupID.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='remarks'>
              Remarks
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='remarks'
              name='remarks'
              render={({ field }) => <Input placeholder="Remarks" required className={classnames({
                "is-invalid": data !== null && (data.remarks === null || !data.remarks.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>

          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="type">
              Type
            </Label>
            <Controller
              id="type"
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={typeOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.type === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="percentage">
             Percentage
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.percentage === null || !data.percentage.length)
                })}
              ></InputGroupText>
              <Controller
                id="percentage"
                name="percentage"
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                  placeholder="Percentage"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.percentage === null || !data.percentage.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='amount'>
            Amount
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.amount=== null || !data.amount.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='amount'
                name='amount'
                control={control}
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                  placeholder='Amount'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.amount === null || !data.amount.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='pieces'>
            Pieces
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.pieces=== null || !data.pieces.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='pieces'
                name='pieces'
                control={control}
                render={({ field }) => (
                  <Cleave
                  placeholder='Pieces'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.pieces === null || !data.pieces.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='trips'>
            Trips
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.trips=== null || !data.trips.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='trips'
                name='trips'
                control={control}
                render={({ field }) => (
                  <Cleave
                  placeholder='Trips'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.trips === null || !data.trips.length)
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
    <App/>
    </div>
  );
};

export default ValidationThirdPartyComponents;
