import './chat.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ChatForm from '../chatform/chatform';
const Chat = () => {
    const [inforProducts, setinforproducts] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/admin/inforproducts')
                .then(res => setinforproducts(res.data.products))
        }

        fetchData();
    }, [])
    const message = [];
    return (
        <div className='chart'>
            <div className="title">
                <h1>Chat</h1>
                <ChatForm />
            </div>
        </div>
    )
}

export default Chat