import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    CardTitle,
    Alert,
    Spinner
} from 'reactstrap';

const AddDCUPort = () => {
    const [formData, setFormData] = useState({
        dcu_id: '',
        meter_no: '',
        port: ''
    });
    const [loading, setLoading] = useState(false);
    const [responseMsg, setResponseMsg] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMsg(null);
        setError(null);

        try {
            const response = await fetch('https://api.ms-tech.in/v11/addDCUPort', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMsg(data.message || 'Success!');
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error(err);
            setError('Network error or server not reachable');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs="12" sm="10" md="6" lg="5">
                    <Card className="shadow-lg border-0 rounded-4">
                        <CardBody>
                            <CardTitle tag="h4" className="text-center mb-4 fw-bold">
                                Add DCU Port Configuration
                            </CardTitle>

                            {responseMsg && <Alert color="success">{responseMsg}</Alert>}
                            {error && <Alert color="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="dcu_id">DCU ID</Label>
                                    <Input
                                        type="text"
                                        id="dcu_id"
                                        name="dcu_id"
                                        placeholder="Enter DCU ID"
                                        value={formData.dcu_id}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="meter_no">Meter No</Label>
                                    <Input
                                        type="text"
                                        id="meter_no"
                                        name="meter_no"
                                        placeholder="Enter Meter No"
                                        value={formData.meter_no}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="port">Port</Label>
                                    <Input
                                        type="text"
                                        id="port"
                                        name="port"
                                        placeholder="Enter Port (e.g., COM3 or 1)"
                                        value={formData.port}
                                        onChange={handleChange}
                                        required
                                    />
                                </FormGroup>

                                <div className="d-grid mt-4">
                                    <Button color="primary" type="submit" disabled={loading}>
                                        {loading ? <Spinner size="sm" /> : 'Submit'}
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddDCUPort;
