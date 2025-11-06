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



const defaultValues = {
 
//     hotelID: "",
// category:"",
// costPrice:"",
// taxPercentage:"",

};



const MenuHeaderDetails = (data1) => {
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
        let category;
        let costPrice;
        let taxPercentage
        if(data.category === undefined) {
            category = data1.data1.category
        }
        else {
            category = data['category']
        }
        if(data.costPrice === undefined) {
            costPrice = data1.data1.costPrice
        }
        else {
            costPrice = data['costPrice']
        }
        if(data.taxPercentage === undefined) {
            taxPercentage = data1.data1.taxPercentage
        }
        else {
            taxPercentage = data['taxPercentage']
        }
      
        // console.log(data)
        // console.log("flag",flag)
        setData(data);
        // data["accountType"] = selectedValue;
        // console.log(data);
        // if (data.accountType !== null && data.accountName !== null) {
            // console.log(data);
            let menuData = JSON.stringify({
                // const { hotelID,storeID,restaurantName,tableCount,status,IRD,KOTprint,DisplayCode ,id } = req.body;
                hotelID: data1.data1.hotelID,
                category: category,
                costPrice: costPrice,
                taxPercentage: taxPercentage,
                id: data1.data1.id
            });
            // console.log(menuData);
            // console.log("hi");
            let res = fetchx(API_URL + `/updateMenuHeaderDetails`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: menuData,
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
                        text: 'Menu Header Details updated Successfully!',
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
                    
                    // console.log('Save and exit after form submit')

                    
                  
                })
                .catch((error) => {
                    console.log(error);
                });
        // }
    };


    
    const handleReset = () => {
        reset({
               hotelID: "",
category:"",
costPrice:"",
taxPercentage:"",

        });
    };
    
    function InputForm() {
        return (
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>

                    <Col md="3" sm="12" className="mb-1">
                        <div className="mb-1">
                            <Label className="form-label" for="category">
                                Category <spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <InputGroup className="input-group-merge">
                                <Controller
                                    defaultValue={data1.data1.category}
                                    control={control}
                                    id="category"
                                    name="category"
                                    render={({ field }) => (
                                        <Input
                                            placeholder="category"
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
                            <Label className="form-label" for="costPrice">
                                Cost Price <spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <Controller
                                defaultValue={data1.data1.costPrice}
                                control={control}
                                id="costPrice"
                                name="costPrice"
                                render={({ field }) => (
                                    <Input
                                        placeholder="costPrice"
                                        required
                                        className={classnames({})}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </Col>

                    <Col md="3" sm="12">
                        <div className="mb-1">
                            <Label className="form-label" for="taxPercentage">
                                Tax Percentage <spam style={{ color: "red" }}>*</spam>
                            </Label>
                            <Controller
                                defaultValue={data1.data1.taxPercentage}
                                control={control}
                                id="taxPercentage"
                                name="taxPercentage"
                                render={({ field }) => (
                                    <Input
                                        placeholder="taxPercentage"
                                        required
                                        className={classnames({})}
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
        );
    }
    return (
        <div>
            <div>
                <h4>
                    <b> Menuheader Details </b>
                </h4>
                {/* <Button.Ripple color='warning' disabled = {enableEditBtn} size='sm' onClick={EnableEdit}>Edit</Button.Ripple> */}
                {showForm && <InputForm />}
            </div>
        </div>
    );
};
export default MenuHeaderDetails;
