import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: null
  });
  const [editProduct, setEditProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setNotification('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('category', newProduct.category);
      formData.append('stock', newProduct.stock);
      if (newProduct.imageUrl) {
        formData.append('image', newProduct.imageUrl);
      }

      await axios.post('http://localhost:5001/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setNotification('Product added successfully!');
      setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageUrl: null });
      setShowModal(false);

      // Reload products
      const response = await axios.get('http://localhost:5001/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to add product', error);
      setNotification('Failed to add product.');
    }
  };

  const handleEditProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('category', newProduct.category);
      formData.append('stock', newProduct.stock);
      if (newProduct.imageUrl) {
        formData.append('image', newProduct.imageUrl);
      }

      await axios.put(`http://localhost:5001/api/products/${editProduct._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setNotification('Product updated successfully!');
      setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageUrl: null });
      setEditProduct(null);
      setShowModal(false);

      // Reload products
      const response = await axios.get('http://localhost:5001/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to update product', error);
      setNotification('Failed to update product.');
    }
  };

  const handleAddOrEditProduct = async () => {
    if (editProduct) {
      await handleEditProduct();
    } else {
      await handleAddProduct();
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${id}`);
      setNotification('Product deleted successfully!');

      // Reload products
      const response = await axios.get('http://localhost:5001/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to delete product', error);
      setNotification('Failed to delete product.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {notification && <div className="notification">{notification}</div>}

      <button onClick={() => setShowModal(true)} className="add-product-btn">Add Product</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editProduct ? 'Edit Product' : 'Add Product'}</h3>
            <input
              type="text"
              placeholder="Name"
              value={editProduct ? editProduct.name : newProduct.name}
              onChange={(e) => (editProduct ? setEditProduct({ ...editProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Description"
              value={editProduct ? editProduct.description : newProduct.description}
              onChange={(e) => (editProduct ? setEditProduct({ ...editProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Price"
              value={editProduct ? editProduct.price : newProduct.price}
              onChange={(e) => (editProduct ? setEditProduct({ ...editProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Category"
              value={editProduct ? editProduct.category : newProduct.category}
              onChange={(e) => (editProduct ? setEditProduct({ ...editProduct, category: e.target.value }) : setNewProduct({ ...newProduct, category: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Stock"
              value={editProduct ? editProduct.stock : newProduct.stock}
              onChange={(e) => (editProduct ? setEditProduct({ ...editProduct, stock: e.target.value }) : setNewProduct({ ...newProduct, stock: e.target.value }))}
            />
            <input
              type="file"
              onChange={(e) => (editProduct ? setEditProduct({ ...editProduct, imageUrl: e.target.files[0] }) : setNewProduct({ ...newProduct, imageUrl: e.target.files[0] }))}
            />
            <button onClick={handleAddOrEditProduct}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td><img src={`http://localhost:5001/${product.imageUrl}`} alt={product.name} width="100" /></td>
              <td>
                <button onClick={() => { setEditProduct(product); setShowModal(true); }}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
