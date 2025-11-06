import { useState } from "react";
import toast from "react-hot-toast";
import { Check } from "react-feather";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import Avatar from "@components/avatar";
import {Input,Form,Label,Button,Row,Col} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import API_URL from "../../../../config";
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const defaultValues = {
  // hotelID: "",
      transactionCode: "",
      description: "",
      groupID: null,
      subGroupID: null,
      baseRate	: "",
      taxPercentage: null,
      discountAllowed: null,
      hsn_sacCode:"",
};


let groupID = [
  fetchx(API_URL + '/getforeignkeygroupid?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      groupID = resp['data']
      console.log(groupID)
    })
  ]

  let subGroupID = [
    fetchx(API_URL + '/getforeignkeysubgroup?hotelID=1')
      .then(result => result.json())
      .then(resp => {
        // console.log(resp['data'])
        subGroupID = resp['data']
        console.log(subGroupID)
      })
    ]

    let taxPercentage = [
      fetchx(API_URL + '/gettransactioncodetaxpercentage?hotelID=1')
        .then(result => result.json())
        .then(resp => {
          // console.log(resp['data'])
          taxPercentage = resp['data']
          console.log(taxPercentage)
        })
      ]


const TransactionCode = () => {
  const [open, setOpen] = useState('')
  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

    const [editable,seteditable] = useState(false);
  const [showForm,setShowForm] = useState(true);
  const [data, setData] = useState(null);

  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

const onSubmit = data => {
  setData(data)
  if (data.booksID !== null) {
      console.log(data)
      let createspecial = JSON.stringify({
        "booksID"             :data.booksID,
        "Type"                :data.type,
        "transactionCode"     :9,
        "AccountsDescription" :data.AccountsDescription,
        "account_platform_id" :data.accPlatformID,
        "customer_platform_id": data.customerPlatformID,        
      })
      console.log(createspecial)
      let res = fetchx(API_URL + "/booksPlatformID", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createspecial
      }).then(data => data.json())
      .then((res) => {
        console.log(res);
        if(res['statuscode']==200){
          // fetchx(API_URL +'/getSpecials?hotelID=1')
          // .then(result => result.json())
          // .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
          const swalInstance = MySwal.fire({
            text: 'Books Platform Added Successfully!',
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
        // })
        }
        else{
          const swalInstance = MySwal.fire({
            text: res.message,
            icon: 'error',
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
}

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

        <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='booksID'>
            Books ID <spam style={{color:'red'}}>*</spam>
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='booksID'
              name='booksID'
              render={({ field }) => <Input placeholder='Books ID'
                // pattern='[0-9]{1,15}'
                // title="Books ID can contain numbers . It cannnot contain alphabets and special characters."
                 required
                invalid={errors.booksID && true} {...field} />}
            />
          </div>
        </Col>
        <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='type'>
            Type <spam style={{color:'red'}}>*</spam>
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='type'
              name='type'
              render={({ field }) => <Input placeholder='Type'
                required
                invalid={errors.type && true} {...field} />}
            />
          </div>
        </Col>
        <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="description">
                    Accounts Description <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="description"
                      name="description"
                      render={({ field }) => (
                        <Input
                          placeholder="Description"
                          required
                          invalid={errors.description && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='accPlatformID'>
            Accounts Platform ID <spam style={{color:'red'}}>*</spam>
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='accPlatformID'
              name='accPlatformID'
              render={({ field }) => <Input placeholder='Accounts Platform ID'
                // pattern='[0-9]{1,15}'
                // title="Books ID can contain numbers . It cannnot contain alphabets and special characters." 
                required
                invalid={errors.accPlatformID && true} {...field} />}
            />
          </div>
        </Col>
        <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='customerPlatformID'>
            Customer Platform ID <spam style={{color:'red'}}>*</spam>
            </Label>
            <Controller
              defaultValue=''
              control={control}
              id='customerPlatformID'
              name='customerPlatformID'
              render={({ field }) => <Input placeholder='Customer Platform ID'
                // pattern='[0-9]{1,15}'
                // title="Books ID can contain numbers . It cannnot contain alphabets and special characters."
                 required
                invalid={errors.customerPlatformID && true} {...field} />}
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
    )
  }
  return (
    <div>

    <div>   
        {/* <Button.Ripple color='warning' disabled = {enableEditBtn} size='sm' onClick={EnableEdit}>Edit</Button.Ripple> */}
        {showForm && <InputForm/>}
     
</div> 
    </div>
  );
};

export default TransactionCode;