// ** React Imports
import { useRef, useState } from "react";
import { useForm, Controller } from 'react-hook-form'
import { Input,Button,  Modal,  ModalHeader,  ModalBody,Form, Row, Col, Label} from "reactstrap";
// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useEffect, useMemo, useCallback } from "react";
import "./hover.scss";
import API_URL from "../../../config";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const defaultValues1 = { reservationid: '', source: '', companyID: '', packageID: null,}  


const Companydetails = (data1) => {
  //API to get company list
  useEffect(() => {
     fetchx(API_URL + "/getRateCode?hotelID=1")
       .then((result) => result.json())
       .then((rowData) => setRowData(rowData["data"]));
   }, []);
 
     const [data, setData] = useState(null)
     const [filldata, setfilldata] = useState(false)
     const [rowData, setRowData] = useState()
     const { reset, handleSubmit, control } = useForm({ defaultValues1 })
     const { setError, formState: { errors } } = useForm()
     const gridRef1 = useRef()
     const [room, setRoom] = useState([]);
     const [roomIDs, setRoomID] = useState()
     const defaultColDef = useMemo(() => ({ sortable: true, filter: true, filterParams: {   buttons: ['apply', 'reset'] }  }))
    
     //ag-grid cell clcked value
     const cellClickedListener = useCallback(event => {
      //console.log(event)    
       setfilldata(event['data']['accountName'])
     })
   
   
     //On submit function
     const onSubmit = (data) => {
         setData(data);
        //console.log(data);
         localStorage.setItem('data2',JSON.stringify(data));
        //console.log(JSON.parse(localStorage.getItem('data2')))   
         if (data.accountType !== null && data.accountName !== null) {
          //console.log(data);
           let createmarketGroup = JSON.stringify({
             accountID:data1.data1.data1.companyid,
             rateCodeID: roomIDs,
             hotelID:1
           });
          //console.log(createmarketGroup);
          //console.log("hi");
           let res = fetchx(API_URL+"/addRateCodeAccountMapping", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: createmarketGroup,
           })
             .then((result) => result.json())
             .then((resp) => {             
              //console.log(resp);
               const swalInstance = MySwal.fire({
                 text: 'Account Rate Code Mapping Successfully Done!',
                 icon: 'success',
                 buttonsStyling: false,
                 confirmButtonText: 'Close',
                 customClass: {
                   confirmButton: 'btn btn-danger'
                 }
               });
               swalInstance.then((result) => {
                 if (result.isConfirmed) {
                    //  setaddRateCode(false)
                   navigate('');
                 }
               }); 
             })
             .catch((error) => {
              //console.log(error);
             });         
          
         }
       };
    
 
     //Ag-grid column definition
     const [columnDefs] = useState([
       { headerName: 'RateCode ID', field: 'id', maxWidth: 100 },
       { headerName: "Rate Code", field: "rateCode", suppressSizeToFit: true, checkboxSelection: true, headerCheckboxSelection: true, maxWidth: 300
  },
       { headerName: "Description", field: "description", suppressSizeToFit: true, maxWidth: 140,   },
       { headerName: "Begin Date", field: "beginSellDate", suppressSizeToFit: true, maxWidth: 140,   },
       { headerName: "SellDate", field: "endSellDate", suppressSizeToFit: true, maxWidth: 140,   },
       { headerName: "Days Applicable", field: "daysApplicable", maxWidth: 140, },
     ])
     //Search element
     const onFilterTextBoxChanged = useCallback(() => {
       gridRef1.current.api.setQuickFilter(
         document.getElementById('filter-text-box').value
       )
     }, [])
    
     let navigate = useNavigate();
 
     const navigatepage = () => {
       navigate('');
   };
    
       //// OncheckBox Click
       const onSelectionChanged = (event) => {
         let allAccounts = event.api.getSelectedRows()
        //console.log(allAccounts
            //  )       
         let accountID = [];
         let rateCodeIDs = [];
               allAccounts.forEach(element => {
           accountID.push(element.id)
           rateCodeIDs.push(element.rateCodeIDs)         
                //console.log(accountID)
                //console.log(rateCodeIDs)
             });
         setRoomID(accountID)
         setRoom(rateCodeIDs)
         // setRoomIDStatus(roomIDStatus)
         if (allAccounts.length === 0) {
             setRoomID()
             setRoom()
             setRoomIDStatus()
 
         }
        //console.log("localStorage.getItem('companyData')")
     }  
     return (
       <div>  
             <Form onSubmit={handleSubmit(onSubmit)}>
                              <div>                
                       <div>
                         <Row className='mb-1'>
                           <Col md='3' sm='12' className='me-1'>
                             <Label className='form-label' for='fullName'>
                               Search
                             </Label>
                             <Input
                               type="text"
                               id="filter-text-box"
                               placeholder="Filter..."
                               onInput={onFilterTextBoxChanged}
                             />
                           </Col>                          
                         </Row>
                       </div>
                       <div className="ag-theme-alpine" style={{ height: 520 }}>
                         <AgGridReact
                           ref={gridRef1}
                           rowData={rowData}
                           columnDefs={columnDefs}
                           animateRows={true}
                           onCellClicked={cellClickedListener}
                           onGridReady={params => {
                             params.api.sizeColumnsToFit();
                         }}
                         rowSelection='multiple'
                         onSelectionChanged={onSelectionChanged}
                         rowMultiSelectWithClick={true}
                           paginationPageSize='10'
                           pagination='true'
                           defaultColDef={defaultColDef}
                           headerColor="ddw-primary"
                         />                       
                       </div> 
                                     
                 </div>
               <br></br>
               <div className='button' align='end'>
               <Button color='primary' className='me-1' type='button' onClick={navigatepage}>
             Exit
         </Button>
              
                 <Button className='me-1' color='primary' type='submit' style={{ align: 'right' }}>
                   Submit
                 </Button>
               </div>
   
             </Form>
       </div>
     )  
   }




 const RateCodeRoomRates = (ratecodeViewRates) => {
 //console.log(ratecodeViewRates)
 //console.log(ratecodeViewRates.ratecodeViewRates)

  const [rowData, setRowData] = useState();
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Rate Code ",
      field: "rateCode",
      suppressSizeToFit: true,
      maxWidth: 130, },
    { headerName: "Room Type ", field: "roomType", suppressSizeToFit: true, maxWidth: 130,},
    { headerName: "One Adult Price", field: "oneAdultPrice"     ,maxWidth: 160 }, 
    { headerName: "Extra Adult Price ", field: "extraAdultPrice",maxWidth: 160 },
    { headerName: "Extra Child Price", field: "extraChildPrice" ,maxWidth: 160 },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
   //console.log("cellClicked", event);
  }, []);
  useEffect(() => {
    fetchx(API_URL + `/getAccRatecodeRoomRate?id=${ratecodeViewRates.ratecodeViewRates}`)
    .then((result) => result.json())
    .then((rowData) => {
     //console.log(rowData)
      setRowData(rowData["data"]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [ratecodeViewRates]);

  return (
    <div>
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div className="ag-theme-alpine" style={{ height: 250 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="multiple"
          onCellClicked={cellClickedListener}
          // paginationAutoPageSize = 'true'
          // paginationPageSize="10"
          // pagination = 'true'
          defaultColDef={defaultColDef}
          headerColor="ddw-primary"
        />
      </div>
    </div>
  );
};
  


const RateCodeBasicDetails = (data1) => {
   //console.log(data1)
    const [rowData, setRowData] = useState();
    const gridRef = useRef();
    const [show, actionButton] = useState(false);
    let navigate = useNavigate();
    const[addRateCode, setaddRateCode] = useState(false);
    const [show1, actionButton1] = useState(false);

    const [columnDefs, setColumnDefs] = useState([
      {headerName: "Rate Code ",field: "rateCode", suppressSizeToFit: true, maxWidth: 100,},
      { headerName: "Description", field: "description"    ,maxWidth: 135 },
      { headerName: 'BeginSellDate', field: 'beginSellDate',maxWidth: 150 },
      { headerName: 'End Sell Date', field: 'endSellDate'  ,maxWidth: 150 },
      { headerName: "Package Code ", field: "packageCode"  ,maxWidth: 150 },
      { headerName: "Market Code", field: "marketCode"     ,maxWidth: 135 },
      { headerName: 'Source Code ', field:'sourceCode'     ,maxWidth: 135 },
      {headerName: "Action",field: "numAvlRooms", suppressSizeToFit: true, maxWidth: 140,cellRendererFramework: (params) => (
        <Button color="primary" onClick={() => {
           actionButton(!show); }}> View
        </Button>
      ),
    },
    {headerName: "Action",field: "numAvlRooms", suppressSizeToFit: true, maxWidth: 140,cellRendererFramework: (params) => (
      <Button color="primary" onClick={() => {
         actionButton1(!show1); }}> Remove
      </Button>
    ),
    },
    ]);
  
    const defaultColDef = useMemo(() => ({
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ["apply", "reset"],
      },
    }));

    const [rateCodeIDdata, setRateCodeID] = useState([]);
    const rates = [];
    const [completeData, setCompleteData] = useState([]);

    const cellClickedListener = useCallback((event) => {
     //console.log("cellClicked", event);
     rates.push(event.data.rateCodeID);
     setCompleteData(event.data);
     setRateCodeID(rates);
    }, []);

   //console.log(rateCodeIDdata[0])
    const rcViewRates = rateCodeIDdata[0];

    useEffect(() => {
      ////console.log(localStorage.getItem["id"]);
      fetchx(API_URL + `/getAccRatecode?hotelID=1&accountID=${data1.data1.companyid}`)
        .then((result) => result.json())
        .then((rowData) => setRowData(rowData["data"]));
     //console.log(rowData);
    }, [data1.data1.companyid]);
   //console.log(rowData);
   
    const navigatepage = () => {
      navigate('');
  };

 //console.log(rateCodeIDdata);

//  console.log(completeData)

  function Confirm() {
    const updatedItem = JSON.stringify({
    id : completeData.id,
    hotelID:1,
    accountID:data1.data1.companyid,
    rateCodeID: completeData.rateCodeID,      
  });
     fetchx(API_URL + `/deleteAccontRateCodeMap`, {      
    method: "POST",
    body: updatedItem,
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      fetchx(API_URL + `/getAccRatecode?hotelID=1&accountID=${data1.data1.companyid}`)
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
             const swalInstance = MySwal.fire({
        text: "Removed RateCode  Mapped  Successfully!",
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
          actionButton1(false);
        }
      });
    })
    // .then((post) => {
    //           if (post.statusCode === 200) {
    //     setPopUp(false);
    //     fetchx(API_URL +  `/getAccRatecode?hotelID=1&accountID=${data1.data1.companyid}`)
    //       .then((result) => result.json())
    //       .then((rowData) => {
    //       });
    //   }
    // })
    .catch((err) => {
      // console.logerr.message);
    });
}

    return (
      <div>
     {/* {//console.log(rateCodeID[0])}
     {//console.log(rcViewRates)} */}

        <div>
        <Modal isOpen={show} toggle={() => actionButton(!show)} className="modal-lg">
          <ModalHeader toggle={() => actionButton(!show)}> Modify RateCode Details </ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>         
             <RateCodeRoomRates ratecodeViewRates={rcViewRates}/>        
          </ModalBody>
         </Modal>
        </div> 

        <div>
        <Modal isOpen={show1} toggle={() => actionButton1(!show1)} className="modal-sm">
          <ModalHeader toggle={() => actionButton1(!show1)}>  Need To Check..</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>         
             {/* <RateCodeRoomRates ratecodeViewRates={rcViewRates}/>         */}
             <div>
              <b> "Do You Want to Remove Attached RateCode ?";</b>
              <br></br>
              <br></br>
              <div className="d-flex">
                <Button
                  color="primary"
                  className="me-1"
                  // className="text-center"
                  onClick={() => Confirm()}
                >
                  Confirm
                </Button>
                <Button
                  color="danger"
                  className="me-1"
                  // className="text-center"
                  onClick={() => {
                    actionButton1(false);
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
        <Modal isOpen={addRateCode} toggle={() => setaddRateCode(!addRateCode)} className='modal-lg'>
          <ModalHeader className='modal-lg' toggle={() => setaddRateCode(!addRateCode)}> Add RateCodes</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>
            {/* <AccountRateCodeMapping data1={data1} /> */}
            <Companydetails data1={data1}/>
          </ModalBody>
        </Modal>
      </div>  

        <div className="ag-theme-alpine" style={{ height: 150 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            rowSelection="multiple"
            onCellClicked={cellClickedListener}
            // paginationAutoPageSize = 'true'
            // paginationPageSize="10"
            // pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
          />
        </div>
        <br/>
        <div align='end' className='buttons'>    
        <Button className='me-1' color='primary' type='submit' onClick={() => {setaddRateCode(!addRateCode) }}>
           Add RateCode
           </Button>                     
        <Button color="primary" className="me-1" type="button" onClick={navigatepage}>
            Exit
        </Button>
             </div>
      </div>
    );
  };

  export default RateCodeBasicDetails;