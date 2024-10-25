import React, { useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import './EmailSender.css'
import { showErrorToast, showSuccessToast } from '../Toasting/ThrottledToast';

const EmailSender = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading]=useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    
    try {
      const response = await axios.post('https://localhost:7181/api/Login/send-reset-link', email,{
        headers: {
          'Content-Type': 'application/json',
        },} );
      if (response.status === 200) {
        showSuccessToast("Password reset email sent!");
        setMessage('Please check your email for further instructions.');
      }
      console.log(response.data);
    } catch (err) {
      setError(err.response.data.message || 'An error occurred. Please try again.');
      showErrorToast("error occurred");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="recovery-container">
      <form onSubmit={handleSubmit} className="recovery-form">
        <h2>Password Recovery</h2>
        {error && <p className="error">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <span>Sending... <i className="fas fa-spinner fa-spin"></i></span>
          ) : (
            <span>Send Reset Link</span>
          )}          
        </button>
      </form>
    </div>
  );
};

export default EmailSender;
