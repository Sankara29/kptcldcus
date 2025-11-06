
import React, { useEffect, useState } from 'react';
import {
    Modal, ModalHeader, ModalBody,
    Button, Form, FormGroup, Label, Input, Row, Col, InputGroup, InputGroupText
} from 'reactstrap';
import { Eye, EyeOff } from 'react-feather';

const AddMeterModal = ({ isOpen, toggle, onSubmit, dcuId, meterData }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isEdit = !!meterData;

    const defaultFormState = {
        meter_no: '',
        address: '',
        location: '',
        method: 'RS485',
        port_no: 'Port 1',
        meter_make: 'LT',
        dcu_id: dcuId,
        baud_rate: '9600',
        data_bits: '8',
        parity: 'None',
        stop_bits: '1',
        slave_id_size: '',
        password: ''
    };

    const [form, setForm] = useState(defaultFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form, isEdit);
        toggle();
        setForm({ ...defaultFormState, dcu_id: dcuId });
    };

    useEffect(() => {
        if (isOpen) {
            if (meterData) {
                setForm({ ...meterData });
                setShowPassword(false); // reset password visibility
            } else {
                setForm({ ...defaultFormState, dcu_id: dcuId });
                setShowPassword(false); // reset password visibility
            }
        }
    }, [isOpen, meterData, dcuId]);

    const addressLabel = form.method === 'RS485' ? 'Slave ID' : 'IP Address';

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>Add New Meter</ModalHeader>
            <ModalBody style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                <Form onSubmit={handleSubmit}>
                    {/* Meter Number and Password */}
                    <Row className="">
                        <Col md={6}>
                            <FormGroup>
                                <Label for="meter_no">Meter Number</Label>
                                <Input
                                    type="text"
                                    name="meter_no"
                                    id="meter_no"
                                    value={form.meter_no}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        value={form.password}
                                        onChange={handleChange}
                                    />
                                    <InputGroupText
                                        role="button"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </InputGroupText>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    {/* Communication Method */}


                    <FormGroup className="">
                        <Label for="method">Communication Method</Label>
                        <Input
                            type="select"
                            name="method"
                            id="method"
                            value={form.method}
                            onChange={handleChange}
                        >
                            <option>RS485</option>
                            <option>Ethernet</option>
                        </Input>
                    </FormGroup>
                    <Row className="mb-3">

                        <Col md={6}>
                            <FormGroup>
                                <Label for="meter_make">Meter Make</Label>
                                <Input
                                    type="select"
                                    name="meter_make"
                                    id="meter_make"
                                    value={form.meter_make}
                                    onChange={handleChange}
                                >
                                    <option disabled={form.method === 'Ethernet'}>LT</option>
                                    <option>SECURE</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="location">Meter Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    id="location"
                                    value={form.location}
                                    onChange={handleChange}
                                />
                            </FormGroup>

                        </Col>
                    </Row>



                    {/* Address, Location, Slave ID Size */}
                    <Row className="">
                        <Col md={5}>
                            <FormGroup>
                                <Label for="address">{addressLabel}</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        {form.method === 'RS485' && (
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="slave_id_size">Slave ID Size</Label>
                                    <Input
                                        type="number"
                                        name="slave_id_size"
                                        id="slave_id_size"
                                        value={form.slave_id_size}
                                        onChange={handleChange}
                                        min="1"
                                    />
                                </FormGroup>
                            </Col>
                        )}
                        <Col md={4}>
                            <FormGroup>
                                <Label for="port_no">Port Number</Label>
                                <Input
                                    type="select"
                                    name="port_no"
                                    id="port_no"
                                    value={form.port_no}
                                    onChange={handleChange}
                                >
                                    {form.method === 'RS485' ? (
                                        <>
                                            <option>COM1</option>
                                            <option>COM2</option>
                                            <option>COM3</option>
                                            <option>COM4</option>
                                        </>
                                    ) : (
                                        <>
                                            <option>4059</option>  </>)}
                                </Input>
                            </FormGroup>

                        </Col>
                    </Row>



                    {/* RS485 Settings */}
                    {form.method === 'RS485' && (
                        <>
                            <hr />
                            <h6 className="text-muted mb-3">RS485 Serial Configuration</h6>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="baud_rate">Baud Rate</Label>
                                        <Input
                                            type="select"
                                            name="baud_rate"
                                            id="baud_rate"
                                            value={form.baud_rate}
                                            onChange={handleChange}
                                        >
                                            {[110, 300, 600, 1200, 2400, 4800, 9600].map(rate => (
                                                <option key={rate}>{rate}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="parity">Parity</Label>
                                        <Input
                                            type="select"
                                            name="parity"
                                            id="parity"
                                            value={form.parity}
                                            onChange={handleChange}
                                        >
                                            <option>None</option>
                                            <option>Odd</option>
                                            <option>Even</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="data_bits">Data Bits</Label>
                                        <Input
                                            type="select"
                                            name="data_bits"
                                            id="data_bits"
                                            value={form.data_bits}
                                            onChange={handleChange}
                                        >
                                            {[5, 6, 7, 8].map(bits => (
                                                <option key={bits}>{bits}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="stop_bits">Stop Bits</Label>
                                        <Input
                                            type="select"
                                            name="stop_bits"
                                            id="stop_bits"
                                            value={form.stop_bits}
                                            onChange={handleChange}
                                        >
                                            <option>1</option>
                                            <option>1.5</option>
                                            <option>2</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </>
                    )}

                    {/* Meter Make and DCU ID */}
                    <Row className="mb-4">

                        <Col md={6}>
                            <FormGroup>
                                <Label for="dcu_id">DCU ID</Label>
                                <Input
                                    type="text"
                                    name="dcu_id"
                                    id="dcu_id"
                                    value={form.dcu_id}
                                    readOnly
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Button color="primary" type="submit" block>
                        Add Meter
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default AddMeterModal;
