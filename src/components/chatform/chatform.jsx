import React from "react";
import './chatform.scss'
import io from 'socket.io-client';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosClient from '../API/axiosClient'

const socket = io('https://backend-asm3-kappa.vercel.app', { transports: ['websocket'] });

const ChatForm = () => {
    const [textMessage, setTextMessage] = useState('');
    const [message, setMessage] = useState();
    const [roomList, setRoomList] = useState([]);
    const [roomId, setRoomId] = useState('');
    const [load, setLoad] = useState(false);

    const fetchDataRoom = async () => {
        axiosClient.get('/chatrooms/getroomid')
            .then(res => {
                const rooms = res.chats;
                rooms.sort((a, b) => b.createdAt - a.createdAt)
                setRoomList(rooms)
            })
    }
    useEffect(() => {
        fetchDataRoom();
    }, []);
    const onChangeText = (e) => {
        setTextMessage(e.target.value);
    };
    const handlerSend = async () => {
        const data = {
            message: textMessage,
            roomId: roomId,
            is_admin: true,
        };
        await axiosClient.put('/chatrooms/addMessage', data)
        setTextMessage('');
        setTimeout(() => {
            setLoad(true);
            socket.emit('send_message_server', data);
        }, 200);

    };

    const fetchData = async () => {
        const response = await axiosClient.get(`/chatrooms/getById?roomId=${roomId}`);
        setMessage(response.content);
    };


    useEffect(() => {
        if (load) {
            fetchData();
            fetchDataRoom();
            setLoad(false);
        }
    }, [load]);

    useEffect(() => {
        socket.on('receive_message_server', (data) => {
            setLoad(true);
        });
    }, []);
    useEffect(() => {
        socket.on('end_room', (data) => {
            setMessage([])
            setLoad(true);
        });
    }, []);
    return (
        <div className="row overflow-hidden">
            <div className="col-5">
                <div className="bg-white">
                    <div className="bg-gray bg-light">
                        <p className="h5 mb-0 py-3">Recent</p>
                    </div>
                    <div className="messages-box">
                        <div className="list-group rounded-0">
                            {roomList?.map(room => {
                                return (
                                    <a className="list-group-item list-group-item-action active text-white rounded-0"
                                        key={room._id} onClick={() => {
                                            setRoomId(room._id);
                                            setLoad(true);
                                        }}
                                    >
                                        <li>
                                            <div className="media"><img src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="user" width="50" className="rounded-circle" />
                                                <div className="media-body ml-4">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <h6 className="mb-0">{room._id}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </a>

                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-7 px-0">
                <div className="px-4 py-5 chat-box bg-white">
                    {message &&
                        message.map((value, index) =>
                            !value.is_admin ? (
                                <div className="d-flex flex-row" key={index}>
                                    <div className="media w-50 mb-3"><img src="https://therichpost.com/wp-content/uploads/2020/06/avatar2.png" alt="user" width="50" className="rounded-circle" />
                                        <div className="media-body ml-3">
                                            <div className="bg-light rounded py-2 px-3 mb-2">
                                                <p className="text-small mb-0 text-muted">Client: {value.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex flex-row-reverse" key={index}>
                                    <div className="media w-50 ml-auto mb-3 ">
                                        <div className="media-body ">
                                            <div className="bg-primary rounded py-2 px-3 mb-2">
                                                <p className="text-small mb-0 text-white">You: {value.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )

                        )}


                </div>
                <div className="input-group">
                    <input type="text" placeholder="Type a message" aria-describedby="button-addon2" className="form-control rounded-0 border-0 py-2 bg-light"
                        onChange={onChangeText}
                        value={textMessage}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handlerSend();
                            }
                        }}
                    />
                    <div className="input-group-append">
                        <button id="button-addon2" type="button" className="btn btn-link" onClick={handlerSend}> <i className="fa fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </div>

        // <div classNameName="d-flex flex-row chat-room">
        //     <div classNameName=" d-flex flex-column">
        //         <div classNameName='search'>
        //             <label>Seach Room</label>
        //             <input type='text' />
        //         </div>
        //         <div classNameName='ps-container ps-theme-default ps-active-y fix_scoll'>
        //             <ul>
        //                 {roomList?.map(room => {
        //                     return (

        //                         <a key={room._id} onClick={() => {
        //                             setRoomId(room._id);
        //                             setLoad(true);
        //                         }}>
        //                             <li>
        //                                 <div classNameName="d-flex search-item">
        //                                     <img
        //                                         classNameName='avatar avatar-xs'
        //                                         src='https://img.icons8.com/color/36/000000/administrator-male.png'
        //                                         alt='...'
        //                                     />
        //                                     <h5>{room._id}</h5>
        //                                 </div>
        //                             </li>
        //                         </a>
        //                     )
        //                 })}
        //             </ul>
        //         </div>
        //     </div>
        //     <div className="chat-box ">
        //         <div className='ps-container ps-theme-default ps-active-y fix_scoll'>
        //             {message &&
        //                 message.map((value, index) =>
        //                     value.is_admin ? (
        //                         <div
        //                             className='media media-chat media-chat-reverse'
        //                             key={index}>
        //                             <div className='media-body'>
        //                                 <p>You: {value.message}</p>
        //                             </div>
        //                         </div>
        //                     ) : (
        //                         <div
        //                             className='media media-chat'
        //                             key={index}>
        //                             {' '}
        //                             <img
        //                                 className='avatar'
        //                                 src='https://img.icons8.com/color/36/000000/administrator-male.png'
        //                                 alt='...'
        //                             />
        //                             <div className='media-body' key={index}>
        //                                 <p>Client: {value.message}</p>
        //                             </div>
        //                         </div>
        //                     )
        //                 )}
        //         </div>
        //         <div className='publisher bt-1 border-light'>
        //             <img
        //                 className='avatar avatar-xs'
        //                 src='https://img.icons8.com/color/36/000000/administrator-male.png'
        //                 alt='...'
        //             />
        //             <input
        //                 type='text'
        //                 placeholder='Enter Message!'
        //                 style={{ width: "80%" }}
        //                 onChange={onChangeText}
        //                 value={textMessage}
        //                 onKeyPress={(e) => {
        //                     if (e.key === 'Enter') {
        //                         handlerSend();
        //                     }
        //                 }}
        //             />
        //             <a
        //                 onClick={handlerSend}
        //                 className='publisher-btn text-info'
        //                 data-abc='true'>
        //                 <i className='fa fa-paper-plane'></i>
        //             </a>
        //         </div>
        //     </div>
        // </div>
    )
}
export default ChatForm;