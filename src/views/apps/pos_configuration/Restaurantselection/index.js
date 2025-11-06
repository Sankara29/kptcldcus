
// ** Third Party Components
import InputNumber from 'rc-input-number'
import { Plus, Minus } from 'react-feather'
import React, { Component } from 'react';

import { useNavigate } from "react-router-dom";

// ** React Imports
import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
import * as ReactDOM from 'react-dom';

import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
// import App from "./waitListDataTable";
import Moment from 'moment';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import API_URL from "../../../../config";

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

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback} from 'react';
import Addorder from '/src/views/apps/pos_configuration/Addorder/addorder'


let RestaurantOptions = [
    fetchx(API_URL+'/getrestaurantlist?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      RestaurantOptions = resp['data']
      // console.log(RestaurantOptions)
    })
  ]



let id=1;
const ValidationThirdPartyComponents = () => {
  
  let navigate = useNavigate(); 

    const [selecteditem,setselecteditem] = useState("");
  const [rowData, setRowData] = useState();

  const [tableData, setTableData] = useState([
    // {id: 1, menuitem: 'item1', qty: 1},
    // {id: 2, menuitem: 'item2', qty: 1},
  ]);

 
  // useEffect(() => {
  //   fetchx(API_URL+'/getmenuitem?hotelID='+id)
  //   .then(result => result.json())
  //   .then(rowData => {setRowData(rowData['data'])
  //   })
  // },[]);  

  const [RestaurantOptions, setRestaurantOptions] = useState([])

  useEffect(() => {
    fetchx(API_URL+'/getrestaurantlist?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      setRestaurantOptions(resp['data'])
      // console.log(RestaurantOptions)
    })

  }, []);
    
  function getButtonsUsingForLoop(num) {
    // console.log(RestaurantOptions)
    const array = []

    for(var i = 0; i <= num-1; i++){
      // console.log(RestaurantOptions[i])
      // console.log((RestaurantOptions[i]['value']))
      let Restaurant = RestaurantOptions[i]['restaurantName']
      
      let storeID    = RestaurantOptions[i]['storeID']
      // console.log("Restaurant====="+Restaurant,storeID)
      array.push(
        <Button  className="me-0.5 btn-success"  style={{
          height: '70px',
          width: '650px',
          marginRight: '10px',
          marginBottom: '10px',
          backgroundColor: 'success',          
          fontWeight: 'bold',
        }}
        /*adding background for outlet */
        outline
        id={i}
        name="bt"
        // onClick={alert("test")}
        // onClick={handleClick}
        onClick={() => {
          handleClick(Restaurant,storeID)
         }}
        >
        {Restaurant}
        {/* Changes for the font type   
        <h4 style={{ margin: '6px 0', paddingLeft: '10px', color: 'red' }}>
    <strong>{Restaurant}</strong>
  </h4> */}
      </Button>)
     
    }
    
    return array
  }

function handleClick(Restaurant,storeID){
 
  // console.log(Restaurant ,storeID)
  localStorage.setItem('RestaurantSelected',Restaurant)
  sessionStorage.setItem('Rest_name',Restaurant)
  localStorage.setItem('storeID',storeID)
  fetchx(API_URL+'/gettablecount?hotelID=1&storeID='+storeID)
  .then(result => result.json())
  .then(resp => {
    // console.log(resp['data'])
    // console.log(resp)
    setTimeout(() => {
      navigate('/apps/posconfiguration/Tableselection');
    }, 100);
  })
  // setTimeout(() => {
  //   navigate('/apps/posconfiguration/Tableselection');
  // }, 100);
  // navigate(<Table/>)
  // <Table/>

} 

  
  return (
    <div>

    <Card>
    <Col xl='12' md='12' xs='12'>
      <br/>
      <h4 style={{ margin: '6px 0', paddingLeft: '10px' }}>Select Restaurant</h4>
      <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px',  maxHeight: '500px', overflow: 'auto'}}>
{/* {console.log(RestaurantOptions.length)} */}
        {RestaurantOptions.length !== 0 && getButtonsUsingForLoop(RestaurantOptions.length)}  
        </div> 
</Col>
    </Card>    
  
    </div>
  );
};

export default ValidationThirdPartyComponents;

 