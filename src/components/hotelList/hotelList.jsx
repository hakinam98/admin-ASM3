import './hotelList.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditHotel from '../editHotel/editHotel';
const HotelList = () => {
    const navigate = useNavigate();
    const [infoHotels, setInforHotels] = useState([]);


    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/admin/inforhotels')
                .then(res => setInforHotels(res.data))
        }

        fetchData();
    }, ['http://localhost:5000/admin/inforhotels'])
    const handleDelete = (e) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post('http://localhost:5000/admin/deletehotel', {
                            hotelId: e.target.value
                        }).then(result => {
                            console.log(result.data.message)
                        })
                        window.location.reload(false);
                    }
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });

    }




    return (
        <div className='chart'>
            <div className="title d-flex justify-content-between">
                <h1>Hotels List</h1>
                <button type="button" className="btn btn-outline-success" onClick={() => navigate('/newhotel')} >Add New</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                        </th>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Title</th>
                        <th scope="col">City</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {infoHotels?.map(hotel => {
                        return (
                            <tr key={hotel._id}>
                                <td scope="row">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </div>
                                </td>
                                <td>{hotel._id}</td>
                                <td>{hotel.name}</td>
                                <td>{hotel.type}</td>
                                <td>{hotel.title}</td>
                                <td>{hotel.city}</td>
                                <td><button type="button" value={hotel._id} className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
                                </td>
                                <td>
                                    <EditHotel hotel={hotel} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>



        </div >
    )
}

export default HotelList