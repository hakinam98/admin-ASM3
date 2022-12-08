import './room.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import RoomList from '../../components/roomList/roomList'

const Room = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="charts">
                    <RoomList />
                </div>
            </div>
        </div>
    )
}

export default Room