import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { Plus } from 'react-feather';

const AddDCUModal = ({ isOpen, toggle, onSubmit, data }) => {

    const isEditMode = !!data; // Check if data is provided for edit mode
    const [formData, setFormData] = useState({
        dcu_ip: '',
        dcu_id: '',
        dcu_location: '',
        dcu_file_location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (formData.dcu_ip && formData.dcu_location && formData.dcu_file_location) {
            onSubmit(formData, isEditMode);
            toggle(); // close modal
        } else {
            alert('Please fill all fields.');
        }
    };
    useEffect(() => {
        if (isOpen) {
            if (data) {
                setFormData({
                    dcu_ip: data.dcu_ip || '',
                    dcu_id: data.dcu_id || '',
                    dcu_location: data.dcu_location || '',
                    dcu_file_location: data.dcu_file_location || '',
                });
            } else {
                setFormData({
                    dcu_ip: '',
                    dcu_id: '',
                    dcu_location: '',

                    dcu_file_location: '',
                });
            }
        }
    }, [data, isOpen]);

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader toggle={toggle}>
                <Plus size={18} style={{ marginRight: 8 }} />
                Add New DCU
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="dcu_id">DCU ID</Label>
                        <Input
                            type="text"
                            name="dcu_id"
                            id="dcu_id"
                            placeholder="Enter DCU ID"
                            value={formData.dcu_id}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="dcu_ip">DCU IP</Label>
                        <Input
                            type="text"
                            name="dcu_ip"
                            id="dcu_ip"
                            placeholder="Enter DCU IP"
                            value={formData.dcu_ip}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="dcu_location">Location</Label>
                        <Input
                            type="text"
                            name="dcu_location"
                            id="dcu_location"
                            placeholder="Enter Location"
                            value={formData.dcu_location}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="dcu_file_location">File Location</Label>
                        <Input
                            type="text"
                            name="dcu_file_location"
                            id="dcu_file_location"
                            placeholder="Enter File Path"
                            value={formData.dcu_file_location}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Save DCU
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddDCUModal;
