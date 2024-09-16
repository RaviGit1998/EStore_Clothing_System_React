import React, { useState } from 'react';
import axios from 'axios';
import './SignupPage.css'; 
import { NavLink } from 'react-router-dom';
const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    passwordHash: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name Validation
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters long';
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = 'First name cannot exceed 50 characters';
    }

    // Last Name Validation
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters long';
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = 'Last name cannot exceed 50 characters';
    }

    // Email Validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email cannot exceed 100 characters';
    }

    // Phone Number Validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) { // Assuming a 10-digit phone number
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    // Password Validation
    if (!formData.passwordHash) {
      newErrors.passwordHash = 'Password is required';
    } else if (formData.passwordHash.length < 6) {
      newErrors.passwordHash = 'Password must be at least 6 characters long';
    } else if (formData.passwordHash.length > 100) {
      newErrors.passwordHash = 'Password cannot exceed 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

   
    try {
      // POST request to the API endpoint
      const response = await axios.post('https://localhost:7181/api/User/RegisterUser', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setMessage('User registered successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          passwordHash: '',
        }); // Clear form fields
     
      }
      
    } catch (err) {
      // Handle errors from API
      if (err.response) {
        setErrors(err.response.data.message || 'An error occurred');
      } else {
        setErrors('An error occurred');
      }
    }
  };

  return (
    <div className="sign-container">
    <div className="signup-container">
      <h2>Sign Up</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>          
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
          />
          {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="passwordHash">Password:</label>
          <input
            type="password"
            id="passwordHash"
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            className={`form-control ${errors.passwordHash ? 'is-invalid' : ''}`}
          />
          {errors.passwordHash && <div className="invalid-feedback">{errors.passwordHash}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Register</button>       
       </form> 
      <NavLink to='/login'><button className="btn2 btn btn-outline-success">Existing User? Login</button></NavLink>
    </div>
    </div>
  );
};

export default SignupPage;
