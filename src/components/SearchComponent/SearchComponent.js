import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductFilter from '../Filters/ProductFilter';
import './SearchComponent.css';

const SearchComponent = ({ keyword: initialKeyword }) => {
    const [keyword, setKeyword] = useState(initialKeyword || '');
    const [allProducts, setAllProducts] = useState([]); // Store all products from search
    const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
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
                setAllProducts(data); // Store original search results
                setFilteredProducts(data); // Initially set filteredProducts to all products
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    };

    const handleFilterChange = (filtered) => {
        // When filters are applied, update the filteredProducts state
        setFilteredProducts(filtered);
    };

    return (
        <div className="search-page row">
            <div className="col-2">
                {/* Pass handleFilterChange to ProductFilter */}
                <ProductFilter id={1} onFilterChange={handleFilterChange} />
            </div>
            <div className="product-list col-10">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}

                {!loading && filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Link to={`/product/${product.productId}`} key={product.productId} className="product-item">
                            <div className="product-item" key={product.productId}>
                                <img src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} />
                                <h4>{product.name}</h4>
                                <p>{product.shortDescription}</p>
                                <p><b>₹{product.productVariants?.[0]?.pricePerUnit || '0'}</b></p>
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
