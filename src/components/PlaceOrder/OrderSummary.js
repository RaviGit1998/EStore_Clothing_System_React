
import { useLocation,Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';
import { CartContext } from '../Cart/CartContext';
 
export default function OrderSummary({id}) {
  const location = useLocation();
  const { orderItems } = location.state || {}; // Get orderItems from state, default to empty object if undefined
  const {setCartItems}=useContext(CartContext);
  const [totalAmount, setTotalAmount] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const { setShippingDetails,selectedAddress, setSelectedAddress } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState(''); // New state for payment method
  const [cardDetails, setCardDetails] = useState({name:'', number: '', expiry: '', cvv: '' }); // State for card details
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  //const [selectedAddress, setSelectedAddress] = useState(null);
  const token = localStorage.getItem('jwtToken');
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
 
  // const fetchUserShippingAddresses = async (userId) => {
  //    userId=localStorage.getItem('userId');
  //    userId=localStorage.getItem('userId');
  //   try {
  //     const response = await axios.get(`https://localhost:7181/api/ShippingAddress/user/${userId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setSelectedAddress(response.data);
  //   } catch (error) {
  //     console.log('Failed to fetch shipping addresses.');
  //   }
  //   fetchUserShippingAddresses();
  // };
   
  useEffect(()=>{
  const generateShippingDetails = async () => {
    try {
      const today = new Date();
      const shippingDate = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
      const estimatedDeliveryDate = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000); // 4 days from now
      const shipping={
      shippingId:0,
      orderId: id,
      trackingNumber:"2343",
      shippigDate: shippingDate.toISOString(),
      estimatedDeliveryDate: estimatedDeliveryDate.toISOString()
      }
      const response = await axios.post('https://localhost:7181/api/Shipping', shipping);
     
      console.log('Shipping details generated:', response.data);
      setShippingDetails(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  generateShippingDetails();
})
 
  useEffect(() => {
    async function fetchShippingDetails() {
      const userId=localStorage.getItem('userId');
      try {
        const response = await axios.get(`https://localhost:7181/api/ShippingAddress/user/${userId}`);
        setSelectedAddress(response.data);
      } catch (error) {
        console.error('Error fetching shipping details:', error);
      }
    }
 
    fetchShippingDetails();
  }, []);

  async function handleProceedPayment(e) {

    if (selectedAddress.length === 0) {
      e.preventDefault();
      toast.error("Please add the Address to Complete Order.");
      return;
    }
     // Implement your payment processing logic here
   
  if (!paymentMethod) {
    e.preventDefault();
    toast.error('Please select a payment method before placing an order.');
    return;
  }
 
  if (paymentMethod === 'Credit Card') {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
      toast.error('Please enter your credit card details before placing an order.');
      e.preventDefault();
      return;
    }
  }
    try {
      const response = await axios.post(`https://localhost:7181/api/Order/Confirmation/${id}`, { totalAmount: discountedTotal });
      const orderItems = response.data.orderItems;
      // Navigate to Success Page with order details
    //  const shippingDetails=await generateShippingDetails();      
       console.log('retriving order items',orderItems);
      // console.log('Shipping details:', shippingDetails);
     //  setShippingDetails(shippingDetails);
      location.state = { orderItems, totalAmount, discountedTotal };
      const email = localStorage.getItem('email');
      await sendOrderDetailsToEmail(id, discountedTotal || totalAmount, response.data.orderDate, email);

      localStorage.removeItem("cartContainer");
      setCartItems([]);
      // Redirecting logic here (e.g., history.push('/success'));
    } catch (error) {
      console.error('Error confirming total:', error);
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!orderItems || orderItems.length === 0) {
    return <div>No order details available.</div>;
  }
 
  const sendOrderDetailsToEmail = async (orderId, totalAmount, orderDate, email) => {
    try {
      const response = await axios.post('https://localhost:7181/api/Order/sendOrderDetails', {
        email,
        orderId,
        totalAmount,
        orderDate
      });
  
      if (response.status === 200) {
        console.log('Order details sent to email successfully.');
      } else {
        console.error('Failed to send order details.');
      }
    } catch (error) {
      console.error('Error sending order details to email:', error);
    }
  };
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
              <p>{item.shortDescription}</p>
              <p>Size : {item.productVariants[0].size}</p>
              <p>color : {item.productVariants[0].color}</p>
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

<h5>Shipping Address</h5>
<ul className="list-group">
  {selectedAddress.map((address) => (
    <li key={address.shippingAddressId} className="list-group-item">
      <p className="mb-0"><strong>Street:</strong> {address.street}</p>
      <p className="mb-0"><strong>City:</strong> {address.city}</p>
      <p className="mb-0"><strong>State:</strong> {address.state}</p>
      <p className="mb-0"><strong>Country:</strong> {address.country}</p>
      <p className="mb-0"><strong>Postal Code:</strong> {address.postalCode}</p>
    </li>
  ))}
   <Link to="/profile"><button className="btn btn-primary mt-4">Add or Edit Address</button></Link>
</ul>
       <div className="mt-4">
        <h4>Payment Options:</h4>
        <select
          className="form-control"
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="COD">Cash on Delivery (COD)</option>
        </select>
      </div>
     
   
{paymentMethod === 'Credit Card' && (
        <div className="mt-4">
          <h4>Credit Card Details:</h4>
          <form>
          <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                className="form-control"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                className="form-control"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                required
              />
            </div>
          </form>
        </div>
      )}

{paymentMethod === 'COD' ? (
  <Link to="/Success" state={{ orderItems, totalAmount, discountedTotal }}>
    <button className="btn btn-primary mt-4" onClick={(e) => handleProceedPayment(e)}>
      Place Order
    </button>
  </Link>
) : paymentMethod === 'Credit Card' ? (
<Link to="/Success" state={{ orderItems, totalAmount, discountedTotal }}>  <button className="btn btn-primary mt-4" onClick={(e) => handleProceedPayment(e)}>
    Proceed to Payment
  </button></Link>
) : (
<p>Select a Payment Method to complete the Order</p>
)}
   <ToastContainer />
    </div>
  );
}