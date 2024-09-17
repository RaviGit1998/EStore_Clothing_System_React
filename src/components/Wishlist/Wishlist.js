import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Wishlist.css';  // Make sure you have the CSS file for styling

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(savedWishlist);
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.productId !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  if (wishlist.length === 0) return <p className="empty-wishlist">Your wishlist is empty.</p>;

  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      <ul className="wishlist-items">
        {wishlist.map(product => (
          <li key={product.productId} className="wishlist-item">
            <div className="wishlist-item-image">
              {product.imageBase64 ? (
                <img src={`data:image/png;base64,${product.imageBase64}`} alt={product.name} className="wishlist-item-image-main" />
              ) : (
                <img src="fallback-image.jpg" alt={product.name} className="wishlist-item-image-main" />
              )}
            </div>
            <div className="wishlist-item-info">
              <h2 className="wishlist-item-title">{product.name}</h2>
              <p className="wishlist-item-price">₹{product.productVariants?.[0]?.pricePerUnit || '0'}</p>
              <NavLink to={`/product/${product.productId}`} className="btn6 btn btn-success">View Details</NavLink>
              <button 
                className="btn6 btn btn-danger" 
                onClick={() => handleRemoveFromWishlist(product.productId)}
              >
                Remove from Wishlist
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
