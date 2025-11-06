// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Select from 'react-select'
import toast from 'react-hot-toast'
import classnames from 'classnames'
import Cleave from 'cleave.js/react'
import { Check } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, Input, InputGroupText,Modal,ModalHeader,ModalBody } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback} from 'react';
// import './roomClass.scss'
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import API_URL from '../../../../config'
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const colourOptions = [
   { value: '1', label: 'Active' },
  { value: '0', label: 'InActive' },

]

const defaultValues = {
  // hotelID: '',
  roomClass: '',
  isActive: null,
}




const SourceCode = () => {

  // AG Grid
  const [rowData, setRowData] = useState();
  const [popUp, setPopUp] = useState(false);

    const gridRef = useRef();
    // ** Hooks
    const {
     setError,
     formState: { errors },
   } = useForm();
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

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Room Class', field: 'roomClass', cellStyle: { 'text-align': 'center','background-color': '#F1E39B' }, headerClass: "text-center"  , suppressSizeToFit: true ,maxWidth: 140 },
        // { headerName: 'Active Status', field: 'isActive' , cellStyle: { 'text-align': 'center', 'background-color': 'pink' }, maxWidth: 140,  },
        {headerName: 'Status', field: 'isActive', cellStyle: { 'text-align': 'center', 'background-color': 'pink' },suppressSizeToFit: true,maxWidth: 150,editable: true,cellEditor: 'agSelectCellEditor', cellEditorParams: {values: colourCodes }, valueFormatter: (params) => { return lookupValue(colourMappings, params.value)},filter: 'agSetColumnFilter'},
          ]);

          const [newActiveStatus, setNewActiveStatus] = useState(null);
          const [roomClass, setRoomClassID] = useState(null);

          const onCellValueChanged = useCallback(event => {
            console.log('onCellValueChanged', event)
            console.log('data after changes is: ', event.data);
           console.log(event)
           let isActive=Number(event.data.isActive);
           console.log(isActive)
           console.log(event.data.isActive)
         
           let OldValue=oldValue  
           console.log(oldValue)
           console.log(OldValue)
         
             let ID=event.data['id']
             const IDNumber = event.data.id;
             setRoomClassID(IDNumber); 
           console.log(ID)
           console.log(event.data.id)
           

            let newActive = event.data.isActive;
            console.log(newActive)
          //  const oldRoomType = event.oldValue.split("(")[0];
          //   setPrice(newRoomType)
          //   setBasePriceID(ID)
           
            
            if (event.data.isActive !== oldValue) {
              const newActiveStatus = event.data.isActive;
              setNewActiveStatus(newActiveStatus); 
                         const oldActiveStatus = oldValue;
            // setFullData(RoomType,oldRoomType,newRoomType,event.data.date)
            setPopUp("Do You  Want to make room Class Status Change  ?");
            
            } 

          const updatedItem = JSON.stringify({            
             isActive:event.newValue.split("(")[0]
             })
             console.log(updatedItem)
             fetchx(API_URL+`/updateRoomClass?id=${event.data.id}`, {
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
             console.log(post)
             })
             .catch((err) => {
             console.log(err.message)
             })         
            }, [])

    console.log(newActiveStatus)
    console.log(roomClass)

    // const gridApi = useRef();

    function Confirm (event){
      const updatedItem = JSON.stringify({
        isActive:newActiveStatus, 
        id:roomClass
      })
      console.log(updatedItem)
      fetchx(API_URL+ `/updateRoomClass`, {
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
      console.log(post)
      if(post.statusCode === 200){
      setPopUp(false)
      fetchx(API_URL + '/getroomclass?hotelID=1')
      .then(result => result.json())
      .then(rowData =>{
      console.log(rowData['data'])     
      }
      )
      }
      })
      .catch((err) => {
      console.log(err.message)
      })
      }

 
    const [oldValue, setOldValue] = useState(null);

    // const cellClickedListener = useCallback(event => {
    //     // console.log('cellClicked', event);
    //     console.log('cellClicked', event.data);
    //     console.log('cellClicked', event.data.isActive);
    //     const oldValue = event.data.isActive
    //     console.log(oldValue)
    // }, []);

    const cellClickedListener = useCallback(event => {
      console.log('cellClicked', event.data);
      console.log('cellClicked', event.data.isActive);
      
      const currentValue = event.data.isActive;
      console.log(currentValue);
      
      setOldValue(currentValue); // Update the state variable
  }, []);

  console.log("oldValue",oldValue)


    useEffect(() => {
        fetchx(API_URL +'/getroomclass?hotelID=1')
            .then(result => result.json())
            .then(rowData => setRowData(rowData['data']))
            
    }, []);

    const defaultColDef = useMemo(() => (
      {
          sortable: true,
          filter: true,
          filterParams: {
              buttons: ['apply', 'reset'] 
          },
          columnDefs: columnDefs,
           rowData: rowData,
           defaultColDef: {
           headerClass: "text-center"
          }
      }
  ));
  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })
  let navigate = useNavigate();  
  const onSubmit = data => {
    setData(data)
    if ( data.marketCode!==null && data.marketGroupID!==null) {
      console.log(data)
      let createmarketCode = JSON.stringify({
        "roomClass": data.roomClass,
        "isActive": 1,
      })
      console.log(createmarketCode)
      let res = fetchx(API_URL +"/addroomclass", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketCode
      }).then(data => data.json())
      .then((res) => {
        console.log(res)
        if(res['statusCode']==200){
          fetchx(API_URL +'/getroomclass?hotelID=1')
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          console.log(rowData['data'])
          const swalInstance = MySwal.fire({
            text: 'Room Class Added Successfully!',
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
     
    }
  }

  const handleReset = () => {
    reset({
      // hotelID: '',
      roomClass: '',
      isActive: null,
    })
  }
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
<UncontrolledAccordion>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Room Class  </b></h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      <CardHeader>
        <CardTitle tag='h4'>Room Class</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>          
            <Col md='6' sm='12'>
            <div className="mb-1">
                    <Label className="form-label" for="roomClass">
                    Room Class <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="roomClass"
                      name="roomClass"
                      render={({ field }) => (
                        <Input
                        // pattern="[a-zA-Z ]*" title="Type Only Alphabets"  
                        required
                          placeholder="Room Class"                        
                          invalid={errors.roomClass && true}
                          {...field}
                        />
                      )}
                    />
                  </div>             
            </Col>
{/*            
            <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='isActive'>
                  Active Status <spam style={{color:'red'}}>*</spam>
                </Label>
                <Controller
                  id='isActive'
                  control={control}
                  name='isActive'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={colourOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.isActive === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col> */}
           

            <div className='d-flex'>
              <Button className='me-1' color='primary' type='submit'>
                Submit
              </Button>
              <Button outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Row>
        </Form>
      </CardBody>
    </Card>    
        </AccordionBody>
      </AccordionItem>
      </UncontrolledAccordion>
</div>
<br></br>
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
<div>
  <Card>
  <div className="ag-theme-alpine" style={{ height: 540}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            onCellValueChanged={onCellValueChanged}
            // paginationAutoPageSize = 'true'
            // singleClickEdit = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>

  </Card>
</div>
   
    </div>
  )
}

export default SourceCode;



// // ** React Imports
// import { useState } from 'react'

// // ** Third Party Components
// import Select from 'react-select'
// import toast from 'react-hot-toast'
// import classnames from 'classnames'
// import Cleave from 'cleave.js/react'
// import { Check } from 'react-feather'
// import Flatpickr from 'react-flatpickr'
// import 'cleave.js/dist/addons/cleave-phone.us'
// import { useForm, Controller } from 'react-hook-form'

// // ** Custom Components
// import Avatar from '@components/avatar'

// // ** Utils
// import { selectThemeColors } from '@utils'

// // ** Reactstrap Imports
// import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// // ** Styles
// import '@styles/react/libs/flatpickr/flatpickr.scss'
// import '@styles/react/libs/react-select/_react-select.scss'
// import '@styles/react/pages/page-form-validation.scss'
// // AG Grid
// import {AgGridReact} from 'ag-grid-react';
// import '/node_modules/ag-grid-community/styles/ag-grid.css';
// import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import { useRef, useEffect, useMemo, useCallback} from 'react';
// // import './roomClass.scss'
// import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
// import API_URL from '../../../../config'
// import { useNavigate } from 'react-router-dom';
// // ** Third Party Components
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal)

// const colourOptions = [
//    { value: '1', label: 'Active' },
//   { value: '0', label: 'InActive' },

// ]

// const defaultValues = {
//   // hotelID: '',
//   roomClass: '',
//   isActive: null,
// }




// const SourceCode = () => {

//   // AG Grid
//   const [rowData, setRowData] = useState();

//     const gridRef = useRef();

//     const lookupValue = (mappings, key) => {
//       return mappings[key]
//     }

//     const colourMappings = {
//       1: 'Active',
//       0 : 'InActive',
//     }
//     const extractKeys = (mappings) => {
//       return Object.keys(mappings)
//     }
//     const colourCodes = extractKeys(colourMappings)

//     const [columnDefs, setColumnDefs] = useState([
//         // { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 160 },
//         { headerName: 'Room Class', field: 'roomClass', cellStyle: { 'text-align': 'center','background-color': '#F1E39B' }, headerClass: "text-center"  , suppressSizeToFit: true ,maxWidth: 140 },
//         // { headerName: 'Active Status', field: 'isActive' , cellStyle: { 'text-align': 'center', 'background-color': 'pink' }, maxWidth: 140,  },
//         {headerName: 'Active Status', field: 'isActive', cellStyle: { 'text-align': 'center', 'background-color': 'pink' },suppressSizeToFit: true,maxWidth: 150,editable: true,cellEditor: 'agSelectCellEditor', cellEditorParams: {values: colourCodes }, valueFormatter: (params) => { return lookupValue(colourMappings, params.value)},filter: 'agSetColumnFilter'},
//           ]);

//           const onCellValueChanged = useCallback(event => {
//             console.log('onCellValueChanged', event)
//             console.log('data after changes is: ', event.data);
//            console.log(event)
//            let isActive=Number(event.data.isActive);
//            console.log(isActive)
//            console.log(event.data.isActive)
         
//            let ID=event.data['id']
//            console.log(ID)
//            console.log(event.data.id)
           
//            console.log(event.oldValue)
//            console.log(event.newValue.split("(")[0])
         
//           //   let newRoomType = event.newValue.split("(")[0];
//           //  const oldRoomType = event.oldValue.split("(")[0];
//           //   setPrice(newRoomType)
//           //   setBasePriceID(ID)
           
            
//           //   if (event.newValue.split("(")[0] !== event.oldValue.split("(")[0]) {
//           //   const newRoomType = event.newValue.split("(")[0];
//           //  const oldRoomType = event.oldValue.split("(")[0];
//           //   // setFullData(RoomType,oldRoomType,newRoomType,event.data.date)
//           //   setPopUp('Do You Really Want to Change '+RoomType + ' Room Type Rate From ' +event.oldValue.split("(")[0] +' to '+ event.newValue.split("(")[0] +' for the date '+event.data.date);
//           //   console.log(fullData)
            
//           //   } 
//           const updatedItem = JSON.stringify({
            
//              isActive:event.newValue.split("(")[0]
//              })
//              console.log(updatedItem)
//              fetchx(`http://122.166.2.21:14800/updateRoomClass?id=${event.data.id}`, {
//              method: 'PUT',
//              body: updatedItem,
//              headers: {
//              'Content-type': 'application/json'
//              }
//              })
//              .then((res) => res.json())
//              .then((post) => {
//               const swalInstance = MySwal.fire({
//                 text: 'Updated Active Status Successfully!',
//                 icon: 'success',
//                 buttonsStyling: false,
//                 confirmButtonText: 'Close',
//                 customClass: {
//                   confirmButton: 'btn btn-danger'
//                 }
//               });
//               swalInstance.then((result) => {
//                 if (result.isConfirmed) {
//                   navigate('');
//                 }
//               }); 
//              console.log(post)
//              })
//              .catch((err) => {
//              console.log(err.message)
//              })         
//             }, [])

//     const onGridReady = (params) => {
//       setGridApi(params.api);
//       params.api.forEachNode((node) => {
//         node.columnApi.getAllColumns().forEach((column) => {
//           const cellRenderer = params.api.getCellRendererInstances({ column, rowNodes: [node] })[0];
//           cellRenderer.getGui().classList.add('ag-full-border');
//         });
//       });
//     };
//     // 
    
//     // const gridApi = useRef();


//     const defaultColDef = useMemo(() => (
//         {
//             sortable: true,
//             filter: true,
//             filterParams: {
//                 buttons: ['apply', 'reset'] 
//             },
//             columnDefs: columnDefs,
//              rowData: rowData,
//              defaultColDef: {
//              headerClass: "text-center"
//             }
//         }
//     ));

//     const cellClickedListener = useCallback(event => {
//         console.log('cellClicked', event);
//     }, []);

//     useEffect(() => {
//         fetchx(API_URL +'/getroomclass?hotelID=1')
//             .then(result => result.json())
//             .then(rowData => setRowData(rowData['data']))
            
//     }, []);

//   // ** State
//   const [data, setData] = useState(null)

//   // ** Hooks
//   const { reset, handleSubmit, control } = useForm({ defaultValues })
//   let navigate = useNavigate();  
//   const onSubmit = data => {
//     setData(data)
//     if ( data.marketCode!==null && data.marketGroupID!==null) {
//       console.log(data)
//       let createmarketCode = JSON.stringify({
//         // "hotelID": data.hotelID,
//         "roomClass": data.roomClass,
//         "isActive": data.isActive.value,
//       })
//       console.log(createmarketCode)
//       let res = fetchx(API_URL +"/addroomclass", {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: createmarketCode
//       }).then(data => data.json())
//       .then((res) => {
//         console.log(res)
//         if(res['status']==200){
//           fetchx(API_URL +'/getroomclass?hotelID=1')
//           .then(result => result.json())
//           .then(rowData => {setRowData(rowData['data'])
//           console.log(rowData['data'])
//           const swalInstance = MySwal.fire({
//             text: 'Room Class Added Successfully!',
//             icon: 'success',
//             buttonsStyling: false,
//             confirmButtonText: 'Close',
//             customClass: {
//               confirmButton: 'btn btn-danger'
//             }
//           });
//           swalInstance.then((result) => {
//             if (result.isConfirmed) {
//               navigate('');
//             }
//           });
//         })
//         }
//         else{
//           const swalInstance = MySwal.fire({
//             text: res.message,
//             icon: 'error',
//             buttonsStyling: false,
//             confirmButtonText: 'Close',
//             customClass: {
//               confirmButton: 'btn btn-danger'
//             }
//           });
//           swalInstance.then((result) => {
//             if (result.isConfirmed) {
//               navigate('');
//             }
//           });
//         }
//       });
//       // toast(
//       //   <div className='d-flex'>
//       //     <div className='me-1'>
//       //       <Avatar size='sm' color='success' icon={<Check size={12} />} />
//       //     </div>
//       //     <div className='d-flex flex-column'>
//       //       <h6>Form Submitted!</h6>
//       //       <h4>Room Class Added Successfull</h4>
//       //     </div>
//       //   </div>
//       // )
//     }
//   }

//   const handleReset = () => {
//     reset({
//       // hotelID: '',
//       roomClass: '',
//       isActive: null,
//     })
//   }

//   return (
//     <div>


//     <div>
// <UncontrolledAccordion>
//       <AccordionItem>
//         <AccordionHeader targetId='1'><h4><b>Add Room Class  </b></h4></AccordionHeader>
//         <AccordionBody accordionId='1'>
//         <Card>
//       <CardHeader>
//         <CardTitle tag='h4'>Room Class</CardTitle>
//       </CardHeader>
//       <CardBody>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <Row>          
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='roomClass'>
//                   Room Class <spam style={{color:'red'}}>*</spam>
//                 </Label>
//                 <InputGroup className='input-group-merge'>
                  
//                   <Controller
//                     id='roomClass'
//                     name='roomClass'
//                     control={control}              
//                     render={({ field }) => (
//                       <Cleave
//                         {...field}
//                         pattern="[a-zA-Z]*" title="Type Only Alphabets" required 
//                         placeholder='Room Class'
//                         className={classnames('form-control', {
//                           'is-invalid': data !== null && (data.roomClass === null || !data.roomClass.length)
//                         })}
//                       />
//                     )}  
//                   />
//                 </InputGroup>
//               </div>
//             </Col>
           
//             <Col md='6' sm='12'>
//               <div className='mb-1'>
//                 <Label className='form-label' for='isActive'>
//                   Active Status <spam style={{color:'red'}}>*</spam>
//                 </Label>
//                 <Controller
//                   id='isActive'
//                   control={control}
//                   name='isActive'
//                   render={({ field }) => (
//                     <Select
//                       isClearable
//                       options={colourOptions}
//                       classNamePrefix='select'
//                       theme={selectThemeColors}
//                       className={classnames('react-select', { 'is-invalid': data !== null && data.isActive === null })}
//                       {...field}
//                     />
//                   )}
//                 />
//               </div>
//             </Col>
           

//             <div className='d-flex'>
//               <Button className='me-1' color='primary' type='submit'>
//                 Submit
//               </Button>
//               <Button outline color='secondary' type='reset' onClick={handleReset}>
//                 Reset
//               </Button>
//             </div>
//           </Row>
//         </Form>
//       </CardBody>
//     </Card>    
//         </AccordionBody>
//       </AccordionItem>
//       </UncontrolledAccordion>
// </div>
// <br></br>

// <div>
//   <Card>
//   <div className="ag-theme-alpine" style={{ height: 540}}>
//         <AgGridReact 
//             ref={gridRef}
//             rowData={rowData} columnDefs={columnDefs}
//             animateRows={true} rowSelection='multiple'
//             onCellClicked={cellClickedListener}
//             onCellValueChanged={onCellValueChanged}
//             // paginationAutoPageSize = 'true'
//             // singleClickEdit = 'true'
//             paginationPageSize= '10'
//             pagination = 'true'
//             defaultColDef={defaultColDef}
//             headerColor="ddw-primary"
            
//             />
//       </div>

//   </Card>
// </div>
   
//     </div>
//   )
// }

// export default SourceCode;