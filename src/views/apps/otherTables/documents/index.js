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
import App from "./documentsDataTable";

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
      documentType: "",
      reservation: "",
      invoice: "",
      document: "",
};

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }} = useForm({ defaultValues });

  const onSubmit = (data) => {setData(data);
    console.log(data)
    if (
      // data.hotelID !== null &&
      data.documentType !== null &&
      data.reservation !== null &&
      data.invoice !== null &&
      data.document!==null
    ) {
      console.log(data);
      let createdocuments = JSON.stringify({
        // "hotelID": data.hotelID,
        "documentType": data.documentType,
        "reservation": data.reservation,  
        "invoice": data.invoice,
        "document": data.document,
      });
      console.log(createdocuments);
      let res = fetchx(API_URL + "/adddocuments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createdocuments,
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
                <strong>Document Type</strong>: {data.documentType}
              </li>
              <li>
                <strong>Reservation</strong>: {data.reservation}
              </li>
              <li>
                <strong>Invoice</strong>: {data.invoice}
              </li>
              <li>
                <strong>Document</strong>: {data.Document}
              </li>
            </ul>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      documentType: "",
      reservation: "",
      invoice: "",
      document: "",
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Documents</CardTitle>
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
            <Label className='form-label' for='	documentType'>
            Document Type
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='documentType'
              name='documentType'
              render={({ field }) => <Input type='text' required className={classnames({
                "is-invalid": data !== null && (data.documentType === null || !data.documentType.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="reservation">
            Reservation
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.reservation === null || !data.reservation.length)
                })}
              ></InputGroupText>
              <Controller
                id="reservation"
                name="reservation"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                  placeholder="Reservation"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.reservation === null || !data.reservation.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='document'>
            Document
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='document'
              name='document'
              placeholder='Add Document'
              render={({ field }) => <Input type='file' required className={classnames({
                "is-invalid": data !== null && (data.document === null || !data.document.length)
              })} {...field}/>}
            />
            </InputGroup>
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
