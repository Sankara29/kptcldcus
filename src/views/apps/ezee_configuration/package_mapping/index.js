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
    const [packageOptions, setPackageOptions] = useState();


    // Ag-Grid column definition
    const [columnDefs, setColumnDefs] = useState([
        {headerName: 'CRS PackageID', field: 'CRSPackageID', cellStyle: {'background-color': '#F1E39B'}, headerClass: "text-center", width: 250},
        {headerName: 'Package', field: 'packageName', cellStyle: {'background-color': 'pink'}, headerClass: "text-center", width: 250},
        {headerName: 'Package Rate', field: 'crsExtraPrice', cellStyle: {'background-color': 'pink'}, headerClass: "text-center", width: 180},
        {headerName: 'Added By', field: 'createdBy', cellStyle: {'background-color': 'pink'}, headerClass: "text-center", width: 350},

    ]);


    useEffect(() => {
        fetchx(API_URL +'/getMappedEzeePackage')
        .then(result => result.json())
        .then(rowData => {
            setRowData(rowData['data'])
        })
    }, []);


    useEffect(() => {
        fetchx(API_URL +'/getPackageCode')
        .then(result => result.json())
        .then(rowData => {
            setPackageOptions(rowData['data'])
        })
    }, []);


    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }


    // On success modal open
    const handleSuccess = (message) => {
        return MySwal.fire({
            title: 'Ezee Package Mapping',
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
        const packageJson = JSON.stringify({
            CRSPackageID:data.crspackageID,
            packageID: data.packageid.value,
            crsExtraPrice: data.packagerate
          })
          fetchx(API_URL + "/mapEzeePackageDetails", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: packageJson
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
                                    {/* CRS PackageID */}
                                    <Col md='3' sm='12' className="me-1">
                                        <Label className="form-label" for="crspackageID">
                                            CRS PackageID <spam style={{ color: 'red' }}>*</spam>
                                        </Label>
                                        <Controller
                                            id='crspackageID'
                                            name='crspackageID'
                                            control={control}
                                            render={({ field }) =>
                                            <Input placeholder="enter crs package id"
                                                required
                                                {...field} />
                                            }
                                        />
                                    </Col>


                                    {/* Mapping Package */}
                                    <Col md='3' sm='12' className="me-1">
                                        <Label className="form-label" for="packageid">
                                            Select Package to map <spam style={{ color: 'red' }}>*</spam>
                                        </Label>
                                        <Controller
                                            id='packageid'
                                            control={control}
                                            name='packageid'
                                            render={({ field }) => (
                                                <Select
                                                    isClearable
                                                    options={packageOptions}
                                                    classNamePrefix='select'
                                                    theme={selectThemeColors}
                                                    className={classnames('react-select')}
                                                    {...field} />
                                            )} />
                                    </Col>

                                    {/* Package Rate */}
                                    <Col md='3' sm='12' className="me-1">
                                        <Label className="form-label" for="packagerate">
                                            Package Price <spam style={{ color: 'red' }}>*</spam>
                                        </Label>
                                        <Controller
                                            id='packagerate'
                                            name='packagerate'
                                            control={control}
                                            render={({ field }) =>
                                            <Input placeholder="enter crs package rate"
                                                required
                                                {...field} />
                                            }
                                        />
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