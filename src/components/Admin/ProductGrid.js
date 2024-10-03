import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductGrid.css';  
 
const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
 
    useEffect(() => {
        // Set loading to true when data fetching starts
        setLoading(true);
        axios.get('https://localhost:7181/api/Product')
            .then(response => {
                setProducts(response.data);
                setLoading(false); // Stop loading when data is fetched
            })
            .catch(error => {
                console.log(error);
                setLoading(false); // Stop loading on error
                toast.error('Failed to load products');
            });
    }, []);
 
    const handleDelete = (productId) => {
        const confirmDelete = window.confirm("Do you really want to delete this product?");
       
        if (confirmDelete) {
            axios.delete(`https://localhost:7181/api/Product/${productId}`)
                .then(() => {
                    setProducts(products.filter(product => product.productId !== productId));
                    toast.success('Product deleted successfully');
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Failed to delete product');
                });
        } else {
            toast.info('Product deletion canceled');
        }
    };
 
    const handleEdit = (product) => {
        setEditProduct(product);    
        setShowAddForm(false); // Close Add Product form if editing
    };
 
    const handleAddFormToggle = () => {
        setShowAddForm(!showAddForm);
        setEditProduct(null);  // Reset editProduct when toggling add form
    };
 
    return (
        <div className="product-grid-container">
            {/* Show loading spinner/message while data is being fetched */}
            {loading ? (
                <div className="loading">Loading products...</div> // Display a loading message
            ) : (
                <>
                    {!showAddForm && !editProduct && (
                        <button className="add-product-btn" onClick={handleAddFormToggle}>
                            Add Product
                        </button>
                    )}
 
                    {showAddForm && !editProduct && ( // Show Add Form only if not editing
                        <AddProductForm
                            setShowAddForm={setShowAddForm}
                            setProducts={setProducts}
                            editProduct={null}
                        />
                    )}
 
                    <ToastContainer />
 
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Short Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <React.Fragment key={product.productId}>
                                    <tr>
                                        <td>
                                            <img className="product-image" src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>₹{product.productVariants?.[0]?.pricePerUnit || '0'}</td>
                                        <td>{product.productVariants?.[0]?.quantity || 'Out of Stock'}</td>
                                        <td>{product.shortDescription}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                                                <button className="delete-btn" onClick={() => handleDelete(product.productId)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Inline Edit Form */}
                                    {editProduct && editProduct.productId === product.productId && (
                                        <tr>
                                            <td colSpan="7"> {/* Spanning all columns */}
                                                <AddProductForm
                                                    setShowAddForm={setEditProduct} // Close the edit form
                                                    setProducts={setProducts}
                                                    editProduct={editProduct}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};
 
const AddProductForm = ({ setShowAddForm, setProducts, editProduct }) => {
    const [productData, setProductData] = useState({
        name: '',
        shortDescription: '',
        longDesrciption: '',
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
   
        if (selectedImage) {
            formData.append('imageFile', selectedImage);
        }
   
        const request = editProduct
            ? axios.put(`https://localhost:7181/api/Product/${editProduct.productId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            : axios.post('https://localhost:7181/api/Product', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
   
        request
            .then(() => {
                axios.get('https://localhost:7181/api/Product')
                    .then(response => {
                        setProducts(response.data);
                        setShowAddForm(false);
                        resetForm();
                        toast.success(editProduct ? 'Product updated successfully' : 'Product added successfully');
                    })
                    .catch(error => {
                        console.error('Error fetching products:', error.response ? error.response.data : error.message);
                        toast.error('Error fetching updated product list');
                    });
            })
            .catch((error) => {
                console.error('Error adding/updating product:', error.response ? error.response.data : error.message);
                toast.error('Failed to add/update product');
            });
    };
 
    const resetForm = () => {
        setProductData({
            name: '',
            shortDescription: '',
            longDesrciption: '',
            brand: '',
            pricePerUnit: '',
            categoryId: '',
            subCategoryId: '',
            productVariants: []
        });
        setSelectedImage(null);
    };
 
    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleInputChange} required />
            <input type="text" name="shortDescription" placeholder="Short Description" value={productData.shortDescription} onChange={handleInputChange} required />
            <input type="text" name="longDesrciption" placeholder="Long Description" value={productData.longDesrciption} onChange={handleInputChange} required />
            <input type="text" name="brand" placeholder="Brand" value={productData.brand} onChange={handleInputChange} required />
            <input type="number" name="categoryId" placeholder="Category ID" value={productData.categoryId} onChange={handleInputChange} required />
            <input type="number" name="subCategoryId" placeholder="Sub Category ID" value={productData.subCategoryId} onChange={handleInputChange} required />
            <input type="file" name="imageFile" onChange={handleImageChange} accept="image/*" />
            <button type="submit">{editProduct ? 'Update Product' : 'Add Product'}</button>
            <button type="button" onClick={() => { resetForm(); setShowAddForm(false); }}>Cancel</button>
        </form>
    );
};
 
export default ProductGrid;