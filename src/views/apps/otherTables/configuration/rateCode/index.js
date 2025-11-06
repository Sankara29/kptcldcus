// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'> Rate Code </CardTitle>
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
              Rate Code   
              </Label>
              <Input type='text' name='RateCode' id='lastNameMulti' placeholder='Rate Code' />
            </Col> 
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                Description
              </Label>
              <Input type='text' name='Description' id='cityMulti' placeholder='Description' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
                Begin Sell Date   
              </Label>
              <Input type='date' name='BeginSellDate' id='nameMulti' placeholder='Begin Sell Date' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
                End Sell Date   
              </Label>
              <Input type='date' name='EndSellDate' id='nameMulti' placeholder='End Sell Date' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
              Days Applicable 
              </Label>
              <Input type='text' name='DaysApplicable' id='nameMulti' placeholder='Days Applicable' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
              Print Rate  
              </Label>
              <Input type='number' name='PrintRate' id='nameMulti' placeholder='Print Rate' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
              Day Use    
              </Label>
              <Input type='text' name='DayUse' id='lastNameMulti' placeholder='Day Use' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
              Discount 
              </Label>
              <Input type='number' name='Discount' id='nameMulti' placeholder='Discount' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
              Discount Amount
              </Label>
              <Input type='number' name='DiscountAmount' id='nameMulti' placeholder='Discount Amount' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' aria-required for='nameMulti'>
              Discount Percentage
              </Label>
              <Input type='number' name='DiscountPercentage' id='nameMulti' placeholder='Discount Percentage' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
            <Label className='form-label' aria-required for='nameMulti'>
              Complementary 
              </Label>
              <Input type='number' name='Complementary' id='nameMulti' placeholder='Complementary' />
            </Col>            
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              HouseUse     
              </Label>
              <Input type='text' name='HouseUse' id='CompanyMulti' placeholder='House Use' />            
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
              <Label className='form-label' for='CompanyMulti'>
              Market ID 
              </Label>
              <Input type='number' name='MarketID' id='CompanyMulti' placeholder='Market ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
              Package ID 
              </Label>
              <Input type='number' name='PackageID' id='CompanyMulti' placeholder='Package ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Package Transaction Code ID
              </Label>
              <Input type='text' name='PackageTransactionCodeID' id='lastNameMulti' placeholder='Package Transaction Code ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Rate Category ID
              </Label>
              <Input type='text' name='Rate Category ID' id='lastNameMulti' placeholder='Rate Category ID' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Source ID
              </Label>
              <Input type='number' name='SourceID' id='lastNameMulti' placeholder='Source ID' />
            </Col>            
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Tansaction Code ID 
              </Label>
              <Input type='text' name='TansactionCodeID' id='lastNameMulti' placeholder='Tansaction Code ID' />
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
