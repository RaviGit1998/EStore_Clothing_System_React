import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductFilter.css';
 
const ProductPriceFilter = ({ minPrice, maxPrice, categoryId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const fetchProductsByPrice = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://localhost:7181/api/Product/category/${categoryId}/filterbyPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
       
        if (minPrice && maxPrice) {
            fetchProductsByPrice();
        }
    }, [minPrice, maxPrice, categoryId]);
 
    if (loading) {
        return <div className="skeleton-loader">Loading...</div>;
    }
    if (error) return <p className="error">Error: {error.message}</p>;
 
    return (
        <div>
           
            {products.length > 0 ? (
                <div className="product-list-list">
                    {products.map(product => (
                        <Link to={`/product/${product.productId}`} key={product.productId} className="product-item-list">
                            <div className="product-image-list">
                                <img src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
                            </div>
                            <div className="product-info-list">
                                <h3 className="product-name-list">{product.name}</h3>
                                <p className="product-description-list">{product.shortDescription}</p>
                                <div className="product-price-container">
                                    <p className="product-price-list">₹{product.productVariants?.[0]?.pricePerUnit || '0'}</p>
                                </div>                              
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No products available</p>    
            )}
        </div>
    );
};
 
export default ProductPriceFilter;
 
