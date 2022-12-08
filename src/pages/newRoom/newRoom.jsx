import './newRoom.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import AddRoom from '../../components/addRoom/addRoom'

const NewRoom = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="charts">
                </div>
                <AddRoom />
            </div>
        </div>
    )
}

export default NewRoom