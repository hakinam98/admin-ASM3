import './newProduct.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import AddProduct from '../../components/addproduct/addproduct'

const NewProduct = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
        </div>
        <AddProduct />
      </div>
    </div>
  )
}

export default NewProduct