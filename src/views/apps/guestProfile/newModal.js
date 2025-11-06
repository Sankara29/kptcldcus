// ** React Imports
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'

// ** Reactstrap Imports
import { Modal, Input, Label, Button, ModalHeader, ModalBody,  Card, Form, Row, Col, CardBody,InputGroup, InputGroupText } from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { useRef, useEffect, useMemo, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import API_URL from "../../../config";

const defaultValues = {
    IDType: null,
    adharNumber: '',
    panNumber: '',
    drivingLicence: '',
    passportNumber: '',
    expiryDate: null,
    name: '',
}


const IDTypes = [
    { value: 'adharCard', label: 'Adhar Card' },
    { value: 'panCard', label: 'PanCard' },
    { value: 'drivingLicense', label: 'DrivingLicense' },
    { value: 'passport', label: 'Passport' },
];

const type = [
    { value: "Black", label: "Black" },
    { value: "Gold", label: "Gold" },
    { value: "Silver", label: "Silver" },
    { value: "Platinum", label: "Platinum" },
];




const AddNewModal = ({ open, handleModal }) => {



    // Ag Grid
    const [rowData, setRowData] = useState();

    // const gridRef = useRef();

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'IDType', field: 'IDType', suppressSizeToFit: true, maxWidth: 160 },
        { headerName: 'adharNumber ', field: 'adharNumber', suppressSizeToFit: true },
        { headerName: 'panNumber ', field: 'panNumber', suppressSizeToFit: true },
        { headerName: 'driving License Number ', field: 'drivingLicenseNumber', suppressSizeToFit: true },
        { headerName: 'passportNumber ', field: 'passportNumber', suppressSizeToFit: true },
        { headerName: 'Name', field: 'name', suppressSizeToFit: true, maxWidth: 160 },
        // "adharNumber": data.adharNumber,
        // "panNumber": data.panNumber,
        // "drivingLicenseNumber": data.drivingLicence,
        // "passportNumber": data.passportNumber,
        // "expiryDate": data.expiryDate,
        // "name": data.name,
   
    ]);

    // const defaultColDef = useMemo(() => (
    //     {
    //         sortable: true,
    //         filter: true,
    //         filterParams: {
    //             buttons: ['apply', 'reset']
    //         }
    //     }
    // ));

    // const cellClickedListener = useCallback(event => {
    //     console.log('cellClicked', event);
    // }, []);

    useEffect(() => {
        fetchx(API_URL + '/getiddetails?hotelID=1')
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

    const [selectedValue, setSelectedOption] = useState('');

    const handleDropdownChange = (event) => {
        setSelectedOption(event.value);

        console.log(event.value); // print the selected value to console
        if (selectedValue == 'adharCard') {
            console.log("hi")
            //         setitemOptions([{ value: "1", label: "Active" }]) 
        }
        else if (selectedValue == 'panCard') {
            console.log("hi")
            //         setitemOptions([{ value: "1", label: "Active" }]) 
        }
        else if (selectedValue == 'drivingLicense') {
            console.log("hi")
            //         setitemOptions([{ value: "1", label: "Active" }]) 
        }
        else if (selectedValue == 'passport') {
            console.log("hi")
            //         setitemOptions([{ value: "1", label: "Active" }]) 
        }
        else {

            //         setitemOptions({ value: "0", label: "InActive" })
        }
    };




  // ** State
  const [Picker, setPicker] = useState(new Date())

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  const { reset, handleSubmit, control } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    data['IDType'] = selectedValue
    console.log(data)
    if (
        data.IDType !== null &&
        data.name !== null
    ) {
        console.log(data)
        let createmarketGroup = JSON.stringify({
            // "hotelID": data.hotelID,
            "IDType": data.IDType,
            "adharNumber": data.adharNumber,
            "panNumber": data.panNumber,
            "drivingLicenseNumber": data.drivingLicence,
            "passportNumber": data.passportNumber,
            "expiryDate": data.expiryDate,
            "name": data.name,
        })
        console.log(createmarketGroup)
        console.log("hi")
        let res = fetchx(API_URL + "/addIdDetails", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: createmarketGroup
        }).then((res) => {
            console.log(res);
            if (res['status'] == 200) {
                fetchx(API_URL + '/getiddetails?hotelID=1')
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
        IDType: null,
        adharNumber: '',
        panNumber: '',
        drivingLicence: '',
        passportNumber: '',
        expiryDate: null,
        name: '',
    })
}

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>New Record</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        
      <Card>
                {/* <CardHeader>
                    <CardTitle tag='h4'>Floor</CardTitle>
                </CardHeader> */}
                <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col md='6' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="IDType">
                                        ID Type
                                    </Label>
                                    <Controller
                                        id="IDType"
                                        control={control}
                                        name="IDType"
                                        render={({ field }) => (
                                            <Select
                                                theme={selectThemeColors}
                                                className='react-select'
                                                classNamePrefix='select'
                                                // defaultValue={colourOptions[1]}
                                                name='IDType'
                                                options={IDTypes}
                                                isClearable
                                                onChange={handleDropdownChange}
                                                
                          
                                            />
                                        )}
                                    />
                                </div>
                            </Col>

                            {selectedValue === 'adharCard' && (
                                <div>
                                    <Row>
                                        <Col md='6' sm='12' className='mb-1'>
                                            <div className="mb-1">
                                                <Label className="form-label" for="adharNumber">
                                                    Adhar Number
                                                </Label>
                                                <Controller
                                                    defaultValue=''
                                                    control={control}
                                                    id='adharNumber'
                                                    name='adharNumber'
                                                    render={({ field }) => <Input placeholder='adharNumber'
                                                        pattern='[0-9_]{1,15}'
                                                        title="Adhar Number can contain numbers . It cannnot contain alphabets and special characters." required
                                                        invalid={errors.adharNumber && true} {...field} />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )}

                            {selectedValue === 'panCard' && (
                                <div>
                                    <Row>
                                        <Col md='6' sm='12' className='mb-1'>
                                            <div className="mb-1">
                                                <Label className="form-label" for="panNumber">
                                                    Pan Number
                                                </Label>
                                                <Controller
                                                    defaultValue=''
                                                    control={control}
                                                    id='panNumber'
                                                    name='panNumber'
                                                    render={({ field }) => <Input placeholder='Pan Number'
                                                        pattern='[0-9_]{1,15}'
                                                        title="Pan Number can contain numbers . It cannnot contain alphabets and special characters." required
                                                        invalid={errors.panNumber && true} {...field} />}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )}


                            {selectedValue === 'drivingLicense' && (
                                <div>
                                    <Row>
                                        <Col md='6' sm='12' className='mb-1'>
                                            <div className="mb-1">
                                                <Label className="form-label" for="drivingLicence">
                                                    Driving Licence Number
                                                </Label>
                                                <Controller
                                                    defaultValue=''
                                                    control={control}
                                                    id='drivingLicence'
                                                    name='drivingLicence'
                                                    render={({ field }) => <Input placeholder='  Driving Licence'
                                                        pattern='[0-9_]{1,15}'
                                                        title="  Driving Licence can contain numbers . It cannnot contain alphabets and special characters." required
                                                        invalid={errors.drivingLicence && true} {...field} />}
                                                />
                                            </div>
                                        </Col>

                                        <Col md='6' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='dlexpiryDate'>
                                                    Expiry Date
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    id='dlexpiryDate'
                                                    name='dlexpiryDate'
                                                    render={({ field }) => (
                                                        <Flatpickr
                                                            {...field}
                                                            options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                                                            className={classnames('form-control', {
                                                                'is-invalid': data !== null && data.dlexpiryDate === null
                                                            })}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )}

                            {selectedValue === 'passport' && (
                                <div>
                                    <Row>
                                        <Col md='6' sm='12' className='mb-1'>
                                            <div className="mb-1">
                                                <Label className="form-label" for="passportNumber">
                                                    Passport Number
                                                </Label>
                                                <Controller
                                                    defaultValue=''
                                                    control={control}
                                                    id='passportNumber'
                                                    name='passportNumber'
                                                    render={({ field }) => <Input placeholder=' Passport Number'
                                                        pattern='[0-9_]{1,15}'
                                                        title="  Driving Licence can contain numbers . It cannnot contain alphabets and special characters." required
                                                        invalid={errors.passportNumber && true} {...field} />}
                                                />
                                            </div>
                                        </Col>

                                        <Col md='6' sm='12'>
                                            <div className='mb-1'>
                                                <Label className='form-label' for='dlexpiryDate'>
                                                    Expiry Date
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    id='dlexpiryDate'
                                                    name='dlexpiryDate'
                                                    render={({ field }) => (
                                                        <Flatpickr
                                                            {...field}
                                                            options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                                                            className={classnames('form-control', {
                                                                'is-invalid': data !== null && data.dlexpiryDate === null
                                                            })}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )}

                            <Col md='6' sm='12' className='mb-1'>
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
                            <Button color='primary' className='btn-next' onClick={() => stepper.next()}>
                                <span className='align-middle d-sm-inline-block d-none'>Next</span>
                                <ArrowRight size={14} className='align-middle ms-sm-25 ms-0'></ArrowRight>
                            </Button>
                        </div>

                    </Form>
                </CardBody>
            </Card>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
