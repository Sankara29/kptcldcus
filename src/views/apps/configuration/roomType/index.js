// ** React Imports
import { useState } from "react";
import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import App from "./roomTypeDataTable";
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Custom Components
import Avatar from "@components/avatar";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem,Modal,ModalHeader,ModalBody } from 'reactstrap'
// ** Utils
import { selectThemeColors } from "@utils";
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
const id = '1';
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const roomTypeOptions = [
  { value: "KSUP", label: "KSUP" },
  { value: "TSUP", label: "TSUP" },
  { value: "KDLX", label: "KDLX" },
  { value: "TDLX", label: "TDLX" },
  { value: "KCLB", label: "KCLB" },
  { value: "PM", label: "PM" },
  { value: "TCLB", label: "TCLB" },
  { value: "EXE", label: "EXE" },
];


const defaultValues = {
  // hotelID: "",
      roomType: "",
      maxAdults: "",
      maxChildren: "",
      totalNumOfRooms: "",
      isActive: null,
      roomClassID: null,
}


let roomClassID = [
  fetchx(API_URL +'/getroomtyperoomclassid?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      roomClassID = resp['data']
      // console.log(roomClassID)
    })
  ]

  

const RoomType = () => {
  const [open, setOpen] = useState('')
  const [popUp, setPopUp] = useState(false);

  const lookupValue = (mappings, key) => {
    return mappings[key]
  }

  const colourMappings = {
    1: 'Active',
    0 : 'Inactive',
  }
  const extractKeys = (mappings) => {
    return Object.keys(mappings)
  }
  const colourCodes = extractKeys(colourMappings)

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();
  
  
  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'Room Type',field: 'roomType',cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, headerClass: "text-center" ,maxWidth: 130},
    {headerName: 'Maximum Adults',field: 'maxAdults', cellStyle: {'text-align': 'center','background-color': 'pink'}, headerClass: "text-center" ,maxWidth: 180},
    {headerName: 'Maximum Children',field: 'maxChildren',cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, headerClass: "text-center"  ,maxWidth: 180},
    {headerName: 'Total Number Of Rooms',field: 'totalNumOfRooms',cellStyle: {'text-align': 'center','background-color': 'pink'}, headerClass: "text-center"  ,maxWidth: 200},
    // {headerName: 'Is Active',field: 'isActive',cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, headerClass: "text-center"  ,maxWidth: 120},
    {headerName: 'Active Status', field: 'isActive', cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },suppressSizeToFit: true,maxWidth: 150,editable: true,cellEditor: 'agSelectCellEditor', cellEditorParams: {values: colourCodes }, valueFormatter: (params) => { return lookupValue(colourMappings, params.value)},filter: 'agSetColumnFilter'},
    // {headerName: 'Room Class	',field: 'roomClass',maxWidth: 150},
  ]);
  const [newActiveStatus, setNewActiveStatus] = useState(null);
          const [roomClass, setRoomClassID] = useState(null);

          const onCellValueChanged = useCallback(event => {
            // console.log('onCellValueChanged', event)
            // console.log('data after changes is: ', event.data);
          //  console.log(event)
           let isActive=Number(event.data.isActive);
          //  console.log(isActive)
          //  console.log(event.data.isActive)
         
           let OldValue=oldValue  
          //  console.log(oldValue)
          //  console.log(OldValue)
         
             let ID=event.data['id']
             const IDNumber = event.data.id;
             setRoomClassID(IDNumber); 
          //  console.log(ID)
          //  console.log(event.data.id)
           

            let newActive = event.data.isActive;
            // console.log(newActive)
          //  const oldRoomType = event.oldValue.split("(")[0];
          //   setPrice(newRoomType)
          //   setBasePriceID(ID)
           
            
            if (event.data.isActive !== oldValue) {
              const newActiveStatus = event.data.isActive;
              setNewActiveStatus(newActiveStatus); 
                         const oldActiveStatus = oldValue;
            // setFullData(RoomType,oldRoomType,newRoomType,event.data.date)
            setPopUp('Do You  Want to make room Type Status Change ?');
            
            } 

          const updatedItem = JSON.stringify({            
             isActive:event.newValue.split("(")[0]
             })
            //  console.log(updatedItem)
             fetchx(API_URL + `/updateRoomType?id=${event.data.id}`, {
             method: 'PUT',
             body: updatedItem,
             headers: {
             'Content-type': 'application/json'
             }
             })
             .then((res) => res.json())
             .then((post) => {
              // const swalInstance = MySwal.fire({
              //   text: 'Updated Active Status Successfully!',
              //   icon: 'success',
              //   buttonsStyling: false,
              //   confirmButtonText: 'Close',
              //   customClass: {
              //     confirmButton: 'btn btn-danger'
              //   }
              // });
              // swalInstance.then((result) => {
              //   if (result.isConfirmed) {
                  // navigate('');
              //   }
              // }); 
            //  console.log(post)
             })
             .catch((err) => {
            //  console.log(err.message)
             })         
            }, [])

    // console.log(newActiveStatus)
    // console.log(roomClass)

    // const gridApi = useRef();

    function Confirm (event){
      const updatedItem = JSON.stringify({
        isActive:newActiveStatus, 
        id:roomClass
      })
      // console.log(updatedItem)
      fetchx(API_URL+ `/updateRoomType`, {
      method: 'PUT',
      body: updatedItem,
      headers: {
      'Content-type': 'application/json'
      }
      })
      .then((res) => res.json())
      .then((post) => {
         const swalInstance = MySwal.fire({
                text: 'Updated Active Status Successfully!',
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'Close',
                allowOutsideClick: false, 
                customClass: {
                  confirmButton: 'btn btn-danger'
                }
              });
              swalInstance.then((result) => {
                if (result.isConfirmed) {
                  navigate('');
                }
              });
      // console.log(post)
      if(post.statusCode === 200){
      setPopUp(false)
      fetchx(API_URL + '/getroomclass?hotelID=1')
      .then(result => result.json())
      .then(rowData =>{
      // console.log(rowData['data'])     
      }
      )
      }
      })
      .catch((err) => {
      // console.log(err.message)
      })
      }

 
    const [oldValue, setOldValue] = useState(null);

  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      filterParams :{
      buttons : ['apply','reset']
      }
    }
  ));

  const cellClickedListener = useCallback(event => {
    // console.log('cellClicked', event.data);
    // console.log('cellClicked', event.data.isActive);
    
    const currentValue = event.data.isActive;
    // console.log(currentValue);
    
    setOldValue(currentValue); // Update the state variable
}, []);
console.log("oldValue",oldValue)


  useEffect(() => {
    fetchx(API_URL +'/getroomtype?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    // console.log(rowData['data'])
    })
  }, []);

  // ** State
  const [data, setData] = useState(null);
    const [value, setValue] = useState('')


  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });
let navigate = useNavigate();  
  const onSubmit = (data) => {
    setData(data);
    // console.log(data)
    if (
      // data.hotelID !== null &&
      data.roomType !== null &&
      data.maxAdults !== null &&
      data.maxChildren!==null &&
      data.totalNumOfRooms!==null &&   
      data.roomClassID !== null
    ) {
      // console.log(data);
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "roomType": data.roomType,
        "maxAdults": data.maxAdults,
        "maxChildren": data.maxChildren,
        "totalNumOfRooms": data.totalNumOfRooms,
        "isActive":1,
        "roomClassID": data.roomClassID.value,
        
      });
      // console.log(createasset);
      let res = fetchx(API_URL +"/addroomtype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then(data => data.json())
      .then((res) => {
        // console.log(res);
        if(res['statusCode']==200){
          fetchx(API_URL +'/getroomtype?hotelID=1')
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
          const swalInstance = MySwal.fire({
            text: 'Room Type Added Successfully!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            allowOutsideClick: false, 
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
            }
          });
        })
        }
        else{
          const swalInstance = MySwal.fire({
            text: res.message,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            allowOutsideClick: false, 
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
            }
          });
        }
      });
      // toast(
      //   <div className="d-flex">
      //     <div className="me-1">
      //       <Avatar size="sm" color="success" icon={<Check size={12} />} />
      //     </div>
      //     <div className="d-flex flex-column">
      //       <h6>Form Submitted!</h6>
      //      <h4>Room Type Submitted Successfull</h4>
      //     </div>
      //   </div>
      // );
    }
  };


  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleReset = () => {
    reset({
      // hotelID: "",
      roomType: "",
      maxAdults: "",
      maxChildren: "",
      totalNumOfRooms: "",
      isActive: null,
      roomClassID: null,
    });
  };
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);
  return (
   <div>
     <div className="disabled-animation-modal">
          <Modal
          isOpen={popUp}
          toggle={() => setPopUp(!popUp)}
          className="modal-sm"
          >
          {" "}
          {/*onClosed={onDiscard}*/}
          <ModalHeader
          className="modal-sm"
          toggle={() => {
          setPopUp(!popUp);
          }}
          >
          Need To Check..
          </ModalHeader>
          <ModalBody className="pb-3 px-sm-2 mx-20">
          <div>
          <b>{popUp}</b>
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
           setPopUp(false) , navigate('');  
}         }
          >
          Cancel
          </Button>
          </div>
          </div>
          </ModalBody>
          </Modal>
          </div>
    
      <div>
      <Card>
       <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b> Add Room Type</b></h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      <CardHeader>
        <CardTitle tag="h4">Room Type</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>  
          <Col  md='4' sm='12'>
          <div >
            <Label className="form-label" for="roomType">
            Room Type <spam style={{color:'red'}}>*</spam>
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
                id='roomType'
                name='roomType'
                control={control}
                placeholder='roomType'
                render={({ field }) =>  <Input placeholder="Room Type"
                //  pattern="[a-zA-Z]*" title="Type Only Alphabets" 
                 required 
                 className={classnames({
                  "is-invalid": data !== null && (data.roomType === null || !data.roomType.length)
                })} {...field}/>}
                 
                
              />
            </InputGroup>
          </div>
          </Col>
        
         
          <Col  md='4' sm='12'>
          <div className="mb-1">
            <Label className="form-label" for="maxAdults">
              Maximum Adults <spam style={{color:'red'}}>*</spam>
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
                id='maxAdults'
                name='maxAdults'
                control={control}
                placeholder='maxAdults'
                render={({ field }) =>
                <Input placeholder="Maximum Adults"
                pattern="[1-4]"
                title="Maximum 4 Adults Allowed"
                 required 
                className={classnames({
                  "is-invalid": data !== null && (data.maxAdults === null || !data.maxAdults.length)
                })} {...field}/>}
                
              />
            </InputGroup>
          </div>
          </Col>
          <Col  md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='maxChildren'>
              Maximum Childrens <spam style={{color:'red'}}>*</spam>
            </Label>
            <InputGroup className='input-group-merge'>
              <Controller
                id='maxChildren'
                name='maxChildren'
                control={control}                
                render={({ field }) => (
                  <Input
                  pattern="[0-2]" title="Maximum 2 Children Allowed" 
                  required
                  placeholder='Maximum Children'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.maxChildren === null || !data.maxChildren.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='totalNumOfRooms'>
            Total Number Of Rooms <spam style={{color:'red'}}>*</spam>
            </Label>
            <InputGroup className='input-group-merge'>             
              <Controller
                id='totalNumOfRooms'
                name='totalNumOfRooms'
                control={control}
                render={({ field }) => (
                  <Input
                  pattern="[0-9]*" title="Type Only Numbers" required
                  placeholder='total Number Of Rooms'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.totalNumOfRooms=== null || !data.totalNumOfRooms.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          {/* <Col md='4' sm='12'>
          <div className="mb-1">
            <Label className="form-label" for="isActive">
              Is Active<spam style={{color:'red'}}>*</spam>
            </Label>
            <Controller
              id="isActive"
              control={control}
              name="isActive"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={activeoptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.isActive === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col> */}
          <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='roomClassID'>
            Room Class ID <spam style={{color:'red'}}>*</spam>
            </Label>
            <Controller
              id="roomClassID"
              control={control}
              name="roomClassID"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={roomClassID}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.roomClassID === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit">
              Submit
            </Button>
            <Button
              outline
              color="secondary"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
          </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
        </AccordionBody>
      </AccordionItem>   
    </Accordion>
    </Card>
    </div>
          <div>
        <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="fullName">
            Search
          </Label>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        </Col>
      </div>
    <div className="ag-theme-alpine" style={{ height:540}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            onCellValueChanged={onCellValueChanged}

            // paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
    {/* <App/> */}
    </div>
  );
};

export default RoomType;
