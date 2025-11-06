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
import Moment from 'moment';
import App from "./transactionDataTable";

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
// import App from "./roomInventoryDataTable";


const isDepositOptions = [
 { value: "1", label: "Yes" },
 { value: "0", label: "No" },
];



const defaultValues = {
 folio: "",
 transactionCode: "",
 reservation : "",
 guestProfileID: "",
 companyOrAgent : "",
 baseAmount: "",
 createdAt: null,
 createdBy : "",
 remarks: "",
 room: "",
 quantity : "",
 package: "",
 rateCode : "",
 supplement: "",
 date: null,
 description : "",
 discountAmount: "",
 discountPercentage : "",
 transactionType: "",
 isDeposit: null,
 taxPercentage : "",
 CGST: "",
 SGST : "",
 total: "",
 serviceChargeORCommissionPercentage: "",
 serviceChargeORCommission : "",
 serviceChargeORCommissionTaxPercentage: "",
 serviceChargeORCommissionCGST : "",
 serviceChargeORCommissionSGST: "",
 totalWithServiceChargeORCommission : "",
 isServiceChargeCancelled: "",
 isCancelled : "",
 POSBillNumber : "",
 POSSession: "",
 allowanceTransaction : "",
 invoice: "",
 card: "",
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
 data.folio !== null &&
 data.transactionCode !== null &&
 data.reservation &&
 data.guestProfileID!==null &&
 data.companyORAgent !== null &&
 data.baseAmount !== null &&
 data.createdAt !== null &&
 data.createdBy !== null &&
 data.remarks !== null &&
 data.room !== null &&
 data.quantity &&
 data.package!==null &&
 data.rateCode !== null &&
 data.supplement !== null &&
 data.date !== null &&
 data.description !== null &&
 data.discountAmount !== null &&
 data.discountPercentage !== null &&
 data.transactionType !== null &&
 data.isDeposit !== null &&
 data.taxPercentage &&
 data.CGST!==null &&
 data.SGST !== null &&
 data.total !== null &&
 data.serviceChargeORCommissionPercentage !== null &&
 data.serviceChargeORCommission !== null &&
 data.serviceChargeORCommissionTaxPercentage &&
 data.serviceChargeORCommissionCGST!==null &&
 data.serviceChargeORCommissionSGST !== null &&
 data.totalWithServiceChargeORCommission !== null &&
 data.isServiceChargeCancelled !== null &&
 data.isCancelled !== null &&
 data.POSBillNumber!==null &&
 data.POSSession !== null &&
 data.allowanceTransaction !== null &&
 data.invoice !== null &&
 data.card !== null
 ) {
 console.log(data);
 let createasset = JSON.stringify({
 // "hotelID": data.hotelID,
 "folio": data.folio,
 "transactionCode": data.transactionCode,
 "reservation": data.reservation,
 "guestProfileID": data.guestProfileID,
 "companyORAgent": data.companyORAgent,
 "baseAmount": data.baseAmount,
 "createdAt": (Moment(String(new Date(data.createdAt[0]))).format('YYYY-MM-DD')),
 "createdBy": data.createdBy,
 "remarks": data.remarks,
 "room": data.room,
 "quantity": data.quantity,
 "package": data.package,
 "rateCode": data.rateCode,
 "supplement": data.supplement,
 "date":(Moment(String(new Date(data.date[0]))).format('YYYY-MM-DD')),
 "description": data.description,
 "discountAmount": data.discountAmount,
 "discountPercentage": data.discountPercentage,
 "transactionType": data.transactionType,
 "isDeposit": data.isDeposit.value,
 "taxPercentage": data.taxPercentage,
 "CGST": data.CGST,
 "SGST": data.SGST,
 "total": data.total,
 "serviceChargeORCommissionPercentage": data.serviceChargeORCommissionPercentage,
 "serviceChargeORCommission": data.serviceChargeORCommission,
 "serviceChargeORCommissionTaxPercentage": data.serviceChargeORCommissionTaxPercentage,
 "serviceChargeORCommissionCGST": data.serviceChargeORCommissionCGST,
 "serviceChargeORCommissionSGST": data.serviceChargeORCommissionSGST,
 "totalWithServiceChargeORCommission": data.totalWithServiceChargeORCommission,
 "isServiceChargeCancelled": data.isServiceChargeCancelled,
 "isCancelled": data.isCancelled,
 "POSBillNumber": data.POSBillNumber,
 "POSSession": data.POSSession,
 "allowanceTransaction": data.allowanceTransaction,
 "invoice": data.invoice,
 "card": data.card,

 });
 console.log(createasset);
 let res = fetchx(API_URL + "/addtransaction", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: createasset,
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
 <h4>Transaction Successfully Added</h4>
 </div>
 </div>
 );
 }
 };

 const handleReset = () => {
 reset({
 folio: "",
 transactionCode: "",
 reservation : "",
 guestProfileID: "",
 companyORAgent : "",
 baseAmount: "",
 createdAt: null,
 createdBy : "",
 remarks: "",
 room: "",
 quantity : "",
 package: "",
 rateCode : "",
 supplement: "",
 date: null,
 description : "",
 discountAmount: "",
 discountPercentage : "",
 transactionType: "",
 isDeposit: null,
 taxPercentage : "",
 CGST: "",
 SGST : "",
 total: "",
 serviceChargeORCommissionPercentage: "",
 serviceChargeORCommission : "",
 serviceChargeORCommissionTaxPercentage: "",
 serviceChargeORCommissionCGST : "",
 serviceChargeORCommissionSGST: "",
 totalWithServiceChargeORCommission : "",
 isServiceChargeCancelled: "",
 isCancelled : "",
 POSBillNumber : "",
 POSSession: "",
 allowanceTransaction : "",
 invoice: "",
 card: "",
 });
 };

 return (
 <div>
 <Card>
 <CardHeader>
 <CardTitle tag="h4">Transaction</CardTitle>
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
 <div className="mb-1">
 <Label className="form-label" for="folio">
 Folio
 </Label>
 <InputGroup className="input-group-merge">
 <InputGroupText
 className={classnames({
 "is-invalid": data !== null && (data.folio === null || !data.folio.length)
 })}
 ></InputGroupText>
 <Controller
 id="folio"
 name="folio"
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder="Folio"
 {...field}
 className={classnames("form-control", {
 "is-invalid":
 data !== null && (data.folio === null || !data.folio.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='transactionCode'>
 Transaction Code
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.transactionCode=== null || !data.transactionCode.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='transactionCode'
 name='transactionCode'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Transaction Code'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.transactionCode === null || !data.transactionCode.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='reservation'>
 Reservation
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.reservation=== null || !data.reservation.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='reservation'
 name='reservation'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Reservation'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.reservation === null || !data.reservation.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='guestProfileID'>
 Guest Profile ID
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.guestProfileID=== null || !data.guestProfileID.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='guestProfileID'
 name='guestProfileID'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Guest Profile ID'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.guestProfileID === null || !data.guestProfileID.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='companyORAgent'>
 Company Or Agent
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.companyOrAgent=== null || !data.companyOrAgent.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='companyOrAgent'
 name='companyOrAgent'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[aA-zZ]*" title="Only Alphabets Allowed" required
 placeholder='Company / Agent'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.companyOrAgent === null || !data.companyOrAgent.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='baseAmount'>
 Base Amount
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.baseAmount=== null || !data.baseAmount.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='baseAmount'
 name='baseAmount'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Base Amount'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.baseAmount === null || !data.baseAmount.length)
 })}
 />
 )}
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
 required
 placeholder="YYYY-MM-DD"
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
 <Label className='form-label' for='createdBy'>
 Created By
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.createdBy=== null || !data.createdBy.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='createdBy'
 name='createdBy'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[aA-zZ]*" title="Only Alphabets Allowed" required
 placeholder='Created By'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.createdBy === null || !data.createdBy.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="remarks">
 Remarks
 </Label>
 <InputGroup className="input-group-merge">
 <InputGroupText
 className={classnames({
 "is-invalid": data !== null && (data.remarks === null || !data.remarks.length)
 })}
 ></InputGroupText>
 <Controller
 id="remarks"
 name="remarks"
 control={control}
 render={({ field }) => (
 <Cleave
 required
 placeholder="Remarks"
 {...field}
 className={classnames("form-control", {
 "is-invalid":
 data !== null && (data.remarks === null || !data.remarks.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="room">
 Room
 </Label>
 <InputGroup className="input-group-merge">
 <InputGroupText
 className={classnames({
 "is-invalid": data !== null && (data.room === null || !data.room.length)
 })}
 ></InputGroupText>
 <Controller
 id="room"
 name="room"
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder="Room"
 {...field}
 className={classnames("form-control", {
 "is-invalid":
 data !== null && (data.room === null || !data.room.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='quantity'>
 Quantity
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.quantity=== null || !data.quantity.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='quantity'
 name='quantity'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Quantity'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.quantity === null || !data.quantity.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='package'>
 Package
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.package=== null || !data.package.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='package'
 name='package'
 control={control}
 render={({ field }) => (
 <Cleave
 required
 placeholder='Package'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.package === null || !data.package.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='rateCode'>
  Rate Code
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.rateCode=== null || !data.rateCode.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='rateCode'
 name='rateCode'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Rate Code'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.rateCode === null || !data.rateCode.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='supplement'>
 Supplement
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.supplement=== null || !data.supplement.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='supplement'
 name='supplement'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9][aA-zZ]*" title="Only Numbers Allowed" required
 placeholder='Supplement'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.supplement === null || !data.supplement.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="date">
 Date
 </Label>
 <Controller
 control={control}
 id='date'
 name='date'
 render={({ field }) => (
 <Flatpickr
 required
 placeholder="YYYY-MM-DD"
 {...field}
 options={{ allowInput: true }} 
 className={classnames('form-control', {
 'is-invalid': data !== null && data.date === null
 })}
 />
 )}
 />
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='description'>
 Description
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.description=== null || !data.description.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='description'
 name='description'
 control={control}
 render={({ field }) => (
 <Cleave
 required
 placeholder='Description'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.description === null || !data.description.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for=' discountAmount'>
 Discount Amount
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.discountAmount=== null || !data.discountAmount.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='discountAmount'
 name='discountAmount'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Discount Amount'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.discountAmount === null || !data.discountAmount.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>

 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for=' discountPercentage'>
 Discount Percentage
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.discountPercentage=== null || !data.discountPercentage.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='discountPercentage'
 name='discountPercentage'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Discount Percentage'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.discountPercentage === null || !data.discountPercentage.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>

 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for=' transactionType'>
 Transaction Type
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.transactionType=== null || !data.transactionType.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='transactionType'
 name='transactionType'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Transaction Type'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.transactionType === null || !data.transactionType.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className="mb-1">
 <Label className="form-label" for="isDeposit">
 Is Deposit
 </Label>
 <Controller
 id="isDeposit"
 control={control}
 name="isDeposit"
 render={({ field }) => (
 <Select
 required
 isClearable
 options={isDepositOptions}
 classNamePrefix="select"
 theme={selectThemeColors}
 className={classnames("react-select", {
 "is-invalid": data !== null && data.isDeposit === null,
 })}
 {...field}
 />
 )}
 />
 </div>
 </Col>
 
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='taxPercentage'>
 Tax Percentage
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.taxPercentage=== null || !data.taxPercentage.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='taxPercentage'
 name='taxPercentage'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Tax Percentage'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.taxPercentage === null || !data.taxPercentage.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>

 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='CGST'>
 CGST
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.CGST=== null || !data.CGST.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='CGST'
 name='CGST'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='CGST'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.CGST === null || !data.CGST.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>

 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='SGST'>
 SGST
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.SGST=== null || !data.SGST.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='SGST'
 name='SGST'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='SGST'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.SGST === null || !data.SGST.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for=' total'>
 Total
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.total=== null || !data.total.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='total'
 name='total'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Total'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.total === null || !data.total.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='serviceChargeORCommissionPercentage'>
 ServiceCharge / Commission Percentage
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.serviceChargeORCommissionPercentage=== null || !data.serviceChargeORCommissionPercentage.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='serviceChargeORCommissionPercentage'
 name='serviceChargeORCommissionPercentage'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='ServiceCharge / Commission Percentage'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.serviceChargeORCommissionPercentage === null || !data.serviceChargeORCommissionPercentage.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='serviceChargeORCommission'>
 Service Charge / Commission
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.serviceChargeORCommission=== null || !data.serviceChargeORCommission.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='serviceChargeORCommission'
 name='serviceChargeORCommission'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Service Charge / Commission'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.serviceChargeORCommission === null || !data.serviceChargeORCommission.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='serviceChargeORCommissionTaxPercentage'>
 Service Charge / Commission Tax Percentage
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.serviceChargeORCommissionTaxPercentage=== null || !data.serviceChargeORCommissionTaxPercentage.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='serviceChargeORCommissionTaxPercentage'
 name='serviceChargeORCommissionTaxPercentage'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Service Charge / Commission Tax Percentage'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.serviceChargeORCommissionTaxPercentage === null || !data.serviceChargeORCommissionTaxPercentage.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='serviceChargeORCommissionCGST'>
 Service Charge / Commission CGST
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.serviceChargeORCommissionCGST=== null || !data.serviceChargeORCommissionCGST.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='serviceChargeORCommissionCGST'
 name='serviceChargeORCommissionCGST'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Service Charge / Commission CGST'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.serviceChargeORCommissionCGST === null || !data.serviceChargeORCommissionCGST.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='serviceChargeORCommissionSGST'>
 Service Charge / Commission SGST
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.serviceChargeORCommissionSGST=== null || !data.serviceChargeORCommissionSGST.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='serviceChargeORCommissionSGST'
 name='serviceChargeORCommissionSGST'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Service Charge / Commission SGST'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.serviceChargeORCommissionSGST === null || !data.serviceChargeORCommissionSGST.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='totalWithServiceChargeORCommission'>
 Total With Service Charge / Commission
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.totalWithServiceChargeORCommission=== null || !data.totalWithServiceChargeORCommission.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='totalWithServiceChargeORCommission'
 name='totalWithServiceChargeORCommission'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Total With service Charge / Commission'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.totalWithServiceChargeORCommission === null || !data.totalWithServiceChargeORCommission.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='isServiceChargeCancelled'>
 Is Service Charge Cancelled
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.isServiceChargeCancelled=== null || !data.isServiceChargeCancelled.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='isServiceChargeCancelled'
 name='isServiceChargeCancelled'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Is Service Charge Cancelled'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.isServiceChargeCancelled === null || !data.isServiceChargeCancelled.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='isCancelled'>
 Is Cancelled
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.isCancelled=== null || !data.isCancelled.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='isCancelled'
 name='isCancelled'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-1]{1}" title="Only 0 and 1 Allowed" required
 placeholder='Is Cancelled'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.isCancelled === null || !data.isCancelled.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for=' POSBillNumber'>
 POS Bill Number
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.POSBillNumber=== null || !data.POSBillNumber.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='POSBillNumber'
 name='POSBillNumber'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='POS Bill Number'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.POSBillNumber === null || !data.POSBillNumber.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='POSSession'>
 POS Session
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.POSSession=== null || !data.POSSession.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='POSSession'
 name='POSSession'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='POS Session'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.POSSession === null || !data.POSSession.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='allowanceTransaction'>
 Allowance Transaction
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.allowanceTransaction=== null || !data.allowanceTransaction.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='allowanceTransaction'
 name='allowanceTransaction'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Allowance Transaction'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.allowanceTransaction === null || !data.allowanceTransaction.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='invoice'>
 Invoice
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.invoice=== null || !data.invoice.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='invoice'
 name='invoice'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Invoice'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.invoice === null || !data.invoice.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>
 <Col md='6' sm='12' className='mb-1'>
 <div className='mb-1'>
 <Label className='form-label' for='card'>
 Card
 </Label>
 <InputGroup className='input-group-merge'>
 <InputGroupText
 className={classnames({
 'is-invalid': data !== null && (data.card=== null || !data.card.length)
 })}
 >
 </InputGroupText>
 <Controller
 id='card'
 name='card'
 control={control}
 render={({ field }) => (
 <Cleave
 pattern="[0-9]*" title="Only Numbers Allowed" required
 placeholder='Card'
 {...field}
 className={classnames('form-control', {
 'is-invalid': data !== null && (data.card === null || !data.card.length)
 })}
 />
 )}
 />
 </InputGroup>
 </div>
 </Col>

 <Col md='6' sm='12' className='mb-1'>
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
 </Col>
 </Row>
 </Form>
 </CardBody>
 </Card>
 <App/>
 </div>
 );
};

export default ValidationThirdPartyComponents;
