// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { Printer, User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import API_URL from '../../../../config'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)

  localStorage.setItem('userData','{"id":1,"fullName":"John Doe","username":"johndoe","avatar":"/src/assets/images/portrait/small/avatar-s-11.jpg","email":"admin@demo.com","role":"admin","ability":[{"action":"manage","subject":"all"}],"extras":{"eCommerceCartItemsCount":5},"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc4MzQ2NzI1LCJleHAiOjE2NzgzNDczMjV9.fjMZ4a_8wjCQ6bi_x5tjSwMle2ZmZ4ttX236bSC9oi4","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc4MzQ2NzI1LCJleHAiOjE2NzgzNDczMjV9.kYUdOeXrPxhN2FdNM1AK-mnoPebviPv9eBi-v0QP-zc"}')






  const logoutfun =()=>{
    fetchx(API_URL + "/logout", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      // console.log(res)
      if (res.status == 200) {
        // console.log("Logout called")
        dispatch(handleLogout())
       }
       else{
        // console.log("check the logout functions")
       }
    })
  }
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none' >
        <Printer size={16} className='printer' onClick={() => window.print()}/>
          <span className='user-name fw-bold'>{sessionStorage.getItem('userName')}</span>
          {/* <span className='user-status'>{(userData && userData.role) || 'Admin'}</span> */}
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      {/* <h4> Test PMS Oterra</h4> */}
      <DropdownMenu end>
        <DropdownItem tag={Link} to='/login' onClick={() => (logoutfun())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown