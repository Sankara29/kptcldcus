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
import API_URL from "../../../../config";

// ** Custom Components
import Avatar from "@components/avatar";
import { Check } from "react-feather";
import {PlusSquare} from 'react-feather'

import { GrStar } from "react-icons/gr";
import { FaRupeeSign } from "react-icons/fa";

// ** Third Party Components
import axios from 'axios'


// ** Reactstrap Imports
import { ReactSortable } from 'react-sortablejs'

import { Row, Col, Alert, CardTitle, CardHeader } from 'reactstrap'
import { Form, Label, Card, CardBody, CardText, Button, Input, InputGroup, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup,ListGroupItem } from 'reactstrap'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Fragment } from 'react'


const SpiltPreview = () => {
  // ** HooksVars
  const { id } = useParams()
  let navigate = useNavigate();


  // ** States
  const [data, setData] = useState(null)
  const [isEqualSplit, setIsEqualSplit] = useState(false)
  const [isItemSplit,setisItemSplit] = useState(false)
  const [modalContent, setModalContent] = useState('');
  const [cards, setCards] = useState([]);
  const [splitData, setSplitData] = useState(false)
  const [isClassificationSplit, setIsClassificationsSplit] = useState(false)
  const [selectedOption, setSelectedOption] = useState('LIQUOR+OTHERS');
  const [classificationData, setClassificationData] = useState([]);
  const [OpenSpltCnt,setOpenSpltCnt] = useState([])
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showSpltModal, setshowSpltModal] = useState(false);
  const tableDataString = localStorage.getItem('tableData');
  const tableData = JSON.parse(tableDataString);
  const MySwal = withReactContent(Swal)
  const [IndexOfQtyToBeSplit, setIndexOfQtyToBeSplit] = useState([])


  // console.log("TableSData")
  // console.log(tableData)
  const list0 = Object.entries(tableData).map(([key, value]) => ({
    id: value.id,
    content: value.itemName,
    qty: value.qty
  }))
  let list1 = []
  let list2 = []
  let list3 = []
  let list4 = []
  let list5 = []
  let list6 = []
  let list7 = []
  let list8 = []
  let list9 = []
  let list10 = []
  let list11 = []
  let list12 = []
  let list13 = []
  let list14 = []
  let list15 = []

  const array = {
    list0, list1, list2, list3, list4, list5, list6, list7, list8, list9, list10, list11, list12, list13, list14, list15
  }
  const [listArr0, setListArr0] = useState(array.list0)
  const [listArr1, setListArr1] = useState(array.list1)
  const [listArr2, setListArr2] = useState(array.list2)
  const [listArr3, setListArr3] = useState(array.list3)
  const [listArr4, setListArr4] = useState(array.list4)
  const [listArr5, setListArr5] = useState(array.list5)
  const [listArr6, setListArr6] = useState(array.list6)
  const [listArr7, setListArr7] = useState(array.list7)
  const [listArr8, setListArr8] = useState(array.list8)
  const [listArr9, setListArr9] = useState(array.list9)
  const [listArr10, setListArr10] = useState(array.list10)
  const [listArr11, setListArr11] = useState(array.list11)
  const [listArr12, setListArr12] = useState(array.list12)
  const [listArr13, setListArr13] = useState(array.list13)
  const [listArr14, setListArr14] = useState(array.list14)
  const [listArr15, setListArr15] = useState(array.list15)



  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm();
  const handleEqualSplit = () => {
    // console.log(cardArray.length)
    // console.log(rightColumn.length)
    // if (cardArray.length === 0 && cardArray1.length === 0) {
    if (cardArray.length === 0 && rightColumn.length === 0) {

      setIsEqualSplit(true);
    } else {
      // alert("You can't click this button when cardArray is not empty.");
      const swalInstance = MySwal.fire({
        text: "Split is Already Done",
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
    }
    // setIsEqualSplit(true)
  }
  const closeModal = () => {
    setIsEqualSplit(false);
  };
  const closeQtyMOdal = () => {
    setshowSpltModal(false)
  }
  const closeItemModal = () => {
    setisItemSplit(false)
  }
  const closeClassificationModal = () => {
    setIsClassificationsSplit(false)
  }
  const handleClassificationSplit = () => {
    // setIsClassificationsSplit(true);
    // if (cardArray.length === 0 && cardArray1.length === 0) {
      if (cardArray.length === 0 && rightColumn.length === 0) {
      setIsClassificationsSplit(true);
    } else {
      // alert("You can't click this button when cardArray is not empty.");
      const swalInstance = MySwal.fire({
        text: "Split is Already Done",
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
    }
  }

  const handleClassificationSplit1 = (event) => {
    // console.log('Selected option:', selectedOption);
    let splitBy;
    if (selectedOption === "LIQUOR+OTHERS") {
      splitBy = {
        "Food": 1,
        "Liquor": 2,
        "SoftDrinks": 1,
        "Smokes": 1,
        "Others": 1
      };
    } else if (selectedOption === "LIQUOR+SMOKES+OTHERS") {
      splitBy = {
        "Food": 1,
        "Liquor": 2,
        "SoftDrinks": 1,
        "Smokes": 3,
        "Others": 1
      };
    } else {
      
    }
  
    // console.log(JSON.stringify({
    //   "hotelID": 1,
    //   "storeID": localStorage.getItem('storeID'),
    //   "orderID": localStorage.getItem('orderID'),
    //   "tableNo": localStorage.getItem('TableSelected'),
    //   "splitBy": splitBy,
    // }))
    fetchx(API_URL + '/splitByCategory', {
      method: 'POST',
      body: JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
        "splitBy": JSON.stringify(splitBy),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then(resp => {
        // console.log(resp)
        if (resp['statuscode'] == 200) {
          const classificationData = resp.data;
          setSplitData(classificationData)
          setIsClassificationsSplit(false)
        }

      })
  };


  const handleItemSplit = () => {
    
    // setisItemSplit(true);
    // if (cardArray.length === 0 && cardArray1.length === 0) {
    if (cardArray.length === 0 && rightColumn.length === 0) {
      setisItemSplit(true);
    } else {
      // alert("You can't click this button when cardArray is not empty.");
      const swalInstance = MySwal.fire({
        text: "Split is Already Done",
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
    }
  }

  // useEffect(() => {
  //   splitStatus();
  // }, []);
  const handleFormSubmit = (data) => {
    const data1 = data['EqualSplit']
    const tableData1 = tableData;
    // console.log("================================================================================")
    const subordersData = {};
   
    Object.keys(data1).forEach((index) => {
      const equalSplitValue = data["EqualSplit"];
      const splitGroups = {};
    
      tableData1.forEach((item) => {
        // console.log(item.qty)
        const dividedQty = item.qty / equalSplitValue;
        // console.log(dividedQty)
        for (let j = 1; j <= equalSplitValue; j++) {
          const splitNumber = j.toString();
          // console.log(splitNumber)
          if (!splitGroups[splitNumber]) {
            splitGroups[splitNumber] = [];
            // console.log(splitGroups)
          }
          splitGroups[splitNumber].push({
            "id": item.id,
            "qty": parseFloat(dividedQty.toFixed(2))
          });
          // console.log(splitGroups)
        }
      });
    
      Object.assign(subordersData, splitGroups);
    });
    // console.log(subordersData);
    const subordersDataArray = [subordersData];
    const subordersDataJSON = JSON.stringify(subordersDataArray);
    // console.log(subordersDataJSON);
    // console.log("================================================================================")
    setCards([...cards, data1]);
    
    fetchx(API_URL + '/splitorder', {
      method: 'POST',
      body: JSON.stringify({
        "hotelID": 10,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
        "splitType": "split",
        "suborders": subordersDataJSON,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then(resp => {
        // console.log(resp)
        if (resp['statuscode'] == 200) {
          const splitData = resp.data;
          setSplitData(splitData)
          setIsEqualSplit(false)

        }
       

      })
      .catch((err) => {
        console.log(err.message);
      });


  };
  const cardArray = [];

  const createCards = () => {
    for (let j = 0; j < splitData.length; j++) {
      const balance = splitData[j]?.Balance ?? 0;
      localStorage.setItem('splitfolioBalace', balance);
      // console.log(balance)
      cardArray.push(
        <Card
          key={`${j}`}
          className="me-0.5"
          style={{
            'marginRight': '10px', height: '350px', width: '300px',
            'marginBottom': '10px',
          }}
        >
          <CardHeader style={{ fontSize: "20px", fontWeight: "bold" }}>
            Folio Number# {localStorage.getItem('orderID') + "/" + (j + 1)}
          </CardHeader>
          <CardBody style={{ textAlign: "center", color: "black", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ marginRight: '20px', color: 'black' }}>
              <strong>Amount</strong> <br />
              <strong><FaRupeeSign />{balance}</strong>
            </div>
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
    return <div>{rows}</div>
  }

 

  const handleOpenSplit = (data) => {
    const openSplt = data.itemsplit;
  
    if (openSplt > 10) {
      MySwal.fire({
        title: 'Warning!',
        text: ' No of Split Cannot Exceed 10',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
      });
    } else {
      setOpenSpltCnt(openSplt);
      setisItemSplit(false);
    }
  };



  const cardArray1 = [];


  const leftColumn = [];
  const rightColumn = [];

  const createOpenCards = () => {
    // const leftColumn = [];
    // const rightColumn = [];

    for (let k = 0; k <= OpenSpltCnt; k++) {
      const idAndItemNamesArray = tableData.map(({ id, itemName }) => ({
        id,
        itemName,
      }));

      const items = k === 0 ? idAndItemNamesArray.map(({ itemName }) => itemName) : [];

      const card = (
        <Card
          key={`${k}`}
          className="me-0.5"
          style={{
            // height: k === 0 ? '400px' : '300px',  // Adjust the height for the left column card
            height: k === 0 ? '500px' : '300px',  // Adjust the height for the left column card

            width: '100%',
            marginBottom: '10px',
          }}
        >
          <CardHeader
            style={{
              fontSize: '16px',
              width: '100%',
              height: '50px',
              textAlign: 'center',
              fontWeight: 'bold',
              backgroundColor: '#7367f0',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            {k === 0 ? (
              <>
                <Col style={{ marginBottom: '10%' }} sm="4">Item</Col>
                <Col style={{ marginBottom: '10%' }} sm="4">Total Qty</Col>
                <Col style={{ marginBottom: '10%' }} sm="4">Action</Col>
              </>
            ) : (
              <>
                Folio Number# {localStorage.getItem('orderID') + '/' + (k + 0)}
              </>
            )}
          </CardHeader>
          <CardBody style={{ overflowY: 'auto', maxHeight: k === 0 ? '350px' : '100%' }}>
            <Row id={`dd-with-handle-${k}`}>
              <Col sm="12">
              {console.log(listArr0)}
              {console.log(listArr1)}
                {k === 0 && items.length > 0 && (
                  <ReactSortable
                    tag="ul"
                    className="list-group sortable"
                    group="shared-handle-group"
                    handle=".handle"
                    list={listArr0}
                    setList={setListArr0}
                  >
                    {listArr0.map((item, index) => (
                      
                      <ListGroupItem className="d-flex align-items-center">
                      {/* <ListGroupItem key={item.id} className="d-flex align-items-center"> */}

                      <span className="handle">
                        <PlusSquare />
                      </span>
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleItemSelected(item, index)}>SplitQty</Button>
                        </Col>
                      </ListGroupItem>
                    ))}
                  </ReactSortable>
                )}
                {k === 1 && (
                  <ReactSortable
                    tag='ul'
                    className='list-group sortable'
                    group='shared-handle-group'
                    handle='.handle'
                    list={listArr1}
                    setList={setListArr1}
                  >
                    {listArr1.map((item, index) => (
                      <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                    ))}
                  </ReactSortable>
                )}
                {k === 2 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr2}
                  setList={setListArr2}
                >
                 
                  {listArr2.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}

                </ReactSortable>
              )}
              {k === 3 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr3}
                  setList={setListArr3}
                >
                 
                  {listArr3.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 4 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr4}
                  setList={setListArr4}
                >
                   {listArr4.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 5 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr5}
                  setList={setListArr5}
                >
                   {listArr5.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 6 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr6}
                  setList={setListArr6}
                >
                 {listArr6.map((item, index) => (
                  <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 7 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr7}
                  setList={setListArr7}
                >
                 {listArr7.map((item, index) => (
                  <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 8 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr8}
                  setList={setListArr8}
                >
                  {listArr8.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 9 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr9}
                  setList={setListArr9}
                >
                  {listArr9.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 10 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr10}
                  setList={setListArr10}
                >
                 {listArr10.map((item, index) => (
                  <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 11 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr11}
                  setList={setListArr11}
                >
                  {listArr11.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 12 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr12}
                  setList={setListArr12}
                >
                   {listArr12.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}{k === 13 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr13}
                  setList={setListArr13}
                >
                  {listArr13.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 14 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr14}
                  setList={setListArr14}
                >
                  {listArr14.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              {k === 15 && (
                <ReactSortable
                  tag='ul'
                  className='list-group sortable'
                  group='shared-handle-group'
                  handle='.handle'
                  list={listArr15}
                  setList={setListArr15}
                >
                  {listArr15.map((item, index) => (
                    <ListGroupItem className="d-flex align-items-center">
                        <Col sm="4">{item.content}</Col>
                        <Col sm="4" className="text-center">{item.qty}</Col>
                        <Col className="text-center">
                          <Button onClick={() => handleRemoveItem(item, index, k)}>Remove</Button>
                        </Col>
                      </ListGroupItem>
                  ))}
                </ReactSortable>
              )}
              </Col>
            </Row>
          </CardBody>
        </Card>
      );

      if (k === 0) {
        leftColumn.push(card);
      } else {
        rightColumn.push(card);
      }
    }
    const rightColumnCards = [];
    for (let i = 0; i < rightColumn.length; i += 2) {
      rightColumnCards.push(
        <div key={i} style={{ display: 'flex', marginBottom: '10px' }}>
          {rightColumn.slice(i, i + 2).map((card, index) => (
            <div key={index} style={{ width: '48%', marginRight: index === 0 ? '10px' : 0, marginBottom: '10px' }}>
              {card}
            </div>
          ))}
        </div>
      );
    }
  

    return (
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        <div style={{ marginRight: '20px', width: '31%' }}>
          {leftColumn}
        </div>
        <div style={{ width: '68%', maxHeight: '600px', overflowY: 'auto' }}>
          {rightColumnCards}
        </div>
      </div>
    );
  };


  const handleSplitNext = () => {
    // navigate('/apps/posconfiguration/SplitPayment')
    // console.log(listArr1)
    // console.log(listArr2)
    let DataJSON={}
    let Data=[]
    for(var i=0;i<OpenSpltCnt;i++)  {

      let tempArr =[]
      let folioNo = i+1
      // console.log(i,folioNo)
      // let tempName = "listArr"+folioNo
      // let tempCardData=tempName
      let tempCardData =[]
      if(folioNo==1){
        // console.log("folioNo==1")
        tempCardData = listArr1
      }else if(folioNo==2){
        // console.log("folioNo==2")
        tempCardData = listArr2
      }else if(folioNo==3){
        // console.log("folioNo==3")
        tempCardData = listArr3
      }else if(folioNo==4){
        // console.log("folioNo==4")
        tempCardData = listArr4
      }else if(folioNo==5){
        // console.log("folioNo==5")
        tempCardData = listArr5
      }else if(folioNo==6){
        // console.log("folioNo==6")
        tempCardData = listArr6
      }else if(folioNo==7){
        // console.log("folioNo==7")
        tempCardData = listArr7
      }else if(folioNo==8){
        // console.log("folioNo==8")
        tempCardData = listArr8
      }else if(folioNo==9){
        // console.log("folioNo==9")
        tempCardData = listArr9
      }else if(folioNo==10){
        // console.log("folioNo==10")
        tempCardData = listArr10
      }
      else if(folioNo==11){
        // console.log("folioNo==11")
        tempCardData = listArr11
      }else if(folioNo==12){
        // console.log("folioNo==12")
        tempCardData = listArr12
      }else if(folioNo==13){
        // console.log("folioNo==13")
        tempCardData = listArr13
      }
      else if(folioNo==14){
        // console.log("folioNo==14")
        tempCardData = listArr14
      }else if(folioNo==15){
        // console.log("folioNo==15")
        tempCardData = listArr15
      }
      // console.log(tempCardData)
      for (let index in tempCardData) {
        // console.log(index)
        tempArr.push({ id: tempCardData[index]['id'], qty: tempCardData[index]['qty'] });
      }

      // console.log(tempArr)
      DataJSON[i]=tempArr
    }

// console.log(DataJSON)

// console.log(DataJSON)
    Data.push(DataJSON)
    const resultJson = Data.map((item) => {
      const newItem = {};
      let currentKey = 1;
    
      for (const key in item) {
        if (item[key].length > 0) {
          newItem[currentKey.toString()] = item[key];
          currentKey++;
        }
      }
    
      return newItem;
    });
    
    // console.log(resultJson);
    // console.log(Data)
    // Object.entries(DataJSON).forEach((key,value)=>{
    //   console.log("key==========",key)
    //   // console.log("value==========",value)
    //   Object.entries(key).forEach((key1,value1)=>{
    //     console.log("key1==========",key1)
    //     console.log("value1==========",value1)
      
    //     // console.log(value.length)
    //     // if(value.length==0){
    //     //   delete DataJSON[key]
        
    //   // console.log(value.length)
    //   // if(value.length==0){
    //   //   delete DataJSON[key]
    //   // }
    // })
    // })
    const subordersData = JSON.stringify({
      "hotelID": 1,
      "storeID": localStorage.getItem('storeID'),
      "orderID": localStorage.getItem('orderID'),
      "tableNo": localStorage.getItem('TableSelected'),
      "splitType": "split",
      "suborders": JSON.stringify(resultJson),
    })
  //  console.log(subordersData)
      fetchx(API_URL+'/splitorder', {
          method: 'POST',
          body: subordersData,
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      })
      .then((res) => res.json())
      .then(resp => {
        // console.log(resp)
        if (resp['statuscode'] == 200) {
          const splitData = resp.data;
          // console.log(splitData)
          setSplitData(splitData)
          setisItemSplit(false)
          setTimeout(() => { navigate('/apps/posconfiguration/SplitPayment') }, 100);

        }

      })
      .catch((err) => {
        console.log(err.message);
      });
  
   
    // fetchx(API_URL + '/splitorder', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     "hotelID": 1,
    //     "storeID": localStorage.getItem('storeID'),
    //     "orderID": localStorage.getItem('orderID'),
    //     "tableNo": localStorage.getItem('TableSelected'),
    //     "splitType": "split",
    //     "suborders": Data,
    //   }),
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //   },
    // })
    //   .then((res) => res.json())
    //   .then(resp => {
    //     console.log(resp)
    //     if (resp['statuscode'] == 200) {
    //       const splitData = resp.data;
    //       setSplitData(splitData)
    //       setisItemSplit(false)
    //       setTimeout(() => { navigate('/apps/posconfiguration/SplitPayment') }, 100);

    //     }

    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

  }
  const handleItemSelected = (selectedItem, index) => {
    console.log(selectedItem)
    setSelectedItemId(selectedItem.id);
    console.log(index)
    setIndexOfQtyToBeSplit(index)
    setshowSpltModal(true);

    //   const selectedItem = listArr1.find((item) => item.id === selectedItemId);
    //   console.log("====================selected items=====================")
    //   console.log(selectedItem)
    //   const { qty } = selectedItem;

    //  const splitQty = (qty / 2).toFixed(2);
    //  const remainingQty = (qty - splitQty).toFixed(2);

    //  console.log(remainingQty)
    //  const newItem = { ...selectedItem, qty: splitQty };
    //  const remainingItem = { ...selectedItem, qty: remainingQty };

    //  const updatedList = [
    //   ...listArr1.filter((item) => item.id !== selectedItemId), // Remove the selected item
    //   newItem,
    //   remainingItem,
    // ];
    // console.log(updatedList)
    // setListArr1(updatedList);

  };
  const handleSpltqty = (splitValue) => {
    
    const selectedItem = listArr0.find((item, index) => item.id === selectedItemId && index === IndexOfQtyToBeSplit);

    if (!selectedItem) {
      // Handle the case where the selected item is not found
      console.error("Selected item not found.");
      return;
    }

    const { qty } = selectedItem;
    console.log(qty)
    // const noofSplt = splitValue.noofSplt;
    const noofSplt = parseInt(splitValue.noofSplt);

    if (isNaN(noofSplt) || noofSplt <= 0) {
      console.error("Invalid number of splits.");
      const swalInstance = MySwal.fire({
        text: "noofSplt amount cannot be zero",
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
      swalInstance.then((result) => {
        if (result.isConfirmed) {
          setshowSpltModal(false)
        }
      });
      return;
    }
  
    
    console.log(noofSplt)
    const splitQty = parseFloat((qty / noofSplt).toFixed(2));

    const updatedList = listArr0.reduce((acc, item, index) => {
      if (index === IndexOfQtyToBeSplit && item.id === selectedItemId) {
        for (let i = 0; i < noofSplt; i++) {
          acc.push({ ...item, qty: splitQty });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    console.log(updatedList)
    setListArr0(updatedList);
    setshowSpltModal(false);
  };


  
  const handleRemoveItem = (item, index, k) => {
    switch (k) {
      case 0:
        const updatedListArr0 = listArr0.filter((_, i) => i !== index);
        // setListArr0(updatedListArr0);
        console.log(updatedListArr0); // Log the updated state
        break;
      case 1:
        const updatedListArr1 = listArr1.filter((_, i) => i !== index);
        setListArr1(updatedListArr1);
        setListArr0([...listArr0, item]); // Adding the item to listArr0
        console.log(updatedListArr1); // Log the updated state
        break;
      // Other cases...
          case 2:
        const updatedListArr2 = listArr2.filter((_, i) => i !== index);
        setListArr2(updatedListArr2);
        setListArr0([...listArr0, item]);
        break;
      case 3:
        const updatedListArr3 = listArr3.filter((_, i) => i !== index);
        setListArr3(updatedListArr3);
        setListArr0([...listArr0, item]);
        break;
      case 4:
        const updatedListArr4 = listArr4.filter((_, i) => i !== index);
        setListArr4(updatedListArr4);
        setListArr0([...listArr0, item]);
        break;
      case 5:
        const updatedListArr5 = listArr5.filter((_, i) => i !== index);
        setListArr5(updatedListArr5);
        setListArr0([...listArr0, item]);
        break;
      case 6:
        const updatedListArr6 = listArr6.filter((_, i) => i !== index);
        setListArr6(updatedListArr6);
        setListArr0([...listArr0, item]);
        break;
      case 7:
        const updatedListArr7 = listArr7.filter((_, i) => i !== index);
        setListArr7(updatedListArr7);
        setListArr0([...listArr0, item]);
        break;
      case 8:
        const updatedListArr8 = listArr8.filter((_, i) => i !== index);
        setListArr8(updatedListArr8);
        setListArr0([...listArr0, item]);
        break;
      case 9:
        const updatedListArr9 = listArr9.filter((_, i) => i !== index);
        setListArr9(updatedListArr9);
        setListArr0([...listArr0, item]);
        break;
      case 10:
        const updatedListArr10 = listArr10.filter((_, i) => i !== index);
        setListArr10(updatedListArr10);
        setListArr0([...listArr0, item]);
        break;
      case 11:
        const updatedListArr11 = listArr11.filter((_, i) => i !== index);
        setListArr11(updatedListArr11);
        setListArr0([...listArr0, item]);
        break;
      case 12:
        const updatedListArr12 = listArr12.filter((_, i) => i !== index);
        setListArr12(updatedListArr12);
        setListArr0([...listArr0, item]);
        break;
      case 13:
        const updatedListArr13 = listArr13.filter((_, i) => i !== index);
        setListArr13(updatedListArr13);
        setListArr0([...listArr0, item]);
        break;
      case 14:
        const updatedListArr14 = listArr14.filter((_, i) => i !== index);
        setListArr14(updatedListArr14);
        setListArr0([...listArr0, item]);
        break;
      case 15:
        const updatedListArr15 = listArr15.filter((_, i) => i !== index);
        setListArr15(updatedListArr15);
        setListArr0([...listArr0, item]);
        break;
      default:
        break;
    }
  };
  console.log(listArr0); // Log listArr0 after adding the item


  const UndoSplit = () => {
    console.log('Undo split')
    fetchx(API_URL + '/restoreOriginalOrder', {
      method: 'PUT',
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
        console.log(resp)
        if (resp['statuscode'] == 200) {
          const splitData = resp.data;
          // console.log(splitData)
          // setSplitData(splitData)
          // setisItemSplit(false)
          setTimeout(() => { navigate('/apps/posconfiguration/Split') }, 100);

        }

      })
      .catch((err) => {
        console.log(err.message);
      });


  }

  const handleButtonClick = () => {
    if (cardArray.length === 0 && rightColumn.length === 0) {
      navigate('/apps/posconfiguration/DisplayBill');
    } else {
      const swalInstance = MySwal.fire({
        text: "Can't go back",
        buttonsStyling: false,
        confirmButtonText: 'Close',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
      });
    }
  };


  return (
    <>
      <Fragment>

        <div className="d-flex align-items-center justify-content-between">
          <Button color='primary' className="bg-transparent" style={{ backgroundColor: "gray", margin: '10px' }} outline onClick={handleButtonClick} >
            Back
          </Button>
          <h4 className="m-0">
            Split bill for Table number #: {localStorage.getItem('TableSelected')}
          </h4>

          <Button color='primary' className="bg-transparent" style={{ backgroundColor: "gray", margin: '10px' }} onClick={() => { UndoSplit() }} >
            Undo Split
          </Button>
        </div>
      </Fragment>


     
      <Card className='invoice-preview-card' style={{ width: '100%', height: '90px' }}>
        <CardBody className='invoice-padding pt-2'>
          <Row>
            <Col md='4' sm='12' className='text-center' onClick={handleEqualSplit}>
              <div className="mb-1">
                <div style={{ border: '1px solid black', padding: '10px', borderRadius: '15px', width: '100%', height: '60px' }}>
                  <GrStar style={{ color: 'black', fontSize: '25px' }} /><br />
                  <strong><center>Equal Split</center></strong>
                </div>
              </div>
            </Col>
            <Col md='4' sm='12' className='text-center' onClick={handleClassificationSplit}>
              <div style={{ border: '1px solid black', padding: '10px', borderRadius: '15px', width: '100%', height: '60px' }}>

                <GrStar style={{ color: 'black', fontSize: '25px' }} /><br />
                <strong><center>Classification</center></strong>
              </div>
            </Col>
            {/* <Col md='3' sm='12' className='text-center' onClick={handleQuantitySplit}>
              <div style={{ border: '1px solid black', padding: '10px', borderRadius: '15px', width: '100%', height: '60px' }}>

                <GrStar style={{ color: 'black', fontSize: '25px' }} /><br />
                <strong><center>Quantity Split</center></strong>
              </div>
            </Col> */}


            <Col md='4' sm='12' className='text-center' onClick={handleItemSplit}>
              <div style={{ border: '1px solid black', padding: '10px', borderRadius: '15px', width: '100%', height: '60px' }}>
                {/* <FaChartPie style={{ color: 'white', fontSize: '25px' }} /><br /> */}
                <GrStar style={{ color: 'black', fontSize: '25px' }} /><br />
                <strong>Open Item</strong>
              </div>
            </Col>

          </Row>
        </CardBody>
      </Card>
      <div>
        <Modal isOpen={isEqualSplit} toggle={closeModal} centered>
          <ModalHeader toggle={closeModal} style={{ fontWeight: 'bold', fontSize: '20px' }}>Split Order
          </ModalHeader>

          {/* <Form onSubmit={handleSubmit(handleInvForm)}> */}
          <ModalBody>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
              <Row>
                <Col sm='12' md='12' className='mb-1'>
                  <div className="mb-1">

                    <InputGroup className="input-group-merge">
                      <Controller
                        id="EqualSplit"
                        name="EqualSplit"
                        control={control}
                        render={({ field }) => (
                          <Cleave
                            pattern="[0-9]*" title="Only Numbers Allowed"
                            placeholder="Total Number of Splits"
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
                </Col></Row>
              {/* <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={handleCancelInvForm} > */}
              {/* <Button className="me-1" color="danger" style={{ width: "100%" }} onClick={handleInvForm}> */}

              {/* <Row>

            <Col sm="12" md="6" className="mb-2">
              <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={closeModal} >
                CANCEL
              </Button>
            </Col>
            <Col sm="12" md="6" className="mb-2">
              <Button className="me-1" color="danger" style={{ width: "100%" }}>
                SUBMIT
              </Button>
            </Col>
          </Row> */}
              <div align='end' className='buttons'>
                <Button outline className='me-1' color='secondary' onClick={closeModal}>
                  CANCEL
                </Button>
                <Button color='primary' className='me-1' >
                  SUBMIT
                </Button>
              </div>
              {/* <div style={{ backgroundColor: 'yellow', height: '50px', position: 'relative' }}>
              <ModalHeader onClick={handleCartClick} style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'yellow', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AddItem</ModalHeader>
          </div> */}
            </Form>
          </ModalBody>

        </Modal>
      </div>
      <Modal isOpen={isItemSplit} toggle={closeItemModal} centered>
        <ModalHeader toggle={closeItemModal} style={{ fontWeight: 'bold', fontSize: '20px' }}>Split Order
        </ModalHeader>

        {/* <Form onSubmit={handleSubmit(handleInvForm)}> */}
        <ModalBody>
          <Form onSubmit={handleSubmit(handleOpenSplit)}>
            <Row>
              <Col sm='12' md='12' className='mb-1'>
                <div className="mb-1">
                  <InputGroup className="input-group-merge">
                    <Controller
                      id="itemsplit"
                      name="itemsplit"
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          pattern="[0-9]*"
                          title="Only Numbers Allowed"
                          placeholder="Total Number of Splits for items"
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
            </Row>
            {/* <Row>

            <Col sm="12" md="6" className="mb-2">
              <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={closeItemModal} >
                CANCEL
              </Button>
            </Col>
            <Col sm="12" md="6" className="mb-2">
              <Button className="me-1" color="danger" style={{ width: "100%" }}>
                SUBMIT
              </Button>
            </Col>
          </Row> */}
            <div align='end' className='buttons'>
              <Button outline className='me-1' color='secondary' onClick={closeItemModal}>
                CANCEL
              </Button>
              <Button color='primary' className='me-1' >
                SUBMIT
              </Button>
            </div>
            {/* <div style={{ backgroundColor: 'yellow', height: '50px', position: 'relative' }}>
              <ModalHeader onClick={handleCartClick} style={{ color: 'white', fontWeight: 'bold', width: '100%', height: '100%', background: 'yellow', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AddItem</ModalHeader>
          </div> */}
          </Form>
        </ModalBody>

      </Modal>
      <Modal isOpen={isClassificationSplit} toggle={closeClassificationModal} centered>
        <ModalHeader toggle={closeModal} style={{ fontWeight: 'bold', fontSize: '30px' }}>Split Bill
        </ModalHeader>
        {/* <Form onSubmit={handleSubmit(handleInvForm)}> */}
        <ModalBody>
        <Form onSubmit={handleSubmit(handleClassificationSplit1)}>
          <Row>
            <Col sm="12" md="6" className="mb-2">
              <FormGroup check>
                <Label check style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Input
                    type="radio"
                    name="liquor"
                    value="LIQUOR+OTHERS"
                    checked={selectedOption === "LIQUOR+OTHERS"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  {/* LIQUOR+OTHERS */}
                  Liquor Bill+Others Bill(Food/SoftDrinks/Smokes/Others)
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6" className="mb-2">
              <FormGroup check>
                <Label check style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Input
                    type="radio"
                    name="liquorsmokes"
                    value="LIQUOR+SMOKES+OTHERS"
                    checked={selectedOption === "LIQUOR+SMOKES+OTHERS"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  {/* LIQUOR+SMOKES+OTHERS */}
                  Liquor Bill+Smoke Bill+Others Bill(Food/SoftDrinks)
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>

            {/* <Col sm="12" md="6" className="mb-2">
              <Button className="bg-transparent" style={{ width: "100%", backgroundColor: "gray" }} onClick={closeClassificationModal} >
                CANCEL
              </Button>
            </Col>
            <Col sm="12" md="6" className="mb-2">
              <Button className="me-1" color="danger" style={{ width: "100%" }}>
                SUBMIT
              </Button>
            </Col> */}
            <div align='end' className='buttons'>
              <Button outline className='me-1' color='secondary' onClick={closeQtyMOdal}>
                CANCEL
              </Button>
              <Button color='primary' className='me-1' >
                SUBMIT
              </Button>
            </div>
          </Row>
          
        </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={showSpltModal} toggle={closeQtyMOdal} centered>
        <ModalHeader toggle={closeQtyMOdal} style={{ fontWeight: 'bold', fontSize: '20px' }}>Split Qty
        </ModalHeader>

        {/* <Form onSubmit={handleSubmit(handleInvForm)}> */}
        <ModalBody>
          <Form onSubmit={handleSubmit(handleSpltqty)}>
            <Row>
              <Col sm='12' md='12' className='mb-1'>
                <div className="mb-1">

                  <InputGroup className="input-group-merge">
                    <Controller
                      id="noofSplt"
                      name="noofSplt"
                      control={control}
                      render={({ field }) => (
                        <Cleave
                          pattern="[0-9]*" title="Only Numbers Allowed"
                          placeholder="Total Number of Splits"
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
              </Col></Row>
            <div align='end' className='buttons'>
              <Button outline className='me-1' color='secondary' onClick={closeQtyMOdal}>
                CANCEL
              </Button>
              <Button color='primary' className='me-1' >
                SUBMIT
              </Button>
            </div>

          </Form>
        </ModalBody>
      </Modal>

      {/* <div className="cards-container">{createCards()}</div> */}
      <Row className='match-height'>
        <Col xl='12'>
          <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px' }}>
            {OpenSpltCnt != 0 ? createOpenCards() : createCards()}
            {/* {createCards()} */}
          </div>
        </Col>
      </Row>
      <div className='d-flex justify-content-center mt-3'>
        {/* <Button color='primary' size='lg' onClick={handleSplitNext} style={{ position: 'absolute', left: '40%', top: '95%', transform: 'translateY(-50%)', width: '200px' }} >
          Next
        </Button> */}
        {/* <Button color='success' size='lg' onClick={handleSplitNext} style={{ position: 'absolute', left: '40%', top: '95%', transform: 'translateY(-50%)', width: '200px' }} >
          Finish
        </Button> */}
        <Button
          color='success'
          size='lg'
          onClick={handleSplitNext}
          style={{
            position: 'absolute',
            left: '40%',
            top: '95%',
            transform: 'translateY(-50%)',
            width: '200px'
          }}
          disabled={listArr0.length !== 0 && OpenSpltCnt>0} // Disable button if listArr0 is not empty
        >
          Finish
        </Button>

      </div>
      

      {/* {createCards} */}

    </>
  )

}

export default SpiltPreview
