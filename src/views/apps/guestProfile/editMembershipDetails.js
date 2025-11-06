import { useState } from "react";
import Select from "react-select";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import Moment from "moment";
import { selectThemeColors } from "@utils";
import {Input,Card,Form,Row,Col,Label, Button,CardBody,} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import "/node_modules/ag-grid-community/styles/ag-grid.css";
import "/node_modules/ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from 'react-router-dom';
import API_URL from "../../../config";

const defaultValues = {
  membershipType: null,
  membershipNo: "",
  name: "",
  membershipSince: "",
  membershipLevel: null,
  expiryDate: null,
};

const membershipType = [
  { value: "1", label: "OterraBlack" },
  { value: "2", label: "OterraGold" },
  { value: "3", label: "OterraSilver" },
  { value: "4", label: "OterraPlatinum" },
];

const levels = [
  { value: "1", label: "Black" },
  { value: "2", label: "Gold" },
  { value: "3", label: "Silver" },
  { value: "4", label: "Platinum" },
];

const Membership = ({ stepper2, type, data1 }) => {
  const [selectedValue,  setSelectedValue] = useState();
  const [selectedValue1, setSelectedValue1] = useState();
  const [reload, setreload] = useState(true);
  const {  setError,  formState: { errors },} = useForm();
  const [data, setData] = useState(null);
  const { reset, handleSubmit, control } = useForm({ defaultValues });
  let navigate = useNavigate();
  const today = Moment().format('YYYY-MM-DD');
  const options = { minDate: today};
  const options1 = { maxDate: today}; 

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption.value);
    localStorage.removeItem("membershipDetails.membershipType");
    localStorage.setItem(
      "membershipDet  const onSubmails.membershipType",
      selectedOption.label
    );
    localStorage.setItem(
      "membershipDetails.membershipType",
      selectedOption.value
    );
    setreload(false);
    setTimeout(() => {
      setreload(true);
    }, 1);
  };

  const defaultReason = {
    value: data1.membershipDetails ? data1.membershipDetails.membershipType : ' ',
    label: data1.membershipDetails ? data1.membershipDetails.membershipType : ' ',
  };

  const handleChange1 = (selectedOption1) => {
    setSelectedValue1(selectedOption1.value);
     localStorage.removeItem("membershipDetails.membershipLevel");
    localStorage.setItem(
      "membershipDetails.membershipLevel",
      selectedOption1.label
    );
    localStorage.setItem(
      "membershipDetails.membershipLevel",
      selectedOption1.value
    );

    setreload(false);
    setTimeout(() => {
      setreload(true);
    }, 1);
  };

  const defaultReason1 = {
    value: data1.membershipDetails ? data1.membershipDetails.membershipLevel : '',
    label: data1.membershipDetails ? data1.membershipDetails.membershipLevel : '',
  };
  const navigatepage = () => {
    navigate('');
  };
  
  const nextPage = () => {
    stepper2.next();
  };

  const onSubmit = (data) => {
    setData(data);
    let createmarketGroup = JSON.stringify({
      membershipType: selectedValue,
      membershipNo: data.membershipNo1,
      nameOnCard: data.name2,
      membershipSince: Moment( String(new Date(data.membershipSince1[0]))  ).format("YYYY-MM-DD"),
      membershipLevel: selectedValue1,
      expiryDate: Moment(String(new Date(data.expiryDate1[0]))).format("YYYY-MM-DD" ),
      isPrimary:1,
      guestID: data1.id,
      hotelId:10
    });
    localStorage.removeItem("guestID");

    let res = fetchx(API_URL + `/updatemembershipdetails?guestID=${data1.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: createmarketGroup,
      }
    ).then((res) => {
      if (res["status"] == 200) {
        fetchx(API_URL + "/getGuestProfileNew?hotelID=1")
          .then((result) => result.json())
          .then((rowData) => {
            setRowData(rowData["data"]);
          });
      }
      navigate('')  
    });
 
  };

  const handleReset = () => {
    reset({
      membershipType: null,
      membershipNo: "",
      name: "",
      membershipSince: "",
      membershipLevel: null,
      expiryDate: null,
    });
  };

  return (
    <div>
      <Card>        
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>             
              <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='membershipType1'>
            Membership Type
            </Label>
            <Controller
              id='membershipType1'
              control={control}
              name='membershipType1'
              render={({ field }) => (
                <Select
                // required
                  isClearable
                  defaultValue={defaultReason}
                  options={membershipType}
                  classNamePrefix='select'
                  theme={selectThemeColors}
                 
                  {...field}
                  onChange={handleChange} 

                />
              )}
            />
          </div>
          </Col>
              <Col md="4" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="membershipNo1">
                    Membership No
                  </Label>
                  <Controller
                    defaultValue={data1.membershipDetails.membershipNo}
                    control={control}
                    id="membershipNo1"
                    name="membershipNo1"
                    render={({ field }) => (
                      <Input
                        placeholder="Membership No"
                        invalid={errors.membershipNo1 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="4" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="name2">
                    Name On Card
                  </Label>
                  <Controller
                    defaultValue={data1.membershipDetails.nameOnCard}
                    control={control}
                    id="name2"
                    name="name2"
                    render={({ field }) => (
                      <Input
                        placeholder="Name"
                        invalid={errors.name2 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="4" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="membershipSince1">
                    Membership Since
                  </Label>
                  <Controller
                    defaultValue={data1.membershipDetails.membershipSince}
                    control={control}
                    id="membershipSince1"
                    name="membershipSince1"
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        options={options1}
                        placeholder="YYYY-MM-DD "
                        className={classnames("form-control", {
                          "is-invalid":
                            data !== null && data.membershipSince1 === null,
                        })}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="4" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="level1">
                    Level
                  </Label>
                  <Controller
                    id="level1"
                    control={control}
                    name="level1"
                    render={({ field }) => (
                      <Select
                        defaultValue={defaultReason1}
                        isClearable
                        options={levels}
                        classNamePrefix="select"
                        theme={selectThemeColors}                        
                        {...field}
                        onChange={handleChange1}
                      />
                    )}
                  />
                </div>
              </Col>

              <Col md="4" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="expiryDate1">
                    Expiry Date
                  </Label>
                  <Controller
                    defaultValue={data1.membershipDetails.expiryDate}
                    control={control}
                    id="expiryDate1"
                    name="expiryDate1"
                    render={({ field }) => (
                      <Flatpickr
                        {...field}
                        // options={{ allowInput: true }}
                        options={options}
                        placeholder="YYYY-MM-DD "
                        className={classnames("form-control", {
                          "is-invalid":
                            data !== null && data.expiryDate1 === null,
                        })}
                      />
                    )}
                  />
                </div>
              </Col>
            </Row>
            <div align='end' className='buttons'>
              <Button className="me-1" color="primary" type="submit">  Submit </Button>
              <Button outline color="secondary" className='me-1' type="reset" onClick={handleReset} > Reset </Button>
             <Button color='primary' className='me-1' type='button' onClick={nextPage}> Next  </Button> 
              <Button color='primary' className='me-1' type='button' onClick={navigatepage}> Exit  </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      
    </div>
  );
};
export default Membership;