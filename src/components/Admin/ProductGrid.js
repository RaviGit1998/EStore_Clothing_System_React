// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './ProductGrid.css';  
// import { showErrorToast, showInfoToast, showSuccessToast } from '../Toasting/ThrottledToast';
 
// const ProductGrid = () => {
//     const [products, setProducts] = useState([]);
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [editProduct, setEditProduct] = useState(null);
//     const [loading, setLoading] = useState(true); // Loading state
 
//     useEffect(() => {
//         // Set loading to true when data fetching starts
//         setLoading(true);
//         axios.get('https://localhost:7181/api/Product')
//             .then(response => {
//                 setProducts(response.data);
//                 setLoading(false); // Stop loading when data is fetched
//             })
//             .catch(error => {
//                 console.log(error);
//                 setLoading(false); // Stop loading on error
//                 showErrorToast('Failed to load products');
//             });
//     }, []);
 
//     const handleDelete = (productId) => {
//         const confirmDelete = window.confirm("Do you really want to delete this product?");
       
//         if (confirmDelete) {
//             axios.delete(`https://localhost:7181/api/Product/${productId}`)
//                 .then(() => {
//                     setProducts(products.filter(product => product.productId !== productId));
//                     showSuccessToast('Product deleted successfully');
//                 })
//                 .catch(error => {
//                     console.log(error);
//                    showErrorToast('Failed to delete product');
//                 });
//         } else {
//            showInfoToast('Product deletion canceled');
//         }
//     };
 
//     const handleEdit = (product) => {
//         setEditProduct(product);    
//         setShowAddForm(false); // Close Add Product form if editing
//     };
 
//     const handleAddFormToggle = () => {
//         setShowAddForm(!showAddForm);
//         setEditProduct(null);  // Reset editProduct when toggling add form
//     };
 
//     return (
//         <div className="product-grid-container">
//             {/* Show loading spinner/message while data is being fetched */}
//             {loading ? (
//                 <div className="loading">Loading products...</div> // Display a loading message
//             ) : (
//                 <>
//                     {!showAddForm && !editProduct && (
//                         <button className="add-product-btn" onClick={handleAddFormToggle}>
//                             Add Product
//                         </button>
//                     )}
 
//                     {showAddForm && !editProduct && ( // Show Add Form only if not editing
//                         <AddProductForm
//                             setShowAddForm={setShowAddForm}
//                             setProducts={setProducts}
//                             editProduct={null}
//                         />
//                     )}
 
//                     <table className="product-table">
//                         <thead>
//                             <tr>
//                                 <th>Image</th>
//                                 <th>Name</th>
//                                 <th>Brand</th>
//                                 <th>Price</th>
//                                 <th>Quantity</th>
//                                 <th>Short Description</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {products.map(product => (
//                                 <React.Fragment key={product.productId}>
//                                     <tr>
//                                         <td>
//                                             <img className="product-image" src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
//                                         </td>
//                                         <td>{product.name}</td>
//                                         <td>{product.brand}</td>
//                                         <td>₹{product.productVariants?.[0]?.pricePerUnit || '0'}</td>
//                                         <td>{product.productVariants?.[0]?.quantity || 'Out of Stock'}</td>
//                                         <td>{product.shortDescription}</td>
//                                         <td>
//                                             <div className="action-buttons">
//                                                 <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
//                                                 <button className="delete-btn" onClick={() => handleDelete(product.productId)}>Delete</button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                     {/* Inline Edit Form */}
//                                     {editProduct && editProduct.productId === product.productId && (
//                                         <tr>
//                                             <td colSpan="7"> {/* Spanning all columns */}
//                                                 <AddProductForm
//                                                     setShowAddForm={setEditProduct} // Close the edit form
//                                                     setProducts={setProducts}
//                                                     editProduct={editProduct}
//                                                 />
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             ))}
//                         </tbody>
//                     </table>
//                 </>
//             )}
//         </div>
//     );
// };
 
// const AddProductForm = ({ setShowAddForm, setProducts, editProduct }) => {
//     const [productData, setProductData] = useState({
//         name: '',
//         shortDescription: '',
//         longDesrciption: '',
//         brand: '',
//         pricePerUnit: '',
//         categoryId: '',
//         subCategoryId: '',
//         productVariants: []
//     });
 
//     const [selectedImage, setSelectedImage] = useState(null);  
 
//     useEffect(() => {
//         if (editProduct) {
//             setProductData({
//                 ...editProduct,
//                 pricePerUnit: editProduct.productVariants?.[0]?.pricePerUnit || '',
//             });
//         }
//     }, [editProduct]);
 
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProductData({ ...productData, [name]: value });
//     };
 
//     const handleImageChange = (e) => {
//         setSelectedImage(e.target.files[0]);  
//     };
 
//     const handleSubmit = (e) => {
//         e.preventDefault();
   
//         const formData = new FormData();
//         formData.append('name', productData.name);
//         formData.append('shortDescription', productData.shortDescription);
//         formData.append('longDesrciption', productData.longDesrciption);
//         formData.append('brand', productData.brand);
//         formData.append('categoryId', productData.categoryId);
//         formData.append('subCategoryId', productData.subCategoryId);      
   
//         if (selectedImage) {
//             formData.append('imageFile', selectedImage);
//         }
   
//         const request = editProduct
//             ? axios.put(`https://localhost:7181/api/Product/${editProduct.productId}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             })
//             : axios.post('https://localhost:7181/api/Product', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
   
//         request
//             .then(() => {
//                 axios.get('https://localhost:7181/api/Product')
//                     .then(response => {
//                         setProducts(response.data);
//                         setShowAddForm(false);
//                         resetForm();
//                         toast.success(editProduct ? 'Product updated successfully' : 'Product added successfully');
//                     })
//                     .catch(error => {
//                         console.error('Error fetching products:', error.response ? error.response.data : error.message);
//                         toast.error('Error fetching updated product list');
//                     });
//             })
//             .catch((error) => {
//                 console.error('Error adding/updating product:', error.response ? error.response.data : error.message);
//                 toast.error('Failed to add/update product');
//             });
//     };
 
//     const resetForm = () => {
//         setProductData({
//             name: '',
//             shortDescription: '',
//             longDesrciption: '',
//             brand: '',
//             pricePerUnit: '',
//             categoryId: '',
//             subCategoryId: '',
//             productVariants: []
//         });
//         setSelectedImage(null);
//     };
 
//     return (
//         <form className="add-product-form" onSubmit={handleSubmit}>
//             <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleInputChange} required />
//             <input type="text" name="shortDescription" placeholder="Short Description" value={productData.shortDescription} onChange={handleInputChange} required />
//             <input type="text" name="longDesrciption" placeholder="Long Description" value={productData.longDesrciption} onChange={handleInputChange} required />
//             <input type="text" name="brand" placeholder="Brand" value={productData.brand} onChange={handleInputChange} required />
//             <input type="number" name="categoryId" placeholder="Category ID" value={productData.categoryId} onChange={handleInputChange} required />
//             <input type="number" name="subCategoryId" placeholder="Sub Category ID" value={productData.subCategoryId} onChange={handleInputChange} required />
//             <input type="file" name="imageFile" onChange={handleImageChange} accept="image/*" />
//             <button type="submit">{editProduct ? 'Update Product' : 'Add Product'}</button>
//             <button type="button" onClick={() => { resetForm(); setShowAddForm(false); }}>Cancel</button>
//         </form>
//     );
// };
 
// export default ProductGrid;









// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './ProductGrid.css';  
// import { showErrorToast, showInfoToast, showSuccessToast } from '../Toasting/ThrottledToast';
 
// const ProductGrid = () => {
//     const [products, setProducts] = useState([]);
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [editProduct, setEditProduct] = useState(null);
//     const [loading, setLoading] = useState(true); // Loading state
 
//     useEffect(() => {
//         // Set loading to true when data fetching starts
//         setLoading(true);
//         axios.get('https://localhost:7181/api/Product')
//             .then(response => {
//                 setProducts(response.data);
//                 setLoading(false); // Stop loading when data is fetched
//             })
//             .catch(error => {
//                 console.log(error);
//                 setLoading(false); // Stop loading on error
//                 showErrorToast('Failed to load products');
//             });
//     }, []);
 
//     const handleDelete = (productId) => {
//         const confirmDelete = window.confirm("Do you really want to delete this product?");
       
//         if (confirmDelete) {
//             axios.delete(`https://localhost:7181/api/Product/${productId}`)
//                 .then(() => {
//                     setProducts(products.filter(product => product.productId !== productId));
//                     showSuccessToast('Product deleted successfully');
//                 })
//                 .catch(error => {
//                     console.log(error);
//                    showErrorToast('Failed to delete product');
//                 });
//         } else {
//            showInfoToast('Product deletion canceled');
//         }
//     };
 
//     const handleEdit = (product) => {
//         setEditProduct(product);    
//         setShowAddForm(false); // Close Add Product form if editing
//     };
 
//     const handleAddFormToggle = () => {
//         setShowAddForm(!showAddForm);
//         setEditProduct(null);  // Reset editProduct when toggling add form
//     };
 
//     return (
//         <div className="product-grid-container">
//             {/* Show loading spinner/message while data is being fetched */}
//             {loading ? (
//                 <div className="loading">Loading products...</div> // Display a loading message
//             ) : (
//                 <>
//                     {!showAddForm && !editProduct && (
//                         <button className="add-product-btn" onClick={handleAddFormToggle}>
//                             Add Product
//                         </button>
//                     )}
 
//                     {showAddForm && !editProduct && ( // Show Add Form only if not editing
//                         <AddProductForm
//                             setShowAddForm={setShowAddForm}
//                             setProducts={setProducts}
//                             editProduct={null}
//                         />
//                     )}
 
//                     <table className="product-table">
//                         <thead>
//                             <tr>
//                                 <th>Image</th>
//                                 <th>Name</th>
//                                 <th>Brand</th>
//                                 <th>Price</th>
//                                 <th>Quantity    </th>
//                                 <th>Short Description</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {products.map(product => (
//                                 <React.Fragment key={product.productId}>
//                                     <tr>
//                                         <td>
//                                             <img className="product-image" src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
//                                         </td>
//                                         <td>{product.name}</td>
//                                         <td>{product.brand}</td>
//                                         <td>₹{product.productVariants?.[0]?.pricePerUnit || '0'}</td>
//                                         <td>{product.productVariants?.[0]?.quantity || 'Out of Stock'}</td>
//                                         <td>{product.shortDescription}</td>
//                                         <td>
//                                             <div className="action-buttons">
//                                                 <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
//                                                 <button className="delete-btn" onClick={() => handleDelete(product.productId)}>Delete</button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                     {/* Inline Edit Form */}
//                                     {editProduct && editProduct.productId === product.productId && (
//                                         <tr>
//                                             <td colSpan="7"> {/* Spanning all columns */}
//                                                 <AddProductForm
//                                                     setShowAddForm={setEditProduct} // Close the edit form
//                                                     setProducts={setProducts}
//                                                     editProduct={editProduct}
//                                                 />
//                                             </td>
//                                         </tr>
//                                     )}
//                                 </React.Fragment>
//                             ))}
//                         </tbody>
//                     </table>
//                 </>
//             )}
//         </div>
//     );
// };
 
// const AddProductForm = ({ setShowAddForm, setProducts, editProduct }) => {
//     const [productData, setProductData] = useState({
//         name: '',
//         shortDescription: '',
//         longDesrciption: '',
//         brand: '',
//         pricePerUnit: '',
//         categoryId: '',
//         subCategoryId: '',
//         productVariants: [
//             {
//                 size: '',
//                 color: '',
//                 quantity: '',
//                 pricePerUnit: '',
//             },
//         ],
//     });
 
//     const [selectedImage, setSelectedImage] = useState(null); 
   
   
//     useEffect(() => {
//         if (editProduct) {
//             setProductData({
//                 ...editProduct,
//                 pricePerUnit: editProduct.productVariants?.[0]?.pricePerUnit || '',
//             });
           
//         }
//     }, [editProduct]);
 
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProductData({ ...productData, [name]: value });
//     };
 
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setSelectedImage(file);
//     };
 
//     const handleSubmit = (e) => {
//         e.preventDefault();
   
//         const formData = new FormData();
//         formData.append('name', productData.name);
//         formData.append('shortDescription', productData.shortDescription);
//         formData.append('longDesrciption', productData.longDesrciption);
//         formData.append('brand', productData.brand);
//         formData.append('categoryId', productData.categoryId);
//         formData.append('subCategoryId', productData.subCategoryId);   
       
//         //productVariants
//         formData.append('addProductVariantsJson', JSON.stringify(productData.productVariants));

//         if (selectedImage) {
//             formData.append('imageFile', selectedImage);
//         }
   
//         const request = editProduct
//             ? axios.put(`https://localhost:7181/api/Product/EditProductVariant${editProduct.productId}`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             })
//             : axios.post('https://localhost:7181/api/Product/ProductWihVariant', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
   
//         request
//             .then(() => {
//                 axios.get('https://localhost:7181/api/Product')
//                     .then(response => {
//                         setProducts(response.data);
//                         setShowAddForm(false);
//                         resetForm();
//                         toast.success(editProduct ? 'Product updated successfully' : 'Product added successfully');
//                     })
//                     .catch(error => {
//                         console.error('Error fetching products:', error.response ? error.response.data : error.message);
//                         toast.error('Error fetching updated product list');
//                     });
//             })
//             .catch((error) => {
//                 console.error('Error adding/updating product:', error.response ? error.response.data : error.message);
//                 toast.error('Failed to add/update product');
//             });
//     };
//     const handleVariantChange = (index, event) => {
//         const { name, value } = event.target;
//         const updatedVariants = [...productData.productVariants];
//         updatedVariants[index] = {
//             ...updatedVariants[index],
//             [name]: value,
//         };
//         setProductData({
//             ...productData,
//             productVariants: updatedVariants,
//         });
//     };
    
//     // Add a new empty variant to the list
   
//     const resetForm = () => {
//         setProductData({
//             name: '',
//             shortDescription: '',
//             longDesrciption: '',
//             brand: '',
//             pricePerUnit: '',
//             categoryId: '',
//             subCategoryId: '',
//             productVariants: [
//                 {
//                     size: '',
//                     color: '',
//                     quantity: '',
//                     pricePerUnit: '',
//                 },
//             ],
//         });
//         setSelectedImage(null);
      
//     };
 
//     return (
//         <form className="add-product-form" onSubmit={handleSubmit}>
           
//             <input type="text" name="name" placeholder="Product Name" value={productData.name} onChange={handleInputChange} required />
//             <input type="text" name="shortDescription" placeholder="Short Description" value={productData.shortDescription} onChange={handleInputChange} required />
//             <input type="text" name="longDesrciption" placeholder="Long Description" value={productData.longDesrciption} onChange={handleInputChange} required />
//             <input type="text" name="brand" placeholder="Brand" value={productData.brand} onChange={handleInputChange} required />
//             <input type="number" name="categoryId" placeholder="Category ID" value={productData.categoryId} onChange={handleInputChange} required />
//             <input type="number" name="subCategoryId" placeholder="Sub Category ID" value={productData.subCategoryId} onChange={handleInputChange} required />
            
//             <input type="file" name="imageFile" onChange={handleImageChange} accept="image/*" />
//              {/* Embedded Product Variants */}
//        {productData.productVariants.map((variant, index) => (
//         <div key={index} className="variant-row">
//             <input
//                 type="text"
//                 name="size"
//                 placeholder="Size"
//                 value={variant.size}
//                 onChange={(e) => handleVariantChange(index, e)}
//                 required
//             />
//             <input
//                 type="text"
//                 name="color"
//                 placeholder="Color"
//                 value={variant.color}
//                 onChange={(e) => handleVariantChange(index, e)}
//                 required
//             />
//             <input
//                 type="number"
//                 name="quantity"
//                 placeholder="Quantity"
//                 value={variant.quantity}
//                 onChange={(e) => handleVariantChange(index, e)}
//                 required
//             />
//             <input
//                 type="number"
//                 name="pricePerUnit"
//                 placeholder="Price Per Unit"
//                 value={variant.pricePerUnit}
//                 onChange={(e) => handleVariantChange(index, e)}
//                 required
//             />
           
//         </div>
//     ))}

  
//     <button type="submit">
//         {editProduct ? 'Update Product' : 'Add Product'}
//     </button>
//     <button type="button" onClick={() => { resetForm(); setShowAddForm(false); }}>
//         Cancel
//     </button>
//         </form>
//     );
// };
 
// export default ProductGrid;











import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductGrid.css';  
import { showErrorToast, showInfoToast, showSuccessToast } from '../Toasting/ThrottledToast';
 
const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [filters, setFilters] = useState({
        category: '',
        brand: '',
        minPrice: 0,
        maxPrice: Infinity,
    });
 
    useEffect(() => {
        // Set loading to true when data fetching starts
        setLoading(true);
        axios.get('https://localhost:7181/api/Product')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);// Initially, all products are shown
                setLoading(false); // Stop loading when data is fetched
            })
            .catch(error => {
                console.log(error);
                setLoading(false); // Stop loading on error
                showErrorToast('Failed to load products');
            });
    }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
};
     // Filter and sort products based on current filters
     useEffect(() => {
        let filtered = products.filter(product => {
            const productPrice = product.productVariants?.[0]?.pricePerUnit || 0;
            return (
                (filters.category === '' || product.categoryId === Number(filters.category)) &&
                (filters.brand === '' || product.brand.toLowerCase().includes(filters.brand.toLowerCase())) &&
                (productPrice >= filters.minPrice) &&
                (productPrice <= filters.maxPrice || filters.maxPrice === Infinity)
            );
        });
 
        // Sort filtered products by CreatedDate (newest first)
        filtered.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
       
        setFilteredProducts(filtered);
    }, [filters, products]);
 
    const handleDelete = (productId) => {
        const confirmDelete = window.confirm("Do you really want to delete this product?");
       
        if (confirmDelete) {
            axios.delete(`https://localhost:7181/api/Product/${productId}`)
                .then(() => {
                    setProducts(products.filter(product => product.productId !== productId));
                    showSuccessToast('Product deleted successfully');
                })
                .catch(error => {
                    console.log(error);
                   showErrorToast('Failed to delete product');
                });
        } else {
           showInfoToast('Product deletion canceled');
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

    const handleClearFilters = () => {
        setFilters({
            category: '',
            brand: '',
            minPrice: 0,
            maxPrice: Infinity,
        });
        setFilteredProducts(products); // Reset to show all products
    };
 
    return (
        <div className="product-grid-container">
            {loading ? (
                <div className="loading">Loading products...</div>
            ) : (
                <>
                    {/* Filter Controls */}
                    <div className="filter-container">
                        <input
                            type="text"
                            placeholder="Filter by brand"
                            name="brand"
                            value={filters.brand}
                            onChange={handleFilterChange}
                        />
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Categories</option>
                            <option value="3">Men</option>
                            <option value="4">Women</option>
                            <option value="5">Kids</option>
                        </select>
                        <input
                            type="number"
                            placeholder="Min Price"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                        />
                        {/* Clear Filters Button */}
                        <button className="clear-filters-btn" onClick={handleClearFilters}>
                            Clear Filters
                        </button>
                    </div>
 
                    {/* Add Product Button */}
                    {!showAddForm && !editProduct && (
                        <button className="add-product-btn" onClick={handleAddFormToggle}>
                            Add Product
                        </button>
                    )}
 
                    {showAddForm && !editProduct && (
                        <AddProductForm
                            setShowAddForm={setShowAddForm}
                            setProducts={setProducts}
                            editProduct={null}
                        />
                    )}
 
                    
 
                    {/* Product Table */}
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
                            {filteredProducts.map(product => (
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
                                    {editProduct && editProduct.productId === product.productId && (
                                        <tr>
                                            <td colSpan="7">
                                                <AddProductForm
                                                    setShowAddForm={setEditProduct}
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
        productVariants: [
            {
                size: '',
                color: '',
                quantity: '',
                pricePerUnit: '',
            },
        ],
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
        const file = e.target.files[0];
        setSelectedImage(file);
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
       
        //productVariants
        formData.append('addProductVariantsJson', JSON.stringify(productData.productVariants));

        if (selectedImage) {
            formData.append('imageFile', selectedImage);
        }
   
        const request = editProduct
            ? axios.put(`https://localhost:7181/api/Product/EditProductVariant${editProduct.productId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            : axios.post('https://localhost:7181/api/Product/ProductWihVariant', formData, {
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
    const handleVariantChange = (index, event) => {
        const { name, value } = event.target;
        const updatedVariants = [...productData.productVariants];
        updatedVariants[index] = {
            ...updatedVariants[index],
            [name]: value,
        };
        setProductData({
            ...productData,
            productVariants: updatedVariants,
        });
    };
    
    // Add a new empty variant to the list
   
    const resetForm = () => {
        setProductData({
            name: '',
            shortDescription: '',
            longDesrciption: '',
            brand: '',
            pricePerUnit: '',
            categoryId: '',
            subCategoryId: '',
            productVariants: [
                {
                    size: '',
                    color: '',
                    quantity: '',
                    pricePerUnit: '',
                },
            ],
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
             {/* Embedded Product Variants */}
       {productData.productVariants.map((variant, index) => (
        <div key={index} className="variant-row">
            <input
                type="text"
                name="size"
                placeholder="Size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, e)}
                required
            />
            <input
                type="text"
                name="color"
                placeholder="Color"
                value={variant.color}
                onChange={(e) => handleVariantChange(index, e)}
                required
            />
            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={variant.quantity}
                onChange={(e) => handleVariantChange(index, e)}
                required
            />
            <input
                type="number"
                name="pricePerUnit"
                placeholder="Price Per Unit"
                value={variant.pricePerUnit}
                onChange={(e) => handleVariantChange(index, e)}
                required
            />
           
        </div>
    ))}

  
    <button type="submit">
        {editProduct ? 'Update Product' : 'Add Product'}
    </button>
    <button type="button" onClick={() => { resetForm(); setShowAddForm(false); }}>
        Cancel
    </button>
        </form>
    );
};
 
export default ProductGrid;