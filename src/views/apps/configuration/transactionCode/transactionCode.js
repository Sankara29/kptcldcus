import { useState } from "react";
import Select from "react-select";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { selectThemeColors } from "@utils";
import {Input,Card,Form,Label,Button,InputGroup,Row,Col} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback} from 'react';
import API_URL from "../../../../config";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const id = '1';

const discountAllowedOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },  
];

const defaultValues = {
      transactionCode: "",
      description: "",
      groupID: null,
      subGroupID: null,
      baseRate	: "",
      taxPercentage: null,
      discountAllowed: null,
      hsn_sacCode:"",
};





const TransactionCode = () => {
  const [open, setOpen] = useState('')
  const toggle = id => { open === id ? setOpen() : setOpen(id)  }
  const [rowData, setRowData] = useState();
  const [filldata,setfilldata] = useState({transactionCode:''});
  const [editable,seteditable] = useState(false);
  const [showForm,setShowForm] = useState(true);
  const [groupID, setGroupIDOptions] = useState([]);
  const [subGroupID, setSubGroupIDOptions] = useState([]);
  const [taxPercentage, setTaxPercentageOptions] = useState([]);
 const [companyData, setCompanyData] = useState(null);
  const [selectedTaxPercentage, setSelectedTaxPercentage] = useState([]);
  const gridRef = useRef();

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });
let navigate = useNavigate();  


useEffect(() => {
  fetchx(API_URL + '/getforeignkeygroupid?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      setGroupIDOptions(resp['data']);
    })
}, []);

// fetchx subGroupID options
useEffect(() => {
  fetchx(API_URL + '/getforeignkeysubgroup?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      setSubGroupIDOptions(resp['data']);
    })
}, []);

// fetchx taxPercentage options
useEffect(() => {
  fetchx(API_URL + '/gettransactioncodetaxpercentage?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      setTaxPercentageOptions(resp['data']);
    })
}, []);


    // error handling for same guest addition
    const handleError = (message) => {
      return MySwal.fire({
          title: 'Error!',
          text: message,
          icon: 'error',
          customClass: {
              confirmButton: 'btn btn-danger'
          },
          allowOutsideClick: false,
          confirmButtonText: 'Close',
          confirmButtonColor: 'danger',
          buttonsStyling: false
      })
  }



  const onSubmit = (data) => {
    setData(data);
    //console.log(data)
    //console.log(data.taxPercentage.length)
    //console.log(taxPercentage[1])

    if (data.transactionCode !== null   ) {
      if(companyData !== null){
      //console.log(data);
      let createasset = JSON.stringify({
        "transactionCode": data.transactionCode,
        "description": data.description,
        "groupID": data.groupID.value,
        "subGroupID": data.subGroupID.value,
        "baseRate": data.baseRate,
        "taxPercentage": companyData,
        "discountAllowed": data.discountAllowed.value,       
        "hsn_sacCode": data.hsnSacCode,
      });
      // console.log(createasset);
      let res = fetchx(API_URL + "/addtransactioncode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then(data => data.json())
      .then((res) => {
        // console.log(res)
        if(res.statusCode==200){
          const swalInstance = MySwal.fire({
            text: 'Transaction Code Added Successfully!',
            // icon: 'success',
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

          fetchx(API_URL + '/gettransactioncode?hotelID='+id)
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
        })

          // if(data.taxPercentage.length >= 1){
            //console.log(data.taxPercentage.length)
            // setTimeout(() => {            
            // for(let i=0;i<data.taxPercentage.length;i++){
              //console.log(data.taxPercentage[i].value)
              //console.log(rowData)
              //console.log(rowData.length)
              //console.log(rowData['data'])

              //console.log(rowData['data'][0]['id'])
             
            //  let createtax = JSON.stringify({
            //    "transactionCodeID": rowData['data'][0]['id'],
            //    "taxID": data.taxPercentage[i].value
               
            //  });
            //  //console.log(createtax)
            //  let res = fetchx(API_URL + "/addtransactioncodetaxes", {
            //       method: "POST",
            //       headers: { "Content-Type": "application/json" },
            //       body: createtax,
            //     }).then((res) => {
            //       //console.log(res);
            //     })
  
          // }
        // }

    
        }
        else{
          const swalInstance = MySwal.fire({
            text: res.message,
            // icon: 'error',
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
      });

    }
    else{
      handleError("Please Select taxes")
    }
  }
  };



  const handleChange = (selectedOption) => {
    const selectedIds = selectedOption.map(option => option.value);
    const selectedIdsString = JSON.stringify(selectedIds); // Convert to a JSON string
    // console.log(selectedIdsString);
    // console.log(selectedIds.length);
    if (selectedIds.length === 0) {
      setCompanyData(null);
    } else {
      setCompanyData(selectedIds);

    }
  };

  // console.log(companyData)
  const handleReset = () => {
    reset({
      transactionCode: "",
      description: "",
      groupID: null,
      subGroupID: null,
      baseRate	: "",
      taxPercentage: null,
      discountAllowed: null,
      hsn_sacCode:"",
    });
  };
function EnableEdit(){
  seteditable(false)
  setShowForm(false)
    setTimeout(()=>{
      setShowForm(true)
    },100)
}
  function InputForm(){
    return(
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
    
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="transactionCode">
        Transaction Code <spam style={{color:'red'}}>*</spam>
        </Label>
        <InputGroup className="input-group-merge">

          <Controller
            id="transactionCode"
            name="transactionCode"
            control={control}
            
            render={({ field }) => (
              <Cleave
              // value={243}
              required
              placeholder="Transaction Code"
              // disabled={editable}
              // pattern="[0-9]*" title="Type Only Numbers" 
                {...field}
                className={classnames("form-control", {
                })}
                // value={filldata['transactionCode']}
              />
            )}
          />
        </InputGroup>
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
        <div className='mb-1'>
        <Label className='form-label' for='description'>
          Description <spam style={{color:'red'}}>*</spam>
        </Label>
        <InputGroup className="input-group-merge">
        <Controller
          defaultValue=''
          control={control}
          id='description'
          name='description'
          render={({ field }) => <Input placeholder="Description" 
                required
          className={classnames({
          })} {...field}
          // value={filldata['description']}
          />
        }
        />
        </InputGroup>
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="groupID">
        Group  <spam style={{color:'red'}}>*</spam>
        </Label>
            <Controller
              id='groupID'
              control={control}
              name='groupID'
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={groupID}
                  classNamePrefix='select'
                  theme={selectThemeColors}
                  className={classnames('react-select', { 'is-invalid': data !== null && data.groupID === null })}
                  {...field}

                />
              )}
            />
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="subGroupID">
        Sub Group <spam style={{color:'red'}}>*</spam>
        </Label>
        <Controller
              id='subGroupID'
              control={control}
              name='subGroupID'
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={subGroupID}
                  classNamePrefix='select'
                  theme={selectThemeColors}
                  className={classnames('react-select', { 'is-invalid': data !== null && data.subGroupID === null })}
                  {...field}
                />
              )}
            />
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="baseRate">
        Base Rate <spam style={{color:'red'}}>*</spam>
        </Label>
        <InputGroup className="input-group-merge">
   
          <Controller
            id="baseRate"
            name="baseRate"
            control={control}
            render={({ field }) => (
              <Cleave
              placeholder="Base Rate"
              // pattern="[0-9]*" title="Type Only Numbers" 
              required
                {...field}
                className={classnames("form-control", {
                
                })}
              />
            )}
          />
        </InputGroup>
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
      <div className='mb-1'>
        <Label className='form-label' for='taxPercentage'>
        Tax Code <spam style={{color:'red'}}>*</spam>
        </Label>
        <Controller
              id='taxPercentage'
              control={control}
              name='taxPercentage'
              render={({ field }) => (
                <Select
                required
                isMulti
                  isClearable
                  options={taxPercentage}
                  classNamePrefix='select'
                  theme={selectThemeColors}
                  // className={classnames('react-select', { 'is-invalid': data !== null && data.taxPercentage === null })}
                  // {...field}
                  value={selectedTaxPercentage}
                  onChange={(selectedOptions) => {
                    setSelectedTaxPercentage(selectedOptions);
                    // console.log(selectedOptions)
                    handleChange(selectedOptions);
                  }}
                />
              )}
            />
      </div>
      </Col>
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="discountAllowed">
          Discount Allowed <spam style={{color:'red'}}>*</spam>
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
      
     
      <Col md='3' sm='12' className='mb-1'>
      <div className="mb-1">
        <Label className="form-label" for="hsnSacCode">
          HSN SAC Code <spam style={{color:'red'}}>*</spam>
        </Label>
        <InputGroup className="input-group-merge">
   
          <Controller
            id="hsnSacCode"
            name="hsnSacCode"
            control={control}
            render={({ field }) => (
              <Cleave
              required
              placeholder="Allowance Code ID"
                {...field}
                className={classnames("form-control", {
                 
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
    )
  }
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);
  return (
    <div>

    <div>
    <h4><b> Transaction Code </b></h4> 
        {/* <Button.Ripple color='warning' disabled = {enableEditBtn} size='sm' onClick={EnableEdit}>Edit</Button.Ripple> */}
        {showForm && <InputForm/>}     
</div>
    </div>
  );
};

export default TransactionCode;