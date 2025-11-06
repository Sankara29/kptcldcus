
import {AgGridReact} from 'ag-grid-react';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
const id = '1';
function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'transactionCode',field: 'transactionCode'},
    {headerName: 'Description',field: 'description'},
    {headerName: 'groupID',field: 'groupID',suppressSizeToFit: true},
    {headerName: 'subGroupID',field: 'subGroupID'},
    {headerName: 'baseRate',field: 'baseRate'},
    {headerName: 'taxPercentage',field: 'taxPercentage',suppressSizeToFit: true},
    {headerName: 'discountAllowed',field: 'discountAllowed'},
    {headerName: 'isAllowance',field: 'isAllowance'},
    {headerName: 'isActive',field: 'isActive'},
    {headerName: 'allowanceCodeID',field: 'allowanceCodeID'},
    {headerName: 'isAllowance',field: 'isAllowance'},
    {headerName: 'isActive',field: 'isActive'},
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
    fetchx(API_URL + '/gettransactioncode?hotelID='+id)
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