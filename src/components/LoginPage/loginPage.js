// import React, { useState } from 'react';
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import './loginPage.css';
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     passwordHash: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     if (!formData.passwordHash) {
//       newErrors.passwordHash = 'Password is required';
//     } else if (formData.passwordHash.length < 6) {
//       newErrors.passwordHash = 'Password must be at least 6 characters long';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     try {
//       // post request to the API endpoint for login
//       const response = await axios.post('https://localhost:7181/api/Login', formData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },              
//     }

//   );
//   toast.success("logged in successfully")
//       if (response.status === 200) {
//         const token = response.data.token;
//         setMessage('Login successful!');

//         // store the JWT token in localstorage
//         localStorage.setItem('jwtToken', token);
//         localStorage.setItem('email',formData.email);
       
//         // Redirect to the dashboard page after successful login
//         navigate('/');
//       }
//     } catch (err) {
//       if (err.response) {
//         setErrors({ message: err.response.data.message || 'Invalid email or password' });
//         toast.warning("please enter correct email or password")
//       } else {
//         setErrors({ message: 'An error occurred' });
//       }
//     }
//   };

//   return (
//     <div className="login-container">      
//       <form onSubmit={handleSubmit} className="login-form">
//       <h2>Login</h2>
//       {message && <p className="message">{message}</p>}
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//           />
//           {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="passwordHash"
//             value={formData.passwordHash}
//             onChange={handleChange}
//             className={`form-control ${errors.passwordHash ? 'is-invalid' : ''}`}
//           />
//           {errors.passwordHash && <div className="invalid-feedback">{errors.passwordHash}</div>}
//         </div>

//         <button type="submit" className="btn3 btn btn-success">Login</button>
//         <NavLink to='/signup'><h6 className="btn2">New to Online Shop? Register</h6></NavLink>
//         <NavLink to='/passwordRecovery'><p className="btn2 ">forgot password</p></NavLink>
//       </form>
//        <ToastContainer/>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './loginPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    passwordHash: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const validateForm = () => {
    const newErrors = {};
 
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
 
    if (!formData.passwordHash) {
      newErrors.passwordHash = 'Password is required';
    } else if (formData.passwordHash.length < 6) {
      newErrors.passwordHash = 'Password must be at least 6 characters long';
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!validateForm()) return;
 
    try {
      // Post request to the API endpoint for login
      const response = await axios.post('https://localhost:7181/api/Login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      toast.success("Logged in successfully");
 
      if (response.status === 200) {
        const { token, role } = response.data; // Expecting role to be part of the response
        setMessage('Login successful!');
 
        // Store the JWT token in localStorage
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('role', role); // Save role for later use
 
        // Redirect to the appropriate dashboard based on role
        if (role === 'Admin') {
          navigate('/Admin'); // Admin Dashboard route
          window.location.reload();
        } else {
          navigate('/'); // User Dashboard route
        }
      }
    } catch (err) {
      if (err.response) {
        setErrors({ message: err.response.data.message || 'Invalid email or password' });
        toast.warning("Please enter correct email or password");
      } else {
        setErrors({ message: 'An error occurred' });
      }
    }
  };
 
  return (
    <div className="login-container">      
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {message && <p className="message">{message}</p>}
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="passwordHash"
            value={formData.passwordHash}
            onChange={handleChange}
            className={`form-control ${errors.passwordHash ? 'is-invalid' : ''}`}
          />
          {errors.passwordHash && <div className="invalid-feedback">{errors.passwordHash}</div>}
        </div>
 
        <button type="submit" className="btn3 btn btn-success">Login</button>
        <NavLink to='/signup'><h6 className="btn2">New to Online Shop? Register</h6></NavLink>
        <NavLink to='/passwordRecovery'><p className="btn2">Forgot Password</p></NavLink>
      </form>
      <ToastContainer />
    </div>
  );
};
 
export default LoginPage;