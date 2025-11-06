// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Extras</CardTitle>
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
            Extra Code
              </Label>
              <Input type='text' name='extraCode' id='nameVertical' placeholder='Extra Code' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Description
              </Label>
              <Input type='text' name='description' id='nameVertical' placeholder='Description' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Group ID
              </Label>
              <Input type='number' name='groupID' id='nameVertical' placeholder='Group ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
                Sub Group ID
              </Label>
              <Input type='number' name='subGroupID' id='nameVertical' placeholder='Sub Group ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Remarks
              </Label>
              <Input type='text' name='Remarks' id='nameVertical' placeholder='Remarks' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Type
              </Label>
              <Input type='select' id='Select Status'>
              <option>-Select-</option>
                <option>Percentage</option>
                <option>Amount</option>
                <option>Pieces</option>
                <option>Trips</option>
                </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Percentage
              </Label>
              <Input type='number' name='percentage' id='nameVertical' placeholder='Percentage' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Amount
              </Label>
              <Input type='number' name='amount' id='nameVertical' placeholder='Amount' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Pieces
              </Label>
              <Input type='number' name='pieces' id='nameVertical' placeholder='Pieces' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' for='nameVertical'>
            Trips
              </Label>
              <Input type='number' name='trips' id='nameVertical' placeholder='Trips' ></Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='EmailMulti'>
                Active Status
              </Label>
              <Input type='select' id='Select Status'>
              <option>-Select-</option>
                <option>Active</option>
                <option>In-Active</option>
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
