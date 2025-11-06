// ** React Imports
import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
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
import { useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";
import API_URL from "../../../../config";


// ** Utils
import { selectThemeColors } from "@utils";

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
  Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
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

let id=1;

const defaultValues = {
  EffectiveDate:'',
  
};

const ValidationThirdPartyComponents = () => {
  let navigate = useNavigate(); 

const colourMappings = {
  Active: 'Active',
  Inactive: 'InActive'
}  

const extractKeys = (mappings) => {
  return Object.keys(mappings)
}

const lookupValue = (mappings, key) => {
  return mappings[key]
}

const colourCodes = extractKeys(colourMappings)

  const [rowData, setRowData] = useState();
  const [updatedrowData, setupdatedRowData] = useState([]);
  console.log(updatedrowData.length)
  const [showModal,setshowModal] = useState(false);
  const [showsavebtn,setshowsavebtn] = useState(false)
  const [showPrevbtn,setshowPrevbtn] = useState(false)

  const [data, setData] = useState(null);
  const [today, setToday] = useState('');

  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'hotelID',field: 'hotelID',suppressSizeToFit: true,maxWidth: 100,  },
    {headerName: 'StoreID',field: 'storeID',suppressSizeToFit: true,maxWidth:110},
    {headerName: 'Store Name',field: 'restaurantName',suppressSizeToFit: true,maxWidth:180},
    {headerName: 'menugroup',field: 'menugroup'},
    {headerName: 'status',field: 'status',cellEditor: 'agSelectCellEditor', editable:true,
    cellEditorParams: {
      values: colourCodes
    },
    valueFormatter: (params) => {
      return lookupValue(colourMappings, params.value)
    },
    // cellRenderer: ColourCellRenderer,
    filter: 'agSetColumnFilter'
  },
    {headerName: 'foodType',field: 'foodType'},
    {headerName: 'itemName',field: 'itemName'},
    {headerName: 'basePrice',field: 'basePrice',editable: true},


  ]);
  const gridApiRef = useRef(null);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);
  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
  };
  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      // filterParams :{
      // buttons : ['apply','reset']
      // }
    }
  ));

  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);


  const updatedRowsList = []

  const onCellValueChanged = useCallback( event => {
    console.log('onCellValueChanged', event);
    updatedRowsList[event.data.id] = event.data
    // updatedRowsList[1] = event.data
    setupdatedRowData(updatedRowsList);

     
    console.log(updatedRowsList)
          // console.log(updatedrowData[i])
       
  }, []);


  useEffect(() => {
    console.log("Clicked")
    fetchx(API_URL+'/getmenuitem?hotelID=1')
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  },[]);  

  function ReloadTable() {
    console.log(updatedrowData)
    setRowData(updatedrowData)
    console.log(rowData)
    setshowsavebtn(true)
    setshowPrevbtn(true)
  }
  function handlePrevbtn () {
    navigate('');
  }

  useEffect(() => {
    // Fetch today's date from your API
    fetchx(API_URL + "/getBusinessDatePOS", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hotelID: 1 })
    })
      .then((res) => res.json())
      .then(postres => {
        const businessDate = postres.data[0].businessDate;
        // console.log(businessDate)
        setToday(businessDate);

      })
      .catch(error => {
        console.error("Error fetching business date:", error);
        // Handle the error as needed
      });
  }, []);

  const dateOption = {
    minDate: today,
    allowInput: true
  };
  const onSubmit = (data) => {
    console.log(data.EffectiveDate)
    if(data.EffectiveDate!=''){
      setshowModal(!showModal)
      let effectiveDate = Moment(String(new Date(data.EffectiveDate))).format('YYYY-MM-DD')

    console.log(effectiveDate)
    // for(let i=1;i<updatedrowData.length;i++){
      updatedrowData.forEach(data=>{

        console.log(data)


        
     
      // console.log(updatedrowData[i])
      const updateditem = JSON.stringify({
        "hotelID":data['hotelID'],
        "storeID":data['storeID'],
        "menuGroup":data['menugroup'],
        "foodType":data['foodType'],
        "itemName":data['itemName'],
        "basePrice":data['basePrice'],
        "itemID":data['itemID'],
        "effectiveDate":effectiveDate,
        "addedUser":'Nayana',
        "status":data['status'],
        "itemStatus":"Update"

      })

      console.log(updateditem)
      fetchx(API_URL+'/addtempmenuitem', {
    method: 'POST',
    body: updateditem,
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
    },
 })
    .then((res) => res.json())
    .then((post) => {
        console.log(post)
    })
    .catch((err) => {
       console.log(err.message);
    });
    
  })

  toast(
    <div className="d-flex">
        <div className="me-1">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        </div>
        <div className="d-flex flex-column">
        <h6>Successfully Added to Temp Menu Item</h6>
        </div>
    </div>
    );
    setTimeout(() => { navigate('/apps/posconfiguration/UpdateMenu');},2000)
    // }
  }
}
const onFilterTextBoxChanged = useCallback(() => {
  gridRef.current.api.setQuickFilter(
    document.getElementById("filter-text-box").value
  );
}, []);
  return (
    <>
    <div>
          <Row>
          {/* <Col sm='12'> */}
          {/* <div className='inline-spacing' align="right" style={{ margin: '2px 0' }}> */}
            {/* <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='primary' size='sm' onClick={onBtnExport} >Download CSV file</Button.Ripple> */}
            {/* <Button.Ripple color='primary' size='sm' onClick={Gulbarga}>Gulbarga</Button.Ripple>
            <Button.Ripple color='primary' size='sm' onClick={Bangalore}>Blr</Button.Ripple>
            <Button.Ripple color='primary' size='sm' onClick={Testnode}>Test Nodes</Button.Ripple> */}
            {/* <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} disabled={updatedrowData.length==0} color='primary' size='sm' onClick={ReloadTable} >Preview Changes</Button.Ripple> */}
           {/* {showsavebtn && <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='primary' size='sm' onClick={() => setshowModal(!showModal)} >Save</Button.Ripple>} */}
            
          {/* </div> */}
          {/* </Col> */}
          <div>
    <div className="d-flex align-items-center justify-content-between">
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
      <Col sm="auto">
        <div className="inline-spacing" align="right" style={{ margin: '2px 0' }}>
        <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} disabled={updatedrowData.length==0} color='primary' size='sm' onClick={ReloadTable} >Preview Changes</Button.Ripple>

        {showsavebtn && <Button.Ripple style={{ 'margin-right' : '10px','margin-bottom' :'10px'}} color='primary' size='sm' onClick={() => setshowModal(!showModal)} >Save</Button.Ripple>}

          {showPrevbtn && (
            <Button.Ripple
              style={{ 'margin-right': '10px', 'margin-bottom': '10px' }}
              color="primary"
              size="sm"
              onClick={handlePrevbtn}
            >
              Back
            </Button.Ripple>
          )}
        </div>
      </Col>
    </div>
  </div>
      </Row>
    <Card>
    <div className="ag-theme-alpine" style={{ height: 620}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            // onCellClicked={cellClickedListener}
            onCellValueChanged={onCellValueChanged}
            paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
            // onGridReady={onGridReady}
            
            />
      </div>
      </Card>
      </div>
      <div className='vertically-centered-modal'>
        <Modal isOpen={showModal} toggle={() => setshowModal(!showModal)} className='modal-dialog-centered'>
          <ModalHeader toggle={() => setshowModal(!showModal)}>Select the Effective Date</ModalHeader>
          <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Col md='6' sm='12' className='mb-1'>

          <div className='mb-1'>
            <Label className='form-label' for='EffectiveDate'>
            Effective Date
            </Label>
            <Controller
              control={control}
              id='EffectiveDate'
              name='EffectiveDate'
              render={({ field }) => (
                <Flatpickr
                  {...field}
                  required
                  placeholder="Pick the effective date"
                  options={dateOption} 
                  className={classnames('form-control', {
                    'is-invalid': data !== null && (data.EffectiveDate === null || data.EffectiveDate==='')
                  })}
                />
              )}
            />
          </div>
          </Col>
          <Button type='submit'  color='primary' onClick={() => {}}>
              Submit
            </Button>
          </Form>
          </ModalBody>
          <ModalFooter>
           {' '}
          </ModalFooter>
        </Modal>
    </div>
    </>
    );
};

export default ValidationThirdPartyComponents;
