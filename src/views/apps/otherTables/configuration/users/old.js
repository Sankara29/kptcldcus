// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>  User </CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
                Hotel ID
              </Label>
              <Input type='number' name='name' id='nameMulti' placeholder='Hotel ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
              First Name  
              </Label>
              <Input type='text' name='First Name ' id='lastNameMulti' placeholder='First Name ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
              Last Name  
              </Label>
              <Input type='text' name='Last Name ' id='lastNameMulti' placeholder='Last Name ' />
            </Col> 
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
              Email 
              </Label>
              <Input type='email' name='email' id='email' placeholder='email ' />
            </Col> 
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
              Password
              </Label>
              <Input type='password' name='password' id='email' placeholder='password ' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Department
              </Label>
              <Input type='select' id='Select Room'>
              <option>---Select---</option>
                <option>Reservation</option>
                <option>Front Office</option> 
                <option>Housekeeping</option>
                <option>Accounts</option>
                <option>Developments</option>
                <option>Others</option>               
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Account Manager
              </Label>
              <Input type='select' id='Select Room'>
              <option>---Select Status---</option>
                <option>Yes</option>
                <option>No</option>                
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Active Status
              </Label>
              <Input type='select' id='Select Room'>
              <option>---Select Status---</option>
                <option>Active</option>
                <option>In Active</option>                
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Staff
              </Label>
              <Input type='select' id='Select Room'>
              <option>---Select Status---</option>
                <option>Yes</option>
                <option>No</option>                
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              SuperUser
              </Label>
              <Input type='select' id='Select Room'>
              <option>---Select Status---</option>
                <option>Yes</option>
                <option>No</option>                
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
