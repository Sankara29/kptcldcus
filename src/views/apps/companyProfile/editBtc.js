import { useState } from "react";
import Select from "react-select";
import classnames from "classnames";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { selectThemeColors } from "@utils";
import { Input, Card, Form, Row, Col, Label, Button, CardBody, } from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect } from "react";
import API_URL from "../../../config";
import { useNavigate } from "react-router-dom";
// ** Third Party Components
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const defaultValues = {
  isBtcApproved: null,
  creditLimit: "",
  tenure: "",
  attachment: "",
};

const btcApproved = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

const Floor = ({ stepper2, type, data1 }) => {

  const [selectedValue, setSelectedValue] = useState(data1.isBTCApproved);
  const [reload, setreload] = useState(true);
  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  const { setError, formState: { errors }, } = useForm();
  const [data, setData] = useState(null);
  const { reset, handleSubmit, control } = useForm({ defaultValues });
  let navigate = useNavigate();
  const [flag, setflag] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  const defaultReason = {
    value: ((data1.isBTCApproved === 0 || data1.isBTCApproved === null) ? "No" : "Yes"),
    label: ((data1.isBTCApproved === 0 || data1.isBTCApproved === null) ? "No" : "Yes"),
  };


  // Function to fetch image URLs
  const fetchImageUrls = async () => {
    try {
      const response = await fetchx(
        API_URL +
        `/getS3ImageID?hotelID=1&source=3&documentTypeID=14&docReferenceID=company_${data1.companyid}`
      );
      const data = await response.json();
      const imageIDs = data["data"];

      // Fetch each image URL separately
      const imageUrls = await Promise.all(
        imageIDs.map(async (imageID) => {
          const imageResponse = await fetchx(
            API_URL + `/images/${imageID["documentID"]}`
          );
          const clonedImageResponse = imageResponse.clone(); // Clone the response
          const blob = await clonedImageResponse.blob()          
          if (blob.type !== "text/html") {
            // Create a URL for the blob data
            const fileUrl = URL.createObjectURL(blob);
            return fileUrl;
          }
          return null; // Skip non-image data
        })
      );

      // Filter out null values (non-image data)
      const filteredImageUrls = imageUrls.filter((url) => url !== null);

      // Set the images state with the filtered image URLs
      setImages(filteredImageUrls);
      //  console.log("All images fetched successfully");
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };


  useEffect(() => {
    // Fetch image URLs when the component mounts
    fetchImageUrls();
  }, []);


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("hotelID", 1);
  formData.append("source", 3);
  formData.append("doctype", 14);
  formData.append("docrefno", "company_" + data1.companyid);

  const handleViewImageClick = (fileData, index) => {
    window.open(fileData, '_blank', 'width=1000,height=800');
  };

  const onSubmit = (data) => {

    if (selectedFile !== null) {
      fetchx(API_URL + '/imgupload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
        })
    }

    let btcEdit = JSON.stringify({
      isBTCApproved: (data.btcApproved3 === undefined ? data1.isBTCApproved : data.btcApproved3.value),
      creditLimit: data.creditLimit1,
      tenure: data.tenure1,
      companyid: data1.companyid,
      hotelID: 10
    }); 

    fetchx(API_URL + `/updateBtcdetails`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: btcEdit,
    }).then((res) => {
      if (res["status"] == 200) {
        fetchx(API_URL + "/getCompleteAccountDetails?hotelID=1")
          .then((result) => result.json())
          .then((rowData) => {
            setRowData(rowData["data"]);
            if (flag == true) {
              const swalInstance = MySwal.fire({
                text: "Company BTC Details Edited Successfully!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Close",
                allowOutsideClick: false,
                customClass: {
                  confirmButton: "btn btn-danger",
                },
              });
              swalInstance.then((result) => {
                if (result.isConfirmed) {
                  navigate("");
                }
              });

            } else if (flag == false) {
              const swalInstance = MySwal.fire({
                text: "Company BTC Details Updated Successfully. Edit Booker Details!",
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "btn btn-danger",
                },
              });
              swalInstance.then((result) => {
                if (result.isConfirmed) {
                  stepper2.next();
                }
              });
            }
          });
      }
    });

  };

  const handleReset = () => {
    reset({
      isBtcApproved: null,
      creditLimit: "",
      tenure: "",
      attachment: "",
    });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>


              <Col md="4" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="btcApproved3">
                    BTC Approved <span style={{ color: 'red' }}> * </span>
                  </Label>
                  <Controller
                    id="btcApproved3"
                    control={control}
                    name="btcApproved3"
                    render={({ field }) => (
                      <Select
                        required
                        isClearable
                        defaultValue={defaultReason}
                        options={btcApproved}
                        classNamePrefix="select"
                        theme={selectThemeColors}
                        className={classnames("react-select")}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


              <Col md="4" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="creditLimit">
                    Credit Limit <span style={{ color: 'red' }}> * </span>
                  </Label>
                  <Controller
                    defaultValue={data1["creditLimit"]}
                    control={control}
                    id="creditLimit1"
                    name="creditLimit1"
                    render={({ field }) => (
                      <Input
                        required
                        placeholder="Credit Limit"
                        invalid={errors.creditLimit1 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


              <Col md="4" sm="12">
                <div className="mb-1">
                  <Label className="form-label" for="tenure1">
                    Tenure(In Days) <span style={{ color: 'red' }}> * </span>
                  </Label>
                  <Controller
                    defaultValue={data1["tenure"]}
                    control={control}
                    id="tenure1"
                    name="tenure1"
                    render={({ field }) => (
                      <Input
                        required
                        placeholder="Number of days"
                        invalid={errors.tenure1 && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Col>


              <Col md="4" sm="12" className="mb-1">
                <div className="mb-1">
                  <Label className="form-label" for="attachment">
                    Upload BTC Attachment
                  </Label>
                  <Controller
                    control={control}
                    id="attachment"
                    name="attachment"
                    placeholder="Add idFile"
                    render={({ }) => (
                      <Input type="file" onChange={handleFileChange} />
                    )}
                  />
                </div>
              </Col>

              <br />
              <h3> &nbsp;&nbsp; View BTC Attachments </h3>
              <br />

              {images.map((imageData, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}  >
                  <h4>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BTC Attachment {index + 1}: &nbsp;&nbsp;
                  </h4>
                  <br />
                  <Button onClick={() => handleViewImageClick(imageData)} color="primary">
                    View Attachment {index + 1}
                  </Button>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              ))}

            </Row>
            <br />
            <br />
            <div className="d-flex justify-content-between">
              <div className="d-flex">
              <Button
                  outline
                  className="me-1"
                  color="secondary"
                  type="reset"
                  onClick={handleReset}
                >
                  Reset
                </Button> 
                <Button className="me-1" color="primary" type="submit" onClick={() => setflag(false)} >
                  Save  
                </Button>
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};
export default Floor;
