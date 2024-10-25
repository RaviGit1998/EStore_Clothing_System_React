
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Wishlist.css';  
import { showErrorToast, showSuccessToast } from '../Toasting/ThrottledToast';
 import { jwtDecode } from 'jwt-decode';
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
 
  useEffect(() => {
    const fetchWishlist = () => {
      const token = localStorage.getItem('jwtToken');
      const decodedToken = jwtDecode(token); 
      const userId = decodedToken.sub;   
 
      if (token) {
        fetch(`https://localhost:7181/api/Wishlist/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          setWishlist(data);
        })
        .catch(err => {
          console.error('Error fetching wishlist:', err);
        });
      }
    };
    fetchWishlist();
  }, []);
 
  const handleRemoveFromWishlist = (productId) => {
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwtDecode(token);
  
    const userId = decodedToken.sub;  
   
 
    fetch(`https://localhost:7181/api/Wishlist/remove`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId
      })
    })
    .then(response => {
      if (response.ok) {
        setWishlist(prev => prev.filter(item => item.productId !== productId));
        showSuccessToast("Item removed from wishlist");
      } else {
        showErrorToast("Failed to remove item from wishlist");
      }
    })
    .catch(err => {
      console.error('Error removing from wishlist:', err);
      showErrorToast("Failed to remove item from wishlist");
    });
  };
 
  if (wishlist.length === 0) return <p className="empty-wishlist">Your wishlist is empty.</p>;
 
  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      <ul className="wishlist-items">
        {wishlist.map(product => (
          <li key={product.productId} className="wishlist-item">
            <div className="wishlist-item-image">
              {product.imageData ? (
                 <img src={`data:image/png;base64,${product.imageData}`} alt={product.name} className="wishlist-item-image-main" />
               ) : (
               <img src="fallback-image.jpg" alt={product.name} className="wishlist-item-image-main" />
             )}
             </div>
            <div className="wishlist-item-info">
              <h2 className="wishlist-item-title">{product.name}</h2>
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