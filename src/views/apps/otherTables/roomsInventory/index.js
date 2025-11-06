// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Rooms Inventory</CardTitle>
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
                Number of Avalable Rooms
              </Label>
              <Input type='number' name='numAvlRooms' id='nameVertical' placeholder='Number of Avalable Rooms' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Number of Sell Control Rooms
              </Label>
              <Input type='number' name='numSellCtrlRooms' id='nameVertical' placeholder='Number of Sell Control Rooms' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Number of OOD Rooms
              </Label>
              <Input type='number' name='numOodRooms' id='nameVertical' placeholder='Number of OOD Rooms' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Number of Overbooked Rooms
              </Label>
              <Input type='number' name='numOverbookedRooms' id='nameVertical' placeholder='Number of Overbooked Rooms' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Sell Limit
              </Label>
              <Input type='number' name='sellLimit' id='nameVertical' placeholder='Sell Limit' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                From Date
              </Label>
              <Input type='Date' name='date' id='nameVertical' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                TO Date
              </Label>
              <Input type='Date' name='date' id='nameVertical' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Room Type ID
              </Label>
              <Input type='number' name='id' id='nameVertical' placeholder='Room Type ID'  ></Input>
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
