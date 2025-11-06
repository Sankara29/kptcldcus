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
import API_URL from '../../../../config'

const defaultValues = {
    isBtcApproved:null,
    creditLimit: '',
    tenure: '',
    attachment:'',

}


const creditLimit = [
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

const btcApproved = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ];

const Floor = ({ stepper, type }) => {

    let getData = JSON.parse(localStorage.getItem('data2'))
    // console.log(getData)
    // console.log(getData['accountsName'])
    // console.log(getData['country']['label'])
    // console.log(getData['isActive']['value'])
    // console.log(getData['state']['value'])
    // console.log(getData['rateCode']['value'])




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
        fetchx(API_URL +"/getCompleteAccountDetails?hotelID=1")
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
            data.maskedCVVCVC !== null &&
            data.expiryDate !== null
        ) {
            console.log(data)
            let createmarketGroup = JSON.stringify({
                // "hotelID": data.hotelID,
                "accountName": getData['accountsName'],
                "addressLine1": getData['addressOne'],
                "accountType": getData['accountType'],
                "commision": getData['commision'],
                "accountManagerID": getData['accountManagerID']['value'],
                "email": getData['email'],
                "addressLine2": getData['addressTwo'],
                "gstID": getData['gst'],
                "financialAssociateID": getData['financialAssociateID']['value'],
                "secondaryEmail": getData['secondaryemail'],
                "country": getData['country']['value'],
                "isActive": getData['isActive']['value'],
                "notes": getData['notes'],
                "phoneNumber": getData['phoneNumber'],
                "state": getData['state']['value'],
                "IATA": getData['iataNumber'],
                "postalCode": getData['postalcode'],
                // "rateCode": getData['rateCode']['value'],
                "city": getData['city'],              
                "isBtcApproved": data.isBtcApproved.value,
                "creditLimit": data.creditLimit,
                "tenure": data.tenure,
                "attachment": data.idFile, 
            })
            console.log(createmarketGroup)
            console.log("hi")
            let res = fetchx(API_URL + "/addAccounts", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: createmarketGroup
            // }).then((res) => {
            //     console.log(res);
            //     // console.log(resp["data"])
            //     if (res['status'] == 200) {
            //         fetchx(API_URL +"/getCompleteAccountDetails?hotelID=1")
            //             .then(result => result.json())
            //             .then(rowData => {
            //                 setRowData(rowData['data'])
            //                 console.log(rowData['data'])
            //             })
            //     }

            // });
        }).then(result => result.json())
        .then(resp => {
          localStorage.setItem("companyData", resp["data"]);
          console.log(resp)
        }).catch((error) => {
          console.log(error)
        })
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
            isBtcApproved:null,
            creditLimit: '',
            tenure: '',
            attachment:'',
            // name: '',
            // expiryDate: '',
            // level: null,
            // expiryDate: null
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
                        <Col md='4' sm='12' className='mb-1'>
                <div className="mb-1">
                  <Label className="form-label" for="isBtcApproved">
                    BTC Approved
                  </Label>
                  <Controller
                    id="isBtcApproved"
                    control={control}
                    name="isBtcApproved"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        options={btcApproved}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select", {
                          "is-invalid": data !== null && data.isBtcApproved === null,
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>
                            <Col md='4' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="creditLimit">
                                        Credit Limit
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='creditLimit'
                                        name='creditLimit'
                                        render={({ field }) => <Input placeholder='Card Number' invalid={errors.creditLimit && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='tenure'>
                                    Tenure(In Days)
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='tenure'
                                        name='tenure'
                                        render={({ field }) => <Input placeholder='Masked Card Number' invalid={errors.tenure && true} {...field} />}
                                    />
                                </div>
                            </Col>
                            <Col md='4' sm='12' className='mb-1'>
                            <div className='mb-1'>
                                <Label className='form-label' for='idFile'>
                                     Attachment
                                </Label>
                                <InputGroup className="input-group-merge">
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='idFile'
                                        name='idFile'
                                        placeholder='Add idFile'
                                        render={({ field }) => <Input type='file'  className={classnames({
                                            "is-invalid": data !== null && (data.idFile === null || !data.idFile.length)
                                        })} {...field} />}
                                    />
                                </InputGroup>
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
