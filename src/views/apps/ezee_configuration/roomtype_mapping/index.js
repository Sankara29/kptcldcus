import React, { useState, useRef, useEffect, useMemo,useCallback } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Input, Card, Form, Label, Button, Row, Col } from 'reactstrap'
import API_URL from '../../../../config'
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import classnames from 'classnames'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
const MySwal = withReactContent(Swal)

const EzeeHotelMapping = (data) => {

    const [open, setOpen] = useState()
    const { reset, handleSubmit, control, formState: { errors } } = useForm({});
    const navigate = useNavigate()
    const gridRef = useRef();
    const [rowData, setRowData] = useState();
    const [roomTypeOptions, setRoomTypeOptions] = useState();


    // Ag-Grid column definition
    const [columnDefs, setColumnDefs] = useState([
        {headerName: 'CRS RoomType ID', field: 'crsRoomTypeID', cellStyle: {'background-color': '#F1E39B'}, headerClass: "text-center", width: 250},
        {headerName: 'Room Type', field: 'roomType', cellStyle: {'background-color': 'pink'}, headerClass: "text-center", width: 180},
        {headerName: 'Added By', field: 'createdBy', cellStyle: {'background-color': 'pink'}, headerClass: "text-center", width: 200},
    ]);


    useEffect(() => {
        fetchx(API_URL +'/getMappedEzeeRoomType')
        .then(result => result.json())
        .then(rowData => {
            setRowData(rowData['data'])
        })
    }, []);


    useEffect(() => {
        fetchx(API_URL +'/getRoomtypesRoom')
        .then(result => result.json())
        .then(rowData => {
            setRoomTypeOptions(rowData['data'])
        })
    }, []);


    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }


    // On success modal open
    const handleSuccess = (message) => {
        return MySwal.fire({
            title: 'Ezee Room Type Mapping',
            text: message,
            icon: 'success',
        },
            setTimeout(() => { navigate('') }, 1000)
        )
    }


    const defaultColDef = useMemo( ()=> (
        {
          sortable: true, 
          filter: true,
          filterParams :{
          buttons : ['apply','reset']
          }
        }
    ));


    // error handling
    const handleError = (message) => {
        return MySwal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            customClass: {
                confirmButton: 'btn btn-danger'
            },
            allowOutsideClick: false,
            confirmButtonText: 'Close',
            confirmButtonColor: 'danger',
            buttonsStyling: false
        })
    }


    // Submit handler
    const onSubmit = (data) => {
        console.log(data.roomtypeid)
        const roomTypeJson = JSON.stringify({
            CRSRoomTypeID:data.crsroomtypeID,
            RoomTypeID: data.roomtypeid.value,
          })
          fetchx(API_URL + "/mapEzeeRoomTypeDetails", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: roomTypeJson
          }).then(result => result.json())
            .then(resp => {
                if(resp.statusCode == 403){
                    handleError(resp.message)
                }
                else{
                    handleSuccess(resp.message)
                }
            }).catch((error) => {
                console.log(error)
            })
    }


    const cellClickedListener = useCallback(event => {
    }, []);


    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setQuickFilter(
          document.getElementById("filter-text-box").value
        );
    }, []);


    return (
        <div>
            <Card>
                <Accordion open={open} toggle={toggle}>
                    <AccordionItem>
                        <AccordionHeader targetId='1'>
                            <h4>
                                <b> EZEE Package Mapping </b>
                            </h4>
                        </AccordionHeader>
                        <AccordionBody accordionId='1'>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    {/* CRS roomTypeID */}
                                    <Col md='4' sm='12' className="me-1">
                                        <Label className="form-label" for="crsroomtypeID">
                                            CRS RoomTypeID <spam style={{ color: 'red' }}>*</spam>
                                        </Label>
                                        <Controller
                                            id='crsroomtypeID'
                                            name='crsroomtypeID'
                                            control={control}
                                            render={({ field }) =>
                                            <Input placeholder="enter crs roomtype id"
                                                required
                                                {...field} />
                                            }
                                        />
                                    </Col>


                                    {/* Mapping Room Type */}
                                    <Col md='4' sm='12' className="me-1">
                                        <Label className="form-label" for="roomtypeid">
                                            Select RoomType to map <spam style={{ color: 'red' }}>*</spam>
                                        </Label>
                                        <Controller
                                            id='roomtypeid'
                                            control={control}
                                            name='roomtypeid'
                                            render={({ field }) => (
                                                <Select
                                                    isClearable
                                                    options={roomTypeOptions}
                                                    classNamePrefix='select'
                                                    theme={selectThemeColors}
                                                    className={classnames('react-select')}
                                                    {...field} />
                                            )} />
                                    </Col>

                                </Row>

                                <br></br><br></br>
                                <Row>
                                    <div align='end' >
                                        <Button outline className='me-1' style={{ align: 'right' }} color="secondary" type="reset">
                                            Reset
                                        </Button>
                                        <Button className="me-1" color="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </Row>

                            </Form>
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
            </Card>

              <div>
        <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="fullName">
            <h5>Search</h5>
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
            rowData={rowData} 
            columnDefs={columnDefs}
            animateRows={true} 
            rowSelection='multiple'
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


export default EzeeHotelMapping 