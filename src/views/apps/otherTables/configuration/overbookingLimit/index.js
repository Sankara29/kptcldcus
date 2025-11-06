// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Overbooking Limit</CardTitle>
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
            <Label className='form-label' for='EmailVertical'>
                Overbooking Type
              </Label>
              <Input type='select' id='Select Room Type'>
              <option>Select Room Type</option>
                <option>KSUP</option>
                <option>TSUP</option>
                <option>EXE</option>
                <option>KDLX</option>
                <option>TDLX</option>
                <option>KCLB</option>
                <option>PM</option>
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Number of Overbookings
              </Label>
              <Input type='number' name='overbookings' id='nameVertical' placeholder='Number of Overbookings' />
            </Col>
            {/* <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
              Date
              </Label>
              <Input type='date' name='maxadult' id='nameVertical' placeholder='Date' />
            </Col> */}
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
