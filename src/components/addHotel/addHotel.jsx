import './addHotel.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddHotel = () => {
    const navigate = useNavigate();
    const [inforRooms, setInforRooms] = useState([]);
    const { register, handleSubmit } = useForm()
    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/admin/inforrooms')
                .then(res => setInforRooms(res.data))
        }
        fetchData();
    }, [])
    const handleSend = (reg) => {
        console.log(reg)
        axios.post('http://localhost:5000/admin/addHotel', reg)
            .then(res => {
                if (res.data.message === "Hotel created!") {
                    navigate('/hotel')
                }
            })
    }
    return (
        <div>
            <div className='chart'>
                <h1>New Hotel</h1>
            </div>
            <div className='chart'>
                <form className="form" onSubmit={handleSubmit(handleSend)}>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="name">Name</label>
                                <input type="text" name="name" className="form-control" {...register('name', { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="type">Type</label>
                                <input type="text" name="type" className="form-control" {...register('type', { required: true })} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="city">City</label>
                                <input type="text" name="city" className="form-control" {...register('city', { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="address">Address</label>
                                <input type="text" name="address" className="form-control" {...register('address', { required: true })} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="distance">Distance from City Center</label>
                                <input type="number" name="distance" className="form-control" {...register('distance', { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="title">Title</label>
                                <input type="text" name="title" className="form-control" {...register('title', { required: true })} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="description">Description</label>
                                <input type="text" name="description" className="form-control" {...register('description', { required: true })} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="price">Price</label>
                                <input type="number" name="price" className="form-control" {...register('price', { required: true })} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="photos">Images</label>
                                <textarea className="form-control" name="photos" rows="2" {...register('photos', { required: true })}></textarea>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="feature">Feature</label>
                                <select className="form-control" name="feature" {...register('feature', { required: true })}>
                                    <option>No</option>
                                    <option>Yes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="rooms">Rooms</label>
                            <select multiple className="form-control" name="rooms" {...register('rooms', { required: true })}>
                                {inforRooms?.map(room => {
                                    return (
                                        <option key={room._id}>{room.title}</option>
                                    )
                                })}
                            </select>
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

export default AddHotel