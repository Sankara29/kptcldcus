import { useState } from "react";
import Select from "react-select";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { selectThemeColors } from "@utils";
import Moment from "moment";
import { Input, Card, Form, Row, Col, Label, Button, Modal, ModalHeader, ModalBody,} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'
import { useRef, useEffect, useMemo, useCallback } from "react";
import API_URL from "../../../config";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const defaultValues = {
  IDType1: null,
  idNumber1: "",
  issueDate1: "",
  expiryDate1: "",
  issuePlace1: "",
  name1: "",
  idFile1: "",
};

const IDTypes = [
  { value: "Aadhar Card", label: "Aadhar Card" },
  { value: "Pan Card", label: "Pan Card" },
  { value: "Driving License", label: "Driving License" },
  { value: "passport", label: "Passport" },
];


const IDDetails = ({ stepper, type, data1 }) => {
  const [idDetail, setIDDetails] = useState();
  const [reload, setreload] = useState(true);
  const [load, setload] = useState(true);
  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  let navigate = useNavigate();
  const {setError,formState: { errors },} = useForm();
  const [data, setData] = useState(null);
  const today = Moment().format('YYYY-MM-DD');
  const options = { minDate: today};
  const options1 = { maxDate: today}; 
  const [selectedValue, setSelectedOption] = useState("");
  const lookupValue = (mappings, key) => { return mappings[key]}
  const colourMappings = {
    AdharCard: 'AdharCard',
    PanCard : 'PanCard',
    Passport: 'Passport',
  }
  const extractKeys = (mappings) => {
    return Object.keys(mappings)
  }
  const colourCodes = extractKeys(colourMappings)
  
  const [columnDefs, setColumnDefs] = useState([
    { headerName: "Name",field: "nameOnDocument",suppressSizeToFit: true,maxWidth: 150,},    
    {headerName: "IDType", field: "IDType", suppressSizeToFit: true,maxWidth: 150,cellEditor: 'agSelectCellEditor', cellEditorParams: {values: colourCodes }, valueFormatter: (params) => { return lookupValue(colourMappings, params.value)},filter: 'agSetColumnFilter'},
    { headerName: "idNumber ", field: "idNumber", suppressSizeToFit: true ,maxWidth: 150,},
    { headerName: "IssuePlace ", field: "issuePlace", suppressSizeToFit: true ,maxWidth: 150,},
    // { headerName: "Issue Date ", field: "issueDate", suppressSizeToFit: true,maxWidth: 140, },
    { headerName: "ExpiryDate ", field: "expiryDate", suppressSizeToFit: true,maxWidth: 150, },
    // { headerName: "Document File ", field: "idFile", suppressSizeToFit: true ,maxWidth: 150,},
 ]);

  const onCellValueChanged = useCallback(event => {
    const updatedItem = JSON.stringify({
      guestID: event.data.guestID,
      IDType: event.data.IDType,
      idNumber:event.data.idNumber,
      issueDate:event.data.issueDate,
      expiryDate:event.data.expiryDate,
      issuePlace:event.data.issuePlace,
      nameOnDocument:event.data.nameOnDocument,
      idFile:event.data.idFile,
    })
    fetchx(API_URL + `/updateiddetails?guestID=${event.data.guestID}`, {
      method: 'PUT',
      body: updatedItem,
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((post) => {
        navigate('')  
      })
      .catch((err) => {
      })
  }, [])

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
  }, []);

  useEffect(() => {
   // Fetch image URLs when the component mounts
   fetchImageUrls();

    fetchx(API_URL + `/getiddetails?guestID=${localStorage.getItem("id")}`)
      .then((result) => result.json())
      .then((rowData) => 
      setRowData(rowData["data"]));
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.value);
    if (selectedValue == "drivingLicense") {
    }  
    else {
    }
  };


  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const { reset, handleSubmit, control,watch } = useForm({ defaultValues });

     // Function to fetch image URLs
     const fetchImageUrls = async () => {
      try {
        const response = await fetchx(
          API_URL +`/getS3ImageID?hotelID=10&source=2&documentTypeID=12&docReferenceID=guest_${localStorage.getItem('guestID')}`);
        const data = await response.json();
      const imageIDs = data['data'];
  
        // Fetch each image URL separately
      const imageUrls = await Promise.all(imageIDs.map(async (imageID) => {
        // const imageResponse = await fetchx(`http://13.234.187.190:14700/v4/images/${imageID['documentID']}`);
        const imageResponse = await fetchx(API_URL + `/images/${imageID['documentID']}`);
        const clonedImageResponse = imageResponse.clone(); // Clone the response

        const blob = await clonedImageResponse.blob()
        if (blob.type !== 'text/html') {
          // Create a URL for the blob data
          const fileUrl = URL.createObjectURL(blob);
          return fileUrl;
        }
        return null; // Skip non-image data
      }));

      // Filter out null values (non-image data)
      const filteredImageUrls = imageUrls.filter(url => url !== null);

      // Set the images state with the filtered image URLs
      setImages(filteredImageUrls);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
    
    const handleViewImageClick = (fileData, index) => {
      window.open(fileData, '_blank', 'width=1000,height=800');
    };


  const onSubmit = data => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("hotelID", 1);
    formData.append("source", 2);
    formData.append("doctype", 12);
    formData.append("docrefno", "guest_" + localStorage.getItem('guestID'));

    // fetchx("http://13.234.187.190:14702/v4/imgupload", {
    fetchx(API_URL + "/imgupload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        fetchImageUrls();
       })
      .catch((error) => {
        console.error("Error:", error);
      });






      //submitting form Data
if (localStorage.getItem('guestID')!=null) {
   setData(data)
   data['IDType'] = selectedValue
   if (
       data.IDType !== null &&
       data.name !== null
   ) {
       let createmarketGroup = JSON.stringify({
           "guestID":localStorage.getItem('guestID'),
           "IDType": data.IDType,
           "idNumber": data.idNumber,
           "issueDate": (data.issueDate === undefined ? null : Moment(String(new Date(data.issueDate[0]))).format('YYYY-MM-DD')),
           "expiryDate": (data.expiryDate === undefined ? null : Moment(String(new Date(data.expiryDate[0]))).format('YYYY-MM-DD')),             
           "issuePlace":data.issuePlace === null ? null : data.issuePlace,
           "nameOnDocument": data.nameOnDocument,
           "idFile1": data.idFile,                
       })
       let res = fetchx(API_URL + "/addIdDetails", {
           method: "POST",
           headers: { 'Content-Type': 'application/json' },
           body: createmarketGroup
       }).then((res) => {
           const swalInstance = MySwal.fire({
            text: 'ID Details Added Successfully!',
            icon: 'success',
            buttonsStyling: false,
            allowOutsideClick: false, 
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
            }
          }); 
           if (res['status'] == 200) {
               fetchx(API_URL + `/getiddetails?guestID=${localStorage.getItem("guestID")}`)
                   .then(result => result.json())
                   .then(rowData => {
                       setRowData(rowData['data'])
                   })
           }

       });
     
   }
 } else { 
   alert("Please Fill Basic Details First")
 }    
}

  const navigatepage = () => {
    navigate('');
};


  const handleReset = () => {
    reset({
      IDType1: null,
      idNumber1: "",
      issueDate1: "",
      expiryDate: "",
      issuePlace1: "",
      name1: "",
      idFile1: "",
    });
  };
  const [modal, setModal] = useState(false);

  const handleModal = () => setModal(!modal);

  return (
    <div>
        <Modal isOpen={idDetail} toggle={() => setIDDetails(!idDetail)} className='modal-lg'>
         <ModalHeader className='modal-lg' toggle={() => setIDDetails(!idDetail)}>
         Add ID Details
         </ModalHeader>
         <ModalBody className='pb-3 px-sm-5 mx-20'>
         <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                            <Col md='4' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="IDType">
                                        ID Type <spam style={{color:'red'}}>*</spam>
                                    </Label>
                                    <Controller
                                        id="IDType"
                                        control={control}
                                        name="IDType"
                                        render={({ field }) => (
                                            <Select
                                            required
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
                            {selectedValue === 'Aadhar Card' && (
                                <div>
                                   <Row>
                                   <Col md='4' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="idNumber">
                                        Aadhar Number <spam style={{color:'red'}}>*</spam>
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='idNumber'
                                        name='idNumber'
                                        render={({ field }) => <Input placeholder='idNumber'
                                            // pattern='[0-9_]{1,15}'
                                            // title="ID Number can contain numbers . It cannnot contain alphabets and special characters." required
                                            invalid={errors.idNumber && true} {...field}
                                            // value={data1.idDetails.idNumber} 
                                            />}
                                    />
                                </div>
                            </Col>                                 
                           </Row>
                          </div>
                            )}
                            {selectedValue === 'Pan Card' && (
                                <div>
                                   <Row>
                                   <Col md='4' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="idNumber">
                                        Pan Number <spam style={{color:'red'}}>*</spam>
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='idNumber'
                                        name='idNumber'
                                        render={({ field }) => <Input placeholder='idNumber'
                                            // pattern='[0-9_]{1,15}'
                                            // title="ID Number can contain numbers . It cannnot contain alphabets and special characters." required
                                            invalid={errors.idNumber && true} {...field}
                                            // value={data1.idDetails.idNumber} 
                                            />}
                                    />
                                </div>
                            </Col>                                 
                           </Row>
                          </div>
                            )}
                            {selectedValue === 'Driving License' && (
                                <div>
                                   <Row>
                                   <Col md='4' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="idNumber">
                                        DL  Number <spam style={{color:'red'}}>*</spam>
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='idNumber'
                                        name='idNumber'
                                        render={({ field }) => <Input placeholder='idNumber'
                                            // pattern='[0-9_]{1,15}'
                                            // title="ID Number can contain numbers . It cannnot contain alphabets and special characters." required
                                            invalid={errors.idNumber && true} {...field}
                                            // value={data1.idDetails.idNumber} 
                                            />}
                                    />
                                </div>
                            </Col>
                                   {/* <Col md='3' sm='12'>
                                    <div className='mb-1'>
                                    <Label className='form-label' for='issueDate'>
                                        Issue Date
                                    </Label>
                                    <Controller
                                        control={control}
                                        id='issueDate'
                                        name='issueDate'
                                        render={({ field }) => (
                                            <Flatpickr
                                                {...field}
                                                // value={data1.idDetails.idNumber} 
                                                options={{ allowInput: true }} placeholder='YYYY-MM-DD '
                                                className={classnames('form-control', {
                                                    'is-invalid': data !== null && data.issueDate === null
                                                })}
                                            />
                                        )}
                                    />
                                </div>
                            </Col> */}
                                    <Col md='4' sm='12'>
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
                                                        options={options} placeholder='YYYY-MM-DD '
                                                        className={classnames('form-control', {
                                                            // 'is-invalid': data !== null && data.expiryDate === null
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
                                      <Col md='4' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="idNumber">
                                       Passport Number <spam style={{color:'red'}}>*</spam>
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='idNumber'
                                        name='idNumber'
                                        render={({ field }) => <Input placeholder='idNumber'
                                            // pattern='[0-9_]{1,15}'
                                            // title="ID Number can contain numbers . It cannnot contain alphabets and special characters." required
                                            invalid={errors.idNumber && true} {...field}
                                            // value={data1.idDetails.idNumber} 
                                            />}
                                    />
                                </div>
                            </Col>
                             <Col md='3' sm='12'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='issueDate'>
                                        Issue Date
                                    </Label>
                                    <Controller
                                        control={control}
                                        id='issueDate'
                                        name='issueDate'
                                        render={({ field }) => (
                                            <Flatpickr
                                                {...field}
                                                // value={data1.idDetails.idNumber} 
                                                options={options1} placeholder='YYYY-MM-DD '
                                                className={classnames('form-control', {
                                                    'is-invalid': data !== null && data.issueDate === null
                                                })}
                                            />
                                        )}
                                    />
                                </div>
                            </Col>
                               <Col md='4' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="issuePlace">
                                        Issue Place
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='issuePlace'
                                        name='issuePlace'
                                        render={({ field }) => <Input placeholder='issuePlace'
                                            // pattern='[0-9_]{1,15}'
                                            // title="Adhar Number can contain numbers . It cannnot contain alphabets and special characters." required
                                            invalid={errors.issuePlace && true} {...field} />}
                                    />
                                </div>
                            </Col>
                                    <Col md='4' sm='12'>
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
                                                        options={options} placeholder='YYYY-MM-DD '
                                                        className={classnames('form-control', {
                                                            'is-invalid': data !== null && data.expiryDate === null
                                                        })}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </Col>
                                    </Row>
                                </div>
                            )}
                            {/* <Col md='4' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="idNumber">
                                        ID Number <spam style={{color:'red'}}>*</spam>
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='idNumber'
                                        name='idNumber'
                                        render={({ field }) => <Input placeholder='idNumber'
                                            // pattern='[0-9_]{1,15}'
                                            // title="ID Number can contain numbers . It cannnot contain alphabets and special characters." required
                                            invalid={errors.idNumber && true} {...field}
                                            // value={data1.idDetails.idNumber} 
                                            />}
                                    />
                                </div>
                            </Col>
                            */}
                            {/* <Col md='4' sm='12' className='mb-1'>
                                <div className="mb-1">
                                    <Label className="form-label" for="issuePlace">
                                        Issue Place
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='issuePlace'
                                        name='issuePlace'
                                        render={({ field }) => <Input placeholder='issuePlace'
                                            // pattern='[0-9_]{1,15}'
                                            // title="Adhar Number can contain numbers . It cannnot contain alphabets and special characters." required
                                            invalid={errors.issuePlace && true} {...field} />}
                                    />
                                </div>
                            </Col> */}

                            <Col md='4' sm='12' className='mb-1'>
                                <div className='mb-1'>
                                    <Label className='form-label' for='name'>
                                   Name On Card <spam style={{color:'red'}}>*</spam>
                                    </Label>
                                    <Controller
                                        defaultValue=''
                                        control={control}
                                        id='name'
                                        name='name'
                                        render={({ field }) => <Input 
                                        required
                                        placeholder='Name'
                                         invalid={errors.name && true} 
                                        {...field} 
                                        // value={data1.idDetails.name} 
                                        />}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Col md='4' sm='12' className='mb-1'>
                            <div className='mb-1'>
                                <Label className='form-label' for='attachment'>
                                    Upload ID Attachment
                                </Label>
                                    <Controller
                                        control={control}
                                        id='attachment'
                                        name='attachment'
                                        placeholder='Add idFile'
                                        render={({  }) => <Input type='file' onChange={handleFileChange}  />}
                                    />
                                
                            </div>
                        </Col>



                        <br />
                <h3> &nbsp;&nbsp;List of ID Attachments </h3>
                <br />

                        {images.map((imageData, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <h4>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID Details Attachment{" "}
                      {index + 1}: &nbsp;&nbsp;
                    </h4>
                    <br />
                    <Button
                      onClick={() => handleViewImageClick(imageData)}
                      color="primary"
                    >
                      View Attachment {index + 1}
                    </Button>
                    <br></br>
                    <br></br>
                    <br></br>
                  </div>
                ))}

                            <br/>
                            <br/>
                        <div className='d-flex'>
                            <Button className='me-1' color='primary'type="submit" >
                                Submit
                            </Button>
                            <Button outline color='secondary' type='reset' onClick={handleReset}>
                                Reset
                            </Button>
                        </div>                       
                    </Form>
        </div>
         </ModalBody>
         </Modal>


      {/* // AG Grid to Display ID Details */}
      <div>
      <Button color='primary' className='me-1' type='submit' onClick={() => {setIDDetails(!idDetail) }}>
             Add ID Details
             </Button>
      </div>
      <br/>
      <div className="ag-theme-alpine" style={{ height: 220 }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData} columnDefs={columnDefs}
                    animateRows={true} 
                    rowSelection='multiple'
                    onCellClicked={cellClickedListener}
                    // paginationAutoPageSize = 'true'
                    onCellValueChanged={onCellValueChanged}
                    paginationPageSize='10'
                    pagination='true'
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"

                />
            </div>
            <br></br>
            <br></br>


            <div align='end' className='buttons'>
            
             <Button color='primary' className='me-1' type='button' onClick={navigatepage}>
            Exit
        </Button>
             </div>  
    </div>
  );
};

export default IDDetails;