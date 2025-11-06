// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Forex</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Hotel ID
              </Label>
              <Input type='number' name='hotelID' id='nameVertical' placeholder='Hotel ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Room ID
              </Label>
              <Input type='number' name='roomID' id='nameVertical' placeholder='Room ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Reservation ID
              </Label>
              <Input type='number' name='reservationID' id='nameVertical' placeholder='Reservation ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Guest Profile ID
              </Label>
              <Input type='number' name='guestProfileID' id='nameVertical' placeholder='Guest Profile ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailVertical'>
                Currency    
              </Label>
              <Input type='select' id='nameVertical'>
              <option>-Select-</option>
              <option>INR</option>
                <option>USD</option>
                </Input>
                </Col>
                <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Rate for the Day
              </Label>
              <Input type='number' name='rateForTheDay' id='nameVertical' placeholder='Rate for the Day' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Amount
              </Label>
              <Input type='number' name='amount' id='nameVertical' placeholder='Amount' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Equivalent Amount
              </Label>
              <Input type='number' name='equivalentamount' id='nameVertical' placeholder='Equivalent Amount' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                CGST
              </Label>
              <Input type='number' name='cgst' id='nameVertical' placeholder='CGST' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                SGST
              </Label>
              <Input type='number' name='sgst' id='nameVertical' placeholder='SGST' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Total
              </Label>
              <Input type='number' name='Total' id='nameVertical' placeholder='Total' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Remarks
              </Label>
              <Input type='text' name='Remarks' id='nameVertical' placeholder='Remarks' ></Input>
            </Col>
            <Col sm='12'>
              <div className='d-flex'>
                <Button className='me-1' color='primary' type='submit' onClick={e => e.preventDefault()}>
                  Submit
                </Button>
                <Button outline color='secondary' type='reset'>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}
export default MultipleColumnForm
