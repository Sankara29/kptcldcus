


// ** React Imports
import { useEffect ,useState} from 'react'
import "./style.scss";
import { Link, json } from 'react-router-dom'

// import Logo from '../../oterra.jpg';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// ** Reactstrap Imports
// import { Row, Col, Table } from 'reactstrap'

// ** Styles
import '@styles/base/pages/app-invoice-print.scss'
import { BlockMapBuilder } from 'draft-js';
import { left } from '@popperjs/core';
import { Card, CardBody, CardText, Label, InputGroup, Input, Row, Container, Col, Table, Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, InputGroupText } from 'reactstrap';
import logo from '@src/assets/images/logo/oterra.jpg';

import API_URL from '../../../config'

const PreviewSplitBill = () => {

  // ** Print on mount

 
  const [details,setDetails] = useState('')
  const [encodedSignature, setEncodedSignature] = useState('');
  const [logoimage, setLogo] = useState(null);
  const [hotelAddress, setHotelAddress] = useState(null);
  const [hotelName, setHotelName] = useState(null);
  const [hotelNo, setHotelNo] = useState(null);
  const [hotelFax,sethotelFax] = useState(null)
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
    // Retrieve folioData from localStorage
    let folioData = localStorage.getItem('printFolioData');

    // Parse folioData to an object
    let parsedFolioData = JSON.parse(folioData);

    // Update the state only if parsedFolioData is not null
    if (parsedFolioData) {
      setDetails(parsedFolioData);
    }
  }, []);


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
        setfaxdata(postres['data']['0']['fax'])
        setfirmdata(postres['data']['0']['firm'])
        setwebsitedata(postres['data']['0']['website'])
        setpostalcodedata(postres['data']['0']['postalcode'])


        
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [])
//   const m1 = JSON.stringify(folioData)


// console.log(folioData)
//   useEffect(() => {
//     const billfetch = JSON.stringify({
//       "hotelID": 1,
//       "storeID": localStorage.getItem('storeID'),
//       "orderID": localStorage.getItem('orderID'),
//       "tableNo": localStorage.getItem('TableSelected'),
//     })
//     fetchx(API_URL+'/getOrderDetailsSplit', {
//       method: 'POST',
//       body: billfetch,
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//     })
//       .then((res) => res.json())
//       .then((post) => {
//         console.log(post)
//         if (post['statuscode'] == 200) {

//           setDetails(post['data'])

//         }
//         else[
//           setDetails(null)
//         ]
//         console.log(post)
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });

      setTimeout(() => window.print(), 1000)
      const divToPrint = document.getElementById('divId');
    
  
//   }, [])

    console.log(details)
    useEffect(() => {
      if (details && details['maxSignature']) {
        const binaryData = new Uint8Array(atob(details['maxSignature']).split('').map(char => char.charCodeAt(0)));
        const encodedBinaryData = btoa(String.fromCharCode(...binaryData));
        setEncodedSignature(encodedBinaryData);
      }
    }, [details]);
  
   

  return (
    <div style={{ width:'210mm',paddingTop:'10px'}}>
    <Card className='invoice-preview-card'>
      <CardBody className='invoice-padding pb-0'>
        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
        <tr>
        <td>
          <div>
          <div className='logo-wrapper'>
            <img style={{width: '80px',   height: '80px',   display: 'block',   marginBottom: '20px' }} src={API_URL+`/imagepaths/${logoimage}`} alt="Hotel Logo" onError={(e) => {   console.log('Error loading image:', e); }}/>
            </div>
            <h6 className='mb-25'>Guest Name : {details['guestName']}</h6>
            <h6 className='mb-25'>Room Number:{localStorage.getItem('selectedRoom')} </h6>
            <h6 className='mb-0'>Pax : {details['pax']} </h6>
          </div>
          </td>
          <td style={{width:'420px'}}>
   
                  </td>
          <td  style={{textAlign:'right'}}>

          <div className='mt-md-1 mt-3'>
            <h4>Outlet Name: <span>{localStorage.getItem('RestaurantSelected')}</span></h4>
            {/* <h6 className='invoice-number'>FSSAI No: 10018043002066</h6> */}
            <h6 className='invoice-number'>FSSAI No: {FSSAINumber}</h6>
            <h6>Table Number:{localStorage.getItem('TableSelected')}</h6>
            <h6>User : {details['stewardName']}</h6>

          </div>
          </td>
          </tr>
        </div>
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
          {details && details['items'].map((row, index) => (

            <tr className='border-bottom'>
              <td className='py-1'>
                <p className='card-text fw-bold mb-25' id={"itemID" + index}> {row.itemName}</p>
              </td>
              <td className='py-1'>
                <span className='fw-bold'>{row.qty}</span>
              </td>
              <td className='py-1'>
                <span className='fw-bold'>{row.Price.toFixed(2)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CardBody className='invoice-padding pb-0'>
        <Row className='invoice-sales-total-wrapper'>
          <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>

          </Col>
          <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
            <div className='invoice-total-wrapper'>
              <div className='invoice-total-item'>
              </div>
              <div className='invoice-total-item'>
                {/* <p className='invoice-total-title'>Subtotal : <strong>{data.subtotal}</strong></p> */}
                {/* <p className='invoice-total-title'>{item.value}</p>/ */}
              </div>
              {/* {data.DiscountAmt.Food != 0 &&
                <>
                {console.log("Food")}

                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item}:<strong> {item.value}</strong></p>
                    </div>
                  ))}
                </>
              }
              {data.DiscountAmt.Liquor != 0 && (
                
                <>
                {console.log("Liquor")}
                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item} :<strong> {item.value}</strong></p>
                    </div>
                  ))}
                </>
              )}
              {data.DiscountAmt.SoftDrinks != 0 &&
                <>
                {console.log("Softdrinks")}

                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item} : <strong>{item.value}</strong></p>
                    </div>
                  ))}
                </>
              } */}
              {details.classDiscDisplay && details.classDiscDisplay.map((item, index) => (
                <div key={index} className='invoice-total-item'>
                  <p className='invoice-total-title'><strong>{item.item.toUpperCase()} : {item.value}</strong></p>
                </div>
              ))}
              {/* {data.DiscountAmt.Smokes != 0 &&
                <>
                {console.log("smokes")}

                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item} :<strong> {item.value}</strong></p>
                    </div>
                  ))}
                </>
              }
              {data.DiscountAmt.Others != 0 &&
                <>
                {console.log("others")}

                  {data.classDiscDisplay.map((item, index) => (
                    <div key={index} className='invoice-total-item'>
                      <p className='invoice-total-title'>{item.item} : <strong>{item.value}</strong></p>
                    </div>
                  ))}
                </>
              } */}
              <div className='invoice-total-item'>
                <p className='invoice-total-title'><strong>AMOUNT : {details.total}</strong></p>
                {/* <p className='invoice-total-title'>{item.value}</p> */}
              </div>
              <hr className='my-50' />
            </div>
          </Col>
        </Row>

      </CardBody>
      {/* /Total & Sales Person */}

      <hr className='invoice-spacing' />

      {/* Invoice Note */}
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
    </Card>
   
  </div>
  )
}

export default PreviewSplitBill
