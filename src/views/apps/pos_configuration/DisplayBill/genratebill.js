// ** Reactstrap Imports
import InputNumber from 'rc-input-number'
import { Link } from 'react-router-dom'

import API_URL from "../../../../config";
import { Card, CardBody,CardHeader, CardTitle,CardText, Label, InputGroup, Input, Row, Container, Col, Table, Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, InputGroupText } from 'reactstrap';
import Cleave from "cleave.js/react";
import classnames from "classnames";
import { format } from "date-fns";
import { useEffect, useState } from 'react';
import logo from '@src/assets/images/logo/oterra.jpg';
import { useForm, Controller } from "react-hook-form";
import React, { Component } from 'react';
import { selectThemeColors } from "@utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Avatar from "@components/avatar";

// import { AiOutlineVerticalAlignBottom } from "react-icons/ai";
import Select from "react-select";
import { fontSize } from '@mui/system';
// import { RiVisualStudioLine } from 'react-icons';
import { HiStar } from "react-icons/hi";
import { FaChartPie } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { LuLayoutList } from "react-icons/lu";
import { GrStar } from "react-icons/gr";
import { FaRupeeSign } from "react-icons/fa";
// import { VscPreview } from "react-icons/fa";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress'

import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'


import DisplayBill from './dummy.js'
const PreviewPayment = ({ data, print }) => {

  let invBalance2 = data['total']
  let totalDiscount1 = data['TotalDiscount']
  let finalBalanceAmt1 = data['Balance']

  let selectedpaxTable = data.pax

  const itemsCount = data.items.length;
  const [invBalance1, setinvBalance1] = useState(invBalance2)
  const [totalDiscount, settotalDiscount] = useState(totalDiscount1)
  const [finalBalanceAmt, setfinalBalanceAmt] = useState(finalBalanceAmt1)




  let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [recievedPayment, setrecievedPayment] = useState([]);
  const [showBreakCourse, setShowBreakCourse] = useState(false);
  const [inhouseGuestOptions, setInhouseGuestOptions] = useState([]);
  const [btcCompanyOptions, setbtcCompanyOptions] = useState([])
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  
  const [paymentInfoModal, setpaymentInfoModal] = useState(false)
  const [openInvoice, setopenInvoice] = useState(false)
  const [discountModal, setdiscountModal] = useState(false)
  const [isAmountActive, setIsAmountActive] = useState(true);
  const [isPercentageActive, setIsPercentageActive] = useState(false);
  const [isClassificationActive, setisClassificationActive] = useState(false)
  const [isCouponActive, setisCouponActive] = useState(false)
  const [isItemDisActive, setisItemDisActive] = useState(false)
  const [inhouseGuestDetails, setinhouseGuestDetails] = useState([])
  const [btcCompanyDetails, setbtcCompanyDetails] = useState([])

  const [inhouseGuestModal, setinhouseGuestModal] = useState(false)
  const [btcCompanyModal, setbtcCompanyModal] = useState(false)

  const [selectedRoomNumber, setselectedRoomNumber] = useState([])
  const [selectedRoomNumber1, setselectedRoomNumber1] = useState([])

  const [selectedCompany, setselectedCompany] = useState([])

  const [selectedGuest, setSelectedGuest] = useState([])
  const [selectedbtcCompany, setselectedbtcCompany] = useState([])

  const [discountModal1, setdiscountModal1] = useState(false)
  const [openPreviewBill, setopenPreviewBill] = useState(false)
  const [balanceValue, setBalanceValue] = useState(data['Balance']);
  const [showAlert, setshowAlert] = useState(false);
  const MySwal = withReactContent(Swal)
  const [searchRoomORGuest, setsearchRoomORGuest] = useState('');
  const [searchCompany, setsearchCompany] = useState('');
  const [reload, setreload] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  // const [selectedIHGuest, setSelectedIHGuest] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSecondaryMessage, setShowSecondaryMessage] = useState(false);
  const [PaymentOptions, setPaymentOptions] = useState([]);
  // const [tipsAmount, setTipsAmount] = useState(0);
  const [tipsAmount, setTipsAmount] = useState(0);
  const [tipstotalAmount, settipstotalAmount] = useState(0)
  const [roomDiscount, setRoomDiscount] = useState(false);
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
  const [voidpaymentModal, setvoidpaymentModal] = useState(false)








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
            console.error("Error fetching data:", error);
        });
}, [])

  if (tableData.length != 0) {
    const tableDataString = JSON.stringify(tableData);
    localStorage.setItem("tableData", tableDataString);

  }

  const defaultValues = {
    balance: data['Balance'],
    PaymentType: null,
    tableno: localStorage.getItem('tableNumber'),
    orderNumber: localStorage.getItem('orderID'),
    guestname: "",
    gstNo: "",
    mobileNo: " ",

  };
  // if(selectedPaymentType.value ==='Cash'){
  //   sessionStorage.removeItem('selectedInHGuest');
  // }
  const handlePaymentTypeChange = (selectedOption) => {
    if (data['Balance'] != 0.00) {
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

   
    console.log(data['Balance'])
    if (selectedOption.value === "Post To Room" && data['Balance'] != 0.00) {
      setRoomDiscount(true)
      console.log(roomDiscount)
      // console.log("in post to room")
      setinhouseGuestModal(true)
        setsearchRoomORGuest('')
        setselectedRoomNumber('')
    }

    // else {
    //   sessionStorage.removeItem('selectedInHGuest');
    // }
    if (selectedOption.value === 'BTC' && data['Balance'] != 0.00) {
      setbtcCompanyModal(true)
      setsearchCompany('')
      setselectedCompany('')
    }
    if (selectedOption.value !== 'Post To Room') {
      console.log(roomDiscount)
      console.log("Not post to room")
      // sessionStorage.removeItem('selectedInHGuest')

      if(roomDiscount) {
        console.log(roomDiscount)
      const removeDiscount = JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
        "FolioNo": 0,
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
          if (result['statuscode'] == 200) {

            const billfetch = JSON.stringify({
              "hotelID": 1,
              "storeID": localStorage.getItem('storeID'),
              "orderID": localStorage.getItem('orderID'),
              "tableNo": localStorage.getItem('TableSelected'),
              "discID": 0,
              // "billType":'DummyInvoice',
              // "paymentType":'Cash',
              // "FolioNo":0
            })
            fetchx(API_URL + '/getOrderDetails', {
              method: 'POST',
              body: billfetch,
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then((res) => res.json())
              .then((post) => {
                if (post.statuscode === 200) {
                  // console.log(post['data'])
                  setinvBalance1(post['data']['total'])
                  settotalDiscount(post['data']['TotalDiscount'])
                  setfinalBalanceAmt(post['data']['Balance'])
                  let selectedGuestInTable = post.data.guestName;
                  console.log("selectedGuestInTable",selectedGuestInTable)
                  sessionStorage.setItem('selectedInHGuest', selectedGuestInTable)
                }

              })
              .catch((err) => {
                console.log(err.message);
              });

          }

        })
        .catch(error => {
          // Handle any errors that occur during the API call
          // console.error('API error:', error);
        });
      }

      const billfetch = JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
        "discID": 0,
        // "billType":'DummyInvoice',
        // "paymentType":'Cash',
        // "FolioNo":0
      })
      fetchx(API_URL + '/getOrderDetails', {
        method: 'POST',
        body: billfetch,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((post) => {
          if (post.statuscode === 200) {
            setinvBalance1(post['data']['total'])
            settotalDiscount(post['data']['TotalDiscount'])
            // setfinalBalanceAmt(post['data']['Balance'])
            const selectedGuestInTable = post.data.guestName;
            sessionStorage.setItem('selectedInHGuest', selectedGuestInTable)
          }

        })
        .catch((err) => {
          console.log(err.message);
        });

    }

  };

  const handlePayButtonClick = () => {
    let paymentType = selectedPaymentType.value
    let paymentData = {};
    let paymentData1 = " ";
    let inhouseRoomNo = " ";
    if (paymentType === 'Post To Room') {
      // paymentData = paymentType.replace(`"paymentType":"${paymentType}"`, '"paymentType":"guest"');
      paymentData1 = "Guest";
      inhouseRoomNo = selectedRoomNumber

    }
    else if (paymentType === 'BTC') {
      // paymentData = paymentType.replace(`"paymentType":"${paymentType}"`, '"paymentType":"guest"');
      paymentData1 = "BTC";
      inhouseRoomNo = selectedbtcCompany.companyid
      sessionStorage.setItem('companyid', inhouseRoomNo)
    }
    else {
      paymentData1 = selectedPaymentType.value;

    }
    handleSubmit((data1) => {

      // console.log(data1)
      const invBalance = data['Balance'];
      let balError = false
      if (balanceValue < 0) {
        balError = true
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
      // console.log("balanceValue===" + balanceValue)
      // console.log("invBalance===" + invBalance)
      if (parseFloat(balanceValue) > parseFloat(invBalance)) {
        balError = true
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

      if (!balError) {
        paymentData = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "orderID": localStorage.getItem('orderID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "actualAmt": data['Balance'],
          "recievedAmt": finalBalanceAmt,
          "paymentType": paymentData1,
          "FolioNo": data['FolioNo'],
          // TranxDetails: paymentType === 'Link to Room' ? undefined : data1.transactionID,
          // roomNo: paymentType === 'Link to Room' ? inhouseRoomNo : undefined,
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
        .then((post) => {
          if (post.statusCode == 403 || post.statuscode == 403) {
            const swalInstance = MySwal.fire({
              text: post.message,
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
          else {
            setTimeout(() => { navigate('/apps/posconfiguration/DisplayBill') }, 100);
          }


        })
    })();

  }
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

  const handleInvoiceClick = () => {
    const invBalance = data['Balance'];
    if (invBalance == 0.00) {
      setopenInvoice(true)
    } else {
      return MySwal.fire({
        title: 'Please Complete the Payment!!',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      })
    }
  };

  useEffect(() => {
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
        // console.log(data)
        setInhouseGuestOptions(data)

      })
    setTableData(data['items'])


    fetchx(API_URL + '/getAllTransactions?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected') + '&FolioNo=' + data['FolioNo'])
      .then(result => result.json())
      .then((resp) => {
        // console.log(resp['data']);



        setrecievedPayment(resp['data'])
      });

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
  if (data != '') {
  }
  function handleCancelInvForm() {
    setopenInvoice(false)
  }
  function openInvoiceForm() {
    setopenInvoice(true)
  }
  const handleInvForm = () => {
    if (!isButtonClicked) {
      setOpen(true)
      const timeout = setTimeout(() => {
        setShowSecondaryMessage(true);
      }, 5000);

      setIsButtonClicked(true);
      handleSubmit((formData) => {
        const invbill = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "orderID": localStorage.getItem('orderID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "FolioNo": 0,
          "guestName": formData["emailBasic"],
          "guestCompanyGSTno": formData["gstNo"],
          "mobileNo": formData["mobileNo"],
          "pax": formData['pax']
        })

        setTimeout(() => {
          fetchx(API_URL + '/generateBill', {
            method: 'POST',
            body: invbill,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((res) => res.json())
            .then((post) => {
              // console.log(post)
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
                    if (resp.statuscode === 200) {

                      setTimeout(() => { navigate('/apps/POSconfiguration/Invoice') }, 2000)
                      setOpen(false);
                      setShowSecondaryMessage(false)
                    }

                  })
                  .catch((err) => {
                  });


              }
            })
            .catch((err) => {
            });
        }, 1000)
      })();
    }
  }
  const handleAMTClick = () => {
    setIsAmountActive(true);
    setIsPercentageActive(false);
    setisCouponActive(false)
    setisItemDisActive(false)
    setisClassificationActive(false)
  }
  const handlePercentageClick = () => {
    setIsAmountActive(false);
    setIsPercentageActive(true);
    setisCouponActive(false)
    setisItemDisActive(false)
    setisClassificationActive(false)
    // console.log("Hello----------------------")
  }
 
  const handleClassification = () => {
    setIsAmountActive(false);
    setIsPercentageActive(false);
    setisCouponActive(false)
    setisItemDisActive(false)
    setisClassificationActive(true)
  }

  const onSubmitDisc = (data) => {

    let balError = false
    // console.log(data)
    // console.log("=======================data=======================================")
    let discData = {};

    if (isPercentageActive) {
      const discType = "Percentage";
      const percentage = data.percentage;
      // console.log(percentage)
      if (parseFloat(percentage) >= 100) {
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
      // console.log('Percentage:', percentage);
      if (!balError) {
        discData = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "orderID": localStorage.getItem('orderID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "discType": discType,
          "description": JSON.stringify({ 'Percentage': percentage }),
          "valueFormat": discType,
          "FolioNo": 0,
        });
      }
      // console.log(discData)
    }

    if (isAmountActive) {
      // console.log(balanceValue)
      const discType = "Amount";
      const amount = data.amount;
      // console.log(amount)
      if (parseFloat(data.amount) >= parseFloat(balanceValue)) {
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
          "FolioNo": 0,
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
          "FolioNo": 0,
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
          setdiscountModal(false)
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
              navigate('/apps/posconfiguration/DisplayBill');
            }
          });
          
        }

      })
      .catch(error => {
        // Handle any errors that occur during the API call
        // console.error('API error:', error);
      });
  }

  const handleGuestSelect = (guest) => {
setRoomDiscount(true)
   

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
    const billfetch = JSON.stringify({
      "hotelID": 1,
      "storeID": localStorage.getItem('storeID'),
      "orderID": localStorage.getItem('orderID'),
      "tableNo": localStorage.getItem('TableSelected'),
      "FolioNo": 0,
      "roomNo": guest.reservationID

    })
    fetchx(API_URL + '/applyRoomDiscountPOS', {
      method: 'POST',
      body: billfetch,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        if (post.statuscode === 200) {
          // console.log(post)
          const billfetchDicount = JSON.stringify({
            "hotelID": 1,
            "storeID": localStorage.getItem('storeID'),
            "orderID": localStorage.getItem('orderID'),
            "tableNo": localStorage.getItem('TableSelected'),
            // "discID":0,
            // "billType":'DummyInvoice',
            // "paymentType":'Cash',
            // "FolioNo":0
          })
          fetchx(API_URL + '/getOrderDetails', {
            method: 'POST',
            body: billfetchDicount,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((res) => res.json())
            .then((post) => {
              if (post['statuscode'] == 200) {
                // console.log(post['data']['total'])
                let invBalancewithDisc = (post['data']['total'])
                let totalDiscountwithDisc = (post['data']['TotalDiscount'])
                let finalBalanceAmtwithDisc = (post['data']['Balance'])
                setinvBalance1(invBalancewithDisc)
                settotalDiscount(totalDiscountwithDisc)
                setfinalBalanceAmt(finalBalanceAmtwithDisc)


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
  const toggleModal = () => {
    setdiscountModal(!discountModal);
  };
  const toggleModal1 = () => {
    setopenPreviewBill(!openPreviewBill)
  }
  const handlePreview = (data) => {
    setopenPreviewBill(true)
  }
  const handleSplit = () => {
    // if (data['Balance'] == 0.00 ) {
    if (data['Balance'] == 0.00 || data['Balance'] < invBalance1) {
      const swalInstance = MySwal.fire({
        text: "Payment Initiated,you can not split bill!",
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
      swalInstance.then((result) => {
        if (result.isConfirmed) {
          navigate('/apps/posconfiguration/DisplayBill');
        }
      });
      // console.log("Balance zero")
    }
    else {

      navigate('/apps/posconfiguration/Split')
    }
  }
  const handleChange = (e) => {
    setfinalBalanceAmt(e.target.value);
  };

  const handleTipsChange = (value) => {
    const parsedtips1 = parseFloat(value).toFixed(2);
    const isValidNumber = !isNaN(parsedtips1) && isFinite(parsedtips1);
    setTipsAmount(isValidNumber ? parsedtips1 : 0);
    // calculateTaxAmount(value, balanceValue);
    // setTipsAmount(parsedtips1);
  };
  const handelvoidpayment = () => {
    setvoidpaymentModal(true)
  }
  const handleOnSubMitvoidpayment = (data) => {
    fetchx(API_URL + '/voidPOSPayment', {
      method: 'PUT',
      body: JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "FolioNo": 0,
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



  const handleBackButtonClick = () => {
    const removeDiscountonBack = JSON.stringify({
      "hotelID": 1,
      "storeID": localStorage.getItem('storeID'),
      "orderID": localStorage.getItem('orderID'),
      "tableNo": localStorage.getItem('TableSelected'),
      "FolioNo": 0,
    });
    fetchx(API_URL + '/revokePOSDiscounts', {
      method: 'POST',
      body: removeDiscountonBack,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        if (post.statuscode === 200) {
          navigate('/apps/posconfiguration/addorder')
        }

      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({ defaultValues });
  return typeof (data) != 'undefined' ? (
    <>
     
      {data['Balance'] === 0.00 || data['Balance'] < invBalance1 ? (
        <Button.Ripple
          color="primary"
          outline
          size="sm"
          style={{ marginBottom: '10px' }}
          onClick={() => {
            const swalInstance = MySwal.fire({
              text: "Payment Initiated,you can not go back!",
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
          }}
        >
          Back
        </Button.Ripple>
      ) : (
        <Button.Ripple
          color="primary"
          outline
          size="sm"
          style={{ marginBottom: '10px' }}

          // onClick={() => navigate('/apps/posconfiguration/addorder')}
          onClick={handleBackButtonClick}

        >
          Back
        </Button.Ripple>
      )}

      <Card className='invoice-preview-card' style={{ backgroundColor: '', width: '100%', height: '85px' }}>
        <CardBody className='invoice-padding pt-2'>
          <Row>
            <Col md='7' sm='12' className='mb-1'>
              <div className="mb-1">
                <CardText className='mb-25' style={{ color: 'black', fontSize: '15px' }}>
                  <strong>Table Number:</strong> {localStorage.getItem('TableSelected')}
                </CardText>

              </div>
            </Col>
            <Col md='5' sm='12' className='mb-1'>
              <div className="mb-1">
                <CardText className='mb-25' style={{ color: 'black', fontSize: '12px' }}>
                  <Row>
                    <Col md='3' sm='12' className='text-center'>
                      <div>
                        <LuLayoutList style={{ color: 'black', fontSize: '25px' }} /><br />
                        <strong>Total items({itemsCount})</strong>
                      </div>
                    </Col>
                    <Col md='3' sm='12' className='text-center'>
                      <div>
                        {/* <VscPreview style={{ color: 'white', fontSize: '25px' }} /><br /> */}
                        <MdPreview style={{ color: 'black', fontSize: '25px' }} onClick={() => handlePreview(data)} /><br />

                        <strong><center>Preview Bill</center></strong>
                      </div>
                    </Col>
                    <Col md='3' sm='12' className='text-center' onClick={() => {
                      if (data['Balance'] == 0.00 || data['Balance'] < invBalance1) {
                        const swalInstance = MySwal.fire({
                          text: "Payment Initiated,you can not add discount!",
                          buttonsStyling: false,
                          confirmButtonText: 'Close',
                          customClass: {
                            confirmButton: 'btn btn-danger',
                          },
                        });
                        swalInstance.then((result) => {
                          if (result.isConfirmed) {
                            navigate('/apps/posconfiguration/DisplayBill');
                          }
                        });

                      }
                      else {
                        setdiscountModal(true);
                      }
                    }}>
                      <div>
                        <GrStar style={{ color: 'black', fontSize: '25px' }} /><br />
                        <strong>Discounts</strong>
                      </div>
                    </Col>
                    <Col md='3' sm='12' className='text-center' onClick={handleSplit}>
                      <div>
                        <FaChartPie style={{ color: 'black', fontSize: '25px' }} /><br />
                        <strong>Split</strong>
                      </div>
                    </Col>
                  </Row>
                </CardText>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Row>
        <Col sm='7'>
          <Form onSubmit={handleSubmit(handlePayButtonClick)}>
            <Row>
             
              <Col md='4' sm='12' className='mb-1'>
                <InputGroup className="input-group-merge">
                  <Controller
                    id="balance"
                    name="balance"
                    // defaultValue={data['Balance']}
                    defaultValue={finalBalanceAmt}
                    control={control}
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        pattern="[0-9]*" title="Only Numbers Allowed"
                        required
                        className={classnames("form-control", {
                          // "is-invalid": data !== null && data.balance === null,
                        })}
                        value={finalBalanceAmt} // Use the balanceValue from state here
                        onChange={handleChange} // Pass the handleChange function here
                        readOnly={selectedPaymentType && (selectedPaymentType.value === "Post To Room" || selectedPaymentType.value === "BTC")}

                      />
                    )}
                  />
                </InputGroup>
              </Col>
              <Col md='2' sm='12' className='mb-1'>
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
                        // onChange={(handlePaymentTypeChange) => {
                        // setSelectedPaymentType(selectedOption);

                        // }}
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
                        alert('An error occurred while fetching guest details.');
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
                        alert('An error occurred while fetching guest details.');
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
                {data['Balance'] == 0.00 ? (

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
              <Col sm='12'>
                <Table className="m-0" responsive>
                  <thead>
                    <tr>
                      <th style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={3}>Mode</th>
                      <th style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={3}>Amount</th>
                      <th style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={2}>Room/BTC</th>
                      <th style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={3}>Tips</th>
                      <th style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={4}>Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody>
                  {/* {console.log(recievedPayment)} */}
                    {recievedPayment.map((row, index) => (
                      <React.Fragment key={index}>
                        <tr key={index}>
                          <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={3} id={"mode" + index}>{row.paymentType}<br /></td>
                          <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={3} id={"recievedAmt" + index}>{row.RecievedAmt}<br /></td>
                          <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={2} id={"roomNo" + index}>
                            {/* {row.paymentType === 'BTC' ? sessionStorage.getItem('companyid') : row.roomNo} */}
                            {row.roomNo}

                            <br />
                          </td>
                          <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={3} id={"tips" + index}>{row.tips}<br /></td>
                          <td style={{ margin: '6px 0', paddingLeft: '30px', fontSize: '16px' }} colSpan={4} id={"recievedAmt" + index}>{row.TranxDetails}<br /></td>
                        </tr>
                      </React.Fragment>
                    ))}



                  </tbody>


                </Table>
              </Col>
            </Row>
          </Form>

        </Col>
        <Col lg='5' >
          <div style={{ height: '60vh', maxWidth: '100vw',overflowY: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <th colSpan={3} style={{ textAlign: 'left', fontSize: '16px' }}>ITEMS</th>
                  <th colSpan={2} style={{ textAlign: 'left', fontSize: '16px' }}>PRICE</th>
                  <th colSpan={1} style={{ textAlign: 'left', fontSize: '16px' }}>QTY</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ height: '20px' /* Adjust the height as needed */ }}></tr> {/* Add space between thead and tbody */}
                {tableData.map((row, index) => (
                  <React.Fragment key={index}>
                    <tr key={index}>
                      <td colSpan={3} style={{ textAlign: 'left' }} id={"itemName" + index}>{row.itemName}<br /></td>
                      <td colSpan={2} style={{ textAlign: 'left' }} id={"Price" + index}>{(row.Price).toFixed(2)}<br /></td>
                      <td colSpan={1} style={{ textAlign: 'left' }} id={"qty" + index}>{row.qty}<br /></td>
                    </tr>
                    {row.showBreakCourse && (
                      <tr>
                        <td colSpan={8} style={{ textAlign: 'center' }}>------------------------------------------------------------------------</td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
          <Card className='invoice-preview-card' style={{ width: '100%', marginTop: '30px', backgroundColor: '' }}>
            <CardBody className='invoice-padding pt-2'>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '40px', color: 'black', top: '70%' }}>
                  <strong>Amount :</strong>
                  <strong><FaRupeeSign />{invBalance1}</strong>

                </div>
                
                  <div style={{ marginRight: '50px', color: 'red', top: '70%' }}>
                    <strong>Discount Applied!!!</strong> <br />
                    <strong><FaRupeeSign />{totalDiscount}</strong>
                  </div>
                

              </div>
              <div style={{ position: 'absolute', left: '75%', top: '50%', transform: 'translateY(-50%)', width: '200px' }}>
                <Button color="primary" size="lg" onClick={handleInvoiceClick}>Invoice
                </Button>
              </div>
            </CardBody>
          </Card>

        </Col>

      </Row>
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
                {parseFloat(finalBalanceAmt).toFixed(2)} + Tips: <FaRupeeSign />
                {parseFloat(tipsAmount).toFixed(2)} ={' '}
                <FaRupeeSign />{(parseFloat(finalBalanceAmt) + parseFloat(tipsAmount)).toFixed(2)}
              </strong>
            </p>

          

          </div>
         
          <div className="button-container text-center">



            <Button className="me-1" color="primary" type='submit' onClick={handlePayButtonClick} >
              Yes
            </Button>
            <Button className='bg-transparent' color="danger" onClick={() => setpaymentInfoModal(false)}>
              No
            </Button>

          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={openInvoice}
        // toggle={() => setopenInvoice(!openInvoice)}
        className='modal-lg'

        onCancel={() => setopenInvoice(false)}
        centered
        footer={null}
      >


        <ModalHeader className='modal-lg'>Generate Invoice
        </ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20' >
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit(handleInvForm)}>
                <Row>
                  <Col md='4' sm='12' className='mb-1' >
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
                            })}
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
                        options={{ numeral: true }}
                        className="form-control"
                        value={localStorage.getItem('orderID')}
                        readOnly
                        style={{ fontWeight: 'bold' }}
                      />
                    </InputGroup>
                  </Col>

                  <Col md='4' sm='12' className='mb-1' >
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
                            pattern="[0-9]*" title="Only Numbers Allowed"
                            required
                            className={classnames("form-control", {
                            })}
                            value={invBalance1}
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
                      <Label className="form-label" for="emailBasic">
                        Guest Name
                      </Label>
                      <Controller
                        defaultValue={sessionStorage.getItem('selectedInHGuest') !== null ? sessionStorage.getItem('selectedInHGuest') : ' '}
                        control={control}
                        id="emailBasic"
                        name="emailBasic"
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

                  {/* {console.log(sessionStorage.getItem('selectedInHGuest'))} */}
                  {/* {console.log(sessionStorage.getItem('selectedInHGuest') || ' ')} */}
                  {console.log(sessionStorage.getItem('selectedInHGuest') !== null ? sessionStorage.getItem('selectedInHGuest') : ' ')}

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
                      <Label className="form-label" htmlFor="gstNo">
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
                              pattern="[A-Z 0-9]*"
                              className={classnames("form-control", {
                              })}
                            />
                          )}
                        />
                      </InputGroup>
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
                              placeholder="986......"
                              {...field}
                              className={classnames("form-control", {
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
                    disabled={isButtonClicked}
                  >
                    {isButtonClicked ? 'Processing...' : 'SUBMIT'}
                  </Button>
                </div>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ fontWeight: 'bold', color: 'white' }}>
                      Please wait Invoice is Generating..
                    </h1>
                    {showSecondaryMessage && (
                      <h1 style={{ fontWeight: 'bold', color: 'white' }}>
                        We're processing your request, which may take a little longer due to additional data. Please be patient!
                      </h1>
                    )}
                    <CircularProgress color="inherit" />
                  </div>
                </Backdrop>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>

      </Modal>
      {/* Modal for Discounts */}
      <Modal isOpen={discountModal} toggle={toggleModal} style={{ maxWidth: '650px' }}>
        <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
          <ModalHeader>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}> Discount Order</span>
          </ModalHeader>
        </div>
        <CardText className='mb-25' style={{ color: 'black', fontSize: '15px' }}>
          <Container style={{ marginBottom: '20px' }}>
            <Row className="justify-content-between">
              <Col md='2' sm='12' className='text-center'>
                <Button className="align-items-center" onClick={handleAMTClick}
                  id="Amount"
                  name="Amount">
                  <GrStar style={{ color: 'black', fontSize: '25px' }} />
                  Amount
                </Button>
              </Col>
              <Col md='3' sm='12' className='text-center'>
                <Button className="align-items-center" onClick={handlePercentageClick}
                  id="Percentage"
                  name="Percentage">
                  <GrStar style={{ color: 'black', fontSize: '25px' }} />
                  Percentage
                </Button>
              </Col>
              <Col md='3' sm='12' className='text-center'>
                <Button className="align-items-center" onClick={handleClassification}>
                  <GrStar style={{ color: 'black', fontSize: '25px' }} />
                  Classification
                </Button>
              </Col>
              <Col md='2' sm='12' className='text-center'>
                {/* <Button className="align-items-center" onClick={handlecouponClick}> */}
                <Button className="align-items-center">

                  <GrStar style={{ color: 'black', fontSize: '25px' }} />
                  Coupon
                </Button>
              </Col>
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
            <Row>
              <Col md='6' sm='12' className='text-center'>
                {/* <Button type="submit" className="me-1" color="warning" style={{ width: "100%" }}>
                Submit
              </Button> */}
                {/* <div align='center'> */}
                {/* <Button type='submit' style={{ align: 'right', 'margin-right': '10px', 'margin-bottom': '10px' }} className='me-1' onClick={() => { setOpencart(!openCart) }} color='primary' >CANCEL</Button> */}
                <Button style={{ align: 'right', 'margin-right': '10px', 'margin-bottom': '10px', width: '98%' }} className='me-1' onClick={() => { setdiscountModal(!discountModal) }}  >CANCEL</Button>


                {/* </div> */}
              </Col>
              <Col>
                <Button type="submit" className="me-1" color="primary" style={{ align: 'left', 'margin-right': '10px', 'margin-bottom': '10px', width: '99%' }}>
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      {/* For Applied Discount popup modal */}

      <Modal isOpen={discountModal1} toggle={() => setdiscountModal1(false)} className="modal-dialog-centered" style={{ width: '20%' }}>
        <ModalHeader toggle={() => setdiscountModal(false)}></ModalHeader>
        <ModalBody style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
              <FaRupeeSign style={{ fontSize: '20px' }} />
              <strong>{totalDiscount}</strong>
            </p>
            <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Discount applied successfully!!</p>
          </div>
        </ModalBody>
        <ModalFooter style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0' }}>
          <Button color="warning" size="lg" style={{ width: '300px', height: '50px' }} onClick={() => { setdiscountModal1(false); handleSubmit(onSubmitDisc) }}>Close</Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={openPreviewBill}
        toggle={toggleModal1}
        size="lg"
        className='modal-dialog-centered'
        onCancel={() => setopenPreviewBill(false)}
        centered
        footer={null}
      >
        <ModalHeader toggle={toggleModal1} className='text-center'>
        </ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20 '  >
          <div>
            {data.length != 0 && <DisplayBill data1={data} />}
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
                   {/* <img style={{ width: '80px', height: '80px',display:'block', marginBottom:'20px',marginLeft:'auto',marginRight:'auto' }} src={image} /> */}
                   <img style={{width: '80px',   height: '80px',   display: 'block',   marginBottom: '20px' }} src={API_URL+`/imagepaths/${logoimage}`} alt="Hotel Logo" onError={(e) => {   console.log('Error loading image:', e); }}/>
                  </div>
                    {/* <h6 className='mb-25'>Guest Name: {data['guestName'] ? data['guestName'] : sessionStorage.getItem('selectedInHGuest')}</h6> */}
                    <h6 className='mb-25'>Guest Name: {data['guestName']}</h6>

                    <h6 className='mb-25'>Room Number:{localStorage.getItem('selectedRoom')} </h6>
                    <h6 className='mb-0'>Pax : {data['pax']} </h6>
                  </div>
                  <div className='mt-md-1 mt-3'>
                    <h4>Outlet Name: <span>{localStorage.getItem('RestaurantSelected')}</span></h4>
                    <h6 className='invoice-number'>FSSAI No: {FSSAINumber}</h6>
                    <h6>Table Number:{localStorage.getItem('TableSelected')}</h6>
                    <h6>User : {data['stewardName']}</h6>

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
                  {data['items'].map((row, index) => (

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
                      </div>
                     
                      {data.classDiscDisplay.map((item, index) => (
                        <div key={index} className='invoice-total-item'>
                          <p className='invoice-total-title'><strong>{item.item.toUpperCase()} : {item.value}</strong></p>
                        </div>
                      ))}
                      
                      <div className='invoice-total-item'>
                        <p className='invoice-total-title'><strong>AMOUNT : {data.total}</strong></p>
                      </div>
                      <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>

                    </div>
                  </Col>
                </Row>

              </CardBody>

              <div style={{ 'border-bottom': '1px solid #E8E8E8', 'margin-bottom': '10px' }} ></div>


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
            </Card>
            <div className='d-flex'>
              <Button color='secondary' tag={Link} to='/apps/Print' target='_blank' block outline className='me-1' >
                Print
              </Button>
            </div>
          </div>
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
  ) : null
}

export default PreviewPayment