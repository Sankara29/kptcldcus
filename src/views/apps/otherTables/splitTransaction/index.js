// ** React Imports
import { useState } from "react";
import axios from "axios";
// ** Third Party Components
import Select from "react-select";
import toast from "react-hot-toast";
import classnames from "classnames";
import Cleave from "cleave.js/react";
import { Check } from "react-feather";
import Flatpickr from "react-flatpickr";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm, Controller } from "react-hook-form";
import App from "./splitTransactionDataTable";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {Input,Card,Form,Label,Button,CardBody,CardTitle,CardHeader,InputGroup,InputGroupText,Row,Col
} from "reactstrap";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/pages/page-form-validation.scss";
// AG Grid
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import './Assettable.css';
import { useRef, useEffect, useMemo, useCallback} from 'react';
const id='1';


const splitByOptions = [
  { value: "Amount", label: "Amount" },
];



const defaultValues = {
  // hotelID: "",
      transaction: "",
      splitBy: null,
      amount: "",
      percentage: "",
      splitAmount: "",
      splitAmountWithTax: "",
}

const SplitTransaction = () => {

  // AG Grid
  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Transaction ID',field: 'transaction'},
    {headerName: 'Split-By',field: 'splitBy'},
    {headerName: 'Amount',field: 'amount'},
    {headerName: 'Percentage',field: 'percentage'},
    {headerName: 'Split Amount',field: 'splitAmount'},
    {headerName: 'Split Amount with Tax',field: 'splitAmountWithTax'},

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
    console.log('cellClicked', event);
  }, []);

  useEffect(() => {
    fetchx(API_URL + '/getsplittransaction?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  }, []); 


  // ** State
  const [data, setData] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control ,formState: { errors }
} = useForm({ defaultValues });

  const onSubmit = (data) => {
    setData(data);
    console.log(data)
    if (
      // data.hotelID !== null &&
      data.transaction !== null &&
      data.splitBy !== null &&
      data.amount!==null &&
      data.percentage!==null &&
      data.splitAmount !== null &&
      data.splitAmountWithTax !== null
    ) {
      console.log(data);
      let createasset = JSON.stringify({
        // "hotelID": data.hotelID,
        "transaction": data.transaction,
        "splitBy": data.splitBy.value,
        "amount": data.amount,
        "percentage": data.percentage,
        "splitAmount": data.splitAmount,
        "splitAmountWithTax": data.splitAmountWithTax,
        
      });
      console.log(createasset);
      let res = fetchx(API_URL + "/addsplittransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: createasset,
      }).then((res) => {
        console.log(res);
        if(res['status']==200){
          fetchx(API_URL + '/getsplittransaction?hotelID='+id)
          .then(result => result.json())
          .then(rowData => {setRowData(rowData['data'])
          console.log(rowData['data'])
        })
        }
      });
      toast(
        <div className="d-flex">
          <div className="me-1">
            <Avatar size="sm" color="success" icon={<Check size={12} />} />
          </div>
          <div className="d-flex flex-column">
            <h6>Form Submitted!</h6>
           <h4>Split-Transaction Added Successfull</h4>
          </div>
        </div>
      );
    }
  };

  const handleReset = () => {
    reset({
      // hotelID: "",
      transaction: "",
      splitBy: null,
      amount: "",
      percentage: "",
      splitAmount: "",
      splitAmountWithTax: "",
    });
  };

  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Split Transaction</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
          {/* <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="hotelID">
              Hotel ID
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && data.IsActive === null,
                })}
              ></InputGroupText>
              <Controller
                id="hotelID"
                name="hotelID"
                control={control}
                placeholder="hotel ID"
                render={({ field }) => (
                  <Cleave
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid": data !== null && data.hotelID === null,
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col> */}
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="transaction">
              Transaction
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.transaction === null || !data.transaction.length)
                })}
              ></InputGroupText>
              <Controller
                id="transaction"
                name="transaction"
                control={control}
                placeholder="transaction"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.transaction === null || !data.transaction.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="splitBy">
            Split-By
            </Label>
            <Controller
              id="splitBy"
              control={control}
              name="splitBy"
              render={({ field }) => (
                <Select
                required
                  isClearable
                  options={splitByOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.splitBy === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
          </Col>
         
         
          <Col md='6' sm='12' className='mb-1'>
          <div className="mb-1">
            <Label className="form-label" for="amount">
              Amount
            </Label>
            <InputGroup className="input-group-merge">
              <InputGroupText
                className={classnames({
                  "is-invalid": data !== null && (data.amount === null || !data.amount.length)
                })}
              ></InputGroupText>
              <Controller
                id="amount"
                name="amount"
                control={control}
                placeholder="maxAdultamounts"
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames("form-control", {
                      "is-invalid":
                        data !== null && (data.amount === null || !data.amount.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='percentage'>
              Percentage
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.percentage== null || !data.percentage.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='maxChildrepercentagen'
                name='percentage'
                control={control}
                placeholder='percentage'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.percentage === null || !data.percentage.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='splitAmount'>
            Split Amount 
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.splitAmount == null || !data.splitAmount.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='splitAmount'
                name='splitAmount'
                control={control}
                placeholder='splitAmount'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.splitAmount=== null || !data.splitAmount.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          <Col md='6' sm='12' className='mb-1'>
          <div className='mb-1'>
            <Label className='form-label' for='splitAmountWithTax'>
            Split Amount With Transaction
            </Label>
            <InputGroup className='input-group-merge'>
              <InputGroupText
                className={classnames({
                  'is-invalid': data !== null && (data.splitAmountWithTax == null || !data.splitAmountWithTax.length)
                })}
              >
              </InputGroupText>
              <Controller
                id='splitAmountWithTax'
                name='splitAmountWithTax'
                control={control}
                placeholder='splitAmountWithTax'
                render={({ field }) => (
                  <Cleave
                  pattern="[0-9]*" title="Only Numbers Allowed" required
                    {...field}
                    className={classnames('form-control', {
                      'is-invalid': data !== null && (data.splitAmountWithTax=== null || !data.splitAmountWithTax.length)
                    })}
                  />
                )}
              />
            </InputGroup>
          </div>
          </Col>
          
          <Col md='6' sm='12' className='mb-1'>
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
          </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
    <Card>
    <div className="ag-theme-alpine" style={{ height: 520}}>
        <AgGridReact 
            ref={gridRef}
            rowData={rowData} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            onCellClicked={cellClickedListener}
            // paginationAutoPageSize = 'true'
            paginationPageSize= '10'
            pagination = 'true'
            defaultColDef={defaultColDef}
            headerColor="ddw-primary"
            
            />
      </div>
    </Card>
    {/* <App/> */}
    </div>
  );
};

export default SplitTransaction;
