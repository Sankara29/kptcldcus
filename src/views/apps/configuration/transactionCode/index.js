// ** React Imports
import { useRef, useState } from "react";

// ** Reactstrap Imports
import {Button, Modal,ModalHeader,ModalBody, Label, Input, Alert,CardBody,} from "reactstrap";

// ** Custom Components
import Wizard from "@components/wizard";

// // ** Steps
import TransactionCode from "./transactionCode";
import BookPlatform from "./bookPlatformID";

// import History from "./history";
// import CardDetails from "./cardDetails"
// import DataGrid from './datagrid'

// ** Icons Imports
import { Card} from "reactstrap";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useForm, Controller } from "react-hook-form";
import { useEffect, useMemo, useCallback } from "react";
import {  Row, Col } from "reactstrap";
import { Accordion, UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem} from "reactstrap";
// // ** Steps2
import EditTransactionCode from "./editTransactionCode";
// import History from "./history";
// import EditIdDetails from "./editIdDetails";
// import EditMembershipDetails from "./editMembershipDetails";
import API_URL from "../../../../config";


const defaultValues = {
  // hotelID: '',
  floor: "",
  blockID: null,
};

const WizardModern = () => {

  const {
    setError,
    formState: { errors },
  } = useForm();

  const { reset, handleSubmit, control } = useForm({ defaultValues });

  const [open, setOpen] = useState("");
  const toggle = (id) => {
    open === id ? setOpen() : setOpen(id);
  };
  // console.log(data1)

  // AGgrid
  // const [rowData, setRowData] = useState();
  const [filldata, setfilldata] = useState({});
  const [filldata1, setfilldata1] = useState();
  const [filldata2, setfilldata2] = useState();
  
  // const gridRef = useRef();

  const [show, actionButton] = useState(false);
  const [showEdit, editButton] = useState(false);

  const [rowData, setRowData] = useState();
  const [data, setData] = useState(null);

  const gridRef = useRef();
  const [columnDefs, setColumnDefs] = useState([
   // {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    // {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Transaction Code',field: 'transactionCode',suppressSizeToFit: true,cellStyle: {'textAlign': 'center','backgroundColor': '#F1E39B'}, maxWidth: 180 },
    {headerName: 'Description',field: 'description',suppressSizeToFit: true,cellStyle: {'textAlign': 'center','backgroundColor': 'pink'}, maxWidth: 180 },
    {headerName: 'Group',field: 'groupCode',suppressSizeToFit: true,cellStyle: {'textAlign': 'center','backgroundColor': '#F1E39B'}, maxWidth: 140 },
    {headerName: 'Sub Group',field: 'subGroup',suppressSizeToFit: true,cellStyle: {'textAlign': 'center','backgroundColor': 'pink'}, maxWidth: 140 },
    // {headerName: 'hsn_sacCode',field: 'hsn_sacCode',suppressSizeToFit: true,cellStyle: {'textAlign': 'center','backgroundColor': '#F1E39B'}, maxWidth: 140 },

    // {headerName: 'isActive',field: 'isActive'},
    {
      headerName: "Action",field: "numAvlRooms",suppressSizeToFit: true, maxWidth: 120,
      cellRendererFramework: (params) => (
        <Button color="primary" onClick={() => actionButton(!show)}> View  </Button> ),
    },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  useEffect(() => {
    fetchx(API_URL + '/gettransactioncode?hotelID=1')
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    // console.log(rowData['data'])
    })
  }, []); 

  const cellClickedListener = useCallback((event) => {
    // console.log("cellClicked", event);
    // console.log(event["data"]);
    setfilldata(event["data"]);
    // console.log(event["rowIndex"]);
    // console.log(event["data"]["id"]);
    // localStorage.setItem('id',(event["data"]['id']));      

    // console.log(event["data"]["idDetails"]); 
    // setfilldata1(event["data"]["idDetails"])  
    // console.log(event["data"]["idDetails"]["idType"]);
    // setfilldata2(event["data"]["membershipDetails"])  
    // console.log(event["data"]["membershipDetails"]["membershipType"]);
    // setautofill(true);
    // setShowForm(false);
    // seteditable(true);
    // setTimeout(() => {
    //   setShowForm(true);
    // }, 200);
    // setenableEditBtn(false);
  }, []);
// console.log(localStorage.getItem('id'))
// console.log(filldata)
//   console.log(filldata2);



  // console.log(filldata["membershipDetails"]);

  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  const [basicModal, setBasicModal] = useState(false);
  const [disabledModal, setDisabledModal] = useState(false);

  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
//  **Steps
  const steps = [
    {
      id: "transactionCode",
      title: "Transaction Code",
      subtitle: "Enter Transaction Code Details.",
      // icon: <FileText size={18} />,
      content: (
        <TransactionCode data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
    {
      id: "bookPlatformDetails",
      title: "Book Platform Details",
      subtitle: "Add BookPlatform Details",
      // icon: <User size={18} />,
      content: (
        <BookPlatform data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
    // {
    //   id: "membershipDetails",
    //   title: "Membership Details",
    //   subtitle: "Enter Membership Details",
    //   // icon: <MapPin size={18} />,
    //   content: (
    //     <MembershipDetails
    //       data1={filldata}
    //       stepper={stepper}
    //       type="wizard-modern"
    //     />
    //   ),
    // },
  ];
//  **Steps 2
  const [stepper2, setstepper2] = useState(null);
  const steps2 = [
    {
      id: "transactionCode",
      title: "Transaction Code",
      subtitle: "Enter Transaction Code Details.",
      // icon: <FileText size={18} />,
      content: (
        <EditTransactionCode data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
    // {
    //   id: "editIdDetails",
    //   title: "ID Details",
    //   subtitle: "Edit Your ID Details.",
    //   // icon: <FileText size={18} />,
    //   content: (
    //     <EditIdDetails
    //       data1={filldata}
    //       stepper2={stepper2}
    //       type="wizard-modern"
    //     />
    //   ),
    // },
    // {
    //   id: "editMembershipDetails",
    //   title: "Membership Details",
    //   subtitle: "Edit Your Membership Details.",
    //   // icon: <FileText size={18} />,
    //   content: (
    //     <EditMembershipDetails
    //       data1={filldata}
    //       stepper2={stepper2}
    //       type="wizard-modern"
    //     />
    //   ),
    // },
    // {
    //   id: "history",
    //   title: "History Details",
    //   subtitle: "view History Details",
    //   // icon: <MapPin size={18} />,
    //   content: (
    //     <History data1={filldata} stepper2={stepper2} type="wizard-modern" />
    //   ),
    // },
  ];

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div>
      <div>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">
              <h4>
                <b>Add Transaction Code </b>
              </h4>
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <div className="modern-horizontal-wizard">
                <Wizard
                  type="modern-horizontal"
                  ref={ref}
                  steps={steps}
                  options={{
                    linear: false,
                  }}
                  instance={(el) => setStepper(el)}
                />
              </div>
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      </div>

         {/* Serch Box */}
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


      <div>
        <br></br>
       {/* Ag Grid */}
        <div className="ag-theme-alpine" style={{ height: 540 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            rowSelection="multiple"
            onCellClicked={cellClickedListener}
            // paginationAutoPageSize = 'true'
            paginationPageSize="10"
            pagination="true"
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
          />
        </div>
      </div>

     {/* Edit Transaction Details */}
      <Card>
        <div className="vertically-centered-modal">
          <Modal
            isOpen={showEdit}
            toggle={() => editButton(!showEdit)}
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
                    steps={steps2}
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

          {/* //////View Transaction Code Details Page */}
          <Card>
        <Modal
          isOpen={show}
          toggle={() => actionButton(!show)}
          className="modal-lg">
          <ModalHeader toggle={() => actionButton(!show)}>         
          Transaction Details Information...
          </ModalHeader>
          <ModalBody>
            <div>
              <div className="d-flex">
                <Button
                  className="me-1"
                  style={{ marginLeft: "auto" }}
                  color="primary"
                  onClick={() => {
                    filldata.length != 0 && editButton(!showEdit); }} >
                  Edit
                </Button>
              </div>
              <Card>
                <div>                  
                    <p><b><center>View Details</center> </b> </p>                  
                  <Row>
                   
                    <Col>
                      <Col>
                        <Row>
                          <Col>
                            <div className="mb-1">
                            <Row>
                    <UncontrolledAccordion defaultOpen='1'>
                                <AccordionItem>
                    <AccordionHeader
                      style={{ backgroundColor: "#F2E5D9" }}
                      targetId="1"
                    >
                      <b>  Transaction Basic Details </b>
                       </AccordionHeader>
                       <AccordionBody accordionId="1">
                      <Row>
                      <Col>
                          <div>
                            {/* <h5>
                              <b>
                                Transaction Basic Details
                               <Button.Ripple color="flat-secondary" id="controlledPopover">
                                  <Edit2 style={{ height: "20px" }} />
                                </Button.Ripple>                                                            
                              </b>
                            </h5> */}
                            <br></br>
                            <h6> Transaction Code:<b>{filldata["transactionCode"]}</b> </h6>
                            <h6>Description: <b>{filldata["description"]}</b>  </h6>
                            <h6> Group: <b> {filldata["groupCode"]}</b></h6>
                            <h6> Sub Group: <b> {filldata["subGroup"]}</b></h6>

                          </div>
                        </Col>

                    {/* <Col>
                      <div>
                        <h5>
                          <b> Address Details</b>
                        </h5>
                        <br></br>

                        <h6>
                          Address One: <b>{filldata["addressOne"]}</b>
                        </h6>
                        <h6>
                          Address Two: <b>{filldata["addressTwo"]}</b>
                        </h6>                       
                        <h6>
                          Country: <b>{filldata["countryName"]}</b>
                        </h6>
                        <h6>
                          State: <b>{filldata["state"]}</b>
                        </h6>
                        <h6>
                          City: <b>{filldata["city"]}</b>
                        </h6>
                        <h6>
                          PostalCode: <b>{filldata["postalCode"]}</b>
                        </h6>
                      </div>
                    </Col> */}
                      </Row>
                      </AccordionBody>
                     </AccordionItem>
                   </UncontrolledAccordion>
                    </Row>  
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <br></br>
                      <Col>
                        <Row>
                          <Col>
                            <div className="mb-1">
                              <UncontrolledAccordion >
                                <AccordionItem>
                                  <AccordionHeader
                                    style={{ backgroundColor: "#F2E5D9" }}
                                    targetId="1"
                                  >
                                    <b> Other Details</b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                    <Row>
                                      <Col>                                    
                                        <Row>
                                          <Col>
                                            <h6> Tax Percentage: <b>   {filldata["taxPercentage"]} </b></h6>
                                          </Col>
                                          <Col>
                                            <h6> Discount Allowed: <b>  {filldata["discountAllowed"] === 1 ? 'YES' : 'NO'} </b> </h6>
                                          </Col>
                                          </Row>
                                          <Row>
                                          <Col>
                                            <h6> Allowance Allowed: <b>  {filldata["isAllowance"] === 1 ? 'YES' : 'NO'} </b> </h6>
                                          </Col>
                                          <Col>
                                            <h6>  Allowance Code:  <b> {filldata["allowanceCodeID"]}</b>{" "}</h6>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </AccordionBody>
                                </AccordionItem>
                              </UncontrolledAccordion>
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <br></br>

                      {/* 
                      <br></br>
                   {console.log(filldata)}
                      {/* <Col>
                        <Row>
                          <Col>
                            <div className="mb-1">
                              <Row>
                                <UncontrolledAccordion>
                                  <AccordionItem>
                                    <AccordionHeader
                                      style={{ backgroundColor: "#F2E5D9" }}
                                      targetId="1">
                                      <b> Rate Code Details </b>
                                    </AccordionHeader>
                                    <AccordionBody accordionId="1">
                                      <Card>       
                                        <div>                                
                                      {filldata.length != 0 && 
                                        
                                        <RateCodeBasicDetails data1={filldata}/>
                                        
                                        
                                        }     
                                        </div>                                 
                                      </Card>
                                    </AccordionBody>
                                  </AccordionItem>
                                </UncontrolledAccordion>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </Col> */}
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </ModalBody>
        </Modal>
      </Card>
    </div>
  );
};
export default WizardModern;