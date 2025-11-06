
import {AgGridReact} from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import '/node_modules/ag-grid-community/styles/ag-grid.css';
import '/node_modules/ag-grid-community/styles/ag-theme-alpine.css';
import { Input, Card, Form, Row, Col, Label, Button, Modal, ModalHeader, ModalBody,} from "reactstrap";
import {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import API_URL from "../../../config";
function App(data1) {
console.log("history",data1.data1)
console.log("history",data1.data1.id)

  const [rowData, setRowData] = useState();
  let navigate = useNavigate();

  const gridRef = useRef();
  const navigatepage = () => {
    navigate('');
};

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'BookingID', field: 'bookingID', suppressSizeToFit: true, maxWidth: 125, },
    { headerName: 'Arrival Date', field: 'arrivalDate', suppressSizeToFit: true, maxWidth: 130,  },
    { headerName: 'Departure Date', field: 'departureDate', suppressSizeToFit: true, maxWidth: 160 , },
    { headerName: 'Room Type', field: 'roomType', suppressSizeToFit: true, maxWidth: 130, },
    { headerName: 'Room', field: 'room', suppressSizeToFit: true, maxWidth: 100, },
    { headerName: 'Rate Code', field: 'rateCode', suppressSizeToFit: true, maxWidth: 120, },
    { headerName: 'Rate', field: 'rate', suppressSizeToFit: true, maxWidth: 100, },
    { headerName: 'Total Cost of Stay', field: 'totalCostOfStay', suppressSizeToFit: true, maxWidth: 170, },
    { headerName: 'Package', field: 'packageCode', suppressSizeToFit: true, maxWidth: 105, },
    { headerName: 'Agent', field: 'accountType', suppressSizeToFit: true, maxWidth: 130 ,},
    { headerName: 'Company', field: 'accountName', suppressSizeToFit: true, maxWidth: 170, },
    { headerName: 'Reservation Status', field: 'reservationStatus', suppressSizeToFit: true },
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
    fetchx(API_URL + `/getGuestHistoryDetails?guestID=${data1.data1.id}&reservationStatus=Checked Out `)
    .then(result => result.json())
    .then(rowData => setRowData(rowData['data']))
  }, []);
  console.log(localStorage.getItem("id"))

  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <div>
      {/* <button onClick={buttonListener}>Push Me</button> */}
      <div className="ag-theme-alpine" style={{ height: 280}}>
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

      <br/>
      <br/>
      <div align='end' className='buttons'>

      <Button color='primary' className='me-1' type='button' onClick={navigatepage}>
            Exit
        </Button>
    </div>

    </div>
  );
}

export default App;