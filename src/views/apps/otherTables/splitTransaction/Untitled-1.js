// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Ticket</CardTitle>
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
            Created By
              </Label>
              <Input type='text' name='createdBy' id='nameVertical' placeholder='Created By' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='EmailVertical'>
            Created At    
              </Label>
              <Input type='datetime-local' name='createdAt' id='nameVertical' placeholder='Created At' />
                </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Room ID
              </Label>
              <Input type='number' name='roomID' id='nameVertical' placeholder='Room ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Area
              </Label>
              <Input type='text' name='area' id='nameVertical' placeholder='Area' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Category
              </Label>
              <Input type='text' name='category' id='nameVertical' placeholder='Category' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Priority
              </Label>
              <Input type='select' id='nameVertical'>
              <option>-Select-</option>
              <option>High</option>
                <option></option>
                </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Subject
              </Label>
              <Input type='text' name='subject' id='nameVertical' placeholder='Subject' >
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Description
              </Label>
              <Input type='text' name='description' id='nameVertical' placeholder='Description' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            File Upload
              </Label>
              <Input type='file' name='fileUpload' id='nameVertical' placeholder='File Upload' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Status
              </Label>
              <Input type='select' id='nameVertical'>
              <option>-Select-</option>
              <option>In Progress</option>
                <option></option>
                </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Agent
              </Label>
              <Input type='number' name='agent' id='nameVertical' placeholder='Agent ID' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            SLA Date and Time
              </Label>
              <Input type='datetime-local' name='SLADateAndTime' id='nameVertical' placeholder='SLA Date and Time' ></Input>
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
