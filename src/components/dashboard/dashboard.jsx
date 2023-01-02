import './dashboard.scss'
import { useEffect, useState } from 'react';
import convertMoney from '../../convertMoney'
import axiosClient from '../API/axiosClient'


const DashBoard = () => {
  const [inforOrders, setInforOrders] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axiosClient.get('/admin/infororders')
        .then(res => setInforOrders(res.orders))
    }

    fetchData();
  }, [])
  return (
    <div className='chart'>
      <div className="title">
        <h1>Lates Order</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                </div>
              </th>
              <th scope="col">Id User</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Total</th>
              <th scope="col">Delivery</th>
              <th scope="col">Status</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {inforOrders?.map(order => {
              return (
                <tr key={order._id}>
                  <th scope="row">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    </div>
                  </th>
                  <td>{order.idUser}</td>
                  <td>{order.fullname}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{convertMoney(order.total)} VND</td>
                  <td>{order.delivery === false ? 'Chưa vận chuyển' : 'Đã vận chuyển'}</td>
                  <td>{order.status === false ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                  <td><button type="button" value={order._id} className="btn btn btn-success">View</button>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div >
  )
}

export default DashBoard