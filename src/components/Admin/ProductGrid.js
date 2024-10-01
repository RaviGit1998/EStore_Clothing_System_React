import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductGrid.css';  
 
const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
 
    useEffect(() => {
        axios.get('https://localhost:7181/api/Product')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }, []);
 
    const handleDelete = (productId) => {
        axios.delete(`https://localhost:7181/api/Product/${productId}`)
            .then(() => setProducts(products.filter(product => product.productId !== productId)))
            .catch(error => console.log(error));
    };
 
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setEditProduct(null);
    };
 
    const handleEdit = (product) => {
        setEditProduct(product);
        setShowAddForm(true);    
    };
 
    return (
        <div className="product-grid-container">
            <button className="add-product-btn" onClick={toggleAddForm}>
                {showAddForm ? 'Cancel' : 'Add Product'}
            </button>
 
            {showAddForm && (
                <AddProductForm
                    setShowAddForm={setShowAddForm}
                    setProducts={setProducts}
                    editProduct={editProduct}
                />
            )}
 
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Short Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td>
                                <img className="product-image" src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>₹{product.productVariants?.[0]?.pricePerUnit || '0'}</td>
                            <td>{product.shortDescription}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDelete(product.productId)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
 
const AddProductForm = ({ setShowAddForm, setProducts, editProduct }) => {
    const [productData, setProductData] = useState({
        name: '',
        shortDescription: '',
        longDescription: '',
        brand: '',
        pricePerUnit: '',
        categoryId: '',
        subCategoryId: '',
        productVariants: []
    });
 
    const [selectedImage, setSelectedImage] = useState(null);  
 
    useEffect(() => {
        if (editProduct) {
            setProductData({
                ...editProduct,
                pricePerUnit: editProduct.productVariants?.[0]?.pricePerUnit || '',
            });
        }
    }, [editProduct]);
 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };
 
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);  
    };
 
    const handleSubmit = (e) => {
        e.preventDefault();
 
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('shortDescription', productData.shortDescription);
        formData.append('longDesrciption', productData.longDesrciption);
        formData.append('brand', productData.brand);
        formData.append('categoryId', productData.categoryId);
        formData.append('subCategoryId', productData.subCategoryId);
        formData.append('pricePerUnit', productData.pricePerUnit);
 
        // If image is selected, append it to the form data
        if (selectedImage) {
            formData.append('imageFile', selectedImage);
        }
 
        if (editProduct) {
            // Update the product
            axios.put(`https://localhost:7181/api/Product/${editProduct.productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setProducts((prevProducts) => prevProducts.map(product =>
                    product.productId === response.data.productId ? response.data : product
                ));
                setShowAddForm(false);
            })
            .catch((error) => {
                console.error('Error updating product:', error.response ? error.response.data : error.message);
            });
        } else {
            // Add a new product
            axios.post('https://localhost:7181/api/Product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setProducts((prevProducts) => [...prevProducts, response.data]);
                setShowAddForm(false);
            })
            .catch((error) => {
                console.error('Error adding product:', error.response ? error.response.data : error.message);
            });
        }
    };
 
    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleInputChange} required />
            <input type="text" name="shortDescription" placeholder="Short Description" value={productData.shortDescription} onChange={handleInputChange} required />
            <input type="text" name="longDescription" placeholder="Long Description" value={productData.longDesrciption} onChange={handleInputChange} required />
            <input type="text" name="brand" placeholder="Brand" value={productData.brand} onChange={handleInputChange} required />
            <input type="number" name="categoryId" placeholder="Category ID" value={productData.categoryId} onChange={handleInputChange} required />
            <input type="number" name="subCategoryId" placeholder="Sub Category ID" value={productData.subCategoryId} onChange={handleInputChange} required />
            <input type="number" name="pricePerUnit" placeholder="Price" value={productData.pricePerUnit} onChange={handleInputChange} required />
 
            {/* Image input */}
            <input type="file" name="imageFile" onChange={handleImageChange} accept="image/*" />
 
            <button type="submit">{editProduct ? 'Update Product' : 'Add Product'}</button>
            <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
        </form>
    );
};
 
export default ProductGrid;