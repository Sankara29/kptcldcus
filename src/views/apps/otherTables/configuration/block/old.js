// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <div>
    <Card>
<CardHeader>
  <CardTitle tag='h4'>Block </CardTitle>
</CardHeader>

<CardBody>
  <Form>
  <Col md='12'>
    <Row>
   
      <Col md='6' sm='12' className='mb-1'>
        <Label className='form-label' aria-required for='nameMulti'>
          Hotel ID
        </Label>
        <Input type='number' name='Hotel ID' id='nameMulti' placeholder='Hotel ID' />
      </Col>                

      <Col md='6' sm='12' className='mb-1'>
        <Label className='form-label' for='CompanyMulti'>
          Block
        </Label>
        <Input type='text' name='Block' id='CompanyMulti' placeholder='Block ' />
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
    </Col>
  </Form>
</CardBody>
</Card>





    </div>    
  )
}
export default MultipleColumnForm
