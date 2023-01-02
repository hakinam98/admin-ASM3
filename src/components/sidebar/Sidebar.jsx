import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FiberNewOutlinedIcon from '@mui/icons-material/FiberNewOutlined';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const navigation = useNavigate();
  const role = JSON.parse(localStorage.getItem('role'));
  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
    navigation('/')
    window.location.reload(false)
  }
  if (role === 'admin') {
    return (
      <div className='sidebar'>
        <div className='top'>
          <span className='logo'>Admin Page</span>
        </div>
        <hr />
        <div className='center'>
          <ul>
            <p className="title">MAIN</p>
            <a onClick={() => navigation('/')}>
              <li>
                <DashboardIcon className='icon' />
                <span>Dashboard</span>
              </li>
            </a>
            <p className="title">LISTS</p>
            <a onClick={() => navigation('/products')}>
              <li>
                <ReceiptLongSharpIcon className='icon' />
                <span>Products</span>
              </li>
            </a>
            <a onClick={() => navigation('/chat')}>
              <li>
                <ChatOutlinedIcon className='icon' />
                <span>Chat</span>
              </li>
            </a>
            <p className="title">New</p>
            <a onClick={() => navigation('/newproduct')}>
              <li>
                <FiberNewOutlinedIcon className='icon' />
                <span>New Product</span>
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
  else {
    return (
      <div className='sidebar'>
        <div className='top'>
          <span className='logo'>Admin Page</span>
        </div>
        <hr />
        <div className='center'>
          <ul>
            <a onClick={() => navigation('/')}>
              <li>
                <ChatOutlinedIcon className='icon' />
                <span>Chat</span>
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
}

export default Sidebar