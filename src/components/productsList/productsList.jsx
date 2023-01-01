import './productsList.scss'
import { useEffect, useState } from 'react';
import UpdateProduct from '../updateProduct/updateProduct';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import convertMoney from '../../convertMoney'
import TextField from "@mui/material/TextField";

const ProductsList = () => {
    const [inforProducts, setInforProducts] = useState([]);
    const [inputText, setInputText] = useState("");
    useEffect(() => {
        async function fetchData() {
            await axios.get('https://backend-asm3-kappa.vercel.app/admin/inforproducts')
                .then(res => setInforProducts(res.data.products))
        }

        fetchData();
    }, [])
    const handleDelete = (e) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`https://backend-asm3-kappa.vercel.app/admin/inforproducts/${e.target.value}`).then(result => {
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

    const handleSearch = (e) => {
        const searchInput = e.target.value.toLowerCase();
        setInputText(searchInput);
    }
    const filteredProducts = inforProducts.filter(product => {
        if (inputText === '') {
            return product;
        }
        else {
            return product.name.toLowerCase().includes(inputText)
        }
    })

    return (
        <div className='chart'>
            <div className="title">
                <h1>Products List</h1>
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search Product"
                        onChange={handleSearch}
                    />
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Image</th>
                            <th scope="col">Category</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts?.map(product => {
                            return (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{convertMoney(product.price)} VND</td>
                                    <td><img src={product.img1} alt='...' width='70' /></td>
                                    <td>{product.category}</td>
                                    <td>
                                        <div className='d-inline-flex p-2'>
                                            <button type="button" value={product._id} className="btn btn-outline-danger" onClick={handleDelete}>Delete</button><UpdateProduct product={product} />
                                        </div>

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

export default ProductsList