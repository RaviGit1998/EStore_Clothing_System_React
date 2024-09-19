
// PlaceOrder.js
import axios from "axios";

async function placeOrder(cartItems) {
    if (!cartItems || cartItems.length === 0) {
        throw new Error('No items in cart');
      }
    
  try {
    const orderItems = cartItems.map((cartItem) => ({
      productVariantId: cartItem.productVariants[0].productVariantId,
      quantity: cartItem.quantity,
    }));

    const orderData = {
      orderDate: new Date().toISOString(),
      userId: 1, // Replace with actual userId if needed
      status: "pending",
      orderItemreq: orderItems,
    };

    const response = await axios.post('https://localhost:7181/api/Order', orderData);
    return response.data.id;
  } catch (error) {
    console.error('Error Placing Order:', error);
    throw error;
  }
}
export default placeOrder;


