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
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, Input,InputGroup, InputGroupText } from 'reactstrap'

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
import API_URL from '../../../../config'
// const id = '1';
// API_URL

// import App from './datagrid'
// import SourceCode from '../../otherTables/roomClass'

const defaultValues = {
  // hotelID: '',
  sourceCode: '',
  description: '',
  isActive: null,
  sourceGroupID: null
}

let SourceGroupID = [
  fetchx(API_URL + '/getSourceGroupForSourceCode?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      SourceGroupID = resp['data']
      // console.log(SourceGroupID)
    })
  ]

   const colourOptions = [
       { value: '1', label: 'Active' },
      { value: '0', label: 'InActive' },
      // { value: 'red', label: 'Red' },
      // { value: 'orange', label: 'Orange' }
    ]

const SourceGroup = () => {

  
  // ** Hooks
  const {
    setError,
    formState: { errors }
  } = useForm()


  // window.location.reload(true);
  // Ag Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    // { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 160 },
    { headerName: 'Source Group', field: 'sourceGroup',cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, headerClass: "text-center"  ,suppressSizeToFit: true },
    { headerName: 'Description', field: 'description',cellStyle: {'text-align': 'center','background-color': 'pink'}, headerClass: "text-center"  },
    // { headerName: 'Active Status', field: 'isActive' },

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
    fetchx(API_URL + '/getSourceGroup?hotelID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);
  

  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })
  const [value, setValue] = useState('')

  const onSubmit = data => {
    setData(data)
    // console.log(data)
    if ( 
      data.sourceGroup!==null
       ) {
      // console.log(data)
      let createsourcecode = JSON.stringify({
        // "hotelID": data.hotelID,
        "sourceGroup": data.sourceGroup,
        "description": data.description,
        "isActive": 1,
      })
      // console.log(createsourcecode)
      // console.log("hi")
      let res = fetchx(API_URL + "/addSourceGroup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createsourcecode
      }).then((res) => {
        // console.log(res);
        if(res['status']==200){
          fetchx(API_URL + '/getSourceGroup?hotelID=1')
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
        })
        }
        
      });
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Form Submitted!</h6>
            <h4>Source Group Added Successfull</h4>
          </div>
        </div>
      )
    }
  }

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleReset = () => {
    reset({
      // hotelID: '',
      sourceGroup: '',
      description: '',
      isActive: null
    })
  }

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Source Group</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {/* <Col md='6' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='hotelID'>
                  Hotel ID
                </Label>
                <InputGroup className='input-group-merge'>
                  <InputGroupText
                    className={classnames({
                      'is-invalid': data !== null && (data.hotelID === null || !data.hotelID.length)
                    })}
                  >
                  </InputGroupText>
                  <Controller
                    id='hotelID'
                    name='hotelID'
                    control={control}
                    placeholder='hotelID'
                    render={({ field }) => (
                      <Cleave
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.hotelID === null || !data.hotelID.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col> */}
            {/* <div className='demo-space-x'>
        <TextField
          multiline
          maxRows={4}
          value={value}
          label='Multiline'
          variant='standard'
          onChange={handleChange}
          id='textarea-standard-controlled'
        />
     
        </div> */}
              <Col md='4' sm='12'>            
              <div className="mb-1">
                    <Label className="form-label" for="sourceGroup">
                    Source Group <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="sourceGroup"
                      name="sourceGroup"
                      render={({ field }) => (
                        <Input
                        // pattern="[a-zA-Z ]*" title="Type Only Alphabets"  
                        required
                          placeholder="Source Group"
                        
                          invalid={errors.sourceGroup && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
            </Col>
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='description'>
                  Description
                </Label>
                <InputGroup className='input-group-merge'>
                  
                  <Controller
                    id='description'
                    name='description'
                    control={control}
                    render={({ field }) => (
                      <Input
                      // pattern="[A-Za-z0-9_]{1,15}"
                      // title="Description should not contain special characters and should only contain 15 characters"
                      placeholder='Description'
                        {...field}
                        className={classnames('form-control', {
                          'is-invalid': data !== null && (data.description === null || !data.description.length)
                        })}
                      />
                    )}
                  />
                </InputGroup>
              </div>
            </Col>
            {/* <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='isActive'>
                  Active Status
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
    <div className="ag-theme-alpine" style={{ height: 520}}>
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
    {/* <App/> */}
    </div>
  )
}

export default SourceGroup;
