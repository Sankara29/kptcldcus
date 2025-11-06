import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
// import './Assettable.css';
import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
const id='1'
function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Folio',field: 'folio',suppressSizeToFit: true},
    {headerName: 'Transaction Code',field: 'transactionCode'},
    {headerName: 'Reservation',field: 'reservation'},
    {headerName: 'Guest Profile ID',field: 'guestProfileID'},
    {headerName: 'Company / Agent',field: 'companyOrAgent',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Base Amount',field: 'baseAmount',suppressSizeToFit: true},
    {headerName: 'Created At',field: 'createdAt'},
    {headerName: 'Created By',field: 'createdBy'},
    {headerName: 'Remarks',field: 'remarks'},
    {headerName: 'Room',field: 'room',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Package',field: 'package',suppressSizeToFit: true},
    {headerName: 'Rate Code',field: 'rateCode'},
    {headerName: 'Supplement',field: 'supplement'},
    {headerName: 'Date',field: 'date'},
    {headerName: 'Description',field: 'description',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Discount Amount',field: 'discountAmount',suppressSizeToFit: true},
    {headerName: 'Discount Percentage',field: 'discountPercentage'},
    {headerName: 'Transaction Type',field: 'transactionType'},
    {headerName: 'Is Deposit',field: 'isDeposit'},
    {headerName: 'Tax Percentage',field: 'taxPercentage',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'CGST',field: 'CGST',suppressSizeToFit: true},
    {headerName: 'SGST',field: 'SGST'},
    {headerName: 'total',field: 'total'},
    {headerName: 'serviceChargeORCommissionPercentage',field: 'serviceChargeORCommissionPercentage'},
    {headerName: 'Service Charge / Commission ',field: 'serviceChargeORCommission'},
    {headerName: 'Service Charge / Commission Tax Percentage',field: 'serviceChargeORCommissionTaxPercentage'},
    {headerName: 'Service Charge / Commission CGST',field: 'serviceChargeORCommissionCGST'},
    {headerName: 'Service Charge / Commission SGST',field: 'serviceChargeORCommissionSGST',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Total With Service Charge / Commission',field: 'totalWithServiceChargeORCommission',suppressSizeToFit: true},
    {headerName: 'is Service Charge Cancelled',field: 'isServiceChargeCancelled'},
    {headerName: 'Is Cancelled',field: 'isCancelled'},
    {headerName: 'POS Bill Number',field: 'POSBillNumber'},
    {headerName: 'POS Session',field: 'POSSession'},
    {headerName: 'Allowance Transaction',field: 'allowanceTransaction'},
    {headerName: 'Invoice',field: 'invoice',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Card',field: 'card',suppressSizeToFit: true},

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
    fetchx(API_URL + '/gettransaction?hotelID='+id)
    .then(result => result.json())
    .then(rowData => {setRowData(rowData['data'])
    console.log(rowData['data'])
    })
  }, []);    

  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      {/* <button onClick={buttonListener}>Push Me</button> */}
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
    </div>
  );
}

export default App;