// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'> Routing</CardTitle>
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
              <Label className='form-label' for='CountryMulti'>
                Routing Type  
              </Label>
              <Input type='text' name='Routing Type' id='nameMulti' placeholder='Routing Type' />              
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
                Entire Stay
              </Label>
              <Input type='text' name='Entire Stay' id='nameMulti' placeholder='Entire Stay' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
                Begin Date   
              </Label>
              <Input type='date' name='Begin Date' id='nameMulti' placeholder='Begin Date' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
                End Date   
              </Label>
              <Input type='date' name='End Date' id='nameMulti' placeholder='End Date' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
              Route To Room  
              </Label>
              <Input type='text' name='Route To Room' id='nameMulti' placeholder='Route To Room' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
               Route To Window  
              </Label>
              <Input type='text' name='Route To Window' id='nameMulti' placeholder='Route To Window' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              Reservation ID   
              </Label>
              <Input type='text' name='Reservation ID' id='CompanyMulti' placeholder='Reservation ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
               Route To Window  
              </Label>
              <Input type='text' name='Route To Window' id='nameMulti' placeholder='Route To Window' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
               Routing To Guest  
              </Label>
              <Input type='text' name='Routing To Guest ' id='nameMulti' placeholder='Routing To Guest ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
               Routing To Account  
              </Label>
              <Input type='text' name='Routing To Account ' id='nameMulti' placeholder='Routing To Account ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
               Routing For Guest  
              </Label>
              <Input type='text' name='Routing For Guest ' id='nameMulti' placeholder='Routing For Guest ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Payment Type
              </Label>
              <Input type='select' id='Select Room'>
              <option>---Select---</option>
                <option>Cash</option>
                <option>Cheque</option>
                <option>Debit Cards</option>
                <option>Credit Cards</option>
              </Input>
            </Col>            
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
               Transaction Codes
              </Label>
              <Input type='text' name='Transaction Codes' id='CompanyMulti' placeholder='Transaction Codes' />
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
