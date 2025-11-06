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





const defaultValues = {
  // hotelID: "",
      extraID: '',
      groupID: '',
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
      data.extraID !== null &&
      data.groupID!==null
      // !data.extraID.length==null &&
      // !data.groupID.length==null

    ) {
      console.log(data);
      let createExtraGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        "extraID": data.extraID,
        "groupID": data.groupID
      });
      console.log(createExtraGroup);
      let res = fetchx(API_URL + "/addextragroup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createExtraGroup,
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
            <h4>Extra Group Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: "",
      extraID: '',
      groupID: '',
      
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Extra Group</CardTitle>
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
            <Label className='form-label' for='extraID'>
              Extra ID
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='extraID'
              name='extraID'
              render={({ field }) => <Input pattern="[0-9]*" title="Only Numbers Allowed" required placeholder='Extra Group' className={classnames({
                "is-invalid": data !== null && (data.extraID === null || !data.extraID.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='groupID'>
              Group ID
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='groupID'
              name='groupID'
              render={({ field }) => <Input pattern="[0-9]*" title="Only Numbers Allowed" required placeholder='Group ID' className={classnames({
                "is-invalid": data !== null && (data.groupID === null || !data.groupID.length)
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
    {/* <App/> */}
    </div>
  );
};

export default ValidationThirdPartyComponents;
