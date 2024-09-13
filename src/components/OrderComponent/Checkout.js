import {useState, useEffect } from "react";
import Cart from "./Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


export default function  checkout({cart,onPlaceOrder}){
    const [address, setAddress] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [error, setError] = useState(null);

     useEffect(() =>{
        calculateTotalAmount();
     },[cart])

     function handleAddressChange(e){
        setAddress(e.target.value);
     }

     function handleCouponChange(e){
          setCouponCode(e.target.value);
     }

  async function calculateTotalAmount(){
    try{
        const response = await axios.get(`https://localhost:7181/api/Order/${orderId}/total-amount`,{
            params : {couponCode:couponCode}
         }        
        );
        setTotalAmount(response.data);
    }
    catch(error){
        console.log('error Processing the amount',error);
        setError('Failed to calculate the Amount')
    }
  };
  function handleApplyCoupon(){
    calculateTotalAmount();
  }

 async function handlePlaceOrder(){
    try{
        if(!address){
            alert('Place Order Successfully');
            return;
        }
        await onPlaceOrder({address,couponCode});
        alert('Order Place Successfully');
    }
    catch(error){
        console.log('Error Placing Order',error);
        setError('fAiled to Place Order')
    }
  }
    return (
        <div className="container mt-4">
            <h2>Checkout</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Shipping Address</label>
                <textarea
                    id="address"
                    className="form-control"
                    rows="3"
                    value={address}
                    onChange={handleAddressChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="couponCode" className="form-label">Coupon Code</label>
                <input
                    type="text"
                    id="couponCode"
                    className="form-control"
                    value={couponCode}
                    onChange={handleCouponChange}
                />
                <button className="btn btn-primary mt-2" onClick={handleApplyCoupon}>
                    Apply Coupon
                </button>
            </div>
            <h3>Order Summary</h3>
            <ul className="list-group mb-3">
                {cart.map((item) => (
                    <li key={item.productId} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.name} <span className="badge bg-secondary">${item.price} x {item.quantity}</span>
                    </li>
                ))}
            </ul>
            <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
            <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>
                Place Order
            </button>
        </div>
    );

   
}