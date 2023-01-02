import './widget.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';
import convertMoney from '../../convertMoney';
import axiosClient from '../API/axiosClient';


const Widget = ({ type }) => {
    const [infoUsers, setInforUsers] = useState({});
    const [inforOrders, setInforOrders] = useState({});

    useEffect(() => {
        async function fetchData() {
            await axiosClient.get('/admin/inforusers')
                .then(res => setInforUsers(res))
            await axiosClient.get('/admin/infororders')
                .then(res => setInforOrders(res))
        }

        fetchData();
    }, [])
    let data;
    // temporary amount of money
    const amount = Math.floor(Math.random() * 100);

    switch (type) {
        case 'users':
            data = {
                title: 'USERS',
                isMoney: false,
                link: 'See All Users',
                amount: infoUsers.usersCount,
                icon: (
                    <PersonOutlinedIcon className='icon' style={{
                        color: 'crimson',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)'
                    }} />
                ),
            }
            break;
        case 'orders':
            data = {
                title: 'ORDERS',
                isMoney: false,
                link: 'See All Oders',
                amount: inforOrders.ordersNum,
                icon: (
                    <ShoppingCartOutlinedIcon className='icon' style={{
                        color: 'goldenrod',
                        backgroundColor: 'rgba(218, 65, 32, 0.2)'
                    }} />
                ),
            }
            break;
        case 'earnings':
            data = {
                title: 'EARNINGS',
                isMoney: true,
                link: 'View Earnings',
                amount: inforOrders.earnings,
                icon: (
                    <MonetizationOnOutlinedIcon className='icon' style={{
                        color: 'green',
                        backgroundColor: 'rgba(0, 128, 0, 0.2)'
                    }} />
                ),
            }
            break;
        case 'balance':
            data = {
                title: 'BALLANCE',
                isMoney: true,
                link: 'See Details',
                amount: inforOrders.balance,
                icon: (
                    <AccountBalanceWalletOutlinedIcon className='icon' style={{
                        color: 'purple',
                        backgroundColor: 'rgba(128, 0, 128, 0.2)'
                    }} />
                ),
            }
            break;
        default:
            break;
    }



    return (
        <div className='widget'>
            <div className='left'>
                <span className='title'>{data.title}</span>
                <span className='counter'>{convertMoney(data.amount)} {data.isMoney && 'VND'} </span>
            </div>
            <div className='right'>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget