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
           
            <div className="product-list">
                {products.map(product => (
                    <Link to={`/product/${product.productId}`} key={product.productId} className="product-item">
                        <div className="product-image">
                            <img src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.shortDescription}</p>
                            <p className="product-price">
                          ₹{product.productVariants?.[0]?.pricePerUnit || '0'}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default ProductList;