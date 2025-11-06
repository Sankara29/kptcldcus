// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'



const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Folio </CardTitle>
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
              <Label className='form-label' for='CompanyMulti'>
              Folio Number
              </Label>
              <Input type='number' name=' Folio Number' id='CompanyMulti' placeholder='Folio Number' />
            </Col>  
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Balance
              </Label>
              <Input type='number' name='Balance' id='CompanyMulti' placeholder='Balance ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Reservation ID
              </Label>
              <Input type='number' name='Reservation ID' id='CompanyMulti' placeholder='Reservation ID ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Room ID
              </Label>
              <Input type='number' name='Room ID' id='CompanyMulti' placeholder='Room ID ' />
            </Col> 
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Guest ID
              </Label>
              <Input type='number' name='Guest ID' id='CompanyMulti' placeholder='Guest ID ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Company/Agent 
              </Label>
              <Input type='number' name='Company/Agent ' id='CompanyMulti' placeholder='Company/Agent ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
                Settled
              </Label>
              <Input type='select' id='Select Room'>              
                <option>Settled</option>
                <option>Not Settled</option>                
              </Input>
            </Col> 
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
                Cancelled 
              </Label>
              <Input type='select' id='Select Room'>              
                <option>Cancelled</option>
                <option>Not Cancelled</option>                
              </Input>
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
