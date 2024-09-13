import { useState,useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";

export default function OrderDetails({orderId}){
    const [order, setOrder] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [couponCode, setCouponCode] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
            async function fetchOrderDetails(){
                try{
                const orderResponse = await axios.get(`https://localhost:7181/api/Order/${orderId}`);
                setOrder(orderResponse.data);
                
                const totalAmountResponse=await axios.get(`https://localhost:7181/api/Order/${orderId}/total-amount`)
                setTotalAmount(totalAmountResponse.data);

                setLoading(false);
            }
            catch(error){
                setError('ErrrFetching orderDetails');
                setLoading(false);
            }
        };
        fetchOrderDetails();
           
    },[orderId]);
    
       async function ApplyCoupon(){
         try{
            const respone=await axios.get(`https://localhost:7181/api/Order/${orderId}/total-amount`,{
                params:{couponCode}
            });
            setTotalAmount(respone.data);
        }
        catch(error){
            setError('Error Applying Coupon');
        }
       };

       async function CancelOrder(){
        try {
            await axios.post(`https://localhost:7181/api/Order/cancel/${orderId}`);
            setOrder(prevOrder => ({ ...prevOrder, isCancelled: true }));
        } catch (error) {
            setError('Error canceling order');
        }
       }

    async function ProcessPayment(){
          try{
            await axios.post(`https://localhost:7181/api/Order/${orderId}/process-payment`);
            alert('Payment Processed Successfully')
          }
          catch(error){
            setError('Error Processing Payment');
          }
      };
      if (loading) return <p>Loading order details...</p>;
      if (error) return <p>{error}</p>;

      return (
        <div className="container mt-4">
            <h2>Order Details for #{orderId}</h2>
            {order && (
                <>
                    <p><strong>Items:</strong></p>
                    <ul>
                        {order.orderItems.map(item => (
                            <li key={item.id}>{item.productName} - {item.quantity} x ${item.price}</li>
                        ))}
                    </ul>
                    <p><strong>Total Amount:</strong> ${totalAmount}</p>

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter coupon code (optional)"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button className="btn btn-primary mt-2" onClick={ApplyCoupon}>Apply Coupon</button>
                    </div>

                    <button className="btn btn-danger me-2" onClick={CancelOrder} disabled={order.isCancelled}>
                        Cancel Order
                    </button>
                    <button className="btn btn-success" onClick={ProcessPayment}>Process Payment</button>
                </>
            )}
        </div>
    );
}