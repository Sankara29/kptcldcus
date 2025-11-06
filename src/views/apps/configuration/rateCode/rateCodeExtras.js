// ** React Imports
import { useState } from "react";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import { Check } from "react-feather";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import Avatar from "@components/avatar";
import { selectThemeColors } from "@utils";
import {
  Card,
  Form,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from "react";
import API_URL from "../../../../config";
const id = "1";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

let extraName = [
  fetchx(API_URL + "/getExtraDescription?hotelID=1")
    .then((result) => result.json())
    .then((resp) => {
      extraName = resp["data"];
    }),
];

const defaultValues = {
  // hotelID: "",
  extraCode: "",
  description: "",
  // groupID: null,
  // subGroupID: null,
  remarks: "",
  type: null,
  percentage: "",
  amount: "",
  pieces: "",
  trips: "",
  isActive: null,
};

const Extras = (data1) => {
  //console.log(data1.data1);
  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  const [show1, actionButton1] = useState(false);
  const [completeData, setCompleteData] = useState([]);
  const[addExtras, setaddExtras] = useState(false);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Rate Code",
      field: "rateCode",
      suppressSizeToFit: true,
      maxWidth: 140,
    },
    {
      headerName: "Extra Code",
      field: "extraCode",
      suppressSizeToFit: true,
      maxWidth: 140,
    },
    {
      headerName: "Extra Description",
      field: "description",
      suppressSizeToFit: true,
      maxWidth: 240,
    },
    {headerName: "Action",field: "numAvlRooms", suppressSizeToFit: true, maxWidth: 140,cellRendererFramework: (params) => (
      <Button color="primary" onClick={() => {
         actionButton1(!show1); }}> Remove
      </Button>
    ),
    },
  ]);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    filterParams: {
      buttons: ["apply", "reset"],
    },
  }));

  const cellClickedListener = useCallback((event) => {
    //console.log("cellClicked", event);
    setCompleteData(event.data);
  }, []);

  useEffect(() => {
    fetchx(
      API_URL +
        `/getreservationRateCodeExtra?hotelID=1&rateCodeID=${data1.data1.id}`
    )
      .then((result) => result.json())
      .then((rowData) => {
        setRowData(rowData["data"]);
        //console.log(rowData["data"]);
      });
  }, []);
  let navigate = useNavigate();

  // ** State
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  const [extras, setExtras] = useState([]);

  const navigatepage = () => {
    navigate('');
};


  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    let createExtra = JSON.stringify({
      rateCodeID: data1.data1.id,
      extraID: data.extras,
      hotelID: 1,
    });
    let res = fetchx(API_URL + "/addRateCodeExtas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: createExtra,
    }).then((res) => {
      if (res["status"] == 200) {
        fetchx(API_URL +`/getreservationRateCodeExtra?hotelID=1&rateCodeID=${data1.data1.id}`)
          .then((result) => result.json())
          .then((rowData) => {
            setRowData(rowData["data"]);
            //console.log(rowData["data"]);
          });
          const swalInstance = MySwal.fire({
            text: 'RateCode Extras Mapped Successfully!',
            // icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              // navigate('');
              setaddExtras(false)
            }
          });   
      }
    });
  };

  const handleReset = () => {
    reset({
      // hotelID: "",
      extraCode: "",
      description: "",
      // groupID: null,
      // subGroupID: null,
      remarks: "",
      type: null,
      percentage: "",
      amount: "",
      pieces: "",
      trips: "",
      isActive: null,
    });
  };
// //console.log(completeData)
  function Confirm() {
    const updatedItem = JSON.stringify({
    id : completeData.id,
    hotelID:1,
    rateCodeID: completeData.rateCodeID,      
    extraID:completeData.extraID,
  });
     fetchx(API_URL + `/deleteRateCodeExtras`, {      
    method: "POST",
    body: updatedItem,
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      //console.log(res)
      fetchx(API_URL + `/getreservationRateCodeExtra?hotelID=1&rateCodeID=${data1.data1.id}`)
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData["data"]));
             const swalInstance = MySwal.fire({
        text: "Successfully Removed Mapped Extras!",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Close",
        allowOutsideClick: false,
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
      swalInstance.then((result) => {
        if (result.isConfirmed) {
          actionButton1(false);
        }
      });
    })
    .then((post) => {
              if (post.statusCode === 200) {
        setPopUp(false);
        fetchx(API_URL + `/getreservationRateCodeExtra?hotelID=1&rateCodeID=${data1.data1.id}`)
          .then((result) => result.json())
          .then((rowData) => {
          });
      }
    })
    .catch((err) => {
    });
}


  return (
    <div>
{/* Remove RateCode Accont Map */}
     <div>
        <Modal isOpen={show1} toggle={() => actionButton1(!show1)} className="modal-sm">
          <ModalHeader toggle={() => actionButton1(!show1)}>  Need To Check..</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>         
             {/* <RateCodeRoomRates ratecodeViewRates={rcViewRates}/>         */}
             <div>
              <b> "Do You Want to Remove Attached Extras ?";</b>
              <br></br>
              <br></br>
              <div className="d-flex">
                <Button
                  color="primary"
                  className="me-1"
                  // className="text-center"
                  onClick={() => Confirm()}
                >
                  Confirm
                </Button>
                <Button
                  color="danger"
                  className="me-1"
                  // className="text-center"
                  onClick={() => {
                    actionButton1(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </ModalBody>
         </Modal>
        </div> 


{/* Extra Form */}

      <div>
      <Modal isOpen={addExtras} toggle={() => setaddExtras(!addExtras) } className="modal-sm">
          <ModalHeader toggle={() => setaddExtras(!addExtras) }>  Add Extras..</ModalHeader>
          <ModalBody className='pb-3 px-sm-1 mx-20'>  
        <Card>
          <CardHeader>
            <CardTitle tag="h4">Rate Code Extras</CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md="12" sm="12">
                  <div className="mb-1">
                    <Label className="form-label" for="extras">
                      Select Extra
                    </Label>
                    <Controller
                      id="extras"
                      control={control}
                      name="extras"
                      render={({ field }) => (
                        <Select
                          isMulti
                          isClearable
                          options={extraName}
                          classNamePrefix="select"
                          theme={selectThemeColors}
                          className={classnames("react-select")}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </Col>

                <div align='end' className='buttons'>
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
        </ModalBody>
        </Modal>
      </div>

  {/* AG Grid */}
  <div>
  <Button className='me-1' color='primary' type='submit' onClick={() => {setaddExtras(!addExtras)}}>
           Add Extras
           </Button> 
  </div>
  <br/>
      <div>
        <Card>
          <div className="ag-theme-alpine" style={{ height: 240 }}>
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


      <br/>
      <div align='end' className='buttons'>
      {/* <Button className='me-1' color='primary' type='submit' onClick={() => {setaddExtras(!addExtras)}}>
           Add Extras
           </Button>  */}
      <Button color="primary" className="me-1" type="button" onClick={navigatepage}>
            Exit
        </Button>
        </div>
    </div>
  );
};

export default Extras;
