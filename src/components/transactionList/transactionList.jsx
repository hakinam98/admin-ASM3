import './transactionList.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

const TransList = () => {
    const [infoTrans, setInforTrans] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:5000/admin/infortrans')
                .then(res => setInforTrans(res.data))
        }

        fetchData();
    }, [])
    return (
        <div className='chart'>
            <div className="title">
                <h1>Transactions List</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                </div>
                            </th>
                            <th scope="col">Id</th>
                            <th scope="col">User</th>
                            <th scope="col">Hotel</th>
                            <th scope="col">Room</th>
                            <th scope="col">Date</th>
                            <th scope="col">Price</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infoTrans.trans?.map(tran => {
                            return (
                                <tr key={tran._id}>
                                    <th scope="row">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        </div>
                                    </th>
                                    <td>{tran._id}</td>
                                    <td>{tran.user}</td>
                                    <td>{tran.hotel.name}</td>
                                    <td>{tran.room.toString()}</td>
                                    <td>{new Date(tran.dateStart).getDate() + "/" + new Date(tran.dateStart).getMonth() + "/" + new Date(tran.dateStart).getFullYear()
                                        + " - " + new Date(tran.dateEnd).getDate() + "/" + new Date(tran.dateEnd).getMonth() + "/" + new Date(tran.dateEnd).getFullYear()
                                    }</td>
                                    <td>${tran.price}</td>
                                    <td>{tran.payment}</td>
                                    <td><span className={tran.status === 'Booked' ? 'statusBooked' : (tran.status === 'Checkin' ? 'statusCheckin' : 'statusCheckout')}>{tran.status}</span></td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default TransList