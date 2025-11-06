import { useState } from "react";
import Select from "react-select";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { selectThemeColors } from "@utils";
import { Input, Card, Form, Label, Button, InputGroup, Row, Col, } from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from "react";
import API_URL from "../../../../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const id = "1";

const discountAllowedOptions = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
];

const defaultValues = {
    // storeID: "",
    // restaurantName: "",
    // tableCount:"",
    // status: null,
    // IRD: null,
    // KOTprint:null,
    // DisplayCode: "",

};



const RestaurantDetails = (data1) => {
    // console.log(data1.data1);
    const [open, setOpen] = useState("");
    const toggle = (id) => {
        open === id ? setOpen() : setOpen(id);
    };
    const [rowData, setRowData] = useState();
    const [filldata, setfilldata] = useState({ transactionCode: "" });
    const [editable, seteditable] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const gridRef = useRef();

    // ** State
    const [data, setData] = useState(null);
    // ** Hooks
    const { reset, handleSubmit, control, formState: { errors }, } = useForm({ defaultValues });
    let navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(data1.data1.status);
    const [selectedValue1, setSelectedValue1] = useState(data1.data1.IRD);
    const [selectedValue2, setSelectedValue2] = useState(data1.data1.KOTprint);
    const [reload, setreload] = useState(true)
    const [load, setload] = useState(true)
    // const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [checkboxChecked, setCheckboxChecked] = useState(data1.data1.IRD === "Enable");
    // const [checkboxChecked1, setCheckboxChecked1] = useState(false)
    const [checkboxChecked1, setCheckboxChecked1] = useState(data1.data1.KOTprint === "Enable");

    // const handleCheckboxChange = () => {
    //     console.log("hi")
    //     setCheckboxChecked(!checkboxChecked)
    // }
    const handleCheckboxChange = () => {
        setCheckboxChecked(prevState => !prevState);
      };
    // const handleCheckboxChange1 = () => {
    //     setCheckboxChecked1(!checkboxChecked1)
    // }
    const handleCheckboxChange1 = () => {
            setCheckboxChecked1(prevState1 => !prevState1)
        }

    const defaultStatus = {
        value: data1.data1.status,
        label: data1.data1.status,
    };
    const defaultStatus1 = {
        value: data1.data1.IRD,
        label: data1.data1.IRD,
    };
    const defaultStatus2 = {
        value: data1.data1.KOTprint,
        label: data1.data1.KOTprint,
    };
    const statusOptions = [
        { value: 'Enable', label: 'Enable' },
        { value: 'Disable', label: 'Disable' },
    ]

    const kotprintoptions = [
        { value: "Enable", label: "Enable" },
        { value: "Disable", label: "Disable" },

    ];

    const irdptions = [
        { value: "Enable", label: "Enable" },
        { value: "Disable", label: "Disable" },
    ];


    const handleChange = (selectedOption) => {
        setSelectedValue(selectedOption.value);
        // console.log(selectedOption.value)
        // setreload(false)
        // setTimeout(()=>{setreload(true)},1)
    };
    const handleChange1 = (selectedOption1) => {
        setSelectedValue1(selectedOption1.value);
        // console.log(selectedOption1.label)
        // setreload(false)
        // setTimeout(() => { setreload(true) }, 1)
    };
    const handleChange2 = (selectedOption2) => {
        setSelectedValue2(selectedOption2.label);
        // console.log(selectedOption2.label)
        setreload(false)
        setTimeout(() => { setreload(true) }, 1)
    };
    const onSubmit = (data) => {
        // console.log(data)
        // console.log("flag",flag)
        data.IRD = checkboxChecked ? "Enable" : "Disable";
     data.KOTprint = checkboxChecked1 ? "Enable" : "Disable";
        setData(data);
        // data["accountType"] = selectedValue;
        // console.log(data);
        // if (data.accountType !== null && data.accountName !== null) {
        // console.log(data);
        let createStoreData = JSON.stringify({
            // const { hotelID,storeID,restaurantName,tableCount,status,IRD,KOTprint,DisplayCode ,id } = req.body;
            hotelID: data1.data1.hotelID,
            storeID: data1.data1.storeID,
            restaurantName: data.restaurantName,
            tableCount: data.tableCount,
            status: selectedValue,
            // IRD: selectedValue1,
            // KOTprint: selectedValue2,
            IRD: data.IRD,
            KOTprint: data.KOTprint,
            DisplayCode: data.DisplayCode,
            id: data1.data1.id
        });
        // console.log(createStoreData);
        // console.log("hi");
        let res = fetchx(API_URL + `/updateRestaurant`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: createStoreData,
        })
            .then((result) => result.json())
            .then((resp) => {
                if (resp['statusCode'] == 200) {

                    // console.log(resp);
                    // console.log(resp["data"])
                    // console.log(flag==true)
                    // console.log(flag)
                    // console.log(flag==false)
                    //  if(flag==true){
                    const swalInstance = MySwal.fire({
                        text: 'Store Details Edited Successfully!',
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
                }
                else {

                }
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
        // }
    };


    const handleReset = () => {
        reset({
            //   transactionCode: "",
            //   description: "",
            //   groupID: null,
            //   subGroupID: null,
            //   baseRate: "",
            //   taxPercentage: null,
            //   discountAllowed: null,
            //   hsn_sacCode: "",
            storeID: "",
            restaurantName: "",
            tableCount: "",
            status: null,
            IRD: null,
            KOTprint: null,
            DisplayCode: "",



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

                    <Col md="4" sm="12">
                        <div className="mb-1">
                            <Label className="form-label" for="storeID">
                                Store ID<spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <Controller
                                defaultValue={data1.data1.storeID}
                                control={control}
                                id="storeID"
                                name="storeID"
                                render={({ field }) => (
                                    <Input
                                        placeholder="storeID"
                                        required
                                        className={classnames({})}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </Col>
                    <Col md="4" sm="12" className="mb-1">
                        <div className="mb-1">
                            <Label className="form-label" for="restaurantName">
                                Store Name <spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <InputGroup className="input-group-merge">
                                <Controller
                                    defaultValue={data1.data1.restaurantName}
                                    control={control}
                                    id="restaurantName"
                                    name="restaurantName"
                                    render={({ field }) => (
                                        <Input
                                            placeholder="restaurantName"
                                            required
                                            className={classnames({})}
                                            {...field}
                                        />
                                    )}
                                />
                            </InputGroup>
                        </div>
                    </Col>

                    <Col md="4" sm="12">
                        <div className="mb-1">
                            <Label className="form-label" for="tableCount">
                                Table Count <spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <Controller
                                defaultValue={data1.data1.tableCount}
                                control={control}
                                id="tableCount"
                                name="tableCount"
                                render={({ field }) => (
                                    <Input
                                        pattern="[0-9]*" title="Type Only Numbers"

                                        placeholder="tableCount"
                                        required
                                        className={classnames({})}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </Col>
                    <Col md="4" sm="12" className="mb-1">
                        <div className="mb-1">
                            <Label className="form-label" for="status">
                                Status <spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <Controller
                                id="status"
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Select
                                        isClearable
                                        defaultValue={defaultStatus}
                                        options={statusOptions}
                                        classNamePrefix="select"
                                        theme={selectThemeColors}
                                        className={classnames("react-select",)}
                                        {...field}
                                        onChange={handleChange}
                                    />
                                )}
                            />
                        </div>
                    </Col>
                    <Col md="4" sm="12">
                        <div className="mb-1">
                            <Label className="form-label" for="DisplayCode">
                                Display Code <spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <Controller
                                defaultValue={data1.data1.DisplayCode}
                                control={control}
                                id="DisplayCode"
                                name="DisplayCode"
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
                    {/* <Col md="3" sm="12" className="mb-1">
                        <div className="mb-1">
                            <Label className="form-label" for="IRD">
                                IRD <spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <Controller
                                id="IRD"
                                control={control}
                                name="IRD"
                                render={({ field }) => (
                                    <Select
                                        isClearable
                                        defaultValue={defaultStatus1}
                                        options={irdptions}
                                        classNamePrefix="select"
                                        theme={selectThemeColors}
                                        className={classnames("react-select",)}
                                        {...field}
                                        onChange={handleChange1}
                                    />
                                )}
                            />
                        </div>
                    </Col>

                    <Col md="3" sm="12" className="mb-1">
                        <div className="mb-1">
                            <Label className="form-label" for="KOTprint">
                                KOT Print <spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <Controller
                                id="KOTprint"
                                control={control}
                                name="KOTprint"
                                render={({ field }) => (
                                    <Select
                                        isClearable
                                        defaultValue={defaultStatus2}
                                        options={kotprintoptions}
                                        classNamePrefix="select"
                                        theme={selectThemeColors}
                                        className={classnames("react-select",)}
                                        {...field}
                                        onChange={handleChange2}
                                    />
                                )}
                            />
                        </div>
                    </Col> */}

                    {/* <Col md='2' sm='8' className='pt-3'>
                        <div className='form-check form-check-inline'>
                            <Input type='checkbox' id='basic-cb-unchecked' checked={checkboxChecked}
                                onChange={handleCheckboxChange} />
                            <Label for='IRD' className='form-check-label'>
                                Include inhouse guest
                            </Label>
                        </div>
                    </Col> */}
                    <Col md='2' sm='8' className='pt-3'>
                        <div className='form-check form-check-inline'>
                            <Input
                                type='checkbox'
                                id='basic-cb-unchecked'
                                // checked={data1.data1.IRD === "Enable"} // Check the checkbox if data1.data1.IRD is "Enable"
                                checked={checkboxChecked}
                                onChange={handleCheckboxChange}
                            />
                            <Label for='IRD' className='form-check-label'>
                                Include Inhouse guests
                            </Label>
                        </div>
                    </Col>

                    <Col md='2' sm='8' className='pt-3'>
                        <div className='form-check form-check-inline'>
                            <Input type='checkbox'
                                id='basic-cb-unchecked'
                                // checked={data1.data1.KOTprint === "Enable"} // Check the checkbox if data1.data1.IRD is "Enable"

                                checked={checkboxChecked1}
                                onChange={handleCheckboxChange1} />
                            <Label for='KOTprint' className='form-check-label'>
                                KOT Print
                            </Label>
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
                    <b> Store Details </b>
                </h4>
                {/* <Button.Ripple color='warning' disabled = {enableEditBtn} size='sm' onClick={EnableEdit}>Edit</Button.Ripple> */}
                {showForm && <InputForm />}
            </div>
        </div>
    );
};
export default RestaurantDetails;
