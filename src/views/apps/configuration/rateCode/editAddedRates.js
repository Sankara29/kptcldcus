// ** React Imports
import { useRef, useState } from "react";
import { Button, Modal,  CardTitle,ModalHeader, ModalBody} from "reactstrap";
import { Card, Row, Col, Form, Input} from "reactstrap";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useEffect, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import API_URL from "../../../../config";
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const RateCodeRoomRates = ({ stepper2,data1}) => {
  let navigate = useNavigate();
  const [Rate2, setRate2] = useState();
  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  const [show1, actionButton2] = useState(false);
  const {setError,formState: { errors }} = useForm()
  const navigatepage = () => {navigate('');};
  const [completeData, setCompleteData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
      {
      headerName: "Room Type ",
      field: "roomType",
      suppressSizeToFit: true,
      maxWidth: 130,
    },
    { headerName: "One Adult Price", field: "oneAdultPrice", maxWidth: 160,editable: true },
    {
      headerName: "Extra Adult Price ",
      field: "extraAdultPrice",
      maxWidth: 180
      ,editable: true
    },
    {
      headerName: "Extra Child Price",
      field: "extraChildPrice",
      maxWidth: 180,editable: true
    },
    {
      headerName: 'Action',
      field: 'numAvlRooms',
      suppressSizeToFit: true,
      maxWidth: 118,
      cellRendererFramework: (params) => <Button color='primary' onClick={() => actionButton1(params)}> Activate </Button>
    },
    {
      headerName: 'Action',
      field: 'numAvlRooms',
      suppressSizeToFit: true,
      maxWidth: 155,
      cellRendererFramework: (show1) => <Button color='primary' onClick={() => actionButton2(show1)}> Deactivate </Button>
    }
    
  ]);


  useEffect(() => {
    fetchx(API_URL + "/getroomtyperates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelID: "1",
      }),
    })
      .then((result) => result.json())
      .then((rowData) => {
        setRate2(rowData["data"]);
      })
      .catch((error) => {
       ////console.log(error);
      });


      fetchx(API_URL+`/getRemainingRoomtypeData?hotelID=1&rateCodeID=${data1.id}`)
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
   console.log(rowData);

  }, []);


  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
   setCompleteData(event.data);
  }, []);

  
  function Confirm1() {

     console.log(completeData)
    const updatedItem = JSON.stringify({
    isActive:0,
    id : 308,
    rateCodeID: 79,   
    hotelID:1,   
  });
     fetchx(API_URL + `/deactivateRateCodeRoomRates`, {      
    method: "PUT",
    body: updatedItem,
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      fetchx(API_URL + `/getAccRatecodeRoomRate?id=${data1.id}`)
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
             const swalInstance = MySwal.fire({
        text: "Room Type Removed Successfully!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Close",
        allowOutsideClick: false,
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
      swalInstance.then((result) => {
        if (result.isConfirmed) {
          actionButton2(false);
        }
      });
    })
    .then((post) => {
              if (post.statusCode === 200) {
        setPopUp(false);
        fetchx(API_URL + `/getAccRatecodeRoomRate?id=${data1.id}`)
          .then((result) => result.json())
          .then((rowData) => {
          });
      }
    })
    .catch((err) => {
      // console.logerr.message);
    });
  }  
    
     const actionButton1 = (completeData) => {
      console.log(completeData.data)
      const updatedItem = JSON.stringify({
      "rateCodeID"     : sessionStorage.getItem("RateCodesID"), 
      "roomTypeID"     : completeData.data.id,
      "oneAdultPrice"  : completeData.data.oneAdultPrice,
      "extraAdultPrice": completeData.data.extraAdultPrice,
      "extraChildPrice": completeData.data.extraChildPrice, 
      "isActive":1,
      "hotelID": 1, 
    });
      let res = fetchx(API_URL + "/addrateCodeRoomRate", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: updatedItem
      }).then((res) => res.json())
        .then((res) => {
          console.log(updatedItem)
          console.log(res)
        //  fetchx(API_URL + `/getAccRatecodeRoomRate?id=${data1.id}`)
        // .then((result) => result.json())
        // .then((rowData) => setRowData(rowData["data"]));
        //   const swalInstance = MySwal.fire({
        //   text: "Rates Added Successfully!",
        //   icon: "success",
        //   buttonsStyling: false,
        //   confirmButtonText: "Close",
        //   allowOutsideClick: false,
        //   customClass: {
        //     confirmButton: "btn btn-danger",
        //   },
        // });
        // swalInstance.then((result) => {
        //   if (result.isConfirmed) {
        //     actionButton2(false);
        //   }
        // });
      })
      // .then((post) => {
      //           if (post.statusCode === 200) {
      //     setPopUp(false);
      //     fetchx(API_URL + `/getAccRatecodeRoomRate?id=${data1.id}`)
      //       .then((result) => result.json())
      //       .then((rowData) => {
      //       });
      //   }
      // })
      .catch((err) => {
        // console.logerr.message);
      });
    }
  

 

  // useEffect(() => {
  //   fetchx(API_URL+`/getRoomtypes?hotelID=1`)
  //     .then((result) => result.json())
  //     .then((rowData) => setRowData(rowData["data"]));
  //  console.log(rowData);
  //   }, []);
    
  
  return (
    <div>

<div>
        <Modal isOpen={show1} toggle={() => actionButton2(!show1)} className="modal-sm">
          <ModalHeader toggle={() => actionButton2(!show1)}>  Need To Check..</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>         
             {/* <RateCodeRoomRates ratecodeViewRates={rcViewRates}/>         */}
             <div>
              <b> Do You Want to Deactivate Attached Room Type ?</b>
              <br></br>
              <br></br>
              <div className="d-flex">
                <Button
                  color="primary"
                  className="me-1"
                  // className="text-center"
                  onClick={() => Confirm1()}
                >
                  Confirm
                </Button>
                <Button
                  color="danger"
                  className="me-1"
                  // className="text-center"
                  onClick={() => {
                    actionButton2(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
         </Modal>
        </div> 


      <div>

 
        <Row>
        <Col md='3' sm='12'>
        <h5>Rate Code: {data1.rateCode} </h5>
        </Col>
        <Col md='3' sm='12'>
        <h5>Package: {data1.packageCode}</h5>
        </Col>
        <Col md='3' sm='12'>
        <h5>Begin Date: {data1.beginSellDate}</h5>
        </Col>
        </Row>
        <Row>
        <Col md='3' sm='12'>
        <h5>Market Code: {data1.marketCode} </h5>
        </Col>
        <Col md='3' sm='12'>
        <h5>Source Code: {data1.sourceCode}</h5>
        </Col>
        <Col md='3' sm='12'>
        <h5>End Date: {data1.endSellDate}</h5>
        </Col>
        </Row>
        
      </div>
      <div className="ag-theme-alpine" style={{ height: 350 }}>

     
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}        
          defaultColDef={defaultColDef}
          headerColor="ddw-primary"
        />
      </div>
      <br/>           
        </div>
  );
};
export default RateCodeRoomRates;
