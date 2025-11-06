import { useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import { Check } from "react-feather";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import Avatar from "@components/avatar";
import { selectThemeColors } from "@utils";
import {Input,Card,Form,Label,Button,CardBody,CardTitle,CardHeader,InputGroup,Row,Col} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback} from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import API_URL from "../../../../config";
const id = '1';

let reasonGroupID = [
  fetchx(API_URL + '/getForeignKeyReasonGroup?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      reasonGroupID = resp['data']
      // console.log(reasonGroupID)
    })
]

const defaultValues = {
    reasonCode: '',
      description: "", 
      reasonGroupID:null,    
      isActive: null
};

const Extras = () => {
  const [open, setOpen] = useState('')
  const toggle = id => { open === id ? setOpen() : setOpen(id)  }  
  const [selectedValue, setSelectedOption] = useState('');
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([  
    {headerName: 'Reason Code',field: 'reasonCode',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    {headerName: 'Description',field: 'description',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140 },
    {headerName: 'Reason Group',field: 'reasonGroup',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },   
    {headerName: 'Is Active',field: 'isActive',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140 },
  ]);
 
  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      filterParams :{
      buttons : ['apply','reset']
      }
    }
  ));

  const cellClickedListener = useCallback( event => {
    // console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetchx(API_URL + '/getAllReasons?hotelID=1')
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

  const onSubmit = (data) => {
    setData(data);
    // console.log(selectedValue)
    data['type']=selectedValue
    // console.log(data)
    // console.log(data.type)
    if (
      // data.hotelID !== null &&
      data.reasonCode !== null 
 
          ) {
      // console.log(data);
      let createExtra = JSON.stringify({
        // "hotelID": data.hotelID,
        "reasonCode": data.reasonCode,
        "description": data.description,
        "reasonGroupID": data.reasonID.value,        
        "isActive":1,
      });
      // console.log(createExtra);

      let res = fetchx(API_URL + "/addReasonCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createExtra,
      }).then((res) => {
        // console.log(res);
        if(res['status']==200){
          fetchx(API_URL + '/getAllReasons?hotelID=1')
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
        })
        }      

        
      });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
            <h4>Reasons Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

 
  const handleReset = () => {
    reset({
        reasonCode: '',
        description: "", 
        reasonGroupID:null,    
        isActive: null
    });
  };  

  return (
    <div>
       <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Reason </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      <CardHeader>
        <CardTitle tag="h4">Reason</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>       
          <Col md='3' sm='12' className='mb-1'>
            <div className='mb-1'>
             
            <Label className='form-label' for='reasonCode'>
              Reason Code
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='reasonCode'
              name='reasonCode'
              render={({ field }) => <Input required placeholder="reason Code" className={classnames({
                "is-invalid": data !== null && (data.reasonCode === null || !data.reasonCode.length)
              })} {...field}/>}
            />
            </InputGroup>
            
          </div>
          </Col>
          <Col md='3' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='description'>
              Description
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='description'
              name='description'
              render={({ field }) => <Input required placeholder="Description" className={classnames({
                "is-invalid": data !== null && (data.description === null || !data.description.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
          {/* <Col md='3' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="groupID">
            Group ID
            </Label>
            <Controller
                  id='groupID'
                  control={control}
                  name='groupID'
                  render={({ field }) => (
                    <Select
                    isMulti
                      isClearable
                      options={groupID}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.groupID === null })}
                      {...field}
                    />
                  )}
                />
          </div>
          </Col> */}
          <Col md='3' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="reasonID">
            Reason Group
            </Label>
            <Controller
                  id='reasonID'
                  control={control}
                  name='reasonID'
                  render={({ field }) => (
                    <Select
                    // isMulti
                      isClearable
                      options={reasonGroupID}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.reasonID === null })}
                      {...field}
                    />
                  )}
                />
          </div>
          </Col>
          
          
          {/* <Col md='3' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="isActive">
              Is Active
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
    <Card>
    <div className="ag-theme-alpine" style={{ height: 540}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
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
  );
};

export default Extras;
