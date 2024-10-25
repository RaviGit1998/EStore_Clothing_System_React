
// PlaceOrder.js
import axios from "axios";
import { jwtDecode } from "jwt-decode";

async function placeOrder(cartItems) {
    if (!cartItems || cartItems.length === 0) {
        throw new Error('No items in cart');
      }
    
  try {
    const orderItems = cartItems.map((cartItem) => {
      if (!cartItem.selectedVariant) {
          throw new Error('No variant selected for the product');
      }
      return {
          productVariantId: cartItem.selectedVariant.productVariantId,
          quantity: cartItem.quantity > 0 ? cartItem.quantity : 1,
      };
  });

  const token = localStorage.getItem('jwtToken');
  if (!token) {
      throw new Error('No token found');
  }
  const decodedToken = jwtDecode(token);
  console.log("Decoded Token:", decodedToken);
  const userId = decodedToken.sub;  
  console.log("user id",userId)

    const orderData = {
      orderDate: new Date().toISOString(),
      userId:userId,
     // userId:1,
      status: "pending",
      orderItemreq: orderItems,
    };
   
    const response = await axios.post('https://localhost:7181/api/Order', orderData,{
      headers: { Authorization: `Bearer ${token}` },
  });

    return response.data.id;
  } catch (error) {
    console.error('Error Placing Order:', error);
    throw error;
  }
}
export default placeOrder;




