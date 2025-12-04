import { Modal } from "reactstrap";
import { DatePicker, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function ReportModal({ reportModalOpen, closeReportModal, generateReport }) {

    const [dates, setDates] = useState([]);

    const handleGenerate = () => {
        if (!dates || dates.length !== 2) {
            alert("Please select date range.");
            return;
        }

        const fromDate = dayjs(dates[0]).format("YYYY-MM-DD");
        const toDate = dayjs(dates[1]).format("YYYY-MM-DD");

        generateReport(fromDate, toDate);
        closeReportModal();
    };

    return (
        <Modal size="md" isOpen={reportModalOpen} toggle={closeReportModal}>
            <div className="modal-header">
                <h5 className="modal-title">Generate Report Of DCU Communication Details</h5>
                <button className="close" onClick={closeReportModal}>
                    &times;
                </button>
            </div>

            <div className="modal-body">
                <label className="mb-2 fw-bold">Select Date Range</label>
                <RangePicker
                    onChange={(value) => setDates(value)}
                    format="DD-MM-YYYY"
                    style={{ width: "100%" }}
                />
            </div>

            <div className="modal-footer">
                <Button type="primary" onClick={handleGenerate}>
                    Generate Report
                </Button>
                <Button onClick={closeReportModal}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}

export default ReportModal;
