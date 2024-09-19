// import { useLocation,Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
 
// export default function OrderSummary({id}) {
//   const location = useLocation();
//   const { orderItems } = location.state || {}; // Get orderItems from state, default to empty object if undefined
 
//   const [totalAmount, setTotalAmount] = useState(null);
//   const [couponCode, setCouponCode] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [discountedTotal, setDiscountedTotal] = useState(null);
 
//   // Extract order ID from URL params if needed
 
 
//   useEffect(() => {
//     async function fetchOrderDetails() {
//       try {
//         const response = await axios.get(`https://localhost:7181/api/Order/${id}/total-amount`);
       
//         console.log("total amount",response.data);
//         setTotalAmount(response.data);
//       } catch (error) {
//         console.error('Error fetching total amount details:', error);
//       } finally {
//         setLoading(false);
//       }
//     }
 
//     fetchOrderDetails();
//   }, [id]);
 
//   async function handleApplyCoupon() {
//     try {
//       const response = await axios.get(`https://localhost:7181/api/Order/${id}/total-amount?couponCode=${couponCode}`);
//       setDiscountedTotal(response.data);
//     } catch (error) {
//       console.error('Error applying coupon:', error);
//     }
//   }
 
// //   async function handleProceedPayment() {
// //     try {
// //       await axios.post(`https://localhost:7181/api/Order/${id}/confirm-total`, { totalAmount: discountedTotal });
// //       alert('Order confirmed and total saved.');
// //       // Redirect to payment page or next step
// //     } catch (error) {
// //       console.error('Error confirming total:', error);
// //       alert('Failed to confirm total.');
// //     }
// //   }
 
//   if (loading) {
//     return <div>Loading...</div>;
//   }
 
//   if (!orderItems || orderItems.length === 0) {
//     return <div>No order details available.</div>;
//   }
 
//   return (
//     <div className="container mt-4">
//       <h2>Order Summary</h2>
//       <ul className="list-group">
//         {orderItems.map(item => (
//           <li key={item.productVariants[0].productVariantId} className="list-group-item d-flex justify-content-between align-items-center">
//             <div>
//              <img
//                             src={`data:image/png;base64,${item.imageBase64}`}
//                             alt={item.name}
//                             className="product-image-main"
//                             style={{width:"400px",height:"500px"}}
//                         />    
//               <h5>{item.name}</h5>
//               <p>${item.productVariants[0].pricePerUnit} x {item.quantity}</p>
//               </div>
//           </li>
//         ))}
 
//       </ul>
//       <h4 className="mt-4">Total: ${totalAmount}</h4>
//       <div className="mt-4">
//         <input
//           type="text"
//           value={couponCode}
//           onChange={(e) => setCouponCode(e.target.value)}
//           placeholder="Enter coupon code"
//           className="form-control"
//         />
//         <button className="btn btn-secondary mt-2" onClick={handleApplyCoupon}>
//           Apply Coupon
//         </button>
//       </div>
//       {discountedTotal !== null && (
//         <h4 className="mt-4">Discounted Total: ${discountedTotal}</h4>
//       )}
//     <Link to="/Success"> <button className="btn btn-primary mt-4">
//         Proceed to Payment
//       </button>
//       </Link>
 
//     </div>
//   );
// }
import { useLocation,Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
 
export default function OrderSummary({id}) {
  const location = useLocation();
  const { orderItems } = location.state || {}; // Get orderItems from state, default to empty object if undefined
 
  const [totalAmount, setTotalAmount] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [discountedTotal, setDiscountedTotal] = useState(null);
 
  // Extract order ID from URL params if needed
 
 
  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const response = await axios.get(`https://localhost:7181/api/Order/${id}/total-amount`);
       
        console.log("total amount",response.data);
        setTotalAmount(response.data);
      } catch (error) {
        console.error('Error fetching total amount details:', error);
      } finally {
        setLoading(false);
      }
    }
 
    fetchOrderDetails();
  }, [id]);
 
  async function handleApplyCoupon() {
    try {
      const response = await axios.get(`https://localhost:7181/api/Order/${id}/total-amount?couponCode=${couponCode}`);

      setDiscountedTotal(response.data);
    } catch (error) {
      console.error('Error applying coupon:', error);
    }
  }
 
//   async function handleProceedPayment() {
//     try {
//       await axios.post(`https://localhost:7181/api/Order/${id}/confirm-total`, { totalAmount: discountedTotal });
//       alert('Order confirmed and total saved.');
//       // Redirect to payment page or next step
//     } catch (error) {
//       console.error('Error confirming total:', error);
//       alert('Failed to confirm total.');
//     }
//   }
 
async function handleProceedPayment() {
  try {
    await axios.post(`https://localhost:7181/api/Order/Confirmation/${id}`, { totalAmount: discountedTotal });
    toast.success("OrderPlaced successfully");
    // Redirect to payment page or next step
  } catch (error) {
    console.error('Error confirming total:', error);
    toast.warn('Failed to confirm total.');
  }
}
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (!orderItems || orderItems.length === 0) {
    return <div>No order details available.</div>;
  }
 
  return (
    <div className="container mt-4">
      <h2>Order Summary</h2>
      <ul className="list-group">
        {orderItems.map(item => (
          <li key={item.productVariants[0].productVariantId} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
             <img
                            src={`data:image/png;base64,${item.imageBase64}`}
                            alt={item.name}
                            className="product-image-main"
                            style={{width:"400px",height:"500px"}}
                        />    
              <h5>{item.name}</h5>
              <p>${item.productVariants[0].pricePerUnit} x {item.quantity}</p>
              </div>
          </li>
        ))}
 
      </ul>
      <h4 className="mt-4">Total: ${totalAmount}</h4>
      <div className="mt-4">
      <select
  value={couponCode}
  onChange={(e) => setCouponCode(e.target.value)}
  className="form-control"
>
  <option value="">Select a coupon code</option>
  <option value="DHAMAKA">DHAMAKA</option>
  <option value="MEGASALE">MEGASALE</option>
</select>
        <button className="btn btn-secondary mt-2" onClick={handleApplyCoupon}>
          Apply Coupon
        </button>
      </div>
      {discountedTotal !== null && (
        <h4 className="mt-4">Total Amount To Be Paid: ${discountedTotal}</h4>
      )}
    <Link to="/Success"> <button className="btn btn-primary mt-4" onClick={handleProceedPayment}>
        Proceed to Payment
      </button>
      </Link>
   <ToastContainer />
    </div>
  );
}