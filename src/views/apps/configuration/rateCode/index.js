// ** React Imports
import { useRef, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Accordion, UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem,Label} from "reactstrap";
import {Edit2,Search,} from "react-feather";
import RateCode from "./rateCode";
// import EditRateCode from "./editRateCode";
import { Card } from "reactstrap";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import API_URL from '../../../../config'
import { useEffect, useMemo, useCallback } from "react";
import { Input, Form, Row, Col } from "reactstrap";
// import DataGrid from './datagrid'
import RateCodeBasic from './rateCodeDetailsEdit'
import RatesMap from './newRateMap'
const WizardModern = () => { 
  const [open, setOpen] = useState("");
  const toggle = (id) => { open === id ? setOpen() : setOpen(id);};
  const [filldata, setfilldata] = useState(" ");
  const [show, actionButton] = useState(false);
  const [showEdit, editButton] = useState(false);
  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [rateCode, setrateCode] = useState();
  const defaultColDef = useMemo(() => ({sortable: true,filter: true,filterParams: {  buttons: ["apply", "reset"],  },}));
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Rate Code",
      field: "rateCode",
      suppressSizeToFit: true,
      maxWidth: 200,
      cellStyle: { "textAlign": "center", "backgroundColor": "#F1E39B" },
    },
    {
      headerName: "Description",
      field: "description",
      suppressSizeToFit: true,
      maxWidth: 240,
      cellStyle: { "textAlign": "center", "backgroundColor": "pink" },
    },
    {
      headerName: "Begin Date",
      field: "beginSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
      cellStyle: { "textAlign": "center", "backgroundColor": "#F1E39B" },
    },
    {
      headerName: "SellDate",
      field: "endSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
      cellStyle: { "textAlign": "center", "backgroundColor": "pink" },
    },
    {
      headerName: "Days Applicable",
      field: "daysApplicable",
      maxWidth: 160,
      cellStyle: { "textAlign": "center", "backgroundColor": "#F1E39B" },
    },
    {
      headerName: "Action",
      field: "numAvlRooms",
      suppressSizeToFit: true,
      maxWidth: 180,
      cellRendererFramework: (params) => (
        <Button color="primary" onClick={() => actionButton(!show)}>         
          View Rates
        </Button>
      ),
    },
    {
      headerName: "Action",
      field: "numAvlRooms",
      suppressSizeToFit: true,
      maxWidth: 120,
      cellRendererFramework: (params) => (
        <h5 >
        <Edit2 style={{ height: "20px" }}  onClick={() =>{EditData(params.data)}} align='end' />                        
      </h5>
      ),
    },
  ]);

  
  const cellClickedListener = useCallback((event) => {
    // console.log(event["data"])
    setfilldata(event["data"]);
  }, []);

  const EditData = (rowData)=>{
    // console.log(rowData)
    setfilldata(rowData);
    setrateCode(!rateCode)
  }
  useEffect(() => {
    fetchx(API_URL + "/getRateCode?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
  }, []);

 
    const [stepper2, setstepper2] = useState(null);
   
      const gridRef1 = useRef(null)
      
  return (
    <div>
     <div>
          <Accordion open={open} toggle={toggle}>
            <AccordionItem>
              <AccordionHeader targetId="1">
                <h4>
                  <b>Add Rate Code  </b>
                </h4>
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <RateCode />
                           </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>            

      {/* <div>
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
          </Row>
        </div> */}
      <div>
      
        <br></br>
        <div className="ag-theme-alpine" style={{ height: 540, width: 1200 }}>
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
        {/* </Card> */}
      </div>

    {/* View Rate Code Details */}

    <div>
        <Modal  isOpen={rateCode} toggle={() => setrateCode(!rateCode)}className="modal-lg"  >
          <ModalHeader className="modal-lg"toggle={() => setrateCode(!rateCode)} >
           Edit RateCode Basic Details
          </ModalHeader>
          <ModalBody className="pb-3 px-sm-1 mx-20">            
            <RateCodeBasic data1={filldata} />
          </ModalBody>
        </Modal>
      </div>

      <Card>
        <Modal isOpen={show} toggle={() => actionButton(!show)} className="modal-lg">
          <ModalHeader toggle={() => actionButton(!show)}>
           View Details
          </ModalHeader>
          <ModalBody>
          {/* <div className="d-flex">
                <Button className="me-1" style={{marginLeft: "auto"}} color="primary" onClick={() => {filldata.length != 0 && editButton(!showEdit);}}>
                  Edit
                </Button>
              </div>
              <br/> */}
            <Card>
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
                      <b>  Rate Code Basic Details </b>
                     
                       </AccordionHeader>
                       <AccordionBody accordionId="1">
                      <Row>
                      <Col>
                          <div> 
                          {/* <h6><b> Rate Code Details  </b></h6> */}
                          
                            <br></br>
                              <h6> rateCode: <b>{filldata["rateCode"]}</b></h6>
                              <h6> Description: <b> {filldata["description"]}</b>  </h6>
                              <h6>Begin Date:<b>{filldata["beginSellDate"]} </b> </h6>
                              <h6>Sell Date:<b> {filldata["endSellDate"]}</b> </h6>
                          </div>
                        </Col>
                        <Col>
                          <div>
                            {/* <h6><b> Rate Code Details  </b></h6> */}
                             <br/>
                             {/* <br/> */}
                             <h6>MarketCode: <b> {filldata["marketCode"]}</b></h6>
                             <h6>Source: <b> {filldata["sourceCode"]}</b></h6>                  
                             <h6>Package : <b>{filldata["packageCode"]} </b> </h6>
                             <h6>Transaction Code:<b>{filldata["transactionCode"]} </b> </h6>
                             {/* <h6> PKG Transaction Code:<b> {filldata["packageTransactionCodeID"]} </b> </h6> */}
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
                    <UncontrolledAccordion defaultOpen='1'>
                      <AccordionItem>      
                      <AccordionHeader
                      style={{ backgroundColor: "#F2E5D9" }}
                      targetId="1" >
                      <b> RateCode Rates </b>
                       </AccordionHeader>
                      <AccordionBody accordionId="1">
                      <Row>                    
                      <RatesMap data1={filldata}/>
                       {/* { filldata.length != 0 &&                                         
                         <DataGrid data1={filldata}/>
                       }     */}
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
        </Col>
      </Row>
<br></br>
             
           
            </Card>
          </ModalBody>
         
        </Modal>
      </Card>

{/* Edit RateCode  */}
      {/* <Card>
        <div className="vertically-centered-modal">
          <Modal
            isOpen={showEdit}
            toggle={() => editButton(!showEdit)}
            className="modal-xl"
          >
            <ModalHeader toggle={() => editButton(!showEdit)}>
             Edit RateCode And Rates
            </ModalHeader>
            <ModalBody>
            <EditRateCode data1={filldata} stepper2={stepper2} type="wizard-modern" />
            </ModalBody>           
          </Modal>
        </div>
      </Card> */}
    </div>
  );
};

export default WizardModern;
