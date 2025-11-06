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
  Col
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

import { useRef, useEffect, useMemo, useCallback } from 'react';

const SessionOptions = [
  { value: "Lunch", label: "Lunch" },
  { value: "Breakfast", label: "Breakfast" },
  { value: "Dinner", label: "Dinner" },
];
const activeoptions = [
  { value: "1", label: "Active" },
  { value: "0", label: "InActive" },
];



const defaultValues = {
  storeID: "",
  sessionName: "",
  status: "",
};



let id = 1;
const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();
  const [showsavebtn, setshowsavebtn] = useState(false)
  const [showPrevbtn,setshowPrevbtn] = useState(false)
  const [showModal, setshowModal] = useState(false);
  const [updatedrowData, setupdatedRowData] = useState([]);
  // console.log(updatedrowData.length)
  // ** State
  const [open, setOpen] = useState('0')
  const MySwal = withReactContent(Swal)
  let navigate = useNavigate();
  const colourMappings = {
    Active: 'Active',
    Inactive: 'InActive'
  }

  const extractKeys = (mappings) => {
    return Object.keys(mappings)
  }

  const lookupValue = (mappings, key) => {
    return mappings[key]
  }

  const colourCodes = extractKeys(colourMappings)

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id', suppressSizeToFit: true, maxWidth: 160, },
    { headerName: 'Store ID', field: 'storeID', suppressSizeToFit: true },
    { headerName: 'Store Name', field: 'restaurantName', suppressSizeToFit: true },
    { headerName: 'IP', field: 'IP', editable: true },
    // {headerName: 'status',field: 'status'},

    {
      headerName: 'status', field: 'status', cellEditor: 'agSelectCellEditor', editable: true,
      cellEditorParams: {
        values: colourCodes
      },
      valueFormatter: (params) => {
        return lookupValue(colourMappings, params.value)
      },
      // cellRenderer: ColourCellRenderer,
      filter: 'agSetColumnFilter'
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
  const defaultColDef = useMemo(() => (
    {
      sortable: true,
      filter: true,
      filterParams: {
        buttons: ['apply', 'reset']
      }
    }
  ));

  const cellClickedListener = useCallback(event => {
    // console.log('cellClicked', event);
  }, []);


  const updatedRowsList = []

  const onCellValueChanged = useCallback(event => {
    // console.log('onCellValueChanged', event);
    updatedRowsList[event.data.id] = event.data
    // console.log(event.data)
    // updatedRowsList[1] = event.data
    setupdatedRowData(updatedRowsList);


    // console.log(updatedRowsList)
    // console.log(updatedrowData[i])

  }, []);


  useEffect(() => {
    // console.log("Clicked")
    fetchx(API_URL + '/getKitchenIPDetails?hotelID=1')
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
        // console.log(rowData['data'])
      })
  }, []);


  function ReloadTable() {
    // console.log("updatedrowData")
    // console.log(updatedrowData)
    // console.log("updatedrowData:", updatedrowData);
    // console.log("rowData before setRowData:", rowData);
    setRowData(updatedrowData)
    // console.log(rowData)
    setshowsavebtn(true)
    setshowPrevbtn(true)

  }
  function handlePreviewChanges() {
    updatedrowData.forEach(data => {
      // console.log(data)
      const updateditem = JSON.stringify({
        "hotelID": data['hotelID'],
        "storeID": data['storeID'],
        "IP": data['IP'],
        "menuHead": data['menuHead'],
        "menuGroup": data['menuGroup'],
        "status": data['status'],
        "id": data['id']
      })

      // console.log(updateditem)
      fetchx(API_URL + '/updateKitchenIPDetails', {
        method: 'PUT',
        body: updateditem,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((post) => {
          // console.log(post)
          if (post['statusCode'] == 200) {
            const swalInstance = MySwal.fire({
              text: 'IP Details updated Successfully!',
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
          }
        })
        .catch((err) => {
          console.log(err.message);
        });

    })

  }
  function handlePrevbtn () {
    navigate('');
  }

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    // console.log(data)
    if (
      data.storeID !== null &&
      data.sessionName !== null &&
      data.status.value !== null
    ) {
      // console.log(data);
      let createasset = JSON.stringify({
        "hotelID": 1,
        "storeID": data.storeID.value,
        "IP": data.IP,
        "menuHead": data.menuHead.value,
        "menuGroup": data.menuGroup.value,
        "status": "Active",
      });
      // console.log(createasset);
      let res = fetchx(API_URL + "/addKitchenIPDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        // console.log(res);
        if (res['status'] == 200) {
          //       fetchx(API_URL+'/getKitchenIPDetails?hotelID='+id)
          // .then(result => result.json())
          // .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
          // })
          const swalInstance = MySwal.fire({
            text: "Menu Group Added Successfully",
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
              fetchx(API_URL + '/getKitchenIPDetails?hotelID=1')
                .then(result => result.json())
                .then(rowData => {
                  setRowData(rowData['data'])
                  // console.log(rowData['data'])
                })
            }
          });
        }
      });

    }
  };

  const handleReset = () => {
    reset({
      storeID: "",
      sessionName: "",
      status: "",
    });
  };
  const storeOptions = JSON.parse(sessionStorage.getItem('storeOptions'));
  const menuHeadoptions = JSON.parse(sessionStorage.getItem('menuHeadoptions'));
  const menuGroupOptions = JSON.parse(sessionStorage.getItem('menuGroupOptions'));
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
            <AccordionHeader targetId='1'>Add IP Details</AccordionHeader>
            <AccordionBody accordionId='1'>
              {/* <CardHeader>
        <CardTitle tag="h4"> Sessions </CardTitle>
      </CardHeader> */}
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="storeID">
              Store ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.storeID === null,
                })}
              ></InputGroupText>
              <Controller
                id="storeID"
                name="storeID"
                control={control}
                render={({ field }) => (
                  <Cleave
                    {...field}
                    pattern="[0-9]*" title="Only Numbers Allowed" required
                    placeholder="Enter Store ID"
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.storeID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}
                    <Col md='4' sm='12'>
                      <div className='mb-1'>
                        <Label className='form-label' for='storeID'>
                          Store Name <spam style={{ color: 'red' }}>*</spam>
                        </Label>
                        <Controller
                          id="storeID"
                          control={control}
                          name="storeID"
                          render={({ field }) => (
                            <Select
                              required
                              isClearable
                              options={storeOptions}
                              classNamePrefix="select"
                              theme={selectThemeColors}
                              className={classnames("react-select", {
                                "is-invalid": data !== null && data.storeID === null,
                              })}
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </Col>

                    <Col md='4' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="IP">
                          IP
                        </Label>
                        <InputGroup className="input-group-merge">
                          <InputGroupText
                            className={classnames({
                              "is-invalid": data !== null && data.IsActive === null,
                            })}
                          ></InputGroupText>
                          <Controller
                            id="IP"
                            name="IP"
                            control={control}
                            placeholder="IP"
                            render={({ field }) => (
                              <Cleave
                                placeholder="Enter IP Details"
                                required
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid": data !== null && data.IP === null,
                                })}
                              />
                            )}
                          />
                        </InputGroup>
                      </div>
                    </Col>

                    <Col md='4' sm='12'>
                      <div className='mb-1'>
                        <Label className='form-label' for='menuHead'>
                          Menu head <spam style={{ color: 'red' }}>*</spam>
                        </Label>
                        <Controller
                          id="menuHead"
                          control={control}
                          name="menuHead"
                          render={({ field }) => (
                            <Select
                              required
                              isClearable
                              options={menuHeadoptions}
                              classNamePrefix="select"
                              theme={selectThemeColors}
                              className={classnames("react-select", {
                                "is-invalid": data !== null && data.menuHead === null,
                              })}
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    <Col md='4' sm='12'>
                      <div className='mb-1'>
                        <Label className='form-label' for='menuGroup'>
                          Menu Group <spam style={{ color: 'red' }}>*</spam>
                        </Label>
                        <Controller
                          id="menuGroup"
                          control={control}
                          name="menuGroup"
                          render={({ field }) => (
                            <Select
                              required
                              isClearable
                              options={menuGroupOptions}
                              classNamePrefix="select"
                              theme={selectThemeColors}
                              className={classnames("react-select", {
                                "is-invalid": data !== null && data.menuGroup === null,
                              })}
                              {...field}
                            />
                          )}
                        />
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

     <Row>
  <div>
    <div className="d-flex align-items-center justify-content-between">
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
      <Col sm="auto">
        <div className="inline-spacing" align="right" style={{ margin: '2px 0' }}>
          <Button.Ripple
            style={{ 'margin-right': '10px', 'margin-bottom': '10px' }}
            disabled={updatedrowData.length === 0}
            color="primary"
            size="sm"
            onClick={ReloadTable}
          >
            Preview Changes
          </Button.Ripple>
          {showsavebtn && (
            <Button.Ripple
              style={{ 'margin-right': '10px', 'margin-bottom': '10px' }}
              color="primary"
              size="sm"
              onClick={handlePreviewChanges}
            >
              Save
            </Button.Ripple>
          )}
          {showPrevbtn && (
            <Button.Ripple
              style={{ 'margin-right': '10px', 'margin-bottom': '10px' }}
              color="primary"
              size="sm"
              onClick={handlePrevbtn}
            >
              Back
            </Button.Ripple>
          )}
        </div>
      </Col>
    </div>
  </div>
</Row>

      <Card>
        <div className="ag-theme-alpine" style={{ height: 520 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            onCellValueChanged={onCellValueChanged}
            paginationAutoPageSize='true'
            paginationPageSize='10'
            pagination='true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            gridOptions={gridOptions}
          // onGridReady={onGridReady}

          />
        </div>
      </Card>
      {/* <App/> */}
    </div>
  );
};

export default ValidationThirdPartyComponents;
