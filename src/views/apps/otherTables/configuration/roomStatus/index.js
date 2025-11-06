// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Room Status</CardTitle>
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
                Floor
              </Label>
              <Input type='select' id='Select Floor'>
              <option>---Select Floor---</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Input>              
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Room
              </Label>
              <Input type='select' id='Select Room'>
              <option>---Select Room---</option>
                <option>101</option>
                <option>102</option>
                <option>103</option>
                <option>104</option>
                <option>105</option>
                <option>106</option>
                <option>107</option>
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
               Room Type
              </Label>
              <Input type='select' id='Select Room Type'>
              <option>---Select Room Type---</option>
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
              <Label className='form-label' for='CompanyMulti'>
                Block
              </Label>
              <Input type='text' name='Block' id='CompanyMulti' placeholder='Select Block' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
               Room Status
            </Label>
            <Input type='select' id='Resevation Status Type'>
            <option>---Select Status---</option>
                <option>Inspected</option>
                <option>Dirty</option>
                <option>Clean</option>
              </Input>              
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
               Front Office Status
            </Label>
            <Input type='select' id='Front Office Status'>
            <option>---Select Front Office Status---</option>
                <option>occupied</option>
                <option>vacant</option>
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
