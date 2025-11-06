// ** React Imports
import { useRef, useState } from "react";
import { Button, Modal, Collapse, CardTitle,ModalHeader, ModalBody, ModalFooter, Alert,Label} from "reactstrap";
import { Card, Row, Col, Form, Input} from "reactstrap";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useEffect, useMemo, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'
import API_URL from "../../../../config";
import { object } from "yup";
import { selectThemeColors } from '@utils'
import classnames from 'classnames'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const RateCodeRoomRates = ({ stepper2,data1}) => {
 ////console.log(data1.data1)
  let navigate = useNavigate();

  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  const [show1, actionButton2] = useState(false);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Rate Code ",
      field: "rateCode",
      suppressSizeToFit: true,
      maxWidth: 130,
      // sort:'asc'
    },
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
      maxWidth: 125,
      cellRendererFramework: (params) => <Button color='primary' onClick={() => actionButton1(params)}> Save </Button>
    },
    {
      headerName: 'Action',
      field: 'numAvlRooms',
      suppressSizeToFit: true,
      maxWidth: 125,
      cellRendererFramework: (show1) => <Button color='primary' onClick={() => actionButton2(show1)}> Remove </Button>
    }
    
  ]);

  const [roomtype, setRoomtype] = useState([]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));



  useEffect(() => {
    // Define the function to fetch data
    const fetchRoomtype = async () => {
      try {
        const response = await fetchx(API_URL + `/getRemainingRoomTypesRates?rateCodeID=${data1.id}`);
        const data = await response.json();
       ////console.log(data['data']);
        setRoomtype(data['data']);
       ////console.log(roomtype); // This will print the updated value of 'roomtype'
      } catch (error) {
        console.error('Error fetching roomtype:', error);
      }
    };

    // Call the function to fetch data
    fetchRoomtype();
  }, []); 

 ////console.log(roomtype)

  
  const [Rate2, setRate2] = useState();
  const lookupValue = (mappings, key) => {
    return mappings[key];
  };

  
  let colourMappings = [
    fetchx(API_URL + "/getExtraDescription?hotelID=1")
      .then((result) => result.json())
      .then((resp) => {
        let extrasArr = []
        colourMappings = resp["data"][0];
        Object.entries(resp["data"]).forEach(([key,value]) =>{
          extrasArr.push(resp["data"][key]['label'])
        })
      }),
  ];


// const colourMappings2 = {
//   EP: 'EP',
//   CP: 'CP',
//   MAP: 'MAP',
//   AP: 'AP'
// }

  const extractKeys = (mappings) => {
    return Object.keys(mappings);
  };
  const colourCodes = extractKeys(colourMappings);

  
  const [data, setData] = useState(null);
 ////console.log(localStorage.getItem("RateCode"))

  const onSubmit = data => {
   ////console.log(localStorage.getItem("RateCodesID"))
    setData(data)
   ////console.log(data)
    if (
      data.oneAdultPrice !== null &&
      data.expiryDate !== null
    ) {
     ////console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        "rateCodeID": data1.id, 
        "roomTypeID": data.roomTypeID.value,
        "oneAdultPrice": data.oneAdultPrice,
        "extraAdultPrice": data.extraAdultPrice,
        "extraChildPrice": data.extraChildPrice,
      })
     ////console.log(createmarketGroup)
      // localStorage.removeItem('RateCodesID')

     ////console.log("hi")
      let res = fetchx(API_URL + "/addrateCodeRoomRate", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then((res) => {
       ////console.log(res);
        if (res['status'] == 200) {
          fetchx(API_URL +`/getAccRatecodeRoomRate?id=${data1.id}`)
            .then(result => result.json())
            .then(rowData => {
              setRowData(rowData['data'])
             ////console.log(rowData['data'])
              const swalInstance = MySwal.fire({
                text: 'Rates Added Successfully!',
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'Close',
                customClass: {
                  confirmButton: 'btn btn-danger'
                }
              });
              swalInstance.then((result) => {
                if (result.isConfirmed) {
                  handleReset();
                  // useEffect();
                  setRoomRatess(false);
                  // fetchx(API_URL +`/getRemainingRoomTypesRates?rateCodeID=${data1.id}`)
                  fetchx(API_URL +`/getAccRatecodeRoomRate?id=${data1.id}`)
                  .then((result) => result.json())
                  .then((rowData) => setRowData(rowData["data"]));
                //////console.log(rowData);                  
               }
              }); 
            })
        }

      });     
    }

  }
//console.log(data1.id)

     //on button click select
    const actionButton1 = (rowval) => {
      let createmarketGroup = JSON.stringify({
        "rateCodeID": data1.id, 
        "roomTypeID": rowval.data['roomTypeID'],
        "oneAdultPrice":Number(rowval.data['oneAdultPrice']),
        "extraAdultPrice": Number(rowval.data['extraAdultPrice']),
        "extraChildPrice": Number(rowval.data['extraChildPrice'])
      })
     ////console.log(createmarketGroup)
      localStorage.removeItem('guestID')

      //////console.log("hi")
     
      let res = fetchx(API_URL+`/updateRateCodeRoomRates`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: createmarketGroup,
      }
    ).then((res) => {
       ////console.log(res);
        if (res['status'] == 200) {
          fetchx(API_URL + `/getAccRatecodeRoomRate?id=${data1.id}`)
            .then(result => result.json())
            .then(rowData => {
              setRowData(rowData['data'])
             ////console.log(rowData['data'])
              const swalInstance = MySwal.fire({
                text: 'Rates Updated Successfully!',
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'Close',
                customClass: {
                  confirmButton: 'btn btn-danger'
                }
              });
              swalInstance.then((result) => {
                if (result.isConfirmed) {
                  // navigate('');
                }
              }); 
            })
        }
      });
    }
  

  //cell click listener
  const cellClickedListener1 = useCallback((event) => {
   ////console.log("cellClicked", event);
   ////console.log(event['data'])
    let data1=event['data']
   ////console.log(data1)
  }, []);

//console.log(localStorage.getItem("ratedata"));

  

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
       ////console.log(rowData["data"]);
        setRate2(rowData["data"]);
      })
      .catch((error) => {
       ////console.log(error);
      });
  }, []);

 ////console.log(Rate2);
  
 const [completeData, setCompleteData] = useState([]);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  //  rates.push(event.data.rateCodeID);
   setCompleteData(event.data);
  //  setRateCodeID(rates);
  }, []);

  useEffect(() => {
 ////console.log(localStorage.getItem["id"]);
  fetchx(API_URL +`/getAccRatecodeRoomRate?id=${data1.id}`)
    .then((result) => result.json())
    .then((rowData) => setRowData(rowData["data"]));
 ////console.log(rowData);

  }, []);
 ////console.log(rowData);

  const buttonListener = useCallback(() => {
    gridRef.current.api.deselectAll();
  }, []);

  const defaultValues = {
    roomTypeID: '',
    oneAdultPrice: '',   
    extraAdultPrice: '',
    extraChildPrice: '',
  }


  
  const { reset, handleSubmit, control } = useForm({ defaultValues });
  const navigatepage = () => {
    navigate('');
};

  const [roomRates, setRoomRatess] = useState();
   // ** Hooks
   const {
    setError,
    formState: { errors }
  } = useForm()

  const handleReset = () => {
    reset({
      roomTypeID: '',
      oneAdultPrice: '',   
      extraAdultPrice: '',
      extraChildPrice: '',
    })
  }


  function Confirm() {
     console.log(completeData)
    const updatedItem = JSON.stringify({
    id : completeData.id,
    hotelID:1,
    rateCodeID: completeData.rateCodeID, 
    roomTypeID:completeData.roomTypeID,
     
  });
     fetchx(API_URL + `/deleteRateCodeRoomRates`, {      
    method: "POST",
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

  return (
    <div>

<div>
        <Modal isOpen={show1} toggle={() => actionButton2(!show1)} className="modal-sm">
          <ModalHeader toggle={() => actionButton2(!show1)}>  Need To Check..</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>         
             {/* <RateCodeRoomRates ratecodeViewRates={rcViewRates}/>         */}
             <div>
              <b> "Do You Want to Remove Attached Room Type Rates ?";</b>
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



      <Modal isOpen={roomRates} toggle={() => setRoomRatess(!roomRates)} className='modal-lg'>
         <ModalHeader className='modal-lg' toggle={() => setRoomRatess(!roomRates)}>
         Add Room Rates
         </ModalHeader>
         <ModalBody className='pb-3 px-sm-5 mx-20'>
         <div>
         <Form onSubmit={handleSubmit(onSubmit)} >

<Row className='justify-content-between align-items-center'>
  <Col md='3' sm='12' className='mb-1'>
    <div className="mb-1">
      <Label className="form-label" for="roomTypeID-${i}">
        Room Type
      </Label>
    <Controller
     id='roomTypeID'
      control={control}
      name='roomTypeID'
      render={({ field }) => (
        <Select
          isClearable
          options={roomtype}
          classNamePrefix='select'
          theme={selectThemeColors}
          className={classnames('react-select', { 'is-invalid': data !== null && data.roomTypeID === null })}
          {...field}
        />
      )}
    />
  </div>
</Col>
  <Col md='3' sm='12' className='mb-1'>
    <div className='mb-1'>
      <Label className='form-label' for='oneAdultPrice-${i}'>
        Adult Price One
      </Label>
      <Controller
        defaultValue=''
        control={control}
        id='oneAdultPrice-${i}'
        name='oneAdultPrice'
        render={({ field }) => <Input placeholder='Adult Price One' invalid={errors.oneAdultPrice && true} {...field} />}
      />
    </div>
  </Col>
  <Col md='3' sm='12' className='mb-1'>
    <div className="mb-1">
      <Label className="form-label" for="extraAdultPrice-${i}">
        Extra Adult Price
      </Label>
      <Controller
        defaultValue=''
        control={control}
        id='extraAdultPrice -${i}'
        name='extraAdultPrice'
        render={({ field }) => <Input placeholder='Extra Adult Price' invalid={errors.extraAdultPrice && true} {...field} />}
      />
    </div>
  </Col>
  <Col md='3' sm='12' className='mb-1'>
    <div className="mb-1">
      <Label className="form-label" for="extraChildPrice-${i}">
        Extra Child Price
      </Label>
      <Controller
        defaultValue=''
        control={control}
        id='extraChildPrice-${i}'
        name='extraChildPrice'
        render={({ field }) => <Input placeholder='Extra Child Price ' invalid={errors.extraChildPrice && true} {...field} />}
      />
    </div>
  </Col>
  </Row>


  <Col md={2}>
  
    <Button className='me-1' color='primary' type='submit'>
      Submit
    </Button>
  </Col>

</Form>
        </div>
         </ModalBody>
         </Modal>


      <br />

      <div>
      <Button color='primary' className='me-1' type='submit' onClick={() => {setRoomRatess(!roomRates)}}>
             Add Room Type And Rates
             </Button>
      </div>
      <br/>
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
      <br/>
          <div align='end' className='buttons'>
           
             <Button color='primary' className='me-1' type='submit' onClick={() => {stepper2.next()}}>
             Next
             </Button>
             <Button color='primary' className='me-1' type='button' onClick={navigatepage}>
            Exit
        </Button>
             </div>
      <br></br>
      <br></br>
        </div>
  );
};
export default RateCodeRoomRates;
