
// ** Third Party Components
import InputNumber from 'rc-input-number'
import { Plus, Minus } from 'react-feather'
import React, { Component } from 'react';
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { useNavigate } from "react-router-dom";
// ** Custom Components

import Avatar from "@components/avatar";
import API_URL from "../../../../config";


const Previous = () => {
    return <span outline className='align-middle d-none d-md-inline-block'>Prev</span>
}

const f = () => {
    return <span className='align-middle d-none d-md-inline-block'>Next </span>
}

// ** React Imports
import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
import * as ReactDOM from 'react-dom';
// ** MUI Imports
import { Alert, Table } from 'reactstrap'

import { AiOutlineVerticalAlignBottom } from "react-icons/ai";

// import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller, set } from "react-hook-form";
// import App from "./waitListDataTable";
import Moment from 'moment';

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
import { IoMdPrint } from "react-icons/io";



import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

// ** Reactstrap Imports
import {
    Input,
    // Card,
    Form,
    Modal,
    Label,
    Button,
    CardBody,
    CardTitle,
    CardHeader,
    ModalBody,
    ModalFooter,
    ModalHeader,
    InputGroup,
    InputGroupText,
    Row,
    Col
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { selectThemeColors } from "@utils";
import { Card, Select } from 'antd';
import { fontFamily } from '@mui/system';
import { HiOutlineMinusCircle } from "react-icons/hi";

const { Option } = Select;
let menuGroupOptions = [
    // fetchx(API_URL+'/getmenugrouplist?hotelID=1&storeID=1')
    //     .then(result => result.json())
    //     .then(resp => {
    //         menuGroupOptions = resp['data']
    //     })
]
let menuitemOptions = [
    //   fetchx(API_URL+'/getmenuitemslist?menu=WINES')
    //   .then(result => result.json())
    //   .then(resp => {
    //     menuitemOptions = resp
    //   })


]
let itemOptions = []
// let StewardlistOptions = [
//     fetchx(API_URL + '/getstewardlist?hotelID=1&storeID=1')
//         .then(result => result.json())
//         .then(resp => {
//             StewardlistOptions = resp['data']
//         })


// ]

let id = 1;
const defaultValues = {
    itemname: '',
    classification: '',
    baseprice: '',
    specialInstruction: '',
}


let foodTypeOptions = []
fetchx(API_URL + '/getCategoriesForStore?hotelID=1')
  .then(result => result.json())
  .then(rowData => {
    const responseData = rowData['data'];
    if (Array.isArray(responseData)) {
        foodTypeOptions = responseData.map(item => ({
        value:item.category,
        label: item.category,
      }));
    }
  })

  
const ValidationThirdPartyComponents = ({getordersAmount}) => {
    let navigate = useNavigate();
    const [previewdata, setpreviewdata] = useState('')
    const [pastKOT, setpastKOT] = useState('')
    const [KOTNo, setKOTNo] = useState([])
    const [showKOT, setshowKOT] = useState(false)
    const [confirmorder, setconfirmorder] = useState(false)
    const [PAX, setPAX] = useState(false)
    const [Steward, setSteward] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [Mgroupfetch, setMgroupfetch] = useState(false)
    const [SplInc, setSplInc] = useState(false)
    const [SubItemList, setSubItemList] = useState('')
    const [showSubItem, setShowSubItem] = useState(false)
    const [data, setdata] = useState()
    const [reloadtable, setreloadtable] = useState(true);
    const [orderbtn, setorderbtn] = useState(false);
    const [selecteditem, setselecteditem] = useState("");
    const [rowData, setRowData] = useState();
    const [tableData, setTableData] = useState([]);
    const [currentPageMgroup, setcurrentPageMgroup] = useState(1);
    const [buttonsPerPage, setButtonsPerPage] = useState(10);
    const [currentPageMitem, setcurrentPageMitem] = useState(1);
    const [showitems, setshowitems] = useState(false)
    const [reload, setreload] = useState(true);

    // console.log(tableData)
    const addTableRow = (hotelID, storeID, itemID, subItemID, itemName, taxGroup, basePrice, foodType, menugroup) => {
        const newId = id
        const newRow = { hotelID: hotelID, storeID: localStorage.getItem('storeID'), billNo: 1, kotNo: 1, tableNo: localStorage.getItem('TableSelected'), itemID: itemID, subItemID: subItemID, itemName: itemName, qty: 1, taxGroup: taxGroup, unitPrice: basePrice, classification: foodType, menuGroup: menugroup, billStatus: "Not Billed", orderStatus: "Confirmed", pax: 4, steward: "John", addPOSuser: "admin", modifiedPOSuser: "abc", sessionTime: "Mrng" };
        setTableData(tableData => [...tableData, newRow]);

        // setTableData([...tableData, newRow]);
    };
    //Added Extra
    const [rowDataOnFetch, setrowDataOnFetch] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [openCart, setOpencart] = useState(false)
    const [openInst, setopenInst] = useState(false)
    const [opensplInst, setOpensplInst] = useState(false)
    const [addCartData, setaddCartData] = useState(null)
    const [previewOrderdata, setpreviewOrderdata] = useState('')
    const [isNewCardOpen, setIsNewCardOpen] = useState(true);
    const [isAllOrderModalOpen, setIsAllOrderModalOpen] = useState(false);
    const [pastKOT1, setpastKOT1] = useState('')
    const [voidkotModal, setvoidkotModal] = useState(false)
    const [modifyItem, setmodifyItem] = useState(false)
    const [kotData, setKotData] = useState([]);
    const [isKOTPop, setisKOTPop] = useState(false)
    const [billInfoModal, setbillInfoModal] = useState(false)
    const [kotConfirmPopup, setkotConfirmPopup] = useState(false)
    const [openInvoice, setopenInvoice] = useState(false)
    const [StewardlistOptions, setStewardlistOptions] = useState([])
    const [reprintkotModal, setreprintkotModal] = useState(false)
    const [voidBillModal, setvoidBillModal] = useState(false)
    const [modifyqtymodal, setmodifyqtymodal] = useState(false)
    const [kotmodifykotData, setKotmodifykotData] = useState([])
    const [isValueClick, setIsValueClick] = useState(false);



    useEffect(() => {
        fetchx(API_URL + '/getmenugrouplist?hotelID=1&storeID=' + localStorage.getItem('storeID'))
            .then(result => result.json())
            .then(resp => {
                menuGroupOptions = resp['data']
                setMgroupfetch(true)
            })
        fetchx(API_URL + '/getstewardlist?hotelID=1&storeID=1')
            .then(result => result.json())
            .then(resp => {
                setStewardlistOptions(resp['data'])
            })

    }, []);
    function Items({ items }) {
        const buttonsPerPage = 6;
        const [currentPageMitem, setCurrentPageMitem] = useState(1);

        const indexOfLastButton = currentPageMitem * buttonsPerPage;
        const indexOfFirstButton = indexOfLastButton - buttonsPerPage;
        const currentButtons = items.slice(indexOfFirstButton, indexOfLastButton);

        const handlePreviousPage = () => {
            if (currentPageMitem > 1) {
                setCurrentPageMitem(currentPageMitem - 1);
            }
        };

        const handleNextPage = () => {
            if (indexOfLastButton < items.length) {
                setCurrentPageMitem(currentPageMitem + 1);
            }
        };

        return (
            <div>
                {currentButtons.map((button, index) => (
                    <Button
                        key={index}
                        className="me=0.5"
                        id={index}
                        name="bt"
                        color="primary"
                        onClick={() => {
                            // handlemenulist(index, items);
                            handlemenulist(indexOfLastButton - buttonsPerPage + index, items);

                        }}
                        style={{
                            'margin-right': '10px',
                            'margin-bottom': '10px',
                            width: '150px',
                            height: '100px',
                        }}
                    >
                        {button.itemName}
                    </Button>
                ))}
                <div>
                    <Button onClick={handlePreviousPage} disabled={currentPageMitem === 1} color="secondary"
                    >
                        Prev
                    </Button>
                    <span style={{ width: '10px', display: 'inline-block' }}></span>
                    <Button
                        onClick={handleNextPage}
                        disabled={indexOfLastButton >= items.length} color="primary"

                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
    // function Items({ items }) {

    //     const array = []

    //     for (var i = 0; i <= items.length - 1; i++) {
    //         let itemslist = items[i]['itemName']
    //         const btnid = i
    //         array.push(
    //         <Button className="me=0.5"
    //                 id={btnid}
    //                 name="bt"
    //                 color="primary"
    //                 // background='#FF0000'
    //                 onClick={() => {
    //                     handlemenulist(btnid, items)
    //                 }} style={{ 'margin-right' : '10px',
    //                 'margin-bottom' :'10px',width:'150px',height:'100px',}}
    //             >
    //                 {itemslist}
    //             </Button>)
    //     }

    //     return array

    //     // const indOfLastBtn = currentPageMitem * buttonsPerPage;
    //     // const indOfFirstBtn = indOfLastBtn - buttonsPerPage;
    //     // const currBtns = items.slice(indOfFirstBtn, indOfLastBtn);
    //     // return (
    //     //     <div>
    //     //         {currBtns.map((btn, i) => (
    //     //             //   <button key={button.id}>{button.label}</button>
    //     //             <div className='inline-spacing' style={{ margin: '6px 0', paddingLeft: '10px' }}>
    //     //                 <Button className="me-1 menugroup-btn"
    //     //                     id={i}
    //     //                     name="bt"
    //     //                     color="primary"
    //     //                     onClick={() => {
    //     //                         handlemenulist({ i }, items)
    //     //                     }}
    //     //                 >{btn.value}</Button></div>
    //     //         ))}
    //     //         <div>
    //     //             <Button onClick={() => setcurrentPageMitem(currentPageMitem - 1)} disabled={currentPageMitem === 1}>Prev</Button>
    //     //             <Button onClick={() => setcurrentPageMitem(currentPageMitem + 1)} disabled={indOfLastBtn >= items.length}>Next</Button>
    //     //         </div>
    //     //     </div>)
    // }

    function SubItems({ items }) {
        const array = []

        for (var i = 0; i <= items.length - 1; i++) {
            // console.log((menuitemOptions[i]))
            let itemslist = items[i]['itemName']
            const btnid = i
            array.push(
                <Button className="me=0.5"
                    id={btnid}
                    name="bt"
                    color="primary"
                    onClick={() => {
                        handlesubitem(btnid, items)
                    }} style={{
                        'margin-right': '10px',
                        'margin-bottom': '10px'
                    }}
                >
                    {itemslist}
                </Button>)
        }

        return array

        // const indOfLastBtn = currentPageMitem * buttonsPerPage;
        // const indOfFirstBtn = indOfLastBtn - buttonsPerPage;
        // const currBtns = items.slice(indOfFirstBtn, indOfLastBtn);
        // return (
        //     <div>
        //         {currBtns.map((btn, i) => (
        //             //   <button key={button.id}>{button.label}</button>
        //             <div className='inline-spacing' style={{ margin: '6px 0', paddingLeft: '10px' }}>
        //                 <Button className="me-1 menugroup-btn"
        //                     id={i}
        //                     name="bt"
        //                     color="primary"
        //                     onClick={() => {
        //                         handlemenulist({ i }, items)
        //                     }}
        //                 >{btn.value}</Button></div>
        //         ))}
        //         <div>
        //             <Button onClick={() => setcurrentPageMitem(currentPageMitem - 1)} disabled={currentPageMitem === 1}>Prev</Button>
        //             <Button onClick={() => setcurrentPageMitem(currentPageMitem + 1)} disabled={indOfLastBtn >= items.length}>Next</Button>
        //         </div>
        //     </div>)
    }
    // useEffect(() => {
    //     fetchx(`http://localhost:8000/getAllPackage?hotelID=${id}`)
    //       .then((result) => result.json())
    //       .then((rowData) => {
    //         setRowData(rowData['data'])
    //         setrowDataOnfetchx(rowData['data'])
    //         setrowDataOnVehiclefetchx(rowData['data'])
    //       })
    //   }, [])

    /* Added by WBRO */

    useEffect(() => {
        fetchx(API_URL + '/getstoremenuitems?hotelID=1&storeID=' + localStorage.getItem('storeID'))
            .then((result) => result.json())
            .then((rowData) => {
                //console.log(rowData);
                setrowDataOnFetch(rowData['data']);
            });
    }, []);

    // const handleDropdownChange = (value) => {
    //     // console.log(value)
    //     console.log(value)
    //     const data = JSON.parse(value);
    //     setSelectedItems(value);
    //     // const result = window.confirm('Are you sure you want to proceed?');
    //     // if (result) {
    //         fetchx(API_URL+'/additem', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             "hotelID": data.hotelID,
    //             "storeID": data.storeID,
    //             "orderID": localStorage.getItem('orderID'),
    //             "tableNo": localStorage.getItem('TableSelected'),
    //             "itemID": data.itemID,
    //             "subItemID": 0,
    //             "itemName": data.itemName,
    //             "qty": 1,
    //             "unitPrice": data.basePrice
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((post) => {
    //             console.log(post);
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    //         addTableRow(data.hotelID, data.storeID, data.itemID,0, data.itemName,data.taxGroup,data.basePrice, data.foodType,data.menuGroup)
    //         setorderbtn(false)

    //     // }
    //     // else{
    //     //     console.log('Cancelled');
    //     // }



    // };
    function splinst(row, index) {
        // console.log(row, index)
        setOpensplInst(true)
        localStorage.setItem('itemID', row.itemID)
        // console.log(row.itemID)
    }

    const handleOrderRowClick = () => {
        handleSubmit((data) => {
            // console.log(data)
            setaddCartData(data)
            // console.log(resp['data']['ItemID'])
            let cartData = {};
            if (localStorage.getItem('TableSelected') != null) {
                const basePrice = data.baseprice ? parseFloat(data.baseprice).toFixed(2) : '';
                //console.log(data);
                cartData = JSON.stringify({
                    "hotelID": 1,
                    "storeID": localStorage.getItem('storeID'),
                    "orderID": localStorage.getItem('orderID'),
                    "tableNo": localStorage.getItem('TableSelected'),
                    "itemID": localStorage.getItem('itemID'),
                    "specialInstruction": data.specialInstruction,
                    "subItemID": 0,
                });
                // console.log(cartData)
            }
            let res = fetchx(API_URL + '/updateItemInstruction', {
                method: 'PUT',
                body: cartData,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {

                    if (post['statuscode'] == 200) {
                        setOpensplInst(false)

                        // toast(
                        //     <div className="d-flex">
                        //         <div className="me-1">
                        //             <Avatar size="sm" color="success" icon={<Check size={12} />} />
                        //         </div>
                        //         <div className="d-flex flex-column">
                        //             <h6>special Instruction Added!</h6>
                        //         </div>
                        //     </div>
                        // );
                        const swalInstance = MySwal.fire({
                            text: 'special Instruction Added!!',
                            icon: 'success',
                            buttonsStyling: false,
                            confirmButtonText: 'Close',
                            customClass: {
                                confirmButton: 'btn btn-danger'
                            }
                        });
                        swalInstance.then((result) => {
                            if (result.isConfirmed) {
                                navigate('/apps/posconfiguration/Addorder');
                            }
                        });
                        // setTimeout(() => { navigate('/apps/posconfiguration/Addorder') }, 100);

                    }
                    else {
                        navigate('/apps/posconfiguration/Addorder')
                    }
                })
        })();
    }

    /*  Search & Select Dropdown item & adding to Cart  */
    const handleDropdownChange = (value) => {
        //console.log(value)
        setSelectedItems(JSON.parse(value));
        setShowModal(true);
    };
    //console.log(selectedItems)
    const confirmSubmit = () => {
        //console.log("hiiii")
        setShowModal(false);
        if (selectedItems) {
            const selectedDItem = selectedItems;
            //console.log(selectedDItem)

            // API call
            fetchx(API_URL + '/additem', {
                method: 'POST',
                body: JSON.stringify({
                    "hotelID": selectedDItem.hotelID,
                    "storeID": selectedDItem.storeID,
                    "orderID": localStorage.getItem('orderID'),
                    "tableNo": localStorage.getItem('TableSelected'),
                    "itemID": selectedDItem.itemID,
                    "subItemID": 0,
                    "itemName": selectedDItem.itemName,
                    "qty": 1,
                    "unitPrice": selectedDItem.basePrice
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {
                    //console.log(post);
                    // Perform any necessary actions after API call
                    addTableRow(selectedDItem.hotelID, selectedDItem.storeID, selectedDItem.itemID, 0, selectedDItem.itemName, selectedDItem.taxGroup, selectedDItem.basePrice, selectedDItem.foodType, selectedDItem.menuGroup);
                    setorderbtn(false);

                    fetchx(API_URL + '/getTempItemList?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
                        .then(result => result.json())
                        .then((resp) => {
                            //console.log(resp['data']);
                            setTableData(resp['data']);
                        })
                        .catch((err) => {
                            // Handle fetch error here
                            console.error(err);
                        });
                })
                .catch((err) => {
                    // Handle fetch error here
                    console.error(err);
                });
        }
    };

    const filterOptions = (inputValue, option) => {
        const optionText = String(option.props.children).toLowerCase();
        return optionText.includes(inputValue.toLowerCase());
    };
    /*  Search & Select Dropdown item & adding to Cart Ends */
    /* Function for Open Cart modal */
    function openItems() {
        setOpencart(true)
        //console.log("qwertyuiop")

    }

    const handleCartClick = () => {
        handleSubmit((data) => {
            setaddCartData(data)
            //console.log(data)
            let cartData = {};
            if (localStorage.getItem('TableSelected') != null) {
                const basePrice = data.baseprice ? parseFloat(data.baseprice).toFixed(2) : '';
                //console.log(data);
                cartData = JSON.stringify({
                    "hotelID": 1,
                    "storeID": localStorage.getItem('storeID'),
                    "tableNo": localStorage.getItem('TableSelected'),
                    "orderID": localStorage.getItem('orderID'),
                    "classification": data.classification,
                    "qty": data.quantity,
                    "itemName": data.itemname,
                    "basePrice": basePrice,
                    'createdBy': 'Roopa',
                    "subItemID": 0,
                });
                //console.log(cartData)
            }

            let res = fetchx(API_URL + '/addopenitem', {
                method: 'POST',
                body: cartData,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {
                    //console.log(post)
                    localStorage.setItem('orderID', post['data']['orderID'])
                    if (post['statuscode'] == 200) {
                        // toast(
                        //     <div className="d-flex">
                        //         <div className="me-1">
                        //             <Avatar size="sm" color="success" icon={<Check size={12} />} />
                        //         </div>
                        //         <div className="d-flex flex-column">
                        //             <h6>Item Added!</h6>
                        //         </div>
                        //     </div>
                        // );
                        const swalInstance = MySwal.fire({
                            text: 'Item Added!!',
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
                        navigate('/apps/posconfiguration/Addorder')
                    }
                })



        })();
    }
    /* Function end for Open Cart modal */
    const handleNewOrderClick = () => {
        setIsNewCardOpen(true)
        setIsAllOrderModalOpen(false)

    }
    function handlevoidKOT(row, index) {
        // console.log("+++++++++++++++++++++KOT VOID+++++++++++++++++++++++++++++++")
        localStorage.setItem('KOTNo', row.KOTNo)
        setvoidkotModal(true)
    }
    function handlereprintkot(row, index) {
        // console.log("+++++++++++++++++++++KOT VOID+++++++++++++++++++++++++++++++")
        sessionStorage.setItem('KOTNo', row.KOTNo)
        setreprintkotModal(true)
    }
    function handleCancelVoidClick() {
        setvoidkotModal(false)
    }

    function handleCancelreprintKOT() {
        setreprintkotModal(false)
    }

    const handleOnSubMitVoid = () => {
        // console.log("KOT Cancelled")
    }
    const onSubmit = (data) => {
        // Process the form data here
        // console.log(data);
        // console.log(data.reason)
        fetchx(API_URL + '/voidKOT', {
            method: 'PUT',
            body: JSON.stringify({
                "hotelID": 1,
                "storeID": localStorage.getItem('storeID'),
                "orderID": localStorage.getItem('orderID'),
                "tableNo": localStorage.getItem('TableSelected'),
                "kotNo": localStorage.getItem('KOTNo'),
                "reason": data.reason,

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((post) => {
                if (post['statuscode'] == 200) {
                    // toast(
                    //     <div className="d-flex">
                    //         <div className="me-1">
                    //             <Avatar size="sm" color="success" icon={<Check size={12} />} />
                    //         </div>
                    //         <div className="d-flex flex-column">
                    //             <h6>KOT Voided</h6>
                    //         </div>
                    //     </div>
                    // );
                    const swalInstance = MySwal.fire({
                        text: 'KOT Voided!!',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Close',
                        customClass: {
                            confirmButton: 'btn btn-danger'
                        }
                    });
                    // setTimeout(() => { navigate('/apps/posconfiguration/Addorder') }, 100);
                    // voidkotModal
                    setvoidkotModal(false)
                    fetchx(API_URL + '/getPastKOT?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
                        .then(result => result.json())
                        .then(resp => {
                            // console.log(resp['data']);
                            if (resp['data'] === undefined) {
                                // const jsonData = {
                                //     text: 'No Items in Past KOT'
                                //   };
                                setpastKOT1('');
                                getordersAmount(0);

                                //   console.log(resp['data'])
                            } else {
                                setpastKOT1(resp['data']);
                                const orderstotalAmount = resp['data'].reduce((total, itemData) => {
                        
                                    const itemsAmount = itemData.items.reduce((itemTotal, item) => {
                                        const itemTotalAmount = item.qty * item.amount;
                                        return itemTotal + itemTotalAmount;
                                    }, 0);
                                    return total + itemsAmount;
                                }, 0);
                                console.log(orderstotalAmount)
                                getordersAmount(orderstotalAmount);

                            }
                        })
                        .catch(error => {
                            console.log('Error occurred while fetching data:', error);
                            // Handle the error condition, show an error message, or take appropriate action.
                        });
                    reset();
                }
                // console.log(post)
                // billNo = post['data']['billNo']

            })
            .catch((err) => {
                console.log(err.message);
            });


    };

    const reprintSubmit = (data) => {

        fetchx(API_URL + '/reprintKOT?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected') + '&KOTno=' + sessionStorage.getItem('KOTNo') + '&reprintReason=' + data.reprintreason)
            .then(result => result.json())
            .then((post) => {
                if (post['statuscode'] == 200) {

                    const swalInstance = MySwal.fire({
                        text: 'KOT reprinted!!',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Close',
                        customClass: {
                            confirmButton: 'btn btn-danger'
                        }
                    });

                    setreprintkotModal(false)
                    fetchx(API_URL + '/getPastKOT?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
                        .then(result => result.json())
                        .then(resp => {
                            if (resp['data'] === undefined) {

                                setpastKOT1('');
                                getordersAmount(0)
                            } else {
                                setpastKOT1(resp['data']);
                                const orderstotalAmount = resp['data'].reduce((total, itemData) => {
                        
                                    const itemsAmount = itemData.items.reduce((itemTotal, item) => {
                                        const itemTotalAmount = item.qty * item.amount;
                                        return itemTotal + itemTotalAmount;
                                    }, 0);
                                    return total + itemsAmount;
                                }, 0);
                                console.log(orderstotalAmount)
                                getordersAmount(orderstotalAmount);

                            }
                        })
                        .catch(error => {
                            console.log('Error occurred while fetching data:', error);
                        });
                    reset();
                }


            })
            .catch((err) => {
                console.log(err.message);
            });


    };

    function handlevoidItem(item, index1, index2) {
        // console.log(index1, index2)
        // console.log(pastKOT1[index1]['items'][index2])
        // console.log(pastKOT1)
        pastKOT1[index1]['items'][index2]['KOTNo'] = pastKOT1[index1]['KOTNo']
        setKotData(pastKOT1[index1]['items'][index2])
        // console.log(pastKOT1[index1]['items'][index2])
        // setKotData({ item, index });
        setmodifyItem(true)
    }
    function handleCancelItemClick() {
        setmodifyItem(false)
    }
    const handlePlusClick2 = (index) => {
        // console.log("++++++plus++++")
        document.getElementById("modifyqty" + kotData).value = parseInt(document.getElementById("modifyqty" + kotData).value) + 1
        kotData['modifyqty'] = document.getElementById("modifyqty" + kotData).value
        // console.log(kotData['modifyqty'])
    };
    const handleMinusClick2 = (index) => {
        // console.log("-------Minus------")
        if (parseInt(document.getElementById("modifyqty" + kotData).value) > 0) {
            document.getElementById("modifyqty" + kotData).value = parseInt(document.getElementById("modifyqty" + kotData).value) - 1
            kotData['modifyqty'] = document.getElementById("modifyqty" + kotData).value
            // console.log(kotData['modifyqty'])

        }
    }
    // console.log(kotData)
    function onSubmitModifyItem(data) {
        // console.log(JSON.stringify({
        //     "hotelID": 1,
        //     "storeID": localStorage.getItem('storeID'),
        //     "orderID": localStorage.getItem('orderID'),
        //     "tableNo": localStorage.getItem('TableSelected'),
        //     "itemID": kotData['itemID'],
        //     "subItemID": kotData['subItemID'],
        //     // "qty": kotData['modifyqty'],
        //     "qty": kotData['modifyqty'] !== undefined ? kotData['modifyqty'] : kotData['qty'], // Use modifyqty if available, else use qty
        //     'menuGroup': kotData['menuGroup'],
        //     'KOTno': kotData['KOTNo']
        // }))
        fetchx(API_URL + '/ModifyItem', {
            method: 'PUT',
            body: JSON.stringify({
                "hotelID": 1,
                "storeID": localStorage.getItem('storeID'),
                "orderID": localStorage.getItem('orderID'),
                "tableNo": localStorage.getItem('TableSelected'),
                "itemID": kotData['itemID'],
                "subItemID": kotData['subItemID'],
                // "qty": kotData['modifyqty'],
                "qty": kotData['modifyqty'] !== undefined ? kotData['modifyqty'] : kotData['qty'], // Use modifyqty if available, else use qty

                'menuGroup': kotData['menuGroup'],
                'KOTno': kotData['KOTNo']
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((resp) => {
                // console.log(resp);
                setmodifyItem(false)
                setIsNewCardOpen(false);
                setIsAllOrderModalOpen(true)
                setpastKOT1('')
                setKOTNo([])
                fetchx(API_URL + '/getPastKOT?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
                    .then(result => result.json())
                    .then(resp => {
                        // console.log(resp['data']);
                        if (resp['data'] === undefined) {
                            // const jsonData = {
                            //     text: 'No Items in Past KOT'
                            //   };
                            setpastKOT1('');
                            getordersAmount(0)
                            //   console.log(resp['data'])
                        } else {
                            setpastKOT1(resp['data']);
                            const orderstotalAmount = resp['data'].reduce((total, itemData) => {
                        
                                const itemsAmount = itemData.items.reduce((itemTotal, item) => {
                                    const itemTotalAmount = item.qty * item.amount;
                                    return itemTotal + itemTotalAmount;
                                }, 0);
                                return total + itemsAmount;
                            }, 0);
                            console.log(orderstotalAmount)
                            getordersAmount(orderstotalAmount);


                        }
                    })
                    .catch(error => {
                        console.log('Error occurred while fetching data:', error);
                        // Handle the error condition, show an error message, or take appropriate action.
                    });
                reset();

            });
        // setTimeout(() => { navigate('/apps/posconfiguration/Addorder') }, 100);

    }
    function billprint() {
        if (pastKOT1.length !== 0) {
            // console.log("Navigate")
            setbillInfoModal(true)
        }
        else {
            // alert("No Past KOT Available")

            const swalInstance = MySwal.fire({
                text: "No Past KOT Available",
                buttonsStyling: false,
                confirmButtonText: 'Close',
                customClass: {
                    confirmButton: 'btn btn-danger',
                },
            });

        }
        // localStorage.setItem("tableNumber",localStorage.getItem('TableSelected'))
        // navigate('/apps/posconfiguration/DisplayBill')
    }
    function handlePaymentPage() {
        // console.log(JSON.stringify({
        //     "hotelID": 1,
        //     "storeID": localStorage.getItem('storeID'),
        //     "orderID": localStorage.getItem('orderID')
        // }))
        fetchx(API_URL + '/getKOTType', {
            method: 'POST',
            body: JSON.stringify({
                "hotelID": 1,
                "storeID": localStorage.getItem('storeID'),
                "orderID": localStorage.getItem('orderID'),

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                result['data'].map((row, index) => {
                    if (row.orderType === 'NC KOT') {
                        // console.log("NC ORDER")
                        setopenInvoice(true)

                        // navigate('/apps/posconfiguration/Invoice')
                    } else {
                        // console.log("Normal Order")
                        navigate('/apps/posconfiguration/DisplayBill')
                        // console.log("hello");
                    }
                });

            })
            .catch((err) => {
                //console.log(err.message);
            });

        // navigate('/apps/posconfiguration/DisplayBill')
    }
    const handleStayhere = () => {
        navigate('/apps/posconfiguration/Addorder')
    }
    const handleTablePage = () => {
        navigate('/apps/posconfiguration/Tableselection')
    }
    const handleInvForm = () => {
        handleSubmit((formData) => {
            // console.log(formData)
            const invbill = JSON.stringify({
                "hotelID": 1,
                "storeID": localStorage.getItem('storeID'),
                "orderID": localStorage.getItem('orderID'),
                "tableNo": localStorage.getItem('TableSelected'),
                "FolioNo": 0,
                "guestName": formData["guestname"],
                "guestCompanyGSTno": formData["gstNo"],
                "mobileNo": formData["mobileNo"],
                "pax": formData['pax']
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
                    .then((post) => {
                        // console.log(post)
                        localStorage.setItem('BillNo', post['data']['BillNo'])
                        if (post['statuscode'] == 200) {
                            // toast(
                            //   <div className="d-flex">
                            //     <div className="me-1">
                            //       <Avatar size="sm" color="success" icon={<Check size={12} />} />
                            //     </div>
                            //     <div className="d-flex flex-column">
                            //       <h6>Item Added!</h6>
                            //     </div>
                            //   </div>
                            // );
                            // console.log(JSON.stringify({
                            //     "hotelID": 1,
                            //     "storeID": localStorage.getItem('storeID'),
                            //     "orderID": localStorage.getItem('orderID'),
                            //     "billNo": post['data']['BillNo'],
                            //     "signature": ''

                            // }))
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
                        setTimeout(() => { navigate('/apps/POSconfiguration/Invoice') }, 2000)
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
            }, 1000)

        })();

    }

    function handleCancelInvForm() {
        setopenInvoice(false)
        setbillInfoModal(false)
    }
    const handleVacantTabel = () => {
        // console.log("vacant Table")
        // console.log(JSON.stringify({
        //     "hotelID": 1,
        //     "storeID": localStorage.getItem('storeID'),
        //     "orderID": localStorage.getItem('orderID'),
        //     "tableNo": localStorage.getItem('TableSelected'),
        // }))
        fetchx(API_URL + '/closeOrder', {
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
            .then((post) => {
                // console.log(post)
                // billNo = post['data']['billNo']

            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    /*Code End WBRO */
    function handleClick(menu_group) {
        setshowitems(false);

        ReactDOM.render(<h6></h6>, document.getElementById("items"));

        fetchx(API_URL + '/getmenuitemslist?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&menuGroup=' + menu_group)
            .then(result => result.json())
            .then(resp => {
                // console.log(resp);
                const menuitemOptions = resp['data'];

                ReactDOM.render(<h4>Menu Items</h4>, document.getElementById("items"));
                setshowitems(true);

                ReactDOM.render(<Items items={menuitemOptions} />, document.getElementById("displayitems"));
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
            });
    }
    function Cart() {
        return (
            <>
                <h2>{selecteditem}</h2>
                <InputNumber id='basic-number-input' defaultValue={1} upHandler={<Plus />} downHandler={<Minus />} />
            </>
        )
    }
    function Addtocart() {
        // console.log("generate kot")
        // let kotarray = []
        // let itemlistarray = []
        // let qtyarray = []
        // let itemstr = ""
        // let qtystr = ""
        // fetchx(API_URL+'/getkotnumber?hotelID=1&storeID=1')
        //     .then(result => result.json())
        //     .then(resp => {
        //         // console.log(resp['data'])
        //         kotarray = resp['data']['KOTNo']

        //     })
        // console.log(JSON.stringify({
        //     "hotelID": 1,
        //     "storeID": localStorage.getItem('storeID'),
        //     "orderID": localStorage.getItem('orderID'),
        //     "tableNo": localStorage.getItem('TableSelected')
        // }))
        fetchx(API_URL + '/generateKOT', {
            method: 'POST',
            body: JSON.stringify({
                "hotelID": 1,
                "storeID": localStorage.getItem('storeID'),
                "orderID": localStorage.getItem('orderID'),
                "tableNo": localStorage.getItem('TableSelected')
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((post) => {
                // kotarray = post['data']['KOTNo']
                if (post['statuscode'] == 200) {
                    setreloadtable(false)
                    setTableData([])
                    setreloadtable(true)
                    setconfirmorder(false)
                    setkotConfirmPopup(true)

                    // toast(
                    //     <div className="d-flex">
                    //         <div className="me-1">
                    //             <Avatar size="sm" color="success" icon={<Check size={12} />} />
                    //         </div>
                    //         <div className="d-flex flex-column">
                    //             <h6>KOT Generated Successfully</h6>
                    //         </div>
                    //     </div>
                    // );
                    // setTimeout(() => { navigate('/apps/posconfiguration/Tableselection'); }, 2000)

                }

            })

            .catch((err) => {
                //console.log(err.message);
            });

        // for (let i = 0; i < tableData.length; i++) {
        //     setTimeout(() => {
        //         // console.log(kotarray)
        //         itemstr = itemstr + "," + (tableData[i]['itemName'])
        //         qtystr = qtystr + "," + (tableData[i]['qty'])
        //         // console.log(st)
        //         // itemlistarray.push(tableData[i]['itemName'])
        //         // qtyarray.push(tableData[i]['qty'])
        //         tableData[i]['kotNo'] = kotarray
        //         let orderitems = JSON.stringify(tableData[i])
        //         console.log(orderitems)
        //         let res = fetchx("http://122.166.2.21:14700/addtableorder", {
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             body: orderitems
        //         }).then((res) => {
        //             console.log(res);
        //             if(res.status==200){
        //                 setconfirmorder(!confirmorder)
        //                 toast(
        //                     <div className="d-flex">
        //                       <div className="me-1">
        //                         <Avatar size="sm" color="success" icon={<Check size={12} />} />
        //                       </div>
        //                       <div className="d-flex flex-column">
        //                         <h6>Item added Successfully</h6>
        //                       </div>
        //                     </div>
        //                   );
        //             }
        //         });
        //     }, 1000);
        //     if ((tableData.length - 1) == i) {
        //         // console.log(itemlistarray[0])
        //         // console.log(itemlistarray)
        //         setTimeout(() => {
        //             //   console.log(itemlistarray)
        //             // console.log(qtyarray)
        //             console.log(itemstr)

        //             let kotdata = {
        //                 "type": "Kitchen",
        //                 "Outlet_Name": "IRD",
        //                 "table_no": "1",
        //                 "steward_name": "Manjhar",
        //                 "pox": "3",
        //                 "KOT_NO": kotarray,
        //                 "item_name": itemstr.substring(1),
        //                 "qty": qtystr.substring(1),
        //                 "added_user": "24at43.bangalore",
        //                 "Kot_type": "NC_Kot",
        //                 "current_date": "29-Mar-23",
        //                 "current_time": "14:56",
        //                 "Username": "Dileep",
        //                 "Status": "added"
        //             }
        //             console.log(kotdata)

        //             // fetchx('https://103.89.8.26:3000/printing/?printdata={"type":"Kitchen","Outlet_Name":"IRD","table_no":"1","steward_name":"Manjhar","pox":"3","KOT_NO":"'+kotarray+'",'+'"item_name":"'+itemstr.substring(1)+'(SPL INS:Test do not prepare)","qty":"'+qtystr.substring(1)+'",'+'"added_user":"24at43.bangalore","Kot_type":"NC_Kot","current_date":"30-Mar-23","current_time":"14:56","Username":"Dileep","Status":"added"}')
        //             // .then(resp => {
        //             //   console.log(resp)
        //             //   // kotarray = resp

        //             // })
        //         }, 1000);
        //     }

        // }
        // setTimeout(() => { navigate('/apps/posconfiguration/Tableselection');},2000)

        // https://103.89.8.26:3000/printing/?printdata={"type":"Kitchen","Outlet_Name":"IRD","table_no":"1","steward_name":"Manjhar","pox":"3","KOT_NO":"17172","item_name":"TEA MASALA(SPL INS:Test do not prepare)","qty":"3","added_user":"24at43.bangalore","Kot_type":"NC_Kot","current_date":"29-Mar-23","current_time":"14:56","Username":"Dileep","Status":"added"}
    }
    function handlemenulist(menu_item, list) {
       
        var itemindex = menu_item
        //console.log(itemindex)
        //console.log(menuitemOptions)
        //console.log(list[itemindex])
        if (list[itemindex]['subItemStatus'] == 1) {
            //console.log('sub items present')
            fetchx(API_URL + '/getSubMenuItems?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&itemID=' + list[itemindex]['itemID'])
                .then(result => result.json())
                .then(resp => {
                    //console.log(resp['data'])
                    setSubItemList(resp['data'])
                    setShowSubItem(true)
                    setTimeout(() => { ReactDOM.render(<SubItems items={resp['data']} />, document.getElementById("displaysubitems")); }, 80);

                })

        }
        else {
            // console.log('sub items not present')

            fetchx(API_URL + '/additem', {
                method: 'POST',
                body: JSON.stringify({
                    "hotelID": list[itemindex]['hotelID'],
                    "storeID": list[itemindex]['storeID'],
                    "orderID": localStorage.getItem('orderID'),
                    "tableNo": localStorage.getItem('TableSelected'),
                    "itemID": list[itemindex]['itemID'],
                    "subItemID": 0,
                    "itemName": list[itemindex]['itemName'],
                    "qty": 1,
                    "unitPrice": list[itemindex]['basePrice']
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {
                    
                    console.log('1234567890')
                    console.log("post.statusCode")
                    fetchx(API_URL + '/getTempItemList?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
                        .then(result => result.json())
                        .then((resp) => {
                            console.log(resp);
                            setTableData(resp['data'])
                            setreloadtable(false)
                            setTimeout(() => { setreloadtable(true) })

                        });
                    //console.log(post)
                    // billNo = post['data']['billNo']
                    setIsNewCardOpen(true)
                    setIsAllOrderModalOpen(false)
                })
                .catch((err) => {
                    //console.log(err.message);
                });


            // setselecteditem(menu_item)
            // setTimeout(() => {  ReactDOM.render( <>
            //   <h6>{menu_item}
            //   <InputNumber id='basic-number-input' defaultValue={1} upHandler={<Plus />} downHandler={<Minus />} />
            //   </h6>
            //   </>,
            //    document.getElementById("addtocart"));}, 500);
            addTableRow(list[itemindex]['hotelID'], list[itemindex]['storeID'], list[itemindex]['itemID'], 0, list[itemindex]['itemName'], list[itemindex]['taxGroup'], list[itemindex]['basePrice'], list[itemindex]['foodType'], list[itemindex]['menugroup'])
            setorderbtn(false)
            //  console.log(orderbtn)

        }
    }


    function handlesubitem(sub_item, list) {
        // var itemindex = sub_item['i'] * currentPageMitem
        var itemindex = sub_item
        //console.log(itemindex)
        //console.log(menuitemOptions)
        //console.log(list[itemindex])

        fetchx(API_URL + '/additem', {
            method: 'POST',
            body: JSON.stringify({
                "hotelID": list[itemindex]['hotelID'],
                "storeID": list[itemindex]['storeID'],
                "orderID": localStorage.getItem('orderID'),
                "tableNo": localStorage.getItem('TableSelected'),
                "itemID": list[itemindex]['itemID'],
                "subItemID": list[itemindex]['id'],
                "itemName": list[itemindex]['itemName'],
                "qty": 1,
                "unitPrice": list[itemindex]['basePrice']
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((post) => {
                //console.log(post)
                // billNo = post['data']['billNo']

            })
            .catch((err) => {
                //console.log(err.message);
            });
        setShowSubItem(false)


        // setselecteditem(sub_item)
        // setTimeout(() => {  ReactDOM.render( <>
        //   <h6>{sub_item}
        //   <InputNumber id='basic-number-input' defaultValue={1} upHandler={<Plus />} downHandler={<Minus />} />
        //   </h6>
        //   </>,
        //    document.getElementById("addtocart"));}, 500);
        addTableRow(list[itemindex]['hotelID'], list[itemindex]['storeID'], list[itemindex]['itemID'], list[itemindex]['subItemID'], list[itemindex]['itemName'], list[itemindex]['taxGroup'], list[itemindex]['basePrice'], list[itemindex]['foodType'], list[itemindex]['menugroup'])
        setorderbtn(false)
        //  console.log(orderbtn)

    }
    // ** Hooks
    const { reset, handleSubmit, control, formState: { errors }
    } = useForm({});

    const [value, setValue] = useState(1);

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const handlePlusClick = (index) => {
        //console.log(index)

        // setValue(value + 1);
        //console.log("index")
        //console.log("subid" + tableData[index]['subItemID'])
        //console.log(tableData[index]['qty'])
        tableData[index]['qty'] = parseInt(tableData[index]['qty']) + 1
        //console.log(tableData[index]['qty'])
        //console.log("index")

        fetchx(API_URL + '/updateItemQty', {
            method: 'PUT',
            body: JSON.stringify({
                "hotelID": tableData[index]['hotelID'],
                "storeID": tableData[index]['storeID'],
                "orderID": localStorage.getItem('orderID'),
                "tableNo": localStorage.getItem('TableSelected'),
                "itemID": tableData[index]['itemID'],
                "subItemID": tableData[index]['subItemID'],
                "qty": tableData[index]['qty']
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((post) => {
                //console.log(post)
                // billNo = post['data']['billNo']

            })
            .catch((err) => {
                //console.log(err.message);
            });

    };

    const handlePlusClick1 = (index) => {
        // console.log('heloo')
        document.getElementById("qty" + index + "").value = parseInt(document.getElementById("qty" + index + "").value) + 1

        tableData[index]['qty'] = document.getElementById("qty" + index + "").value
        fetchx(API_URL + '/updateItemQty', {
            method: 'PUT',
            body: JSON.stringify({
                "hotelID": tableData[index]['hotelID'],
                "storeID": tableData[index]['storeID'],
                "orderID": localStorage.getItem('orderID'),
                "tableNo": localStorage.getItem('TableSelected'),
                "itemID": tableData[index]['itemID'],
                "subItemID": tableData[index]['subItemID'],
                "qty": tableData[index]['qty']
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((post) => {
                //console.log(post)
                // billNo = post['data']['billNo']

            })
            .catch((err) => {
                console.log(err.message);
            });


    }


    const handleMinusClick1 = (index) => {
        // console.log(index)

        document.getElementById("qty" + index + "").value = parseInt(document.getElementById("qty" + index + "").value) - 1

        if (parseInt(document.getElementById("qty" + index + "").value) == 0) {
            //console.log("delete item")
            //console.log(tableData)
            fetchx(API_URL + '/updateItemQty', {
                method: 'PUT',
                body: JSON.stringify({
                    "hotelID": tableData[index]['hotelID'],
                    "storeID": tableData[index]['storeID'],
                    "orderID": localStorage.getItem('orderID'),
                    "tableNo": localStorage.getItem('TableSelected'),
                    "itemID": tableData[index]['itemID'],
                    "subItemID": tableData[index]['subItemID'],
                    "qty": 0
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {
                    //console.log(post)
                    // billNo = post['data']['billNo']

                })
                .catch((err) => {
                    //console.log(err.message);
                });
            tableData.splice(index, 1);
            //console.log(tableData)

            setreloadtable(false)
            setTimeout(() => { setreloadtable(true) })

        }
        // setValue(value - 1);
        else if (parseInt(tableData[index]['qty']) > 0) {
            tableData[index]['qty'] = document.getElementById("qty" + index + "").value
            // //console.log(tableData[index])
            //console.log(tableData[index]['qty'])
            //console.log("index")

            fetchx(API_URL + '/updateItemQty', {
                method: 'PUT',
                body: JSON.stringify({
                    "hotelID": tableData[index]['hotelID'],
                    "storeID": tableData[index]['storeID'],
                    "orderID": localStorage.getItem('orderID'),
                    "tableNo": localStorage.getItem('TableSelected'),
                    "itemID": tableData[index]['itemID'],
                    "subItemID": tableData[index]['subItemID'],
                    "qty": tableData[index]['qty']
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {
                    //console.log(post)
                    // billNo = post['data']['billNo']

                })
                .catch((err) => {
                    //console.log(err.message);
                });
        };

    };

    const handleMinusClick = (index) => {
        //console.log(index)
        //console.log("index")

        //console.log(tableData[index]['qty'])
        // tableData[index]['qty'] = parseInt(tableData[index]['qty']) - 1
        // console.log(tableData[index]['qty'])
        // console.log("index")

        if (parseInt(tableData[index]['qty']) == 1) {
            //console.log("delete item")
            //console.log(tableData)
            fetchx(API_URL + '/updateItemQty', {
                method: 'PUT',
                body: JSON.stringify({
                    "hotelID": tableData[index]['hotelID'],
                    "storeID": tableData[index]['storeID'],
                    "orderID": localStorage.getItem('orderID'),
                    "tableNo": localStorage.getItem('TableSelected'),
                    "itemID": tableData[index]['itemID'],
                    "subItemID": tableData[index]['subItemID'],
                    "qty": 0
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {
                    //console.log(post)
                    // billNo = post['data']['billNo']

                })
                .catch((err) => {
                    console.log(err.message);
                });
            tableData.splice(index, 1);
            //console.log(tableData)

            setreloadtable(false)
            setTimeout(() => { setreloadtable(true) })

        }
        // setValue(value - 1);
        else if (parseInt(tableData[index]['qty']) > 0) {
            tableData[index]['qty'] = parseInt(tableData[index]['qty']) - 1
            // console.log(tableData[index])
            //console.log(tableData[index]['qty'])
            //console.log("index")

            fetchx(API_URL + '/updateItemQty', {
                method: 'PUT',
                body: JSON.stringify({
                    "hotelID": tableData[index]['hotelID'],
                    "storeID": tableData[index]['storeID'],
                    "orderID": localStorage.getItem('orderID'),
                    "tableNo": localStorage.getItem('TableSelected'),
                    "itemID": tableData[index]['itemID'],
                    "subItemID": tableData[index]['subItemID'],
                    "qty": tableData[index]['qty']
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json())
                .then((post) => {
                    //console.log(post)
                    // billNo = post['data']['billNo']

                })
                .catch((err) => {
                    console.log(err.message);
                });
        };
    }

    const addQaunity = (lineItemId, newQuanity) => {
        // commerce.cart.update(lineItemId, {quantity: newQuanity})
        //     .then(res => {
        //         setCart(res.cart)

        //     })
        setValue(value + 1);
        //console.log(lineItemId)
        //console.log(newQuanity)
    }
    const subtractQuanity = (lineItemId, newQuanity) => {
        // if (newQuanity === 0) {
        //     cartHelperFunctions.deleteItem(lineItemId)
        // } else {
        //     commerce.cart.update(lineItemId, {quantity: newQuanity})
        //         .then(res => {
        //             setCart(res.cart)
        //         })
        // }
        setValue(value - 1);
        //console.log(lineItemId)
        //console.log(newQuanity) 
    }
    /*Function for preview the order */
    useEffect(() => {
        fetchx(API_URL + '/getTempItemList?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
            .then(result => result.json())
            .then((resp) => {
                //console.log(resp['data']);
                setTableData(resp['data'])
            });
    }, [])
    /*Function end for preview the order */
    function CartTable() {
        const [showBreakCourse, setShowBreakCourse] = useState(false);

        const handleBreakCourseToggle = (index) => {
            const updatedTableData = [...tableData];
            updatedTableData[index].showBreakCourse = !updatedTableData[index].showBreakCourse;
            setShowBreakCourse(updatedTableData);
            var jsonStr = JSON.stringify(updatedTableData);
            // console.log(updatedTableData[index]['breakCourse'])
            // console.log("updatedTableData===" + jsonStr)
            fetchx(API_URL + '/addBreakCourse', {
                method: 'PUT',
                body: JSON.stringify({
                    "hotelID": updatedTableData[index]['hotelID'],
                    "storeID": updatedTableData[index]['storeID'],
                    "orderID": localStorage.getItem('orderID'),
                    "tableNo": localStorage.getItem('TableSelected'),
                    "itemID": updatedTableData[index]['itemID'],
                    "subItemID": updatedTableData[index]['subItemID'],
                    "breakCourse": updatedTableData[index]['showBreakCourse'].toString()
                }),

                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((res) => res.json()
                )

                .then((post) => {
                    // console.log(post);
                })
                .catch((err) => {
                    console.log(err.message);
                });
            // };
        };
        //console.log(tableData)
        return (
            // <div style={{ maxHeight: '50vh', maxWidth :'100vw', overflowY: 'auto' }}>
            <div>
                <Table >
                    {/* <div style={{ maxHeight: '550px', maxWidth :'100%', overflowY: 'auto' }}> */}
                    {/* <Card style={{ maxHeight: '650px', maxWidth :'100%', overflowY: 'auto' }}> */}


                    <thead style={{ maxWidth: '100vw', overflowY: 'auto' }} >
                        <tr>
                            {/* <th style={{ margin: '6px 0', paddingLeft: '10px' }} >
                            <div className='form-check'>
                                <Input
                                    type='checkbox'
                                    id='select-all'
                                    label=''
                                    checked={!!selectedRows.length}
                                    onChange={() => handleSelectAll()}
                                />
                            </div>
                        </th> */}
                            <th ></th>
                            <th colSpan={1} >ID</th>
                            <th colSpan={3} >Menuitem</th>
                            <th style={{paddingLeft:'7%'}} colSpan={2} >Quantity</th>
                            <th style={{paddingLeft:'10%'}} colSpan={1} >Unit Price</th>
                        </tr>
                    </thead>
                </Table>
                <div style={{ maxHeight: '55vh', maxWidth: '100vw', overflowY: 'auto' }}>
                    <Table>
                        <tbody>

                            {tableData.map((row, index) => (

                                <React.Fragment key={index}>
                                    <tr key={index}>
                                        {/* <td style={{ margin: '6px 0', paddingLeft: '10px' }} >
                                <div className='form-check'>
                                    <Input
                                        id={index}
                                        type='checkbox'
                                        onChange={() => handleSelect(index)}
                                        checked={!!selectedRows.includes(index)}
                                    />
                                </div>
                            </td> */}

                                        <td><AiOutlineVerticalAlignBottom size={18} colSpan={1} onClick={() => handleBreakCourseToggle(index)} /></td>

                                        <td style={{ margin: '6px 0', paddingLeft: '10px', textAlign: 'left' }} colSpan={1} id={"itemID" + index}>{row.itemID}</td>
                                        <td style={{ marginBottom: '6px', paddingLeft: '2px', textAlign: 'left' }} colSpan={3} id={"itemName" + index} onClick={() => splinst(row, index)}> {row.itemName}<br />
                                            {row.specialInstruction && (
                                                <div style={{ fontSize: '15px', fontStyle: 'italic', marginTop: '1px' }}>
                                                    <strong>{`(SPL INS: ${row.specialInstruction})`}</strong>
                                                </div>
                                            )}
                                        </td>



                                        {/* <td style={{ width: '10px' }}  id={"itemAdd" + index}><Button style={{ width: '10px' }} color='dark' onClick={() => { handlePlusClick1(index) }}>+</Button></td> */}
                                        {/* <td style={{ margin: '6px 0', paddingLeft: '10px' }}  ><Input style={{ width: '50px' }} type='number' disabled="true" id={"qty" + index} value={1}></Input></td> */}
                                        {/* <td style={{ margin: '6px 0', paddingLeft: '2px', textAlign: 'left' }} colSpan={2} onClick={() => handleInputClick(row, index)}>
                                        <InputNumber disabled={true} id={"qty" + index} value={tableData[index]['qty']} defaultValue={tableData[index]['qty']} 
                                        upHandler={<Plus onClick={() => { handlePlusClick1(index) }} />} 
                                        downHandler={<Minus onClick={() => { handleMinusClick1(index) }} />} /></td> */}

                                        {/* <td style={{ margin: '6px 0', paddingLeft: '2px', textAlign: 'left' }} colSpan={2}>
                                        <div onClick={() => handleInputClick(row, index)}>
                                            <InputNumber
                                            disabled={true}
                                            id={"qty" + index}
                                            value={tableData[index]['qty']}
                                            defaultValue={tableData[index]['qty']}
                                            upHandler={<Plus onClick={() => { handlePlusClick1(index) }} />}
                                            downHandler={<Minus onClick={() => { handleMinusClick1(index) }} />}
                                            />
                                        </div>
                                        </td> */}

                                        <td style={{ margin: '6px 0', paddingLeft: '2px', textAlign: 'left' }} colSpan={2}>
                                            <div
                                                onClick={() => handleInputClick(row,index)}
                                                onMouseDown={(e) => {
                                                    setIsValueClick(e.target.tagName === 'DIV');
                                                }}
                                                // onMouseUp={() => setIsValueClick(false)}
                                            >
                                                <InputNumber
                                                    disabled={true}
                                                    id={"qty" + index}
                                                    value={tableData[index]['qty']}
                                                    defaultValue={tableData[index]['qty']}
                                                    upHandler={<Plus onClick={() => { handlePlusClick1(index) }} />}
                                                    downHandler={<Minus onClick={() => { handleMinusClick1(index) }} />}
                                                />
                                            </div>
                                        </td>



                                        {/* <td style={{ margin: '6px 0', paddingLeft: '10px' }}  id={"itemMinus" + index}><Button color='dark' onClick={() => { handleMinusClick1(index) }}>-</Button></td> */}
                                        <td style={{ margin: '6px 0', paddingLeft: '10px', textAlign: 'left' }} colSpan={1} id={"price" + index}>{row.unitPrice}</td>

                                    </tr>
                                    {row.showBreakCourse && (
                                        <tr>
                                            <td colSpan={8} style={{ textAlign: 'center' }}>------------------------------------------------------------------------</td>
                                            {/* <th style={{ textAlign: 'center' }} colSpan={8}>------------------------------------------------------------------------</th> */}
                                        </tr>
                                    )}

                                </React.Fragment>


                            ))}
                        </tbody>
                    </Table>
                </div>
                {/* </Card>  */}
                {/* </Table> */}
            </div>
        )
    }


    function clear() {
        // console.log(tableData.length)
        // for(let i=0;i<tableData.length;i++){
        //     console.log(tableData[i])
        //     delete tableData[i]
        // }
        setreloadtable(false)
        // setTimeout(() => {
        setTableData([])
        setreloadtable(true)
        // },2000)
        //console.log(tableData)

    }
    function submitorder() {
        // 122.166.2.21:14676/getTempItemList?hotelID=1&storeID=1&orderID=3&tableNo=3
        fetchx(API_URL + '/getTempItemList?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
            .then(result => result.json())
            .then(resp => {
                // console.log("---------------------------Preview Data---------------------------------")
                // console.log(resp['data'])

                if (resp['data'].length === 0) {
                    // console.log("hi")
                    const swalInstance = MySwal.fire({
                        text: "Please Add Items to Cart!!",
                        buttonsStyling: false,
                        confirmButtonText: 'Close',
                        customClass: {
                            confirmButton: 'btn btn-danger',
                        },
                    });
                    swalInstance.then((result) => {
                        if (result.isConfirmed) {
                            navigate('/apps/posconfiguration/Addorder');
                        }
                    });
                    setconfirmorder(false)
                } else {
                    setpreviewdata(resp['data']);
                    setconfirmorder(true)
                }
                // setpreviewdata(resp['data'])
                // menuGroupOptions = resp['data']
                // console.log(menuGroupOptions)
            })

    }

    const handleAllOrderClick = () => {
        setIsNewCardOpen(false);
        setIsAllOrderModalOpen(true)
        setpastKOT1('')
        setKOTNo([])
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
                    const orderstotalAmount = resp['data'].reduce((total, itemData) => {
                        
                        const itemsAmount = itemData.items.reduce((itemTotal, item) => {
                            const itemTotalAmount = item.qty * item.amount;
                            return itemTotal + itemTotalAmount;
                        }, 0);
                        return total + itemsAmount;
                    }, 0);
                    console.log(orderstotalAmount)
                    getordersAmount(orderstotalAmount);
                }
            })
            .catch(error => {
                console.log('Error occurred while fetching data:', error);
                // Handle the error condition, show an error message, or take appropriate action.
            });
    };
    function getpastKOT() {
        setpastKOT('')
        setKOTNo([])
        // 122.166.2.21:14676/getPastKOT?hotelID=1&storeID=1&tableNo=1&orderID=3            
        fetchx(API_URL + '/getPastKOT?hotelID=1&storeID=' + localStorage.getItem('storeID') + '&orderID=' + localStorage.getItem('orderID') + '&tableNo=' + localStorage.getItem('TableSelected'))
            .then(result => result.json())
            .then(resp => {
                // console.log(resp['data'])
                //console.log(resp['data'][0]['KOTNo'])
                resp['data'].forEach(rowvalue => {
                    //console.log(rowvalue['items'])
                    setKOTNo(KOTNo => [...KOTNo, rowvalue['KOTNo'] + ","])
                    // let breakkot = { "itemID": '', "itemName": '------------------KOT No.' + rowvalue['KOTNo'] + '------', "qty": '-----------', "amount": '---------' }
                    let breakkot = {
                        "itemName": <span style={{ fontWeight: 'bold', fontSize: '14px' }}>KOT No# {rowvalue['KOTNo']}</span>
                    };
                    setpastKOT(pastKOT => [...pastKOT, breakkot])
                    // KOTNo.push(rowvalue['KOTNo'])
                    // setTableData(tableData => [...tableData, newRow]);
                    rowvalue['items'].forEach(item => {
                        setpastKOT(pastKOT => [...pastKOT, item])

                    })

                })
                // setpastKOT(resp['data'])
                //console.log(pastKOT)
                // menuGroupOptions = resp['data']
                // console.log(menuGroupOptions)
            })
        setshowKOT(true)
    }
    function pax() {
        setPAX(true)
        reset({
            noOfPeople: ""
        });
    }
    function steward() {
        setSteward(true)
        reset({
            Stewardlist: ""
        });
    }
    function remove() {
        if (selectedRows.length == 0) {
            alert("No item selected. Check it out!");
        }
        else {
            //console.log(selectedRows)
            //console.log(selectedRows.length)
            for (let i = selectedRows.length - 1; i >= 0; i--) {
                // delete tableData[selectedRows[i]]
                tableData.splice(selectedRows[i], 1);
                //console.log(selectedRows[i])
                if (i == 0) {
                    setSelectedRows([])
                }
            }

            setreloadtable(false)

            // setTableData([tableData])
            setTimeout(() => { setreloadtable(true) })

        }
    }
    const onSubmitPAX = data => {

        for (let i = 0; i < tableData.length; i++) {
            // console.log(tableData[i])
            tableData[i]['pax'] = data['noOfPeople']
        }
        // console.log(tableData)
    }
    const onSubmitSteward = data => {
        for (let i = 0; i < tableData.length; i++) {
            tableData[i]['steward'] = data['Stewardlist']['value']
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


    const handleVoidBill = () => {
        setvoidBillModal(true)
        console.log("clicked void bill")
    }


    const handleOnSubMitVoidBill = (data) => {
        console.log(JSON.stringify({
            "hotelID": 1,
            "storeID": localStorage.getItem('storeID'),
            "orderID": localStorage.getItem('orderID'),
            "tableNo": localStorage.getItem('TableSelected'),
            "reason": data.reason,

        }))
        console.log("inside onsubmit of the void Bill")
        fetchx(API_URL + '/voidOrder', {
            method: 'PUT',
            body: JSON.stringify({
                "hotelID": 1,
                "storeID": localStorage.getItem('storeID'),
                "orderID": localStorage.getItem('orderID'),
                "tableNo": localStorage.getItem('TableSelected'),
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
                        text: 'KOT Bill Voided!!',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Close',
                        customClass: {
                            confirmButton: 'btn btn-danger'
                        }
                    });
                    setTimeout(() => { navigate('/apps/posconfiguration/Tableselection') }, 100);

                    reset();
                }
                if(post['statusCode'] == 403) {
                    const swalInstance = MySwal.fire({
                        text: post['message'],
                        icon: 'error',
                        buttonsStyling: false,
                        confirmButtonText: 'Close',
                        customClass: {
                            confirmButton: 'btn btn-danger'
                        }
                        
                    });
                    // setTimeout(() => { navigate('/apps/posconfiguration/Tableselection') }, 100);
                    setvoidBillModal(false)

                }

            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const handleCancelVoidBillClick = () => {
        setvoidBillModal(false)
        console.log("inside cancel bill")

    }
    // const handleInputClick = (row, index) => {
    //     console.log(row['itemID'])
    //     sessionStorage.setItem('itemID', row['itemID'])
    //     console.log(row, index)
    //     setKotmodifykotData(row)
    //     setmodifyqtymodal(true)
    //     // console.log(kotData)
    //     // console.log("hi")
    // }

    const handleInputClick = (row,index) => {
        if (isValueClick) {
            sessionStorage.setItem('itemID', row['itemID'])
            setKotmodifykotData(row)
            setmodifyqtymodal(true)
        }
    };

    const handleonSubmitmodify = () => {

        // console.log("123456789", data);
        document.getElementById("modifyqty" + kotData).value = parseInt(document.getElementById('modifyqty').value)
        console.log(document.getElementById("modifyqty" + kotData).value)
        kotData['modifyqty'] = document.getElementById("modifyqty" + kotData).value
        console.log(JSON.stringify({
            "hotelID": 10,
            "storeID": localStorage.getItem('storeID'),
            "orderID": localStorage.getItem('orderID'),
            "tableNo": localStorage.getItem('TableSelected'),
            "itemID": sessionStorage.getItem('itemID'),
            "subItemID": 0,
            "qty": kotData['modifyqty']
        }))
        fetchx(API_URL + '/updateItemQty', {
            method: 'PUT',
            body: JSON.stringify({
                "hotelID": 10,
                "storeID": localStorage.getItem('storeID'),
                "orderID": localStorage.getItem('orderID'),
                "tableNo": localStorage.getItem('TableSelected'),
                "itemID": sessionStorage.getItem('itemID'),
                "subItemID": 0,
                "qty": kotData['modifyqty']
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => res.json())
            .then((post) => {
                console.log(post)
                navigate('')
                // billNo = post['data']['billNo']

            })
            .catch((err) => {
                //console.log(err.message);
            });

        setmodifyqtymodal(false)
    }
    const indexOfLastButton = currentPageMgroup * buttonsPerPage;
    const indexOfFirstButton = indexOfLastButton - buttonsPerPage;
    const currentButtons = menuGroupOptions.slice(indexOfFirstButton, indexOfLastButton);


    // const indOfLastBtn = currentPageMitem * buttonsPerPage;
    //     const indOfFirstBtn = indOfLastBtn - buttonsPerPage;
    //     const currBtns = menuitemOptions.slice(indOfFirstBtn, indOfLastBtn);
    return (
        <div>
            {/* <Card> */}
            {/* <div className='inline-spacing' align="right" style={{ margin: '2px 2px' }}>
                <Button.Ripple color='warning' size='sm' disabled={orderbtn} onClick={clear}>Clear</Button.Ripple>
                <Button.Ripple color='warning' disabled={orderbtn} size='sm' onClick={pax}>Pax</Button.Ripple>
                <Button.Ripple color='warning' disabled={orderbtn} size='sm' onClick={steward}>Steward</Button.Ripple>
                <Button.Ripple color='warning' size='sm' disabled={orderbtn} onClick={remove}>Remove</Button.Ripple>

            </div><br /> */}
            {/* </Card> */}
            <Row className='match-height'>

                <Col xl='7' md='6' xs='12' >
                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Select
                                style={{ width: 500 }}
                                value={selectedItems}
                                onChange={handleDropdownChange}
                                placeholder="Search items..."
                                filterOption={filterOptions}
                                showSearch
                                allowClear

                            >
                                {rowDataOnFetch.map((item) => (
                                    <Option key={item.id} value={JSON.stringify(item)}>

                                        {item.itemName} - {item.basePrice}

                                        <Button color='primary' size='sm' style={{ marginLeft: '10px' }}>
                                            Add
                                        </Button>
                                    </Option>
                                ))}
                            </Select>
                            <Button className="me-1" color="primary" size='lg' onClick={openItems} style={{ marginLeft: '20px', fontWeight: 'bold', fontSize: '16px' }}>
                                {/* <Button className="me-1" color="primary"  onClick={openItems}  style={{ fontWeight: 'bold', fontSize: '16px' }}> */}

                                Open Item
                            </Button>
                        </div>
                    </Card>



                    <Modal
                        isOpen={showModal}
                        onCancel={() => setShowModal(false)}
                        centered
                        footer={null}
                    >
                        <ModalBody className='px-5 pb-2'>
                            <div className='text-center mb-2'>
                                <h1 className='demo-space-y'><b>Are you sure?</b></h1>
                                <p>Do you want to proceed?</p>
                                {selectedItems && (
                                    <table style={{ margin: '10px auto' }}>
                                        <thead>
                                            <tr style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <th style={{ paddingRight: '20px' }}>ItemID</th>
                                                <th style={{ paddingRight: '20px' }}>Menu Item</th>
                                                <th>Unit Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ paddingRight: '20px' }}>{selectedItems.itemID}</td>
                                                <td style={{ paddingRight: '20px' }}><b>{selectedItems.itemName}</b></td>
                                                <td style={{ paddingRight: '20px' }}>{selectedItems.basePrice}</td>

                                            </tr>
                                        </tbody>
                                    </table>


                                )}

                            </div>
                            <div className="button-container text-center">
                                <Button className="me-1" color="primary" onClick={confirmSubmit}>
                                    Yes
                                </Button>
                                <Button className='bg-transparent' color="danger" onClick={() => setShowModal(false)}>
                                    No
                                </Button>
                            </div>
                        </ModalBody>
                    </Modal>


                    <Col >
                        <Card>

                            <br />
                            <h4 style={{ margin: '6px 0', paddingLeft: '10px' }}>Menu Group</h4>
                            <div >
                                <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px', maxHeight: '200px', overflow: 'auto' }}>
                                    {Mgroupfetch && currentButtons.map((button, index) => (
                                        //   <button key={button.id}>{button.label}</button>
                                        // <div className='inline-spacing' align='right' style={{ margin: '6px 0', paddingLeft: '10px' }} >
                                        <Button className="me-0.5"
                                            id={button.label}
                                            name="bt"
                                            color="primary"
                                            onClick={() => {
                                                handleClick(button.groupName)
                                            }} style={{
                                                'margin-right': '10px',
                                                'margin-bottom': '10px', width: '140px', height: '85px'
                                            }}

                                        >{button.groupName}<span class="MuiTouchRipple-root css-w0pj6f"></span></Button>

                                        // </div>
                                    ))}
                                </div>

                                <div className='inline-spacing' style={{ margin: '6px 0', paddingLeft: '10px' }}>
                                    <Button style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} onClick={() => setcurrentPageMgroup(currentPageMgroup - 1)} disabled={currentPageMgroup === 1} outline color='secondary'>Prev</Button>
                                    <Button style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} onClick={() => setcurrentPageMgroup(currentPageMgroup + 1)} disabled={indexOfLastButton >= menuGroupOptions.length} color='primary'>Next</Button>
                                </div>
                            </div>
                            {/* {getButtonsUsingForLoop(menuGroupOptions.length)} */}

                        </Card>
                    </Col>

                    <Col>
                        <Card><br />
                            <h4 style={{ margin: '6px 0', paddingLeft: '10px', maxHeight: '100%', overflow: 'auto' }} id="items">Menu Items</h4>
                            <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px' }}>

                                <div id="displayitems"></div>
                            </div>
                            {/* {showitems && 
                            <div>
                {currBtns.map((btn, i) => (
                    //   <button key={button.id}>{button.label}</button>
                    <div className="d-flex" >
                        <Button className="me-1 menugroup-btn"
                            id={i}
                            name="bt"
                            color="primary"
                            onClick={() => {
                                handlemenulist({i},menuitemOptions)
                            }}
                        >{btn.value}</Button></div>
                ))}
                <div>
                    <Button onClick={() => setcurrentPageMitem(currentPageMitem - 1)} disabled={currentPageMitem === 1}>Prev</Button>
                    <Button onClick={() => setcurrentPageMitem(currentPageMitem + 1)} disabled={indOfLastBtn >= menuitemOptions.length}>Next</Button>
                </div>
            </div>
} */}

                        </Card>
                    </Col>
                </Col>
                <Col xl='5' md='6' xs='12'>

                    <Row>

                        <Col>
                            <Button color="primary" style={{ 'margin-right': '10px', 'margin-bottom': '10px', width: '100%' }} size='lg' onClick={handleNewOrderClick} >New Order</Button>
                        </Col>
                        <Col>
                            <Button color="primary" style={{ 'margin-right': '10px', 'margin-bottom': '10px', width: '100%' }} size='lg' onClick={handleAllOrderClick}>All Orders</Button>

                        </Col>

                        {/* <Button style={{ color: 'warning', 'margin-right': '10px', 'margin-bottom': '10px', width: '100%' }} size='lg' onClick={handleVacantTabel}>Vacant Table</Button> */}


                    </Row>
                    {isNewCardOpen && (
                        <Card>

                            {reloadtable && <CartTable />}
                            <div className='demo-inline-spacing'>
                                <div>
                                    <div id="addtocart"></div>
                                    {/* <div style={{ margin: '6px 0', paddingLeft: '10px' }} className="d-flex"> */}
                                    <div style={{ margin: '6px 0', paddingLeft: '10px' }} className='buttons'>

                                        <Button style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} outline color="secondary" onClick={getpastKOT} className='me-1'>Past KOT</Button>
                                        <Button style={{ 'margin-right': '10px', 'margin-bottom': '10px' }} color="primary" disabled={orderbtn} onClick={submitorder} className='me-1'>Preview KOT</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {isAllOrderModalOpen && (
                        <React.Fragment>
                            <div>
                                <Table >
                                    <thead>
                                        <tr style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <th>Menuitem</th>
                                            <th style={{ paddingLeft: '20%' }}>Quantity</th>
                                            <th style={{ paddingLeft: '12%' }} colSpan="2"><Button color="danger" onClick={handleVoidBill} style={{ marginLeft: '10px' }}>Void Bill</Button></th>

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

                                                            <td style={{ textAlign: 'center' }}>
                                                                <HiOutlineMinusCircle
                                                                    size={25}
                                                                    color="red"
                                                                    onClick={() => handlevoidKOT(row, index)}
                                                                />
                                                            </td>
                                                            <td style={{ textAlign: 'right', paddingLeft: '12%' }}><IoMdPrint
                                                                size={25}
                                                                color="red"
                                                                onClick={() => handlereprintkot(row, index)}
                                                            />
                                                            </td>
                                                            <td id={'itemName' + index}>{row.itemName}
                                                            </td>
                                                            <td id={'qty' + index}>
                                                                <b>{row.qty}</b>
                                                            </td>
                                                        </tr>
                                                        {row.items.map((item, index2) => (
                                                            <tr key={index2} onClick={() => handlevoidItem(item, index, index2)}>
                                                                <td id={'itemName' + index2}>{item.itemName}
                                                                    {item.specialInstruction && (
                                                                        <div style={{ fontSize: '15px', fontStyle: 'italic', marginTop: '1px' }}>
                                                                            <strong>{`(SPL INS: ${item.specialInstruction})`}</strong>
                                                                        </div>
                                                                    )}
                                                                </td>
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
                                {/* </Table> */}
                            </div>
                            {/* <Card className='invoice-preview-card' style={{ width: '100%', marginTop: 'auto' }}> */}
                            {/* <CardBody className='invoice-padding pt-0' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}> */}
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto' }}>
                                <Button color="primary" style={{ width: '200px' }} onClick={billprint}>
                                    Generate Bill
                                </Button>
                            </div>
                            {/* </CardBody> */}
                            {/* </Card> */}
                        </React.Fragment>
                    )}
                    {/* {isAllOrderModalOpen && (
                        <Card className='invoice-preview-card' style={{ width: '100%', marginTop: 'calc(100vh - 55rem)' }}>
                            <CardBody className='invoice-padding pt-0' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                <Button color="warning" style={{ width: '200px' }} onClick={billprint}>
                                    Generate Bill
                                </Button>
                            </CardBody>
                        </Card>
                    )} */}
                </Col>


            </Row>

            <Modal
                isOpen={PAX}
                toggle={() => setPAX(!PAX)}
                className='modal-dialog-centered'
            // onClosed={() => setCardType('')}
            >
                <ModalHeader className='bg-transparent' toggle={() => setPAX(!PAX)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <h1 className='text-center mb-1'>Add Number of People</h1>
                    {/* <p className='text-center'>Add card for future billing</p> */}
                    <Form onSubmit={handleSubmit(onSubmitPAX)}>
                        <Col md='6' sm='12' className='mb-1'>
                            <div className="mb-1">
                                <Label className="form-label" for="noOfPeople">
                                    pax
                                </Label>
                                <InputGroup className="input-group-merge">
                                    <Controller
                                        id="noOfPeople"
                                        name="noOfPeople"
                                        control={control}

                                        render={({ field }) => (
                                            <Cleave
                                                pattern="[0-9]*" title="Only Numbers Allowed"
                                                placeholder="Enter no. of people"
                                                {...field}
                                                className={classnames("form-control", {
                                                    // "is-invalid":
                                                    //     data !== null && (data.noOfPeople === null || !data.noOfPeople.length)
                                                })}
                                            />
                                        )}
                                    />
                                </InputGroup>
                            </div>
                        </Col>

                        <Button type='submit' className='me-1' onClick={() => {
                            setPAX(!PAX)
                        }} color='primary' >
                            Submit

                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
            <Modal isOpen={Steward}
                toggle={() => setSteward(!Steward)}
                className='modal-dialog-centered'
            >
                <ModalHeader className='bg-transparent' toggle={() => setSteward(!Steward)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <h1 className='text-center mb-1'>Select steward</h1>
                    {/* <p className='text-center'>Add card for future billing</p> */}
                    <Form onSubmit={handleSubmit(onSubmitSteward)}>
                        <Col md='6' sm='12' className='mb-1'>
                            <div className="mb-1">
                                <Label className="form-label" for="Stewardlist">
                                </Label>
                                <Controller
                                    id="Stewardlist"
                                    control={control}
                                    name="Stewardlist"
                                    render={({ field }) => (
                                        <Select
                                            required
                                            isClearable
                                            options={StewardlistOptions}
                                            classNamePrefix="select"
                                            theme={selectThemeColors}
                                            className={classnames("react-select", {
                                                // "is-invalid": data !== null && data.Stewardlist === null,
                                            })}
                                            {...field}

                                        />
                                    )}
                                />
                            </div>
                        </Col>

                        <Button type='submit' className='me-1' onClick={() => {
                            setSteward(!Steward)
                        }} color='primary' >
                            Submit

                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
            {/* <Modal
                isOpen={confirmorder}
                className='modal-dialog-centered modal-lg'
            >
                <ModalHeader className='bg-transparent' toggle={() => setconfirmorder(!confirmorder)}>Confirm KOT Generation,Table #{localStorage.getItem('TableSelected')}</ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    
                    <div>
                        <Table responsive>
                            <thead>
                                <tr>

                                    <th >Menuitem</th>
                                    <th style={{ paddingLeft: '20%' }}>Quantity</th>
                                    <th style={{ paddingLeft: '8%' }}>Unit Price</th>
                                </tr>
                            </thead>
                        </Table>
                        <div style={{ maxHeight: '55vh', maxWidth: '100vw', overflowY: 'auto' }}>
                            <Table>
                                <tbody>
                                    {previewdata != '' &&
                                        previewdata.map((row, index) => (
                                            <>

                                                <tr key={index}>
                                                    <td id={"itemName" + index}>{row.itemName}
                                                        <br />
                                                        {row.specialInstruction && (
                                                            <div style={{ fontSize: '15px', fontStyle: 'italic', marginTop: '1px' }}>
                                                                <strong>{`(SPL INS: ${row.specialInstruction})`}</strong>
                                                            </div>
                                                        )}

                                                    </td>
                                                    <td id={"qty" + index} ><b>{row.qty}</b></td>
                                                    <td id={"price" + index}>{row.unitPrice}</td>

                                                </tr>

                                                {row.breakCourse == "true" && (
                                                    <tr>
                                                        <td colSpan={3} style={{ textAlign: 'center' }}>----------------------------------------------------------</td>
                                                    </tr>
                                                )}

                                            </>

                                        ))}
                                </tbody>
                            </Table>
                        </div><br /><br />
                        
                        <div align='end' className='buttons'>
                            <Button outline color='secondary' className='me-1' type='submit' onClick={() => { setconfirmorder(!confirmorder) }}>
                                Go back!
                            </Button>
                            <Button className='me-1' color='primary' onClick={Addtocart}>
                                Generate KOT
                            </Button>

                        </div>
                       
                    </div>
                </ModalBody>
            </Modal> */}
           <Modal
    isOpen={confirmorder}
    className='modal-dialog-centered modal-lg'
>
    <ModalHeader className='bg-transparent' toggle={() => setconfirmorder(!confirmorder)}>Confirm KOT Generation, Table #{localStorage.getItem('TableSelected')}</ModalHeader>
    <ModalBody className='px-sm-5 mx-50 pb-5'>
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ whiteSpace: 'nowrap' }}>Menuitem</th>
                        <th style={{ whiteSpace: 'nowrap' }}>Quantity</th>
                        <th style={{ whiteSpace: 'nowrap' }}>Unit Price</th>
                    </tr>
                </thead>
                <tbody>
                    {previewdata !== '' && previewdata.map((row, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    {row.itemName}
                                    {row.specialInstruction && (
                                        <div style={{ fontSize: '15px', fontStyle: 'italic', marginTop: '1px' }}>
                                            <strong>{`(SPL INS: ${row.specialInstruction})`}</strong>
                                        </div>
                                    )}
                                </td>
                                <td style={{ whiteSpace: 'nowrap' }}><b>{row.qty}</b></td>
                                <td style={{ whiteSpace: 'nowrap' }}>{row.unitPrice}</td>
                            </tr>
                            {row.breakCourse === "true" && (
                                <tr>
                                    <td colSpan={3} style={{ textAlign: 'center' }}>----------------------------------------------------------</td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </div>
        <div align='end' className='buttons'>
            <Button outline color='secondary' className='me-1' type='submit' onClick={() => { setconfirmorder(!confirmorder) }}>
                Go back!
            </Button>
            <Button className='me-1' color='primary' onClick={Addtocart}>
                Generate KOT
            </Button>
        </div>
    </ModalBody>
</Modal>

            <Modal
                isOpen={showKOT}
                // toggle={() => setshowKOT(!showKOT)}
                className='modal-dialog-centered'
            // onClosed={() => setCardType('')}
            >
                <ModalHeader className='bg-transparent' toggle={() => setshowKOT(!showKOT)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    {/* <h1 className='text-center mb-1'>Sub Items</h1> */}
                    {pastKOT != '' && <h6>Order ID : {localStorage.getItem('orderID')}</h6>}

                    {/* <p className='text-center'>Add card for future billing</p> */}
                    <Table >
                        <thead>
                            <tr style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <th>Menuitem</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {pastKOT != '' &&
                                pastKOT.map((row, index) => (
                                    <tr key={index}>
                                        <td id={"itemName" + index}>{row.itemName}</td>
                                        <td id={"qty" + index}><b>{row.qty}</b></td>
                                        <td id={"price" + index}>{row.amount}</td>

                                    </tr>

                                ))}
                        </tbody><br /><br /> */}
                        <tbody>
                            {pastKOT.length > 0 ? (
                                pastKOT.map((row, index) => (
                                    <tr key={index}>
                                        <td id={"itemName" + index}>{row.itemName}</td>
                                        <td id={"qty" + index}><b>{row.qty}</b></td>
                                        <td id={"price" + index}>{row.amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12" style={{ fontWeight: 'bold', textAlign: 'center', color: 'red' }}>
                                        No item for past KOT
                                    </td>
                                </tr>
                            )}
                        </tbody><br /><br />

                    </Table>
                    <div align='center'>
                        {/* <Button color="primary" style={{ align:'left','margin-right' : '10px','margin-bottom' :'10px'}}  onClick={Addtocart}>Generate KOT</Button>
                <Button type='submit' style={{ align:'right' ,'margin-right' : '10px','margin-bottom' :'10px'}}className='me-1' onClick={() => {setconfirmorder(!confirmorder)}} color='primary' >Go back!</Button> */}
                    </div>
                </ModalBody>
            </Modal>
            <Modal
                isOpen={showSubItem}
                toggle={() => setShowSubItem(!showSubItem)}
                className='modal-dialog-centered'
            // onClosed={() => setCardType('')}
            >
                <ModalHeader className='bg-transparent' toggle={() => setShowSubItem(!showSubItem)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <h1 className='text-center mb-1'>Sub Items</h1>
                    <div id="displaysubitems"></div>
                </ModalBody>
            </Modal>
            {/* <button style={{height:'60px',width:'60px'}} type="button" aria-haspopup="true" aria-expanded="true" class="btn-icon btn-round  btn btn-primary">T1</button> */}
            {/* { modal for OpenCart} */}
            <Modal
                isOpen={openCart}
                // toggle={() => setOpencart(!openCart)}
                // className='modal-dialog-centered'
                style={{ maxWidth: '600px', width: '80%', maxHeight: '600px', height: '60%' }}
                onCancel={() => setOpencart(false)}
                centered
                footer={null}
            >

                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '100%', position: 'relative' }}> */}
                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}> */}
                {/* <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Add Open Item</ModalHeader> */}
                {/* <ModalHeader>
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Add Open Item</span>
                    </ModalHeader> */}
                <div>
                    <ModalHeader style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Add Open Item</span>
                    </ModalHeader>
                </div>
                {/* </div> */}
                {/* </div> */}
                <ModalBody>
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit(handleCartClick)}>
                                <Col sm='12' className='mb-1' >
                                    <div className="mb-1">
                                        <Label className="form-label" for="itemname">
                                            Item Name <span className='text-danger'>*</span>
                                        </Label>
                                        <InputGroup className="input-group-merge">

                                            <Controller
                                                id="itemname"
                                                name="itemname"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        required
                                                        placeholder="Item Name"
                                                        {...field}
                                                    // className={classnames("form-control", {
                                                    //     "is-invalid": data !== null && data.itemName === null,
                                                    // })}
                                                    />
                                                )}
                                            />
                                        </InputGroup>
                                    </div>
                                </Col>
                                <Col sm='12' className='mb-1' >
                                    <Label className="form-label" for="classification">Select Classification<span className='text-danger'>*</span>
                                    </Label>
                                    <InputGroup className="input-group-merge">
                                        <Controller
                                            id="classification"
                                            name="classification"
                                            control={control}
                                            render={({ field }) => (
                                                <Select

                                                    className='react-select'
                                                    required
                                                    isClearable
                                                    options={foodTypeOptions}
                                                    placeholder="Select Classification"
                                                    {...field}
                                                    style={{ width: '100%' }}
                                                // className={classnames("form-control", {
                                                //     // 'is-invalid': data !== null && (data.pickUpLocation === null || !data.pickUpLocation.length)
                                                // })}
                                                />
                                            )}
                                        />
                                    </InputGroup>
                                </Col>
                                <Row>
                                    <Col sm='12' md='6' className='mb-1' >
                                        <div className="mb-1">
                                            <Label className="form-label" for="baseprice">
                                                Base Price <span className='text-danger'>*</span>
                                            </Label>
                                            <InputGroup className="input-group-merge">

                                                <Controller
                                                    id="baseprice"
                                                    name="baseprice"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            required
                                                            placeholder="Price per Unit"
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
                                    <Col sm='12' md='6' className='mb-1' >
                                        <div className="mb-1">
                                            <Label className="form-label" for="quantity">
                                                Quantity <span className='text-danger'>*</span>
                                            </Label>
                                            <InputGroup className="input-group-merge">

                                                <Controller
                                                    id="quantity"
                                                    name="quantity"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            required
                                                            placeholder="quantity.."
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
            <Col sm="12" md="6" className="mb-2" style={{paddingLeft:'30px'}}>
              <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={() => { setOpencart(!openCart) }}>
                CANCEL
              </Button>

            </Col>
            <Col sm="12" md="6" className="mb-2" style={{paddingRight:'30px'}}>
              <Button className="me-1" color="danger" style={{ width: "100%" }} onClick={handleCartClick} >
                SUBMIT
              </Button>
            </Col>

          </Row> */}
                                <div align='end' className='buttons'>
                                    <Button outline className='me-1' color='secondary' onClick={() => { setOpencart(!openCart) }}>
                                        CANCEL
                                    </Button>
                                    <Button color='primary' className='me-1' onClick={handleCartClick}>
                                        SUBMIT
                                    </Button>
                                </div>

                                {/* <Button type='submit' style={{ align: 'right', 'margin-right': '10px', 'margin-bottom': '10px' }} className='me-1' onClick={() => { setOpencart(!openCart) }} color='primary' >CANCEL</Button> */}
                                {/* <Button type='submit' color="primary" style={{ align: 'left', 'margin-right': '10px', 'margin-bottom': '10px' }} onClick={handleCartClick}>SUBMIT</Button> */}
                            </Form>
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
            {/* { modal Ended for OpenCart} */}
            {/* { modal for Special Instruction} */}
            <Modal
                isOpen={opensplInst}
                toggle={() => setOpensplInst(false)}
                className='modal-dialog-centered'
                onCancel={() => setOpensplInst(false)}
                centered
                footer={null}
            >

                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '100%', position: 'relative' }}> */}
                <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
                    {/* <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Add Item Instructions</ModalHeader> */}
                    <ModalHeader>
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Add Item Instructions</span>
                    </ModalHeader>

                </div>
                {/* </div> */}
                <Form onSubmit={handleSubmit(handleOrderRowClick)}>

                    <Col sm='12' className='mb-1'>
                        <div className="mb-1">
                            <InputGroup className="input-group-merge">
                                <Controller
                                    id='specialInstruction'
                                    name='specialInstruction'
                                    control={control}
                                    rules={{ required: 'Special instruction is required' }}
                                    render={({ field }) => (
                                        <Input
                                            type='text' // Changed from 'type="type"'
                                            required
                                            placeholder='Enter specialInstruction'
                                            style={{ width: '90%', height: '100px', margin: '0 auto' }}
                                            maxLength={20}
                                            {...field}
                                        />
                                    )}
                                />
                            </InputGroup>
                            {errors.specialInstruction && <span className='text-danger'>Special instruction is required</span>}
                        </div>
                    </Col>
                    {/* <textarea className='form-control' name='instructions' id='instructions' placeholder='Enter instructions' style={{ width: '100%', height: '200px' }} /> */}


                    {/* <div style={{ backgroundColor: 'yellow', height: '50px', position: 'relative' }}>
                        <ModalHeader onClick={handleOrderRowClick} style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'yellow', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AddItem</ModalHeader>
                    </div> */}
                    <div align='center'>
                        <Button type='submit' color="primary" style={{ align: 'left', 'margin-right': '10px', 'margin-bottom': '10px' }} onClick={handleOrderRowClick}>SUBMIT</Button>

                        <Button style={{ align: 'right', 'margin-right': '10px', 'margin-bottom': '10px' }} className='me-1' onClick={() => { setOpensplInst(!opensplInst) }} color='primary' >CANCEL</Button>
                    </div>
                </Form>
            </Modal>
            {/* { modal Ended for Special Instruction} */}

            {/* Modal for KOT VOID */}
            <Modal
                isOpen={voidkotModal}
                toggle={() => setvoidkotModal(false)}
                className='modal-dialog-centered'
                onCancel={() => setvoidkotModal(false)}
                centered
                footer={null}
            >

                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '100%', position: 'relative' }}> */}
                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
                    <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Void KOT#{localStorage.getItem('KOTNo')}</ModalHeader>
                </div> */}
                <ModalHeader>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Void KOT#{localStorage.getItem('KOTNo')}</span>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
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
                        {/* <Row style={{paddingTop : '20px'}}>

                        <Col sm="12" md="6" className="mb-2" style={{paddingLeft:'30px'}}>
                            <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={handleCancelVoidClick}>
                                CANCEL
                            </Button>
                        </Col>
                        <Col sm="12" md="6" className="mb-2" style={{paddingRight:'30px'}}>
                            <Button className="me-1" color="danger" style={{ width: "100%" }} type="submit" >
                                SUBMIT
                            </Button>
                        </Col>
                    </Row> */}
                        <div align='end' className='buttons'>
                            <Button outline className='me-1' color='secondary' onClick={handleCancelVoidClick}>
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
            {/* Modal END for KOT VOID */}
            {/* modal for modify item */}
            <Modal
                isOpen={modifyItem}
                toggle={() => setmodifyItem(false)}
                className='modal-dialog-centered'
                onCancel={() => setmodifyItem(false)}
                centered
                footer={null}
            >

                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '100%', position: 'relative' }}> */}
                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
                    <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Modify KOT</ModalHeader>
                </div> */}
                <ModalHeader>
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Modify KOT</span>
                </ModalHeader>
                <Form onSubmit={handleSubmit(onSubmitModifyItem)}>
                    <Col style={{ marginLeft: '20px' }}>
                        {kotData.length != 0 &&
                            <tr key={kotData}>
                                <td style={{ margin: '6px 0', paddingLeft: '10px' }}>{kotData.itemName}</td>
                                {/* <td style={{ margin: '6px 0', paddingLeft: '10px' }} colSpan={2} onClick={() => handleInputClick(kotData)} ><InputNumber disabled={true} id={"modifyqty" + kotData} value={kotData.qty} defaultValue={kotData.qty}

                                    upHandler={
                                        <Plus onClick={() => { handlePlusClick2(kotData) }} />
                                    }
                                    downHandler={
                                        <Minus onClick={() => { handleMinusClick2(kotData) }} />
                                    } />

                                </td> */}
                                <td style={{ margin: '6px 0', paddingLeft: '10px' }} colSpan={2} ><InputNumber disabled={true} id={"modifyqty" + kotData} value={kotData.qty} defaultValue={kotData.qty}

                                    upHandler={
                                        <Plus onClick={() => { handlePlusClick2(kotData) }} />
                                    }
                                    downHandler={
                                        <Minus onClick={() => { handleMinusClick2(kotData) }} />
                                    } />

                                </td>

                                {/* <td style={{ margin: '6px 0', paddingLeft: '10px' }}  colSpan={2} ><InputNumber disabled="true" id={"qty" + kotData.index} value={kotData[kotData.index]['qty']} defaultValue={kotData.qty} upHandler={<Plus onClick={() => { handlePlusClick1(kotData.index) }} />} downHandler={<Minus onClick={() => { handleMinusClick1(kotData.index) }} />} /></td> */}
                                {/* <td style={{ margin: '6px 0', paddingLeft: '10px' }}  id={"itemMinus" + index}><Button color='dark' onClick={() => { handleMinusClick1(index) }}>-</Button></td> */}
                            </tr>

                        }
                    </Col>
                    <Col sm='12' className='mb-1' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                        <div className="mb-1">
                            <InputGroup className="input-group-merge">
                                <Controller
                                    id='reason1'
                                    name='reason1'
                                    control={control}
                                    rules={{ required: 'Reason is Required' }}
                                    render={({ field }) => (
                                        <Input
                                            type='text' // Changed from 'type="type"'
                                            required
                                            placeholder='Give Reason for Modify KOT'
                                            style={{ width: '90%', height: '100px' }}
                                            // style={{ width: '90%', height: '100px', margin: '0 auto' }}

                                            {...field}
                                        />
                                    )}
                                />
                            </InputGroup>
                            {errors.reason && <span className='text-danger'>Reason is required</span>}
                        </div>
                    </Col>
                    <Row>

                        <Col sm="12" md="6" className="mb-2" style={{ paddingLeft: '30px' }}>
                            <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={handleCancelItemClick}>
                                CANCEL
                            </Button>
                        </Col>
                        <Col sm="12" md="6" className="mb-2" style={{ paddingRight: '30px' }}>
                            <Button className="me-1" color="primary" style={{ width: "100%" }} type="submit" >
                                SUBMIT
                            </Button>
                        </Col>
                    </Row>
                </Form>
                {/* </div> */}

            </Modal>
            <Modal isOpen={isKOTPop} toggle={() => setisKOTPop(false)} className="modal-dialog-centered" style={{ width: '20%' }}>
                <ModalHeader toggle={() => setisKOTPop(false)}></ModalHeader>
                <ModalBody style={{ height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            {/* <FaRupeeSign style={{ fontSize: '20px' }} /> */}
                            {/* <strong>{totalDiscount}</strong> */}
                        </p>
                        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Discount applied successfully!!</p>
                    </div>
                </ModalBody>
                <ModalFooter style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0' }}>
                    <Button color="warning" size="lg" style={{ width: '300px', height: '50px' }} onClick={() => { setisKOTPop(false) }}>Close</Button>
                </ModalFooter>
            </Modal>
            <Modal
                isOpen={billInfoModal}
                onCancel={() => setbillInfoModal(false)}
                centered
                footer={null}
            >
                <ModalBody className='px-5 pb-2'>
                    <div className='text-center mb-2'>
                        <h2 className='demo-space-y'><b>Generate Bill</b></h2>
                        <h3>Do you want to generate Bill,Table #{localStorage.getItem('TableSelected')}</h3>
                    </div>
                    {/* <div className="button-container text-right" style={{ marginTop: '10px' }}>
                       <Button.Ripple color='flat-secondary' style={{ width: '150px', height: '50px', fontSize: '18px' }} onClick={() => setbillInfoModal(false)}>No</Button.Ripple>
                       <Button.Ripple outline color='flat-primary' style={{ width: '150px', height: '50px', fontSize: '18px' }}  onClick={handlePaymentPage}>Yes</Button.Ripple>
                    </div> */}
                    {/* <div className='d-flex justify-content-center align-items-center buttons' style={{ marginTop: '10px' }}>

                        <Button outline className='me-1'  style={{ fontSize: '1.5rem', padding: '9px 40px' }}  onClick={() => setbillInfoModal(false)}>
                            No
                        </Button>
                        <Button color='primary' className='me-1' style={{ fontSize: '1.5rem', padding: '9px 35px' }}  type='submit' onClick={handlePaymentPage}>
                            Yes
                        </Button>

                    </div> */}
                    <div className="button-container text-center">

                        {/* <Button className="me-1" color="primary"  onClick={handlePaymentPage}> */}
                        <Button className="me-1" color="primary" onClick={handlePaymentPage}>

                            Yes
                        </Button>
                        <Button className='bg-transparent' color="danger" onClick={() => setbillInfoModal(false)}>
                            No
                        </Button>

                    </div>

                </ModalBody>
            </Modal>

            {/* For KOT CONFIRM popup modal */}

            {/* <Modal isOpen={kotConfirmPopup} toggle={() => setkotConfirmPopup(false)} className="modal-dialog-centered" style={{ width: '25%' }}>
                <ModalHeader toggle={() => setkotConfirmPopup(false)}></ModalHeader>
                <ModalBody style={{ height: '35vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '25px', fontWeight: 'bold' }}>KOT Generated</h3>
                        <p style={{ fontSize: '15px', fontWeight: 'bold' }}>KOT Generated Successfully!!</p>
                    </div>
                </ModalBody>
                <ModalFooter style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0' }}>
                    <Row>
                        <Button color="warning" size="lg" style={{ width: '150px', height: '50px' }} onClick={handleStayhere} >STAY HERE</Button>
                        <span style={{ width: '20px' }}></span> 
                        <Button color="warning" size="lg" style={{ width: '150px', height: '50px' }} onClick={handleTablePage}>TABLE PAGE</Button>
                    </Row>
                </ModalFooter>
            </Modal> */}

            <Modal isOpen={kotConfirmPopup} toggle={() => setkotConfirmPopup(false)} className="modal-dialog-centered" style={{ width: '25%' }}>
                <ModalHeader toggle={() => setkotConfirmPopup(false)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '25px', fontWeight: 'bold' }}>KOT Generated</h3>
                        <p style={{ fontSize: '15px', fontWeight: 'bold' }}>KOT Generated Successfully!!</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Button style={{ marginBottom: '10px', maxWidth: '100%', marginRight: '10px' }} onClick={handleStayhere} >STAY HERE</Button>
                        <Button type='submit' style={{ marginBottom: '10px', maxWidth: '100%' }} className='me-1' onClick={handleTablePage} color='primary'>TABLE PAGE</Button>
                    </div>
                </ModalBody>
            </Modal>






            {/* Modal for the KOT BILL */}
            <Modal
                isOpen={openInvoice}
                toggle={() => setopenInvoice(!openInvoice)}
                className='modal-dialog-centered'
                onCancel={() => setopenInvoice(false)}
                centered
                footer={null}
            >

                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '100%', position: 'relative' }}> */}
                {/* <div className='text-center mb-2' style={{ backgroundColor: 'red', height: '50px', position: 'relative' }}>
                    <ModalHeader style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'red', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >Generate Invoice</ModalHeader>
                </div> */}
                <ModalHeader>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Generate Invoice</span>
                </ModalHeader>
                {/* </div> */}
                <ModalBody>
                    <Form onSubmit={handleSubmit(handleInvForm)}>
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

                            <Col md='4' sm='12' className='mb-1'>
                                <Label className="form-label" for="balance">
                                    Pax<span className='text-danger'></span>
                                </Label>
                                <InputGroup className="input-group-merge">
                                    <Controller
                                        id="pax"
                                        name="pax"
                                        control={control}
                                        placeholder="Pax"
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                pattern="[0-9]*" title="Only Numbers Allowed"
                                                className={classnames("form-control", {
                                                    // "is-invalid": data !== null && data.balance === null,
                                                })}
                                                value={sessionStorage.getItem('paxData')}
                                                readOnly
                                                style={{ fontWeight: 'bold' }}
                                            //   value={invBalance1}


                                            />
                                        )}
                                    />
                                </InputGroup>

                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12' md='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="guestname">
                                        Guest Name
                                    </Label>
                                    <InputGroup className="input-group-merge">

                                        <Controller
                                            id="guestname"
                                            name="guestname"
                                            control={control}
                                            render={({ field }) => (
                                                <Input

                                                    placeholder="Guest Name"
                                                    {...field}
                                                    className={classnames("form-control", {
                                                        // 'is-invalid': data !== null && (data.pickUpLocation === null || !data.pickUpLocation.length)
                                                    })}
                                                />
                                            )}
                                        />
                                    </InputGroup>
                                </div>
                            </Col></Row>
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
                                                    className={classnames("form-control", {
                                                        // 'is-invalid': data !== null && (data.pickUpLocation === null || !data.pickUpLocation.length)
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
                        {/* <Row>

                        <Col sm="12" md="6" className="mb-2">
                            <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={handleCancelInvForm} >

                                CANCEL
                            </Button>
                        </Col>
                        <Col sm="12" md="6" className="mb-2">
                            <Button className="me-1" color="primary" style={{ width: "100%" }} onClick={handleInvForm}>
                                SUBMIT
                            </Button>
                        </Col>
                    </Row> */}
                        <div align='end' className='buttons'>
                            <Button outline className='me-1' color='secondary' onClick={handleCancelInvForm}>
                                CANCEL
                            </Button>
                            <Button color='primary' className='me-1' onClick={handleInvForm}>
                                SUBMIT
                            </Button>
                        </div>
                        {/* <div style={{ backgroundColor: 'yellow', height: '50px', position: 'relative' }}>
              <ModalHeader onClick={handleCartClick} style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'yellow', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AddItem</ModalHeader>
          </div> */}
                    </Form>
                </ModalBody>
            </Modal>
            {/* Modal for reprint kot */}
            <Modal
                isOpen={reprintkotModal}
                toggle={() => setreprintkotModal(false)}
                className='modal-dialog-centered'
                onCancel={() => setreprintkotModal(false)}
                centered
                footer={null}
            >

                <ModalHeader>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Reprint KOT#{sessionStorage.getItem('KOTNo')}</span>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(reprintSubmit)}>
                        <Col sm='12' className='mb-1' >
                            <div className="mb-1">
                                <InputGroup className="input-group-merge">
                                    <Controller
                                        id='reprintreason'
                                        name='reprintreason'
                                        control={control}
                                        rules={{ required: 'Reason is Required' }}
                                        render={({ field }) => (
                                            <Input
                                                type='text'
                                                required
                                                placeholder='Give Reason for reprint KOT'
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
                            <Button outline className='me-1' color='secondary' onClick={handleCancelreprintKOT}>
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

            <Modal
                isOpen={voidBillModal}
                toggle={() => setvoidBillModal(false)}
                className='modal-dialog-centered'
                onCancel={() => setvoidBillModal(false)}
                centered
                footer={null}
            >
                <ModalHeader>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Void Order#{localStorage.getItem('KOTNo')}</span>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit(handleOnSubMitVoidBill)}>
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
            <Modal isOpen={modifyqtymodal} toggle={() => setmodifyqtymodal(!modifyqtymodal)} >
                <ModalHeader style={{ fontWeight: 'bold', fontSize: '20px' }}>Edit Quantity
                </ModalHeader>

                <ModalBody>
                    <Form>
                        <Row>
                            <Col sm='12' md='12' className='mb-1'>
                                <div className="mb-1">

                                    <InputGroup className="input-group-merge">
                                        <Controller
                                            id="modifyqty"
                                            name="modifyqty"
                                            control={control}
                                            render={({ field }) => (
                                                <Cleave
                                                    id="modifyqty"
                                                    pattern="[0-9]*" title="Only Numbers Allowed"
                                                    placeholder="Enter the Quantity"
                                                    {...field}
                                                    className={classnames("form-control", {

                                                    })}
                                                />
                                            )}
                                        />
                                    </InputGroup>
                                </div>
                            </Col>

                            <Col>

                                <br />

                                <div align='end' className='buttons'>
                                    <Button outline className='me-1' color='secondary' onClick={() => setmodifyqtymodal(false)}>
                                        CANCEL
                                    </Button>
                                    <Button color='primary' className='me-1' onClick={handleonSubmitmodify} >
                                        SUBMIT
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                    </Form>
                </ModalBody>

            </Modal>

        </div>
    );
};

export default ValidationThirdPartyComponents;
