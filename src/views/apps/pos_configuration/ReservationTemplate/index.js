// ** React Imports
import { useEffect, useState } from 'react'
import { Card, CardBody, CardText, Row, Col, Table } from 'reactstrap'
import { format } from "date-fns";
import logo from '@src/assets/images/logo/oterra.jpg';
import img1 from '@src/assets/images/logo/image1.jpeg'
import img2 from '@src/assets/images/logo/image2.jpeg'
import room1 from '@src/assets/images/logo/room1.jpeg'
import spa from '@src/assets/images/logo/spa.jpeg'
import dinning from '@src/assets/images/logo/dinning.jpeg'
import poolside from '@src/assets/images/logo/poolside.jpeg'



// ** Reactstrap Imports

// ** Styles
import '@styles/base/pages/app-invoice-print.scss'
import { fontStyle, height } from '@mui/system';
import { Italic } from 'react-feather';

const Template = () => {
    useEffect(() => {

        // setTimeout(() => window.print(), 500)
    }, [])


    return (
        <div>
            <div>
                <div className='d-flex mb-1'>
                    <img style={{marginLeft:'550px', textAlign: 'center' }} src={logo} alt="Logo" />

                </div>

            </div>

            <Card>
                <img style={{ textAlign: 'center' , height: '400px', width: '1300px'}} src={img2} alt="Logo" />
            </Card>
            <p>Dear Mr. Deshpande,</p>
            <p>We are pleased to confirm the following reservation and look forward to welcoming you at The Oberoi, Bengaluru. Should you require further assistance with your reservation, please contact us via return e-mail or by calling 91-80-25585858.</p>
            <p>Sincerely,</p>
            <p>Reservations Team</p>

            <hr className='my-2' />
            <Card style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
                {/* <CardItem header> */}
                <Row>
                    <Col sm='6'>
                        <h4 style={{ 'margin-left': '10px', color: '#df9254' }}>Hotel Details</h4>
                        <hr className='my-2' />
                        {/* <p>map img</p> */}
                        <img alt="The Oterra Bengaluru Electronics City Map" class="tile-media" src="https://maps.google.com/maps/api/staticmap?channel=expedia-HotelInformation&amp;size=528x297&amp;zoom=14&amp;sensor=false&amp;format=png8&amp;maptype=roadmap&amp;center=12.850732,77.660165&amp;markers=icon:https://b.travel-assets.com/flex/flex-web/hotelInfoSite/map-icon-c.png%7C12.850732,77.660165&amp;key=AIzaSyC6TZaOcklGb2r2g1eLczEZk324JD7TvM4&amp;signature=LPMTROJ-TlSS5wH_W9GWNwqM4Xg="></img>
                        <p style={{ 'margin-left': '10px', color: '#df9254', fontStyle: 'Italic' }}>The Oterra</p>
                    </Col>
                    <Col sm='6'>
                        <h4>Confirmation Number : <span style={{ 'margin-left': '10px', color: '#df9254' }}>5269SE105086</span> </h4>
                        <hr className='my-2' />
                        <p>Name:	Mr. Mihir Deshpande</p>
                        <p>Phone:	</p>
                        <p>Email:	quantaoflight@gmail.com</p>
                        <hr className='my-2' />
                        <Row>
                            <Col sm='6'>
                                <p>Check-In</p>
                                <p>Date: Sunday, May 7, 2023</p>
                                <p>Time: 14:00 (2:00 PM)</p>
                            </Col>
                            <Col sm='6'>
                                <p>Check-Out</p>
                                <p>Date: Monday, May 8, 2023</p>
                                <p>Time: 12:00 (12:00 PM)</p>
                            </Col>
                        </Row>
                        <hr className='my-2' />
                        <Row>
                            <Col sm='6'>
                                <p>No. of Nights - 1</p>
                                <p>No. of Rooms - 1</p>
                            </Col>
                            <Col sm='6'>
                                <p>No. of Adults - 2</p>
                                <p>No. of Children - 0</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                {/* </CardItem> */}
            </Card>
            <Row>
                <Col sm='6'>
                    <h4 style={{ 'margin-left': '10px', color: '#df9254', 'marginTop': '60px' }}>Applicable Charges</h4>
                    <hr className='my-2' />
                    <Row>
                        <Col sm='6'>
                            <h6 style={{ 'margin-left': '10px' }}> <b>Price</b> (per room per night)</h6>
                        </Col>
                        <Col sm='6'>
                            <p>INR 10,800.00</p>
                        </Col>
                        <hr className='my-1' />
                    </Row>
                    <Row>
                        <Col sm='6'>
                            <h6 style={{ 'margin-left': '10px' }}> Total</h6>
                        </Col>
                        <Col sm='6'>
                            <p>INR 10,800.00</p>
                        </Col>
                        <hr className='my-1' />
                    </Row>
                    <Row>
                        <Col sm='6'>
                            <h6 style={{ 'margin-left': '10px' }}> Taxes</h6>
                        </Col>
                        <Col sm='6'>
                            <p>INR 1,944.00</p>
                        </Col>
                        <hr className='my-1' />
                    </Row>
                    <Row>
                        <Col sm='6'>
                            <h6 style={{ 'margin-left': '10px' }}> Total</h6>
                        </Col>
                        <Col sm='6'>
                            <p>INR 12,744.00</p>
                        </Col>
                        <hr className='my-1' />
                    </Row>
                    <p>Modify Reservation link</p>
                </Col>
                <Col sm='6'>
                    <h4 style={{ 'margin-left': '10px', color: '#df9254' }}>Room Details</h4>
                    <hr className='my-2' />
                    <img style={{ textAlign: 'center' }} src={room1} alt="Logo" />
                    <p style={{ color: '#df9254', fontStyle: 'Italic' }}>Deluxe Room with Private Balcony.</p>
                    <p>Enjoy garden views from the comfortable interior or the private balcony..</p>

                    <Row>
                        <Col sm='6'>
                            <h6> View</h6>
                        </Col>
                        <Col sm='6'>
                            <p>Garden view</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='6'>
                            <h6> Room Size</h6>
                        </Col>
                        <Col sm='6'>
                            <p>32 square metres</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Card style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
                {/* <CardItem header> */}
                <Row>
                    {/* <Col sm='6'> */}
                    <h4 style={{ 'margin-left': '10px', color: '#df9254' }}>Rate Description</h4>
                    <hr className='my-2' />
                    <h6 style={{ 'margin-left': '10px', color: '#df9254', fontStyle: 'Italic' }}>Weekend Escapes - Member Exclusive</h6>
                    <p style={{ 'margin-left': '10px', }}>Check in for a relaxing weekend city break with our offer that includes breakfast in the restaurant, 20% savings on food and soft beverages and laundry services, happy hours (buy one drink and enjoy the second drink with our compliments) between 6 pm to 8 pm at the bar, early check-in and late check-out (subject to availability) and Internet access. Meals for children up to 6 years are complimentary. For children between 6-12 years, a meal is at 50% of the parent’s meal, and for children above 12 years meal is at full charge.</p>

                    <h6 style={{ 'margin-left': '10px', color: '#df9254', fontStyle: 'Italic' }}>Cancellation Policy</h6>
                    <p style={{ 'margin-left': '10px', }}>Credit Card Guarantee required at the time of reservation. Guaranteed reservations may be cancelled 02 days prior to date of arrival without any cancellation charge. Cancellations received less than 02 days prior to arrival will incur 100% cancellation charge of the entire stay including applicable taxes and fees.</p>

                    {/* </Col> */}
                </Row>
            </Card>
            <Row>
                <Col sm='4'>
                    <img style={{ textAlign: 'center', height: '200px', width: '400px' }} src={poolside} alt="Logo" />
                </Col>
                <Col sm='4'>
                    <img style={{ textAlign: 'center', height: '200px', width: '400px' }} src={dinning} alt="Logo" />
                </Col>
                <Col sm='4'>
                    <img style={{ textAlign: 'center', height: '200px', width: '400px' }} src={spa} alt="Logo" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col sm='4'>
                    <Card style={{ backgroundColor: '#f1f1f1' }}>
                        <h4>Connect with The Oterra </h4>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default Template