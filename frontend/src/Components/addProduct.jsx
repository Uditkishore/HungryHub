import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useSelector } from 'react-redux';

const AddProduct = () => {
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
    <div className='container'>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
