import { useState } from 'react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { useForm, Controller } from 'react-hook-form'
import { Card, Form, Row, Col, Label, Button, CardBody,Input, InputGroup } from 'reactstrap'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'
import { useRef, useEffect, useMemo, useCallback} from 'react';
import API_URL from '../../../../config'
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const defaultValues = { 
  reservationTypeCode: ''
}

const ReservationTypeData = () => {
  
  useEffect(() => {
    fetchx(API_URL +'/getReservationTypeData?hotelID=10')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);
  const { setError, formState: { errors },} = useForm();
  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  const [data, setData] = useState(null)
  const { reset, handleSubmit, control } = useForm({ defaultValues })
  let navigate = useNavigate();  
   const [columnDefs, setColumnDefs] = useState([
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Reservation Type ',field: 'reservationTypeCode',suppressSizeToFit: true,cellStyle: {'textAlign': 'center','backgroundColor': '#F1E39B'}, maxWidth: 200 },
    {headerName: 'Description', field: 'description', suppressSizeToFit: true,cellStyle: {'text-align': 'center','backgroundColor': 'pink'}, maxWidth: 180 },

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
  }, []);

  const onSubmit = data => {
    setData(data)
      let createmarketGroup = JSON.stringify({
        "hotelID": data.hotelID,
        "reservationTypeCode": data.reservationTypeCode,
        "description": data.description,
        "isActive": 1,
      })
      // console.log(createmarketGroup)
      let res = fetchx(API_URL + "/addReservationTypeData", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: createmarketGroup
      }).then(data => data.json())
      .then((res) => {

        if(res['statusCode']==200){
          fetchx(API_URL + '/getReservationTypeData?hotelID=1')
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
          const swalInstance = MySwal.fire({
            text: 'Reservation Type Added Successfully!',
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

  const handleReset = () => {
    reset({    
      reservationTypeCode: '',
      description:''
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
        <AccordionHeader targetId='1'><h4><b> Add Reservation Type</b></h4></AccordionHeader>
        <AccordionBody accordionId='1'> 
    <Card>
          <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          
            <Col md='4' sm='12'>
              <div className='mb-1'>
                <Label className='form-label' for='reservationTypeCode'>
                Reservation Type Code
                </Label>
                <InputGroup className='input-group-merge'>
                  
                  <Controller
                    id='reservationTypeCode'
                    name='reservationTypeCode'
                    control={control}
                    placeholder='reservationTypeCode'
                    render={({ field }) => 
                      <Input placeholder='Reservation Type'
                      // pattern="[a-zA-Z ]*" title="Type Only Alphabets" 
                      required 
                       {...field} />}
                  />
                </InputGroup>
              </div>
            </Col>

            <Col md='4' sm='12'>
            <div className="mb-1">
                    <Label className="form-label" for="description">
                      Description <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="description"
                      name="description"
                      render={({ field }) => (
                        <Input
                          placeholder="Description"
                          required
                          invalid={errors.description && true}
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
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
    </div>
  )
}
export default ReservationTypeData