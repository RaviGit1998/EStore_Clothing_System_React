import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
 
const ProductDetails = () => {
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
 
    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error.message}</p>;
    if (!product) return <p className="not-found">Product not found.</p>;
 
    const handleAddToCart = () => {
        console.log('Add to cart:', product);
    };
 
    const handleBuyNow = () => {
        console.log('Buy now:', product);
    };
 
    return (
        <div className="product-details">
            <div className="product-image-section">
                <div className="product-image">
                    {product.imageBase64 ? (
                        <img
                            src={`data:image/png;base64,${product.imageBase64}`}
                            alt={product.name}
                            className="product-image-main"
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
                    <button className="btn btn-add-to-cart" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    <button className="btn btn-buy-now" onClick={handleBuyNow}>
                        Buy Now
                    </button>
                </div>
            </div>
 
            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-brand"><strong>Brand:</strong> {product.brand}</p>
                <p className="product-price"><strong>Price:</strong> ₹{product.pricePerUnit || 'Not available'}</p>
 
                {product.shortDescription && (
                    <p className="product-description"><strong>Description:</strong> {product.shortDescription}</p>
                )}
                {product.longDesrciption && (
                    <p className="product-details-description"><strong>Details:</strong> {product.longDesrciption}</p>
                )}
 
                <p className="product-category"><strong>Category:</strong> {product.categoryId}</p>
                <p className="product-subcategory"><strong>Subcategory:</strong> {product.subCategoryId}</p>
 
                <h3>Variants:</h3>
                {product.productVariants && product.productVariants.length > 0 ? (
                    <ul className="product-variants">
                        {product.productVariants.map(variant => (
                            <li key={variant.productVariantId}>
                                <p><strong>Variant Name:</strong> {variant.name}</p>
                                <p><strong>Size:</strong> {variant.size}</p>
                                <p><strong>Color:</strong> {variant.color}</p>
                                <p><strong>Price Per Unit:</strong> ₹{variant.pricePerUnit}</p>
                                <p><strong>Quantity Available:</strong> {variant.quantity}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No variants available</p>
                )}
 
                <p className="product-created-date"><strong>Created on:</strong> {new Date(product.createdDate).toLocaleDateString()}</p>
                <p className="product-modified-date"><strong>Last Modified on:</strong> {new Date(product.modifiedDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};
 
export default ProductDetails;
 