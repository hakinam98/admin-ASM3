import './addRoom.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
    const navigate = useNavigate();
    const [inforHotels, setInforHotels] = useState([]);
    const { register, handleSubmit } = useForm()
    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/admin/inforhotels')
                .then(res => setInforHotels(res.data))
        }
        fetchData();
    }, [])
    const handleSend = (reg) => {
        console.log(reg)
        axios.post('http://localhost:5000/admin/addRoom', reg)
            .then(res => {
                if (res.data.message === "Room created!") {
                    navigate('/room')
                }
            })
    }
    return (
        <div>
            <div className='chart'>
                <h1>New Room</h1>
            </div>
            <div className='chart'>
                <form className="form" onSubmit={handleSubmit(handleSend)}>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="name">Title</label>
                                <input type="text" name="title" className="form-control" {...register('title', { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="type">Description</label>
                                <input type="text" name="description" className="form-control" {...register('description', { required: true })} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="city">Price</label>
                                <input type="number" name="price" className="form-control" {...register('price', { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="address">Max People</label>
                                <input type="number" name="maxpeople" className="form-control" {...register('maxpeople', { required: true })} />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="photos">Rooms</label>
                                <textarea className="form-control" name="Rooms" rows="2" {...register('rooms', { required: true })}></textarea>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="rooms">Choose a hotel</label>
                                <select className="form-control" name="hotel" {...register('hotel', { required: true })}>
                                    {inforHotels?.map(hotel => {
                                        return (
                                            <option key={hotel._id}>{hotel.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="button">
                        <button type="submit" className="btn btn-primary btn-block mb-4">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRoom