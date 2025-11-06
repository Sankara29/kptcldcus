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


const activeoptions = [
  { value: '1', label: "Active" },
  { value: '0', label: "InActive" },
];


const defaultValues = {
  documentType: ""
};

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    if (
      data.documentType !== null
    ) {
      console.log(data);
      let createcancellation = JSON.stringify({
        "documentType": data.documentType,
        
      });
      console.log(createcancellation);
      let res = fetchx(API_URL + "/adddocumentType", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createcancellation,
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
              <li>
                <strong>Document Type</strong>: {data.documentType}
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
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Document Type</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='documentType'>
             Document Type
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.documentType=== null || !data.documentType.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='documentType'
                name='documentType'
                control={control}
                placeholder='Document Type'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.documentType === null || !data.documentType.length)
                    })}
                  />
                )}
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
  );
};

export default ValidationThirdPartyComponents;
