import './transaction.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import TransList from '../../components/transactionList/transactionList'

const Transaction = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="charts">
                    <TransList />
                </div>
            </div>
        </div>
    )
}

export default Transaction