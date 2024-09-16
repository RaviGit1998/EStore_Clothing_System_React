import { useParams,useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
 
 
export default function OrderSummary({id}) {
 
    const location = useLocation(); // Access state passed from Cart
    const { orderItems } = location.state; // Get orderItems from state
 
    const [totalAmount, setTotalAmount] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [discountedTotal, setDiscountedTotal] = useState(null);
    useEffect(() => {
        async function fetchOrderDetails() {
            try {
const response = await axios.get(`https://localhost:7181/api/Order/${id}/total-amount`);
                 setTotalAmount(response.data);
             
                console.log("total amount",response.data);
            } catch (error) {
                console.error('Error fetching total amount details:', error);
            }finally{
            setLoading(false);
            }
        }
 
        fetchOrderDetails();
    }, [id]);
    async function handleApplyCoupon() {
        try {
const response = await axios.get(`https://localhost:7181/api/Order/${id}/total-amount?couponCode=${couponCode}`);
            setDiscountedTotal(response.data); // Update with discounted total
        } catch (error) {
            console.error('Error applying coupon:', error);
        }
    };
 
   async function handleProceedPayment(){
        try {
await axios.post(`https://localhost:7181/api/Order/${id}/confirm-total`, { totalAmount: discountedTotal });
            alert('Order confirmed and total saved.');
            // Redirect to payment page or next step
        } catch (error) {
            console.error('Error confirming total:', error);
            alert('Failed to confirm total.');
        }
    }
 
    if (loading) {
        return <div>Loading...</div>;
    }
 
    if (!orderItems) {
        return <div>No order details available.</div>;
    }
 
 
    return (
        <div className="container mt-4">
        <h2>Order Summary</h2>
        <ul className="list-group">
            {orderItems.map(item => (
                <li key={item.productVariantId} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{item.name}</h5>
                        <p>${item.pricePerUnit} x {item.quantity}</p>
                    </div>
                </li>
            ))}
        </ul>
        <h4 className="mt-4">Total: ${totalAmount}</h4>
        <div className="mt-4">
                <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="form-control"
                />
                <button className="btn btn-secondary mt-2" onClick={handleApplyCoupon}>
                    Apply Coupon
                </button>
            </div>
        <button className="btn btn-primary mt-4">Proceed to Payment</button>
    </div>
    );
}
