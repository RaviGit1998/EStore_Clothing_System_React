import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
 
async function PlaceOrder() {
const [cartItems, setCartItems] = useState([]);
const [id,setOrderId]=useState(null);
const [isCheckout, setIsCheckout] = useState(false);
    const navigate=useNavigate();
    try {
        const orderItems = cartItems.map((cartItem) => ({
            productVariantId: cartItem.productVariants[0].productVariantId,
            quantity: cartItem.productVariants[0].quantity,
        }));
 
        const orderData = {
            orderDate: new Date().toISOString(),
            userId: 2, // Replace with actual userId if needed
            isCancelled: false,
            orderItemreq: orderItems,
        };
 
const response= await axios.post('https://localhost:7181/api/Order', orderData);
       console.log("Order Id",response);  
    setOrderId(response.data.id) ;
        setCartItems([]); // Clear cart on successful order
        setIsCheckout(true)          
            if(id && isCheckout){
               navigate(`/order-summary/${id}`);
            }
    } catch (error) {
        console.error('Error Placing Order:', error);
        alert('Failed to Place Order');
    }
}
export default PlaceOrder;