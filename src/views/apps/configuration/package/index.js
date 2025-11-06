// ** React Imports
import { useState } from "react";

// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import API_URL from "../../../../config";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Input, Card, Form, Row, Col, Label, Button, CardBody, CardTitle, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from "react";
// import ModalForm from "./modalForm"
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// import App from './datagrid'
// const transactionCode = [
// { value: '1', label: 'Active' },
// { value: '0', label: 'InActive' },
// // { value: 'red', label: 'Red' },
// // { value: 'orange', label: 'Orange' }
// ]

const defaultValues = {
  // hotelID: '',
  packageCode: "",
  description: "",
  beginSellDate: "",
  endSellDate: "",
  basePrice: "",
  taxAmount: "",
  totalAmount: "",
  calculationRule: "",
  postingRhythm: "",
  rateInclusion: "",
  isActive: null,
  packageGroupID: null,
  transactionCodeID: null,
};

const colourOptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "In Active" },
];

let packages = [
  fetchx(API_URL +"/getGroupForPackage?hotelID=1 ")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      packages = resp["data"];
      // console.log(packages);
    }),
];

let transactionCode = [
  fetchx(API_URL +"/getRateCodeTransactionID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'])
      transactionCode = resp["data"];
      // console.log(transactionCode);
    }),
];

let packagetransactionCode = [
  fetchx(API_URL +"/getRateCodeTransactionID?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      // console.log(resp['data'] pending)
      packagetransactionCode = resp["data"];
      // console.log(packagetransactionCode);
    }),
];

const rateCode = () => {
    const [open, setOpen] = useState('')
    const toggle = id => { open === id ? setOpen() : setOpen(id) }
  // AG Grid
  const [rowData, setRowData] = useState();
  const [rowData2, setRowData2] = useState();

  const [popUp, setPopUp] = useState(false);
  const [oldValue, setOldValue] = useState(null);

  const gridRef = useRef();


  const [newActiveStatus, setNewActiveStatus] = useState(null);
  const [roomClass, setRoomClassID] = useState(null);

   // ** State
   const [data, setData] = useState(null);
   // ** Hooks
   const { reset, handleSubmit, control,watch } = useForm({ defaultValues });
 
   const [basePrice, setBasePrice] = useState('');
   const [taxPercentage, setTaxPercentage] = useState('');
   const [totalAmount, setTotalAmount] = useState(null);
   const [transactionData, setTransactionData] = useState([]);
   const [reload, setreload] = useState(true);

   let navigate = useNavigate();  

  const lookupValue = (mappings, key) => {
    return mappings[key]
  }
  const colourMappings = {
    1: 'Active',
    0 : 'Inactive',
  }
  const extractKeys = (mappings) => {
    return Object.keys(mappings)
  }
  const colourCodes = extractKeys(colourMappings)

  const [show, actionButton] = useState(false);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Package Code",
      field: "packageCode",
      suppressSizeToFit: true,
      cellStyle: { "textAlign": "center", "backgroundColor": "#F1E39B" },
      maxWidth: 160,
    },
    {
      headerName: "Description",
      field: "description",
      suppressSizeToFit: true,
      cellStyle: { "textAlign": "center", "backgroundColor": "pink" },
      maxWidth: 140,
    },
    {
      headerName: "Begin Sell Date ",
      field: "beginSellDate",
      suppressSizeToFit: true,
      cellStyle: { "textAlign": "center", "backgroundColor": "#F1E39B" },
      cellRenderer: (params) => {        
        // Ensure the arrivalDate field exists in the row data        
        if (params.data && params.data.beginSellDate) {          
            // Assuming arrivalDate is in "YYYY-MM-DD" format, you can format it to "DD-MM-YYYY"          
            const formattedDate = Moment(params.data.beginSellDate).format("DD-MM-YYYY");          
            return formattedDate;        
        } else {          
            return ""; // Handle cases where the data is missing or invalid        
        }      
    },
      maxWidth: 160,
    },
    {
      headerName: "End Sell Date",
      field: "endSellDate",
      suppressSizeToFit: true,
      cellStyle: { "textAlign": "center", "backgroundColor": "pink" },
      cellRenderer: (params) => {        
        // Ensure the arrivalDate field exists in the row data        
        if (params.data && params.data.endSellDate) {          
            // Assuming arrivalDate is in "YYYY-MM-DD" format, you can format it to "DD-MM-YYYY"          
            const formattedDate = Moment(params.data.endSellDate).format("DD-MM-YYYY");          
            return formattedDate;        
        } else {          
            return ""; // Handle cases where the data is missing or invalid        
        }      
    },
      maxWidth: 140,
    },
    {
      headerName: "Base Price ",
      field: "basePrice",
      suppressSizeToFit: true,
      cellStyle: { "textAlign": "center", "backgroundColor": "#F1E39B" },
      maxWidth: 120,
    },
    //  { headerName: 'taxAmount', field: 'taxAmount', suppressSizeToFit: true },
    {
      headerName: "Total Amount",
      field: "totalAmount",
      cellStyle: { "textAlign": "center", "backgroundColor": "pink" },
      maxWidth: 140,
    },
    {
      headerName: "Group ",
      field: "groupCode",
      cellStyle: { "textAlign": "center", "backgroundColor": "#F1E39B" },
      maxWidth: 130,
    },
    {headerName: 'Status', field: 'isActive', cellStyle: { 'text-align': 'center', 'background-color': 'pink' },suppressSizeToFit: true,maxWidth: 140,editable: true,cellEditor: 'agSelectCellEditor', cellEditorParams: {values: colourCodes }, valueFormatter: (params) => { return lookupValue(colourMappings, params.value)},filter: 'agSetColumnFilter'},
    //  { headerName: 'calculationRule', field: 'calculationRule' },
    //  { headerName: 'postingRhythm ', field: 'postingRhythm' },
    //  { headerName: 'rateInclusion', field: 'rateInclusion' },  
    //  { headerName: 'Transaction Code ID', field: 'description',cellStyle: { "textAlign": "center", "backgroundColor": "#F1E39B" }, suppressSizeToFit: true },
  ]);
  const [rateCodes, setRateCode] = useState();
  const gridRef1 = useRef(null)

   //Search element
  //  const onFilterTextBoxChanged = useCallback(() => {
  //   gridRef1.current.api.setQuickFilter(
  //     document.getElementById('filter-text-box').value
  //   )
  // }, [])
  const onFilterTextBoxChanged = () => {
    const filterValue = document.getElementById('filter-text-box').value;
    // console.log('Filter value:', filterValue); // Add this line
    if (gridRef1.current && gridRef1.current.api) {
      gridRef1.current.api.setQuickFilter(filterValue);
    }
  };


  //TransactionCode
  const [columnDefs2, setColumnDefs2] = useState([
    {headerName: 'Transaction Code',field: 'transactionCode',suppressSizeToFit: true, maxWidth: 170 },
    {headerName: 'Description',field: 'description',suppressSizeToFit: true, maxWidth: 180 },
    {headerName: 'Group',field: 'groupCode',suppressSizeToFit: true, maxWidth: 140 },
    {headerName: 'Sub Group',field: 'subGroup',suppressSizeToFit: true, maxWidth: 140 },
    {
      headerName: "Action",
      maxWidth: 140,
      cellRenderer: () => {
        return (<Button color='primary' onClick={cellClickedListener1}>Select</Button>)
      }
    },
  ]);


  //Modal close function
  const cellClickedListener1 = (event) => {
    // console.log(event)
    // console.log(event['data'])
     setTransactionData (event['data'])
     setRateCode(false)
  }
// console.log(transactionData)

  const onCellValueChanged = useCallback(event => {
    // console.log('onCellValueChanged', event)
    // console.log('data after changes is: ', event.data);
  //  console.log(event)
   let isActive=Number(event.data.isActive);
  //  console.log(isActive)
  //  console.log(event.data.isActive)
 
   let OldValue=oldValue  
  //  console.log(oldValue)
  //  console.log(OldValue)
 
     let ID=event.data['id']
     const IDNumber = event.data.id;
     setRoomClassID(IDNumber); 
  //  console.log(ID)
  //  console.log(event.data.id)
   

    let newActive = event.data.isActive;
    // console.log(newActive)
  //  const oldRoomType = event.oldValue.split("(")[0];
  //   setPrice(newRoomType)
  //   setBasePriceID(ID)
   
    
    if (event.data.isActive !== oldValue) {
      const newActiveStatus = event.data.isActive;
      setNewActiveStatus(newActiveStatus); 
                 const oldActiveStatus = oldValue;
    // setFullData(RoomType,oldRoomType,newRoomType,event.data.date)
    setPopUp("Do You  Want to Change Package Status ?");    
    } 

  const updatedItem = JSON.stringify({            
     isActive:event.newValue.split("(")[0]
     })
    //  console.log(updatedItem)
     fetchx(API_URL+ `/updateConPackage?id=${event.data.id}`, {
     method: 'PUT',
     body: updatedItem,
     headers: {
     'Content-type': 'application/json'
     }
     })
     .then((res) => res.json())
     .then((post) => {
      // const swalInstance = MySwal.fire({
      //   text: 'Updated Active Status Successfully!',
      //   icon: 'success',
      //   buttonsStyling: false,
      //   confirmButtonText: 'Close',
      //   customClass: {
      //     confirmButton: 'btn btn-danger'
      //   }
      // });
      // swalInstance.then((result) => {
      //   if (result.isConfirmed) {
          // navigate('');
      //   }
      // }); 
    //  console.log(post)
     })
     .catch((err) => {
    //  console.log(err.message)
     })         
    }, [])

// console.log(newActiveStatus)
// console.log(roomClass)

// const gridApi = useRef();

function Confirm (event){
const updatedItem = JSON.stringify({
isActive:newActiveStatus, 
id:roomClass
})
// console.log(updatedItem)
fetchx(API_URL+ `/updateConPackage`, {
method: 'PUT',
body: updatedItem,
headers: {
'Content-type': 'application/json'
}
})
.then((res) => res.json())
.then((post) => {
 const swalInstance = MySwal.fire({
        text: 'Updated Active Status Successfully!',
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Close',
        allowOutsideClick: false, 
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      });
      swalInstance.then((result) => {
        if (result.isConfirmed) {
          navigate('');
        }
      });
// console.log(post)
if(post.statusCode === 200){
setPopUp(false)
fetchx(API_URL + '/getroomclass?hotelID=1')
.then(result => result.json())
.then(rowData =>{
// console.log(rowData['data'])     
}
)
}
})
.catch((err) => {
// console.log(err.message)
})
}



  const defaultColDef = useMemo(() => ({
    suppressSizeToFit: true,
    autoHeight: true,
    resizable: true,
    // editable: true,
    sortable: true,
    filter: true,
    singleClickEdit: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback(event => {
    // console.log('cellClicked', event.data);
    // console.log('cellClicked', event.data.isActive);
    
    const currentValue = event.data.isActive;
    // console.log(currentValue);
    
    setOldValue(currentValue); // Update the state variable
}, []);

// console.log("oldValue",oldValue)
  useEffect(() => {
    fetchx(API_URL +"/getPackage?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
  }, []);

  useEffect(() => {
    fetchx(API_URL +"/gettransactioncode?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData2(rowData["data"]));
  }, []);
  // console.log(rowData2)

  // ** Hooks
  const {
    setError,
    formState: { errors },
  } = useForm();

 

  const beginSellDate = watch('beginSellDate');
  // console.log(beginSellDate)
 const today = Moment().format('YYYY-MM-DD');
 const options = {
   minDate: today
 };
 const optionsToDate = {
   minDate: (Moment(String(new Date(beginSellDate))).format('YYYY-MM-DD')) // Set the minimum date as fromDate or today if fromDate is not selected
 };


  const onSubmit = (data) => {
    setData(data);

    if (data.rateCode !== null && data.transactionCode !== null && data.beginSellDate !== null)
     {
      // console.log(data);
      let createrateCode = JSON.stringify({
        // "hotelID": data.hotelID,
        packageCode: data.packageCode,
        description: data.description,
        beginSellDate:(data.beginSellDate === '' ? null : Moment(String(new Date(data.beginSellDate[0]))).format('YYYY-MM-DD')),
        endSellDate:(data.sellDate === '' ? null : Moment(String(new Date(data.endSellDate[0]))).format('YYYY-MM-DD')), 
        basePrice: data.basePrice,
        taxAmount: data.taxAmount,
        totalAmount: totalAmount,
        calculationRule: 1,
        postingRhythm: 1,
        rateInclusion: 1,
        isActive: 1,
        packageGroupID: data.package.value,
        transactionCodeID:transactionData["id"],
      });
      // console.log(data.rateCode);
      // console.log(createrateCode);
      let res = fetchx(API_URL + "/addpackage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createrateCode,
      }).then(data => data.json())
      .then((res) => {
        // console.log(res);
        if (res["statusCode"] == 200) {
          fetchx(API_URL +"/getPackage?hotelID=1")
            .then((result) => result.json())
            .then((rowData) => {
              setRowData(rowData["data"]);
              // console.log(rowData["data"]);
              const swalInstance = MySwal.fire({
                text: 'Package Added Successfully!',
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
            });
        }
        else{
          const swalInstance = MySwal.fire({
            text: res.message,
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            allowOutsideClick: false, 
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
            }
          });
        }

      });
   
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: '',
      packageCode: "",
      description: "",
      beginSellDate: "",
      endSellDate: "",
      basePrice: "",
      taxAmount: "",
      totalAmount: "",
      calculationRule: "",
      postingRhythm: "",
      rateInclusion: "",
      isActive: null,
      packageGroupID: null,
      transactionCodeID: null,
    });
  };

 
  
  // Function to handle changes in the basePrice input
  const handleBasePriceChange = (value) => {
        // console.log('Base Price:', value);
    setBasePrice(value);
    calculateTaxAmount(value, taxPercentage);
  };

  // Function to handle changes in the taxAmount input (percentage)
  const handleTaxPercentageChange = (value) => {
        // console.log('Tax Amt:', value);
    setTaxPercentage(value);
    calculateTaxAmount(basePrice, value);
  };

   // Function to calculate the tax amount
   const calculateTaxAmount = (basePrice, taxPercentage) => {
    const parsedBasePrice = parseFloat(basePrice);
    const parsedTaxPercentage = parseFloat(taxPercentage);

    if (!isNaN(parsedBasePrice) && !isNaN(parsedTaxPercentage)) {
      const taxAmount = (parsedBasePrice * parsedTaxPercentage) / 100;
      // console.log('Tax Amount:', taxAmount);
    }

    if (!isNaN(parsedBasePrice) && !isNaN(parsedTaxPercentage)) {
      const taxAmount = (parsedBasePrice * parsedTaxPercentage) / 100;
      const totalAmount = parsedBasePrice + taxAmount;
      // console.log('Total Amount:', totalAmount);
      setreload(false)
      setTimeout(() => {setreload(true)},1)
      setTotalAmount(totalAmount);
    }
  };

  // console.log('Total Amount:', totalAmount);

  const onFilterTextBoxChanged2 = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div>

    <div>
        <Modal isOpen={rateCodes} toggle={() => setRateCode(!rateCodes)} className='modal-lg'>
         <ModalHeader className='modal-lg' toggle={() => setRateCode(!rateCodes)}> View Transaction Codes</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>  
          <div>
          <Row className='mb-1'>
                        <Col md='3' sm='12' className='me-1'>
                          <Label className='form-label' for='fullName'>
                            Search
                          </Label>
                          <Input
                            type="text"
                            id="filter-text-box"
                            placeholder="Filter..."
                            onInput={onFilterTextBoxChanged}
                          />
                        </Col>
                        <Col md='3' sm='12' className='me-1'>
                          <br></br>
                          {/* <div align='end' >
                            <Button color='primary' onClick={onclickButton}> Add New Company</Button>
                          </div> */}
                        </Col>
                      </Row>
                      <Row>
                      <div className="ag-theme-alpine" style={{ height: 540 }}>
                        <AgGridReact
                          ref={gridRef}
                          rowData={rowData2}
                          columnDefs={columnDefs2}
                          animateRows={true}
                          rowSelection="multiple"
                          onCellClicked={cellClickedListener1}
                          onCellValueChanged={onCellValueChanged}
                          // cellRenderer={cellRenderer}
                          // paginationAutoPageSize = 'true'
                          paginationPageSize="10"
                          pagination="true"
                          singleClickEdit="true"
                          defaultColDef={defaultColDef}
                          headerColor="ddw-primary"
                        />
                       </div>
                      </Row>  
          </div>       
         
          </ModalBody>
       </Modal>
      </div>
      
      <div className="disabled-animation-modal">
    <Modal
    isOpen={popUp}
    toggle={() => setPopUp(!popUp)}
    className="modal-sm"
    >
    {" "}
    {/*onClosed={onDiscard}*/}
    <ModalHeader
    className="modal-sm"
    toggle={() => {
    setPopUp(!popUp);
    }}
    >
    Need To Check..
    </ModalHeader>
    <ModalBody className="pb-3 px-sm-2 mx-20">
    <div>
    <b>{popUp}</b>
    <br></br>
    <br></br>
    <div className="d-flex">
    <Button
    color="primary"
    className="me-1"
    // className="text-center"
    onClick={() => Confirm()}
    >
    Confirm
    </Button>
    <Button
    color="danger"
    className="me-1"
    // className="text-center"
    onClick={() => {
     setPopUp(false) , navigate('');  
   }}
    >
    Cancel
    </Button>
    </div>
 </div>
 </ModalBody>
 </Modal>
      </div>

      <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Package </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
        <CardHeader>
          <CardTitle tag="h4">Package </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Row>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="packageCode">
                      Package Code <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="packageCode"
                      name="packageCode"
                      render={({ field }) => (
                        <Input
                          placeholder="Package Code"
                          // pattern="[a-zA-Z]*" title="Type Only Alphabets" 
                          required
                          invalid={errors.packageCode && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="description">
                      Description <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="description"
                      name="description"
                      render={({ field }) => (
                        <Input
                          placeholder="Description"
                          required
                          invalid={errors.description && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="beginSellDate">
                      Begin Sell Date <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      control={control}
                      id="beginSellDate"
                      name="beginSellDate"
                      render={({ field }) => (
                        <Flatpickr
                          {...field}
                          required
                          options={options}
                          placeholder="YYYY-MM-DD "
                          className={classnames('form-control', {
                            'is-invalid': data !== null && data.beginSellDate === null
                          })}
                         />
                      )}
                    />
                  </div>
                </Col>

                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="endSellDate">
                      End Sell Date <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      control={control}
                      id="endSellDate"
                      name="endSellDate"
                      render={({ field }) => (
                        <Flatpickr
                        required
                          {...field}
                          options={optionsToDate}
                          placeholder="YYYY-MM-DD "
                          className={classnames("form-control", {
                            "is-invalid":
                              data !== null && data.endSellDate === null,
                          })}
                        />
                      )}
                    />
                  </div>
                </Col>
                
                 <Col md="3" sm="12">
        <div className="mb-1">
          <Label className="form-label" htmlFor="basePrice">
            Base Price <span style={{ color: 'red' }}>*</span>
          </Label>
          <Controller
            defaultValue=""
            control={control}
            id="basePrice"
            name="basePrice"
            render={({ field }) => (
              <Input
                type="text"
                placeholder="Base Price"
                // pattern="[0-9]{1,15}"
                // title="Base Price can contain numbers. It cannot contain alphabets and special characters."
                required
                invalid={errors.basePrice && true}
                {...field}
                onChange={(e) => {
                  // Capture the value and call the handler function
                  const value = e.target.value;
                  field.onChange(value);
                  handleBasePriceChange(value);
                }}
              />
            )}
          />
        </div>
      </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="taxAmount">
                      Tax Percentage <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue=""
                      control={control}
                      id="taxAmount"
                      name="taxAmount"
                      render={({ field }) => (
                     
                        <Input
                        type="text"
                        placeholder="Tax Amount"
                        // pattern="[0-9]{1,15}"
                        // title="Tax Amount can contain numbers. It cannot contain alphabets and special characters."
                        required
                        invalid={errors.taxAmount && true}
                        {...field}
                        onChange={(e) => {
                          // Capture the value and call the handler function
                          const value = e.target.value;
                          field.onChange(value);
                          handleTaxPercentageChange(value);
                        }}
                      />
                      )}
                    />
                  </div>
                </Col>

               { totalAmount && reload && 
               <Col md="3" sm="12">
                  <div className="mb-1">
                  <Label className="form-label" for="names">
                  total <spam style={{color:'red'}}>*</spam>
                  </Label>
                  <Controller
                    control={control}
                    id="names"
                    name="names"
                    render={({ field }) => (
                      <Input
                      defaultValue={totalAmount}
                      required
                        placeholder="Name"
                        invalid={errors.names && true}
                        {...field}
                      />
                    )}
                  />
                </div>
                </Col> }           
                { console.log(totalAmount)} 
               
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="package">
                      Group Code <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      id="package"
                      control={control}
                      name="package"
                      render={({ field }) => (
                        <Select
                        required
                          isClearable
                          options={packages}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          className={classnames("react-select", {
                            "is-invalid":
                              data !== null && data.package === null,
                          })}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="calculationRule">
                      Calculation Rule
                    </Label>
                    <Controller                    
                      control={control}
                      // defaultValue="T"
                      id="calculationRule"
                      name="calculationRule"
                      render={({ field }) => (
                        <Input
                        disabled
                          placeholder="Calculation Rule"
                          invalid={errors.calculationRule && true}
                          {...field}
                          value={"Per Adult"}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="postingRythm">
                      Posting Rhythm
                    </Label>
                    <Controller
                      defaultValue="Post Every Night"
                      control={control}
                      id="postingRythm"
                      name="postingRythm"
                      render={({ field }) => (
                        <Input
                        disabled
                          placeholder="Posting Rhythm"
                          invalid={errors.postingRythm && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="rateInclusion">
                      Rate Inclusion
                    </Label>
                    <Controller
                      // defaultValue="1"
                      control={control}
                      id="rateInclusion"
                      name="rateInclusion"
                      render={({ field }) => (
                        <Input
                        disabled
                          placeholder="Rate Inclusion"
                          invalid={errors.rateInclusion && true}
                          {...field}
                          value={"True"}
                        />
                      )}
                    />
                  </div>
                </Col>
             
                  {/* <div className="mb-1">
                    <Label className="form-label" for="transactionCode">
                      Transaction Code <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      id="transactionCode"
                      control={control}
                      name="transactionCode"
                      render={({ field }) => (
                        <Select
                          required
                          isClearable
                          options={transactionCode}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          className={classnames("react-select", {
                            "is-invalid":
                              data !== null && data.transactionCode === null,
                          })}
                          {...field}
                        />
                      )}
                    />
                  </div> */}
            {console.log(transactionData)}
                 { transactionData &&  <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="transactionCode">
                      Transaction Code <spam style={{color:'red'}}>*</spam>
                    </Label>
                    <Controller
                      defaultValue={transactionData["description"]}
                      control={control}
                      id="transactionCode"
                      name="transactionCode"
                      render={({ field }) => (
                        <Input
                        onClick={() => setRateCode(!rateCodes)}
                          placeholder="Transaction Code"
                          invalid={errors.transactionCode && true}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>}
                   
               

                {/* {selectedOption === 'option1' && (
 <div className='mb-1'>
 <Label className='form-label' for='discountamt'>
 Discount Amount
 </Label>
 <Controller
 defaultValue=''
 control={control}
 id='discountamt'
 name='discountamt'
 render={({ field }) => <Input placeholder='DiscountAmount'
 pattern='[0-9_]{1,15}'
 title="Discount Amount can contain numbers . It cannnot contain alphabets and special characters." required
 invalid={errors.discountamt && true} {...field} />}
 />
 </div>
 <div className='mb-1'>
 <Label className='form-label' for='discountpercentage'>
 Discount Percentage
 </Label>
 <Controller
 defaultValue=''
 control={control}
 id='discountpercentage'
 name='discountpercentage'
 render={({ field }) => <Input placeholder=' Discount Percentage'
 pattern='[0-9_]{1,15}'
 title="Discount Percentagecan contain numbers . It cannnot contain alphabets and special characters." required
 invalid={errors.discountpercentage && true} {...field} />}
 />
 </div>
 )} */}
              </Row>
            </div>

            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                Submit
              </Button>
              <Button
                outline
                color="secondary"
                type="reset"
                onClick={handleReset}
              >
                Reset
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
        </AccordionBody>
      </AccordionItem>
      </Accordion>
</div>

<div>
        <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="fullName">
            Search
          </Label>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged2}
          />
        </Col>
      </div>

      <br></br>
      <div>
        <Card>
          <div className="ag-theme-alpine" style={{ height: 540 }}>
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              animateRows={true}
              rowSelection="multiple"
              onCellClicked={cellClickedListener}
              onCellValueChanged={onCellValueChanged}
              // cellRenderer={cellRenderer}
              // paginationAutoPageSize = 'true'
              paginationPageSize="10"
              pagination="true"
              singleClickEdit="true"
              defaultColDef={defaultColDef}
              headerColor="ddw-primary"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default rateCode;
