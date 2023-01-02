import './addproduct.scss'
import { useEffect, useState } from 'react';
import axiosClient from '../API/axiosClient';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm()
    const handleSend = (data) => {
        console.log(data.files)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category);
        formData.append('price', data.price);
        formData.append('shortDesc', data.shortDesc);
        formData.append('longDesc', data.longDesc);

        for (const file of data.files) {
            formData.append('files', file);
        }
        axiosClient.post('/admin/addproduct', formData)
            .then(res => {
                alert(res.message)
                if (res.message === "Product created!") {
                    navigate('/products')
                }
            })
    }
    return (
        <div>
            <div className='chart'>
                <h1>New Product</h1>
            </div>
            <div className='chart'>
                <form className="form" onSubmit={handleSubmit(handleSend)}>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="name">Product Name</label>
                            <input type="text" name="name" placeholder='Enter Product Name' className="form-control" {...register('name', { required: true })} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="category">Category</label>
                            <input type="text" name="category" placeholder='Enter Category' className="form-control" {...register('category', { required: true })} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="price">Price</label>
                            <input type="number" name="price" placeholder='Enter Price' className="form-control" {...register('price', { required: true })} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="shortDesc">Short Description</label>
                            <textarea className="form-control" placeholder='Enter Short Description' name="shortDesc" rows="2" {...register('shortDesc', { required: true })}></textarea>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" htmlFor="longDesc">Long Description</label>
                            <textarea className="form-control" placeholder='Enter Long Description' name="longDesc" rows="4" {...register('longDesc', { required: true })}></textarea>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label htmlFor="formFileMultiple" className="form-label">Upload image(4 images)</label>
                            <input className="form-control" type="file" id="formFileMultiple" multiple {...register('files', { required: true })} />
                        </div>
                    </div>
                    <div className="button">
                        <button type="submit" className="btn btn-primary btn-block mb-4">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct