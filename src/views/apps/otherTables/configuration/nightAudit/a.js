// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'> Night Audit</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
                Hotel ID
              </Label>
              <Input type='number' name='HotelID' id='nameMulti' placeholder='Hotel ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
               Business Date   
              </Label>
              <Input type='date' name='BusinessDate ' id='nameMulti' placeholder='Business Date ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Notes  
              </Label>
              <Input type='text' name='Notes' id='nameMulti' placeholder='Notes' />              
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
                Created At  
              </Label>
              <Input type='date' name='CreatedAt' id='nameMulti' placeholder='Created At' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' aria-required for='nameMulti'>
                Created By  
              </Label>
              <Input type='text' name='CreatedBy' id='nameMulti' placeholder='Created By' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
              Country And State Check
              </Label>
              <Input type='select' id='Select Room'>              
                <option>Not Completed</option>     
                <option>Completed</option>           
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
              Arrivals Not Yet Checked In  
              </Label>
              <Input type='select' id='Select Room'>              
                <option>Not Completed</option>     
                <option>Completed</option>           
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
              Depatures Not Checked Out
              </Label>
              <Input type='select' id='Select Room'>              
                <option>Not Completed</option>     
                <option>Completed</option>           
              </Input>
            </Col>                     
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Rolling Business Date 
              </Label>
              <Input type='select' id='Select Room'>              
                <option>Not Completed</option>     
                <option>Completed</option>           
              </Input>
            </Col>  
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Posting Room And Tax
              </Label>
              <Input type='select' id='Select Room'>              
                <option>Not Completed</option>     
                <option>Completed</option>           
              </Input>
            </Col>             
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
               Printing Reports
              </Label>
              <Input type='select' id='Select Room'>              
                <option>Not Completed</option>     
                <option>Completed</option>           
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
