
import React, { useContext, useEffect, useState } from 'react';
import { useParams,useOutletContext } from 'react-router-dom';
import './ProductDetails.css';
import { CartContext } from '../Cart/CartContext';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import placeOrder from '../PlaceOrder/PlaceOrder';
const ProductDetails = () => {
    const navigate=useNavigate();
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://localhost:7181/api/Product/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        const token = localStorage.getItem('jwtToken');
       
        if (!token) {
            toast.warning("Please login to order");
            navigate('/login');
            return;
        }
        let cartContainer=JSON.parse(localStorage.getItem('cartContainer')) || [];
        cartContainer.push(product);
        localStorage.setItem('cartContainer',JSON.stringify(cartContainer));
 
         addToCart(product);
 
       toast.success("Product added to the Cart");
    };

    // const handleBuyNow =async () => {
    //      // const Id = await placeOrder([product]);
    //  navigate(`/order-summary/${Id}`, { state: { orderItems: [product] } });

    //     const token = localStorage.getItem('jwtToken');
        
    //     if (!token) {
    //         toast.warning("Please login to order");
    //         navigate('/login');
    //         return;
    //     }
    //     const quantity = 1; // default quantity, you can adjust this as needed
    //     const productWithVariants = { ...product, quantity };
    //     const Id = await placeOrder([productWithVariants]);
    //     navigate(`/order-summary/${Id}`, { state: { orderItems: [productWithVariants] } });
    // };

    const handleBuyNow =async () => {
        // const Id = await placeOrder([product]);
        // navigate(`/order-summary/${Id}`, { state: { orderItems: [product] } });
        const selectedVariant = product.productVariants?.[0];
 
        if (!selectedVariant || selectedVariant.quantity <= 0) {
            toast.error("Product is out of stock"); // Show toast if out of stock
            return; // Exit the function if the product is out of stock
        }
    
        const Id = await placeOrder([product]);
        navigate(`/order-summary/${Id}`, { state: { orderItems: [product] } });
    };
    
    const handleAddToWishlist = () => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!wishlist.find(item => item.productId === product.productId)) {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
          toast.success("item added to wishlist")
        } else {
           toast.warn("item is already in wishlist");
        }
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error.message}</p>;
    if (!product) return <p className="not-found">Product not found.</p>;

    return (
        <div className="product-details">
            <div className="product-image-section">
                <div className="product-image-list">
                    {product.imageBase64 ? (
                        <img
                            src={`data:image/png;base64,${product.imageBase64}`}
                            alt={product.name}
                            className="product-image-main"
                            style={{height:'500px'}}
                        />
                    ) : (
                        <img
                            src="fallback-image.jpg"
                            alt={product.name}
                            className="product-image-main"
                        />
                    )}
                </div>
                <div className="product-actions">
                   <span className="icon-style2" onClick={handleAddToWishlist}>
                        <i className="fa-solid fa-heart"></i>
                    </span>
                    <button className="btn7 btn btn-add-to-cart" onClick={handleAddToCart}>
                        Add to Cart
                    </button>                 
                    <button className="btn7 btn btn-buy-now" onClick={handleBuyNow}>
                        Buy Now
                    </button>
                </div>
            </div>

            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-brand"><strong>Brand:</strong> {product.brand}</p>
                <p className="product-price"><strong>Price:</strong> ₹{product.productVariants?.[0]?.pricePerUnit || '0'}</p>

                {product.shortDescription && (
                    <p className="product-description"><strong>Description:</strong> {product.shortDescription}</p>
                )}
                {product.longDesrciption && (
                    <p className="product-details-description"><strong>Details:</strong> {product.longDesrciption}</p>
                )}
{/* 
                <p className="product-category"><strong>Category:</strong> {product.categoryId}</p>
                <p className="product-subcategory"><strong>Subcategory:</strong> {product.subCategoryId}</p> */}

                <h3>Variants:</h3>
                {product.productVariants && product.productVariants.length > 0 ? (
                    <ul className="product-variants">
                        {product.productVariants.map(variant => (
                            <li key={variant.productVariantId}>
                                <p><strong>Variant Name:</strong> {variant.name}</p>
                                <p><strong>Size:</strong> {variant.size}</p>
                                <p><strong>Color:</strong> {variant.color}</p>
                                <p><strong>Price Per Unit:</strong> ₹{variant.pricePerUnit || '0'}</p>
                                <p><strong>Quantity Available:</strong> {variant.quantity > 0 ? variant.quantity : "Out of Stock"}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No variants available</p>
                )}

                <p className="product-created-date"><strong>Created on:</strong> {new Date(product.createdDate).toLocaleDateString()}</p>
                <p className="product-modified-date"><strong>Last Modified on:</strong> {new Date(product.modifiedDate).toLocaleDateString()}</p>
            </div>
            <ToastContainer autoClose={500}/> 
        </div>
    );
};

export default ProductDetails;
