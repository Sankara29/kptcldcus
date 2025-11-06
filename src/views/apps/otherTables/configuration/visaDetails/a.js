// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Visa Details</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
                Hotel ID
              </Label>
              <Input type='number' name='Hotel ID' id='nameMulti' placeholder='Hotel ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
              Reservation
              </Label>
              <Input type='text' name='Reservation ' id='lastNameMulti' placeholder='Reservation' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              Visa Number
              </Label>
              <Input type='number' name='Visa Number' id='cityMulti' placeholder='Visa Number' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              Guest Profile ID
              </Label>
              <Input type='number' name='Guest Profile ID' id='cityMulti' placeholder='Guest Profile ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              Issue Date
              </Label>
              <Input type='date' name='Issue Date' id='cityMulti' placeholder='Issue Date' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              Expiry Date
              </Label>
              <Input type='date' name='Expiry Date' id='cityMulti' placeholder='Expiry Date' />
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


  
    </div>
  )
}
export default MultipleColumnForm
