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

      if (newProduct.imageUrl && newProduct.imageUrl instanceof File) {
        formData.append('image', newProduct.imageUrl);
      }

      const url = `http://localhost:5001/api/products/${editProduct._id}`;

      await axios.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setNotification('Product updated successfully!');
      setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageUrl: null });
      setEditProduct(null);
      setShowModal(false);

      // Reload products
      const updatedProducts = await axios.get('http://localhost:5001/api/products');
      setProducts(updatedProducts.data);
    } catch (error) {
      console.error('Failed to update product:', error.response ? error.response.data : error.message);
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

  // Predefined category options
  const categories = [
    'Fashion',
    'Electronics',
    'Digital Services',
    'Cosmetics and Body Care',
    'Food and Beverage',
    'Furniture and Decor',
    'Health and Wellness',
    'Household Items',
    'Media',
    'Pet Care',
    'Office Equipments',
  ];

  const openAddProductModal = () => {
    setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageUrl: null });
    setEditProduct(null);
    setShowModal(true);
  };

  const openEditProductModal = (product) => {
    setEditProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      imageUrl: null // Reset imageUrl to force user to select a new image if needed
    });
    setShowModal(true);
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Admin Dashboard</h1>
      </header>

      {notification && <div className="notification">{notification}</div>}

      <button onClick={openAddProductModal} className="btn btn-primary">Add Product</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editProduct ? 'Edit Product' : 'Add Product'}</h3>
            <form className="product-form">
              <label>
                Name
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </label>
              <label>
                Description
                <textarea
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </label>
              <label>
                Price
                <input
                  type="number"
                  placeholder="Enter price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </label>
              <label>
                Category
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                Stock
                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
              </label>
              <label>
                Image
                <input
                  type="file"
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.files[0] })}
                />
              </label>
              <div className="form-buttons">
                <button type="button" onClick={handleAddOrEditProduct} className="btn btn-success">Save</button>
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="product-table">
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
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td><img src={`http://localhost:5001/${product.imageUrl}`} alt={product.name} className="product-image" /></td>
              <td>
                <button onClick={() => openEditProductModal(product)} className="btn btn-warning">Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
