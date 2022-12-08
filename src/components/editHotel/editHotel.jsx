import './editHotel.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
const EditHotel = ({ hotel }) => {
    const [inforRooms, setInforRooms] = useState([]);
    const [show, setShow] = useState(false);

    const [name, setName] = useState(hotel.name);
    const [type, setType] = useState(hotel.type);
    const [city, setCity] = useState(hotel.city);
    const [address, setAdress] = useState(hotel.address);
    const [distance, setDistance] = useState(hotel.distance);
    const [title, setTitle] = useState(hotel.title);
    const [description, setDescription] = useState(hotel.desc);
    const [price, setPrice] = useState(hotel.cheapestPrice);
    const [photos, setPhotos] = useState(hotel.photos.toString());
    const [feature, setFeature] = useState(hotel.featured);
    const [rooms, setRooms] = useState(hotel.rooms);


    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/admin/inforrooms')
                .then(res => setInforRooms(res.data))
        }
        fetchData();
    }, [])

    const handleSend = () => {
        const editHotel = {
            _id: hotel._id,
            name: name,
            type: type,
            city: city,
            address: address,
            distance: distance,
            title: title,
            description: description,
            price: price,
            photos: photos,
            feature: feature,
            rooms: rooms
        }
        console.log(editHotel)
        axios.post('http://localhost:5000/admin/editHotel', editHotel)
            .then(res => {
                console.log(res?.data.message)
                if (res.data.message === "Hotel updated!") {
                    window.location.reload(false);
                }
            })
    }
    const handleClose = () => setShow(false);
    const handleShow = () => {
        const rooms = hotel.rooms
        let room = [];
        rooms.forEach(roomId => {
            const infRoom = inforRooms.find(inforRom => inforRom._id === roomId)
            if (infRoom) {
                room.push(infRoom.title)
            }
            setRooms(room)
        })
        setShow(true)
    };

    const handleChangeNormalSelect = e => {
        const updatedOptions = [...e.target.options]
            .filter(option => option.selected)
            .map(x => x.value);
        console.log("updatedOptions", updatedOptions);
        setRooms(updatedOptions);
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
                {/* <form className="form"> */}
                <Modal.Header closeButton>
                    <Modal.Title>Edit Hotel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div className='chart'> */}
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="text" value={name} name="name" className="form-control" onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="type">Type</label>
                                <input type="text" value={type} name="type" className="form-control" onChange={(e) => { setType(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="city">City</label>
                                <input type="text" value={city} name="city" className="form-control" onChange={(e) => { setCity(e.target.value) }} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="address">Address</label>
                                <input type="text" value={address} name="address" className="form-control" onChange={(e) => { setAdress(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="distance">Distance from City Center</label>
                                <input type="number" value={distance} name="distance" className="form-control" onChange={(e) => { setDistance(e.target.value) }} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="title">Title</label>
                                <input type="text" value={title} name="title" className="form-control" onChange={(e) => { setTitle(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="description">Description</label>
                                <input type="text" value={description} name="description" className="form-control" onChange={(e) => { setDescription(e.target.value) }} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="price">Price</label>
                                <input type="number" value={price} name="price" className="form-control" onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="photos">Images</label>
                                <textarea className="form-control" value={photos} name="photos" rows="2" onChange={(e) => { setPhotos(e.target.value) }}></textarea>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="feature">Feature</label>
                                <select className="form-control" name="feature" value={feature === false ? 'No' : 'Yes'} onChange={(e) => { setFeature(e.target.value) }}>
                                    <option>No</option>
                                    <option>Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="rooms">Rooms</label>
                            <select multiple className="form-control" name="rooms" value={rooms} onChange={handleChangeNormalSelect}>
                                {inforRooms?.map(room => {
                                    return (
                                        <option key={room._id}>{room.title}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    {/* <div className="button">
                            <button type="submit" className="btn btn-primary btn-block mb-4">Send</button>
                        </div>
                        // </div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSend} >Send</Button>
                </Modal.Footer>
                {/* </form> */}
            </Modal >
        </div >
    )
}

export default EditHotel