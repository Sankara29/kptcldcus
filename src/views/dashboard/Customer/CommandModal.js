

import React, { useEffect, useState } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import dayjs from 'dayjs';
import API_URL from '../../../config';

const CommandModal = ({ isOpen, toggle, meterNo, dcu_id }) => {
    const initialState = {
        commandType: '',
        dateMode: 'single', // 'single' or 'range'
        singleDate: '',
        fromDate: '',
        toDate: '',
        generatedCommand: ''
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal is closed
            setFormData(initialState);
        }
    }, [isOpen]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const formatRangeDate = (date) => {
        return dayjs(date).format('YYYY-MM-DD-00-00-00-00');
    };
    const formatRangeDateto = (date) => {
        return dayjs(date).format('YYYY-MM-DD-00-23-59-00');
    }

    // const generateCommand = async () => {
    //     const { commandType, singleDate, fromDate, toDate, dateMode } = formData;

    //     if (!meterNo || !commandType) return;

    //     let cmd = '';

    //     if (commandType === 'load') {
    //         if (dateMode === 'single' && singleDate) {
    //             cmd = `N|${meterNo}|1|${dayjs(singleDate).format('D-M-YYYY')}`;
    //         } else if (dateMode === 'range' && fromDate && toDate) {
    //             const from = formatRangeDate(fromDate);
    //             const to = formatRangeDateto(toDate);
    //             cmd = `N|${meterNo}|15|${from}_${to}`;
    //         }
    //     } else if (commandType === 'dailyload') {
    //         cmd = `N|${meterNo}|13|1`;
    //     }
    //     else if (commandType === 'billing') {
    //         cmd = `N|${meterNo}|4|1`;
    //     }

    //     if (cmd) {
    //         try {
    //             const apiUrl = `https://api.ms-tech.in/v11/setcommandtogateway?gwid=${meterNo}&command_info=${encodeURIComponent(cmd)}`;
    //             console.log('API URL:', apiUrl);
    //             const res = await fetch(apiUrl, {
    //                 method: 'GET',
    //             });

    //             const getReadableCommand = (commandType, { singleDate, fromDate, toDate, dateMode }) => {
    //                 if (commandType === 'load') {
    //                     if (dateMode === 'single') {
    //                         return `load ${dayjs(singleDate).format('YYYY-MM-DD')}`;
    //                     } else {
    //                         return `load ${dayjs(fromDate).format('YYYY-MM-DD')} to ${dayjs(toDate).format('YYYY-MM-DD')}`;
    //                     }
    //                 } else if (commandType === 'dailyload') {
    //                     return 'dailyload';
    //                 } else if (commandType === 'billing') {
    //                     return 'billing';
    //                 }
    //                 return '';
    //             };
    //             await fetch(`${API_URL}/save-command`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     dcu_id,  // make sure this is available
    //                     meter_no: meterNo,
    //                     ondemand_data: getReadableCommand(commandType, formData)
    //                 })
    //             });




    //             toggle()



    //         } catch (error) {
    //             console.error('API Error:', error);
    //             // You can show an error toast here
    //         }
    //     }

    //     setFormData(prev => ({ ...prev, generatedCommand: cmd }));
    // };

    const generateCommand = async () => {
        const { commandType, singleDate, fromDate, toDate, dateMode } = formData;

        if (!meterNo || !commandType) return;

        let cmd = '';

        if (commandType === 'load') {
            if (dateMode === 'single' && singleDate) {
                cmd = `N|${meterNo}|1|${dayjs(singleDate).format('D-M-YYYY')}`;
            } else if (dateMode === 'range' && fromDate && toDate) {
                const from = formatRangeDate(fromDate);
                const to = formatRangeDateto(toDate);
                cmd = `N|${meterNo}|15|${from}_${to}`;
            }
        } else if (commandType === 'dailyload') {
            cmd = `N|${meterNo}|13|1`;
        } else if (commandType === 'billing') {
            cmd = `N|${meterNo}|4|1`;
        }

        if (cmd) {
            try {

                console.log("DCU ID:", dcu_id);

                // 1️⃣ Decide the API URL based on dcu_id
                const baseApi =
                    dcu_id && dcu_id.startsWith('NSDCU7')
                        ? "https://api.ms-tech.in/v11"      // First backend
                        : "https://api.ms-tech.in/v17";     // Second backend

                const apiUrl = `${baseApi}/setcommandtogateway?gwid=${dcu_id}&command_info=${encodeURIComponent(cmd)}`;

                console.log("API URL:", apiUrl);

                // 2️⃣ Call the selected API
                const res = await fetch(apiUrl, { method: 'GET' });
                const dcuResponse = await res.text();

                // Function to make readable command text
                const getReadableCommand = (commandType, { singleDate, fromDate, toDate, dateMode }) => {
                    if (commandType === 'load') {
                        if (dateMode === 'single') {
                            return `load ${dayjs(singleDate).format('YYYY-MM-DD')}`;
                        } else {
                            return `load ${dayjs(fromDate).format('YYYY-MM-DD')} to ${dayjs(toDate).format('YYYY-MM-DD')}`;
                        }
                    } else if (commandType === 'dailyload') {
                        return 'dailyload';
                    } else if (commandType === 'billing') {
                        return 'billing';
                    }
                    return '';
                };


                const sentAt = dayjs().format("YYYY-MM-DD HH:mm:ss");

                // 3️⃣ Save the command locally
                await fetch(`${API_URL}/save-command`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        dcu_id,
                        meter_no: meterNo,
                        ondemand_data: getReadableCommand(commandType, formData),
                        command_id: dcuResponse.trim(),
                        status: 'pending',
                        sent_at: sentAt,
                    })
                });


                toggle();

            } catch (error) {
                console.error('API Error:', error);
            }
        }

        setFormData(prev => ({ ...prev, generatedCommand: cmd }));
    };


    const {
        commandType,
        dateMode,
        singleDate,
        fromDate,
        toDate,
        generatedCommand
    } = formData;

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Send Command to Meter</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Meter No</Label>
                        <Input value={meterNo} disabled />
                    </FormGroup>

                    <FormGroup>
                        <Label for="commandType">Command Type</Label>
                        <Input
                            type="select"
                            id="commandType"
                            value={commandType}
                            onChange={(e) => handleChange('commandType', e.target.value)}
                        >
                            <option value="">-- Select Command --</option>
                            <option value="load">Load</option>
                            <option value="billing">Billing</option>
                            <option value="dailyload">Daily Load</option>
                        </Input>
                    </FormGroup>

                    {(commandType === 'load' || commandType === 'dailyload') && (
                        <>
                            <FormGroup tag="fieldset">
                                <Label>Date Mode</Label>
                                <FormGroup check>
                                    <Input
                                        type="radio"
                                        name="dateMode"
                                        value="single"
                                        checked={dateMode === 'single'}
                                        onChange={(e) => handleChange('dateMode', e.target.value)}
                                    />
                                    <Label check>One Day</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        type="radio"
                                        name="dateMode"
                                        value="range"
                                        checked={dateMode === 'range'}
                                        onChange={(e) => handleChange('dateMode', e.target.value)}
                                    />
                                    <Label check>Date Range</Label>
                                </FormGroup>
                            </FormGroup>

                            {dateMode === 'single' && (
                                <FormGroup>
                                    <Label for="singleDate">Date</Label>
                                    <Input
                                        type="date"
                                        id="singleDate"
                                        value={singleDate}
                                        onChange={(e) => handleChange('singleDate', e.target.value)}
                                    />
                                </FormGroup>
                            )}

                            {dateMode === 'range' && (
                                <>
                                    <FormGroup>
                                        <Label for="fromDate">From</Label>
                                        <Input
                                            type="date"
                                            id="fromDate"
                                            value={fromDate}
                                            onChange={(e) => handleChange('fromDate', e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="toDate">To</Label>
                                        <Input
                                            type="date"
                                            id="toDate"
                                            value={toDate}
                                            onChange={(e) => handleChange('toDate', e.target.value)}
                                        />
                                    </FormGroup>
                                </>
                            )}
                        </>
                    )}

                    {/* {commandType === 'billing' && (
                        <p><strong>Billing command doesn’t require date input.</strong></p>
                    )} */}
                </Form>

                {/* {generatedCommand && (
                    <div className="mt-3">
                        <Label>Generated Command</Label>
                        <pre>{generatedCommand}</pre>
                    </div>
                )} */}
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={generateCommand}>Generate Command</Button>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CommandModal;

