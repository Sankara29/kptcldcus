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
import { Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader,Input, InputGroup, InputGroupText } from 'reactstrap'

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
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const defaultValues = {
 
  block: ''

}

const Block = () => {
  
  useEffect(() => {
    fetchx(API_URL +'/getBlock?hotelID=1')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

   const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Block ',field: 'block',suppressSizeToFit: true,cellStyle: {'textAlign': 'center','backgroundColor': '#F1E39B'}, maxWidth: 140 },
    
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

  // useEffect(() => {
  //   fetchx(API_URL + '/block?hotelID=1')
  //   .then(result => result.json())
  //   .then(rowData => setRowData(rowData['data']))
  // }, []);


  // ** State
  const [data, setData] = useState(null)

  // ** Hooks
  const { reset, handleSubmit, control } = useForm({ defaultValues })
  let navigate = useNavigate();  

  const onSubmit = data => {
    setData(data)
    if ( data.block.length) {
      // console.log(data)
      let createmarketGroup = JSON.stringify({
        // "hotelID": data.hotelID,
        "block": data.block,
      })
      // console.log(createmarketGroup)
      let res = fetchx(API_URL + "/addBlock", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then(data => data.json())
      .then((res) => {
        // console.log(res);
        // console.log(res.message);
        if(res['statusCode']==200){
          fetchx(API_URL + '/getBlock?hotelID=1')
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
          const swalInstance = MySwal.fire({
            text: 'Block Added Successfully!',
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
      //       <ul className='list-unstyled mb-0'>
      //         {/* <li>
      //           <strong>Hotel ID</strong>: {data.hotelID}
      //         </li> */}
      //         <li>
      //           <strong>Block</strong>: {data.block}
      //         </li>

      //       </ul>
      //     </div>
      //   </div>
      // )
    }
  }

  const handleReset = () => {
    reset({
    
      block: ''
    })
  }
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);
  return (
    <div>
      <UncontrolledAccordion>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b> Add Block</b></h4></AccordionHeader>
        <AccordionBody accordionId='1'> 
    <Card>
      {/* <CardHeader>
        <CardTitle tag='h4'>Block</CardTitle>
      </CardHeader> */}
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='block'>
                  Block
                </Label>
                <InputGroup className='input-group-merge'>
                  
                  <Controller
                    id='block'
                    name='block'
                    control={control}
                    placeholder='block'
                    render={({ field }) => 
                      <Input placeholder='Block'
                      // pattern="[a-zA-Z ]*" title="Type Only Alphabets" 
                      required 
                       {...field} />}
                  />
                </InputGroup>
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
      </UncontrolledAccordion>
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

export default Block