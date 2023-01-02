import './updateProduct.scss'
import { useEffect, useState } from 'react';
import axiosClient from '../API/axiosClient';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
const UpdateProduct = ({ product }) => {
    const [show, setShow] = useState(false);

    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [shortDesc, setShortDesc] = useState(product.short_desc);
    const [longDesc, setLongDesc] = useState(product.long_desc);

    const handleSend = () => {
        const editproduct = {
            _id: product._id,
            name: name,
            category: category,
            price: price,
            shortDesc: shortDesc,
            longDesc: longDesc,
        }
        console.log(editproduct)
        axiosClient.post('/admin/updateproduct', editproduct)
            .then(res => {
                console.log(res?.message)
                if (res.message === "Product updated!") {
                    window.location.reload(false);
                }
            })
    }
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };
    return (
        <div>
            <button type="button" className="btn btn-outline-success" onClick={handleShow}>Update</button>
            <Modal
                size='lg'
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                {/* <form className="form"> */}
                <Modal.Header closeButton>
                    <Modal.Title>Edit product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div className='chart'> */}
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input type="text" value={name} name="name" className="form-control" onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="category">Category</label>
                            <input type="text" value={category} name="category" className="form-control" onChange={(e) => { setCategory(e.target.value) }} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="price">Price</label>
                            <input type="number" value={price} name="price" placeholder='Enter Price' className="form-control" onChange={(e) => { setPrice(e.target.value) }} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="shortDesc">Short Description</label>
                            <textarea className="form-control" value={shortDesc} placeholder='Enter Short Description' name="shortDesc" rows="2" onChange={(e) => { setShortDesc(e.target.value) }}></textarea>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="longDesc">Long Description</label>
                            <textarea className="form-control" value={longDesc} placeholder='Enter Long Description' name="longDesc" rows="4" onChange={(e) => { setLongDesc(e.target.value) }}></textarea>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSend} >Send</Button>
                </Modal.Footer>
                {/* </form> */}
            </Modal >
        </div >
    )
}

export default UpdateProduct