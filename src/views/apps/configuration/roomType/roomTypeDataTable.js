// Import ag-grid
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import '/node_modules/ag-grid-community/styles/ag-grid.css'
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css'

// import './Assettable.css';
// API_URL
import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import API_URL from '../../../../config';
const id='1'
function App() {

  const [data, setRowData] = useState();

  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    {headerName: 'ID',field:'Reservations.Reservation.BookingTran.SubBookingId',suppressSizeToFit: true,maxWidth: 160},
    {headerName: 'Hotel ID',field: 'hotelID',suppressSizeToFit: true},
    {headerName: 'Room Type',field: 'roomType'},
    {headerName: 'Name',field: 'maxAdults'},
    {headerName: 'Email ID',field: 'maxChildren'},
    {headerName: 'Phone',field: 'totalNumOfRooms'},
    {headerName: 'Is Active',field: 'isActive'},
    {headerName: 'roomClassID	',field: 'roomClassID	'},

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
    fetchx(API_URL + '/getMasterReservation')
    .then(response => response.json())
      .then(data => {setRowData(data)
    // console.log(data[{'Reservations.Reservation'}])
      })
      .catch(error => console.error(error));
    // console.log(rowData['data'])
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
            data={data} columnDefs={columnDefs}
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