// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import { Row, Col, Button, Modal, ModalBody } from 'reactstrap'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Demo Components


import Addorder from './addorder'
import API_URL from "../../../../config";
import { useNavigate } from "react-router-dom";
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const Placeorder = () => {
  let navigate = useNavigate();
  const [vacantTable, setvacantTable] = useState(false)
  const [ordersTotalAmt, setOrdersTotalAmt] = useState([])

  let restau = sessionStorage.getItem('Rest_name')
  let table = localStorage.getItem('TableSelected')

  const handleVacantTabel = () => {
    // console.log("vacant Table")
    // console.log(JSON.stringify({
    //   "hotelID": 1,
    //   "storeID": localStorage.getItem('storeID'),
    //   "orderID": localStorage.getItem('orderID'),
    //   "tableNo": localStorage.getItem('TableSelected'),
    // }))
    fetchx(API_URL + '/closeOrder', {
      method: 'POST',
      body: JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        if (post['statuscode'] == 200) {
          setTimeout(() => { navigate('/apps/posconfiguration/Tableselection') }, 100);

        }

        if (post['statusCode'] == 403) {
          // console.log(post['message'])
          setvacantTable(false)
          const swalInstance = MySwal.fire({
            text: post['message'],
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger',
            },
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('/apps/posconfiguration/Addorder');
            }
          });
        }
        // billNo = post['data']['billNo']

      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  const handleVacantTabel1 = () => {
    setvacantTable(true)
  }
  function getordersAmount(orderAmount) {

    console.log(orderAmount)
    setOrdersTotalAmt(orderAmount)
  }
  return (
    <Fragment>
      {/* <Breadcrumbs title='Add Asset Form' data={[{ title: 'Form' }, { title: 'Add Asset Form' }]} />
      <p>Fill this form to Add Assets (OHT,Mini tank,Solenoid valve,Energy meter ,Water meter,Solar panel,Ultrasonic sensor,Dip sensor,pump ) to the system</p> */}

      <Button.Ripple color='primary' outline size='sm' style={{ 'margin-bottom': '10px' }}
        onClick={() => navigate('/apps/posconfiguration/Tableselection')}>
        Back
      </Button.Ripple>
      <Row>

        <Col xl='3' md='6' xs='12'>
          {/* <h4>Restaurant : {localStorage.getItem('RestaurantSelected')}</h4> */}
          <h4>Outlet name : <strong>{localStorage.getItem('RestaurantSelected')}</strong></h4>

        </Col>
        <Col xl='3' md='6' xs='12'>
          <h4>OrderID : {localStorage.getItem('orderID')}</h4>
        </Col>
        <Col xl='2' md='6' xs='12'>
          <h4>TableNo :{localStorage.getItem('TableSelected')}</h4>
        </Col>
        <Col xl='2' md='6' xs='12'>
        {console.log(ordersTotalAmt)}
          {/* {ordersTotalAmt && ordersTotalAmt != 0 && 
            <h4 style={{ textAlign: 'right', paddingRight: '300px', marginTop: '0px' }}>Amount:{ordersTotalAmt}</h4>
          }         */}
         
          {ordersTotalAmt !== undefined && ordersTotalAmt.length !== 0 && (
    <h4 style={{ display: 'inline-block', textAlign: 'right', paddingRight: '20px', marginTop: '0px' }}>Amount: {ordersTotalAmt}</h4>
)}


          </Col>
        <Col xl='2' md='6' xs='12' className='d-flex justify-content-end'>
          <Button color="primary" style={{ 'margin-bottom': '10px', width: '50%' }} onClick={handleVacantTabel1}>Vacate Table</Button>
        </Col>
      </Row>

      <Row className='match-height'>



        <Col lg='12' md='12'>
          <Addorder getordersAmount={getordersAmount} />
        </Col>

      </Row>
      <Modal
        isOpen={vacantTable}
        onCancel={() => setvacantTable(false)}
        centered
        footer={null}
      >
        <ModalBody className='px-5 pb-2'>
          <div className='text-center mb-2'>
            <h1 className='demo-space-y'><b>Vacant Table</b></h1>
            <p>Do you want to vacant Table #{localStorage.getItem('TableSelected')}</p>
          </div>
          {/* <div className="button-container text-right" style={{ marginTop: '10px' }}>

                        <a href="#" className="me-1" style={{ color: 'green', fontWeight: 'bold', fontSize: '20px', float: 'right' }} onClick={handleVacantTabel}>
                            Yes
                        </a>
                        <a href="#" className="bg-transparent" style={{ color: 'green', fontWeight: 'bold', fontSize: '20px', float: 'right', marginRight: '30px' }} onClick={() => setvacantTable(false)}>
                            No
                        </a>

                    </div> */}
          <div align='end' className='buttons'>
           
            {/* <Button outline className='me-1' color='danger' onClick={() => setvacantTable(false)}> */}
            <Button color='primary' className='me-1' type='submit' onClick={handleVacantTabel}>
              Yes
            </Button>
            <Button  className='me-1' color='danger' onClick={() => setvacantTable(false)}>

              No
            </Button>
            

          </div>

        </ModalBody>
      </Modal>
    </Fragment>

  )
}

export default Placeorder
