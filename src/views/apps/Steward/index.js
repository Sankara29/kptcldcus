
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
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Modal, ModalBody } from 'reactstrap'
import API_URL from "../../../config";

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Addorder from '/src/views/apps/pos_configuration/Addorder/addorder'


// let stewardOptions = [
//   fetchx(API_URL + '/getstewardlist?hotelID=10&storeID=1')
//     .then(result => result.json())
//     .then(resp => {
//       stewardOptions = resp['data']
//     })
// ]

let stewardOptions = [];

fetchx(API_URL + '/getallstewardlist?hotelID=10')
  .then(result => result.json())
  .then(resp => {
    stewardOptions = resp['data'].filter(steward => steward.user_id !== null);
  });



let id = 1;
const ValidationThirdPartyComponents = () => {
  let navigate = useNavigate();

  const [selecteditem, setselecteditem] = useState("");
  const [rowData, setRowData] = useState();
  const [loginModal, setloginModal] = useState(false);


  const [tableData, setTableData] = useState([
    // {id: 1, menuitem: 'item1', qty: 1},
    // {id: 2, menuitem: 'item2', qty: 1},
  ]);


  // useEffect(() => {
  //   // fetchx(API_URL+'/getmenuitem?hotelID='+id)
  //   // .then(result => result.json())
  //   // .then(rowData => {setRowData(rowData['data'])

  // },[]);  
  const [stewardOptions, setstewardOptions] = useState([])

  // useEffect(() => {
  //   fetchx(API_URL + '/getallstewardlist?hotelID=10')
  //     .then(result => result.json())
  //     .then(resp => {
  //       // setstewardOptions(resp['data'])
  //     })

  // }, []);

  useEffect(() => {
    fetchx(API_URL + '/getallstewardlist?hotelID=10')
      .then(result => result.json())
      .then(resp => {
        const filteredStewardOptions = resp['data'].filter(steward => steward.user_id !== null);
        // const filteredStewardOptions = resp['data']

        setstewardOptions(filteredStewardOptions);
      })
  }, []);



  const getButtonsUsingForLoop = () => {
    const array = [];

    for (let i = 0; i < stewardOptions.length; i++) {
      let steward = stewardOptions[i]['stewardName']; // Assuming 'stewardName' is the correct property

      array.push(
        <Col key={i} xs="auto">
          <Button
            className="me-0.5 btn-success"
            style={{
              height: '100px', // Adjusted height
              width: '120px',  // Adjusted width
              marginRight: '12px',
              marginBottom: '10px',
              backgroundColor: 'success',
              fontWeight: 'bold',
            }}
            outline
            id={i}
            name="bt"
            onClick={() => {
              handleClick(stewardOptions[i]);
            }}
          >
            {steward}
          </Button>
        </Col>
      );
    }

    return <Row>{array}</Row>;
  };
  const {
    setError,
    formState: { errors }
  } = useForm()
  // ** State

  function handleClick(steward) {
    let stewardUserid = steward.user_id;
    let stewardName =  steward.stewardName


    sessionStorage.setItem('stewardid',stewardUserid)
    // sessionStorage.setItem('stewardName1',stewardName)

    setloginModal(true)

    // navigate('/apps/Res');
  }
  function confirmSubmit(data) {
    fetchx(API_URL + '/setstewardToStore', {
      // fetchx( API_URL + 'setstewardToStore', {
      
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stewardid: sessionStorage.getItem('stewardid'),
        passcode: data.password,
      })
    }).then(result => result.json())
      .then(rowData => {
        if (rowData['statuscode'] == 200) {
          sessionStorage.setItem('stewardName1',rowData.message)
          sessionStorage.setItem('stewardName2',rowData.message)
          navigate('/apps/posconfiguration/Restaurantselection')

        }
        if(rowData['statusCode'] == 403) {
          const swalInstance = MySwal.fire({
            // title: 'Cancelled',
            text: rowData['message'],
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
              // sessionStorage.setItem('stewardName1', rowData.message); 

            }
          });
        }

      }).catch((error) => {
        console.log(error)
      })
  }
  function confirmSubmit1() {
    navigate('')
  }
  const { reset, handleSubmit, control } = useForm()


  return (
    <div>


      <br />
      <h4 style={{ margin: '6px 0', paddingLeft: '10px' }}>Select Steward</h4>
      {/* <div class='demo-space-x' style={{ margin: '6px 0', paddingLeft: '10px', maxHeight: "700px", overflow: 'auto' }}> */}
      <div>

        {getButtonsUsingForLoop(stewardOptions.length)}
      </div>

      <Modal isOpen={loginModal}
        onCancel={() => setloginModal(false)}
        centered
        footer={null}>

        <ModalBody className='px-5 pb-2'>
          <Form onSubmit={handleSubmit(confirmSubmit)}>
            <div className='text-center mb-2'>
              <h1 className='demo-space-y'><b>Enter Password to Change Steward</b></h1>

              <Controller
                control={control}
                id='password'
                name='password'
                render={({ field }) => (
                  <Input
                    type='password'
                    placeholder='password'
                    invalid={errors.password && true}
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
                Send
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

    </div>
  );
};

export default ValidationThirdPartyComponents;

