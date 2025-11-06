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
import Moment from 'moment'

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {Input,Card,Form,Label,Button,CardBody,CardTitle,CardHeader,InputGroup,InputGroupText,Row,Col
} from "reactstrap";

// ** Styles
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

const id = '1';




const countryoptions = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Australia", label: "Australia" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Hong Kong", label: "Hong Kong" },
    { value: "India", label: "India" },
    { value: "Japan", label: "Japan" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
  ];


const typeOptions = [
  { value: 'Percentage', label: 'Percentage' },
  { value: 'Amount', label: 'Amount' },
  { value: 'Pieces', label: 'Pieces' },
  { value: 'Trips', label: 'Trips' },
]

const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];



let accountManagerID = [
  fetchx(API_URL + '/getforeignkeygroupid?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      accountManagerID = resp['data']
      console.log(accountManagerID)
    })
  ]

  let commision = [
    fetchx(API_URL + '/getforeignkeysubgroup?hotelID=1')
      .then(result => result.json())
      .then(resp => {
        commision = resp['data']
        console.log(commision)
      })
    ]

    let financialAssociateID = [
        fetchx(API_URL + '/getforeignkeygroupid?hotelID=1')
          .then(result => result.json())
          .then(resp => {
            financialAssociateID = resp['data']
            console.log(financialAssociateID)
          })
        ]
      
        let rateCode = [
          fetchx(API_URL + '/getforeignkeysubgroup?hotelID=1')
            .then(result => result.json())
            .then(resp => {
              rateCode = resp['data']
              console.log(rateCode)
            })
          ]


const defaultValues = {
  // hotelID: "",
  accountName: '',
  accountType: "",
  email:"",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  country: "",
  state: "",
  city: '',
  postalCode: "",
  isActive: null,
  gstID: "",
  IATA: "",
  isBTCApproved: "",
  secondaryEmail: "",
  createdBy: '',
  createdAt: null,
  modifiedBy: "",
  modifiedAt: null,
  rateCode: null,
  notes	: "",
  commision: null,
  accountManagerID: null,
  financialAssociateID: null,

};

const Accounts = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Account Name',field: 'accountName'},
    {headerName: 'Account Type',field: 'accountType'},
    {headerName: 'Email',field: 'email',suppressSizeToFit: true},
    {headerName: 'Phone Number',field: 'phoneNumber'},
    {headerName: 'Address Line 1',field: 'addressLine1'},
    {headerName: 'Address Line 2',field: 'addressLine2'},
    {headerName: 'Country',field: 'country'},
    {headerName: 'State',field: 'state'},
    {headerName: 'City',field: 'city'},
    {headerName: 'Postal Code',field: 'postalCode'},
    {headerName: 'Is Active',field: 'isActive'},
    {headerName: 'GST ID',field: 'gstID'},
    {headerName: 'IATA',field: 'IATA'},
    {headerName: 'Is BTC Approved',field: 'isBTCApproved'},
    {headerName: 'Secondary Email',field: 'secondaryEmail'},
    {headerName: 'Created By',field: 'createdBy'},
    {headerName: 'Created At',field: 'createdAt'},
    {headerName: 'Modified By',field: 'modifiedBy'},
    {headerName: 'Rate Code',field: 'rateCode'},
    {headerName: 'Notes',field: 'notes'},
    {headerName: 'Commision',field: 'commision'},
    {headerName: 'Account Manager ID',field: 'accountManagerID'},
    {headerName: 'Financial Associate ID',field: 'financialAssociateID'},
  ]);
 
  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      filterParams :{
      buttons : ['apply','reset']
      }
    }
  ));

  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetchx(API_URL + '//getextra?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  }, []); 


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
      data.accountName !== null &&
      data.accountType !== null &&
      data.email!==null &&
      data.phoneNumber!==null &&
      data.addressLine1 !== null &&
      data.addressLine2 !== null &&
      data.state !== null &&
      data.city !== null &&
      data.postalCode !== null &&
      data.isActive !== null &&
      data.gstID !== null &&
      data.IATA !== null &&
      data.isBTCApproved !== null &&
      data.secondaryEmail !== null &&
      data.createdBy !== null &&
      data.createdAt !== null &&
      data.modifiedBy !== null &&
      data.modifiedAt !== null &&
      data.rateCode !== null &&
      data.notes !== null &&
      data.commision !== null &&
      data.accountManagerID !== null &&
      data.financialAssociateID !== null

    ) {
      console.log(data);
      let createAccounts = JSON.stringify({
        // "hotelID": data.hotelID,
        "accountName": data.accountName,
        "accountType": data.accountType,
        "email": data.email,
        "phoneNumber": data.phoneNumber,
        "addressLine1": data.addressLine1,
        "addressLine2": data.addressLine2,
        "country": data.country,
        "state": data.state,
        "city": data.city,
        "postalCode": data.postalCode,
        "isActive": data.isActive.value,
        "gstID": data.gstID,
        "IATA": data.IATA,
        "isBTCApproved": data.isBTCApproved,
        "secondaryEmail": data.secondaryEmail,
        "createdBy": data.createdBy,
        "createdAt": (Moment(String(new Date(data.createdAt[0]))).format('YYYY-MM-DD')),
        "modifiedBy": data.modifiedBy,
        "modifiedAt": (Moment(String(new Date(data.modifiedAt[0]))).format('YYYY-MM-DD')),
        "rateCode": data.rateCode.value,
        "notes": data.notes.value,
        "commision": data.commision.value,
        "accountManagerID": data.accountManagerID.value,
        "financialAssociateID": data.financialAssociateID.value,

      });
      console.log(createAccounts);
      let res = fetchx(API_URL + "//addextra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createAccounts,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetchx(API_URL + '//getextra?hotelID='+id)
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          console.log(rowData['data'])
        })
        }
        
      });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Accounts Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: "",
      accountName: '',
      accountType: "",
      email:"",
      phoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      country: "",
      state: "",
      city: '',
      postalCode: "",
      isActive: null,
      gstID: "",
      IATA: "",
      isBTCApproved: "",
      secondaryEmail: "",
      createdBy: '',
      createdAt: null,
      modifiedBy: "",
      modifiedAt: null,
      rateCode: null,
      notes	: "",
      commision: null,
      accountManagerID: null,
      financialAssociateID: null,
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Accounts</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='accountName'>
            Account Name
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='accountName'
              name='accountName'
              render={({ field }) => <Input placeholder='Account Name' pattern="[aA-zZ]*" title="Type Only Alphabets" required className={classnames({
                "is-invalid": data !== null && (data.accountName === null || !data.accountName.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='accountType'>
            Account Type
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='accountType'
              name='accountType'
              render={({ field }) => <Input required placeholder="Account Type" className={classnames({
                "is-invalid": data !== null && (data.accountType === null || !data.accountType.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='email'>
            Email
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='email'
              name='email'
              render={({ field }) => <Input pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address" required placeholder="Email" className={classnames({
                "is-invalid": data !== null && (data.email === null || !data.email.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='phoneNumber'>
            Phone Number
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='phoneNumber'
              name='phoneNumber'
              render={({ field }) => <Input pattern="[6-9]{1}[0-9]{9}" 
              title="Phone number with 7-9 and remaing 9 digit with 0-9" required placeholder="Phone Number" className={classnames({
                "is-invalid": data !== null && (data.phoneNumber === null || !data.phoneNumber.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='addressLine1'>
            Address Line 1
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='addressLine1'
              name='addressLine1'
              render={({ field }) => <Input required placeholder="Address Line 1" className={classnames({
                "is-invalid": data !== null && (data.addressLine1 === null || !data.addressLine1.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='addressLine2'>
            Address Line 2
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='addressLine2'
              name='addressLine2'
              render={({ field }) => <Input required placeholder="Address Line 2" className={classnames({
                "is-invalid": data !== null && (data.addressLine2 === null || !data.addressLine2.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="country">
              Country
            </Label>
            <Controller
              id="country"
              control={control}
              name="country"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={countryoptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.country === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='state'>
            State
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='state'
              name='state'
              render={({ field }) => <Input required placeholder="State" className={classnames({
                "is-invalid": data !== null && (data.state === null || !data.state.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='city'>
            City
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='city'
              name='city'
              render={({ field }) => <Input required placeholder="City" className={classnames({
                "is-invalid": data !== null && (data.city === null || !data.city.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='postalCode'>
            Postal Code
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='postalCode'
              name='postalCode'
              render={({ field }) => <Input required placeholder="Postal Code" className={classnames({
                "is-invalid": data !== null && (data.postalCode === null || !data.postalCode.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
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
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='gstID'>
            GST ID
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='gstID'
              name='gstID'
              render={({ field }) => <Input required placeholder="GST ID" className={classnames({
                "is-invalid": data !== null && (data.gstID === null || !data.gstID.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='IATA'>
            IATA
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='IATA'
              name='IATA'
              render={({ field }) => <Input required placeholder="IATA" className={classnames({
                "is-invalid": data !== null && (data.IATA === null || !data.IATA.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='isBTCApproved'>
            Is BTC Approved
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='isBTCApproved'
              name='isBTCApproved'
              render={({ field }) => <Input required placeholder="Is BTC Approved" className={classnames({
                "is-invalid": data !== null && (data.isBTCApproved === null || !data.isBTCApproved.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='secondaryEmail'>
            Secondary Email
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='secondaryEmail'
              name='secondaryEmail'
              render={({ field }) => <Input required placeholder="Secondary Email" className={classnames({
                "is-invalid": data !== null && (data.secondaryEmail === null || !data.secondaryEmail.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='createdBy'>
            Created By
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='createdBy'
              name='createdBy'
              render={({ field }) => <Input required placeholder="Created By" className={classnames({
                "is-invalid": data !== null && (data.createdBy === null || !data.createdBy.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="createdAt">
            Created At
            </Label>
            <Controller
              control={control}
              id='createdAt'
              name='createdAt'
              render={({ field }) => (
                <Flatpickr
                placeholder="YYYY-MM-DD"
                required
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.createdAt === null
                  })}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='modifiedBy'>
           Modified By
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='modifiedBy'
              name='modifiedBy'
              render={({ field }) => <Input required placeholder="Modified By" className={classnames({
                "is-invalid": data !== null && (data.modifiedBy === null || !data.modifiedBy.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="modifiedAt">
           Modified At
            </Label>
            <Controller
              control={control}
              id='modifiedAt'
              name='modifiedAt'
              render={({ field }) => (
                <Flatpickr
                placeholder="YYYY-MM-DD"
                required
                  {...field}
                  options={{ allowInput: true }} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && data.modifiedAt === null
                  })}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="rateCode">
            Rate Code
            </Label>
            <Controller
                  id='rateCode'
                  control={control}
                  name='rateCode'
                  render={({ field }) => (
                    <Select
                    required
                      isClearable
                      options={rateCode}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.rateCode === null })}
                      {...field}
                    />
                  )}
                />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='notes'>
            Notes
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='notes'
              name='notes'
              render={({ field }) => <Input required placeholder="Notes" className={classnames({
                "is-invalid": data !== null && (data.notes === null || !data.notes.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="commision">
            Commision
            </Label>
            <Controller
                  id='commision'
                  control={control}
                  name='commision'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={commision}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.commision === null })}
                      {...field}
                    />
                  )}
                />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="accountManagerID">
            Account Manager ID
            </Label>
            <Controller
                  id='accountManagerID'
                  control={control}
                  name='accountManagerID'
                  render={({ field }) => (
                    <Select
                    required
                      isClearable
                      options={accountManagerID}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.accountManagerID === null })}
                      {...field}
                    />
                  )}
                />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="financialAssociateID">
            Financial Associate ID
            </Label>
            <Controller
                  id='financialAssociateID'
                  control={control}
                  name='financialAssociateID'
                  render={({ field }) => (
                    <Select
                    required
                      isClearable
                      options={financialAssociateID}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.financialAssociateID === null })}
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
      </CardBody>
    </Card>
    <Card>
    <div className="ag-theme-alpine" style={{ height: 520}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            // paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true' 
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
    </Card>
    {/* <App/> */}
    </div>
  );
};

export default Accounts;
