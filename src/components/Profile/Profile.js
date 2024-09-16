import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import './profilePage.css';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [error, setError] = useState('');
  //const [msg, setmsg] = useState('');
  const navigate = useNavigate();

  // Get userId and JWT token from localStorage
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (!token) {
      // Redirect to login if not authenticated
     navigate('/login');
     
    } else {
      fetchUserProfile();
      fetchUserShippingAddresses();
    }
  }, [token, navigate]);

  // Fetch user details from the backend
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://localhost:7181/api/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data);
    } catch (error) {
      setError('Failed to fetch user details.');
    }
  };

  // Fetch user shipping addresses from the backend
  const fetchUserShippingAddresses = async () => {
    try {
      const response = await axios.get(`https://localhost:7181/api/ShippingAddress/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShippingAddresses(response.data);
    } catch (error) {
      setError('Failed to fetch shipping addresses.');
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page container">
      <h2>User Profile</h2>
      
      {error && <p className="error">{error}</p>}

      {/* User Details Section */}
      <div className="user-details">
        <h3>Your Details</h3>
        <p><strong>First Name:</strong> {userDetails.firstName}</p>
        <p><strong>Last Name:</strong> {userDetails.lastName}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
      </div>

      {/* Shipping Addresses Section */}
      <div className="shipping-addresses">
        <h3>Your Shipping Addresses</h3>
        {shippingAddresses.length === 0 ? (
          <p>No shipping addresses found.</p>
        ) : (
          <ul>
            {shippingAddresses.map((address) => (
              <li key={address.shippingAddressId}>
                <p><strong>Street:</strong> {address.street}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>State:</strong> {address.state}</p>
                <p><strong>Country:</strong> {address.country}</p>
                <p><strong>Postal Code:</strong> {address.postalCode}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Button to Logout */}
      <button
        className="btn btn-danger"
        onClick={() => {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('userId');
          navigate('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
