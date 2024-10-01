 
// // import React, { useState, useEffect } from 'react';

// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import './Profile.css';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import AddressForm from './Adress';
// // const ProfilePage = () => {
// //   const [userDetails, setUserDetails] = useState(null);
// //   const [shippingAddresses, setShippingAddresses] = useState([]);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentAddress, setCurrentAddress] = useState(null);
// //   const [orderDetails, setOrderDetails] = useState([]);
// //   const [productDetails, setProductDetails] = useState({});
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   // Get email and JWT token from localStorage
// //   const email = localStorage.getItem('email');
// //   const token = localStorage.getItem('jwtToken');

// //   useEffect(() => {
// //     if (!token) {
// //       navigate('/login');
// //     } else {
// //       fetchUserProfile();
// //     }
// //   }, [token, navigate]);

// //   const fetchUserProfile = async () => {
// //     try {
// //       const response = await axios.get(`https://localhost:7181/api/User/email/${email}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setUserDetails(response.data);
// //       localStorage.setItem("userId", response.data.userId);
// //       fetchUserShippingAddresses(response.data.userId);
// //       fetchUserOrderDetails(response.data.userId);
// //     } catch (error) {
// //       setError('Failed to fetch user details.');
// //     }
// //   };

// //   const fetchUserShippingAddresses = async (userId) => {
// //     try {
// //       const response = await axios.get(`https://localhost:7181/api/ShippingAddress/user/${userId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setShippingAddresses(response.data);
// //     } catch (error) {
// //       setError('Failed to fetch shipping addresses.');
// //     }
// //   };
// //   const handleAddAddress = async (address) => {
// //     try {
// //       await axios.post(`https://localhost:7181/api/ShippingAddress`, address, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       toast.success('Address added successfully!');
// //       fetchUserShippingAddresses(userDetails.userId); // Refresh addresses
// //       setIsEditing(false);
// //     } catch (error) {
// //       setError('Failed to add address.');
// //     }
// //   };

// //   const handleUpdateAddress = async (address) => {
// //     try {
// //       await axios.put(`https://localhost:7181/api/ShippingAddress/${address.shippingAddressId}`, address, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       toast.success('Address updated successfully!');
// //       fetchUserShippingAddresses(userDetails.userId); // Refresh addresses
// //       setIsEditing(false);
// //     } catch (error) {
// //       setError('Failed to update address.');
// //     }
// //   };

// //   const handleEditClick = (address) => {
// //     setCurrentAddress(address);
// //     setIsEditing(true);
// //   };

// //   const handleCancelEdit = () => {
// //     setIsEditing(false);
// //     setCurrentAddress(null);
// //   };

// //   const fetchUserOrderDetails = async (userId) => {
// //     try {
// //       const orderResponse = await axios.get(`https://localhost:7181/api/Order/user/${userId}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setOrderDetails(orderResponse.data);
// //       fetchProductDetails(orderResponse.data); // Fetch product details after getting orders
// //     } catch (error) {
// //       setError('No order details Found.');
// //     }
// //   };

// //   const fetchProductDetails = async (orders) => {
// //     const productVariantIds = new Set();

// //     // Collect unique product variant IDs from all orders
// //     orders.forEach(order => {
// //       order.orderItemRes.forEach(item => {
// //         productVariantIds.add(item.productVariantId);
// //       });
// //     });

// //     // Fetch product details for all unique product variant IDs
// //     const fetchPromises = Array.from(productVariantIds).map(async (variantId) => {
// //       try {
// //         const response = await axios.get(`https://localhost:7181/api/Product/variant/${variantId}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         return { id: variantId, data: response.data };
// //       } catch (error) {
// //         console.error(`Failed to fetch product details for variant ID ${variantId}`);
// //         return { id: variantId, data: null }; // Handle error gracefully
// //       }
// //     });

// //     // Wait for all fetch requests to complete
// //     const products = await Promise.all(fetchPromises);
// //     const productMap = {};
// //     products.forEach(product => {
// //       if (product.data) {
// //         productMap[product.id] = product.data;
// //       }
// //     });
// //     setProductDetails(productMap);
// //   };

// //   if (!userDetails) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="profile-page container">
// //       <h2>User Profile</h2>
// //       {error && <p className="error">{error}</p>}

// //       {/* User Details Section */}
// //       <div className="user-details">
// //         <h3>Your Details</h3>
// //         <p><strong>First Name:</strong> {userDetails.firstName}</p>
// //         <p><strong>Last Name:</strong> {userDetails.lastName}</p>
// //         <p><strong>Email:</strong> {userDetails.email}</p>
// //         <p><strong>Phone Number:</strong> {userDetails.phoneNumber}</p>
// //       </div>

// //       {/* Shipping Addresses Section */}
// //       <div className="shipping-addresses">
// //         <h3>Your Shipping Addresses</h3>
// //         {shippingAddresses.length === 0 ? (
// //           <div>
// //             <p>No shipping addresses found.</p>
// //             <button className="EditButton" onClick={() => setIsEditing(true)}>Add Address</button>
// //           </div>
// //         ) : (
// //           <ul>
// //             {shippingAddresses.map((address) => (
// //               <li key={address.shippingAddressId}>
            
// //                 <p><strong>Street:</strong> {address.street}</p>
// //                 <p><strong>City:</strong> {address.city}</p>
// //                 <p><strong>State:</strong> {address.state}</p>
// //                 <p><strong>Country:</strong> {address.country}</p>
// //                 <p><strong>Postal Code:</strong> {address.postalCode}</p>
// //                 <button className="EditButton" onClick={() => handleEditClick(address)}>Edit</button>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>

// //       {isEditing && (
// //         <AddressForm
// //           onSubmit={currentAddress ? handleUpdateAddress : handleAddAddress}
// //           initialAddress={currentAddress}
// //           onCancel={handleCancelEdit}
// //         />
// //       )}

// //       {/* Order Details Section */}
// //       <div className="profile-order-details">
// //         <h3>Your Orders</h3>
// //         {orderDetails.length === 0 ? (
// //           <p>No orders found.</p>
// //         ) : (
// //           <ul>
// //             {orderDetails.map((order) => (
// //               <li key={order.id}>
// //                 <p><strong>Order ID:</strong> {order.id}</p>
// //                 <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>

// //                 {/* Product Details Section */}
// //                 {order.orderItemRes && order.orderItemRes.length > 0 ? (
// //                   <ul>
// //                     {order.orderItemRes.map((item) => {
// //                       const product = productDetails[item.productVariantId];
// //                       return (
// //                         <li key={item.productVariantId} className="profile-order-item">
// //                         <div className="profile-product-info">
// //                           {product && product.imageData ? (
// //                             <img src={`data:image/png;base64,${product.imageData}`} alt={product.name} className="profile-product-image" />
// //                           ) : (
// //                             <p>No image available</p>
// //                           )}
// //                           <div className="profile-product-details">                         
// //                             <p><strong>Product Name:</strong> {product ? product.name : 'N/A'}</p>
// //                             <p><strong>Short Description:</strong> {product ? product.shortDescription : 'N/A'}</p>
// //                             <p><strong>Quantity:</strong> {item.quantity}</p>
// //                             <p><strong>Price:</strong> ₹{item.price}</p>
// //                           </div>
// //                         </div>
// //                       </li>
// //                       );
// //                     })}
// //                   </ul>
// //                 ) : (
// //                   <p>No products found in this order.</p>
// //                 )}
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>

// //       {/* Logout Button */}
// //       <button
// //         className="btn btn-danger"
// //         onClick={() => {
// //           localStorage.removeItem('jwtToken');
// //           localStorage.removeItem('userId');
// //           toast.success("Logged out successfully");
// //           navigate('/login');
// //         }}
// //       >
// //         Logout
// //       </button>
// //       {/* Switch Account Button */}
// //       <button
// //         className="btn btn-success"
// //         style={{ marginLeft: '20px' }}
// //         onClick={() => navigate('/login')}
// //       >
// //         Switch Account
// //       </button>
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default ProfilePage;

 
// import React, { useState, useEffect } from 'react';

// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AddressForm from './Adress';
// const ProfilePage = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [shippingAddresses, setShippingAddresses] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentAddress, setCurrentAddress] = useState(null);
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [productDetails, setProductDetails] = useState({});
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Get email and JWT token from localStorage
//   const email = localStorage.getItem('email');
//   const token = localStorage.getItem('jwtToken');

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     } else {
//       fetchUserProfile();
//     }
//   }, [token, navigate]);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await axios.get(`https://localhost:7181/api/User/email/${email}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserDetails(response.data);
//       localStorage.setItem("userId", response.data.userId);
//       fetchUserShippingAddresses(response.data.userId);
//       fetchUserOrderDetails(response.data.userId);
//     } catch (error) {
//       setError('Failed to fetch user details.');
//     }
//   };

//   const fetchUserShippingAddresses = async (userId) => {
//     try {
//       const response = await axios.get(`https://localhost:7181/api/ShippingAddress/user/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setShippingAddresses(response.data);
//     } catch (error) {
//       setError('Failed to fetch shipping addresses.');
//     }
//   };
//   const handleAddAddress = async (address) => {
//     try {
//       await axios.post(`https://localhost:7181/api/ShippingAddress`, address, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success('Address added successfully!');
//       fetchUserShippingAddresses(userDetails.userId); // Refresh addresses
//       setIsEditing(false);
//     } catch (error) {
//       setError('Failed to add address.');
//     }
//   };

//   const handleUpdateAddress = async (address) => {
//     try {
//       await axios.put(`https://localhost:7181/api/ShippingAddress/${address.shippingAddressId}`, address, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success('Address updated successfully!');
//       fetchUserShippingAddresses(userDetails.userId); // Refresh addresses
//       setIsEditing(false);
//     } catch (error) {
//       setError('Failed to update address.');
//     }
//   };

//   const handleEditClick = (address) => {
//     setCurrentAddress(address);
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setCurrentAddress(null);
//   };

//   const fetchUserOrderDetails = async (userId) => {
  
//     try {
//       const orderResponse = await axios.get(`https://localhost:7181/api/Order/user/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setOrderDetails(orderResponse.data);
//       fetchProductDetails(orderResponse.data); // Fetch product details after getting orders
//     } catch (error) {
//       setError('No order details Found.');
//     }
//   };

//   const fetchProductDetails = async (orders) => {
//     const productVariantIds = new Set();

//     // Collect unique product variant IDs from all orders
//     orders.forEach(order => {
//       order.orderItemRes.forEach(item => {
//         productVariantIds.add(item.productVariantId);
//       });
//     });

//     // Fetch product details for all unique product variant IDs
//     const fetchPromises = Array.from(productVariantIds).map(async (variantId) => {
//       try {
//         const response = await axios.get(`https://localhost:7181/api/Product/variant/${variantId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         return { id: variantId, data: response.data };
//       } catch (error) {
//         console.error(`Failed to fetch product details for variant ID ${variantId}`);
//         return { id: variantId, data: null }; // Handle error gracefully
//       }
//     });

//     // Wait for all fetch requests to complete
//     const products = await Promise.all(fetchPromises);
//     const productMap = {};
//     products.forEach(product => {
//       if (product.data) {
//         productMap[product.id] = product.data;
//       }
//     });
//     setProductDetails(productMap);
//   };

//   if (!userDetails) {
//     return <div>Loading...</div>;
//   }


//   const handleCancelOrder = async (orderId, shipping) => {
//     try {
//       const currentDate = new Date();
//       const shippingDate = new Date(shipping.shippigDate);
//       const estimatedDeliveryDate = new Date(shipping.estimatedDeliveryDate);

//       // Check if the order is already shipped or delivered based on shipping and estimated delivery date
//       if (currentDate > shippingDate) {
//         if (currentDate < estimatedDeliveryDate) {
//           toast.error("You cannot cancel the order as it is already shipped.");
//         } else {
//           toast.error("You cannot cancel the order as it is already delivered.");
//         }
//         return; // Exit the function early
//       }

//       // Fetch the current order details to check the status before attempting cancellation
//       const orderResponse = await axios.get(`https://localhost:7181/api/Order/${orderId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
     
//       const currentOrder = orderResponse.data;

//       // Check if the order is already canceled
//       if (currentOrder.status === "Cancelled") {
//         toast.info("This order has already been canceled.");
//         return; // Exit if the order is already canceled
//       }

//       // Proceed to cancel the order
//       const cancelResponse = await axios.put(
//         `https://localhost:7181/api/Order/cancel/${orderId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const today = new Date();
//       const todayDate = new Date(today.getTime());
//       var userEmail=localStorage.getItem('email');
//       await sendOrderCancelDetailsToEmail(orderId,orderResponse.data.totalAmount,todayDate,userEmail)

//       const updatedOrder = cancelResponse.data;

//       if (updatedOrder.status === "Cancelled") {
//         toast.success("Order canceled successfully!");
       
//       } else {
//         toast.error("Failed to cancel the order.");
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 500) {
//         toast.info("This order has already been canceled.");
//       } else {
//         toast.error("Failed to cancel order.");
//         console.error("Error cancelling order:", error);
//       }
//     }
//   };
  
//   const sendOrderCancelDetailsToEmail = async (orderId, totalAmount,orderDate, email) => {
//     console.log("order Cancellation",orderId, totalAmount,orderDate, email)
//     try {
//       const response = await axios.post('https://localhost:7181/api/Order/sendOrderCancelDetails', {
//         email,
//         orderId,
//         totalAmount,
//         orderDate
//       });
  
//       if (response.status === 200) {
//         console.log('Order Cancellation Details sent to email successfully.');
//       } else {
//         console.error('Failed to send order details.');
//       }
//     } catch (error) {
//       console.error('Error sending order details to email:', error);
//     }
//   };
  
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
//           <div>
//             <p>No shipping addresses found.</p>
//             <button className="EditButton" onClick={() => setIsEditing(true)}>Add Address</button>
//           </div>
//         ) : (
//           <ul>
//             {shippingAddresses.map((address) => (
//               <li key={address.shippingAddressId}>
            
//                 <p><strong>Street:</strong> {address.street}</p>
//                 <p><strong>City:</strong> {address.city}</p>
//                 <p><strong>State:</strong> {address.state}</p>
//                 <p><strong>Country:</strong> {address.country}</p>
//                 <p><strong>Postal Code:</strong> {address.postalCode}</p>
//                 <button className="EditButton" onClick={() => handleEditClick(address)}>Edit</button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {isEditing && (
//         <AddressForm
//           onSubmit={currentAddress ? handleUpdateAddress : handleAddAddress}
//           initialAddress={currentAddress}
//           onCancel={handleCancelEdit}
//         />
//       )}

//       {/* Order Details Section */}
//       <div className="profile-order-details">
//         <h3>Your Orders</h3>
//         {orderDetails.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <ul>
//               {orderDetails.filter(order => order.status === 'Confirmed' || order.status==='Cancelled').map((order) => (
//               <li key={order.id}>
//                 <p><strong>Order ID:</strong> {order.id}</p>
              
//                 <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>

//                 {/* Product Details Section */}
//                 {order.orderItemRes && order.orderItemRes.length > 0 ? (
//                   <ul>
//                     {order.orderItemRes.map((item) => {
//                       const product = productDetails[item.productVariantId];
//                       return (
//                         <li key={item.productVariantId} className="profile-order-item">
//                         <div className="profile-product-info">
//                           {product && product.imageData ? (
//                             <img src={`data:image/png;base64,${product.imageData}`} alt={product.name} className="profile-product-image" />
//                           ) : (
//                             <p>No image available</p>
//                           )}
//                           <div className="profile-product-details">                         
//                             <p><strong>Product Name:</strong> {product ? product.name : 'N/A'}</p>
//                             <p><strong>Short Description:</strong> {product ? product.shortDescription : 'N/A'}</p>
//                             <p><strong>Quantity:</strong> {item.quantity}</p>
//                             <p><strong>Price:</strong> ₹{item.price}</p>
//                           </div>
//                         </div>
//                       </li>
//                       );
//                     })}
//                   </ul>
//                 ) : (
//                   <p>No products found in this order.</p>
//                 )}
//               <div>
//       {order.status === 'Cancelled' ? (
//         <p>Order has been cancelled.</p> // Show cancellation message
//       ) : order.shipping && order.shipping.estimatedDeliveryDate ? (
//         new Date() > new Date(order.shipping.estimatedDeliveryDate) ? (
//           <p>Order has been successfully delivered.</p> // Show delivery status
//         ) : (
//           <button
//             className="btn btn-danger"
//             onClick={() => handleCancelOrder(order.id, order.shipping)}
//           >
//             Cancel Order
//           </button> // Show Cancel button only if not delivered
//         )
//       ) : (
//         <p>Shipping details not available.</p>
//       )}
//     </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Logout Button */}
//       <button
//         className="btn btn-danger"
//         onClick={() => {
//           localStorage.removeItem('jwtToken');
//           localStorage.removeItem('userId');
//           toast.success("Logged out successfully");
//           navigate('/login');
//         }}
//       >
//         Logout
//       </button>
//       {/* Switch Account Button */}
//       <button
//         className="btn btn-success"
//         style={{ marginLeft: '20px' }}
//         onClick={() => navigate('/login')}
//       >
//         Switch Account
//       </button>
//       <ToastContainer />
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
import AddressForm from './Adress';
 
const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState('');
  const [expandedMonth, setExpandedMonth] = useState(null);
  const navigate = useNavigate();
 
  // Get email and JWT token from localStorage
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('jwtToken');
 
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, [token, navigate]);
 
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`https://localhost:7181/api/User/email/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails(response.data);
      localStorage.setItem("userId", response.data.userId);
      fetchUserShippingAddresses(response.data.userId);
      fetchUserOrderDetails(response.data.userId);
    } catch (error) {
      setError('Failed to fetch user details.');
    }
  };
 
  const fetchUserShippingAddresses = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7181/api/ShippingAddress/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShippingAddresses(response.data);
    } catch (error) {
      setError('Failed to fetch shipping addresses.');
    }
  };
  const handleAddAddress = async (address) => {
    try {
      await axios.post(`https://localhost:7181/api/ShippingAddress`, address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Address added successfully!');
      fetchUserShippingAddresses(userDetails.userId); // Refresh addresses
      setIsEditing(false);
    } catch (error) {
      setError('Failed to add address.');
    }
  };
 
  const handleUpdateAddress = async (address) => {
    try {
      await axios.put(`https://localhost:7181/api/ShippingAddress/${address.shippingAddressId}`, address, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Address updated successfully!');
      fetchUserShippingAddresses(userDetails.userId); // Refresh addresses
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update address.');
    }
  };
 
  const handleEditClick = (address) => {
    setCurrentAddress(address);
    setIsEditing(true);
  };
 
  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentAddress(null);
  };
 
  const fetchUserOrderDetails = async (userId) => {
    try {
      const orderResponse = await axios.get(`https://localhost:7181/api/Order/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const groupedOrders = groupOrdersByMonth(orderResponse.data);
      setOrderDetails(groupedOrders);
      fetchProductDetails(orderResponse.data);
    } catch (error) {
      setError('No order details found.');
    }
  };
 
  const groupOrdersByMonth = (orders) => {
    // First, sort the orders by date in descending order
    orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
 
    return orders.reduce((acc, order) => {
      const orderDate = new Date(order.orderDate);
      const monthYear = orderDate.toLocaleString('default', { month: 'long', year: 'numeric' });
 
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(order);
      return acc;
    }, {});
  };
 
  const sortedMonths = Object.keys(orderDetails).sort((a, b) => new Date(b) - new Date(a));
  const handleMonthToggle = (month) => {
    // Toggle the expanded month
    setExpandedMonth(expandedMonth === month ? null : month);
  };
 
  const fetchProductDetails = async (orders) => {
    const productVariantIds = new Set();
 
    // Collect unique product variant IDs from all orders
    orders.forEach(order => {
      order.orderItemRes.forEach(item => {
        productVariantIds.add(item.productVariantId);
      });
    });
 
    // Fetch product details for all unique product variant IDs
    const fetchPromises = Array.from(productVariantIds).map(async (variantId) => {
      try {
        const response = await axios.get(`https://localhost:7181/api/Product/variant/${variantId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return { id: variantId, data: response.data };
      } catch (error) {
        console.error(`Failed to fetch product details for variant ID ${variantId}`);
        return { id: variantId, data: null }; // Handle error gracefully
      }
    });
 
    // Wait for all fetch requests to complete
    const products = await Promise.all(fetchPromises);
    const productMap = {};
    products.forEach(product => {
      if (product.data) {
        productMap[product.id] = product.data;
      }
    });
    setProductDetails(productMap);
  };
 // sharing order details via email
 const shareOrderDetails = (order) => {
  const productsInOrder = order.orderItemRes.map(item => ({
    ...item,
    productDetails: productDetails[item.productVariantId] || null, // Get product details or null if not available
  }));
 
  // Redirect to ShareViaEmail page and pass the order and product details
  navigate('/shareViaEmail', { state: { order, products: productsInOrder } });
};
const handleCancelOrder = async (orderId, shipping) => {
      try {
        const currentDate = new Date();
        const shippingDate = new Date(shipping.shippigDate);
        const estimatedDeliveryDate = new Date(shipping.estimatedDeliveryDate);
  
        // Check if the order is already shipped or delivered based on shipping and estimated delivery date
        if (currentDate > shippingDate) {
          if (currentDate < estimatedDeliveryDate) {
            toast.error("You cannot cancel the order as it is already shipped.");
          } else {
            toast.error("You cannot cancel the order as it is already delivered.");
          }
          return; // Exit the function early
        }
  
        // Fetch the current order details to check the status before attempting cancellation
        const orderResponse = await axios.get(`https://localhost:7181/api/Order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        const currentOrder = orderResponse.data;
  
        // Check if the order is already canceled
        if (currentOrder.status === "Cancelled") {
          toast.info("This order has already been canceled.");
          return; // Exit if the order is already canceled
        }
  
        // Proceed to cancel the order
        const cancelResponse = await axios.put(
          `https://localhost:7181/api/Order/cancel/${orderId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const today = new Date();
        const todayDate = new Date(today.getTime());
        var userEmail=localStorage.getItem('email');
        await sendOrderCancelDetailsToEmail(orderId,orderResponse.data.totalAmount,todayDate,userEmail)
  
        const updatedOrder = cancelResponse.data;
  
        if (updatedOrder.status === "Cancelled") {
          toast.success("Order canceled successfully!");
         
        } else {
          toast.error("Failed to cancel the order.");
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.info("This order has already been canceled.");
        } else {
          toast.error("Failed to cancel order.");
          console.error("Error cancelling order:", error);
        }
      }
    };
    
    const sendOrderCancelDetailsToEmail = async (orderId, totalAmount,orderDate, email) => {
      console.log("order Cancellation",orderId, totalAmount,orderDate, email)
      try {
        const response = await axios.post('https://localhost:7181/api/Order/sendOrderCancelDetails', {
          email,
          orderId,
          totalAmount,
          orderDate
        });
    
        if (response.status === 200) {
          console.log('Order Cancellation Details sent to email successfully.');
        } else {
          console.error('Failed to send order details.');
        }
      } catch (error) {
        console.error('Error sending order details to email:', error);
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
          <div>
            <p>No shipping addresses found.</p>
            <button className="EditButton" onClick={() => setIsEditing(true)}>Add Address</button>
          </div>
        ) : (
          <ul>
            {shippingAddresses.map((address) => (
              <li key={address.shippingAddressId}>
           
                <p><strong>Street:</strong> {address.street}</p>
                <p><strong>City:</strong> {address.city}</p>
                <p><strong>State:</strong> {address.state}</p>
                <p><strong>Country:</strong> {address.country}</p>
                <p><strong>Postal Code:</strong> {address.postalCode}</p>
                <button className="EditButton" onClick={() => handleEditClick(address)}>Edit</button>
              </li>
            ))}
          </ul>
        )}
      </div>
 
      {isEditing && (
        <AddressForm
          onSubmit={currentAddress ? handleUpdateAddress : handleAddAddress}
          initialAddress={currentAddress}
          onCancel={handleCancelEdit}
        />
      )}
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
  {/* Order Details Section */}
  <div className="profile-order-details">
      <h3>Your Orders</h3>
      {Object.keys(orderDetails).length === 0 ? (
        <p>No orders found.</p>
      ) : (
        sortedMonths.map(month => (
          <div key={month}>
            <h4 onClick={() => handleMonthToggle(month)} style={{ cursor: 'pointer',color:'grey ' }}>
              {month} {expandedMonth === month ? '' : ''}
            </h4>
            {expandedMonth === month && (
              <ul>
                {orderDetails[month].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).filter(order => order.status === 'Confirmed' || order.status==='Cancelled').map(order => (
                  <li key={order.id}>
                      <button className="shareButton" onClick={() => shareOrderDetails(order)}>Share via Email</button>
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                 
                    {/* Product Details Section */}
                    {order.orderItemRes && order.orderItemRes.length > 0 ? (
                      <ul>
                        {order.orderItemRes.map(item => {
                          const product = productDetails[item.productVariantId];
                          return (
                            <li key={item.productVariantId} className="profile-order-item">
                              <div className="profile-product-info">
                                {product && product.imageData ? (
                                  <img src={`data:image/png;base64,${product.imageData}`} alt={product.name} className="profile-product-image" />
                                ) : (
                                  <p>No image available</p>
                                )}
                                <div className="profile-product-details">
                                  <p><strong>Product Name:</strong> {product ? product.name : 'N/A'}</p>
                                  <p><strong>Short Description:</strong> {product ? product.shortDescription : 'N/A'}</p>
                                  <p><strong>Quantity:</strong> {item.quantity}</p>
                                  <p><strong>Price:</strong> ₹{item.price}</p>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p>No products found in this order.</p>
                    )}
      <div>
       {order.status === 'Cancelled' ? (
        <p>Order has been cancelled.</p> // Show cancellation message
      ) : order.shipping && order.shipping.estimatedDeliveryDate ? (
        new Date() > new Date(order.shipping.estimatedDeliveryDate) ? (
          <p>Order has been successfully delivered.</p> // Show delivery status
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => handleCancelOrder(order.id, order.shipping)}
          >
            Cancel Order
          </button> // Show Cancel button only if not delivered
        )
      ) : (
        <p>Shipping details not available.</p>
      )}
    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
 
 
      <ToastContainer />
    </div>
  );
};
 
export default ProfilePage;
 