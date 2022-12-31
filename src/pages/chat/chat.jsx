import './chat.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chat from '../../components/chat/chat'
import ChatForm from '../../components/chatform/chatform'

const Products = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                {/* <Chat /> */}
                <ChatForm />
            </div>
        </div>
    )
}

export default Products