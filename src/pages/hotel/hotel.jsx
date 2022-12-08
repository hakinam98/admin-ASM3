import './hotel.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import HotelList from '../../components/hotelList/hotelList'

const Hotel = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                {/* <div className='widgets'>
                    <Widget type='users' />
                    <Widget type='orders' />
                    <Widget type='earnings' />
                    <Widget type='balance' />
                </div> */}
                <div className="charts">
                    <HotelList />
                </div>
            </div>
        </div>
    )
}

export default Hotel