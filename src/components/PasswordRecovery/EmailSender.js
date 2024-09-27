import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EmailSender.css'

const EmailSender = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://localhost:7181/api/Login/send-reset-link', email,{
        headers: {
          'Content-Type': 'application/json',
        },} );
      if (response.status === 200) {
        toast.success("Password reset email sent!");
        setMessage('Please check your email for further instructions.');
      }
      console.log(response.data);
    } catch (err) {
      setError(err.response.data.message || 'An error occurred. Please try again.');
      toast.error("error occurred");
    }
  };

  return (
    <div className="recovery-container">
      <form onSubmit={handleSubmit} className="recovery-form">
        <h2>Password Recovery</h2>
        {message && <p className="message">{message}</p>}
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

        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmailSender;
