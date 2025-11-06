import {AgGridReact} from 'ag-grid-react';

import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';// import './Assettable.css';
import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
const hotelID='1'
const date='2023-02-02'
const roomID='30'
function App() {

  const [rowData, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field: 'id',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Room ID',field: 'roomID'},
    {headerName: 'Number of Avalable Rooms',field: 'numAvlRooms'},
    {headerName: 'Number of Sell Control Rooms',field: 'numSellCtrlRooms'},
    {headerName: 'Number of OOD Rooms',field: 'numOodRooms'},
    {headerName: 'Number of Overbooked Rooms',field: 'numOverbookedRooms'},
    {headerName: 'Sell Limit',field: 'sellLimit'},
    {headerName: 'Date',field: 'date'},
    {headerName: 'Room Type ID',field: 'roomTypeID'},

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
    fetchx(API_URL + '/getroominventory?hotelID='+hotelID+'&date='+date+'&roomID='+roomID)
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