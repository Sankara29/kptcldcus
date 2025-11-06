// ** React Imports
import { useEffect } from 'react'
import './a.scss'
// ** Reactstrap Imports
import { Row, Col, Table } from 'reactstrap'

// ** Styles
import '@styles/base/pages/app-invoice-print.scss'

const Print = () => {
  // ** Print on mount
  useEffect(() => {
    setTimeout(() => window.print(), 50)
  }, [])

  let getData = JSON.parse(localStorage.getItem('data1'))
  console.log(getData['id'])


  return (
<div>
<div class="fixed-header">
    <div class="container">
    <div className='row'>
    <div class="col-sm-2">
      <img style={{  width: '60px', height: '60px' }}/>
    </div>
    <div class="col-sm-10">
    <h2 style={{'text-align': 'center'}}><b> THE OTERRA</b></h2>
    <p style={{fontSize:'12px' ,'text-align': 'center'}}><b> <u>A DIVISION OF VELANKANI INFORMATION SYSTEMS LTD </u> <br/>
   <b> 43, Housur Road, Electronic City Phase 1, Bengaluru, Karnataka - 560100 <br></br> </b>
    <b style={{fontSize:'10px', 'text-align': 'center'}}> +918030030303 / +919916287571 </b> 
    <b style={{fontSize:'10px' , 'text-align': 'center' }}> www.theoterra.com </b>  
      </b>
      <div className='row'>
      <div class="col-sm-8">
       <p style={{fontSize:'10px' , 'text-align': 'right'}}>GSTIN:29AABCV0552G1ZF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </div> 
      <div class="col-sm-1"></div>  
      <div class="col-sm-3"><p style={{fontSize:'10px' , 'text-align': 'left'}}> <b>Bill Date:</b> {getData["departureDate"]}</p>  </div>  
     </div>
     </p> </div></div>
      <div></div>
          jjjjjjjjjjjjjjjj
       
    </div>
</div>
<div class="container">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...
    <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>  
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>  
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
    </p>
</div>    
<div class="fixed-footer">
    <div class="container" style={{borderBottom:'1px solid black'}}>
    <div class='row' style={{borderBottom:'1px solid black'}}>
      <div class="col-sm-4 footer-col"> Cashier Signature </div>
      <div class="col-sm-4 footer-col"> Duty Manager Signature </div>
      <div class="col-sm-4 footer-col"> Guest Signature </div>
      </div>
      <div class='row'>
      <p>Service Accounting Codes :Tariff:996311</p>
      </div>      
    </div>        
</div>
</div>
  )
}

export default Print
