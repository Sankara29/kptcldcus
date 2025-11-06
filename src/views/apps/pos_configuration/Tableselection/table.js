
// ** Third Party Components
import InputNumber from 'rc-input-number'
import { Plus, Minus } from 'react-feather'
import React, { Component } from 'react';
// ** Custom Components
import Avatar from "@components/avatar";
import API_URL from "../../../../config";


import { useNavigate } from "react-router-dom";

// ** React Imports
import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
import * as ReactDOM from 'react-dom';
import { User, X } from 'react-feather'

import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { Alert, Table } from 'reactstrap'
import { HiOutlineMinusCircle } from "react-icons/hi";
import { BiTransferAlt } from "react-icons/bi";
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

import { FaSearch } from 'react-icons/fa';
import { FaEye } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";




// import App from "./waitListDataTable";
import Moment from 'moment';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

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
  Col,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { message } from 'antd';
let RestaurantOptions = [
  fetchx(API_URL + '/getrestaurantlist')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      RestaurantOptions = resp['data']
      // console.log(RestaurantOptions)
    })
]

let tablestatus = [

  // fetchx(API_URL+'/gettablestatus?hotelID=1&storeID='+localStorage.getItem('storeID'))
  // .then(result => result.json())
  // .then(resp => {
  //   console.log(resp['data'])
  //   tablestatus = resp['data']

  // })

]
let Tablecount = [
  //   fetchx(API_URL+'/gettablecount?hotelID=1&storeID='+storeid)
  //   .then(result => result.json())
  //   .then(resp => {
  //     console.log(resp['data'])
  //     Tablecount = resp['data']
  //     console.log(Tablecount[0]['tableCount'])
  //   })
]
let tableOptions = []

let id = 1;

const defaultValues = {
  // TableNo: '',
  // pax: '',
  // Type: '',
  // guestName: '',
  // guestType: '',
  // Departments: '',
  // KOTType: ''
TableNo:'',
pax:'',
guestType:'',
guestName:'',
roomNumber:'',
kotSwitch:'',
KOTType:'',
Departments:'',
NCKotReason:'',
}

const TypeOptions = [
  { value: "NC KOT", label: "NC KOT" },
  { value: "Normal", label: "KOT" }
];

const KOTTypeOptions = [
  { value: 'Exclusive Food', label: 'Exclusive Food' },
  { value: 'Complimentary', label: 'Complimentary' },
  { value: 'Guest Food', label: 'Guest Food' },
]

// let DeptOptions = [
//   fetchx(API_URL + '/getdepartments?hotelID=1')
//     .then(result => result.json())
//     .then(resp => {
//       // console.log(resp['data'])
//       DeptOptions = resp['data']
//       // console.log(DeptOptions)
//     })
// ]

let guestTypeOptions = [
  { value: 'Resident', label: 'Resident' },
  { value: 'NonResident', label: 'NonResident' }
]

sessionStorage.removeItem('selectedInHGuest')
const ValidationThirdPartyComponents = () => {

  // console.log(sessionStorage.getItem('Rest_name'))


  let navigate = useNavigate();
  const [orderbtn, setorderbtn] = useState(true);

  const [checkdata, setcheckdata] = useState(false)
  const [tableorders, settableorders] = useState();
  const [reloadtable, setreloadtable] = useState(false);
  const [selectedRows, setSelectedRows] = useState([])
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null);
  const [selectedValue, setSelectedOption] = useState('');
  const [showNCfields, setNCfields] = useState(false)
  const [selecteditem, setselecteditem] = useState("");
  const [rowData, setRowData] = useState();
  const [orderIDdisplay, setorderIDdisplay] = useState(false)
  const [tableData, setTableData] = useState([
    // {id: 1, menuitem: 'item1', qty: 1},
    // {id: 2, menuitem: 'item2', qty: 1},
  ]);
  const [selectedGuestType, setSelectedGuestType] = useState('Resident')
  const [isChecked, setIsChecked] = useState(false);
  const [showNCKOTCol, setShowNCKOTCol] = useState(false)
  const [pastKOT1, setpastKOT1] = useState('')
  const [itemTransfer, setItemTransfer] = useState(false)
  const [transferedItem, settransferedItem] = useState([])
  const [tableTransfer, setTableTransfer] = useState(false)
  const [inhouseGuestModal, setinhouseGuestModal] = useState(false)
  const [inhouseGuestDetails, setinhouseGuestDetails] = useState([])
  const [inhouseGuestOptions, setInhouseGuestOptions] = useState([]);
  const [selectedRoomNumber, setselectedRoomNumber] = useState([])
  const [selectedRoomNumber1, setselectedRoomNumber1] = useState([])
  const [selectedGuestName, setselectedGuestName] = useState('')
  const [selectedGuest, setSelectedGuest] = useState([])
  const [searchRoomORGuest, setsearchRoomORGuest] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Initialize current page to 1
  const buttonsPerPage = 25;
  const [runningKOTs, setRunningKOTs] = useState(true)
  const [tableRunningKOTs, setTableRunningKOTs] = useState(false)
  const [runningkotdata, setRunningkotData] = useState([])
  const [showIHGuestDataModal, setshowIHGuestDataModal] = useState(false);
  const [ihGuestdata, setIHGuestdata] = useState([])
  console.log(ihGuestdata)
  const [irdRoomData, setirdRoomData] = useState(false);
  const [DeptOptions, setDeptOptions] = useState([]);







  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  //   const handleDropdownChange = (event) => {
  //     setSelectedOption(event.value);

  //     console.log(event.value); // print the selected value to console
  //     if (selectedValue == 'KOT') {
  //         console.log("hi")
  //     }
  //     else if (selectedValue == 'NC KOT') {
  //         console.log("hello")
  //         setNCfields(true)
  //     }
  //     else  {

  //     }
  // };
  const handleDropdownChange = (event) => {
    // console.log(document.getElementById('kotSwitch').value)
    setIsChecked(!isChecked);
    setShowNCKOTCol(event.target.checked)
    // onChange={(e) => setShowNCKOTCol(e.target.checked)}
    //   setSelectedOption(event.target.checked);
    //   if (selectedValue == 'KOT') {
    //     console.log("hi")
    //   }
    //   else if (selectedValue == 'NC KOT') {
    //     console.log("hello")
    //     setNCfields(true)
    //   }
    //   else {

    //   }
    // let orderType = '';


  };
  const handleCancelTableOrder = () => {
    setShow(false)
    navigate('')
  }
  const handleDropdownChangeGuestType = (selectedOption) => {
    setSelectedGuestType(selectedOption.value);
    // console.log(selectedOption.value);
    // console.log(selectedGuestType);

    // Perform any additional logic based on the selected value
  };
  const onSubmit = (data) => {
    // console.log(data)
    setData(data);
    let guestName = {}
    let roomNumber = {}
    let reservationID = {}

    if (selectedGuestType == 'Resident') {
      guestName = selectedGuestName
      roomNumber = selectedRoomNumber1   
      
    }
    else {   
      // if(guestName!==null) {
      //   guestName = data.guestName
      // }
      // else {
      //   guestName = ''
      // }
      guestName = data.guestName
      roomNumber = ''
    }
    if(guestName == null) {
      guestName = ''
    }
    console.log(guestName)
    // console.log(data)
    let orderType = '';

    let orderdata = {}
    if (data.pax !== null && localStorage.getItem('TableSelected') != null) {
      // console.log(data);
      sessionStorage.setItem('paxData', data.pax)
      if (isChecked === true) {
        orderType = "NC KOT"
        orderdata = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "pax": data.pax,
          "orderType": orderType,
          "guestName": guestName,
          "roomNumber": roomNumber,
          "guestType": selectedGuestType,
          "dept": data.Departments.value,
          "NCKOTType": data.KOTType.value
        })
      }
      else {
        orderType = "Normal"
        orderdata = JSON.stringify({
          "hotelID": 1,
          "storeID": localStorage.getItem('storeID'),
          "tableNo": localStorage.getItem('TableSelected'),
          "pax": data.pax,
          "orderType": orderType,
          "guestType": selectedGuestType,
          "guestName": guestName,
          "roomNumber": roomNumber,
          "dept": '',
          "NCKOTType": ''
        });
      }
      // console.log(orderdata);
      // let res = fetchx(API_URL+"/addHotelOrderID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: orderdata,
      // }).then((res) => {
      //   console.log(res);
      //   if(res['status']==200){
      //     toast(
      //       <div className="d-flex">
      //         <div className="me-1">
      //           <Avatar size="sm" color="success" icon={<Check size={12} />} />
      //         </div>
      //         <div className="d-flex flex-column">
      //           <h6>Form Submitted!</h6>
      //         </div>
      //       </div>
      //     );
      //     setTimeout(() => {navigate('/apps/posconfiguration/Addorder')},1000);

      //   }
      //   else{
      //     window.location.reload(true);
      //   }
      // });

      let res = fetchx(API_URL + '/addHotelOrderID', {
        method: 'POST',
        body: orderdata,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((post) => {
          // console.log(post)
          localStorage.setItem('orderID', post['data']['orderID'])
          if (post['statuscode'] == 200) {
            // toast(
            //   <div className="d-flex">
            //     <div className="me-1">
            //       <Avatar size="sm" color="success" icon={<Check size={12} />} />
            //     </div>
            //     <div className="d-flex flex-column">
            //       <h6>Order Created!</h6>
            //     </div>
            //   </div>
            // );
            const swalInstance = MySwal.fire({
              text: 'Order Created!!',
              icon: 'success',
              buttonsStyling: false,
              confirmButtonText: 'Close',
              customClass: {
                confirmButton: 'btn btn-danger'
              }
            });
            setTimeout(() => { navigate('/apps/posconfiguration/Addorder') }, 100);

          }
          else {
            // window.location.reload(true);
            // alert("test")
            navigate('/apps/posconfiguration/Tableselection')
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };


  useEffect(() => {
    // console.log(localStorage.getItem('RestaurantSelected'))
    // console.log(localStorage.getItem('storeID'))
    fetchx(API_URL + '/gettablecount?hotelID=1&storeID=' + localStorage.getItem('storeID'))
      .then(result => result.json())
      .then(resp => {
        // console.log(resp['data'])
        Tablecount = resp['data']


      }).then(data => {
        fetchx(API_URL + '/getAllTableOrderStatus?hotelID=1&storeID=' + localStorage.getItem('storeID'))
          .then(result => result.json())
          .then(resp => {
            // console.log(resp['data'])
            tablestatus = resp['data']
            tableOptions = resp['data']
            setcheckdata(true)
          })
      })
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
      fetchx(API_URL + '/getdepartments?hotelID=1')
      .then(result => result.json())
      .then(resp => {
        // console.log(resp['data'])
        setDeptOptions(resp['data'])
        // console.log(DeptOptions)
      })
  }, []);


  useEffect(() => {
    const storeID = localStorage.getItem('storeID');
    // fetchx(API_URL + `/getrunningKOTs?hotelID=1&storeID=1`)
    fetchx(API_URL + '/getrunningKOTs?hotelID=1&storeID=' + storeID)
      .then(result => result.json())
      .then(data => {
        console.log(data)
        setRunningkotData(data['data'])
      })

  }, [])

  // function getButtonsUsingForLoop(currentPage, buttonsPerPage) {
  //   const startIndex = (currentPage - 1) * buttonsPerPage;
  //   const endIndex = startIndex + buttonsPerPage;

  //   const buttons = [];

  //   for (let i = startIndex + 1; i <= endIndex; i++) {
  //     let color = '';

  //     if (i <= tablestatus.length) {
  //       if (tablestatus[i - 1]['status'] === 'Occupied') {
  //         color = 'danger';
  //       } else if (tablestatus[i - 1]['status'] === 'Billed') {
  //         color = 'primary';
  //       } else if (tablestatus[i - 1]['status'] === 'Partially billed') {
  //         color = 'info';
  //       } else {
  //         color = 'success';
  //       }

  //       buttons.push(
  //         <Button
  //           key={i}
  //           color={color}
  //           className="me-0.5"
  //           style={{
  //             marginRight: '10px',
  //             height: '80px',
  //             width: '80px',
  //             marginBottom: '10px'
  //           }}
  //           id={i}
  //           name="bt"
  //           onClick={() => {
  //             handleClick(tablestatus[i - 1]['TableID']);
  //           }}
  //         >
  //           {/* {i} */}
  //           {tablestatus[i - 1]['TableID']}
  //         </Button>
  //       );
  //     }
  //   }

  //   return buttons;
  // }


  function getButtonsUsingForLoop(currentPage, buttonsPerPage) {
    const startIndex = (currentPage - 1) * buttonsPerPage;
    const endIndex = startIndex + buttonsPerPage;

    const buttons = [];

    for (let i = startIndex + 1; i <= endIndex; i++) {
      let color = '';
      let isOccupied = false;

      if (i <= tablestatus.length) {
        if (tablestatus[i - 1]['status'] === 'Occupied') {
          color = 'danger';
          isOccupied = true;
        } else if (tablestatus[i - 1]['status'] === 'Billed') {
          color = 'primary';
        } else if (tablestatus[i - 1]['status'] === 'Partially billed') {
          color = 'info';
        } else {
          color = 'success';
        }

        buttons.push(
          <Button
            key={i}
            color={color}
            className="me-0.5"
            style={{
              marginRight: '10px',
              height: '80px',
              width: '80px',
              marginBottom: '10px',
            }}
            id={i}
            name="bt"
            onClick={() => {
              handleClick(tablestatus[i - 1]['TableID'],tablestatus[i - 1]['TableOrRoom']);
              setTableRunningKOTs(true); // Call setTableRunningKOTs(true) when clicking on the table
            }}
          >
            {/* {i} */}
            {tablestatus[i - 1]['TableID']}
            {/* {isOccupied && <br />} */}
            {/* {isOccupied && (
              <FaEye
                className="eye-icon"
                size={25}
                style={{ paddingTop: '10px' }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the table click event from triggering
                  handleRunningKOTs();
                }}
              />
            )} */}
          </Button>
        );
      }
    }

    return buttons;
  }
  ``

  function handleClick(count,TableOrRoom) {
    console.log(count,TableOrRoom)
    setIHGuestdata([])

    console.log('IHGuestdata', ihGuestdata['id'])
    if(TableOrRoom == 'Room'){
      console.log("inside room")
      setirdRoomData(true)
      fetchx(API_URL + '/getReservationByRoomNo', {
        method: 'POST',
        body: JSON.stringify({
          "hotelID": 1,
          "roomNo":count
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp)

          setIHGuestdata(resp['data'][0])
          console.log(resp['data'][0]['id'])
          setselectedGuestName(resp['data'][0]['guestName'])
          setselectedRoomNumber1(resp['data'][0]['roomNumber'])
          
        })

        .catch((err) => {
          console.log(err.message);
        });
    }
    else {
      setselectedGuestName(null)
      setselectedRoomNumber1(null)
    }
    setRunningKOTs(false)
    // console.log("single clicked")
    setorderIDdisplay(true)
    // setpastKOT1('')
    localStorage.setItem('TableSelected', count)
    // console.log('hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
    fetchx(API_URL + '/getPastKOT?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
      .then(result => result.json())
      .then(resp => {
        // console.log(resp['data']);
        if (resp['data'] === undefined) {
          // const jsonData = {
          //     text: 'No Items in Past KOT'
          //   };
          setpastKOT1('');
          //   console.log(resp['data'])
        } else {
          setpastKOT1(resp['data']);

        }
      })
      .catch(error => {
        console.log('Error occurred while fetching data:', error);
        // Handle the error condition, show an error message, or take appropriate action.
      });

    if (event.detail == 2) {
      // console.log("Double Clicked")
      // console.log(JSON.stringify({
      //   "hotelID": 1,
      //   "storeID": localStorage.getItem('storeID'),
      //   "orderID": localStorage.getItem('orderID'),
      //   "tableNo": localStorage.getItem('TableSelected'),
      // }))
      fetchx(API_URL + '/checkSplitStatus', {
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
        .then((resp) => {

          // console.log(resp)
          // console.log(resp['data'])

          if (resp['statuscode'] === 200 && resp['data'] === true) {
            setTimeout(() => {
              navigate('/apps/posconfiguration/SplitPayment');
            }, 100);
          }
          else {
            sessionStorage.setItem('TableSelected', count)
            navigate('/apps/posconfiguration/Addorder');
          }
        })

        .catch((err) => {
          console.log(err.message);
        });


    }
    else {
      fetchx(API_URL + '/getTableOrderStatus?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&tableNo=' + count)
        .then(result => result.json())
        .then(resp => {
          // console.log(resp['data'])
          // console.log(resp['data']['TableOrderID'])

          if (resp['data']['TableOrderID'] != 0) {
            localStorage.setItem('orderID', resp['data']['TableOrderID'])
            // console.log(API_URL + '/gettableorderlist?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&tableNo=' + count)
            fetchx(API_URL + '/gettableorderlist?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&tableNo=' + count + '&orderID=' + localStorage.getItem('orderID'))
              .then(result => result.json())
              .then(result => {
                // console.log(result['data'])
                settableorders(result['data'])
                // console.log(tableorders)
                setreloadtable(true)
                setorderbtn(false)
              })
          }
          else {
            localStorage.setItem('orderID', '')

            settableorders([])
            setreloadtable(true)
            setShow(true)

          }
          // localStorage.setItem('orderID',resp['data']['TableOrderID'])

        })
      // console.log(count)

    }
  }
  const handleSelect = id => {
    const selectedRowsArr = selectedRows
    if (!selectedRowsArr.includes(id)) {
      selectedRowsArr.push(id)
    } else if (selectedRowsArr.includes(id)) {
      selectedRowsArr.splice(selectedRowsArr.indexOf(id), 1)
    } else {
      return null
    }
    setSelectedRows([...selectedRowsArr])
  }
  const handleSelectAll = () => {
    let selectedRowsArr = selectedRows
    if (selectedRowsArr.length < tableData.length) {
      let ids = []
      for (let i = 0; i < tableData.length; i++) {
        ids.push(i)
      }

      selectedRowsArr = ids
    }
    else if (selectedRowsArr.length === tableData.length) {
      selectedRowsArr = []
    }
    else {
      return null
    }

    setSelectedRows(selectedRowsArr)
  }

  // function CartTable() {
  //   return (
  //     <>
  //       {tableRunningKOTs &&
  //         <div>
  //           <Table>
  //             <thead>
  //               <tr style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //                 <th>Menuitem</th>
  //                 <th>Quantity</th>
  //                 <th style={{ textAlign: 'right' }}>
  //                   <BiTransferAlt
  //                     size={25}
  //                     color="red" onClick={handleTransferTable}></BiTransferAlt></th>

  //               </tr>
  //             </thead>
  //           </Table>
  //           <div style={{ maxHeight: '55vh', maxWidth: '100vw', overflowY: 'auto' }}>

  //             <Table>
  //               <tbody>
  //                 {pastKOT1.length === 0 ? (
  //                   <React.Fragment>
  //                     <tr>
  //                       <td colSpan="12" style={{ fontWeight: 'bold', textAlign: 'center', color: 'red' }}>
  //                         No item for past KOT
  //                       </td>
  //                     </tr>
  //                   </React.Fragment>
  //                 ) : (
  //                   pastKOT1.map((row, index) => (
  //                     <React.Fragment key={index}>
  //                       <tr>
  //                         <td id={'KOTNo' + index} style={{ color: 'red' }}>
  //                           <strong>{'KOTNO#' + row.KOTNo}</strong>
  //                         </td>
  //                         {/* <td style={{ textAlign: 'right' }}>

  //                   <HiOutlineMinusCircle
  //                     size={25}
  //                     color="red"
  //                     onClick={() => handlevoidKOT(row, index)}
  //                   />
  //                 </td> */}
  //                         <td id={'itemName' + index}>{row.itemName}</td>
  //                         <td id={'qty' + index}>
  //                           <b>{row.qty}</b>
  //                         </td>
  //                       </tr>
  //                       {row.items.map((item, index2) => (
  //                         <tr key={index2} onClick={() => handleItemtransfer(item, index, index2)}>
  //                           <td id={'itemName' + index2}>{item.itemName}</td>
  //                           <td id={'qty' + index2}>
  //                             <b>{item.qty}</b>
  //                           </td>
  //                         </tr>
  //                       ))}
  //                     </React.Fragment>
  //                   ))
  //                 )}
  //               </tbody>

  //             </Table>
  //           </div>
  //         </div>
  //       }
  //       {runningKOTs &&
  //         <div>
  //           <Table>
  //             <thead>
  //               <tr style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //                 <th>Menuitem</th>
  //                 <th>Quantity</th>
  //               </tr>
  //             </thead>
  //           </Table>
  //           <div style={{ maxHeight: '55vh', maxWidth: '100vw', overflowY: 'auto' }}>

  //             <Table>
  //               <tbody>
  //                 {/* {pastKOT1.length === 0 ? (
  //               <React.Fragment>
  //                 <tr>
  //                   <td colSpan="12" style={{ fontWeight: 'bold', textAlign: 'center', color: 'red' }}>
  //                     No item for past KOT
  //                   </td>
  //                 </tr>
  //               </React.Fragment>
  //             ) : (
  //               pastKOT1.map((row, index) => (
  //                 <React.Fragment key={index}>
  //                   <tr>
  //                     <td id={'KOTNo' + index} style={{ color: 'red' }}>
  //                       <strong>{'KOTNO#' + row.KOTNo}</strong>
  //                     </td>

  //                     <td id={'itemName' + index}>{row.itemName}</td>
  //                     <td id={'qty' + index}>
  //                       <b>{row.qty}</b>
  //                     </td>
  //                   </tr>
  //                   {row.items.map((item, index2) => (
  //                     <tr key={index2} onClick={() => handleItemtransfer(item, index, index2)}>
  //                       <td id={'itemName' + index2}>{item.itemName}</td>
  //                       <td id={'qty' + index2}>
  //                         <b>{item.qty}</b>
  //                       </td>
  //                     </tr>
  //                   ))}
  //                 </React.Fragment>
  //               ))
  //             )} */}
  //               </tbody>

  //             </Table>
  //           </div>
  //         </div>
  //       }
  //     </>
  //   )
  // }
  const calculateTimeDifference = (createdAt) => {
    const createdAtTimestamp = new Date(createdAt);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAtTimestamp;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return { hours: hoursDifference, minutes: minutesDifference };
  };
  function CartTable() {

    return (
      <div>
      {/* <div style={{ maxHeight: '55vh', overflowY: 'auto', maxWidth: '100vw' }}>
      {console.log(runningkotdata)}
  {runningKOTs && runningkotdata && runningkotdata.map((kot) => (
    
    <div key={kot.kotNo}>
    <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <tbody>
    <tr>
      <th style={{maxWidth: '150px' }}>KOT: {kot.kotNo}</th>
      <th style={{width: '150px' }}>Table: {kot.tableNo}</th>
      <th style={{ width: '150px' }}>{calculateTimeDifference(kot.createdAt).hours.toString().padStart(2, '0')}h:
  {calculateTimeDifference(kot.createdAt).minutes.toString().padStart(2, '0')}m
</th>

    </tr>
    {kot.items.map((item) => (
      <tr key={item.id}>
        <td style={{ maxWidth: '150px' }}>{item.itemName}</td>
        <td style={{ width: '90px' }}>Qty: {item.qty}</td>
      </tr>
    ))}
  </tbody>
</Table>

    </div>
  ))}
      </div> */}

      <div style={{ maxHeight: '55vh', overflowY: 'auto', maxWidth: '100vw' }}>
  { runningKOTs && runningkotdata && runningkotdata.length > 0 ? (
    runningkotdata.map((kot) => (
      <div key={kot.kotNo}>
        <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <th style={{ maxWidth: '150px' }}>KOT: {kot.kotNo}</th>
              <th style={{ width: '150px' }}>Table: {kot.tableNo}</th>
              <th style={{ width: '150px' }}>
                {calculateTimeDifference(kot.createdAt).hours
                  .toString()
                  .padStart(2, '0')}
                h:
                {calculateTimeDifference(kot.createdAt).minutes
                  .toString()
                  .padStart(2, '0')}
                m
              </th>
            </tr>
            {kot.items.map((item) => (
              <tr key={item.id}>
                <td style={{ maxWidth: '150px' }}>{item.itemName}</td>
                <td style={{ width: '90px' }}>Qty: {item.qty}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ))
  ) : runningKOTs && (
    <div style={{ textAlign: 'center', color: 'red' }}>
      <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <th style={{ maxWidth: '150px' }}>No Running orders in table</th>
          </tr>
        </tbody>
      </Table>
    </div>
  )}
</div>





        {tableRunningKOTs && (
          <div>
            <Table>
              <thead>
                <tr style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <th>Menuitem</th>
                  <th>Quantity</th>
                  <th style={{ textAlign: 'right' }}>
                    <BiTransferAlt size={25} color="red" onClick={handleTransferTable}></BiTransferAlt>
                  </th>
                </tr>
              </thead>
            </Table>
            <div style={{ maxHeight: '55vh', maxWidth: '100vw', overflowY: 'auto' }}>
              <Table>
                <tbody>
                  {pastKOT1.length === 0 ? (
                    <React.Fragment>
                      <tr>
                        <td colSpan="12" style={{ fontWeight: 'bold', textAlign: 'center', color: 'red' }}>
                          No item for past KOT
                        </td>
                      </tr>
                    </React.Fragment>
                  ) : (
                    pastKOT1.map((row, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td id={'KOTNo' + index} style={{ color: 'red' }}>
                            <strong>{'KOTNO#' + row.KOTNo}</strong>
                          </td>
                          <td id={'itemName' + index}>{row.itemName}</td>
                          <td id={'qty' + index}>
                            <b>{row.qty}</b>
                          </td>
                        </tr>
                        {row.items.map((item, index2) => (
                          <tr key={index2} onClick={() => handleItemtransfer(item, index, index2)}>
                            <td id={'itemName' + index2}>{item.itemName}</td>
                            <td id={'qty' + index2}>
                              <b>{item.qty}</b>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    );
  }


  // function billprint() {
  //   console.log("Navigate")
  //   localStorage.setItem("tableNumber", localStorage.getItem('TableSelected'))
  //   navigate('/apps/posconfiguration/DisplayBill')
  // }
  const handleItemtransfer = (item, index, index2) => {
    // console.log("Items transfer---------------------")
    setItemTransfer(true)
    settransferedItem(item)

  }
  const handleTransferCancel = () => {
    setItemTransfer(false)
  }

  const handleItemtransfer1 = (data) => {
    // console.log(data)

    // const {id,hotelID,storeID,prevTableNo,newTableNo,reason} 
    // console.log(JSON.stringify({
    //   "id": JSON.stringify(transferedItem.id),
    //   "hotelID": 1,
    //   "storeID": localStorage.getItem('storeID'),
    //   "prevTableNo": localStorage.getItem('TableSelected'),
    //   "newTableNo": data.totable['value'],
    //   "reason": data.reason,
    // }))
    fetchx(API_URL + '/transferItem', {
      method: 'POST',
      body: JSON.stringify({
        "id": transferedItem.id,
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "prevTableNo": localStorage.getItem('TableSelected'),
        "newTableNo": data.totable['value'],
        "reason": data.reason,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        if (post['statuscode'] == 200) {
          setItemTransfer(false)
          const swalInstance = MySwal.fire({
            title: 'Transfer Table Item!',
            text: 'Transfer Table Item Successfully!',
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
        if (post['statusCode'] == 403) {
          // console.log(post['message'])
          setItemTransfer(false)
          const swalInstance = MySwal.fire({
            text: post['message'],
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger',
            },
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('/apps/posconfiguration/Tableselection');
            }
          });
        }
      });
  }


  const handleTransferTable = () => {
    if (pastKOT1.length === 0) {
      // console.log("items not prese")
      const swalInstance = MySwal.fire({
        text: 'No item for past KOT',
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });

      swalInstance.then((result) => {
        if (result.isConfirmed) {
          setTableTransfer(false)
        }
      });
    }
    else {
      // console.log("item are present")
      setTableTransfer(true)
    }

  }
  const handleRunningKOTs = () => {
    setRunningKOTs(true)
    setTableRunningKOTs(false)
  }
  const handleTableTransferCancel = () => {
    setTableTransfer(false)

  }
  const handleTransferTable1 = (data) => {
    // console.log(data);

    // console.log(JSON.stringify({
    //   "hotelID": 1,
    //   "storeID": localStorage.getItem('storeID'),
    //   "prevTableNo": localStorage.getItem('TableSelected'),
    //   "newTableNo": data.totable1['value'],
    //   "reason": data.reasontabletransfer,
    // }));

    fetchx(API_URL + '/transferTable', {
      method: 'POST',
      body: JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "prevTableNo": localStorage.getItem('TableSelected'),
        "newTableNo": data.totable1['value'],
        "reason": data.reasontabletransfer,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        // console.log(post)
        if (post['statuscode'] == 200) {
          setTableTransfer(false);

          const swalInstance = MySwal.fire({
            title: 'Transfer Table!',
            text: 'Transfer Table Successfully!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger',
            },
          });

          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('/apps/posconfiguration/Tableselection');
            }
          });
        }
        if (post['statusCode'] == 403) {
          // console.log(post['message'])
          setTableTransfer(false)
          // Display an error message using SweetAlert
          const swalInstance = MySwal.fire({
            text: post['message'],
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger',
            },
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('/apps/posconfiguration/Tableselection');
            }
          });
        }

      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleInhouseRoomData = () => {
    // console.log("hi")
    setsearchRoomORGuest('')
    setinhouseGuestModal(true)

  }

  const handleGuestSelect = (guest) => {
    // console.log(guest)
    const inHRoomNo = guest.roomNumber
    const reservationID = guest.reservationID
    setselectedRoomNumber(reservationID)
    setselectedRoomNumber1(inHRoomNo)

    const inHGuest = guest.name
    setselectedGuestName(inHGuest)
    setSelectedGuest(guest);
  }
  return (
    <div >
      <Button.Ripple color='primary' outline size='sm' style={{ 'margin-bottom': '10px' }}
        onClick={() => navigate('/apps/posconfiguration/Restaurantselection')}>
        Back
      </Button.Ripple>
      <Row className='match-height'>

        <Col xl='7' >
          <Card style={{ height: '100%' }}>

            <br />
            <h4 style={{ margin: '6px 0', paddingLeft: '10px' }}>Select Table</h4>
            <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px', maxHeight: '500px', }}>
              {checkdata && getButtonsUsingForLoop(currentPage, buttonsPerPage)}
            </div>
            {/* <div className="d-flex" style={{'margin-bottom': '20px',margin: '6px 0', paddingLeft: '10px'}}> */}
            <div class='demo-space-x' style={{ marginTop: '10px', paddingLeft: '10px' }} >
              <Button className="me-1" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} style={{ 'margin-right': '10px' }}
              >
                Prev
              </Button>
              <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * buttonsPerPage >= tablestatus.length} color="primary">
                Next
              </Button>
            </div>
            <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px', marginTop: '10px' }}>

              <Button.Ripple style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} color='danger' size='sm'  >Occupied</Button.Ripple>
              <Button.Ripple style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} color='success' size='sm' >Vacant</Button.Ripple>
              <Button.Ripple style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} color='primary' size='sm' >Billed</Button.Ripple>
              <Button.Ripple style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} color='info' size='sm'  >Partially billed</Button.Ripple>
              <Button.Ripple style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} color='warning' size='sm' >All</Button.Ripple>
            </div>
          </Card>
        </Col>
        <Col xl='5' md='6' xs='12'>
          <Card>      <br />
            <div className='inline-spacing' align="right" style={{ margin: '2px 2px' }}>
              {/* <Button.Ripple style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} color='warning' size='sm' disabled={orderbtn} onClick={billprint}>Display bill</Button.Ripple> */}

            </div>
            {orderIDdisplay && tableRunningKOTs ? (
              <>
                <Row>
                  <Col xl='4' md='6' xs='12'>
                    <h5 style={{ margin: '6px 0', paddingLeft: '10px' }}>Order ID : {localStorage.getItem('orderID')}</h5>
                  </Col>
                  <Col xl='4' md='6' xs='12'>
                    <h5 style={{ margin: '6px 0', paddingLeft: '10px' }}>Table No.: {localStorage.getItem('TableSelected')}</h5>
                  </Col>
                </Row>
                <h4 style={{ margin: '6px 0', paddingLeft: '10px' }}>Table Order List</h4>
              </>
            ) : (
              <h4 style={{ margin: '6px 0', paddingLeft: '10px' }}>Running KOT</h4>
            )}


            {/* {reloadtable && <CartTable />} */}
            {<CartTable />}

          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={show}
        // toggle={() => setShow(!show)} 
        className='modal-dialog-centered modal-lg'>
        {/* <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}> Table Order</ModalHeader> */}
        <ModalHeader style={{ fontSize: '20px', fontWeight: 'bold' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Table Order</span>
        </ModalHeader>

        <ModalBody className='pb-3 px-sm-1 mx-20'>
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md='4' sm='12' className='mb-1'>
                    <div className="mb-1">
                      <Label className="form-label" for="TableNo">
                        Table Selected
                      </Label>
                      <InputGroup className="input-group-merge">

                        <Controller
                          id="TableNo"
                          name="TableNo"

                          control={control}
                          render={({ field }) => (
                            <Cleave
                              {...field}
                              disabled={true}
                              pattern="[0-9]*" title="Only Numbers Allowed" required
                              placeholder="Enter Store ID"
                              className={classnames("form-control", {
                                "is-invalid": data !== null && data.TableNo === null,
                              })}
                              value={localStorage.getItem('TableSelected')}
                            />
                          )}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                  <Col md='4' sm='12' className='mb-1'>
                    <div className="mb-1">
                      <Label className="form-label" for="pax">
                        Pax Count
                      </Label>
                      <InputGroup className="input-group-merge">

                        <Controller
                          id="pax"
                          name="pax"
                          control={control}
                          placeholder="pax"
                          render={({ field }) => (
                            <Cleave
                              pattern="[0-9]*" title="Only Numbers Allowed"
                              placeholder="Enter pax"
                              required
                              {...field}
                              className={classnames("form-control", {
                                "is-invalid": data !== null && data.pax === null,
                              })}
                            />
                          )}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                  <Col md='4' sm='12' className='mb-1'>
                    <div className="mb-1">
                      <Label className="form-label" for="guestType">
                        Guest Type
                      </Label>
                      <Controller
                        id="guestType"
                        control={control}
                        name="guestType"
                        render={({ field }) => (
                          <Select
                            isClearable={false}
                            options={guestTypeOptions}
                            theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            value={guestTypeOptions.find(option => option.value === selectedGuestType)} // Set the selected value based on state
                            onChange={handleDropdownChangeGuestType}
                          />
                        )}
                      />
                    </div>
                  </Col>
                  {selectedGuestType === 'Resident' ? (
                    <>
                      <Col md='6' sm='12' className='mb-1'>
                        <div className="mb-1">
                          <Label className="form-label" for="guestName">
                            Guest Name
                          </Label>
                          
                         {ihGuestdata['id']!==undefined &&  <IoMdInformationCircle style={{ marginLeft: '10px', fontSize: '16px' }} onClick={() => setshowIHGuestDataModal(true)} />}
                            
                          <InputGroup className="input-group-merge">
                            <Controller
                              id="guestName"
                              name="guestName"
                              control={control}
                              placeholder="guestName"
                              render={({ field }) => (
                                <input
                                  {...field}
                                  value={selectedGuestName}
                                  onChange={(e) => setselectedGuestName(e.target.value)}
                                  className={classnames("form-control", {
                                    "is-invalid": data !== null && data.guestName === null,
                                  })}
                                />
                              )}
                            />
                          </InputGroup>
                        </div>
                      </Col>
                      <Col md='6' sm='12' className='mb-1'>
                        <div className="mb-1"
                        >
                          <Label className="form-label" for="roomNumber">
                            Room Number
                          </Label>
                          <InputGroup className="input-group-merge">
                            <Controller
                              id="roomNumber"
                              name="roomNumber"
                              control={control}
                              placeholder="roomNumber"
                              render={({ field }) => (
                                <Cleave
                                  // pattern="[0-9]*" title="Only Numbers Allowed"
                                  readOnly
                                  required
                                  {...field}
                                  onClick={handleInhouseRoomData}
                                  value={selectedRoomNumber1}
                                  // disabled
                                  className={classnames("form-control", {
                                    "is-invalid": data !== null && data.roomNumber === null,
                                  })}
                                />
                              )}
                            />
                          </InputGroup>
                        </div>
                      </Col>

                    </>
                  ) : (
                    <Col md='12' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="guestName">
                          Guest Name
                        </Label>
                        <InputGroup className="input-group-merge">
                          <Controller
                            id="guestName"
                            name="guestName"
                            control={control}
                            placeholder="guestName"
                            render={({ field }) => (
                              // <Cleave
                              <Input
                                // pattern="[aA-zZ]*" title="Only Alphabets Allowed"
                                {...field}

                                className={classnames("form-control", {
                                  "is-invalid": data !== null && data.guestName === null,
                                })}
                              />
                            )}
                          />
                        </InputGroup>
                      </div>
                    </Col>
                  )}
                  <Col>
                    <div className='form-check form-switch'>
                      <Input
                        type='switch'
                        name='kotSwitch'
                        id='kotSwitch'
                        checked={isChecked}
                        onChange={handleDropdownChange}

                      // onChange={(e) => setShowNCKOTCol(e.target.checked)}
                      />
                      <Label for='kotSwitch' className='form-check-label'>
                        Non Chargeable KOT
                      </Label>
                    </div>
                  </Col>
                  {showNCKOTCol && (
                    <>
                      <Row>

                        <Col md='6' sm='12' className='mb-1'>
                          <br />
                          <div className="mb-1">
                            <Label className="form-label" for="KOTType">
                              KOT Type
                            </Label>
                            <Controller
                              id="KOTType"
                              control={control}
                              name="KOTType"
                              render={({ field }) => (
                                <Select
                                  required
                                  isClearable
                                  options={KOTTypeOptions}
                                  classNamePrefix="select"
                                  theme={selectThemeColors}
                                  className={classnames("react-select", {
                                    "is-invalid": data !== null && data.KOTType === null,
                                  })}
                                  {...field}

                                />
                              )}
                            />
                          </div>
                        </Col>

                        <Col md='6' sm='12' className='mb-1'>
                          <br />
                          <div className="mb-1">
                            <Label className="form-label" for="Departments">
                              Select Department
                            </Label>
                            <Controller
                              id="Departments"
                              control={control}
                              name="Departments"
                              render={({ field }) => (
                                <Select
                                  required
                                  isClearable
                                  options={DeptOptions}
                                  classNamePrefix="select"
                                  theme={selectThemeColors}
                                  className={classnames("react-select", {
                                    "is-invalid": data !== null && data.Departments === null,
                                  })}
                                  {...field}

                                />
                              )}
                            />
                          </div>
                        </Col>

                      </Row>
                      <Row>
                        <Col md='12' sm='12' className='mb-1'>
                          <div className="mb-1">
                            <Label className="form-label" for="NCKotReason">
                              Reason
                            </Label>
                            <InputGroup className="input-group-merge">
                              <Controller
                                id="NCKotReason"
                                name="NCKotReason"
                                control={control}
                                render={({ field }) => (
                                  <Input
                                    // pattern="[aA-zZ]*" title="Only Alphabets Allowed"
                                    placeholder="Enter Reason FOR NC KOT"

                                    {...field}
                                    required
                                    className={classnames("form-control", {
                                      "is-invalid": data !== null && data.guestName === null,
                                    })}
                                  />
                                )}
                              />
                            </InputGroup>
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}

                </Row>
                <Col>

                  <br />
                  {/* <div className="d-flex">
                <Button style={{ width: '50%', height: '50%', display: 'flex', justifyContent: 'center' }} className="me-1" type="submit" onClick={handleCancelTableOrder}>
                  Cancel
                </Button>
                <Button style={{ width: '50%', height: '50%', display: 'flex', justifyContent: 'center' }} className="me-1" color="primary" type="submit" >
                  Submit
                </Button>

              </div> */}
                  <div align='end' className='buttons'>
                    <Button outline className='me-1' color='secondary' onClick={handleCancelTableOrder}>
                      CANCEL
                    </Button>
                    <Button color='primary' className='me-1' type="submit" >
                      SUBMIT
                    </Button>
                  </div>
                </Col>
              </Form>
            </CardBody>
          </Card>

        </ModalBody>
      </Modal>

      <Modal
        isOpen={itemTransfer}
        // toggle={() => setItemTransfer(!itemTransfer)}
        // className='modal-dialog-centered'
        style={{ maxWidth: '600px', width: '80%', maxHeight: '600px', height: '60%' }}

        onCancel={() => setItemTransfer(false)}
        centered
        footer={null}
      >

        {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '100%', position: 'relative' }}> */}
        {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
          <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Transfer Table Order/Item</ModalHeader>
        </div> */}
        <div>
          <ModalHeader style={{ fontSize: '20px', fontWeight: 'bold' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Transfer Table Order/Item</span>
          </ModalHeader>
        </div>
        {/* <ModalHeader>
        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Transfer Table Order/Item</span>
        </ModalHeader> */}
        {/* </div> */}
        <ModalBody>
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit(handleItemtransfer1)}>
                {/* <Form> */}
                <Row style={{ paddingBottom: '30px' }}>
                  <Col sm='12' md='9' className='mb-1' style={{ fontWeight: 'bold' }}>
                    ITEM NAME : {transferedItem.itemName}
                  </Col>
                  <Col sm='12' md='3' className='mb-1' style={{ textAlign: 'end', fontWeight: 'bold', paddingRight: '40px' }}>
                    QTY : {transferedItem.qty}
                  </Col>
                </Row>
                <Row>
                  <Col sm='12' md='6' className='mb-1' >
                    <div className="mb-1">
                      <Label className="form-label" for="fromtable" style={{ fontSize: '14px', fontWeight: 'bold' }}>From Table <span className='text-danger'></span>
                      </Label>

                      <InputGroup className="input-group-merge">
                        <Controller
                          id="fromtable"
                          name="fromtable"
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
                              value={localStorage.getItem('TableSelected')}
                              readOnly
                              style={{ fontWeight: 'bold' }}
                            />
                          )}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                  <Col sm='12' md='6' className='mb-1' >
                    <Label className="form-label" for="totable" style={{ fontSize: '14px', fontWeight: 'bold', }}>To Table<span className='text-danger'>*</span>
                    </Label>
                    {/* <InputGroup className="input-group-merge"> */}
                    <Controller
                      id="totable"
                      name="totable"
                      control={control}
                      render={({ field }) => (
                        <Select
                          className='react-select'
                          required
                          isClearable
                          options={tableOptions.map(item => ({ value: item.TableID, label: item.TableID }))} placeholder="Select Table"
                          {...field}
                          style={{ width: '100%' }}
                        // className={classnames("form-control", {
                        //     // 'is-invalid': data !== null && (data.pickUpLocation === null || !data.pickUpLocation.length)
                        // })}
                        />
                      )}
                    />
                    {/* </InputGroup> */}
                  </Col>
                </Row>
                <Row>

                  <Col sm='12' md='12' className='mb-1' >
                    <div className="mb-1">
                      <Label className="form-label" for="reason" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        Reason <span className='text-danger'>*</span>
                      </Label>
                      <InputGroup className="input-group-merge">

                        <Controller
                          id="reason"
                          name="reason"
                          control={control}
                          render={({ field }) => (
                            <Input
                              required
                              placeholder="Reason for Item/Order transfer.."
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
                {/* <Row>
            <Col sm="12" md="6" className="mb-2" >
              <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={handleTransferCancel}>
                CANCEL
              </Button>
            </Col>
            <Col sm="12" md="6" className="mb-2" >
              <Button className="me-1" color="primary" style={{ width: "100%" }} type="submit" >
                SUBMIT
              </Button>
            </Col>

          </Row> */}
                <div align='end' className='buttons'>
                  <Button outline className='me-1' color='secondary' onClick={handleTransferCancel}>
                    CANCEL
                  </Button>
                  <Button color='primary' className='me-1' type="submit" >
                    SUBMIT
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={tableTransfer}
        // toggle={() => setTableTransfer(!tableTransfer)}
        style={{ maxWidth: '600px', width: '80%', maxHeight: '600px', height: '60%' }}
        // className='modal-dialog-centeredl-mg'
        onCancel={() => setTableTransfer(false)}
        centered
        footer={null}
      >

        {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '100%', position: 'relative' }}> */}
        {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
          <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Transfer Table Order/Item</ModalHeader>
        </div> */}
        <div>
          <ModalHeader style={{ fontSize: '20px', fontWeight: 'bold' }}>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Transfer Table Order/Item</span>
          </ModalHeader>
        </div>
        {/* </div> */}
        <ModalBody>
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit(handleTransferTable1)}>
                {/* <Form> */}

                <Row>
                  <Col sm='12' md='6' className='mb-1' >
                    <div className="mb-1">
                      <Label className="form-label" for="fromtable1" style={{ fontSize: '14px', fontWeight: 'bold' }}>From Table <span className='text-danger'></span>
                      </Label>

                      <InputGroup className="input-group-merge">
                        <Controller
                          id="fromtable1"
                          name="fromtable1"
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
                              value={localStorage.getItem('TableSelected')}
                              readOnly
                              style={{ fontWeight: 'bold' }}
                            />
                          )}
                        />
                      </InputGroup>
                    </div>
                  </Col>
                  <Col sm='12' md='6' className='mb-1'  >
                    <Label className="form-label" for="totable1" style={{ fontSize: '14px', fontWeight: 'bold' }}>To Table<span className='text-danger'>*</span>
                    </Label>
                    {/* <InputGroup className="input-group-merge"> */}
                    <Controller
                      id="totable1"
                      name="totable1"
                      control={control}
                      render={({ field }) => (
                        <Select
                          className='react-select'
                          required
                          isClearable
                          options={tableOptions.map(item => ({ value: item.TableID, label: item.TableID }))}
                          placeholder="Select Table"
                          {...field}
                          style={{ width: '100%' }}
                        // className={classnames("form-control", {
                        //     // 'is-invalid': data !== null && (data.pickUpLocation === null || !data.pickUpLocation.length)
                        // })}
                        />
                      )}
                    />
                    {/* </InputGroup> */}
                  </Col>
                </Row>
                <Row>

                  <Col sm='12' md='12' className='mb-1'  >
                    <div className="mb-1">
                      <Label className="form-label" for="reasontabletransfer" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        Reason <span className='text-danger'>*</span>
                      </Label>
                      <InputGroup className="input-group-merge">

                        <Controller
                          id="reasontabletransfer"
                          name="reasontabletransfer"
                          control={control}
                          render={({ field }) => (
                            <Input
                              required
                              placeholder="Reason for Item/Order transfer.."
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
                {/* <Row>
            <Col sm="12" md="6" className="mb-2"  style={{paddingLeft:'40px'}}>
              <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={handleTableTransferCancel} >

                CANCEL
              </Button>
            </Col>
            <Col sm="12" md="6" className="mb-2" style={{paddingRight:'40px'}}>
              <Button className="me-1" color="primary" style={{ width: "100%" }} type="submit" >
                SUBMIT
              </Button>
            </Col>

          </Row> */}
                <div align='end' className='buttons'>
                  <Button outline className='me-1' color='secondary' onClick={handleTableTransferCancel}>
                    CANCEL
                  </Button>
                  <Button color='primary' className='me-1' type="submit">
                    SUBMIT
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={inhouseGuestModal}
        toggle={() => setinhouseGuestModal(!inhouseGuestModal)}
        className='modal-dialog-centered modal-lg'
        onCancel={() => setinhouseGuestModal(false)}
        centered
        footer={null}
      >
        {/* ... Modal content here ... */}
        {/* <ModalBody style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}> */}
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

      <Modal
        isOpen={showIHGuestDataModal}
        toggle={() => setshowIHGuestDataModal(false)}
        className='modal-dialog-centered'
        centered
        footer={null}
      >

        <ModalHeader className='modal-lg' >
        <h5 style={{ fontSize: '20px', fontWeight: 'bold'}}><b>Guest Details</b></h5>
        </ModalHeader>
        <ModalBody className='pb-3 px-sm-1 mx-20'>

          <div>
            <Row>
              <Col>
                <h5><b> Guest Name :       </b> {ihGuestdata.guestName}</h5>
                <h5><b> Arrival Date :       </b> {ihGuestdata.arrivalDate}</h5>
                <h5><b> Departure Date :     </b> {ihGuestdata.departureDate}</h5>
                <h5><b> Room :     </b> {ihGuestdata.roomNumber}</h5>
                <h5><b> Adult + Child :   </b> {ihGuestdata.numberOfAdults} + {ihGuestdata.numberOfChildren}</h5>
                <h5><b> Reservation Status :     </b> {ihGuestdata.reservationStatus}</h5>
                <h5><b> Company :     </b> {ihGuestdata.accountName}</h5>
                <h5><b> Extra :     </b> {ihGuestdata.Extra}</h5>
                <h5><b> Comments :     </b> {ihGuestdata.comments}</h5>
              </Col>
            </Row>

          </div>




          <div align='end' className='buttons'>
            <Button outline className='me-1' color='secondary' onClick={() => setshowIHGuestDataModal(false)}>
              CANCEL
            </Button>
          </div>


          {/* </div> */}

        </ModalBody>

      </Modal>

    </div>
  );
};

export default ValidationThirdPartyComponents;

