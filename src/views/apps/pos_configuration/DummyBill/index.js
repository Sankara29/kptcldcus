// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import Sidebar from '@components/sidebar'
import Select from "react-select";
// ** Utils
import { selectThemeColors } from "@utils";
import classnames from "classnames";
import { useNavigate } from "react-router-dom";
import Cleave from "cleave.js/react";
import toast from "react-hot-toast";
// ** Custom Components
import Avatar from "@components/avatar";
import { Check } from "react-feather";

// ** Third Party Components
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'
import { Form, Label, Card, CardBody, Button, Input, InputGroup, Modal, ModalBody, ModalHeader } from 'reactstrap'

// ** Invoice Preview Components
// import Bill1 from './displaybill'
import Bill1 from './previewbill'
import API_URL from "../../../../config";



// import Bill1 from './genratebill'
// import PreviewActions from './PreviewActions'
// import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'
// import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'

// ** Styles
import '@styles/base/pages/app-invoice.scss'
import { FormControlUnstyledContext } from '@mui/base';
const PaymentOptions = [
  { value: "Cash", label: "Cash" },
  { value: "Link to room", label: "Link to room" }
];
const defaultValues = {
  PaymentType: "",
};
let DiscCouponOptions = [
  fetchx(API_URL+'/getdiscoptions?hotelID=1&storeID=1')
    .then(result => result.json())
    .then(resp => {
      // console.log(resp['data'])
      DiscCouponOptions = resp['data']
      // console.log(DiscCouponOptions)
    })


]


const PreviewDummyBill= () => {
  // ** HooksVars
  const { id } = useParams()

  // ** States
  const [data, setData] = useState(null)
  const [sendSidebarOpen, setSendSidebarOpen] = useState(false)
  const [addPaymentOpen, setAddPaymentOpen] = useState(false)
  const [residentcheck, setresidentcheck] = useState(true)
  const [paxcheck, setpaxcheck] = useState(false)
  const [DiscCoupon, setDiscCoupon] = useState(false)
  const [guesttype, setguesttype] = useState()
  const [tableorderdata, settableorderdata] = useState()
  // ** Functions to toggle add & send sidebar
  const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)
  const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen)
  const [print, setprint] = useState(false)
  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({ defaultValues });

  // ** Get invoice on mount based on id
  useEffect(() => {
    // axios.get(`/api/invoice/invoices/${id}`).then(response => {
    //   setData(response.data)
    //   console.log(response.data)

    // })
    // let TNo = localStorage.getItem('tableNumber')
    // console.log(TNo)
    // fetchx(API_URL+'/gettableorderlist?hotelID=1&storeID='+localStorage.getItem('storeID')+'&tableNo='+localStorage.getItem('tableNumber'))
    //     .then(result => result.json())
    //     .then(resp => {
    //       console.log(resp['data'])
    //       settableorderdata(resp['data'])
    //   if(resp['data']!=''){
    //       fetchx(API_URL+'/billCalculation', {
    //      method: 'POST',
    //      body: JSON.stringify(resp['data']),
    //      headers: {
    //         'Content-type': 'application/json; charset=UTF-8',
    //      },
    //   })
    //      .then((res) => res.json())
    //      .then((post) => {
    //       setData(post['data'])
    //          console.log(post)
    //      })
    //      .catch((err) => {
    //         console.log(err.message);
    //      });
    //     }
    // })
    const billfetch = JSON.stringify({
      "hotelID": 1,
      "storeID": localStorage.getItem('storeID'),
      "orderID": localStorage.getItem('orderID'),
      "tableNo": localStorage.getItem('TableSelected'),
      // "discID":0,
      // "billType":'DummyInvoice',
      // "paymentType":'Cash',
      // "FolioNo":0
    })
    fetchx(API_URL+'/getOrderDetails', {
      method: 'POST',
      body: billfetch,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((post) => {
        if (post['statuscode'] == 200) {

          setData(post['data'])

        }
        else[
          setData(null)
        ]
        // console.log(post)
      })
      .catch((err) => {
        console.log(err.message);
      });
    
  
  }, [])

 
 

  const onSubmitDiscCoupon = data => {

    // console.log("Hlo")
    // console.log(data['DiscCouponlist'])
    // tableorderdata["discCouponID"] = data['DiscCouponlist'].value
    // console.log(tableorderdata)
    // settableorderdata(tableorderdata)


    const discbill = JSON.stringify({
      "hotelID": 1,
      "storeID": localStorage.getItem('storeID'),
      "orderID": localStorage.getItem('orderID'),
      "tableNo": localStorage.getItem('TableSelected'),
      "discID": data['DiscCouponlist'].value,
    //   "billType": 'DummyInvoice',
    //   "paymentType": 'Cash',
    //   "FolioNo": 0
    })
    // discID='+data['DiscCouponlist'].value
    setTimeout(() => {
      fetchx(API_URL+'/getOrderDetails', {
        method: 'POST',
        body: discbill,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((post) => {
          post['data']['GuestType'] = guesttype
          setData(post['data'])

          // console.log(post)
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 1000)
  }

  return data !== null ? (
    <div className='invoice-preview-wrapper'>
      <Row className='invoice-preview'>
        {/* <Col xl={9} md={8} sm={12}>
          <Bill data={data} print={print} />
        </Col> */}
        <Col xl={12} md={8} sm={12}>
          <Bill1 data={data} print={print} />
        </Col>

       
      </Row>
      {/* <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} /> */}
      {/* <SidebarAddPayment toggleSidebar={toggleAddSidebar} open={addPaymentOpen} data={data} /> */}
      <Modal isOpen={DiscCoupon}
        toggle={() => setDiscCoupon(!DiscCoupon)}
        className='modal-dialog-centered'
      >
        <ModalHeader className='bg-transparent' toggle={() => setDiscCoupon(!DiscCoupon)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>Select Discount Coupon</h1>
          {/* <p className='text-center'>Add card for future billing</p> */}
          <Form onSubmit={handleSubmit(onSubmitDiscCoupon)}>
            {/* <Col md='6' sm='12' className='mb-1'> */}
            <div className="mb-1">
              <Label className="form-label" for="DiscCouponlist">
              </Label>
              <Controller
                id="DiscCouponlist"
                control={control}
                name="DiscCouponlist"
                render={({ field }) => (
                  <Select
                    required
                    isClearable
                    options={DiscCouponOptions}
                    classNamePrefix="select"
                    theme={selectThemeColors}
                    className={classnames("react-select", {
                      // "is-invalid": data !== null && data.DiscCouponlist === null,
                    })}
                    {...field}

                  />
                )}
              />
            </div>
            {/* </Col> */}

            <Button type='submit' className='me-1' onClick={() => {
              setDiscCoupon(!DiscCoupon)
            }} color='primary' >
              Submit

            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Invoice not found</h4>
      <div className='alert-body'>
        Go back to select table page and select the Table you want the invoice for
        {/* <Link to='/apps/invoice/list'>Invoice List</Link> */}
      </div>
    </Alert>
  )
}

export default PreviewDummyBill
