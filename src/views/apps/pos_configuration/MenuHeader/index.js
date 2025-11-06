// ** React Imports
import { useState } from "react";
// import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
// import App from "./waitListDataTable";
import Moment from 'moment';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

// ** Custom Components
import Avatar from "@components/avatar";
import API_URL from "../../../../config";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

// ** Custom Components
import Wizard from "@components/wizard";

// // ** Steps
import Editmenuheader from "./editmenuheader";


// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Input,
  Card,
  Form,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback} from 'react';
// const ref = useRef(null);


const defaultValues = {
  category: "",
  costPrice: "",
  taxPercentage: "",
};

const colourOptions = [
  { value: 'Enable', label: 'Enable' },
 { value: 'Disable', label: 'Disable' },
]


let id=1;
const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();
// ** State
const [open, setOpen] = useState('0')
const [show, actionButton] = useState(false);
const [filldata, setfilldata] = useState({});

const [showEdit, editButton] = useState(false);


const MySwal = withReactContent(Swal)
let navigate = useNavigate();

  // ** State
  const [stepper, setStepper] = useState(null);

 // ** Ref
 const ref = useRef(null);
 const [stepper2, setstepper2] = useState(null);
const toggle = id => {
  open === id ? setOpen() : setOpen(id)
}

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160,  },
    {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Category',field: 'category'},
    {headerName: 'Cost Price',field: 'costPrice'},
    {headerName: 'Tax Percentage',field: 'taxPercentage'},
    {
      headerName: "Action",field: "numAvlRooms",suppressSizeToFit: true, maxWidth: 120,
      cellRendererFramework: (params) => (
        // <Button color="primary" onClick={() => editButton(!show)}> Edit  </Button> ),
        <Button color="primary" onClick={() => EditData(params.data)}> Edit  </Button> ),
    },

  ]);
  const gridApiRef = useRef(null);
  

  const gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
      flex: 1,
      minWidth: 150,
      filter: true,
      sortable: true,
      floatingFilter: true,
    },
  };
  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      filterParams :{
      buttons : ['apply','reset']
      }
    }
  ));

  const EditData = (rowData) =>{
    setfilldata(rowData)
    editButton(!showEdit)

  }

  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
    setfilldata(event["data"]);

  }, []);

  useEffect(() => {
    console.log("Clicked")
    fetchx(API_URL+'/getMenuHeaderDetails?hotelID='+id)
    // fetchx(API_URL+"/getMenuHeaderDetails", {
    //   method: "POST",
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     hotelID: 1,
    //   })
    // })
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  },[]);  

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    if (
      data.category !== null &&
      data.costPrice !== null &&
      data.taxPercentage !== null
          ) {
      console.log(data);
      let createasset = JSON.stringify({
        "hotelID":id,
        "category": data.category,
        "costPrice": data.costPrice,
        "taxPercentage": data.taxPercentage,
      });
      console.log(createasset);
      let res = fetchx(API_URL+"/addMenuHeaderDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      })
      .then(result => result.json())
      .then((res) => {
        if(res['statusCode'] == 200){

      const swalInstance = MySwal.fire({
          text: "Menu Header Added Successfully",
          icon: 'success',
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
              navigate('')
          //   setpaymentInfoModal(false)
          fetchx(API_URL+'/getMenuHeaderDetails?hotelID=1')
          // fetchx(API_URL+"/getMenuHeaderDetails", {
          //   method: "POST",
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({
          //     hotelID: 1,
          //   })
          // })
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          console.log(rowData['data'])
          })
          }
        });
    // setTimeout(() => {  window.location.reload(true); }, 4000);          
      }
      if(res['statusCode'] == 403){
        const swalInstance = MySwal.fire({
          // text: res[''],
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'Close',
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        });
        swalInstance.then((result) => {
          if (result.isConfirmed) {
              navigate('')
      
          }
        });
      }
      });
      
     
    }
  };

  const handleReset = () => {
    reset({
      category: "",
      costPrice: "",
      taxPercentage: "",
    });
  };
  
  const steps = [
    {
      id: "menuheader ",
      title: "Menuheader",
      subtitle: "Menu Header  Details.",
      // icon: <FileText size={18} />,
      content: (
        <Editmenuheader data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
   
  ];
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);
  return (
    <div>
    <Card>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'>Add MenuHeader</AccordionHeader>
        <AccordionBody accordionId='1'>
      {/* <CardHeader>
        <CardTitle tag="h4"> Sessions </CardTitle>
      </CardHeader> */}
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="category">
            Category
            </Label>
            <InputGroup className="input-group-merge">
              
              <Controller
                id="category"
                name="category"
                control={control}
                placeholder="category"
                render={({ field }) => (
                  <Cleave
                  placeholder="Enter category"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.category === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}
          <Col md='4' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="category">
                        Category
                        </Label>
                         
                          <Controller
                            id="category"
                            name="category"
                            control={control}
                            placeholder="category"
                            render={({ field }) => (
                              <Input
                                //   pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
                                placeholder="Enter category"
                                required
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid": data !== null && data.category === null,
                                })}
                              />
                            )}
                          />
                      </div>
                    </Col>

          <Col md='4' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="costPrice">
            Cost Price
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.reservation === null || !data.reservation.length)
                })}
              ></InputGroupText> */}
              <Controller
                id="costPrice"
                name="costPrice"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" 
                  required

                  placeholder="cost Price..."
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.costPrice === null || !data.costPrice.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>


          {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="timings">
              Timings
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText>
              <Controller
                id="timings"
                name="timings"
                control={control}
                placeholder="timings"
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ0-9]*" title="Special Characters are not Allowed" 
                  placeholder="Enter timings"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.sessionName === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}

          <Col md='4' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="taxPercentage">
            Tax Percentage
            </Label>
            <InputGroup className="input-group-merge">
              {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.reservation === null || !data.reservation.length)
                })}
              ></InputGroupText> */}
              <Controller
                id="taxPercentage"
                name="taxPercentage"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Type Only Numbers" 
                  required

                  placeholder="Tax Percentage.."
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.taxPercentage === null || !data.taxPercentage.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          
          

          
          <div className="d-flex">
            <Button className="me-1" color="primary" type="submit" >
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
          </Row>
        </Form>
      </CardBody>
      </AccordionBody>
      </AccordionItem>
      </Accordion>
      
    </Card>
   <br></br>

    <div>
        <Col md="3" sm="12" className="mb-1">
          <Label className="form-label" for="fullName">
            Search
          </Label>
          <Input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
        </Col>
      </div>
    <Card>
    
    <div className="ag-theme-alpine" style={{ height: 520}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
            // onGridReady={onGridReady}
            
            />
      </div>
      </Card>
      <Card>
        <div className="vertically-centered-modal">
          <Modal
            isOpen={showEdit}
            toggle={() => editButton(!showEdit)}
            // className="modal-lg"
            className="modal-xl"

          >
            <ModalHeader toggle={() => editButton(!showEdit)}>             
              Welcome...
            </ModalHeader>
            <ModalBody>
              <Card>
                <div className="modern-horizontal-wizard">
                  <Wizard
                    type="modern-horizontal"
                    ref={ref}
                    steps={steps}
                    options={{
                      linear: false,
                    }}
                    instance={(el) => setstepper2(el)}
                  />
                </div>
              </Card>
            </ModalBody>
           
          </Modal>
        </div>
      </Card>
    {/* <App/> */}
    </div>
  );
};

export default ValidationThirdPartyComponents;
