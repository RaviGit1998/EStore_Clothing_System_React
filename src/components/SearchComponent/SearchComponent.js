import React, { useState } from 'react';
import './SearchComponent.css';
import { Link } from 'react-router-dom';

const SearchComponent = () => {
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        if (!keyword) return;

        setLoading(true);
        setError(null);       
        fetch(`https://localhost:7181/api/Product/search?keyword=${keyword}`)
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
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <Link to={`/product/${product.productId}`} key={product.productId} className="product-item">
                            <div className="product-image">
                                <img src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p>{product.shortDescription}</p>
                                <p>₹{product.pricePerUnit}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;