// import React, { useState } from "react";

// const MultipleNodeMeterMap = () => {
//     const [records, setRecords] = useState([{ node_id: "", meter_no: "" }]);
//     const [message, setMessage] = useState("");

//     // Handle input change
//     const handleChange = (index, field, value) => {
//         const newRecords = [...records];
//         newRecords[index][field] = value;
//         setRecords(newRecords);
//     };

//     // Add new row
//     const handleAddRow = () => {
//         setRecords([...records, { node_id: "", meter_no: "" }]);
//     };

//     // Remove row
//     const handleRemoveRow = (index) => {
//         const newRecords = [...records];
//         newRecords.splice(index, 1);
//         setRecords(newRecords);
//     };

//     // Submit form
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Basic validation
//         for (let r of records) {
//             if (!r.node_id || !r.meter_no) {
//                 setMessage("Please fill all fields");
//                 return;
//             }
//         }

//         try {
//             const res = await fetch("https://testpms.ms-tech.in/v23/addMultipleNodeMeterMap", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ records }),
//             });

//             const data = await res.json();
//             if (data.status === "success") {
//                 setMessage(`Inserted ${data.insertedCount} records successfully!`);
//                 setRecords([{ node_id: "", meter_no: "" }]); // Reset form
//             } else {
//                 setMessage(`Error: ${data.message}`);
//             }
//         } catch (err) {
//             setMessage("Server error: " + err.message);
//         }
//     };

//     return (
//         <div className="container my-5">
//             <h2 className="mb-4 text-center">Add DCU-Meter Mappings</h2>
//             {message && <div className="alert alert-info">{message}</div>}
//             <form onSubmit={handleSubmit}>
//                 {records.map((r, idx) => (
//                     <div className="row mb-3" key={idx}>
//                         <div className="col-12 col-md-5 mb-2 mb-md-0">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="DCU ID"
//                                 value={r.node_id}
//                                 onChange={(e) => handleChange(idx, "node_id", e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="col-12 col-md-5 mb-2 mb-md-0">
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Meter No"
//                                 value={r.meter_no}
//                                 onChange={(e) => handleChange(idx, "meter_no", e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="col-12 col-md-2">
//                             {idx === 0 ? (
//                                 <button
//                                     type="button"
//                                     className="btn btn-success w-100"
//                                     onClick={handleAddRow}
//                                 >
//                                     +
//                                 </button>
//                             ) : (
//                                 <button
//                                     type="button"
//                                     className="btn btn-danger w-100"
//                                     onClick={() => handleRemoveRow(idx)}
//                                 >
//                                     -
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))}

//                 <button type="submit" className="btn btn-primary w-100">
//                     Submit
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default MultipleNodeMeterMap;

import React, { useState } from "react";

const MultipleNodeMeterMap = () => {
    const [records, setRecords] = useState([{ node_id: "", meter_no: "" }]);
    const [message, setMessage] = useState("");

    const handleChange = (index, field, value) => {
        const newRecords = [...records];
        newRecords[index][field] = value;
        setRecords(newRecords);
    };

    const handleAddRow = () => setRecords([...records, { node_id: "", meter_no: "" }]);
    const handleRemoveRow = (index) => {
        const newRecords = [...records];
        newRecords.splice(index, 1);
        setRecords(newRecords);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        for (let r of records) if (!r.node_id || !r.meter_no) {
            setMessage("Please fill all fields");
            return;
        }
        try {
            const res = await fetch("https://testpms.ms-tech.in/v23/addMultipleNodeMeterMap", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ records }),
            });
            const data = await res.json();
            if (data.status === "success") {
                setMessage(`Inserted ${data.insertedCount} records successfully!`);
                setRecords([{ node_id: "", meter_no: "" }]);
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (err) {
            setMessage("Server error: " + err.message);
        }
    };

    return (
        <div className="">
            <h2 className="mb-4 text-center">Add DCU-Meter Mappings</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                {records.map((r, idx) => (
                    <div
                        key={idx}
                        className="d-flex flex-column flex-sm-row align-items-start mb-3 p-2"
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            gap: "10px"
                        }}
                    >
                        <input
                            type="text"
                            className="form-control flex-fill"
                            placeholder="DCU ID"
                            value={r.node_id}
                            onChange={(e) => handleChange(idx, "node_id", e.target.value)}
                            required
                            style={{ minWidth: "120px" }}
                        />
                        <input
                            type="text"
                            className="form-control flex-fill"
                            placeholder="Meter No"
                            value={r.meter_no}
                            onChange={(e) => handleChange(idx, "meter_no", e.target.value)}
                            required
                            style={{ minWidth: "120px" }}
                        />
                        <div className="d-flex mt-2 mt-sm-0">
                            {idx === 0 ? (
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleAddRow}
                                    style={{ minWidth: "45px" }}
                                >
                                    +
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveRow(idx)}
                                    style={{ minWidth: "45px" }}
                                >
                                    -
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <button type="submit" className="btn btn-primary w-100 mt-2">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MultipleNodeMeterMap;
