// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Modal, ModalBody, Form, Input, Button } from 'reactstrap'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// import API_URL from "../../../config";

import API_URL from '../../../../config';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'


// ** Demo Components

import TableDisplay from './table'


const Placeorder = () => {
  const [stewardOptions, setStewardOptions] = useState([]);


  useEffect(() => {
    fetchx(API_URL + '/getallstewardlist?hotelID=10')
      .then(result => result.json())
      .then(resp => {
        const filteredStewardOptions = resp['data'].filter(steward => steward.user_id !== null);
        setStewardOptions(filteredStewardOptions);
      })
  }, []);
  let navigate = useNavigate();

  const [loginModal, setLoginModal] = useState(false);
  const [stewardModal,setStewardModal] = useState(false);
  const [searchSteward, setSearchSteward] = useState('');

  // let restau = sessionStorage.getItem('Rest_name')
  // let table = sessionStorage.getItem('TableSelected')
  function handleStewardClick() {
    setStewardModal(true)
    if (stewardOptions.length === 0) {
      fetchStewardData();
    }

  }
  function confirmSubmit1() {
    setLoginModal(false)
    navigate('')
  }



  function confirmSubmit(data) {
    let stewardData = sessionStorage.getItem('stewardinfo')
    sessionStorage.removeItem('stewardName1')
    // let stewardName = sessionStorage.getItem('stewardName1')
    // sessionStorage.setItem('stewardName1',stewardName)


    // let parsedStewardData = JSON.parse(stewardData);

    fetchx(API_URL +'/setstewardToStore', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stewardid: stewardData,
        passcode: data.password,
      })
    })
      .then(result => result.json())
      .then(rowData => {
        if (rowData['statuscode'] == 200) {
          const swalInstance = MySwal.fire({
            text: 'Steward Changed!!',
            // text:'Steward Change Successfully',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Close',
            customClass: {
              confirmButton: 'btn btn-danger'
            }
          });
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
              sessionStorage.setItem('stewardName1', rowData.message); 

            }
          });

        }
        if(rowData['statusCode'] == 401) {
          const swalInstance = MySwal.fire({
            text: rowData['message'],
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
          swalInstance.then((result) => {
            if (result.isConfirmed) {
              navigate('');
              // sessionStorage.setItem('stewardName1', rowData.message); 

            }
          });
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }
  const { reset, handleSubmit, control } = useForm()
  const {
    setError,
    formState: { errors }
  } = useForm()

   function handleStewardSelection(selectedSteward) {
    setLoginModal(true);

    // sessionStorage.setItem('stewardid',selectedSteward.user_id)
    // sessionStorage.setItem('stewardName1',selectedSteward.stewardName)
    setStewardModal(false);

  }


  return (
    
    <Fragment>
      <h4>
        Outlet name: <strong>{localStorage.getItem('RestaurantSelected')}</strong>
        <span style={{ float: 'right' }} onClick={handleStewardClick}>
        
          {/* Steward: <strong>{sessionStorage.getItem('stewardName1')}</strong> */}
          Steward: <strong>{sessionStorage.getItem('stewardName1') || sessionStorage.getItem('stewardName2') }</strong>

        </span>  </h4>

      <Row className='match-height'>
        <Col lg='12' md='12'>
          <TableDisplay />
        </Col>
      </Row>
      <Modal isOpen={loginModal} onCancel={() => setLoginModal(false)} centered footer={null}>
        <ModalBody className='px-5 pb-2'>
        
          <Form onSubmit={handleSubmit(confirmSubmit)}>

            <div className='text-center mb-2'>
              <h1 className='demo-space-y'><b>Enter Password to Change Steward</b></h1>
              <Controller
                control={control}
                id='password'
                name='password'
                render={({ field }) => (
                  <Input
                    type='password'
                    placeholder='password'
                    invalid={errors.password && true}
                    {...field}
                  />
                )}
              />
            </div>

            <div className='button-container text-center'>
              <Button className='me-1' color='primary' onClick={confirmSubmit1}>
                Cancel
              </Button>
              <Button className='bg-transparent' type='submit' color='danger'>
                Send
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      {/* <Modal isOpen={stewardModal} onCancel={() => setStewardModal(false)} centered footer={null}>
  <ModalBody className='px-5 pb-2'>
    {stewardOptions.map((steward, index) => (
      <Button
        key={index}
        className="me-0.5 btn-success"
        style={{
          height: '100px',
          width: '120px',
          marginRight: '12px',
          marginBottom: '10px',
          backgroundColor: 'success',
          fontWeight: 'bold',
        }}
        outline
        id={index}
        name="bt"
        onClick={() => {
          handleStewardSelection(steward);
          sessionStorage.setItem('stewardinfo', steward.user_id);
          // sessionStorage.setItem('stewardName1',steward.stewardName)
        }}
      >
        {steward.stewardName}
      </Button>
    ))}
  </ModalBody>
</Modal> */}

<Modal
  isOpen={stewardModal}
  toggle={() => setStewardModal(!stewardModal)}
  className='modal-dialog-centered modal-lg'
  onCancel={() => setStewardModal(false)}
  centered
  footer={null}
>
  <ModalBody style={{ height: '600px' }}>
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', paddingLeft: '40px' }}>
      <Input
        type="text"
        placeholder="Search Steward..."
        value={searchSteward}
        onChange={(e) => setSearchSteward(e.target.value)}
        style={{
          width: '50%',
          marginRight: '5px',
        }}
      />
      {/* <FaSearch style={{ fontSize: '20px' }} /> */}
    </div>
    <div
      style={{
        paddingTop: '5px',
        maxHeight: '450px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {stewardOptions
        .filter((steward) => steward.stewardName.toLowerCase().includes(searchSteward.toLowerCase()))
        .map((steward, index) => (
          <Button
            key={index}
            className="me-0.5 btn-success"
            style={{
              height: '100px',
              width: '120px',
              marginRight: '12px',
              marginBottom: '10px',
              backgroundColor: 'success',
              fontWeight: 'bold',
            }}
            outline
            id={index}
            name="bt"
            onClick={() => {
              handleStewardSelection(steward);
              sessionStorage.setItem('stewardinfo', steward.user_id);
              // sessionStorage.setItem('stewardName1', steward.stewardName)
              setStewardModal(false);
            }}
          >
            {steward.stewardName}
          </Button>
        ))}
    </div>
  </ModalBody>
</Modal>

    </Fragment>
  )


}

export default Placeorder
