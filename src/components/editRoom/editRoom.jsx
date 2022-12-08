import './editRoom.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
const EditRoom = ({ room }) => {
    const [inforHotels, setInforHotels] = useState([]);
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState(room.title);
    const [description, setDescription] = useState(room.desc);
    const [roomNumbers, setRoomNumbers] = useState(room.roomNumbers);
    const [maxpeople, setMaxpeople] = useState(room.maxPeople);
    const [price, setPrice] = useState(room.price);

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/admin/inforhotels')
                .then(res => setInforHotels(res.data))
        }
        fetchData();
    }, [])
    const handleSend = () => {
        const editRoom = {
            _id: room._id,
            title: title,
            description: description,
            price: price,
            maxpeople: maxpeople,
            roomNumbers: roomNumbers
        }
        console.log(editRoom)
        axios.post('http://localhost:5000/admin/editroom', editRoom)
            .then(res => {
                console.log(res?.data.message)
                if (res.data.message === "Room updated!") {
                    window.location.reload(false);
                }
            })
    }
    const handleClose = () => setShow(false);
    const handleShow = () => {
        console.log(room)
        setShow(true)
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-warning" onClick={handleShow}>Edit</button>
            <Modal
                size='lg'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='chart'>
                        {/* <form className="form"> */}
                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="name">Title</label>
                                    <input type="text" value={title} name="title" className="form-control" onChange={(e) => { setTitle(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="type">Description</label>
                                    <input type="text" value={description} name="description" className="form-control" onChange={(e) => { setDescription(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="city">Price</label>
                                    <input type="number" value={price} name="price" className="form-control" onChange={(e) => { setPrice(e.target.value) }} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="address">Max People</label>
                                    <input type="number" value={maxpeople} name="maxpeople" className="form-control" onChange={(e) => { setMaxpeople(e.target.value) }} />
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="photos">Rooms</label>
                                    <textarea className="form-control" value={roomNumbers} name="Rooms" rows="2" onChange={(e) => { setRoomNumbers(e.target.value) }}></textarea>
                                </div>
                            </div>
                            {/* <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="rooms">Choose a hotel</label>
                                    <select className="form-control" name="hotel" onChange={() => { }}>
                                        {inforHotels?.map(hotel => {
                                            return (
                                                <option key={hotel._id}>{hotel.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div> */}
                        </div>
                        {/* <div className="button">
                                <button type="submit" className="btn btn-primary btn-block mb-4">Send</button>
                            </div> */}
                        {/* </form> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSend}>Send</Button>
                </Modal.Footer>
            </Modal >
        </div >
    )
}

export default EditRoom