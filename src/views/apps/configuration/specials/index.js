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
import { Card, Form, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText, Input, Row,Modal,ModalHeader,ModalBody  } from 'reactstrap'

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
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import API_URL from '../../../../config'
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// import App from './datagrid' 
// import { specialDescription } from '../repeat'
const colourOptions = [
  { value: '1', label: 'Active' },
  { value: '0', label: 'InActive' },
  
]

const defaultValues = {
  preference: '',
  description: '',
  isActive:null,
  preferenceGroupID:''
}


let specialGroupID = [
  fetchx(API_URL +'/getSpecialGroupID?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      specialGroupID = resp['data']
      console.log(specialGroupID)
    })
  ]



const Specials = () => {
  const [open, setOpen] = useState('')
  const [popUp, setPopUp] = useState(false);

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }
  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();
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
    
    {headerName: 'Preference',field: 'preference',cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 160 },
    {headerName: 'Description',field: 'description',cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 160 },
    {headerName: 'Status', field: 'isActive', cellStyle: { 'text-align': 'center', 'background-color': '#F1E39B' },suppressSizeToFit: true,maxWidth: 150,editable: true,cellEditor: 'agSelectCellEditor', cellEditorParams: {values: colourCodes }, valueFormatter: (params) => { return lookupValue(colourMappings, params.value)},filter: 'agSetColumnFilter'},
    // {headerName: 'Special Group ID',field: 'specialGroupID',cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 160 },  
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
    setPopUp("Do You  Want to Change Preferences Status ?");
    
    } 

  const updatedItem = JSON.stringify({                  
     isActive:event.newValue.split("(")[0]
     })
     console.log(updatedItem)    
     fetchx(API_URL+`/updateSpecials?id=${event.data.id}`, {
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
fetchx(API_URL+ `/updateSpecials`, {
method: 'PUT',
body: updatedItem,
headers: {
'Content-type': 'application/json'
}
})
.then((res) => res.json())
.then((post) => {
 const swalInstance = MySwal.fire({
        text: 'Updated  Status Successfully!',
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
fetchx(API_URL + '/getSpecials?hotelID=1')
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
    console.log('cellClicked', event.data);
    console.log('cellClicked', event.data.isActive);
    
    const currentValue = event.data.isActive;
    console.log(currentValue);
    
    setOldValue(currentValue); // Update the state variable
}, []);

console.log("oldValue",oldValue)

  useEffect(() => {
    fetchx(API_URL +'/getSpecials?hotelID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);

  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })
  let navigate = useNavigate();  

  const onSubmit = data => {
    setData(data)
    if (data.preference.length && data.description.length) {
        console.log(data)
        let createspecial = JSON.stringify({
          "preference"   : data.preference,
          "description" : data.description,
          "isActive" : 1,
          "preferenceGroupID" : data.specialGroupID.value,
          
        })
        console.log(createspecial)
        let res = fetchx(API_URL + "/addSpecials", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: createspecial
        }).then(data => data.json())
        .then((res) => {
          console.log(res);
          if(res['statuscode']==200){
            fetchx(API_URL +'/getSpecials?hotelID=1')
            .then(result => result.json())
            .then(rowData => {setRowData(rowData['data'])
            console.log(rowData['data'])
            const swalInstance = MySwal.fire({
              text: 'Preferences Successfully!',
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
      //   <div className='d-flex'>
      //     <div className='me-1'>
      //       <Avatar size='sm' color='success' icon={<Check size={12} />} />
      //     </div>
      //     <div className='d-flex flex-column'>
      //       <h6>Form Submitted!</h6>
      //       <h4>Specials Added Successfull</h4>
      //     </div>
      //   </div>
      // )
    }
  }

  const handleReset = () => {
    reset({
      preference: '',
      description: '',
      isActive:null,
      preferenceGroupID:''
        
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
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Preferences </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      {/* <CardHeader>
        <CardTitle tag='h4'>Specials</CardTitle>
      </CardHeader> */}
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          <Col md='4' sm='12'>
        <div className='mb-1'>
            <Label className='form-label' for='specialCode'>
            Preference  <spam style={{color:'red'}}>*</spam>
            </Label>
            <InputGroup className='input-group-merge'>
              
              <Controller
                id='preference'
                name='preference'
                control={control}
                render={({ field }) => (
                  <Input
                  required
                   placeholder='Preference'
                  // pattern="[a-zA-Z ]*" title="Type Only Alphabets" 
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.preference === null || !data.preference.length)
                    })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='description'>
            Description <spam style={{color:'red'}}>*</spam>
            </Label>
            <InputGroup className='input-group-merge'>
            
              <Controller
                id='description'
                name='description'
                control={control}
                render={({ field }) => (
                  <Input
                  required
                  // pattern="[A-Za-z0-9_]{1,15}"
                  // title="Description should not contain special characters and should only contain 15 characters"
                  placeholder='Description'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.description === null || !data.description.length)
                    })}
                    // options={{ phone: true, phoneRegionCode: 'US' }}y
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>

          {/* <Col md='4' sm='12'>
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
                    required
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
            <Col  md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='specialGroupID'>
            Special  Group ID
            </Label>
            <Controller
              id="specialGroupID"
              control={control}
              name="specialGroupID"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={specialGroupID}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.specialGroupID === null,
                  })}
                  {...field}
                  
                />
              )}
            />
          </div>
          </Col>

            
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
      </Accordion>
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

export default Specials