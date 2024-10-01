import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://localhost:7181/api/Product')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error.message}</p>;

    return (
        <>
           <h1 className="newArrivals">NEW ARRIVALS FROM VASTRA</h1>
            <div className="product-list-list">
                
                {products.map(product => (
                    <Link to={`/product/${product.productId}`} key={product.productId} className="product-item-list">
                        <div className="product-image-list">
                            <img src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
                        </div>
                        <div className="product-info-list">
                            <h3 className="product-name-list">{product.name}</h3>
                            <p className="product-description-list">{product.shortDescription}</p>
                            <p className="product-price-list">
                          ₹{product.productVariants?.[0]?.pricePerUnit || '0'}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default ProductList;