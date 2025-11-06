// ** React Imports
import { useRef, useState } from "react";

// ** Reactstrap Imports
import {Button, Modal,ModalHeader,ModalBody, ModalFooter, Alert,CardBody,Label,Input} from "reactstrap";

// ** Custom Components
import Wizard from "@components/wizard";

// // ** Steps
import BasicDetails from "./basicDetails";
import IDDetails from "./idDetails";
import MembershipDetails from "./membershipDetails";
// import History from "./history";
// import CardDetails from "./cardDetails"
import DataGrid from './datagrid'

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
import {
  Accordion,
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from "reactstrap";

// // ** Steps2
import EditBasicDetails from "./editbasicDetails";
import History from "./history";
import EditIdDetails from "./editIdDetails";
// import EditMembershipDetails from "./editMembershipDetails";
import API_URL from "../../../config";
import "./hover.scss";

const defaultValues = {
  // hotelID: '',
  floor: "",
  blockID: null,
};
localStorage.removeItem("id")

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
  // const [columnDefs, setColumnDefs] = useState([
  //   {
  //     headerName: "Name",
  //     field: "fullName",
  //     valueGetter(params) {
  //       return params.data.salutation + " " + params.data.firstName +" "+params.data.lastName;
  //     },
  //     suppressMenu: true,
  //     suppressSizeToFit: true,
  //     maxWidth: 120,
  //     cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },
  //   },
  //   {
  //     headerName: "Email",
  //     field: "email",
  //     suppressSizeToFit: true,
  //     maxWidth: 220,
  //     cellStyle: { textAlign: "center", backgroundColor: "pink" },
  //   },
  //   {
  //     headerName: "Phone Number",
  //     field: "phoneNumber",
  //     suppressSizeToFit: true,
  //     maxWidth: 120,
  //     cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },
  //   },
  //   {
  //     headerName: "Company",
  //     field: "accountName",
  //     suppressSizeToFit: true,
  //     maxWidth: 120,
  //     cellStyle: { textAlign: "center", backgroundColor: "pink" },
  //   },
  //   {
  //     headerName: "GST ID ",
  //     field: "gstID",
  //     suppressSizeToFit: true,
  //     maxWidth: 110,
  //     cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },
  //   },
  //   {
  //     headerName: "Nationality",
  //     field: "nationalityName",
  //     suppressSizeToFit: true,
  //     maxWidth: 90,
  //     cellStyle: { textAlign: "center", backgroundColor: "pink" },
  //   },
  //   {
  //     headerName: "DOB ",
  //     field: "dob",
  //     suppressSizeToFit: true,
  //     maxWidth: 110,
  //     cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },
  //   },
  //   {
  //     headerName: "Address One",
  //     field: "addressOne",
  //     suppressSizeToFit: true,
  //     maxWidth: 160,
  //     cellStyle: { textAlign: "center", backgroundColor: "pink" },
  //   },
  //   {headerName: "Action",field: "numAvlRooms", suppressSizeToFit: true, maxWidth: 140,cellRendererFramework: (params) => (
  //       <Button color="primary" onClick={() => {
  //           filldata.length != 0 && actionButton(!show); }}> View
  //       </Button>
  //     ),
  //   },
 
  // ]);

  const [columnDefs] = useState([
    {
      headerName: 'Guest Name',
      suppressSizeToFit: true,
      width: 280,
      valueGetter: function (params) {
        const salutation = params.data.s;
        const firstName = params.data.f;
        const lastName = params.data.l;
        // Check if salutation is present and add a dot
        const fullName = salutation ? `${salutation} ${firstName} ${lastName}` : `${firstName} ${lastName}`;
        return fullName;
      },
      cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" }
    },
    { headerName: 'Company', field: 'c', suppressSizeToFit: true, width: 250,cellStyle: { textAlign: "center", backgroundColor: "pink" }, },
    {headerName: "Action",field: "numAvlRooms", suppressSizeToFit: true, maxWidth: 140,cellRendererFramework: (params) => (
            <Button color="primary" onClick={() => {
                filldata.length != 0 && actionButton(!show); }}> View
            </Button>
          ),
        },
  ])
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  useEffect(() => {
    // fetchx(API_URL + "/getGuestProfileNew?hotelID=1")
    fetchx(API_URL + "/getGuestList")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
  }, []);

  console.log(rowData)

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);  
    setfilldata(event["data"]);
    fetchx(API_URL + `/getGuestProfileNew?hotelID=1&id=${event['data'].id}`)
      .then(result => result.json())
      .then(rowData => {
        setfilldata(rowData['data'][0])
      })
    
  }, []);


console.log(filldata)

  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  const [basicModal, setBasicModal] = useState(false);
  const [disabledModal, setDisabledModal] = useState(false);

  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "basicDetails",
      title: "Basic Details",
      subtitle: "Enter Your Basic Details.",
      // icon: <FileText size={18} />,
      content: (
        <BasicDetails data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },
    {
      id: "idDetails",
      title: "ID Details",
      subtitle: "Add ID Details",
      // icon: <User size={18} />,
      content: (
        <IDDetails data1={filldata} stepper={stepper} type="wizard-modern" />
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

  const [stepper2, setstepper2] = useState(null);
  const steps2 = [
    {
      id: "editbasicDetails",
      title: "Basic Details",
      subtitle: "Edit Your Basic Details.",
      // icon: <FileText size={18} />,
      content: (
        <EditBasicDetails
          data1={filldata}
          stepper2={stepper2}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "editIdDetails",
      title: "ID Details",
      subtitle: "Edit Your ID Details.",
      // icon: <FileText size={18} />,
      content: (
        <EditIdDetails
          data1={filldata}
          stepper2={stepper2}
          type="wizard-modern"
        />
      ),
    },
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
                <b>Create New Guest Profile </b>{" "}
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

      <div>
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
        <div className="ag-theme-alpine" style={{ width: 1200, height: 540 }}>
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
                  {/* Add Guest Details */}
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

      <Card>
        <Modal
          isOpen={show}
          toggle={() => actionButton(!show)}
          className="modal-lg"
        >
          <ModalHeader toggle={() => actionButton(!show)}>
            {" "}
            View Guest Profile...{" "}
          </ModalHeader>
          <ModalBody>
            {/* <Card> */}
              <div className="d-flex">
                <Button
                  className="me-1"
                  style={{ marginLeft: "auto" }}
                  color="primary"
                  onClick={() => {
                    filldata.length != 0 && editButton(!showEdit);
                  }}
                >
                  Edit
                </Button>
              </div>
              <Card>
                <CardBody>
                <div>
      <div>
        <p> <b><center>VIEW PROFILE</center> </b> </p>
      </div>
      <Row>
        {/* <Col md='3' sm='12' className='mb-1'l>
        <div >
            <Card style={{backgroundColor:'#F2E5D9'}}>
              <Row className='cardBody'>
            <Col md='10' sm='12' className='mb-1'>
            <div>
              <ul>
               <div className='hoverUnderline' onClick={() =>{ setAssign(!assign)
                localStorage.removeItem('id')} }>Overview</div>               
                   <div className='hoverUnderline'>Company & GST Details</div>
                   <div className='hoverUnderline'>ID Details</div>
                   <div className='hoverUnderline'>Other Details</div>
              </ul>               
                </div>
                </Col> 
                </Row>
                </Card> 

               
          </div>
        </Col> */}
        <Col>
         
            {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
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
                      <b> Overview </b>
                       </AccordionHeader>
                       <AccordionBody accordionId="1">
                      <Row>
                      <Col>
                          <div>
                            <h5>
                              <b>
                                Basic Details
                                {/* <Button.Ripple color="flat-secondary" id="controlledPopover">
                                  <Edit2 style={{ height: "20px" }} />
                                </Button.Ripple>                                */}
                               
                              </b>
                            </h5>
                            <br></br>
                            <h6> Name:<b>{filldata["salutation"] + filldata["firstName"] 
                            + filldata["lastName"]
                            }</b> </h6>
                            <h6>Email: <b>{filldata["email"]}</b>  </h6>
                            <h6> Phone Number: <b> {filldata["phoneNumber"]}</b></h6>
                          </div>
                        </Col>

                    <Col>
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
                    </Col>
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
                    <Row>
                    <UncontrolledAccordion >
                      <AccordionItem>
                    <AccordionHeader
                      style={{ backgroundColor: "#F2E5D9" }}
                      targetId="1" >
                      <b> Company Details and GST </b>
                       </AccordionHeader>
                       <AccordionBody accordionId="1">
                      <Row>
                      <Col>
                     
                      <Row>
                          <Col> <h6>
                          Company: <b>{filldata["accountName"]}</b>
                        </h6> </Col>
                          
                          <Col> <h6> GST Number: <b>{filldata["gstID"]}</b> </h6>  </Col>
                          {/* <Col> <h6>VIP ID :<b>{filldata["vipType"]} </b> </h6>  </Col> */}
                          </Row>  
                    </Col>
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
                    <Row>
                    <UncontrolledAccordion >
                      <AccordionItem>      
                      <AccordionHeader
                      style={{ backgroundColor: "#F2E5D9" }}
                      targetId="1" >
                      <b>  ID Details </b>
                       </AccordionHeader>
                      <AccordionBody accordionId="1">
                      <Row>
                    
                    <DataGrid data1={filldata}/>
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

              {/* <Col>
              <Row>
                <Col>
                  <div className="mb-1">
                    <Row>
                    <UncontrolledAccordion defaultOpen='1'>
                      <AccordionItem> 
                      <AccordionHeader
                      style={{ backgroundColor: "#F2E5D9" }}
                      targetId="1" >
                      <b>Membership Details </b>
                       </AccordionHeader>
                      <AccordionBody accordionId="1">
                      <Row>
                      <Col>
                         <Row>
                         { filldata2 &&
                         <>
                          <Col> <h6>Membership Type: {filldata2["membershipType"]} </h6> </Col>
                          <Col> <h6>Membership Number: {filldata2["membershipNo"]} </h6> </Col>
                          <Col> <h6> Membership Level: {filldata2["membershipLevel"]}</h6> </Col>
                          </>
                        }
                         </Row>                        
                         <br></br>
                         <Row>
                          <Col> <h6>Membership Since: {filldata2["membershipSince"]} </h6> </Col>
                          <Col> <h6> Membership Expiry: {filldata2["expiryDate"]}</h6> </Col>
                          </Row>  
                    </Col>
                      </Row>
                      </AccordionBody>
                     </AccordionItem>
                   </UncontrolledAccordion>
                    </Row>                   
                  </div>
                </Col>                
              </Row>  
              </Col> */}

               <br></br>

              <Col>
              <Row>
                <Col>
                  <div className="mb-1">
                    <Row>
                    <UncontrolledAccordion >
                      <AccordionItem> 
                      <AccordionHeader
                      style={{ backgroundColor: "#F2E5D9" }}
                      targetId="1" >
                      <b>Other Details </b>
                       </AccordionHeader>
                      <AccordionBody accordionId="1">
                      <Row>
                      <Col>
                       {/* 
                    
                    */}
                         <Row>
                         <Col> <h6>DOB: <b> {filldata["dob"]}</b> </h6></Col>
                         <Col> <h6>Anniversary Date: <b>{filldata["anniversary"]}</b> </h6></Col>
                         <Col> <h6>Notes:<b>{filldata["notes"]} </b> </h6></Col>
                         <Col> <h6> Guest Preference Notes: <b>{filldata["guestpreferencenotes"]} </b> </h6> </Col>
                          
                          </Row>  
                    </Col>
                      </Row>
                      </AccordionBody>
                     </AccordionItem>
                   </UncontrolledAccordion>
                    </Row>                   
                  </div>
                </Col>                
              </Row> 
              
              
              </Col>

            {/* </Form> */}
          
        </Col>
      </Row>
      </div>
      </CardBody>
      </Card>
      </ModalBody>
      </Modal>
      </Card>


    </div>
  );
};

export default WizardModern;
