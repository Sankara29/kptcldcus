
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
import App from "./transactionCodeDataTable";

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
  // hotelID: "",
      transactionCode: "",
      description: "",
      groupID: "",
      subGroupID: "",
      baseRate	: "",
      taxPercentage: "",
      discountAllowed: null,
      isAllowance: null,
      isActive: null,
      allowanceCodeID: "",
      commissionOrServiceChargePercentage: "",
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
      data.transactionCode !== null &&
      data.description !== null &&
      data.groupID!==null &&
      data.subGroupID!==null &&
      data.baseRate !== null &&
      data.taxPercentage !== null &&
      data.discountAllowed !== null &&
      data.isAllowance !== null &&
      data.isActive !== null &&
      data.allowanceCodeID !== null &&
      data.commissionOrServiceChargePercentage !== null
    ) {
      console.log(data);
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "transactionCode": data.transactionCode,
        "description": data.description,
        "groupID": data.groupID,
        "subGroupID": data.subGroupID,
        "baseRate": data.baseRate,
        "taxPercentage": data.taxPercentage,
        "discountAllowed": data.discountAllowed.value,
        "isAllowance": data.isAllowance.value,
        "isActive": data.isActive.value,
        "allowanceCodeID": data.allowanceCodeID,
        "commissionOrServiceChargePercentage": data.commissionOrServiceChargePercentage,
      });
      console.log(createasset);
      let res = fetchx(API_URL + "/addtransactioncode", {
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
                <strong>Transaction Code</strong>: {data.transactionCode}
              </li>
              <li>
                <strong>Description</strong>: {data.description}
              </li>
              <li>
                <strong>Group ID</strong>: {data.groupID}
              </li>
              <li>
                <strong>Sub Group ID</strong>: {data.subGroupID}
              </li>
              <li>
                <strong>Base Rate</strong>: {data.baseRate}
              </li>
              <li>
                <strong>Tax Percentage %</strong>: {data.taxPercentage}
              </li>
              <li>
                <strong>Discount Allowed</strong>: {data.discountAllowed.value}
              </li>
              <li>
                <strong>Is Allowance</strong>: {data.isAllowance.value}
              </li>
              <li>
                <strong>Allowance Code</strong>: {data.allowanceCodeID}
              </li>
              <li>
                <strong>Commission / Service Charge Percentage</strong>: {data.commissionOrServiceChargePercentage}
              </li>
              <li>
                <strong>Active Status</strong>: {data.isActive.value}
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
      transactionCode: "",
      description: "",
      groupID: "",
      subGroupID: "",
      baseRate	: "",
      taxPercentage: "",
      discountAllowed: null,
      isAllowance: null,
      isActive: null,
      allowanceCodeID: "",
      commissionOrServiceChargePercentage: "",
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Transaction Code</CardTitle>
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
            <Label className="form-label" for="transactionCode">
            Transaction Code
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.transactionCode === null || !data.transactionCode.length)
                })}
              ></InputGroupText>
              <Controller
                id="transactionCode"
                name="transactionCode"
                control={control}
                placeholder="transactionCode"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.transactionCode === null || !data.transactionCode.length)
                    })}
                  />
                )}
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
              render={({ field }) => <Input  className={classnames({
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
                placeholder="groupID"
                render={({ field }) => (
                  <Cleave
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
                placeholder="subGroupID"
                render={({ field }) => (
                  <Cleave
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
          <div className="mb-1">
            <Label className="form-label" for="baseRate">
            Base Rate
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.baseRate === null || !data.baseRate.length)
                })}
              ></InputGroupText>
              <Controller
                id="baseRate"
                name="baseRate"
                control={control}
                placeholder="baseRate"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.baseRate === null || !data.baseRate.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='taxPercentage'>
            Tax Percentage %
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.taxPercentage=== null || !data.taxPercentage.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='taxPercentage'
                name='taxPercentage'
                control={control}
                placeholder='taxPercentage'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.taxPercentage === null || !data.taxPercentage.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="discountAllowed">
              Discount Allowed
            </Label>
            <Controller
              id="discountAllowed"
              control={control}
              name="discountAllowed"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={discountAllowedOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.discountAllowed === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="isAllowance">
              Is Allowance
            </Label>
            <Controller
              id="isAllowance"
              control={control}
              name="isAllowance"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={isAllowanceOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.isAllowance === null,
                  })}
                  {...field}
                />
              )}
            />
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
          <div className="mb-1">
            <Label className="form-label" for="city">
              Allowance Code
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.allowanceCodeID === null || !data.allowanceCodeID.length)
                })}
              ></InputGroupText>
              <Controller
                id="allowanceCodeID"
                name="allowanceCodeID"
                control={control}
                placeholder="allowanceCodeID"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.allowanceCodeID === null || !data.allowanceCodeID.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="commissionOrServiceChargePercentage">
              Commission / Service Charge Percentage
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.commissionOrServiceChargePercentage === null || !data.commissionOrServiceChargePercentage.length)
                })}
              ></InputGroupText>
              <Controller
                id="commissionOrServiceChargePercentage"
                name="commissionOrServiceChargePercentage"
                control={control}
                placeholder="commissionOrServiceChargePercentage"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.commissionOrServiceChargePercentage === null || !data.commissionOrServiceChargePercentage.length)
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
