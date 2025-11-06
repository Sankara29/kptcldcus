// ** React Imports
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import Sidebar from '@components/sidebar'
import Select from "react-select";
import API_URL from "../../../../config";

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
// import Bill from './displaybill'
import Bill1 from './genratebill'
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
const SidebarAddPayment = ({ open, toggleSidebar, data }) => {
  let navigate = useNavigate();

  // ** States
  const [picker, setPicker] = useState(new Date())
  // ** State
  const [formdata, setformdata] = useState(null);

  // ** Hooks
  const { reset, handleSubmit, control, formState: { errors }
  } = useForm({ defaultValues });
  let billNo
  const onSubmit = (formdata) => {
    let itemrecordid = []
    let kotarr = []

    setformdata(formdata);
    // console.log(formdata)
    if (
      formdata.PaymentType.value !== null
    ) {
      // console.log(formdata);
      setTimeout(() => { handleReset() }, 500)
      fetchx(API_URL+'/getbillnumber', {
          method: 'POST',
          body: JSON.stringify({
              "hotelID" : 1,
              "storeID":1
          }),
          headers: {
             'Content-type': 'application/json; charset=UTF-8',
          },
       })
          .then((res) => res.json())
          .then((post) => {
              // console.log(post)
              billNo = post['data']['billNo']

          })
          .catch((err) => {
             console.log(err.message);
          });

          // console.log(data.items)

      for (let i = 0; i < data.items.length; i++) {
          setTimeout(() => {
              itemrecordid.push(data.items[i]['id'])
              if (!kotarr.includes(data.items[i]['kotNo'])) {
                  kotarr.push(data.items[i]['kotNo']);
                }
              data.items[i]['billNo'] = billNo
              // let orderitems = JSON.stringify({
              //     "billNo":data.items[i]['billNo'],
              //     "id":data.items[i]['id']
              // }

              //     )
              // console.log(orderitems)


              // let res = fetchx(API_URL+"/updatetableorder", {
              //     method: "PUT",
              //     headers: { "Content-Type": "application/json" },
              //     body: orderitems
              // }).then((res) => {
              //     console.log(res);
              // });
          }, 500);
      // console.log((data.items.length),i)
      if ((data.items.length-1) == i) {

          setTimeout(() => {    
              // console.log(itemrecordid)
              // console.log(kotarr)
              let billdata = {
                  "storeID": localStorage.getItem('storeID'),
                  "billNo": billNo,
                  "billNoDisplay": billNo,
                  "tableNo": localStorage.getItem('tableNumber'),
                  "KOTno": kotarr,
                  "pax": data['pax'],
                  "linkToRoom":'No',
                  "subTotal":data['subtotal'],
                  "totalAmount":data['total'],
                  "itemRecordID":itemrecordid,
                  "billStatus":'settled',
                  "steward":"Manoj",
                  "Timing":"Snacks",
                  "addedUser":"Admin",
                  "POSuser":"Admin",
                  "settledPOSuser":"Admin",
                  "guestType":data['GuestType'],
                  "classAmt":JSON.stringify(data['classAmount']),
                  "classDiscount":JSON.stringify(data['DiscountAmt']),
                  "cgstAmt":(parseFloat(data['GST18'])/2).toFixed(2),
                  "sgstAmt":(parseFloat(data['GST18'])/2).toFixed(2),
                  "tobaccoGST":parseFloat(data['GST28']),
                  "roundOff":data['Round']

              }
              // console.log(billdata)
              fetchx(API_URL+'/addbilldetails', {
                  method: 'POST',
                  body: JSON.stringify(billdata),
                  headers: {
                     'Content-type': 'application/json; charset=UTF-8',
                  },
               })
                  .then((res) => res.json())
                  .then((post) => {
                      // console.log(post)
                      // console.log(post.status)
                      // if(post.statuscode==200){
                      //     alert('Bill Settled')
                      //     setTimeout(() => { navigate('/apps/posconfiguration/Tableselection');},10)
                      // }
                  })
                  .catch((err) => {
                     console.log(err.message);
                  });
          }, 500);
      }

      }
      for (let i = 0; i < data.items.length; i++) {
        setTimeout(() => {

            data.items[i]['billNo'] = billNo
            let orderitems = JSON.stringify({
                "billNo":data.items[i]['billNo'],
                "id":data.items[i]['id']
            }

                )
            // console.log(orderitems)


            let res = fetchx(API_URL+"/updatetableorder", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: orderitems
            }).then((res) => {
                // console.log(res);
                if(res.status==200){
                  toast(
                      <div className="d-flex">
                        <div className="me-1">
                          <Avatar size="sm" color="success" icon={<Check size={12} />} />
                        </div>
                        <div className="d-flex flex-column">
                          <h6>Bill status updated Successfully</h6>
                        </div>
                      </div>
                    );
              }
            });
        }, 500);
      }
      const billfetch = JSON.stringify({
        "hotelID": 1,
        "storeID": localStorage.getItem('storeID'),
        "orderID": localStorage.getItem('orderID'),
        "tableNo": localStorage.getItem('TableSelected'),
        // "discID":0,
        // "billType":'Real',
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

            // setData(post['data'])
            toast(
              <div className="d-flex">
                <div className="me-1">
                  <Avatar size="sm" color="success" icon={<Check size={12} />} />
                </div>
                <div className="d-flex flex-column">
                  <h6>Payment successful</h6>
                </div>
              </div>
            );
          }
          else[
            setData(null)
          ]
          // console.log(post)
        })
        .catch((err) => {
          console.log(err.message);
        });
      setTimeout(() => { navigate('/apps/posconfiguration/Tableselection'); }, 10)


    }
  };

  const handleReset = () => {
    reset({
      PaymentType: "",
    });
  };

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Add Payment'
      headerClassName='mb-1'
      contentClassName='p-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* <Col md='6' sm='12' className='mb-1'> */}
          <div className="mb-1">
            <Label className="form-label" for="PaymentType">
              Payment Type
            </Label>
            <Controller
              id="PaymentType"
              control={control}
              name="PaymentType"
              render={({ field }) => (
                <Select
                  required
                  isClearable
                  options={PaymentOptions}
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": formdata !== null && formdata.PaymentType === null,
                  })}
                  {...field}

                />
              )}
            />
          </div>
          {/* </Col> */}
          <div className="d-flex"><br /><br />
            <Button className="me-1" color="primary" type="submit" >
              Submit
            </Button>
          </div>
        </Row>
      </Form>
    </Sidebar>
  )
}

const InvoicePreview = () => {
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

  const handleChange = (event) => {
    // setSelectedValue(event.target.value);
    // console.log(event.target.value);
    data['GuestType'] = event.target.value
    setguesttype(event.target.value)
    // console.log(data)

    setresidentcheck(false)

  };
  const handlepax = (event) => {
    // console.log(event.target.value);
    data['pax'] = event.target.value
    if (data['pax'] == '' || data['pax'] == 0) {
      setpaxcheck(true)
    }
    else {
      setpaxcheck(false)
    }
  }

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
      "billType": 'DummyInvoice',
      "paymentType": 'Cash',
      "FolioNo": 0
    })
    // discID='+data['DiscCouponlist'].value
    setTimeout(() => {
      fetchx(API_URL+'/generateBill', {
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

  function applydisc() {
    setDiscCoupon(true)

    // console.log("DISCOUNT CLICKED")
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
      <SidebarAddPayment toggleSidebar={toggleAddSidebar} open={addPaymentOpen} data={data} />
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

export default InvoicePreview
