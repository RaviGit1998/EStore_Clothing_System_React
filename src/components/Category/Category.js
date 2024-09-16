import React, { useState } from 'react';
import './Category.css';
import { Link } from 'react-router-dom';
 
const Category = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const fetchProductsByCategory = (categoryId) => {
    setLoading(true);
    setError(null);
 
    fetch(`https://localhost:7181/api/Product/category/${categoryId}`)
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
    <div className="category-products">
      <div className="category-buttons">
        <button onClick={() => fetchProductsByCategory(3)}>Men</button>
        <button onClick={() => fetchProductsByCategory(4)}>Women</button>
        <button onClick={() => fetchProductsByCategory(5)}>Kids</button>
      </div>
 
      {loading && <p>Loading products...</p>}
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
                <p>₹{product.productVariants?.[0]?.pricePerUnit || '0'}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};
 
export default Category;
 