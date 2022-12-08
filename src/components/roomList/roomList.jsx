import './roomList.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EditRoom from '../editRoom/editRoom';

const RoomList = () => {
    const navigate = useNavigate();
    const [inforRooms, setInforRooms] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/admin/inforrooms')
                .then(res => setInforRooms(res.data))
        }

        fetchData();
    }, [])
    const handleDelete = (e) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.post('http://localhost:5000/admin/deleteroom', {
                            roomId: e.target.value
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
                <h1>Rooms List</h1>
                <button type="button" className="btn btn-outline-success" onClick={() => navigate('/newroom')} >Add New</button>
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
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Max People</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {inforRooms?.map(room => {
                        return (
                            <tr key={room._id}>
                                <td scope="row">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </div>
                                </td>
                                <td>{room._id}</td>
                                <td>{room.title}</td>
                                <td>{room.desc}</td>
                                <td>{room.price}</td>
                                <td>{room.maxPeople}</td>
                                <td><button type="button" value={room._id} className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
                                </td>
                                <td>
                                    <EditRoom room={room} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RoomList