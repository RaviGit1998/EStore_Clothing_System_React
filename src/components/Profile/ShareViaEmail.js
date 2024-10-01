import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import './ShareViaEmail.css';
const ShareViaEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
 
  // Retrieve the order and products from location state
  const { order, products } = location.state || {};
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error
 
    try {
      const subject = `Order Details: ${order.id}`;
     
      // Build the email body with order and product details
      const body = `
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
        <p><strong>Products:</strong></p>
        <ul>
          ${products.map(item => `
            <li>
              <strong>Product Name:</strong> ${item.productDetails ? item.productDetails.name : 'N/A'} <br />
              <strong>Quantity:</strong> ${item.quantity} <br />
              <strong>Price:</strong> ₹${item.price} <br />
            </li>
          `).join('')}
        </ul>
      `;
 
      // Send the email via API
      await axios.post('https://localhost:7181/api/User/send-email', {
        toEmail: email,
        subject: subject,
        body: body,
      });
      alert("Email sent successfully")
      toast.success("Email sent successfully!");
      setEmail(''); // Clear the input field
    } catch (error) {
      console.error("Failed to send email:", error);
      setError("Failed to send email.");
    }
  };
 
  return (
    <div className="share">
      <form onSubmit={handleSubmit}>
        <h2>Enter the Email Address</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Share Order Details</button>
      </form>
    </div>
  );
};
 
export default ShareViaEmail;