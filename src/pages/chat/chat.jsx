import './chat.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import ChatForm from '../../components/chatform/chatform'

const Products = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <ChatForm />
            </div>
        </div>
    )
}

export default Products