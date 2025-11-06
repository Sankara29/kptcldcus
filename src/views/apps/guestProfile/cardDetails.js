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
import { Input, Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, InputGroup, InputGroupText } from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather'
// const id = '1';
// import App from './datagrid'
import API_URL from "../../../../config";

const defaultValues = {
    cardNumber: null,
    maskedCVVCVC	: '',
    name: '',
    expiryDate: '',
    level: null,
    expiryDate: null
}


const cardNumber = [
    { value: "OterraBlack", label: "OterraBlack" },
    { value: "OterraGold", label: "OterraGold" },
    { value: "OterraSilver", label: "OterraSilver" },
    { value: "OterraPlatinum", label: "OterraPlatinum" },
];

const levels = [
    { value: "Black", label: "Black" },
    { value: "Gold", label: "Gold" },
    { value: "Silver", label: "Silver" },
    { value: "Platinum", label: "Platinum" },
];



const Floor = ({stepper, type }) => {

    // Ag Grid
    const [rowData, setRowData] = useState();

    const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Hotel ID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 160 },
        { headerName: 'Floor ', field: 'floor', suppressSizeToFit: true },
        { headerName: 'Block ID', field: 'blockID', suppressSizeToFit: true, maxWidth: 160 },
    ]);

    const defaultColDef = useMemo(() => (
        {
            sortable: true,
            filter: true,
            filterParams: {
                buttons: ['apply', 'reset']
            }
        }
    ));

    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    useEffect(() => {
        fetchx(API_URL + '/floor?hotelID=1&floor=1&blockID=1')
            .then(result => result.json())
            .then(rowData => setRowData(rowData['data']))
    }, []);


    // ** Hooks
    const {
        setError,
        formState: { errors }
    } = useForm()



    // ** State
    const [data, setData] = useState(null)

    // ** Hooks
    const { reset, handleSubmit, control } = useForm({ defaultValues })

    const onSubmit = data => {
        setData(data)
        console.log(data)
        if (
            data.maskedCVVCVC	 !== null &&
            data.expiryDate !== null
        ) {
            console.log(data)
            let createmarketGroup = JSON.stringify({
                // "hotelID": data.hotelID,
                "cardNumber": data.cardNumber.value,
                "maskedCVVCVC	": data.maskedCVVCVC	,
                "nameOnCard": data.name,
                "expiryDate": data.expiryDate,
                "Level": data.level.value,
                "expiryDate": data.expiryDate,

            })
            console.log(createmarketGroup)
            console.log("hi")
            let res = fetchx(API_URL + "/addmembershipdetails", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: createmarketGroup
            }).then((res) => {
                console.log(res);
                if (res['status'] == 200) {
                    fetchx(API_URL + '/floor?hotelID=1&floor=1&blockID=1')
                        .then(result => result.json())
                        .then(rowData => {
                            setRowData(rowData['data'])
                            console.log(rowData['data'])
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
                        <h4>Floor Added Successfull</h4>
                    </div>
                </div>
            )
        }
    }

    const handleReset = () => {
        reset({
            cardNumber: null,
            maskedCVVCVC	: '',
            name: '',
            expiryDate: '',
            level: null,
            expiryDate: null
        })
    }

    return (
        <div>
            <Card>
                {/* <CardHeader>
                    <CardTitle tag='h4'>Floor</CardTitle>
                </CardHeader> */}
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md='3' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="cardNumber">
                                    Card Number
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='cardNumber'
                                        name='cardNumber'
                                        render={({ field }) => <Input placeholder='Card Number' invalid={errors.cardNumber && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='3' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='maskedCardNumber'>
                                    Masked Card Number
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='maskedCardNumber'
                                        name='maskedCardNumber'
                                        render={({ field }) => <Input placeholder='Masked Card Number' invalid={errors.maskedCardNumber && true} {...field} />}
                                    />
                                </div>
                            </Col>
                          

                            <Col md='3' sm='12' className='mb-1'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='name'>
                                        Name On Card
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='name'
                                        name='name'
                                        render={({ field }) => <Input placeholder='Name' invalid={errors.name && true} {...field} />}
                                    />
                                </div>
                            </Col>

                            <Col md='3' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='expiryDate'>
                                       Expiry Date
                                    </Label>
                                    <Controller
                                        control={control}
                                        id='expiryDate'
                                        name='expiryDate'
                                        render={({ field }) => (
                                            <Flatpickr
                                                {...field}
                                                options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                                                className={classnames('form-control', {
                                                    'is-invalid': data !== null && data.expiryDate === null
                                                })}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col md='3' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='CVVCVC	'>
                                    CVV/CVC	
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='CVVCVC	'
                                        name='CVVCVC	'
                                        render={({ field }) => <Input placeholder='CVVCVC' invalid={errors.CVVCVC	 && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='3' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='maskedCVVCVC	'>
                                    Masked CVV/CVC	
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='maskedCVVCVC	'
                                        name='maskedCVVCVC	'
                                        render={({ field }) => <Input placeholder="Masked CVVCVC" invalid={errors.maskedCVVCVC	 && true} {...field} />}
                                    />
                                </div>
                            </Col>                                                       
                        </Row>
                        <div className='d-flex'>
                            <Button className='me-1' color='primary' type='submit'>
                                Submit
                            </Button>
                            <Button outline color='secondary' type='reset' onClick={handleReset}>
                                Reset
                            </Button>
                        </div>

                        <br></br>
                        <br></br>

                        <div className='d-flex justify-content-between'>
                            <Button color='primary' className='btn-prev' onClick={() => stepper.previous()}>
                                <ArrowLeft size={14} className='align-middle me-sm-25 me-0'></ArrowLeft>
                                <span className='align-middle d-sm-inline-block d-none'>Previous</span>
                            </Button>
                            
                        </div>

                    </Form>
                </CardBody>
            </Card>
            {/* <div className="ag-theme-alpine" style={{ height: 520 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    onCellClicked={cellClickedListener}
                    // paginationAutoPageSize = 'true'
                    paginationPageSize='10'
                    pagination='true'
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"

                />
            </div> */}
            {/* <App/> */}
        </div>
    )
}

export default Floor;
