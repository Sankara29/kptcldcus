import { useEffect, useState } from 'react'
import { useParams, Link, json } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import Sidebar from '@components/sidebar'
import Select from "react-select";
// ** Utils
import { selectThemeColors } from "@utils";
import classnames from "classnames";

import { useNavigate } from "react-router-dom";
import Cleave from "cleave.js/react";
import toast from "react-hot-toast";
// ** Custom Components
import Avatar from "@components/avatar";
import { Check } from "react-feather";
import { GrStar } from "react-icons/gr";
import { FaRupeeSign } from "react-icons/fa";
import React, { Component } from 'react';
import logo from '@src/assets/images/logo/oterra.jpg';


// ** Third Party Components
import axios from 'axios'
import API_URL from "../../../../config";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Reactstrap Imports
import { Row, Col, Alert, CardTitle, CardHeader } from 'reactstrap'
import { Form, Label, Card, CardBody, CardText, Container, Button, Input, InputGroup, Modal, ModalBody, ModalHeader, ModalFooter, Table } from 'reactstrap'
const SplitPayment = () => {
  // ** HooksVars
  const { id } = useParams()
  let navigate = useNavigate();

  // ** States
  const [data, setData] = useState(null)
  const [isEqualSplit, setIsEqualSplit] = useState(false)
  const [modalContent, setModalContent] = useState('');
  const [cards, setCards] = useState([]);
  const [splitData, setSplitData] = useState([])
  // console.log(splitData)
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  // const [selectedPaymentType, setSelectedPaymentType] = useState({
  //   value: "Cash",
  //   label: "Cash"
  // });
  
  const [paymentInfoModal, setpaymentInfoModal] = useState(false)
  const [recievedPayment, setrecievedPayment] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [inhouseGuestDetails, setinhouseGuestDetails] = useState([])
  const [btcCompanyDetails, setbtcCompanyDetails] = useState([])

  const [Amount, setAmount] = useState(0);
  const [FolioNumber, setFolioNumber] = useState(0)
  const [inhouseGuestOptions, setInhouseGuestOptions] = useState([]);
  const [btcCompanyOptions, setbtcCompanyOptions] = useState([])

  const [tableData, setTableData] = useState([]);
  const [balanceValue, setBalanceValue] = useState(Amount);
  const [inhouseGuestModal, setinhouseGuestModal] = useState(false)
  const [btcCompanyModal, setbtcCompanyModal] = useState(false)

  const [selectedRoomNumber, setselectedRoomNumber] = useState([])
  const [selectedRoomNumber1, setselectedRoomNumber1] = useState([])

  const [selectedCompany, setselectedCompany] = useState([])

  const [selectedGuest, setSelectedGuest] = useState([])
  const [selectedbtcCompany, setselectedbtcCompany] = useState([])

  const [openInvoice, setopenInvoice] = useState(false)
  const [amtPaid, setAmtPaid] = useState([])
  const [previewBillData, setpreviewBillData] = useState([])
  const [discFolio, setDiscFolio] = useState([])
  const [folioBal, setFolioBal] = useState([])
  // localStorage.setItem('recievedPayment1',recievedPayment)
  const recievedPay = (localStorage.getItem('recievedPayment1'));
  // console.log(recievedPay)
  const [showAlert, setshowAlert] = useState(false);
  // console.log(previewBillData)
  const [previewBill, setpreviewBill] = useState(false)
  const [finalInvBill, setfinalInvBill] = useState(false)
  const [isOrderPopup, setIsOrderPopup] = useState(false)
  const [discountModal, setdiscountModal] = useState(false)
  const [isAmountActive, setIsAmountActive] = useState(true);
  const [isPercentageActive, setIsPercentageActive] = useState(false);
  const [isClassificationActive, setisClassificationActive] = useState(false)
  const [isCouponActive, setisCouponActive] = useState(false)
  const [isItemDisActive, setisItemDisActive] = useState(false)
  const [discountModal1, setdiscountModal1] = useState(false)
  const [reload, setreload] = useState(true)
  const [searchRoomORGuest, setsearchRoomORGuest] = useState('');
  const [searchCompany, setsearchCompany] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedIHGuest, setSelectedIHGuest] = useState(false);
  const [PaymentOptions, setPaymentOptions] = useState([]);
  const [tipsAmount, setTipsAmount] = useState(0);
  const [tipstotalAmount,settipstotalAmount] = useState(0)
  const [roomDiscount, setRoomDiscount] = useState(false);
  const [emailModal, setemailModal] = useState(false)
  const [logoimage, setLogo] = useState(null);
  const [hotelAddress, setHotelAddress] = useState(null);
  const [hotelName, setHotelName] = useState(null);
  const [hotelNo, setHotelNo] = useState(null);
  const [hotelFax, sethotelFax] = useState(null)
  const [image, setImage] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [CINNumber, setCINNumber] = useState(null);
  const [FSSAINumber, setFSSAINumber] = useState(null);
  const [GSTINNumber, setGSTINNumber] = useState(null);
  const [firmdata, setfirmdata] = useState(null);
  const [faxdata, setfaxdata] = useState(null);
  const [websitedata, setwebsitedata] = useState(null);
  const [postalcodedata, setpostalcodedata] = useState(null);
  const [voidpaymentModal, setvoidpaymentModal] = useState(false)




  let selectedpaxTable = ''
  splitData.forEach((item) => {
        selectedpaxTable = item.pax

    
});



  const [finalInvBillinfo, setfinalInvBillinfo] = useState([])
  
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm();

  const handleFoliosPreview = (Folio, cardData) => {
    setpreviewBillData(cardData)
    localStorage.setItem('printFolioData', JSON.stringify(cardData))
    setpreviewBill(true)
    localStorage.setItem('getData', cardData)
  }

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

  useEffect(() => {
    fetchx(API_URL + '/getPaymentType?hotelID=1')
        .then(result => result.json())
        .then(resp => {
            const responseData = resp['data'];
            const activePaymentTypes = responseData.filter((item) => item.isActive === 1);

            const paymentTypes = activePaymentTypes.map((item) => ({
                label: item.paymentTypeCode,
                value: item.paymentTypeCode,
            }));
            setPaymentOptions(paymentTypes);
        })
        .catch(error => {
        });
}, [])
  const splitStatus = () => {
    fetchx(API_URL + '/getOrderDetailsSplit', {
      method: 'POST',
      body: JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then(resp => {
        if (resp['statusCode'] == 200 ) {
        console.log(resp)
        // setAmount(resp['data'][0]['Balance']);
        for(let i=0 ; i<resp['data'].length;i++){
          Object.entries(resp['data'][i]).forEach(([key, value]) => {
            if (key==='FolioNo' && FolioNumber===value) {
              console.log('set amount')
              setAmount(resp['data'][i]['Balance'])
              setBalanceValue(resp['data'][i]['Balance'])
            }
          });
        }
      }
        if (resp['statusCode'] == 403 && (resp['message'] == 'Data does not exist' || resp['message'] == 'No items present')) {
          setTimeout(() => { navigate('/apps/posconfiguration/Tableselection') }, 1000);
        }
        const splitdata = resp.data;

        if (splitdata.length != 0) {
          setSplitData(splitdata);

        }
        if(resp['data'].length==0){
          setTimeout(() => { navigate('/apps/posconfiguration/Tableselection') }, 100);

        }

        if (resp['data'] !== 0) {
          createCards();
        }
      })
      .catch((err) => {
        // console.log(err.message);
      });
  };
  const createCards = () => {
    const cardArray = [];

    for (let i = 0; i < splitData.length; i++) {
      const cardData = splitData[i];
      const balance = cardData?.Balance ?? 0;
      const Folio = splitData[i]['FolioNo']
      const splitfolioBalace1 = splitData[i]['Balance']
      const splitfinalInvoceAmt = splitData[i]['total']
      const totalDiscount = splitData[i]['TotalDiscount']

      cardArray.push(
        <Card
          key={`${i}`}
          className="me-0.5"
          style={{
            'marginRight': '10px',
            height: '350px',
            width: '300px',
            'marginBottom': '10px',
          }}
        >
          <CardHeader style={{ fontSize: "20px", fontWeight: "bold" }} onClick={() => handleFoliosPreview(Folio, cardData)}
          >
            Folio Number# {localStorage.getItem('orderID') + "/" + Folio}
          </CardHeader>
          <CardBody style={{ textAlign: "center", color: "black", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ marginRight: '20px', color: 'black' }}>
              <strong>Amount</strong> <br />
              <strong><FaRupeeSign />{splitfinalInvoceAmt}</strong>



            </div>
            <div className='demo-inline-spacing'>

              <div className='demo-inline-spacing'>
                {parseFloat(balance) === 0 ? (
                  <Button.Ripple color='primary' outline style={{
                    position: 'absolute',
                    left: '15%',
                    top: '40%',
                    width: '200px',
                  }} onClick={() => handleInvoiceClick(Folio, splitfolioBalace1)}>
                    Generate Invoice
                  </Button.Ripple>
                ) : (
                  <>
                    {totalDiscount == 0.00 ? (
                      <Button.Ripple color='primary' outline style={{
                        position: 'absolute',
                        left: '15%',
                        top: '40%',
                        width: '200px',
                      }} onClick={() => handleFolioDiscount(Folio, splitfolioBalace1)}>
                        Apply Discount
                      </Button.Ripple>
                    ) : (
                      <Button.Ripple color='primary' outline style={{
                        position: 'absolute',
                        left: '15%',
                        top: '40%',
                        width: '200px',

                      }} onClick={() => handleFolioDiscount(Folio, splitfolioBalace1)}>
                        <strong >Discount applied<FaRupeeSign />{totalDiscount}</strong>
                      </Button.Ripple>
                    )}
                  </>
                )}
              </div>


              
            </div>
           
            <Button
              onClick={() => handlePayNowClick(Folio, balance)}
              style={{
                position: 'absolute',
                left: '15%',
                top: '85%',
                transform: 'translateY(-50%)',
                width: '200px',
                backgroundColor: parseFloat(balance) === 0 ? 'green' : 'red'
              }}
              className={`btn btn-${parseFloat(balance) === 0 ? 'success' : 'danger'}`}
            >
              {parseFloat(balance) === 0 ? "PAID" : "Pay Now"}
            </Button>
        
          </CardBody>
        </Card>
      );

    }
    const rows = [];
    for (let i = 0; i < cardArray.length; i += 5) {
      rows.push(
        <div key={i} style={{ display: "flex" }}>
          {cardArray.slice(i, i + 5)}
        </div>
      );
    }
    return <div>{rows}</div>;
  }
 
  useEffect(() => {
    splitStatus()
    fetchx(API_URL + '/getInHouseGuests', {
      method: 'POST',
      body: JSON.stringify({
        "hotelID": 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then(resp => {
        const data = resp.data;
        setinhouseGuestDetails(data);
        for (let i = 0; i < data.length; i++) {
          data[i]['value'] = data[i]['roomNumber']
          data[i]['label'] = data[i]['roomNumber'] + '(' + data[i]['name'] + ')'
        }
        setInhouseGuestOptions(data)

      })
   
    fetchx(API_URL + '/getBTCCompaniesPOS?hotelID=1')
      .then(result => result.json())
      .then((resp) => {
        const data = resp.data;
        setbtcCompanyDetails(data);
        for (let i = 0; i < data.length; i++) {
          data[i]['value'] = data[i]['accountName']
          data[i]['label'] = data[i]['accountName']
        }
        setbtcCompanyOptions(data)
      });
  }, [])
  const handlePayButtonClick1 = () => {
    if (selectedPaymentType) {
      setpaymentInfoModal(true);
    } else {
      const swalInstance = MySwal.fire({
        text: "Please select at least one payment!",
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
  
      swalInstance.then((result) => {
        if (result.isConfirmed) {
          navigate('')
        }
      });
    }
  };
  
  const handlePaymentTypeChange = (selectedOption) => {
    if (balanceValue != 0.00) {
      setSelectedPaymentType(selectedOption);

    }
     else {
      const swalInstance = MySwal.fire({
        text: "Amount paid.Cannot select other payments. ",
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
      swalInstance.then((result) => {
        if (result.isConfirmed) {
          setSelectedPaymentType(null);

        }
      });
    }
   
    if(selectedOption.value === 'Post To Room') {
      setRoomDiscount(true)
if(balanceValue != 0.00){
      setinhouseGuestModal(true)
        setsearchRoomORGuest('')
        setselectedRoomNumber('')
    }
  }
    if (selectedOption.value === 'BTC') {
      setbtcCompanyModal(true)
      setsearchCompany('')
      setselectedCompany('')
    }
    if(selectedOption.value !== 'Post To Room') {
      // sessionStorage.removeItem('selectedInHGuest')
      if(roomDiscount) {

      const removeDiscount = JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
        "FolioNo": FolioNumber,
      });

      let res = fetchx(API_URL + '/revokePOSDiscounts', {
        method: 'POST',
        body: removeDiscount,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then(result => {
         console.log(result)
          splitStatus();

        })
        .catch(error => {
          // console.error('API error:', error);
        });
      }
      const billfetch = JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
        // "discID":0,
        // "billType":'DummyInvoice',
        // "paymentType":'Cash',
        // "FolioNo":0
      })
      fetchx(API_URL+'/getOrderDetailsSplit', {
        method: 'POST',
        body: billfetch,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((post) => {
          if (post.statuscode === 200) {
              // Iterate over each element in the 'data' array
              post.data.forEach((item) => {
                  if (item.FolioNo === FolioNumber) {
                      const selectedGuestInTable = item.guestName;
                      // console.log("Guest Name:", selectedGuestInTable);
      
                      sessionStorage.setItem('selectedInHGuest', selectedGuestInTable);
                  }
              });
          }
      })
        .catch((err) => {
          console.log(err.message);
        });

    }

    // setreload(false)
    // setTimeout(() => {setreload(true)},100) 
  };
  const handlePayButtonClick = () => {
   
    let paymentType = selectedPaymentType.value
    // console.log(paymentType)
    let paymentData = {};
    let paymentData1 = " ";
    let inhouseRoomNo = " ";
    if (paymentType === 'Post To Room') {
     
      paymentData1 = "Guest";
      inhouseRoomNo = selectedRoomNumber

    }
    else if (paymentType === 'BTC') {
      paymentData1 = "BTC";
      inhouseRoomNo = selectedbtcCompany.companyid
      sessionStorage.setItem('companyid', inhouseRoomNo)
    }
    else {
      // console.log("2")
      paymentData1 = selectedPaymentType.value;

    }
    // console.log(paymentData1)
    handleSubmit((data1) => {

      let balError = false
      if (balanceValue < 0) {
        balError = true
        // alert('Balance amount cannot be negative.');
        const swalInstance = MySwal.fire({
          text: "Balance amount cannot be negative",
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
            setpaymentInfoModal(false)
          }
        });
      }
      if (parseFloat(balanceValue) > parseFloat(Amount)) {
        balError = true
        // alert('Balance amount cannot be greater than the actual amount.');
        const swalInstance = MySwal.fire({
          text: "Balance amount cannot be greater than the actual amount",
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
            setpaymentInfoModal(false)
          }
        });
      }
      // console.log(data1)
      if (!balError) {
        paymentData = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "orderID": localStorage.getItem('orderID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "actualAmt": Amount,
          "recievedAmt": balanceValue,
          "paymentType": paymentData1,
          "FolioNo": FolioNumber,
          TranxDetails: (paymentType === 'Post To Room' || paymentType === 'BTC') ? undefined : data1.transactionID,
          roomNo: (paymentType === 'Post To Room' || paymentType === 'BTC') ? inhouseRoomNo : null,
          // 'tips': data1['tips']
          "tips": data1['tips'] !== undefined ? data1['tips'] : 0,

        });
      }
      // console.log(paymentData)
      let res = fetchx(API_URL + '/amountSettled', {
        method: 'POST',
        body: paymentData,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        // console.log(res)
        .then(response => {
          // console.log(response)
          if (response.statuscode === 200) {
            // console.log(response.data.Balance)
            setAmount(response.data.Balance)
            setBalanceValue(response.data.Balance)
            // setreload(false)
            // setTimeout(() => {setreload(true)},5) 
            setpaymentInfoModal(false)
            reset()
            fetchx(API_URL + '/getOrderDetailsSplit', {
              method: 'POST',
              body: JSON.stringify({
                "hotelID": 1,
                "storeID": localStorage.getItem('storeID'),
                "orderID": localStorage.getItem('orderID'),
                'tableNo': localStorage.getItem('TableSelected'),
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then((res) => res.json())
              .then((resp) => {
                setSplitData(resp.data)
                const index = FolioNumber - 1;
                const selectedFolioData = resp.data[index];
                const m1 = parseFloat(selectedFolioData['total']).toFixed(2);
                localStorage.setItem('recievedPayment1', m1)
              })
              .catch((err) => {
                console.log(err.message);
              });
            fetchx(API_URL + '/getAllTransactions?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected') + '&FolioNo=' + FolioNumber)
              .then(result => result.json())
              .then((resp) => {
                setrecievedPayment(resp['data'])
              });
          }
          if (response.statusCode == 403) {
            const swalInstance = MySwal.fire({
              text: response.message,
              buttonsStyling: false,
              confirmButtonText: 'Close',
              customClass: {
                confirmButton: 'btn btn-danger',
              },
            });
            swalInstance.then((result) => {
              if (result.isConfirmed) {
                setpaymentInfoModal(false);
      
              }
            });
          }
        })

    })();

  }

  const handlePayNowClick = (folioNumber, amount) => {
    setIsFormOpen(true);
    setAmount(amount);
    setBalanceValue(amount)
    setFolioNumber(folioNumber)
    fetchx(API_URL + '/getAllTransactions?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected') + '&FolioNo=' + folioNumber)

      .then((res) => res.json())
      .then((resp) => {
        setrecievedPayment(resp['data'])
        const index = folioNumber - 1;
        const selectedFolioData = resp.data;

        const m1 = parseFloat(selectedFolioData[0]['RecievedAmt']).toFixed(2);
        localStorage.setItem('recievedPayment1', m1)

      })
      .catch((err) => {
        console.log(err.message);
      });

  };

 
  const handleGuestSelect = (guest) => {
    setRoomDiscount(true)
    // sessionStorage.removeItem('selectedInHGuest');
    const inHRoomNo = guest.roomNumber
    const reservationID = guest.reservationID
    sessionStorage.setItem('inHRoomNo1', inHRoomNo)
    sessionStorage.setItem('selectedIHRoomNo', reservationID)
    sessionStorage.setItem('selectedIHRoomNo1', inHRoomNo)


    sessionStorage.setItem('selectedInHGuest', guest.name)

    setselectedRoomNumber(reservationID)
    setselectedRoomNumber1(inHRoomNo)
    setSelectedGuest(guest);
    if(roomDiscount) {
      console.log(roomDiscount)
    const roomdiscdata = JSON.stringify({
      "hotelID": 1,
      "storeID": localStorage.getItem('storeID'),
      "orderID": localStorage.getItem('orderID'),
      "tableNo": localStorage.getItem('TableSelected'),
      "FolioNo": FolioNumber,
      "roomNo": guest.reservationID
    })
    console.log(roomdiscdata)
    fetchx(API_URL + '/applyRoomDiscountPOS', {
      method: 'POST',
      body: roomdiscdata,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        console.log(post)
        if (post.statuscode === 200) {
          splitStatus();
          // console.log(post)
          const billfetchDicount = JSON.stringify({
            "hotelID": 1,
            "storeID": localStorage.getItem('storeID'),
            "orderID": localStorage.getItem('orderID'),
            "tableNo": localStorage.getItem('TableSelected'),
            // "discID":0,
            // "billType":'DummyInvoice',
            // "paymentType":'Cash',
            "FolioNo":FolioNumber
          })
          fetchx(API_URL + '/getOrderDetailsSplit', {
            method: 'POST',
            body: billfetchDicount,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((res) => res.json())
            .then((post) => {
              if (post['statuscode'] == 200) {

                for(let i=0 ; i<post['data'].length;i++){
                  Object.entries(post['data'][i]).forEach(([key, value]) => {
                    if (key==='FolioNo' && FolioNumber===value) {
                      setAmount(post['data'][i]['Balance'])
                      setBalanceValue(post['data'][i]['Balance'])

                    }
                  });
                }
              }
              else[
                setData(null)
              ]
              // console.log(post)
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
    
  }
  const handleBTCCompanySelect = (company) => {
    const inBtcCompany = company.accountName
    // const inBtcCompany = company.accountName
    setselectedCompany(inBtcCompany)
    setselectedbtcCompany(company);
  }

  const handleInvoiceClick = (folioNumber, splitfolioBalace1) => {
    // console.log(folioNumber)
    setFolioNumber(folioNumber)
    const invBalance = splitfolioBalace1;
    // console.log(invBalance)
    if (invBalance == 0) {
      setopenInvoice(true)
    } else {
      // setshowAlert(true)
      // alert('Please complete the payment');
      MySwal.fire({
        text: 'Please Complete the Payment!',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
  };

  function handleCancelInvForm() {
    setopenInvoice(false)
  }

  function openInvoiceForm() {
    setopenInvoice(true)
    //console.log("qwertyuiop")

  }
  const handleInvForm = () => {
    if (!isButtonClicked) {
      setIsButtonClicked(true);
      handleSubmit((formData) => {
        const invbill = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "orderID": localStorage.getItem('orderID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "FolioNo": FolioNumber,
          "guestName": formData["guestname"],
          "guestCompanyGSTno": formData["gstNo"],
          "mobileNo": formData["mobileNo"],
          "pax":formData['pax']
        })
        // console.log(invbill)

        setTimeout(() => {
          fetchx(API_URL + '/generateBill', {
            method: 'POST',
            body: invbill,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((res) => res.json())
            // console.log(res)
            .then((post) => {
              // console.log(post)
              setfinalInvBillinfo(post['data'])
              localStorage.setItem('BillNo', post['data']['BillNo'])
              if (post['statuscode'] == 200) {
                sessionStorage.removeItem('selectedInHGuest')

                fetchx(API_URL + '/generateEbill', {
                  method: 'POST',
                  body: JSON.stringify({
                    "hotelID": 1,
                    "storeID": localStorage.getItem('storeID'),
                    "orderID": localStorage.getItem('orderID'),
                    "billNo": post['data']['BillNo'],
                    "signature": ''

                  }),
                  headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
                })
                  .then((res) => res.json())
                  .then((resp) => {

                    // console.log(resp)
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });


              }
              setopenInvoice(false)
              setfinalInvBill(true)

              // setTimeout(() => { navigate('/apps/POSconfiguration/Invoice') }, 2000)
            })
            .catch((err) => {
              console.log(err.message);
            });
        }, 1000)
      })();
    }
  }
  const toggleModal1 = () => {
    setpreviewBill(!previewBill)
  }
  const toggleModal2 = () => {
    setfinalInvBill(!finalInvBill)
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
  //       navigate('/apps/posconfiguration/SplitPayment')
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
  
  const handleClose = () => {
    navigate('/apps/posconfiguration/SplitPayment')
  }

  const handleFolioDiscount = (Folio, splitfolioBalace1) => {
    setDiscFolio(Folio)
    setFolioBal(splitfolioBalace1)

    if (splitfolioBalace1 == 0.00) {
      // console.log("Balance zero")

    }
    else {
      setdiscountModal(true);
    }
  }
  const toggleModal = () => {
    setdiscountModal(!discountModal);
  };
  const handleAMTClick = () => {
    // console.log("AMOUNT")
    setIsAmountActive(true);
    setIsPercentageActive(false);
    setisCouponActive(false)
    setisItemDisActive(false)
    setisClassificationActive(false)
  }
  const handlePercentageClick = () => {
    // console.log("Percentage")
    setIsAmountActive(false);
    setIsPercentageActive(true);
    setisCouponActive(false)
    setisItemDisActive(false)
    setisClassificationActive(false)
  }
 
  const handleClassification = () => {
    // console.log("Classification")
    setIsAmountActive(false);
    setIsPercentageActive(false);
    setisCouponActive(false)
    setisItemDisActive(false)
    setisClassificationActive(true)
  }
  const onSubmitDisc = (data) => {
    let balError = false
    let discData = {};

    if (isPercentageActive) {

      const discType = "Percentage";
      const percentage = data.percentage;
      if (parseFloat(percentage) >= 100) {
        balError = true;
        const swalInstance = MySwal.fire({
          text: "Percentage cannot be greater than 100",
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
            setdiscountModal(false)
            navigate('')
          }
        });
      }
      if (!balError) {
        discData = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "orderID": localStorage.getItem('orderID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "discType": discType,
          "description": JSON.stringify({ 'Percentage': percentage }),
          "valueFormat": discType,
          "FolioNo": discFolio,
        });
      }
      // console.log(discData)
    }

    if (isAmountActive) {
      const discType = "Amount";
      const amount = data.amount;

      if (parseFloat(data.amount) >= parseFloat(folioBal)) {
        balError = true
        // alert("Percentage cannot be greater than 100");
        const swalInstance = MySwal.fire({
          text: "Discount amount cannot be greater than the actual amount",
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
            setdiscountModal(false)
            navigate('')
          }
        });
      }
      if (parseFloat(data.amount) < 0) {
        balError = true
        // alert("Percentage cannot be greater than 100");
        const swalInstance = MySwal.fire({
          text: "Discount amount cannot be negative",
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
            setdiscountModal(false)
            navigate('')
          }
        });
      }
      if (!balError) {
        discData = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "orderID": localStorage.getItem('orderID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "discType": discType,
          "description": JSON.stringify({ 'Amount': amount }),
          "valueFormat": discType,
          "FolioNo": discFolio,
        });
      }
    }
   
    if (isClassificationActive) {
      
      let foodDisc = data.Food;
      let liquorDisc = data.Liquor;
      let softdrinksDisc = data.SoftDrinks;
      let smokesDisc = data.Smokes;
      let othersDisc = data.Others;
      if (foodDisc === undefined) {
        foodDisc = 0;
      }
      if (liquorDisc === undefined) {
        liquorDisc = 0;
      }
      if (softdrinksDisc === undefined) {
        softdrinksDisc = 0;
      }
      if (smokesDisc === undefined) {
        smokesDisc = 0;
      }
      if (othersDisc === undefined) {
        othersDisc = 0;
      }
      if (foodDisc >= 100 || liquorDisc >= 100 || softdrinksDisc >= 100 || smokesDisc >= 100 || othersDisc >= 100) {
        balError = true;
        // alert("Percentage cannot be greater than 100");
        const swalInstance = MySwal.fire({
          text: "Percentage cannot be greater than 100",
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
            setdiscountModal(false)
            navigate('')
          }
        });
      }

      const discType = "Category";
      const valueFormat = "Percentage";
      if (!balError) {
        discData = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "orderID": localStorage.getItem('orderID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "discType": discType,
          "description": JSON.stringify({ 'food': foodDisc, 'softDrinks': softdrinksDisc, 'liquor': liquorDisc, 'smokes': smokesDisc, 'others': othersDisc }),
          "valueFormat": valueFormat,
          "FolioNo": discFolio,
        });
      }
    }
    // console.log(discData)
    let res = fetchx(API_URL + '/applyDiscount', {
      method: 'POST',
      body: discData,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then(result => {
        // console.log(result)
        // console.log(result.data['TotalDiscount'])
        if (result['statuscode'] == 200) {
          const swalInstance = MySwal.fire({
            title: (
              <div>
                <FaRupeeSign style={{ fontSize: '20px', marginRight: '5px' }} />
                <strong>{result.data['TotalDiscount']}</strong>
              </div>
            ),
            text: 'Discount applied successfully!!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              setTimeout(() => { navigate('/apps/posconfiguration/SplitPayment') }, 100);
            }
          });
          // setTimeout(() => { navigate('/apps/posconfiguration/SplitPayment') }, 100);
          console.log('API response:', result);

        }

      })
      .catch(error => {
        // Handle any errors that occur during the API call
        console.error('API error:', error);
      });
  }

  const UndoSplit = () =>{
    console.log('Undo split')
    fetchx(API_URL+'/restoreOriginalOrder', {
      method: 'PUT',
      body:  JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
      }),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
  })
  .then((res) => res.json())
  .then(resp => {
    console.log(resp)
    if (resp['statuscode'] == 200) {
      const splitData = resp.data;
      
      setTimeout(() => { navigate('/apps/posconfiguration/Split') }, 100);

    }else{
      handleError(resp['message'])
    }

  })
  .catch((err) => {
    console.log(err.message);
  });


  }

  const handleError = (message) => {
    return MySwal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      html: message.replace(/\n/g, '<br />'),
      customClass: {
        confirmButton: 'btn btn-danger'
      },
      allowOutsideClick: false,
      confirmButtonText: 'Close',
      confirmButtonColor: 'danger',
      buttonsStyling: false
    })
  }

  const handleTipsChange = (value) => {
   
    const parsedtips1 = parseFloat(value).toFixed(2);
    const isValidNumber = !isNaN(parsedtips1) && isFinite(parsedtips1);
    setTipsAmount(isValidNumber ? parsedtips1 : 0);
  };

  function confirmSubmit1() {
    navigate('')
  }

  function confirmSubmit(emaildatas) {
    let emaildata = emaildatas['email-to']
    let CompleteData = finalInvBillinfo
    console.log(CompleteData)
    let billno = CompleteData.billNoDisplay.replaceAll("/", "_").replaceAll("-", "")
    console.log(JSON.stringify({
      type:'POSInvoice',
      amount:CompleteData.total,
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
        amount:CompleteData.totalAmount,
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
            setfinalInvBill(false)
          }
        });
      })
  }

  const handelvoidpayment = () => {
    setvoidpaymentModal(true)
  }
  const handleOnSubMitvoidpayment = (data) => {
    console.log(JSON.stringify({
      "hotelID": 1,
      "storeID": localStorage.getItem('storeID'),
      "orderID": localStorage.getItem('orderID'),
      "FolioNo": FolioNumber,
      "billNo":0,
      "tableNo": localStorage.getItem('TableSelected'),
      "reason": data.reason,
    }))
    fetchx(API_URL + '/voidPOSPayment', {
      method: 'PUT',
      body: JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "FolioNo": FolioNumber,
        "tableNo": localStorage.getItem('TableSelected'),
        "billNo":0,
        "reason": data.reason,

      }),

      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        if (post['statuscode'] == 200) {

          const swalInstance = MySwal.fire({
            title: 'Payment Voided',
            text: 'Payment Voided Successfully!!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          setTimeout(() => { navigate('') }, 1000);

          reset();
        }


      })
      .catch((err) => {
        console.log(err.message);
      });
  }


  const handleCancelVoidBillClick = () => {
    setvoidpaymentModal(false)
    console.log("inside cancel bill")

  }

  return (
    <>

  <div className="d-flex align-items-center justify-content-between">
  <h4 className="m-0">
      Payment For Table Number #: {localStorage.getItem('TableSelected')}
    </h4>

    <Button color='primary' className="bg-transparent" style={{  backgroundColor: "gray",margin:'10px' }} onClick={()=>{UndoSplit()}} >
                    Undo Split
                  </Button>
  </div>


      {/* <div className="cards-container">{createCards()}</div> */}
      <Row className='match-height'>
        <Col xl='12'>
          <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px' }}>
           
            {splitData.length != 0 && createCards()}
           
          </div>
        </Col>
      </Row>
      {isFormOpen && (
        <Row>
          <Col sm='6'>
            <Form onSubmit={handleSubmit(handlePayButtonClick)}>
              <Row>
                <Col md='6' sm='12' className='mb-1'>

                  <InputGroup className="input-group-merge">
                    <Controller
                      id="folio"
                      name="folio"
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          pattern="[0-9]*" title="Only Numbers Allowed"
                          required
                          className={classnames("form-control", {
                            // "is-invalid": data !== null && data.balance === null,
                          })}
                          value={"Folio Number# " + localStorage.getItem('orderID') + "/" + FolioNumber}
                          readOnly
                          style={{ fontWeight: 'bold' }}

                        />
                      )}
                    />
                  </InputGroup>

                </Col>
               
                {reload && (<Col md='6' sm='12' className='mb-1'>
                  <InputGroup className="input-group-merge">
                    <Controller
                      id="balance"
                      name="balance"
                      // defaultValue={Amount}
                      // defaultValue={balanceValue}
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          {...field}
                          value={Amount}
                          pattern="[0-9]*" title="Only Numbers Allowed"
                          required
                          className={classnames("form-control", {
                            // "is-invalid": data !== null && data.balance === null,
                          })}
                          onChange={(e) => {
                            field.onChange(e);
                            console.log(e.target.value)
                            setBalanceValue(e.target.value);
                          }}
                          readOnly={selectedPaymentType && (selectedPaymentType.value === "Post To Room" || selectedPaymentType.value === "BTC")}

                        />
                      )}
                    />
                  </InputGroup>
                </Col>
                )}
                <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">

                    <InputGroup className="input-group-merge">

                      <Controller
                        id="tips"
                        name="tips"
                        control={control}
                        placeholder="tips"
                        render={({ field }) => (
                          <Cleave
                            pattern="[0-9]*" title="Only Numbers Allowed"
                            placeholder="Enter tips"
                            required
                            {...field}
                            onChange={(e) => {
                  // Capture the value and call the handler function
                            const value = e.target.value;
                            field.onChange(value);
                            handleTipsChange(value);
                          }}
                            className={classnames("form-control", {
                              "is-invalid": data !== null && data.pax === null,
                            })}
                          />
                        )}
                      />
                    </InputGroup>
                  </div>
                </Col>

                {/* </Col> */}
                <Col md='6' sm='12' className='mb-1'>
                  <div className='mb-1'>

                    <Controller
                      id='PaymentType'
                      name='PaymentType'
                      control={control}
                      render={({ field }) => (
                        <Select
                          // required
                          isClearable
                          name='PaymentType'
                          className='react-select'
                          options={PaymentOptions}
                          classNamePrefix='PaymentType'
                          theme={selectThemeColors}
                          value={selectedPaymentType}
                         
                          onChange={(selectedOption) => {
                            setSelectedPaymentType(selectedOption);
                            handlePaymentTypeChange(selectedOption);
                          }}
                        // className={classnames("form-control", {
                        //     // 'is-invalid': data !== null && (data.PaymentType === null || !data.PaymentType.length)
                        //   })}
                        />
                      )}
                    />
                  </div>
                </Col>
                {selectedPaymentType?.value === 'Post To Room' && inhouseGuestDetails ? (
                  <>
                    <Modal
                      isOpen={inhouseGuestModal}
                      // toggle={() => setinhouseGuestModal(!inhouseGuestModal)}
                      // className='modal-dialog-centered'
                      className='modal-dialog-centered modal-lg'

                      onCancel={() => setinhouseGuestModal(false)}
                      centered
                      footer={null}
                    >
                      {/* ... Modal content here ... */}
                      {/* <ModalBody style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}> */}
                      {/* Render the in-house guest data here */}
                      <ModalBody style={{ height: '600px' }}>
                        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', paddingLeft: '40px' }}>
                          <Input
                            type="text"
                            placeholder="Search guest or room..."
                            value={searchRoomORGuest}
                            onChange={(e) => setsearchRoomORGuest(e.target.value)}
                            style={{
                              width: '50%',
                              marginRight: '5px',
                            }}
                          />
                          {/* <FaSearch style={{ fontSize: '20px' }} /> */}
                        </div>
                       
                        <div
                          style={{
                            paddingTop: '5px',
                            maxHeight: '450px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            // justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {inhouseGuestDetails
                            .filter((guest) =>
                              guest.name.toLowerCase().includes(searchRoomORGuest.toLowerCase()) ||
                              guest.roomNumber.toString().includes(searchRoomORGuest)
                            )
                            .map((guest, index) => (
                              <div key={index} style={{ width: '23%', padding: '10px', height: '140px', boxSizing: 'border-box' }}>
                                <Button
                                  color="primary"
                                  onClick={() => {
                                    handleGuestSelect(guest);
                                    setinhouseGuestModal(false);
                                  }}
                                  style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', textAlign: 'left' }}
                                >
                                  <div style={{ textAlign: 'center' }}>
                                    <p>{guest.name}</p>
                                    <p>{guest.roomNumber}</p>
                                    {/* Add more guest information as needed */}
                                  </div>
                                </Button>
                              </div>
                            ))}
                        </div>
                      </ModalBody>
                    </Modal>
                    <Col md='8' sm='12' className='mb-1'>

                      <InputGroup className="input-group-merge">
                        <Controller
                          id="inhouseGuest"
                          name="inhouseGuest"
                          control={control}
                          placeholder="inhouseGuest"
                          render={({ field }) => (
                            <Cleave
                              {...field}
                              value={selectedRoomNumber1}
                              // pattern="[0-9]*" title="Only Numbers Allowed"

                              disabled
                              required
                              className={classnames("form-control", {
                                // "is-invalid": data !== null && data.balance === null,
                              })}
                            // value={data['Balance']}
                            />
                          )}
                        />
                      </InputGroup>

                    </Col>
                  </>
                ) : selectedPaymentType?.value === 'Post To Room' ? (
                  // Show an alert and close the modal
                  <>
                    {inhouseGuestModal && (
                      <Modal
                        isOpen={inhouseGuestModal}
                        toggle={() => setinhouseGuestModal(!inhouseGuestModal)}
                        className='modal-dialog-centered'
                        onCancel={() => {
                          setinhouseGuestModal(false);
                          alert('An error occurred while getting guest details.');
                        }}
                        centered
                        footer={null}
                      >
                        <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Guest Details
                          </ModalHeader>
                        </div>
                        <ModalBody style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} >
                          <strong><p>In-house rooms are not available</p></strong>
                        </ModalBody>
                      </Modal>
                    )}
                    <Col md='6' sm='12' className='mb-1'>
                      {/* ... InputGroup and Controller here ... */}
                    </Col>
                  </>
                ) : selectedPaymentType?.value === 'BTC' && btcCompanyDetails ? (

                  <>
                    <Modal
                      isOpen={btcCompanyModal}
                      // toggle={() => setbtcCompanyModal(!btcCompanyModal)}
                      // className='modal-dialog-centered'
                      className='modal-dialog-centered modal-lg'

                      onCancel={() => setbtcCompanyModal(false)}
                      centered
                      footer={null}
                    >
                      {/* ... Modal content here ... */}
                      {/* <ModalBody style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}> */}
                      {/* Render the in-house guest data here */}
                      <ModalBody style={{ height: '600px' }}>
                        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', paddingLeft: '40px' }}>
                          <Input
                            type="text"
                            placeholder="Search Company..."
                            value={searchCompany}
                            onChange={(e) => setsearchCompany(e.target.value)}
                            style={{
                              width: '50%',
                              marginRight: '5px',
                            }}
                          />
                          {/* <FaSearch style={{ fontSize: '20px' }} /> */}
                        </div>
                        <div style={{
                          paddingTop: '5px',
                          maxHeight: '450px',
                          overflowY: 'auto',
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          // justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                         
                          {btcCompanyDetails
                            .filter((company) =>
                              company.accountName.toLowerCase().includes(searchCompany.toLowerCase())
                            )
                            .map((company, index) => (
                              <div key={index} style={{ width: '23%', padding: '10px', height: '140px', boxSizing: 'border-box' }}>
                                <Button
                                  color="primary"
                                  onClick={() => {
                                    handleBTCCompanySelect(company);
                                    setbtcCompanyModal(false);
                                  }}
                                  style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', textAlign: 'left' }}
                                >
                                  <div style={{ textAlign: 'center' }}>
                                    <p>{company.accountName}</p>
                                  </div>
                                </Button>
                              </div>
                            ))}
                        </div>
                      </ModalBody>
                    </Modal>
                    <Col md='6' sm='12' className='mb-1'>

                      <InputGroup className="input-group-merge">
                        <Controller
                          id="btcCompany"
                          name="btcCompany"
                          control={control}
                          placeholder="btcCompany"
                          render={({ field }) => (
                            <Cleave
                              {...field}
                              // value={selectedRoomNumber}
                              value={selectedCompany}
                              // pattern="[0-9]*" title="Only Numbers Allowed"

                              disabled
                              required
                              className={classnames("form-control", {
                                // "is-invalid": data !== null && data.balance === null,
                              })}
                            // value={data['Balance']}
                            />
                          )}
                        />
                      </InputGroup>

                    </Col>
                  </>
                ) : selectedPaymentType?.value === 'BTC' ? (
                  // Show an alert and close the modal
                  <>
                    {btcCompanyModal && (
                      <Modal
                        isOpen={btcCompanyModal}
                        toggle={() => setbtcCompanyModal(!btcCompanyModal)}
                        className='modal-dialog-centered'
                        onCancel={() => {
                          setbtcCompanyModal(false);
                          alert('An error occurred while getting guest details.');
                        }}
                        centered
                        footer={null}
                      >
                        <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Company Details
                          </ModalHeader>
                        </div>
                        <ModalBody style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }} >
                          <strong><p>BTC Company Details are not available</p></strong>
                        </ModalBody>
                      </Modal>
                    )}
                    <Col md='6' sm='12' className='mb-1'>
                      {/* ... InputGroup and Controller here ... */}
                    </Col>
                  </>
                ) : (
                  <Col sm='8' className='mb-1'>
                    <div className='mb-1'>
                      <InputGroup className="input-group-merge">
                        <Controller
                          id="transactionID"
                          name="transactionID"
                          control={control}
                          placeholder="Transaction ID"
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Transaction ID"
                            // className={classnames("form-control", {
                            //   "is-invalid": data !== null && data['Balance'] === null,
                            // })}
                            />
                          )}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                )}
                <Col sm='4'>
                  {/* <Button color='success' size='lg' block onClick={handlePayButtonClick}>
                  PAY
                </Button> */}
                  {Amount == 0.00 ? (

                    <Button color='success' size='lg' disabled style={{ width: '100%' }}>
                      PAID
                    </Button>
                  ) : (
                    <Button color='danger' size='lg' onClick={handlePayButtonClick1} style={{ width: '100%' }}>
                      PAY
                    </Button>
                  )}
                </Col>
                <Col sm='12' style={{ paddingBottom: '20px' }}>
                {recievedPayment.length !== 0 && (
                  <Button color="danger" onClick={handelvoidpayment}>Void Payment</Button>
                )}
              </Col>

              </Row>
            </Form>

          </Col>


          <Col sm='6'>
            <Table className="m-0" responsive>
              <thead>
                <tr>
                  <th style={{ margin: '5px 0', paddingLeft: '30px', fontSize: '14px' }} colSpan={3}>Mode</th>
                  <th style={{ margin: '5px 0', paddingLeft: '30px', fontSize: '14px' }} colSpan={3}>Amount</th>
                  <th style={{ margin: '5px 0', paddingLeft: '30px', fontSize: '14px' }} colSpan={3}>Tips</th>
                  <th style={{ margin: '5px 0', paddingLeft: '30px', fontSize: '14px' }} colSpan={2}>Room/BTC</th>
                  <th style={{ margin: '5px 0', paddingLeft: '30px', fontSize: '14px' }} colSpan={4}>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
               

                {recievedPayment.length !== 0 && (
                  <React.Fragment>
                    {recievedPayment.map((row, index) => (
                      <tr key={index}>
                        <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={3} id={"mode" + index}>{row.paymentType}<br /></td>
                        <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={3} id={"recievedAmt" + index}>{row.RecievedAmt}<br /></td>
                        <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={3} id={"tips" + index}>{row.tips}<br /></td>
                        <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={2} id={"roomNo" + index}>
                          {/* {row.paymentType === 'BTC' ? sessionStorage.getItem('companyid') : row.roomNo} */}
                          {row.roomNo}
                          <br />
                        </td>
                        <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={4} id={"recievedAmt" + index}>{row.TranxDetails}<br /></td>
                      </tr>
                    ))}
                  </React.Fragment>
                )}

              </tbody>


            </Table>

          </Col>
        </Row>

      )}
      {reload && (
        <Modal
          isOpen={paymentInfoModal}
          onCancel={() => setpaymentInfoModal(false)}
          centered
          footer={null}
        >
          <ModalBody className='px-5 pb-2'>
            <div className='text-center mb-2'>
              <h1 className='demo-space-y'><b>Payment Information</b></h1>
              <p>
              You are paying the Amount: <FaRupeeSign />
              <strong>
                {parseFloat(balanceValue).toFixed(2)} + <FaRupeeSign />
                {parseFloat(tipsAmount).toFixed(2)} ={' '}
                {(parseFloat(balanceValue) + parseFloat(tipsAmount)).toFixed(2)}
              </strong>
            </p>


            </div>
           
            <div className="button-container text-center">

              <Button className="me-1" color="primary" type='submit' onClick={handlePayButtonClick}  >
                Yes
              </Button>
              <Button className='bg-transparent' color="danger" onClick={() => setpaymentInfoModal(false)}>
                No
              </Button>

            </div>

          </ModalBody>
        </Modal>
      )}
      <Modal
        isOpen={openInvoice}
        // toggle={() => setopenInvoice(!openInvoice)}
        className='modal-dialog-centered'
        onCancel={() => setopenInvoice(false)}
        centered
        footer={null}
      >

       
        <ModalHeader>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Generate Invoice</span>
        </ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit()}>
                <Row>
                  <Col md='4' sm='12' className='mb-1'>
                    <Label className="form-label" for="tableno">
                      Table Number<span className='text-danger'>*</span>
                    </Label>
                    <InputGroup className="input-group-merge">
                      <Controller
                        id="tableno"
                        name="tableno"
                        control={control}
                        render={({ field }) => (
                          <Cleave
                            {...field}
                            pattern="[0-9]*"
                            title="Only Numbers Allowed"
                            required
                            className={classnames("form-control", {
                              // "is-invalid": data !== null && data.balance === null,
                            })}
                            // value={localStorage.getItem('tableNumber')}
                            value={localStorage.getItem('TableSelected')}
                            readOnly
                            style={{ fontWeight: 'bold' }}
                          />
                        )}
                      />
                    </InputGroup>
                  </Col>

                  <Col md='4' sm='12' className='mb-1'>
                    <Label className="form-label" for="orderNumber">
                      Order Number<span className='text-danger'>*</span>
                    </Label>
                    <InputGroup className="input-group-merge">
                      <Cleave
                        // options={{ numeral: true }}
                        className="form-control"
                        value={localStorage.getItem('orderID')}
                        readOnly
                        style={{ fontWeight: 'bold' }}
                      />
                    </InputGroup>
                  </Col>

                  <Col md='4' sm='12' className='mb-1'>
                    <Label className="form-label" for="balance">
                      Amount Paid<span className='text-danger'>*</span>
                    </Label>
                    <InputGroup className="input-group-merge">
                      <Controller
                        id="balance"
                        name="balance"
                        control={control}
                        placeholder="hotel ID"
                        render={({ field }) => (
                          <Cleave
                            {...field}
                            options={{ numeral: true }}

                            pattern="[0-9]*" title="Only Numbers Allowed"
                            required
                            className={classnames("form-control", {
                              // "is-invalid": data !== null && data.balance === null,
                            })}
                            // value={localStorage.getItem('splitfolioBalace')}
                            value={recievedPay}
                            // value={console.log(localStorage.getItem('recievedPay'))}


                            readOnly
                            style={{ fontWeight: 'bold' }}
                          />
                        )}
                      />
                    </InputGroup>

                  </Col>
                </Row>
                <Row>
                 
                   <Col md="6" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="guestname">
                  Guest Name
                  </Label>
                  <Controller
                    // defaultValue={sessionStorage.getItem('selectedInHGuest')}
                    // defaultValue={sessionStorage.getItem('selectedInHGuest') || ''}
                    defaultValue={sessionStorage.getItem('selectedInHGuest') !== null ? sessionStorage.getItem('selectedInHGuest') : ' '}
                      
                    // defaultValue={selectedGuestInTable}

                    control={control}
                    id="guestname"
                    name="guestname"
                    render={({ field }) => (
                      <Input
                        placeholder="guest name"
                        invalid={errors.emailBasic && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
              <Col md='6' sm='12' className='mb-1'>
                  <div className="mb-1">
                  <Label className="form-label" for="pax">
                  pax
                  </Label>
                  <Controller
                    defaultValue={selectedpaxTable}
                    control={control}
                    id="pax"
                    name="pax"
                    render={({ field }) => (
                      <Input
                        placeholder="Enter pax"
                        invalid={errors.pax && true}
                        {...field}
                      />
                    )}
                  />
                </div>
                  </Col>
                  </Row>
                <Row>
              
                  <Col sm='12' md='6' className='mb-1'>
                    <div className="mb-1">
                      <Label className="form-label" for="gstNo">
                        GST Number
                      </Label>
                      <InputGroup className="input-group-merge">
                        <Controller
                          id="gstNo"
                          name="gstNo"
                          control={control}
                          render={({ field }) => (
                            <Input
                              placeholder="GST NO.."
                              {...field}
                              pattern="[A-Z0-9]*"
                              title="Only capital letters and numbers are allowed"
                              className={classnames("form-control", {
                                'is-invalid': (data !== null && !/^[A-Z0-9]*$/.test(data.gstNo)),
                              })}
                            />
                          )}
                        />
                      </InputGroup>
                      {data !== null && !/^[A-Z0-9]*$/.test(data.gstNo) && (
                        <div className="invalid-feedback">
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col sm='12' md='6' className='mb-1'>
                    <div className="mb-1">
                      <Label className="form-label" for="mobileNo">
                        Mobile Number
                      </Label>
                      <InputGroup className="input-group-merge">

                        <Controller
                          id="mobileNo"
                          name="mobileNo"
                          control={control}
                          render={({ field }) => (
                            <Input
                              // pattern="[0-9]*" title="Only Numbers Allowed"
                              placeholder="986......"
                              {...field}
                              className={classnames("form-control", {
                                // 'is-invalid': data !== null && (data.pickUpLocation === null || !data.pickUpLocation.length)
                              })}
                            />
                          )}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                </Row>
              
                <div align='end' className='buttons'>
                  <Button outline className='me-1' color='secondary' onClick={handleCancelInvForm}>
                    CANCEL
                  </Button>
                  {/* <Button color='primary' className='me-1' onClick={handleInvForm}>
                                SUBMIT
                                </Button> */}
                  <Button
                    color='primary'
                    className='me-1'
                    onClick={handleInvForm}
                    disabled={isButtonClicked} // Disable the button if it has been clicked
                  >
                    {isButtonClicked ? 'Processing...' : 'SUBMIT'}
                  </Button>
                </div>
                
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={showAlert}
        toggle={() => setshowAlert(!showAlert)}
        className='modal-dialog-centered'
        onCancel={() => setshowAlert(false)}
        centered
        footer={null}
      >
        <ModalBody className='px-5 pb-2' toggle={() => setshowAlert(!showAlert)}>
          <div className='text-center mb-2'>
            <h3 className='demo-space-y'><b>Please complete the Payment!!</b></h3>
          </div>

        </ModalBody>
      </Modal>

      <Modal
        isOpen={previewBill}
        // toggle={() => setpreviewBill(!previewBill)}
        size="lg"
        toggle={toggleModal1}
        className='modal-dialog-centered'
        onCancel={() => setpreviewBill(false)}
        centered
        footer={null}
      >
        {/* <ModalHeader toggle={toggleModal1}> */}
        {/* <ModalHeader>
        </ModalHeader> */}
        <ModalBody className='pb-3 px-sm-1 mx-20 '  >
          <div>
            <Card className='invoice-preview-card'>
              <CardHeader className="text-center d-flex justify-content-center">
                <CardTitle tag="h2"><b>Information Invoice</b></CardTitle>
              </CardHeader>
              <CardBody className='invoice-padding pb-0'>
                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                  <div>
                    {/* <div className='logo-wrapper'>
                      <img src={logo} alt="Logo" />
                    </div> */}
                    <div style={{paddingTop:'5px'}}>
                   <img style={{width: '80px',   height: '80px',   display: 'block',   marginBottom: '20px' }} src={API_URL+`/imagepaths/${logoimage}`} alt="Hotel Logo" onError={(e) => {   console.log('Error loading image:', e); }}/>
                  </div>
                    <h6 className='mb-25'>Guest Name : {previewBillData['guestName']}</h6>
                    {/* <h6 className='mb-25'>Room Number:506 </h6> */}
                    <h6 className='mb-0'>Pax : {previewBillData['pax']} </h6>
                  </div>
                  <div className='mt-md-1 mt-3'>
                    <h4>Outlet Name: <span>{localStorage.getItem('RestaurantSelected')}</span></h4>
                    {/* <h6 className='invoice-number'>FSSAI No: 10018043002066</h6> */}
                    <h6 className='invoice-number'>FSSAI No: {FSSAINumber}</h6>

                    <h6>Table Number:{localStorage.getItem('TableSelected')}</h6>
                    <h6>User : {previewBillData['stewardName']}</h6>

                  </div>
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
                  {previewBillData.length != 0 && previewBillData['items'].map((row, index) => (

                    <tr className='border-bottom'>
                      <td className='py-1'>
                        <p className='card-text fw-bold mb-25' id={"itemID" + index}> {row.itemName}</p>
                      </td>
                      <td className='py-1'>
                        <span className='fw-bold'>{row.qty}</span>
                      </td>
                      <td className='py-1'>
                        <span className='fw-bold'>{(row.Price).toFixed(2)}</span>
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
                      {previewBillData.classDiscDisplay &&
                        <>
                          {previewBillData.classDiscDisplay.map((item, index) => (
                            <div key={index} className='invoice-total-item'>
                              <p className='invoice-total-title'><strong>{item.item.toUpperCase()} : {item.value}</strong></p>
                              {/* <p className='invoice-total-title'>{item.value}</p>/ */}
                            </div>
                          ))}
                        </>
                      }

                      <div className='invoice-total-item'>
                        <p className='invoice-total-title'><strong>AMOUNT : {previewBillData.total}</strong></p>
                        {/* <p className='invoice-total-title'>{item.value}</p> */}
                      </div>

                      {/* <hr className='my-50' /> */}
                      <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>
                    </div>
                  </Col>
                </Row>

              </CardBody>
              {/* /Total & Sales Person */}

              {/* <hr className='invoice-spacing' /> */}
              <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>

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
                      <p>{hotelName}</p>
                      <p>{firmdata}</p>
                      <p>{hotelAddress} {postalcodedata}</p>
                      <p>T: +{hotelNo} F: +{faxdata} W: {websitedata}</p>
                    </span>
                  </Col>
                </Row>
              </CardBody>
              {/* /Invoice Note */}
            </Card>
          </div>
          <div className='d-flex'>
            <Button color='secondary' tag={Link} to='/apps/PrintSplitPreview' target='_blank' block outline className='me-1' >
              Print
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* {console.log(finalInvBillinfo)} */}
      <Modal
        isOpen={finalInvBill}
        size="lg"
        // toggle={toggleModal2}
        className='modal-dialog-centered'
        onCancel={() => setfinalInvBill(false)}
        centered
        footer={null}
      >
        {/* <ModalHeader toggle={toggleModal2}> */}
        <ModalHeader>
        </ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20 '  >
        </ModalBody>
        <Card className='invoice-preview-card'>
          <CardBody className='invoice-padding pb-0'>
            <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
              <div>
                {/* <div className='logo-wrapper'>
                  <img src={logo} alt="Logo" />
                </div> */}
                <div style={{paddingTop:'5px'}}>
                   {/* <img style={{   width: '80px',   height: '80px',   display: 'block',   marginBottom: '20px' }} src={`https://testpms.ms-tech.in/v8/pms-backend-prod/imagepaths/${logoimage}`} alt="Hotel Logo" onError={(e) => {   console.log('Error loading image:', e); }}/> */}
                   <img style={{width: '80px',   height: '80px',   display: 'block',   marginBottom: '20px' }} src={API_URL+`/imagepaths/${logoimage}`} alt="Hotel Logo" onError={(e) => {   console.log('Error loading image:', e); }}/>
                </div>
                {/* {console.log(finalInvBillinfo['guestName'])} */}

                {/* <h6 className='mb-25'>Guest Name : {finalInvBillinfo['guestName']} </h6> */}
                <h6 className='mb-25'>Guest Name : {finalInvBillinfo ? finalInvBillinfo['guestName'] : ' '} </h6>

                {/* <h6 className='mb-25'>Guest Name: {finalInvBillinfo['guestName'] ? finalInvBillinfo['guestName'] : sessionStorage.getItem('selectedInHGuest')}</h6> */}


                <h6 className='mb-25'>Room Number:{finalInvBillinfo ? finalInvBillinfo['roomNo'] : ' '} </h6>
                {/* <h6 className='mb-25'>Room Number: {finalInvBillinfo['roomNo'] ? finalInvBillinfo['roomNo'] : sessionStorage.getItem('selectedIHRoomNo')}</h6> */}

                {/* <h6 className='mb-0'>Pax :  </h6> */}
                <h6 className='mb-0'>Pax : {finalInvBillinfo['pax']} </h6>

              </div>
              <div className='mt-md-1 mt-3'>
                <h4>Outlet Name: <span>{localStorage.getItem('RestaurantSelected')}</span></h4>
                <h4>Bill Number:{finalInvBillinfo['billNoDisplay']}</h4>

                {/* <strong><p className='invoice-date-title'> {`Date: ${format(new Date(data['billDateTime']), 'dd-MMM-yy')}  Time: ${format(new Date(data['billDateTime']), 'HH:mm')}`}</p> </strong> */}
                {/* <strong><p className='invoice-date-title'> {`Date: ${format(new Date(data['billDateTime']), 'dd-MMM-yy')}  Time: ${format(new Date(data['billDateTime']), 'HH:mm')}`}</p> </strong> */}

                <h6 className='invoice-number'>FSSAI No: {FSSAINumber}</h6>
                <h6>Table Number:{localStorage.getItem('TableSelected')}</h6>
                <h6>User : {finalInvBillinfo['stewardName']}</h6>



              </div>
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
              {finalInvBillinfo.length != 0 && finalInvBillinfo['items'].map((row, index) => (

                <tr className='border-bottom'>
                  <td className='py-1'>
                    <p className='card-text fw-bold mb-25' id={"itemID" + index}> {row.itemName}</p>
                  </td>
                  <td className='py-1'>
                    <span className='fw-bold'>{row.qty}</span>
                  </td>
                  <td className='py-1'>
                    <span className='fw-bold'>{(row.Price).toFixed(2)}</span>
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
                  {finalInvBillinfo.classDiscDisplay &&
                    <>
                      {finalInvBillinfo.classDiscDisplay.map((item, index) => (
                        <div key={index} className='invoice-total-item'>
                          <p className='invoice-total-title'><strong>{item.item.toUpperCase()} : {item.value}</strong></p>
                        </div>
                      ))}
                    </>
                  }
                  {finalInvBillinfo.Round != 0 && <div className='invoice-total-item'>
                    <p className='invoice-total-title'><strong>ROUND OFF : {parseFloat(finalInvBillinfo.Round).toFixed(2)}</strong></p>
                  </div>
                  }

                  {/* <hr className='my-50' /> */}
                  <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>
                  <div className='invoice-total-item'>
                    {/* <p className='invoice-total-title'><strong>TOTAL : {(parseFloat(finalInvBillinfo.total)).toFixed(2)}</strong></p> */}
                  </div>
                </div>
              </Col>
            </Row>
            <h5>Check Closed </h5>
            <div className='mt-md-1 mt-3'>
              {finalInvBillinfo.paymentDetails &&
                <>
                 
                  <h5>
                    Payment Mode: {finalInvBillinfo.paymentDetails.map((row, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && ', '}
                        {row.paymentMode}
                      </React.Fragment>
                    ))}
                  </h5>

                  {finalInvBillinfo.paymentDetails.some((row) => row.paymentMode === 'BTC') && (
                    <h5>
                      Company Name: {finalInvBillinfo.BTCcompany}
                    </h5>
                  )}
                </>
              }

            </div>
          </CardBody>


          {/* <hr className='invoice-spacing' /> */}
          <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>

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
          <CardBody className='invoice-padding pb-0'>

            <div className='d-flex justify-content-center mt-3'>
              <Button color='primary' size='lg' onClick={handleFinishOrder} style={{ position: 'absolute', left: '35%', top: '95%', transform: 'translateY(-40%)', width: '200px' }} >
                Finish
              </Button>
              {/* <Button color="light" style={{ position: 'absolute', left: '60%', top: '50%', transform: 'translateY(-50%)', width: '200px' }} onClick={handleInvoiceClick}>
                Invoice
              </Button> */}
            </div>
          </CardBody>

        </Card>

      </Modal>
      <Modal isOpen={isOrderPopup} toggle={() => setIsOrderPopup(false)} className="modal-dialog-centered" style={{ width: '25%' }}>
        <ModalHeader toggle={() => setIsOrderPopup(false)}></ModalHeader>
        <ModalBody style={{ height: '35vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '25px', fontWeight: 'bold' }}>Order Completed</h3>
            <p style={{ fontSize: '15px', fontWeight: 'bold' }}>Order Completed Successfully!!</p>
          </div>
        </ModalBody>
        <ModalFooter style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0' }}>


          <Row>
            <Button color="primary" size="lg" style={{ width: '150px', height: '50px' }} onClick={handleClose}>Close</Button>
          </Row>
        </ModalFooter>
      </Modal>

      <Modal isOpen={discountModal} toggle={toggleModal} style={{ maxWidth: '650px' }}>
        <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
          {/* <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} toggle={toggleModal}>
            Discount Order
          </ModalHeader> */}
          <ModalHeader>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}> Discount Order</span>
          </ModalHeader>
        </div>
        <CardText className='mb-25' style={{ color: 'black', fontSize: '15px' }}>
          <Container style={{ marginBottom: '20px' }}>
            <Row className="justify-content-between">
              <Col md='2' sm='12' className='text-center'>

                {/* <Button className="align-items-center"  */}
                <Button className="align-items-center" onClick={handleAMTClick}
                  id="Amount"
                  name="Amount">
                  <GrStar style={{ color: 'black', fontSize: '25px' }} />
                  Amount
                </Button>
              </Col>
              <Col md='3' sm='12' className='text-center'>
                {/* <Button className="align-items-center" */}
                <Button className="align-items-center" onClick={handlePercentageClick}
                  id="Percentage"
                  name="Percentage">
                  <GrStar style={{ color: 'black', fontSize: '25px' }} />
                  Percentage
                </Button>
              </Col>
              <Col md='3' sm='12' className='text-center'>
                {/* <Button className="align-items-center"> */}
                <Button className="align-items-center" onClick={handleClassification}>


                  <GrStar style={{ color: 'black', fontSize: '25px' }} />
                  Classification
                </Button>
              </Col>
              <Col md='2' sm='12' className='text-center'>

                {/* <Button className="align-items-center" > */}
                {/* <Button className="align-items-center" onClick={handlecouponClick}> */}
                <Button className="align-items-center">

                  <GrStar style={{ color: 'black', fontSize: '25px' }} />
                  Coupon
                </Button>
              </Col>

              {/* <Col md='2' sm='12' className='text-center' > */}
              {/* <Col md='2' sm='12' className='text-center' onClick={handleItemDiscClick}> */}
              <Col md='2' sm='12' className='text-center'>


                <Button className="align-items-center">
                  <GrStar style={{ color: 'black', fontSize: '25px' }} />
                  <br />
                  Item
                </Button>
              </Col>
            </Row>
          </Container>
        </CardText>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmitDisc)}>
            {/* <form> */}

            <Row>
              <Col sm='12' md='12' className='mb-1'>
                <div className="mb-1">
                  <InputGroup className="input-group-merge">
                    {(isAmountActive || isCouponActive || isItemDisActive) && (
                      <Controller
                        id="amt"
                        name="amount"
                        control={control}
                        render={({ field }) => (
                          <Input
                            required
                            placeholder="Enter the value"
                            {...field}
                            className="form-control"
                          />
                        )}
                      />
                    )}
                    {isPercentageActive && (
                      <Controller
                        id="percentage"
                        name="percentage"
                        control={control}
                        render={({ field }) => (
                          <Input
                            required
                            placeholder="Enter the Percentage"
                            {...field}
                            className="form-control"
                          />
                        )}
                      />
                    )}


                  </InputGroup>
                </div>
              </Col>
            </Row>
            {isClassificationActive && (
              <Row>
                <Col sm='2' md='2' className='mb-1' l>
                  <InputGroup className="input-group-merge">
                    <Controller
                      id="Food"
                      name="Food"
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          pattern="[0-9]*" title="Only Numbers Allowed"
                          placeholder="Food%"
                          {...field}
                          className={classnames("form-control", {
                            // "is-invalid":
                            //     data !== null && (data.noOfPeople === null || !data.noOfPeople.length)
                          })}
                        />
                      )}
                    />
                  </InputGroup>
                </Col>
                <Col sm='2' md='3' className='mb-1' l>
                  <InputGroup className="input-group-merge">
                    <Controller
                      id="SoftDrinks"
                      name="SoftDrinks"
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          pattern="[0-9]*" title="Only Numbers Allowed"
                          placeholder="SoftDrink%"
                          {...field}
                          className={classnames("form-control", {
                            // "is-invalid":
                            //     data !== null && (data.noOfPeople === null || !data.noOfPeople.length)
                          })}
                        />
                      )}
                    />
                  </InputGroup>
                </Col>
                <Col sm='2' md='2' className='mb-1' l>
                  <InputGroup className="input-group-merge">
                    <Controller
                      id="Liquor"
                      name="Liquor"
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          pattern="[0-9]*" title="Only Numbers Allowed"
                          placeholder="Liquor%"
                          {...field}
                          className={classnames("form-control", {
                            // "is-invalid":
                            //     data !== null && (data.noOfPeople === null || !data.noOfPeople.length)
                          })}
                        />
                      )}
                    />
                  </InputGroup>
                </Col>
                <Col sm='2' md='2' className='mb-1' l>
                  <InputGroup className="input-group-merge">
                    <Controller
                      id="Smokes"
                      name="Smokes"
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          pattern="[0-9]*" title="Only Numbers Allowed"
                          placeholder="Smokes%"
                          {...field}
                          className={classnames("form-control", {
                            // "is-invalid":
                            //     data !== null && (data.noOfPeople === null || !data.noOfPeople.length)
                          })}
                        />
                      )}
                    />
                  </InputGroup>
                </Col>
                <Col sm='2' md='2' className='mb-1' l>
                  <InputGroup className="input-group-merge">
                    <Controller
                      id="Others"
                      name="Others"
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          pattern="[0-9]*" title="Only Numbers Allowed"
                          placeholder="Others%"
                          {...field}
                          className={classnames("form-control", {
                            // "is-invalid":
                            //     data !== null && (data.noOfPeople === null || !data.noOfPeople.length)
                          })}
                        />
                      )}
                    />
                  </InputGroup>
                </Col>
              </Row>
            )}
            <Row>
              <Col md='12' sm='12' className='mb-1'>
                <InputGroup className="input-group-merge">
                  <Controller
                    id="DiscReason"
                    name="DiscReason"
                    control={control}
                    render={({ field }) => (
                      <Cleave
                        pattern="[aA-zZ]*" title="Only Alphabets Allowed"
                        placeholder="Enter Reason For Discount"

                        {...field}
                        required
                        className={classnames("form-control", {
                          "is-invalid": data !== null && data.guestName === null,
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </Col>
            </Row>

            {/* <Col md='12' sm='12' className='text-center'>
              <Button type="submit" className="me-1" color="warning" style={{ width: "100%" }}>
                Submit
              </Button>
            </Col> */}
            {/* <Row>
            <Col md='6' sm='12' className='text-center'> 
                    <Button  style={{ align: 'right', 'margin-right': '10px', 'margin-bottom': '10px',width:'98%' }} className='me-1' onClick={() => { setdiscountModal(!discountModal) }}  >CANCEL</Button>                   
            </Col>
            <Col>
            <Button type="submit" className="me-1" color="primary" style={{ align: 'left', 'margin-right': '10px', 'margin-bottom': '10px',width:'99%' }}>
                Submit
              </Button>
            </Col>
          </Row> */}
            <div align='end' className='buttons'>
              <Button outline className='me-1' color='secondary' onClick={() => { setdiscountModal(!discountModal) }}>
                CANCEL
              </Button>
              <Button color='primary' className='me-1' type="submit">
                SUBMIT
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <Modal isOpen={discountModal1}
        // toggle={() => setdiscountModal1(false)} 
        className="modal-dialog-centered" style={{ width: '20%' }}>
        <ModalHeader toggle={() => setdiscountModal(false)}></ModalHeader>
        <ModalBody style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
              <FaRupeeSign style={{ fontSize: '20px' }} />
              {/* <strong>{totalDiscount}</strong> */}
            </p>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Discount applied successfully!!</p>
          </div>
        </ModalBody>
        <ModalFooter style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0' }}>
          <Button color="warning" size="lg" style={{ width: '300px', height: '50px' }} onClick={() => { setdiscountModal1(false); handleSubmit(onSubmitDisc) }}>Close</Button>
        </ModalFooter>
      </Modal>

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

      <Modal
        isOpen={voidpaymentModal}
        toggle={() => setvoidpaymentModal(false)}
        className='modal-dialog-centered'
        onCancel={() => setvoidpaymentModal(false)}
        centered
        footer={null}
      >
        <ModalHeader>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Void Payment!!!</span>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(handleOnSubMitvoidpayment)}>
            <Col sm='12' className='mb-1' >
              <div className="mb-1">
                <InputGroup className="input-group-merge">
                  <Controller
                    id='reason'
                    name='reason'
                    control={control}
                    rules={{ required: 'Reason is Required' }}
                    render={({ field }) => (
                      <Input
                        type='text' // Changed from 'type="type"'
                        required
                        placeholder='Give Reason for void KOT'
                        style={{ width: '90%', height: '100px', margin: '0 auto' }}
                        {...field}
                      />
                    )}
                  />
                </InputGroup>
                {errors.reason && <span className='text-danger'>Reason is required</span>}
              </div>
            </Col>

            <div align='end' className='buttons'>
              <Button outline className='me-1' color='secondary' onClick={handleCancelVoidBillClick}>
                CANCEL
              </Button>
              <Button color='primary' className='me-1' type="submit">
                SUBMIT
              </Button>
            </div>
          </Form>
        </ModalBody>
        {/* </div> */}

      </Modal>


    </>
  )

}

export default SplitPayment