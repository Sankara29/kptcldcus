


import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';

import {useState, useRef, useEffect, useMemo, useCallback} from 'react';

function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'name',field: 'name',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Email ',field: 'email',suppressSizeToFit: true},
    {headerName: 'Phone Number ',field: 'phoneNumber',suppressSizeToFit: true},
    {headerName: 'Address ',field: 'address',suppressSizeToFit: true},
    {headerName: 'City ',field: 'city',suppressSizeToFit: true},
    {headerName: 'State ',field: 'state',suppressSizeToFit: true},
    {headerName: 'postalCode ',field: 'postalCode',suppressSizeToFit: true},
    {headerName: 'Country ',field: 'country',suppressSizeToFit: true},
    {headerName: 'Logo ',field: 'logo',suppressSizeToFit: true},
    {headerName: 'fax ',field: 'Fax',suppressSizeToFit: true},
    {headerName: 'Currency ',field: 'currency',suppressSizeToFit: true},
    {headerName: 'hotelGroup ',field: 'hotelGroup',suppressSizeToFit: true},
    
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
    fetchx(API_URL + '/HotelDetails?name=abc')
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
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