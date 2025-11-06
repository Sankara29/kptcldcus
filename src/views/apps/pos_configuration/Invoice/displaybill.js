// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form ,Label,InputGroup,Input} from 'reactstrap'
import { format } from "date-fns";
import { useEffect, useState } from 'react';
import React from 'react';
import API_URL from "../../../../config";

import { useNavigate } from "react-router-dom";
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useForm, Controller } from "react-hook-form";

const MySwal = withReactContent(Swal)
import logo from '@src/assets/images/logo/oterra.jpg';

const PreviewCard = ({ data, print }) => {
  // console.log(data.hasOwnProperty('Discount'))
  let navigate = useNavigate();
  if (typeof (data) == 'undefined') {
    // console.log('Hello')
  }

  const [emailModal,setemailModal] = useState(false)
  // const [showtable, setshowtable] = useState(false)
  const [isOrderPopup, setIsOrderPopup] = useState(false)
  const [logoimage, setLogo] = useState(null);
  const [hotelAddress, setHotelAddress] = useState(null);
  const [hotelName, setHotelName] = useState(null);
  const [hotelNo, setHotelNo] = useState(null);
  const[hotelFax,sethotelFax] = useState(null)
  const [image, setImage] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [CINNumber, setCINNumber] = useState(null);
  const [FSSAINumber, setFSSAINumber] = useState(null);
  const [GSTINNumber, setGSTINNumber] = useState(null);
  const [firmdata, setfirmdata] = useState(null);
  const [faxdata, setfaxdata] = useState(null);
  const [websitedata, setwebsitedata] = useState(null);
  const [postalcodedata, setpostalcodedata] = useState(null);

  useEffect(() => {
    fetchx(API_URL + "/getBusinessDatePOS", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
      .then(postres => {
        console.log(postres)
        setHotelDetails(postres['data'])
        setHotelAddress(postres['data'][0]['address'])
        setHotelName(postres['data'][0]['name'])
        setHotelNo(postres['data'][0]['phoneNumber'])
        sethotelFax(postres['data'][0]['fax'])
        setLogo(postres['data'][0]['logo'])
        setCINNumber(postres['data'][0]['CINNumber'])
        setGSTINNumber(postres['data'][0]['GSTIN'])
        setFSSAINumber(postres['data'][0]['FSSAINumber'])
        setfirmdata(postres['data'][0]['firm'])
        setfaxdata(postres['data']['0']['fax'])
        setwebsitedata(postres['data']['0']['website'])
        setpostalcodedata(postres['data']['0']['postalcode'])


        
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [])
 
  function CartTable() {
    // console.log(data['items'])
    return (
      <table >
        <thead >
          <tr>
            <th style={{ margin: '6px 0', paddingLeft: '10px' }} >Item Name</th>
            <th style={{ margin: '6px 0', paddingLeft: '10px' }} >Qty</th>
            <th style={{ margin: '6px 0', paddingLeft: '10px' }} >Price</th>

          </tr>
        </thead>
        <tbody>
          {data['items'].map((row, index) => (
            <tr key={index}>
              <td style={{ margin: '6px 0', paddingLeft: '10px' }} id={"itemID" + index}>{row.itemName}</td>
              <td style={{ margin: '6px 0', paddingLeft: '10px' }} id={"itemName" + index}>{row.qty}</td>
              <td style={{ margin: '6px 0', paddingLeft: '10px' }} id={"qty" + index}>{row.Price}</td>

            </tr>

          ))}
        </tbody>
      </table>
    )
  }
  // const handleFinishOrder = () => {
  //   // setIsOrderPopup(true)
  //   const swalInstance = MySwal.fire({
  //     title: 'Order Completed!',
  //     text: 'Order Completed Successfully!!',
  //     icon: 'success',
  //     buttonsStyling: false,
  //     confirmButtonText: 'Close',
  //     customClass: {
  //       confirmButton: 'btn btn-danger'
  //     }
  //   });
  //   swalInstance.then((result) => {
  //     if (result.isConfirmed) {
  //       navigate('/apps/posconfiguration/Tableselection')
  //     }
  //   });

  // }

  
  const handleFinishOrder = () => {
    const swalInstance = Swal.fire({
      title: 'Order Completed!',
      text: 'Do you want to send an email?',
      icon: 'success',
      buttonsStyling: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setemailModal(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Navigate to the specified route
        navigate('/apps/posconfiguration/Tableselection');
      }
    });
  
    // Delay before adding custom style for space
    setTimeout(() => {
      const cancelButton = document.querySelector('.swal2-cancel');
      cancelButton.style.marginLeft = '10px'; // Adjust the margin as needed
    }, 50); // You may need to adjust the delay based on your specific case
  };
  
  

  // const handleClose = () =>{
  //   navigate('/apps/posconfiguration/Tableselection')

  // }
  function inWords(num) {
    var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
    var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    var n; // Declare 'n' as a variable

    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees only ' : '';
    return str;
  }

  function confirmSubmit(emaildatas) {
    let emaildata = emaildatas['email-to']
    let CompleteData = data
    let billno = data.billNoDisplay.replaceAll("/", "_").replaceAll("-", "")
    console.log(JSON.stringify({
      type:'POSInvoice',
      amount:data.totalAmount,
      toAddress:emaildata,
      ccAddress:'',
      BillNo:billno,
      orderID:CompleteData.orderID,
      BillDate:CompleteData.billDateTime,
      hotelID:1,
      storeID:CompleteData.storeID
        }))
    fetchx(API_URL + "/sendemailtestPOS", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type:'POSInvoice',
        amount:data.totalAmount,
        toAddress:emaildata,
        ccAddress:'',
        BillNo:billno,
        orderID:CompleteData.orderID,
        BillDate:CompleteData.billDateTime,
        hotelID:1,
        storeID:CompleteData.storeID
          })
    }).then(result => result.json())
    .then(resp => {
        // if(resp.statusCode==200){
        //   setcomposeOpen(false)
        //   toast(
        //     <div className="d-flex">
        //       <div className="me-1">
        //         <Avatar size="sm" color="success" icon={<Check size={12} />} />
        //       </div>
        //       <div className="d-flex flex-column">
        //         <h6>Email sent successfully</h6>
        //         {/* <h4>Wait-List Added Successfully</h4> */}
        //       </div>
        //     </div>
        //   );
        // }
        if (result['statuscode'] == 200) {
          setdiscountModal(false)
          const swalInstance = MySwal.fire({
            text: 'Email sent successfully!!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('/apps/posconfiguration/Tableselection');
            }
          });
          
        }
        
      }).catch((error) => {
        setemailModal(false)
        // toast(
        //   <div className="d-flex">
        //     <div className="me-1">
        //       <Avatar size="sm" color="danger" icon={<XCircle size={12} />} />
        //     </div>
        //     <div className="d-flex flex-column">
        //       <h6>Could not send Email</h6>
        //       {/* <h4>Wait-List Added Successfully</h4> */}
        //     </div>
        //   </div>
        // );
        const swalInstance = MySwal.fire({
          text: 'Could not send Email!!',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
            navigate('');
          }
        });
      })
  }
  function confirmSubmit1() {
    navigate('')
  }
  const {
    setError,
    formState: { errors }
  } = useForm()
  const { reset, handleSubmit, control } = useForm()


  return typeof (data) != 'undefined' ? (
    <>
      <Card className='invoice-preview-card'>
        <CardBody className='invoice-padding pb-0'>
          <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
            <div>
            <div style={{paddingTop:'5px'}}>
            <img style={{width: '80px',   height: '80px',   display: 'block',   marginBottom: '20px' }} src={API_URL+`/imagepaths/${logoimage}`} alt="Hotel Logo" onError={(e) => {   console.log('Error loading image:', e); }}/>
            </div>
              <h6 className='mb-25'>Guest Name : {data['guestName']}</h6>
              {/* <h6 className='mb-25'>Guest Name: {data['guestName'] ? data['guestName'] : sessionStorage.getItem('selectedInHGuest')}</h6> */}

              {/* <h6 className='mb-25'>Guest Name : {data['guestName'] ? data['guestName'] : sessionStorage.getItem('inHGuestName')}</h6> */}
              {/* <h6 className='mb-25'>Room Number:506 </h6> */}
              {/* <h6 className='mb-25'>Room Number: {data['roomNo'] ? data['roomNo'] : sessionStorage.getItem('inHRoomNo1')}</h6> */}

              {/* <h6 className='mb-25'>Room Number:{sessionStorage.getItem('inHRoomNo1')} </h6> */}
              <h6 className='mb-25'>Room Number:{data['roomNo']} </h6>

              {/* {console.log(sessionStorage.getItem('inHRoomNo1'))} */}
              <h6 className='mb-0'>Pax : {data['pax']} </h6>
            </div>
            <div className='mt-md-1 mt-3'>
              <h4>Outlet Name: <span>{localStorage.getItem('RestaurantSelected')}</span></h4>
              <h4>Bill Number:{data['billNoDisplay']}</h4>
              {/* {console.log(data['billDateTime'])} */}
              <strong><p className='invoice-date-title'> {`Date: ${format(new Date(data['billDateTime']), 'dd-MMM-yy')}  Time: ${format(new Date(data['billDateTime']), 'HH:mm')}`}</p> </strong>
              <h6 className='invoice-number'>FSSAI No: {FSSAINumber}</h6>
              {data.guestCompanyGSTno && (
                <h6 className='invoice-number'>GST No: {data.guestCompanyGSTno}</h6>
              )}
              {/* <h6 className='invoice-number'>GST No: {data.guestCompanyGSTno}</h6> */}

              <h6>Table Number:{localStorage.getItem('TableSelected')}</h6>
              <h6>User : {data['stewardName']}</h6>

            </div>
          </div>
          {/* /Header */}
        </CardBody>


        <Table responsive>
          <thead>
            <tr>
              <th className='py-1'>Item Name</th>
              <th className='py-1'>Quantity</th>
              <th className='py-1'>Price</th>
            </tr>
          </thead>
          <tbody>
            {data['items'].map((row, index) => (
              <tr className='border-bottom'>
                <td className='py-1'>
                  <p className='card-text fw-bold mb-25' id={"itemID" + index}> {row.itemName}</p>
                </td>
                <td className='py-1'>
                  <span className='fw-bold'>{row.qty}</span>
                </td>
                <td className='py-1'>
                  <span className='fw-bold'>{row.price}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CardBody className='invoice-padding pb-0'>
          <Row className='invoice-sales-total-wrapper'>
            <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
              {/* <CardText className='mb-0'>
              <span className='fw-bold'>Salesperson:</span> <span className='ms-75'>Alfie Solomons</span>
            </CardText> */}
            </Col>
            {/* <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}> */}
            <Col className='d-flex justify-content-center'>

              {/* <div className='invoice-total-wrapper'> */}
              <div style={{ paddingLeft: '44%' }}>
                <div className='invoice-total-item'>
                  {/* <p className='invoice-total-title'><strong>SUBTOTAL : {parseFloat(data.subTotal).toFixed(2)}</strong></p> */}
                  {/* <p className='invoice-total-amount'>{parseFloat(data.subTotal).toFixed(2)}</p> */}
                </div>
                {/* {data.DiscountAmt.Food != 0 &&
                <>
                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item}:</p>
                      <p className='invoice-total-title'>{item.value}</p>
                    </div>
                  ))}
                </>
              }
              {data.DiscountAmt.Liquor != 0 && (
                <>
                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item}:</p>
                      <p className='invoice-total-title'>{item.value}</p>
                    </div>
                  ))}
                </>
              )}
              {data.DiscountAmt.SoftDrinks != 0 &&
                <>
                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item}:</p>
                      <p className='invoice-total-title'>{item.value}</p>
                    </div>
                  ))}
                </>
              }
              {data.DiscountAmt.Smokes != 0 &&
                <>
                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item}:</p>
                      <p className='invoice-total-title'>{item.value}</p>
                    </div>
                  ))}
                </>
              }
              {data.DiscountAmt.Others != 0 &&
                <>
                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item}:</p>
                      <p className='invoice-total-title'>{item.value}</p>
                    </div>
                  ))}
                </>
              } */}
                {data.classDiscDisplay.map((item, index) => (
                  <div key={index} className='invoice-total-item'>
                    {/* <p className='invoice-total-title'><strong>{item.item.toUpperCase()} : {item.value}</strong></p> */}
                    <p className='invoice-total-title'>
                      <strong>{item.item.toUpperCase()} : {typeof item.value === 'number' ? item.value.toFixed(2) : item.value}</strong>
                    </p>
                    {/* <p className='invoice-total-title'>{item.value}</p> */}
                  </div>
                ))}
                {data.Round != 0 && <div className='invoice-total-item'>
                  {/* <p className='invoice-total-title'><strong>ROUND OFF : {(data.roundOff).toFixed(2)}</strong></p> */}
                  {/* <p className='invoice-total-amount'>{(data.roundOff).toFixed(2)}</p> */}
                </div>
                }
                {/* <hr className='my-50' /> */}
                <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>

                <div className='invoice-total-item'>
                  <p className='invoice-total-title' ><strong>TOTAL : {(parseFloat(data.total)).toFixed(2)}</strong></p>
                  {/* <p className='invoice-total-amount'>{(parseFloat(data.total)).toFixed(2)}</p> */}

                  {/* <p className='invoice-total-amount'>{data.total}</p> */}
                </div>
              </div>
            </Col>
          </Row>

          <h5>Check Closed </h5>
          {/* <div className='mt-md-1 mt-3'> */}
          {/* {data['paymentBreakup'].map((row, index) => (
            <React.Fragment key={index}>
              <h5>Payment Mode: {row.paymentMode}</h5>
            </React.Fragment>
          ))} */}
          {
            <React.Fragment>
              {/* <h5>
                Payment Mode: {data['paymentBreakup'].map((row, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ', '}
                    {row.paymentMode}
                  </React.Fragment>
                ))}
              </h5>
                  <h5>
                    Company Name :{data.BTCcompany}
                  </h5> */}
              <h5>
                Payment Mode: {data['paymentBreakup'].map((row, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ', '}
                    {row.paymentMode}
                  </React.Fragment>
                ))}
              </h5>

              {data['paymentBreakup'].some((row) => row.paymentMode === 'BTC') && (
                <h5>
                  Company Name: {data.BTCcompany}
                </h5>
              )}

              <div>
                <h5>Amount in Words : {data.total === 0 ? 'Zero' : inWords(data.total)}</h5>
              </div>

            </React.Fragment>

          }
          {/* </div> */}
          {/* <hr className='invoice-spacing' /> */}
          <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '50px' }} ></div>

        </CardBody>
        {/* /Total & Sales Person */}


        {/* <hr className='invoice-spacing' /> */}
        <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '20px' }} ></div>


        <CardBody className='invoice-padding pt-0'>
          <Row>
            <Col sm='12'>
              {/* <span>
                <strong><p>GSTIN No. 29AABCV0552G1ZF</p></strong>
                <p>CIN: U72200KA1999PLC025275</p>
                <p>THE OTERRA</p>
                <p>A unit of Velankani Information Systems Limited</p>
                <p>43, Electronic City,Phase 1,Hosur Road, Bangalore 560100 India</p>
                <p>T: +91 80 3003 0303 F: +91 80 3985 4519 W: www.theoterra.com</p>
              </span> */}
              <span>
                  <strong><p>GSTIN No. {GSTINNumber}</p></strong>
                  <p>CIN: {CINNumber}</p>
                  <p>{hotelName} </p>
                  <p>{firmdata}</p>
                  <p>{hotelAddress} {postalcodedata} India</p>
                  <p> T:+{hotelNo}  F: +{faxdata}  W: {websitedata}</p>
              </span>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Note */}
        <CardBody className='invoice-padding pb-0'>

          <div className='d-flex justify-content-center mt-3'>
            <Button color='primary' size='lg' onClick={handleFinishOrder} style={{ position: 'absolute', left: '43%', top: '95%', transform: 'translateY(-50%)', width: '200px' }} >
              Finish
            </Button>
            {/* <Button color="light" style={{ position: 'absolute', left: '60%', top: '50%', transform: 'translateY(-50%)', width: '200px' }} onClick={handleInvoiceClick}>
                Invoice
              </Button> */}
          </div>
        </CardBody>
      </Card>
     
            <Modal isOpen={emailModal}
        onCancel={() => setemailModal(false)}
        centered
        footer={null}>
        <ModalHeader>
        <h2 className='demo-space-y text-center'><b>Send Email</b></h2>
      </ModalHeader>
        <ModalBody className='px-5 pb-2'>
          <Form onSubmit={handleSubmit(confirmSubmit)}>
            <div className='text-center mb-2'>
              <h5 className='demo-space-y'><b>Type Your E-mail Address</b></h5>

              <Controller
                control={control}
                id='email-to'
                name='email-to'
                render={({ field }) => (
                  <Input
                    type='text'
                    placeholder='email-to'
                    // invalid={errors.email-to && true}
                    {...field}
                  />
                )}
              />


            </div>

            <div className="button-container text-center">
              <Button className="me-1" color="primary" onClick={confirmSubmit1}>
                Cancel
              </Button>
              <Button className='bg-transparent' type='submit' color="danger">
                proceed
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

          
    </>

  ) : null
}

export default PreviewCard
