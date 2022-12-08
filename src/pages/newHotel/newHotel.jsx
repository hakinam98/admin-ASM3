import './newHotel.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import AddHotel from '../../components/addHotel/addHotel'

const NewHotel = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
        </div>
        <AddHotel />
      </div>
    </div>
  )
}

export default NewHotel