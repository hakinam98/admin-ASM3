import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import DashBoard from '../../components/dashboard/dashboard'

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className='widgets'>
          <Widget type='users' />
          <Widget type='orders' />
          <Widget type='earnings' />
          <Widget type='balance' />
        </div>
        <div className="charts">
          {/* <Feature /> */}
          <DashBoard />
        </div>
      </div>
    </div>
  )
}

export default Home