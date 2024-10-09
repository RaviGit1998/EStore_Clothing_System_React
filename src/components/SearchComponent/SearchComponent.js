import React, { useEffect, useState } from 'react';
import './SearchComponent.css';
import { Link } from 'react-router-dom';
 
const SearchComponent = ({ keyword: initialKeyword }) => {
    const [keyword, setKeyword] = useState(initialKeyword || '');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        if (initialKeyword) {
            handleSearch(initialKeyword);
        }
    }, [initialKeyword]);
 
    const handleSearch = (searchKeyword) => {
        if (!searchKeyword) return;
 
        setLoading(true);
        setError(null);      
        fetch(`https://localhost:7181/api/Product/search?keyword=${searchKeyword}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    };
 
    return (
        <div className="search-component">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
 
            <div className="product-list-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <Link to={`/product/${product.productId}`} key={product.productId} className="product-item-list">
                            <div className="product-image-list">
                                <img src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.shortDescription}</p>
                                <p>₹{product.productVariants?.[0]?.pricePerUnit || '0'}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};
 
export default SearchComponent;