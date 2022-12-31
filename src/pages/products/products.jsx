import './products.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import ProductsList from '../../components/productsList/productsList'

const Products = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="charts">
                    <ProductsList />
                </div>
            </div>
        </div>
    )
}

export default Products