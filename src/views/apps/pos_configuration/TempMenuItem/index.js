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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
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

import { useRef, useEffect, useMemo, useCallback} from 'react';
// import { Today } from "@mui/icons-material";

// const FoodTypeOptions = [
//   { value: "Food", label: "Food" },
//   { value: "SoftDrinks", label: "SoftDrinks" },
//   { value: "Liquor", label: "Liquor" },
//   { value: "Smoke", label: "Smoke" },
//   { value: "Others", label: "Others" },


// ];
let FoodTypeOptions = []
fetchx(API_URL + '/getMenuHeaderDetails?hotelID=1')
  .then(result => result.json())
  .then(rowData => {
    const responseData = rowData['data'];
    if (Array.isArray(responseData)) {
      FoodTypeOptions = responseData.map(item => ({
        value:item.category,
        label: item.category,
      }));
    }
  })
let menuGroupOptions = []
fetchx(API_URL+'/getmenugroupOptions?hotelID=1&storeID=1')
.then(result => result.json())
.then(rowData => {
 // menuGroupOptions.push(rowData['data'])
 menuGroupOptions = rowData['data']
console.log(menuGroupOptions)
})
 let storeIDOptions =[]
 fetchx(API_URL+'/getStoreList?hotelID=1')
 .then(result => result.json())
 .then(rowData => {
 storeIDOptions = rowData['data']
 console.log(storeIDOptions)
})
const isAllowanceOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },
];

const discountAllowedOptions = [
  { value: "1", label: "Yes" },
  { value: "0", label: "No" },

];

const activeoptions = [
  { value: "Active", label: "Active" },
  { value: "InActive", label: "InActive" },
];

const statusOptions = [
  { value: 'Enable', label: 'Enable' },
  { value: 'Disable', label: 'Disable' },
]

const defaultValues = {
  storeID: "",
  menuGroup: "",
  FoodType: "",
  ItemName: "",
  ItemID: "",
  BasePrice: "",
  addedUser: "",
  EffectiveDate: ""
};


let id = 1;
const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();
  const [SelectedValue, setSelectedValue] = useState(null)
  const [selectedStatus, setselectedStatus] = useState('Active')
  const [today, setToday] = useState('');

  let navigate = useNavigate();

  // ** State
  const [open, setOpen] = useState('0')

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'hotelID', field: 'hotelID', suppressSizeToFit: true, maxWidth: 160, },
    { headerName: 'Store ID', field: 'storeID', suppressSizeToFit: true },
    { headerName: 'Store Name', field: 'restaurantName', suppressSizeToFit: true },
    { headerName: 'Menu Group', field: 'menugroup' },
    { headerName: 'Tax Group', field: 'taxGroup' },
    { headerName: 'Food Type', field: 'foodType' },
    { headerName: 'Item Name', field: 'itemName' },
    { headerName: 'Item ID', field: 'itemID' },
    { headerName: 'Base Price', field: 'basePrice' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Steward Name', field: 'stewardName' },
    { headerName: 'Effective Date', field: 'effectiveDate' }
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
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetchx(API_URL + '/getTempMenuItems')
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
      })
  }, []);

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
} = useForm({ defaultValues });

  useEffect(() => {
    // Fetch today's date from your API
    fetchx(API_URL + "/getBusinessDatePOS", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hotelID: 1 })
    })
      .then((res) => res.json())
      .then(postres => {
        const businessDate = postres.data[0].businessDate;
        setToday(businessDate);

      })
      .catch(error => {
        console.error("Error fetching business date:", error);
        // Handle the error as needed
      });
  }, []);

  // const today = Moment().format('YYYY-MM-DD');
  const dateOption = {
    minDate: today,
    allowInput: true
  };
  const handleSelectChange = (event) => {
    if (event) {
      setSelectedValue(event.value)
      fetchx(API_URL + '/getmenugroupOptions?hotelID=1&storeID=' + event.value)
        .then(result => result.json())
        .then(rowData => {
          menuGroupOptions = rowData['data']
        })

    }
  }

  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    if (
      data.menuGroup !== null &&
      data.FoodType !== null &&
      data.ItemName !== null &&
      data.status !== null &&
      // data.ItemID!==null&&
      data.BasePrice !== null &&
      // data.addedUser!==null&&
      data.EffectiveDate !== null

    ) {
      let menuitem = JSON.stringify({
        "hotelID": 1,
        "storeID": SelectedValue,
        "menuGroup": data.menuGroup.value,
        "foodType": data.FoodType.value,
        "itemName": data.ItemName,
        // "itemID": data.ItemID,
        "basePrice": data.BasePrice,
        // "addedUser": data.addedUser,
        "effectiveDate": Moment(String(new Date(data.EffectiveDate))).format('YYYY-MM-DD'),
        "status": selectedStatus, 
        "itemStatus":"New"
      });
      // console.log(menuitem);
      let res = fetchx(API_URL + "/addtempmenuitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: menuitem,
      })
      .then(result => result.json())
      .then((res) => {
    
        if (res['statuscode'] == 200) {

          const swalInstance = MySwal.fire({
            text: res['message'],
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
            fetchx(API_URL+'/getTempMenuItems?hotelID=1')
            .then(result => result.json())
            .then(rowData => {setRowData(rowData['data'])
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
      menuGroup: "",
      status: "",
      FoodType: "",
      imgURL: "",
      ItemName: "",
      ItemID: "",
      BasePrice: "",
      addedUser: "",
      ApplicableSession: ""



    });
  };
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);
  const handleDropdownChangeStatus = (selectedOption) => {
    setselectedStatus(selectedOption.value);
   
  };
  return (
    <div>
      <Card>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId='1'>Add Menu Items</AccordionHeader>
            <AccordionBody accordionId='1'>
              {/* <CardHeader>
        <CardTitle tag="h4">Menu Items</CardTitle>
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

                    <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="storeID">
                          Store Name
                        </Label>
                        <Controller
                          id="storeID"
                          control={control}
                          name="storeID"
                          render={({ field }) => (
                            // <Select
                            // required
                            // isClearable
                            // options={storeIDOptions}
                            // classNamePrefix="select"
                            // theme={selectThemeColors}
                            // className={classnames("react-select", {
                            //     "is-invalid": data !== null && data.storeID === null,
                            // })}
                            // {...field}

                            // />

                            <Select
                              isClearable
                              options={storeIDOptions}
                              classNamePrefix='select'
                              onChange={handleSelectChange}
                              theme={selectThemeColors}
                              className={classnames('react-select', { 'is-invalid': data !== null && data.storeID === null })}
                            />)}
                        />
                      </div>
                    </Col>

                    <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="menuGroup">
                          Menu Group
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

                    <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="FoodType">
                          Food Type
                        </Label>
                        <Controller
                          id="FoodType"
                          control={control}
                          name="FoodType"
                          render={({ field }) => (
                            <Select
                              required
                              isClearable
                              options={FoodTypeOptions}
                              classNamePrefix="select"
                              theme={selectThemeColors}
                              className={classnames("react-select", {
                                "is-invalid": data !== null && data.FoodType === null,
                              })}
                              {...field}

                            />
                          )}
                        />
                      </div>
                    </Col>


                    <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="ItemName">
                          Item Name
                        </Label>

                        <Controller
                          id="ItemName"
                          name="ItemName"
                          control={control}

                          render={({ field }) => (
                            <Input
                              // pattern="[aA-zZ]*" title="Only Alphabets Allowed"
                              placeholder="Enter ItemName"
                              {...field}
                              className={classnames("form-control", {
                                "is-invalid":
                                  data !== null && (data.ItemName === null || !data.ItemName.length)
                              })}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="ItemID">
            Item ID
            </Label>
            <InputGroup className="input-group-merge">
              <Controller
                id="ItemID"
                name="ItemID"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Alphabets Allowed" required
                  placeholder="Enter Item ID"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.ItemID === null || !data.ItemID.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}


                    <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="BasePrice">
                          Base Price
                        </Label>
                        <InputGroup className="input-group-merge">
                          {/* <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.waitListSequence === null || !data.waitListSequence.length)
                })}
              ></InputGroupText> */}
                          <Controller
                            id="BasePrice"
                            name="BasePrice"
                            control={control}
                            render={({ field }) => (
                              <Cleave
                                pattern="[0-9].*" title="Only Numbers Allowed" required
                                placeholder="Enter Base Price"
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid":
                                    data !== null && (data.BasePrice === null || !data.BasePrice.length)
                                })}
                              />
                            )}
                          />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md='6' sm='12'>
                      <div className='mb-1'>
                        <Label className='form-label' for='status'>
                          Status
                        </Label>
                        <Controller
                          id='status'
                          control={control}
                          name='status'
                          render={({ field }) => (
                            <Select
                            required

                            // defaultValue={'Enable'}
                              isClearable
                              options={activeoptions}
                              classNamePrefix='select'
                              theme={selectThemeColors}
                              className={classnames('react-select', { 'is-invalid': data !== null && data.ReactSelect === null })}
                              {...field}
                              value={activeoptions.find(option => option.value === selectedStatus)}
                              onChange={handleDropdownChangeStatus}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    <Col md='6' sm='12' className='mb-1'>

                      <div className='mb-1'>
                        <Label className='form-label' for='EffectiveDate'>
                          Effective Date
                        </Label>
                        <Controller
                          control={control}
                          id='EffectiveDate'
                          name='EffectiveDate'
                          render={({ field }) => (
                            <Flatpickr
                              {...field}
                              required
                              placeholder="Pick the effective date"
                              options={dateOption}
                              className={classnames('form-control', {
                                'is-invalid': data !== null && (data.EffectiveDate === null || data.EffectiveDate === '')
                              })}
                            />
                          )}
                        />
                      </div>
                    </Col>
                    {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="addedUser">
            Created By
            </Label>
            <InputGroup className="input-group-merge">
             
              <Controller
                id="addedUser"
                name="addedUser"
                control={control}
                
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ]*" title="Only Alphabets Allowed" required
                  placeholder="Enter created by"
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.addedUser === null || !data.addedUser.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}



                    <div className="d-flex">
                      <Button className="me-1" color="primary" FoodType="submit" >
                        Submit
                      </Button>
                      <Button
                        outline
                        color="secondary"
                        FoodType="reset"
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
        <div className="ag-theme-alpine" style={{ height: 520 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
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
