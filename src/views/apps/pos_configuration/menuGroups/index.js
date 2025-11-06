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

// ** Custom Components
import Wizard from "@components/wizard";

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
  ModalBody,
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
  // // ** Steps
  import Editmenugroup from "./editmenugroup";


// let menuHeadoptions = [
//   fetchx(API_URL+"/getMenuHeaderDetails", {
//     method: "POST",
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       hotelID: 1,
//     })
//   })
//       .then(result => result.json())
//     .then(resp => {
//       console.log(resp['data'])
//       menuHeadoptions = resp['data']
//       console.log(menuHeadoptions['data'])
//     })


// ]

// Define menuHeadoptions as an empty array initially

// Fetch data from the API and populate menuHeadoptions
// fetchx(API_URL + "/getMenuHeaderDetails", {
//   method: "POST",
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     hotelID: 1,
//   })
// })
let menuHeadoptions = [];

fetchx(API_URL+'/getMenuHeaderDetails?hotelID=1')

  .then(result => result.json())
  .then(resp => {
    const responseData = resp['data'];
    // console.log(responseData)
    if (Array.isArray(responseData)) {
      menuHeadoptions = responseData.map(item => ({
        value: item.category,
        label: item.category,
      }));
    }
    // console.log(menuHeadoptions)
    sessionStorage.setItem('menuHeadoptions', JSON.stringify(menuHeadoptions));
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

// let storeOptions = []
// fetchx(API_URL+'/getrestaurantlist?hotelID=1')
//   .then(result => result.json())
//   .then(resp => {
//     const responseData1 = resp['data'];
//     console.log(responseData1)
//     if (Array.isArray(responseData1)) {
//       storeOptions = responseData1.map(item => ({
//         value: item.storeID,
//         label: item.restaurantName,
//       }));
//     }
//     sessionStorage.setItem('storeOptions', JSON.stringify(storeOptions));
//   })
//   .catch(error => {
//     console.error("Error fetching data:", error);
//   });

let storeOptions =[]
 fetchx(API_URL+'/getStoreList?hotelID=1')
 .then(result => result.json())
 .then(rowData => {
  storeOptions = rowData['data']
     sessionStorage.setItem('storeOptions', JSON.stringify(storeOptions));

//  console.log(storeOptions)
})






const defaultValues = {
  storeID: "",
  groupName: "",
  status: "",
};

const statusOptions = [
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
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 100,  },
    {headerName: 'Store ID',field: 'storeID',suppressSizeToFit: true,maxWidth: 100, },
    {headerName: 'Store Name',field: 'restaurantName',suppressSizeToFit: true,maxWidth: 150, },
    {headerName: 'Group name',field: 'groupName'},
    {headerName: 'Active item count',field:'activeItemCount'},
    {headerName: 'Menu head',field:'menuHead'},
    {headerName: 'Status',field: 'status'},
    {
      headerName: "Action",field: "numAvlRooms",suppressSizeToFit: true, maxWidth: 120,
      cellRendererFramework: (params) => (
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
    // console.log('cellClicked', event);
    setfilldata(event["data"]);
  }, []);
  let menuGroupOptions = []
  useEffect(() => {
    // console.log("Clicked")
    fetchx(API_URL+'/getmenugroup?hotelID=1')
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    // console.log(rowData['data'])
    // menuGroupOptions = rowData['data']
    // console.log(menuGroupOptions)
    // sessionStorage.setItem('menuGroupOptions', JSON.stringify(menuGroupOptions));
    const responseData = rowData['data'];
    // console.log(responseData)
    if (Array.isArray(responseData)) {
      menuGroupOptions = responseData.map(item => ({
        value: item.groupName,
        label: item.groupName,
      }));
    }
    sessionStorage.setItem('menuGroupOptions', JSON.stringify(menuGroupOptions));
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  // });

    })
  },[]);  

  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    // console.log(data)
    if (
      data.storeID !== null &&
      data.groupName !== null &&
      data.status.value !== null &&
     data.menuHead.value !== null

          ) {
      // console.log(data);
      let menugroup = JSON.stringify({
        "hotelID":1,
        "storeID": data.storeID.value,
        "groupName": data.groupName,
        // "status": data.status.value,
        "status": "Enable",

        "activeItemCount":10,
        "menuHead":data.menuHead.value,
      });
      // console.log(menugroup);
      let res = fetchx(API_URL+"/addmenugroup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: menugroup,
      }).then((res) => {
        // console.log(res);
    //     if(res['status']==200){
    //       // setTimeout(() => {  window.location.reload(true); }, 4000);          
    //       fetchx(API_URL+'/getmenugroup?hotelID=1')
    // .then(result => result.json())
    // .then(rowData => {setRowData(rowData['data'])
    // console.log(rowData['data'])
    // })
    //     }
    if(res['status']==200){

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
          fetchx(API_URL+'/getmenugroup?hotelID=1')
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          // console.log(rowData['data'])
          })
          }
        });
    // setTimeout(() => {  window.location.reload(true); }, 4000);          
   
      }
      });
     
    }
  };

  const handleReset = () => {
    reset({
      storeID: "",
      groupName: "",
      activeItemCount: "",
      menuHead:"",
      status:"",

    });
  };

  // const steps = [
  //   {
  //     id: "menugroup ",
  //     title: "Menu Group",
  //     subtitle: "Menu Group Details.",
  //     // icon: <FileText size={18} />,
  //     content: (
  //       <Editmenugroup data1={filldata} stepper={stepper} type="wizard-modern" />
  //     ),
  //   },
   
  // ];
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
        <AccordionHeader targetId='1'>Add Menu Groups</AccordionHeader>
        <AccordionBody accordionId='1'>
      {/* <CardHeader>
        <CardTitle tag="h4">Menu Groups</CardTitle>
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
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText>
              <Controller
                id="storeID"
                name="storeID"
                control={control}
                placeholder="storeID ID"
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
            Store Name <spam style={{color:'red'}}>*</spam>
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
            <Label className="form-label" for="groupName">
              MenuGroup Name
            </Label>
       
              <Controller
                id="groupName"
                name="groupName"
                control={control}
                placeholder="groupName"
                render={({ field }) => (
                  <Input
                  // pattern="[aA-zZ]*" title="Only Alphabets Allowed" 
                  placeholder="Enter groupName"
                  required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.groupName === null,
                    })}
                  />
                )}
              />
          </div>
          </Col>
          
          {/* <Col md='6' sm='12'>
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
                      isClearable
                      options={statusOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.ReactSelect === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </Col> */}
          
            <Col md='4' sm='12'>
          <div className='mb-1'>
            <Label className='form-label' for='menuHead'>
            Menu head <spam style={{color:'red'}}>*</spam>
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
    <Card>
        <div className="vertically-centered-modal">
          <Modal
            isOpen={showEdit}
            toggle={() => editButton(!showEdit)}
            // className="modal-lg"
            className="modal-xl"

          >
            <ModalHeader toggle={() => editButton(!showEdit)}>             
              {/* Welcome... */}
            </ModalHeader>
            <ModalBody>
              <Card>
              <Editmenugroup data1={filldata} >
                
              </Editmenugroup>
              </Card>
            </ModalBody>
           
          </Modal>
        </div>
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
    {/* <App/> */}
    </div>
  );
};

export default ValidationThirdPartyComponents;
