import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import BedroomParentSharpIcon from '@mui/icons-material/BedroomParentSharp';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const navigation = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user')
    navigation('/')
  }
  return (
    <div className='sidebar'>
      <div className='top'>
        <span className='logo'>Admin Page</span>
      </div>
      <hr />
      <div className='center'>
        <ul>
          <p className="title">MAIN</p>
          <a onClick={() => navigation('/admin')}>
            <li>
              <DashboardIcon className='icon' />
              <span>Dashboard</span>
            </li>
          </a>
          <p className="title">LISTS</p>
          <li>
            <GroupIcon className='icon' />
            <span>Users</span>
          </li>
          <a onClick={() => navigation('/hotel')}>
            <li>
              <ApartmentSharpIcon className='icon' />
              <span>Hotels</span>
            </li>
          </a>
          <a onClick={() => navigation('/room')}>
            <li>
              <BedroomParentSharpIcon className='icon' />
              <span>Rooms</span>
            </li>
          </a>
          <a onClick={() => navigation('/transaction')}>
            <li>
              <ReceiptLongSharpIcon className='icon' />
              <span>Transactions</span>
            </li>
          </a>
          <p className="title">New</p>
          <a onClick={() => navigation('/newhotel')}>
            <li>
              <ApartmentSharpIcon className='icon' />
              <span>New Hotel</span>
            </li>
          </a>
          <a onClick={() => navigation('/newroom')}>

            <li>
              <BedroomParentSharpIcon className='icon' />
              <span>New Room</span>
            </li>
          </a>
          <p className="title">User</p>
          <a onClick={handleLogout}>
            <li>
              <ExitToAppIcon className='icon' />
              <span>Logout</span>
            </li>
          </a>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar