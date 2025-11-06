import { useState } from "react";
import Select from "react-select";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import { selectThemeColors } from "@utils";
import {Input,Card,Form,Label,Button,CardBody,CardTitle,CardHeader,InputGroup,InputGroupText,Row,Col,Modal,ModalHeader,ModalBody, } from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { useRef, useEffect, useMemo, useCallback} from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem,UncontrolledAccordion } from 'reactstrap'
import API_URL from "../../../../config";
const id = '1';
import ExtraGroupMapping from "./datagrid"
const typeOptions = [
  { value: 'Percentage', label: 'Percentage' },
  { value: 'Amount', label: 'Amount' },
  { value: 'Pieces', label: 'Pieces' },
  { value: 'Trips', label: 'Trips' },
]

let groupsOption = [
  fetchx(API_URL + '/getforeignkeygroupid?hotelID=1')
    .then(result => result.json())
    .then(resp => {
      groupsOption = resp['data']
    })
  ]

  let subGroupOptions = [
    fetchx(API_URL + '/getforeignkeysubgroup?hotelID=1')
      .then(result => result.json())
      .then(resp => {
        subGroupOptions = resp['data']
      })
    ]


const defaultValues = {
  // hotelID: "",
      extraCode: '',
      description: "",
      remarks: "",
      type: null,
      percentage: "",
      amount: "",
      pieces: '',
      trips: "",
      isActive: null
};

const Extras = () => {
  const [open, setOpen] = useState('')
  const toggle = id => {open === id ? setOpen() : setOpen(id)}
  let navigate = useNavigate();  
  const [selectedValue, setSelectedOption] = useState('');
  const [rowData, setRowData] = useState();
  const [extraData, setExtraData] = useState();
  const gridRef = useRef();
  const [show, actionButton] = useState(false);
  const [data, setData] = useState(null);
  const [value, setValue] = useState('')
  const { reset, handleSubmit, control ,formState: { errors }} = useForm({ defaultValues });
  const [filldata, setfilldata] = useState({});

  const handleDropdownChange = (event) => {
    setSelectedOption(event.value);

    if (selectedValue == 'Percentage') {
        //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else if (selectedValue == 'Amount') {
        
        //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else if (selectedValue == 'Pieces') {
      
      //         setitemOptions([{ value: "1", label: "Active" }]) 
  }
    else if (selectedValue == 'Trips') {
        
        //         setitemOptions([{ value: "1", label: "Active" }]) 
    }
    else  {
        
        //         setitemOptions({ value: "0", label: "InActive" })
    }
};

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'Extra Code',field: 'extraCode',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    {headerName: 'Description',field: 'description',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140 },
    {headerName: 'Type',field: 'type',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': '#F1E39B'}, maxWidth: 140 },
    {
      headerName: "Action",field: "numAvlRooms",suppressSizeToFit: true, maxWidth: 120,
      cellRendererFramework: (params) => (
        <Button color="primary" onClick={() => actionButton(!show)}> View  </Button> ),
    },
    // {headerName: 'Percentage',field: 'percentage'},
    // {headerName: 'Amount',field: 'amount'},
    // {headerName: 'Pieces',field: 'pieces'},
    // {headerName: 'Trips',field: 'trips'},
    // {headerName: 'Is Active',field: 'isActive',suppressSizeToFit: true,cellStyle: {'text-align': 'center','background-color': 'pink'}, maxWidth: 140 },
  ]);
 
  const defaultColDef = useMemo( ()=> (
    {
      sortable: true, 
      filter: true,
      filterParams :{
      buttons : ['apply','reset']
      }
    }
  ));

  const cellClickedListener = useCallback( event => {
    console.log(event["data"])
    setExtraData(event['data'])
    setfilldata(event['data']['id'])
  }, []);

  useEffect(() => {
    fetchx(API_URL + '/getextra?hotelID=1')
    .then(result => result.json())
    .then(rowData => {
      setRowData(rowData['data'])
    })
  }, []); 


  const onSubmit = (data) => { 
    const groupsData = data.groups.map(group => group.value);
    const subGroupData = data.subgroups.map(group => group.value);  

    setData(data);
    data['type']=selectedValue
      if (data.extraCode !== null  ) {
      let createExtra = JSON.stringify({
        "extraCode": data.extraCode,
        "description": data.description,
        "remarks": data.remarks,
        "type": data.type,
        "percentage": data.percentage,
        "amount": data.amount,
        "pieces": data.pieces,
        "trips": data.trips,
        "isActive":1,
        "groupsData": groupsData,
        "subGroupData":  (subGroupData !== undefined) ? subGroupData : null,
        "isAllOutlets":(data.subgroups !== undefined) ? 0 : 1,
        "hotelID": data.hotelID,
      });

      let res = fetchx(API_URL + "/addextra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createExtra,
      }).then((res) => {
        navigate('');
        if(res['status']==200){
          fetchx(API_URL + '/getextra?hotelID='+id)
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
        })
        }      

        
      });
      
    }
  };

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleReset = () => {
    reset({
      // hotelID: "",
      extraCode: '',
      description: "",
      // groupID: null,
      // subGroupID: null,
      remarks: "",
      type: null  ,
      percentage: "",
      amount: "",
      pieces: '',
      trips: "",
      isActive: null
    });
  };  

  return (
    <div>
{/* View Modal */}
   <Card>
        <Modal
          isOpen={show}
          toggle={() => actionButton(!show)}
          className="modal-lg">
          <ModalHeader toggle={() => actionButton(!show)}>         
          Extra Code Details Information...
          </ModalHeader>
          <ModalBody>
            <div>
              {/* <div className="d-flex">
                <Button className="me-1" style={{ marginLeft: "auto" }} color="primary" onClick={() => {filldata.length != 0 && editButton(!showEdit); }} >
                  Edit
                </Button>
              </div> */}
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
                      <b>  Extra  Details </b>
                       </AccordionHeader>
                       <AccordionBody accordionId="1">
                      <Row>
                      <Col>
                          <div>
                            <br></br>
                            <Row>
                              <Col>
                              { extraData&& <h6>Extra Code:<b> {extraData["extraCode"]} </b></h6>}
                              </Col>
                              <Col>
                              { extraData&& <h6>Description:<b>{extraData["description"]}</b></h6>}
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                              { extraData&& <h6>Type:       <b>{extraData["type"]} </b></h6>}
                              </Col>
                              <Col>
                              { extraData&& <h6>Remarks:<b>{extraData["remarks"]}</b></h6>}
                              </Col>
                            </Row>
                            <Row>
                            <Col>
                            { extraData&& <h6>Percentage:<b> {extraData["percentage"]} </b></h6>}                           
                            </Col> 
                            <Col>
                            { extraData&& <h6>Amount:<b>{extraData["amount"]}</b></h6>}
                            </Col> 
                            <Col>
                            { extraData&& <h6>Pieces:       <b>{extraData["pieces"]} </b></h6>}
                            </Col>  
                            </Row>         
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
                              <UncontrolledAccordion >
                                <AccordionItem>
                                  <AccordionHeader
                                    style={{ backgroundColor: "#F2E5D9" }}
                                    targetId="1"
                                  >
                                    <b> Mapping Details</b>
                                  </AccordionHeader>
                                  <AccordionBody accordionId="1">
                                  <ExtraGroupMapping data1={filldata}/>
                                  </AccordionBody>
                                </AccordionItem>
                              </UncontrolledAccordion>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                      <br></br>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </ModalBody>
        </Modal>
      </Card>



       <div>
    <Accordion open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId='1'><h4><b>Add Extras </b> </h4></AccordionHeader>
        <AccordionBody accordionId='1'>
        <Card>
      <CardHeader>
        <CardTitle tag="h4">Extras</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>       
          <Col md='3' sm='12' className='mb-1'>
            <div className='mb-1'>
             
            <Label className='form-label' for='extraCode'>
              Extra Code
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='extraCode'
              name='extraCode'
              render={({ field }) => <Input required placeholder="Extra Code" className={classnames({
                "is-invalid": data !== null && (data.extraCode === null || !data.extraCode.length)
              })} {...field}/>}
            />
            </InputGroup>
            
          </div>
          </Col>
          <Col md='3' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='description'>
              Description
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='description'
              name='description'
              render={({ field }) => <Input required placeholder="Description" className={classnames({
                "is-invalid": data !== null && (data.description === null || !data.description.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>
         
          <Col md='3' sm='12' className='mb-1'>
            <div className='mb-1'>
            <Label className='form-label' for='remarks'>
              Remarks
            </Label>
            <InputGroup className="input-group-merge">
            <Controller
              defaultValue=''
              control={control}
              id='remarks'
              name='remarks'
              render={({ field }) => <Input placeholder="Remarks" className={classnames({
                "is-invalid": data !== null && (data.remarks === null || !data.remarks.length)
              })} {...field}/>}
            />
            </InputGroup>
          </div>
          </Col>

             <Col md='3' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="type">
            type
            </Label>
            <Controller
                  id='type'
                  control={control}
                  name='type'
                  render={({ field }) => (
                    <Select
                      name="type"
                      className="react-select"
                      options={typeOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      // className={classnames('react-select', { 'is-invalid': data !== null && data.type === null })}
                      
                      isClearable
                      onChange={handleDropdownChange}
                      
                    />
                  )}
                />
          </div>
          </Col>
          {selectedValue === 'Percentage' && (
          <Col md='3' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="percentage">
             Percentage
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.percentage === null || !data.percentage.length)
                })}
              ></InputGroupText>
              <Controller
                id="percentage"
                name="percentage"
                control={control}
                render={({ field }) => (
                  <Cleave
                  // pattern="[0-9]*" title="Type Only Numbers"
                  placeholder="Percentage"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.percentage === null || !data.percentage.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          )}
          {selectedValue === 'Amount' && (
          <Col md='3' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='amount'>
            Amount
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.amount=== null || !data.amount.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='amount'
                name='amount'
                control={control}
                render={({ field }) => (
                  <Cleave
                 // pattern="[0-9]*" title="Type Only Numbers"
                  placeholder='Amount'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.amount === null || !data.amount.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          )}
          {selectedValue === 'Pieces' && (
          <Col md='3' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='pieces'>
            Pieces
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.pieces=== null || !data.pieces.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='pieces'
                name='pieces'
                control={control}
                render={({ field }) => (
                  <Cleave
                  placeholder='Pieces'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.pieces === null || !data.pieces.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          )}
          {selectedValue === 'Trips' && (
          <Col md='3' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='trips'>
            Trips
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.trips=== null || !data.trips.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='trips'
                name='trips'
                control={control}
                render={({ field }) => (
                  <Cleave
                  placeholder='Trips'
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.trips === null || !data.trips.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          )}
          
          <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="groups">
                      Select Groups
                    </Label>
                    <Controller
                      id="groups"
                      control={control}
                      name="groups"
                      render={({ field }) => (
                        <Select
                          isMulti
                          isClearable
                          options={groupsOption}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          className={classnames("react-select")}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
                <Col md="3" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="subgroups">
                      Select Sub Groups
                    </Label>
                    <Controller
                      id="subgroups"
                      control={control}
                      name="subgroups"
                      render={({ field }) => (
                        <Select
                          isMulti
                          isClearable
                          options={subGroupOptions}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          className={classnames("react-select")}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>
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
          </Row>
        </Form>
      </CardBody>
    </Card>
        </AccordionBody>
      </AccordionItem>
      </Accordion>
</div>

    <br></br>
  {/* AG Grid */}
    <div className="ag-theme-alpine" style={{ height: 540}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
  
    </div>
  );
};

export default Extras;