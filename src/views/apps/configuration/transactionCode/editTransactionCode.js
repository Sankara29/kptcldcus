import { useState } from "react";
import Select from "react-select";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { selectThemeColors } from "@utils";
import {Input,Card,Form,Label,Button,InputGroup,Row,Col,} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import API_URL from "../../../../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const discountAllowedOptions = [
  { value: 0, label: "No" },
  { value: 1, label: "Yes" },
];

const defaultValues = {
  transactionCode: "",
  description: "",
  groupID: null,
  subGroupID: null,
  baseRate: "",
  taxPercentage: null,
  discountAllowed: null,
  hsn_sacCode: "",
};

let groupID = [
  fetchx(API_URL + "/getforeignkeygroupid?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      groupID = resp["data"];
      // console.log(groupID);
    }),
];

let subGroupID = [
  fetchx(API_URL + "/getforeignkeysubgroup?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      subGroupID = resp["data"];
      // console.log(subGroupID);
    }),
];

let taxPercentage = [
  fetchx(API_URL + "/gettransactioncodetaxpercentage?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      taxPercentage = resp["data"];
      // console.log(taxPercentage);
    }),
];

const TransactionCode = (data1) => {
  // console.log(data1.data1);
  const [showForm, setShowForm] = useState(true);
  const [data, setData] = useState(null);
  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors },} = useForm({ defaultValues });
  let navigate = useNavigate();
  const [selectedValue,  setSelectedValue] =  useState(data1.data1.groupID);

  //Country And Nationality
    const defaultReason = {
    value: data1.data1.groupID,
    label: data1.data1.groupCode,    
  };
  //Salutation
  const defaultReason1 = {
    value: data1.data1.subGroupID,
    label: data1.data1.subGroup,    
  };

  let defaultReason2;
  

  if(data1.data1.discountAllowed == 1){
    defaultReason2 = {
      value: data1.data1.discountAllowed,
      label: "Yes",    
    };
  }
  else{
    defaultReason2 = {
      value: data1.data1.discountAllowed,
      label: "No",    
    };
  }
 
  // console.log(defaultReason2)
  
  const onSubmit = (data) => {
    // console.log(data.grpName)
    // console.log(data.subGrpname)

    // console.log(data)

    setData(data);
    data["accountType"] = selectedValue;
    if (data.accountType !== null && data.accountName !== null) {
      // console.log(data);
      let createmarketGroup = JSON.stringify({
        id: data1.data1.id,
        transactionCode: data.transactionCode1,
        description: data.description1,
        groupID: data.grpName.value === undefined ? data1.data1.groupID : data.grpName.value,
        subGroupID: data.subGrpname === undefined ? data1.data1.subGroupID : data.subGrpname.value,
        baseRate: data.baseRate1,
        discountAllowed: data.discAllowed === undefined ? data1.data1.discountAllowed : data.discAllowed.value,
        hsn_sacCode: data.hsnSacCode1,
      });
      // console.log(createmarketGroup);
      // console.log("hi");
      let res = fetchx(API_URL + `/updateTransactionCode`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: createmarketGroup,
      })
        .then((result) => result.json())
        .then((resp) => {        
          // console.log(resp);
          // console.log(resp["data"])
          // console.log(data)
          // console.log(resp["accountsName"])
          // console.log(flag==true)
          // console.log(flag)
          // console.log(flag==false)
        //  if(flag==true){
            const swalInstance = MySwal.fire({
       text: 'Transaction Code  Details Updated Successfully!',
       icon: 'success',
       buttonsStyling: false,
       confirmButtonText: 'Close',
       allowOutsideClick: false,
       customClass: {
         confirmButton: 'btn btn-danger'
       }
     });
     swalInstance.then((result) => {
       if (result.isConfirmed) {      
         navigate('');
       }
     }); 
         //  navigate('');
          // console.log('Save and exit after form submit')
         
        //  }
        //  else if(flag==false){
        //   const swalInstance = MySwal.fire({
        //     text: 'Company Basic Details Edited Successfully. Edit BTC Details!',
        //     icon: 'success',
        //     buttonsStyling: false,
        //     confirmButtonText: 'Close',
        //     allowOutsideClick: false,
        //     customClass: {
        //       confirmButton: 'btn btn-danger'
        //     }
        //   });
        //   swalInstance.then((result) => {
        //     if (result.isConfirmed) {      
        //       stepper2.next(); 
        //     }
        //   }); 
        
        //  console.log('Save and next after form submit')
        // }
        })
        .catch((error) => {
          console.log(error);
        });     
    }
  };


  const handleReset = () => {
    reset({
      transactionCode: "",
      description: "",
      groupID: null,
      subGroupID: null,
      baseRate: "",
      taxPercentage: null,
      discountAllowed: null,
      hsn_sacCode: "",
    });
  };
  // function EnableEdit() {
  //   seteditable(false);
  //   setShowForm(false);
  //   setTimeout(() => {
  //     setShowForm(true);
  //   }, 100);
  // }
  function InputForm() {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="3" sm="12">
            <div className="mb-1">
              <Label className="form-label" for="transactionCode1">
                Transaction Code <spam style={{ color: "red" }}>*</spam>
              </Label>
              <Controller
                defaultValue={data1.data1.transactionCode}
                control={control}
                id="transactionCode1"
                name="transactionCode1"
                render={({ field }) => (
                  <Input
                    required
                    placeholder="Name"
                    invalid={errors.transactionCode1 && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>
          <Col md="3" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="description1">
                Description <spam style={{ color: "red" }}>*</spam>
              </Label>
              <InputGroup className="input-group-merge">
                <Controller
                  defaultValue={data1.data1.description}
                  control={control}
                  id="description1"
                  name="description1"
                  render={({ field }) => (
                    <Input
                      placeholder="Description"
                      required
                      className={classnames({})}
                      {...field}
                    />
                  )}
                />
              </InputGroup>
            </div>
          </Col>
         
          <Col md="3" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="grpName">
                  Group <spam style={{ color: "red" }}>*</spam>
                  </Label>
                  <Controller
                    // defaultValue={defaultReason}
                    id="grpName"
                    control={control}
                    name="grpName"
                    defaultValue={defaultReason}
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={groupID}
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
              
          <Col md="3" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="subGrpname">
                Sub Group <spam style={{ color: "red" }}>*</spam>
              </Label>
              <Controller
                id="subGrpname"
                control={control}
                name="subGrpname"
                render={({ field }) => (
                  <Select
                  isClearable
                  defaultValue={defaultReason1}
                  options={subGroupID}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", )}
                  {...field}
                  // onChange={handleChange1} 
                />
              )}
            />
          </div>
        </Col>

          <Col md="3" sm="12">
            <div className="mb-1">
              <Label className="form-label" for="baseRate1">
                Base Rate <spam style={{ color: "red" }}>*</spam>
              </Label>
              <Controller
                defaultValue={data1.data1.baseRate}
                control={control}
                id="baseRate1"
                name="baseRate1"
                render={({ field }) => (
                  <Input
                    required
                    placeholder="Base Rate"
                    invalid={errors.baseRate1 && true}
                    {...field}
                  />
                )}
              />
            </div>
          </Col>


          {
            (defaultReason2.value == 1) && 
            <Col md="3" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="discAllowed">
                Discount Allowed <spam style={{ color: "red" }}>*</spam>
              </Label>
              <Controller
                id="discAllowed"
                control={control}
                name="discAllowed"
                defaultValue={discountAllowedOptions[1]}
                render={({ field }) => (
                <Select
                  isClearable
                  options={discountAllowedOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", )}
                  {...field}
                  // onChange={handleChange2} 
                />
                )}
              />
            </div>
          </Col>
          }


{
            (defaultReason2.value == 0) && 
            <Col md="3" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="discAllowed">
                Discount Allowed <spam style={{ color: "red" }}>*</spam>
              </Label>
              <Controller
                id="discAllowed"
                control={control}
                name="discAllowed"
                defaultValue={discountAllowedOptions[0]}
                render={({ field }) => (
                <Select
                  isClearable
                  options={discountAllowedOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", )}
                  {...field}
                  // onChange={handleChange2} 
                />
                )}
              />
            </div>
          </Col>
          }

          {/* <Col md="3" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="discAllowed">
                Discount Allowed <spam style={{ color: "red" }}>*</spam>
              </Label>
              <Controller
                id="discAllowed"
                control={control}
                name="discAllowed"
                render={({ field }) => (
                <Select
                  isClearable
                  defaultValue={defaultReason2}
                  options={discountAllowedOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", )}
                  {...field}
                  // onChange={handleChange2} 
                />
                )}
              />
            </div>
          </Col> */}

          <Col md="3" sm="12" className="mb-1">
            <div className="mb-1">
              <Label className="form-label" for="hsnSacCode1">
                HSN SAC Code <spam style={{ color: "red" }}>*</spam>
              </Label>
              <InputGroup className="input-group-merge">
                <Controller
                  id="hsnSacCode1"
                  name="hsnSacCode1"
                  control={control}
                  defaultValue={data1.data1.hsn_sacCode}
                  render={({ field }) => (
                    <Cleave
                      required
                      placeholder="Allowance Code ID"
                      {...field}
                      className={classnames("form-control", {})}
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
    );
  }
  return (
    <div>
      <div>
        <h4>
          <b> Transaction Code </b>
        </h4>
        {/* <Button.Ripple color='warning' disabled = {enableEditBtn} size='sm' onClick={EnableEdit}>Edit</Button.Ripple> */}
        {showForm && <InputForm />}
      </div>
    </div>
  );
};
export default TransactionCode;