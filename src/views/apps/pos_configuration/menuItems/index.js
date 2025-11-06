// ** React Imports
import { useState } from "react";
import 'ag-grid-enterprise';
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
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useRef, useEffect, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from "react-router-dom";

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
  status: "",
  FoodType: "",
  imgURL: "",
  ItemName: "",
  ItemDescription: "",
  calorieCount: "",
  BasePrice: "",
  TaxGroup: "",
  ApplicableSession: ""
};

let storeOptions = []
fetchx(API_URL + '/getStoreList?hotelID=1')
  .then(result => result.json())
  .then(rowData => {
    storeOptions = rowData['data']
    //  sessionStorage.setItem('storeOptions', JSON.stringify(storeOptions));

  })


let menuGroupOptions = []
fetchx(API_URL + '/getmenugroup?hotelID=1')
  .then(result => result.json())
  .then(rowData => {
    const responseData = rowData['data'];
    if (Array.isArray(responseData)) {
      menuGroupOptions = responseData.map(item => ({
        value: item.groupName,
        label: item.groupName,
      }));
    }
  })


let id = 1;
const ValidationThirdPartyComponents = () => {
  const [rowData, setRowData] = useState();
  // ** State
  const [open, setOpen] = useState('0')
  const [selectedStatus, setselectedStatus] = useState('Active')
  const [selectedDiscount, setselectedDiscount] = useState('Yes')

  let navigate = useNavigate();


  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'id', suppressSizeToFit: true, maxWidth: 160, },
    { headerName: 'Store ID', field: 'storeID', suppressSizeToFit: true },
    { headerName: 'Store Name', field: 'restaurantName', suppressSizeToFit: true },
    { headerName: 'menugroup', field: 'menugroup' },
    { headerName: 'status', field: 'status' },
    { headerName: 'foodType', field: 'foodType' },
    { headerName: 'itemName', field: 'itemName', wrapText: true,autoHeight: true},
    { headerName: 'itemDescription', field: 'itemDescription' },
    // { headerName: 'calorieCount', field: 'calorieCount' },
    { headerName: 'basePrice', field: 'basePrice' },
    { headerName: 'taxGroup', field: 'taxGroup' },
    // { headerName: 'applicableSessions', field: 'applicableSessions' },




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
  }, []);

  useEffect(() => {
    fetchx(API_URL + '/getmenuitem?hotelID=' + id)
      .then(result => result.json())
      .then(rowData => {
        setRowData(rowData['data'])
        console.log(rowData['data'])
      })
  }, []);

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log(data)
    setData(data);
    if (
      data.storeID !== null &&
      data.menuGroup !== null &&
      data.status !== null &&
      data.FoodType !== null &&
      data.imgURL !== null &&
      data.ItemName !== null &&
      data.ItemDescription !== null &&
      data.calorieCount !== null &&
      data.BasePrice !== null &&
      data.TaxGroup !== null &&
      data.ApplicableSession !== null

    ) 
    {
      const discAllowedValue = selectedDiscount === 'Yes' ? 1 : 0;

      let menuitem = JSON.stringify({
        "hotelID": 1,
        "storeID": data.storeID.value,
        "menuGroup": data.menuGroup.value,
        "status": selectedStatus,
        "foodType": data.FoodType.value,
        "imgURL": "",
        "itemName": data.ItemName,
        "itemDescription": data.ItemDescription,
        "calorieCount": 0,
        "basePrice": data.BasePrice,
        "taxGroup":18,
        "discAllowed":discAllowedValue
      });
      console.log(menuitem);
      let res = fetchx(API_URL + '/addmenuitem', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: menuitem,
      }).then((res) => {
        if (res['status'] == 200) {

          const swalInstance = MySwal.fire({
            text: "Menu Items Added Successfully",
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
            fetchx(API_URL+'/getmenuitem?hotelID=1')
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
      ItemDescription: "",
      BasePrice: "",
      TaxGroup: "",
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
  const handleDropdownChangeDisc = (selectedOption) => {
    setselectedDiscount(selectedOption.value);
   
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
                    <Col md='6' sm='12'>
                      <div className='mb-1'>
                        <Label className='form-label' for='storeID'>
                          Store Name
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
                    {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="menuGroup">
            Menu Group
            </Label>
            <InputGroup className="input-group-merge">
              <Controller
                id="menuGroup"
                name="menuGroup"
                control={control}
                placeholder="menuGroup"
                render={({ field }) => (
                  <Cleave
                  pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
                  placeholder="Enter menuGroup"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.menuGroup === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}
                    <Col md='6' sm='12'>
                      <div className='mb-1'>
                        <Label className='form-label' for='menuGroup'>
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
                      <div className="mb-1">
                        <Label className="form-label" for="FoodType">
                          FoodType
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
                    {/* <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="imgURL">
                          Image
                        </Label>
                        <InputGroup className="input-group-merge">
                          <InputGroupText
                            className={classnames({
                              "is-invalid": data !== null && data.IsActive === null,
                            })}
                          ></InputGroupText>
                          <Controller
                            id="imgURL"
                            name="imgURL"
                            control={control}
                            placeholder="imgURL"
                            render={({ field }) => (
                              <Cleave
                                type="text"
                                pattern="[aA-zZ]*" title="Only Alphabets Allowed"
                                placeholder="Enter Name"
                                // required
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid": data !== null && data.Name === null,
                                })}
                              />
                            )}
                          />
                        </InputGroup>
                      </div>
                    </Col> */}


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
                              required

                              placeholder="ItemName"
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
                    <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="ItemDescription">
                          Item Description
                        </Label>

                        <Controller
                          id="ItemDescription"
                          name="ItemDescription"
                          control={control}

                          render={({ field }) => (
                            <Input
                              // pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
                              // required
                              placeholder="ItemDescription"
                              {...field}
                              className={classnames("form-control", {
                                "is-invalid":
                                  data !== null && (data.ItemDescription === null || !data.ItemDescription.length)
                              })}
                            />
                          )}
                        />
                      </div>
                    </Col>

                    {/* <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="calorieCount">
                          Calorie Count
                        </Label>
                        <InputGroup className="input-group-merge">
                         
                          <Controller
                            id="calorieCount"
                            name="calorieCount"
                            control={control}

                            render={({ field }) => (
                              <Cleave
                                // pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
                                pattern="[0-9]*" title="Only Numbers Allowed" required
                                // required
                                placeholder="calorieCount"
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid":
                                    data !== null && (data.calorieCount === null || !data.calorieCount.length)
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
                                pattern="[0-9]*" title="Only Numbers Allowed" required
                                placeholder="Enter base price"
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

                    {/* <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="TaxGroup">
                          Tax Group
                        </Label>
                        <InputGroup className="input-group-merge">

                          <Controller
                            id="TaxGroup"
                            name="TaxGroup"
                            control={control}

                            render={({ field }) => (
                              <Cleave
                                // pattern="[aA-zZ]*" title="Only Alphabets Allowed" required
                                pattern="[0-9]*" title="Only Numbers Allowed" required

                                placeholder="Tax Group"
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid":
                                    data !== null && (data.TaxGroup === null || !data.TaxGroup.length)
                                })}
                              />
                            )}
                          />
                        </InputGroup>
                      </div>
                    </Col> */}


                    {/* <Col md='6' sm='12' className='mb-1'>
                      <div className="mb-1">
                        <Label className="form-label" for="ApplicableSession">
                          Applicable Session
                        </Label>
                        <InputGroup className="input-group-merge">
                         
                          <Controller
                            id="ApplicableSession"
                            name="ApplicableSession"
                            control={control}
                            render={({ field }) => (
                              <Cleave
                                pattern="[0-9]*" title="Only Numbers Allowed"
                                // required
                                placeholder="Applicable Session"
                                {...field}
                                className={classnames("form-control", {
                                  "is-invalid":
                                    data !== null && (data.ApplicableSession === null || !data.ApplicableSession.length)
                                })}
                              />
                            )}
                          />
                        </InputGroup>
                      </div>
                    </Col> */}

                    <Col md='6' sm='12'>
                      <div className='mb-1'>
                        <Label className='form-label' for='discAllowed'>
                          Discount Allowed
                        </Label>
                        <Controller
                          id='discAllowed'
                          control={control}
                          name='discAllowed'
                          render={({ field }) => (
                            <Select
                            required
                              isClearable
                              options={discountAllowedOptions}
                              classNamePrefix='select'
                              theme={selectThemeColors}
                              className={classnames('react-select', { 'is-invalid': data !== null && data.ReactSelect === null })}
                              {...field}
                              value={discountAllowedOptions.find(option => option.label === selectedDiscount)}
                              onChange={handleDropdownChangeDisc}
                            />
                          )}
                        />
                      </div>
                    </Col>

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
