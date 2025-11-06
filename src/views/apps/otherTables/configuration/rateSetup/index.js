// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'

const MultipleColumnForm = () => {
  return (
    <div>
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Rate Setup</CardTitle>
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
              <Label className='form-label' for='cityMulti'>
                Rate Code
              </Label>
              <Input type='text' name='Rate Code' id='cityMulti' placeholder='Rate Code' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                Description
              </Label>
              <Input type='text' name='Description' id='cityMulti' placeholder='Description' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
                Add Accounts
              </Label>
              <Input type='text' name='Add Accounts' id='cityMulti' placeholder='Add Accounts' />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Rate Category
              </Label>
              <Input type='select' id='Select Room Type'>
                <option>---Select---</option>
                <option>CRS RATES</option>
                <option>HOTEL RATES</option>
                <option>NEGOTIATED</option>
                <option>qwrt</option>
              </Input>             
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Market Code
              </Label>
              <Input type='select' id='Market Code'>
                <option>---Select---</option>
                <option>ADHOC CORPORATEDHOC</option>
                <option>cOMP COMPLEMENTARY</option>
                <option>CVRG CORPORATE CONTRACT</option>
                <option>DAY USE</option>
                <option>GDS GDS</option>
                <option>OTA OTA</option>
                <option>PROMO PROMOTIONS</option>
                <option>RESCON RESIDENTIAL CONFERENCE</option>
                <option>RESSOC RESIDENTIAL SCHOOL </option>
                <option>RETAIL/FIT</option>
                <option>TA TRAVELAGENTS</option>
                <option>WEB THE OTERRA</option>
                <option>ZZZZ FOR PM DUMMY CODE</option>
              </Input>             
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Source
              </Label>
              <Input type='select' id='Market Code'>
                <option>---Select Source---</option>
                <option>Agoda - Agoda.com</option>
                <option>AMADEUS- AMADEUS</option>
                <option>BAR - BEST AVAILABLE RATES</option>
                <option>BHARTI- Bharti</option>
                <option>BKNG-BOOKING.COM</option>
                <option>BOOKING.COM- BOOKING.COM</option>
                <option>CATERING - CATERING SALES </option>
                <option>CLEARTRIP - CLEARTRIP</option>
                <option>EXPEDIA- EXPEDIA</option>
                <option>FIT - FIT</option>
                <option>GALLIEO- GALLIEO</option>
                <option>GO-GUEST DIRECT</option>
                <option>GO-MMT- GO-MMT</option>
                <option>GOIBOBO - GOIBOBO</option>
                <option>HAPPYEASYGO</option>
                <option>HAPPYEAZYGO-HAPPYEAZYGO</option>
                <option>HOTELBEDS - HOTELBEDS</option>
                <option>HOUSE-USE - HOUSE-USE</option>
                <option>HAPPYEAZYGO-HAPPYEAZYGO</option>
                <option>HRS - HRS</option>
                <option>IN - InternalHotelBooking</option>
                <option>MMT - MAKE MY TRIP</option>
                <option>OTHERS-OTHERS</option>
                <option>SABRE - SABRE</option>
                <option>SHRIKANT - SHRIKANT</option>
                <option>SOMRITA-SOMRITA</option>
                <option>TINU - TINU</option>
                <option>WALKIN - WALKIN</option>
                <option>WEB-HOTELWEBSITE</option>
                <option>WEEKEND - WEEKEND PACKAGE</option>
                <option>WORLDSPAN - WORLDSPAN</option>
                <option>ZZZZ FOR PM DUMMY CODE</option>
              </Input>             
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='cityMulti'>
              Select Room Type
              </Label>
              <Input type='select' id='Select Room Type'>
              <option>---Select---</option>
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
              <Label className='form-label' for='lastNameMulti'>
                Package
              </Label>
              <Input type='select' id='Package'>
                <option>---Select Package---</option>
                <option>AP</option>
                <option> CP</option>
                <option>EP </option>
                <option>MAP</option>
                <option>TATA AP </option>
                <option>Add New</option>
              </Input>             
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='lastNameMulti'>
                Transaction Code
              </Label>
              <Input type='select' id='Package'>
                <option>---Select---</option>
                <option>CRS RATES</option>
                <option>HOTEL RATES</option>
                <option>NEGOTIATED</option>
                <option>qwrt</option>
              </Input>             
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CountryMulti'>
              Active Status
              </Label>
              <Input type='select' id='Select Room'>
              <option>---Select---</option>
                <option>Active</option>
                <option>Non Active</option>                
              </Input>
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='CompanyMulti'>
                Rate Class ID
              </Label>
              <Input type='text' name='company' id='CompanyMulti' placeholder='Rate Class ID' />
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
