// Cart.js
import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from './CartItem';
import { useNavigate} from 'react-router-dom';
import { CartContext } from './CartContext';
 import placeOrder from '../PlaceOrder/PlaceOrder';
 import { ToastContainer,toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
export default function Cart() {
    const { cartItems, updateCart } = useContext(CartContext);
    const navigate = useNavigate();
    const handleQuantityChange = (productVariantId, newQuantity) => {
     
        updateCart(productVariantId, newQuantity);
    };
 
    const handleRemoveItem = (productVariantId) => {
       
        updateCart(productVariantId, 0); // Removing item by setting quantity to 0
    };
 
    const handlePlaceOrder = async () => {
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
            toast.warning("Please login to order");
            navigate('/login');
            return;
        }
        if (!cartItems || cartItems.length === 0) {
          toast.error("no items in the cart")
          return;
        }
      
        try {
          const id = await placeOrder(cartItems);
          navigate(`/order-summary/${id}`, { state: { orderItems: cartItems } });
        } catch (error) {
          console.error('Error Placing Order:', error);
        }
      };
    return (
        <div className="container mt-1" style={{width:"700px"}}>
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
                   Check Out
                </button>
            )}
            <ToastContainer />  
        </div>
    );
}



