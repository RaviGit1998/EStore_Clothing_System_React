// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css';
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const ProfilePage = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [shippingAddresses, setShippingAddresses] = useState([]);
//   const [orderDetails,setOrderDetails]=useState([]);
//   const [error, setError] = useState('');
//   //const [msg, setmsg] = useState('');
//   const navigate = useNavigate();

//   // Get userId and JWT token from localStorage
//   const email = localStorage.getItem('email');
//   const token = localStorage.getItem('jwtToken');

//   useEffect(() => {
//     if (!token) {
//       // Redirect to login if not authenticated
//      navigate('/login');
     
//     } else {
//       fetchUserProfile();

//     }
//   }, [token, navigate]);

//   // Fetch user details from the backend
//   const fetchUserProfile = async () => {
//     try {
//       var response = await axios.get(`https://localhost:7181/api/User/email/${email}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setUserDetails(response.data);
//       //stores userid in local storage
//       localStorage.setItem("userId",response.data.userId)
//       fetchUserShippingAddresses(response.data.userId);
//       fetchUserOrderDetails(response.data.userId);
      
//     } catch (error) {
//       setError('Failed to fetch user details.');
//     }
//   };

//   // Fetch user shipping addresses from the backend
//   const fetchUserShippingAddresses = async (UserId) => {
//     try {
//       const responseShipping = await axios.get(`https://localhost:7181/api/ShippingAddress/user/${UserId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setShippingAddresses(responseShipping.data);
//     } catch (error) {
//       setError('Failed to fetch shipping addresses.');
//     }
//   };
//   const fetchUserOrderDetails = async (UserId) => {
//     try {
//       const OrderResponse = await axios.get(`https://localhost:7181/api/Order/user/${UserId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setOrderDetails(OrderResponse);
//     } catch (error) {
//       setError('Failed to fetch shipping addresses.');
//     }
//   };

//   if (!userDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-page container">
//       <h2>User Profile</h2>
      
//       {error && <p className="error">{error}</p>}

//       {/* User Details Section */}
//       <div className="user-details">
//         <h3>Your Details</h3>
//         <p><strong>First Name:</strong> {userDetails.firstName}</p>
//         <p><strong>Last Name:</strong> {userDetails.lastName}</p>
//         <p><strong>Email:</strong> {userDetails.email}</p>
//         <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
//       </div>

//       {/* Shipping Addresses Section */}
//       <div className="shipping-addresses">
//         <h3>Your Shipping Addresses</h3>
//         {shippingAddresses.length === 0 ? (
//           <p>No shipping addresses found.</p>
//         ) : (
//           <ul>
//             {shippingAddresses.map((address) => (
//               <li key={address.shippingAddressId}>
//                 <p><strong>Street:</strong> {address.street}</p>
//                 <p><strong>City:</strong> {address.city}</p>
//                 <p><strong>State:</strong> {address.state}</p>
//                 <p><strong>Country:</strong> {address.country}</p>
//                 <p><strong>Postal Code:</strong> {address.postalCode}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Button to Logout */}
//       <button
//         className="btn btn-danger"
//         onClick={() => {
//           localStorage.removeItem('jwtToken');
//           localStorage.removeItem('userId');
//           toast.success("logged out successfully");
//           navigate('/login');
        
//         }}
//       >
//         Logout
//       </button>
//       {/*button to login as another user*/}
//       <button
//       className="btn btn-success"
//       style={{marginLeft:'20px'}}
//       onClick={
//         ()=>{
//           navigate('/login')
//         }
//       } 
//       >
//        SwitchAccount
//       </button>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Get email and JWT token from localStorage
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (!token) {
      // Redirect to login if not authenticated
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, [token, navigate]);

  // Fetch user details from the backend
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://localhost:7181/api/User/email/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data);
      localStorage.setItem("userId", response.data.userId);
      fetchUserShippingAddresses(response.data.userId);
      fetchUserOrderDetails(response.data.userId);
    } catch (error) {
      setError('Failed to fetch user details.');
    }
  };

  // Fetch user shipping addresses
  const fetchUserShippingAddresses = async (UserId) => {
    try {
      const responseShipping = await axios.get(`https://localhost:7181/api/ShippingAddress/user/${UserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShippingAddresses(responseShipping.data);
    } catch (error) {
      setError('Failed to fetch shipping addresses.');
    }
  };

  // Fetch user order details
  const fetchUserOrderDetails = async (UserId) => {
    try {
      const orderResponse = await axios.get(`https://localhost:7181/api/Order/user/${UserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderDetails(orderResponse.data); // Ensure this is the correct data format
    } catch (error) {
      setError('Failed to fetch order details.');
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

      {/* Order Details Section */}
      <div className="order-details">
        <h3>Your Orders</h3>
        {orderDetails.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orderDetails.map((order) => (
               <li key={order.id}>
               <p><strong>Order ID:</strong> {order.id}</p>
               <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
               <p><strong>Status:</strong> {order.status}</p>

               {/* Product Details Section */}
               {order.orderItemRes && order.orderItemRes.length > 0 ? (
                 <div className="product-details">
                   <h4>Products:</h4>
                   <ul>
                     {order.orderItemRes.map((item) => (
                       <li key={item.productVariantId}>
                         <p><strong>Product Variant ID:</strong> {item.productVariantId}</p>
                         <p><strong>Quantity:</strong> {item.quantity}</p>
                         <p><strong>Price:</strong> ₹{item.price}</p>
                       </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p>No products found in this order.</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Logout Button */}
      <button
        className="btn btn-danger"
        onClick={() => {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('userId');
          toast.success("Logged out successfully");
          navigate('/login');
        }}
      >
        Logout
      </button>
      {/* Switch Account Button */}
      <button
        className="btn btn-success"
        style={{ marginLeft: '20px' }}
        onClick={() => navigate('/login')}
      >
        Switch Account
      </button>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
