import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useSelector } from 'react-redux';

const AdminPage = () => {
  const token = useSelector((state) => state.token.token);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    rating: '',
    quantity: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.BASEURL}/product/product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div style={{ height: "600px" }} className='container'>
      <h2 className='m-3'>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input type="text" className="form-control" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <input type="text" className="form-control" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <input type="number" className="form-control" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <input type="number" className="form-control" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <input type="number" className="form-control" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <input type="text" className="form-control" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <textarea className="form-control" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Product</button>
      </form>
    </div>
  );
};

export default AdminPage;
