import { useState } from "react";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import API_URL from "../../../../config";
import {Input,Form,Row,Col,Label,Button,Modal,ModalHeader,ModalBody,} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";

// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

import { useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const RateCodeRoomRates = (data1) => {
    // console.log(data1.data1)
  let navigate = useNavigate();
  const [Rate2, setRate2] = useState(); // fetchx(API_URL + `/getRoomtypes?hotelID=1`)
  //   .then((result) => result.json())
  //   .then((rowData) => setRowData(rowData["data"]));
  // console.log(rowData);
  const [rowData, setRowData] = useState();
  const gridRef = useRef();
  const {setError,formState: { errors },} = useForm();
  const navigatepage = () => {navigate("");};
  const [completeData, setCompleteData] = useState([]);
  const [rowData2, setRowData2] = useState();
  const [rateCodes, setRateCode] = useState();
  const gridRef1 = useRef(null);
  const [transactionData, setTransactionData] = useState([]);
  const { handleSubmit, control } = useForm();
  const defaultColDef = useMemo(() => ({ sortable: true, filter: true, filterParams: {dbuttons: ["apply", "reset"], }, }));

  const onFilterTextBoxChanged = () => {
    const filterValue = document.getElementById("filter-text-box").value;
    //  console.log('Filter value:', filterValue); // Add this line
    if (gridRef1.current && gridRef1.current.api) {
      gridRef1.current.api.setQuickFilter(filterValue);
    }
  };

  //TransactionCode
  const [columnDefs2, setColumnDefs2] = useState([
    {
      headerName: "Rate Code",
      field: "rateCode",
      suppressSizeToFit: true,
      maxWidth: 200,
       },
    {
      headerName: "Description",
      field: "description",
      suppressSizeToFit: true,
      maxWidth: 240,
    },
    {
      headerName: "Begin Date",
      field: "beginSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
       },
    {
      headerName: "SellDate",
      field: "endSellDate",
      suppressSizeToFit: true,
      maxWidth: 140,
    },
    {
      headerName: "Action",
      maxWidth: 140,
      cellRenderer: () => {
        return (
          <Button color="primary" onClick={cellClickedListener1}>
            Select
          </Button>
        );
      },
    },
  ]);

  //Modal close function
  const cellClickedListener1 = (event) => {
    setTransactionData(event["data"]);
    setRateCode(false);
    fetchx(API_URL + `/getAllRoomtypeDataForRateCode?hotelID=1&rateCodeID=${data1.data1["id"]}`)
    .then((result) => result.json())
    .then((rowData) => setRowData(rowData["data"]));
    // Confirm1()
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Room Type ",
      field: "roomType",
      suppressSizeToFit: true,
      maxWidth: 130,
    },
    {
      headerName: "One Adult Price",
      field: "oneAdultPrice",
      maxWidth: 160,
      editable: true,
    },
    {
      headerName: "Extra Adult Price ",
      field: "extraAdultPrice",
      maxWidth: 180,
      editable: true,
    },
    {
      headerName: "Extra Child Price",
      field: "extraChildPrice",
      maxWidth: 180,
      editable: true,
    },
    // {
    //   headerName: 'Action',
    //   field: 'numAvlRooms',
    //   suppressSizeToFit: true,
    //   maxWidth: 118,
    //   cellRendererFramework: (params) => <Button color='primary' onClick={() => actionButton1(params)}> Activate </Button>
    // },
    // {
    //   headerName: 'Action',
    //   field: 'numAvlRooms',
    //   suppressSizeToFit: true,
    //   maxWidth: 155,
    //   cellRendererFramework: (show1) => <Button color='primary' onClick={() => actionButton2(show1)}> Deactivate </Button>
    // },
  ]);

  useEffect(() => {
    // console.log(data1.data1)
    fetchx(API_URL + "/getroomtyperates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelID: "1",
      }),
    })
      .then((result) => result.json())
      .then((rowData) => {
        setRate2(rowData["data"]);
      })
      .catch((error) => {});
    // fetchx(API_URL + `/getRoomtypes?hotelID=1`)
    //   .then((result) => result.json())
    //   .then((rowData) => setRowData(rowData["data"]));
    // console.log(rowData);
    fetchx(API_URL + `/getAllRoomtypeDataForRateCode?hotelID=1&rateCodeID=${data1.data1.id}`)
    .then((result) => result.json())
    .then((rowData) => setRowData(rowData["data"]));

    fetchx(API_URL + "/getRateCode?hotelID=1")
      .then((result) => result.json())
      .then((rowData) => setRowData2(rowData["data"]));
  }, [data1.data1]);

  const onCellValueChanged = (paramsRatesMap) => {
  // console.log("rowData");
    const gridApi = gridRef.current.api;
    const rowData = [];
    gridApi.forEachNode((node) => {
      rowData.push(node.data);
    });
    // console.log(JSON.stringify(rowData, null, 2));
  };
  
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
    setCompleteData(event.data);}, []);


  const dataArray = [];
  const onSubmit = (data) => {
    console.log(data1.data1.id)
    console.log("rowData",rowData)
    {
      let createrateCode = JSON.stringify({
        rateCodeID: data1.data1.id,
        accData: rowData,
        isActive: 1,
        hotelID: 1,
      });
      let res = fetchx(API_URL +"/updateRateCodeRoomRateDetails", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: createrateCode,
      })
        .then((data) => data.json())
        .then((res) => {
          // console.log(rowData);
          // console.log(res);
          // console.log(createrateCode);
          navigate("")
        });
    }
  }; 
  
  return (
    <div>
      <div>
        <Modal isOpen={rateCodes} toggle={() => setRateCode(!rateCodes)} className="modal-lg">
          <ModalHeader className="modal-lg" toggle={() => setRateCode(!rateCodes)} >
            View Transaction Codes
          </ModalHeader>
          <ModalBody className="pb-3 px-sm-1 mx-20">
            <div>
              <Row className="mb-1">
                <Col md="3" sm="12" className="me-1">
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
              </Row>
              <br/>
              <Row>
                <div className="ag-theme-alpine" style={{ height: 540 }}>
                  <AgGridReact
                    ref={gridRef}
                    rowData={rowData2}
                    columnDefs={columnDefs2}
                    animateRows={true}
                    rowSelection="multiple"
                    onCellClicked={cellClickedListener1}
                    onCellValueChanged={onCellValueChanged}                   
                    paginationPageSize="10"
                    pagination="true"
                    singleClickEdit="true"
                    defaultColDef={defaultColDef}
                    headerColor="ddw-primary"
                  />
                </div>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {console.log(transactionData)}
        {/* {transactionData && (
          <Col md="3" sm="12">
            <div className="mb-1">
              <Label className="form-label" for="rateCode">
                Rate Code <spam style={{ color: "red" }}>*</spam>
              </Label>
              <Controller
                control={control}
                id="rateCode"
                name="rateCode"
                render={({ field }) => (
                  <Input
                    onClick={() =>{ 
                        setRateCode(!rateCodes) 
                    }}                    
                    placeholder="Rate Code"
                    invalid={errors.rateCode && true}                                                                                                                                             {...field}
                    value={transactionData["rateCode"]}
                  />
                )}
              />
            </div>
          </Col>
        )} */}

        <div className="ag-theme-alpine" style={{ height: 350 }}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            rowSelection="multiple"
            onCellClicked={cellClickedListener}
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
          />
        </div>
        <br />
        <Button className="me-1" color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default RateCodeRoomRates;