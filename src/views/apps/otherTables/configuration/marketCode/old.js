// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Market Code</CardTitle>
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
              Market Code
              </Label>
              <Input type='text' name='Market Code' id='lastNameMulti' placeholder='Market Code' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                Description
              </Label>
              <Input type='text' name='Description' id='cityMulti' placeholder='Description' />
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
              <Label className='form-label' for='lastNameMulti'>
              Market Group ID
              </Label>
              <Input type='text' name='Market Group' id='lastNameMulti' placeholder='Market Group ID' />
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
