import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from './CartItem1';
import { useNavigate } from 'react-router-dom';
 
export default function Cart({ cartItems, onUpdateCart, onPlaceOrder }) {
 
    const navigate=useNavigate();
    console.log('Cart Items:', cartItems);
    
    function handleQuantityChange(productVariantId, newQuantity) {
        onUpdateCart(productVariantId, newQuantity);
    }
 
    function handleRemoveItem(productVariantId) {
        onUpdateCart(productVariantId, 0); // Removing item by setting quantity to 0
    }
 
    const handlePlaceOrder = async () => {
        try {
           const id= await onPlaceOrder();
            navigate(`/order-summary/${id}`,{ state: { orderItems: cartItems } });
               
            alert('Order Placed Successfully');
        } catch (error) {
            console.error('Error Placing Order:', error);
            alert('Failed to Place Order');
        }
    };
 
    return (
        <div className="container mt-4">
            <h2>Cart</h2>
            <ul className="list-group">
                {cartItems.map((item) => (
                    <CartItem
                        key={item.productVariantId}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}
                    />
                ))}
            </ul>
            {cartItems.length > 0 && (
                <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>
                    Place Order
                </button>
            )}
        </div>
    );
}