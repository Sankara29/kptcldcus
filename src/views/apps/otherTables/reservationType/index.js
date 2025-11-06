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
  Card,
  Form,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText,
  Input,
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
  HotelID: "",
  ReservationType: "",
  isActive: null,
};

const ValidationThirdPartyComponents = () => {
  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    if (
      data.HotelID !== null &&
      data.ReservationType !== null &&
      data.isActive !== null
    ) {
      let createreservationtype = JSON.stringify({
        hotelID: data.HotelID,
        reservationType: data.ReservationType,
        isActive: data.isActive.value,
      });
      console.log(createreservationtype);
      let res = fetchx(
        API_URL + "/addreservationtype", {
          method:"POST", 
          headers:{"Content-Type":"application/json"}, 
          body:createreservationtype
        }).then((res) => {
          console.log(res)
        });
        
        
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Reservation Type Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      HotelID: "",
      ReservationType: "",
      isActive: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Reservation Type</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="mb-1">
            <Label className="form-label" for="HotelID">
              Hotel ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.HotelID === null)
                })}
              ></InputGroupText>
              <Controller
                id="HotelID"
                name="HotelID"
                control={control}
                placeholder="Hotel ID"
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.HotelID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div> */}
          <div className="mb-1">
            <Label className="form-label" for="ReservationType">
              Reservation Type
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.ReservationType === null || !data.ReservationType.length)
                })}
              ></InputGroupText>
              <Controller
                id="ReservationType"
                name="ReservationType"
                control={control}
                placeholder="Reservation Type"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.ReservationType === null || !data.ReservationType.length)
                    })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}
                  />
                )}
              />
            </InputGroup>
          </div>
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
        </Form>
      </CardBody>
    </Card>
  );
};

export default ValidationThirdPartyComponents;
