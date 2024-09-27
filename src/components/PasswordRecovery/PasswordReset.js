import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './PasswordReset.css';
const ResetPassword = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const email = query.get('email');
 const navigate= useNavigate();
  const [newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newpassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const newPassword=newpassword;
    console.log(email+" "+token+" "+newPassword);
    try {
      const response = await axios.post('https://localhost:7181/api/Login/reset-password',  {
        email: email,        
        newPassword: newPassword,
        token: token
      },{
        headers: {
          'Content-Type': 'application/json',  // Confirm that this is needed
        },
      }
      );
      toast.success(response.data.message);
     navigate('/login');
    } catch (err) {
      setError(err.response.data.message || 'An error occurred. Please try again.');
      toast.error("Error resetting password.");
    }
  };

  return (
    <div className="Password-reset">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        {error && <p className="error">{error}</p>}
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
