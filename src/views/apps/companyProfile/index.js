import { useRef, useState } from "react";
import {Button, Modal, ModalHeader, ModalBody,} from "reactstrap";
import Wizard from "@components/wizard";
import CompanyInformation from "./companyInformation";
import BTC from "./btc";
import Booker from "./booker";
import RateCodes from "./rateCode"
import EditCompanyInformation from "./editCompanyInformation";
// import EditBooker from "./editBooker";
import EditBooker from "./editBookerDetails";
import EditBTC from "./editBtc"
import RateCodeDetails from "./rateCode"
import { Card, Row, Col } from "reactstrap";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useEffect, useMemo, useCallback } from "react";
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem,Label, Input} from "reactstrap";
// import "./hover.scss";
import API_URL from "../../../config";
import EditbookerDetails from './viewBooker'
import RateCodeMap from "./rateCodeMap"
import RateCodeBasicDetails from "./datagrid"


const WizardModern = () => {
  const [open, setOpen] = useState('1')
  const toggle = (id) => { open === id ? setOpen() : setOpen(id);   };
  const [filldata, setfilldata] = useState("");
  const [showEdit, editButton] = useState(false);
  const [show, actionButton] = useState(false);
  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [stepper2, setstepper2] = useState(null);
  const [columnDefs, setColumnDefs] = useState([
    // {headerName: "Accounts Name",field: "accountName",suppressSizeToFit: true,maxWidth: 280,cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" ,wrapText: true, autoHeight: true}, },
    {
      headerName: "Accounts Name",
      field: "accountName",
      suppressSizeToFit: true,
      maxWidth: 280,
      cellStyle: {
        textAlign: "center",
        backgroundColor: "#F1E39B",
        whiteSpace: "normal", // This property enables text wrapping
        wordWrap: "break-word" // This property forces long words to wrap
      },
      autoHeight: true // This property enables dynamic row height based on cell content
    },
    {headerName: "Account Type",  field: "accountType", suppressSizeToFit: true, maxWidth: 140,cellStyle: { textAlign: "center", backgroundColor: "pink" },},
    {
      headerName: "Address",
      field: "address",
      valueGetter: function(params) {
        return params.data.addressLine1 + " " + params.data.addressLine2;
      },
      suppressSizeToFit: true,
      maxWidth: 250,
      cellStyle: { textAlign: "center", backgroundColor: "#F1E39B",wrapText: true,autoHeight:true,  },
    } ,   
    { headerName: "State",  field: "state",  suppressSizeToFit: true, maxWidth: 110, cellStyle: { textAlign: "center", backgroundColor: "pink" },},
    { headerName: "City",   field: "city", suppressSizeToFit: true, maxWidth: 120, cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },},
    { headerName: "GST ID ",  field: "gstID",  suppressSizeToFit: true, maxWidth: 180, cellStyle: { textAlign: "center", backgroundColor: "pink" },},
    // { headerName: "BTC",  field: "isBTCApproved",  suppressSizeToFit: true, maxWidth: 180, cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },},
    {
      headerName: "BTC",
      field: "isBTCApproved",
      suppressSizeToFit: true,
      maxWidth: 180,
      cellStyle: { textAlign: "center", backgroundColor: "#F1E39B" },
      cellRenderer: function(params) {
        if (params.value === 1) {
          return "Approved";
        } else if (params.value === 0) {
          return "Not Approved";
        } else {
          return null;
        }
      }
    },
    {headerName: "Action",field: "numAvlRooms",suppressSizeToFit: true, maxWidth: 120,cellRendererFramework: (params) => (  <Button color="primary" onClick={() => actionButton(!show)}> View  </Button> ),},
  ]);
  const defaultColDef = useMemo(() => ({ sortable: true, filter: true, filterParams: {   buttons: ["apply", "reset"], },}));

    //get Complete account details
  useEffect(() => {
    fetchx(API_URL + "/getCompleteAccountDetails?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
  }, []);


    //get Complete account details
    const cellClickedListener = useCallback((event) => {
      //// console.log("cellClicked", event);
      //// console.log(event["data"]);
      // //// console.log(event["rowIndex"]);
      setfilldata("")
      setfilldata(event["data"])
    }, []);
    //// console.log(filldata);
 
  const steps = [
    {
      id: "companyInformation", 
      title: " Basic Company Information",
      subtitle: "Enter Your Company Information.",
      content: (
        <CompanyInformation
          data1={filldata}
          stepper={stepper}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "btc",
      title: "BTC Details",
      subtitle: "Add BTC Details",
      // icon: <User size={18} />,
      content: <BTC data1={filldata} stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "booker",
      title: "Booker",
      subtitle: "Enter Booker Details",
      // icon: <MapPin size={18} />,
      content: <Booker stepper={stepper} type="wizard-modern" />,
    },
    {
      id: "RateCodeMap",
      title: "Mapping Rate Codes ",
      // subtitle: "Enter Booker Details",
      // icon: <MapPin size={18} />,
      content: <RateCodeMap data1={filldata}  stepper={stepper} type="wizard-modern" />,
    },
    // {
    //   id: "accRateCodeMap",
    //   title: "Account RateCode Mapping",
    //   // subtitle: "Enter Booker Details",
    //   // icon: <MapPin size={18} />,
    //   content: <AccountRateCodeMapping data1={filldata}  stepper={stepper} type="wizard-modern" />,
    // },    
  ];
    //Edit Account Details Page
  const steps2 = [
    {
      id: "companyInformation",
      title: "Company Information",
      subtitle: "Edit Your Company Information.",
      // icon: <FileText size={18} />,
      content: (
        <EditCompanyInformation
          data1={filldata}
          stepper2={stepper2}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "btc",
      title: "BTC Details",
      subtitle: "Edit BTC Details",
      // icon: <User size={18} />,
      content: <EditBTC data1={filldata}  stepper2={stepper2} type="wizard-modern" />,
    },
    {
      id: "editBooker",
      title: "Bookers",
      subtitle: "Edit Booker Details",
      // icon: <MapPin size={18} />,
      content: (
        <EditBooker data1={filldata}  stepper2={stepper2}  type="wizard-modern" />
      ),
    },
    {
      id: "rateCode",
      title: "RateCode",
      subtitle: "View Rate Code Details",
      // icon: <MapPin size={18} />,
      content: (
        <RateCodeDetails data1={filldata} stepper={stepper} type="wizard-modern" />
      ),
    },  
  ];

  const onFilterTextBoxChanged = useCallback(() => {	gridRef.current.api.setQuickFilter(	 document.getElementById("filter-text-box").value	);	}, []);
// // console.log(filldata["bookerDetails"][0]["name"])

  return (
    <div>
      {/* /// Create Account Details /// */}
      <div>
      <UncontrolledAccordion >
      <AccordionItem >
            <AccordionHeader targetId="1">
              <h4>
                <b> Create Company Information </b>
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
        </UncontrolledAccordion>
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
            onInput={onFilterTextBoxChanged}	
          />	
        </Col>	
      </div>
     {/* //// getCompleteAccountDetails AG Grid ////////// */}
      <div>
        <Card>
          <div className="ag-theme-alpine" style={{width:1300, height: 540 }}>
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
        </Card>
      </div>

      {/* //////Edit Account Details Page */}
      <Card>
        <div className="vertically-centered-modal">
          <Modal
            isOpen={showEdit}
            toggle={() => editButton(!showEdit)}
            className="modal-xl"
          >
            <ModalHeader toggle={() => editButton(!showEdit)}>
              Account Information
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
            {/* <ModalFooter>
              <Button
                color="primary"
                onClick={() => setDisabledModal(!disabledModal)}
              >
                Continue
              </Button>
            </ModalFooter> */}
          </Modal>
        </div>
      </Card>
          {/* //////View Account Details Page */}
      <Card>
        <Modal
          isOpen={show}
          toggle={() => actionButton(!show)}
          className="modal-lg">
          <ModalHeader toggle={() => actionButton(!show)}>         
            Account Information...
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
                    <p><b><center>VIEW PROFILE</center> </b> </p>                  
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
                                    <b> Overview </b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                <Card> 
                                    <div className="d-flex p-1 border">
                                      <span>
                                        <Col md="16" sm="12" className="mb-1">
                                          <Row>
                                            <Col
                                              md="6"
                                              sm="12"
                                              className="mb-1"
                                            >
                                              <div>
                                                <h5>
                                                  <b>Company Basic Details</b>
                                                </h5>
                                                <br></br>
                                                <h6>
                                                  Account Name:
                                                  <b>
                                                    {filldata["accountName"]}
                                                  </b>
                                                </h6>
                                                <h6>
                                                  Email:
                                                  <b>{filldata["email"]} </b>
                                                </h6>
                                                <h6>
                                                  Phone Number:
                                                  <b>
                                                    {filldata["phoneNumber"]}
                                                  </b>
                                                </h6>
                                              </div>
                                            </Col>

                                            <Col
                                              md="6"
                                              sm="12"
                                              className="mb-1"
                                            >
                                              <div>
                                                <h5>
                                                  <b> Address Details</b>
                                                </h5>
                                                <br></br>
                                                <h6>Address One:
                                                  <b>                                                    
                                                    {
                                                      filldata["addressLine1"]
                                                    }
                                                  </b>
                                                </h6>
                                                <h6>Address Two:
                                                  <b>                                                    
                                                    {
                                                      filldata["addressLine2"]
                                                    }
                                                  </b>
                                                </h6>
                                                <h6>
                                                  Country:
                                                  <b>
                                                    {filldata["name"]}
                                                  </b>
                                                </h6>
                                                <h6>
                                                  State:
                                                  <b>{filldata["state"]} </b>
                                                </h6>
                                                <h6>
                                                  City:
                                                  <b>
                                                    {filldata["city"]}
                                                  </b>
                                                </h6>
                                                <h6>
                                                  PostalCode:
                                                  <b>
                                                    
                                                    {filldata["postalCode"]}
                                                  </b>
                                                </h6>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Col>
                                      </span>
                                    </div>                                  
                                </Card>
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
                                    targetId="1"
                                  >
                                    <b> Account Details </b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                <Card>
                                  
                                  <Row>
                                    <Col>
                                      <Row>
                                      
                                        <Col>
                                          <h6>  AccountType:<b>{filldata["accountType"]} </b></h6>
                                        </Col>
                                        <Col><h6>  GST ID:<b>{filldata["gstID"]} </b>{" "}</h6>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <h6>   IATA:<b> {filldata["IATA"]} </b> </h6>
                                        </Col>
                                        <Col>
                                          <h6> Secondary Email: <b>      {filldata["secondaryEmail"]} </b></h6>
                                        </Col>
                                        {/* <Col>
                              <h6>
                                RateCode :<b> {filldata["rateCode"]}</b>{" "}
                              </h6>
                            </Col> */}

                                        <Col>
                                          <h6>  Notes:<b>{filldata["notes"]} </b>{" "}</h6>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <h6> accountManagerID: <b>   {filldata["AccountAssociateName"]} </b></h6>
                                        </Col>
                                        <Col>
                                          <h6>
                                            financialAssociateID:
                                            <b>
                                              {" "}
                                              {
                                                filldata["financialAssociateName"]
                                              }{" "}
                                            </b>
                                          </h6>
                                        </Col>
                                        <Col></Col>
                                      </Row>
                                    </Col>                                    
                                  </Row>
                                </Card>
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
                                    <b> BTC Details</b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                    <Row>
                                      <Col>
                                        <Row>
                                          <Col>
                                            <h6> BTC Approved: <b>   {filldata["isBTCApproved"]=== 1 ? 'YES' : 'NO'}</b></h6>
                                          </Col>
                                          <Col>
                                            <h6>Credit Limit:<b>{filldata["creditLimit"]}   </b> </h6>
                                          </Col>
                                          <Col>
                                            <h6>
                                           
                                              Tenure:
                                              <b> {filldata["tenure"]}</b>
                                            </h6>
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

                      <Col>
                        <Row>
                          <div className="mb-1">
                            <Row>
                              <UncontrolledAccordion>
                                <AccordionItem>
                                  <AccordionHeader
                                    style={{ backgroundColor: "#F2E5D9" }}
                                    targetId="1"
                                  >
                                    <b> Booker Details</b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                  <EditbookerDetails data1={filldata}/>
                                  </AccordionBody>
                                </AccordionItem>
                              </UncontrolledAccordion>                             
                            </Row>
                          </div>
                        </Row>
                      </Col>

                      <br></br>
                      <Col>
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
                      </Col>
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