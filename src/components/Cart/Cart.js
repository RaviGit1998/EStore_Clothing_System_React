// // Cart.js
// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import CartItem from './CartItem';
// import { useNavigate } from 'react-router-dom';
 
// export default function Cart({ cartItems, updateCart, onPlaceOrder }) {
//     const navigate = useNavigate();
//     const handleQuantityChange = (productVariantId, newQuantity) => {
     
//         updateCart(productVariantId, newQuantity);
//     };
 
//     const handleRemoveItem = (productVariantId) => {
       
//         updateCart(productVariantId, 0); // Removing item by setting quantity to 0
//     };
 
//     const handlePlaceOrder = async () => {
//         // try {
//         //   await placeOrder(cartItems, setOrderId, setCart, setIsCheckout);
//         // } catch (error) {
//         //   console.error('Error during checkout:', error);
//         //   alert('Failed to Place Order');
//         // }
//         try {
//             const id= await onPlaceOrder();
//              navigate(`/order-summary/${id}`,{ state: { orderItems: cartItems } });
               
//              alert('Order Placed Successfully');
//          } catch (error) {
//              console.error('Error Placing Order:', error);
//              alert('Failed to Place Order');
//          }
//       };
 
//     return (
//         <div className="container mt-1" style={{width:"700px"}}>
//             <h2>Cart</h2>
//             <ul className="list-group">
//                 {cartItems.map((item) => (
//                     <CartItem
//                         key={item.productVariantId}
//                         item={item}
//                         onQuantityChange={handleQuantityChange}
//                         onRemoveItem={handleRemoveItem}
//                     />
//                 ))}
//             </ul>
//             {cartItems.length > 0 && (
//                 <button className="btn btn-success mt-4" onClick={handlePlaceOrder}>
//                     Place Order
//                 </button>
//             )}
//         </div>
//     );
// }
// Cart.js
// Cart.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartLogic';

export default function Cart({PlaceOrder}) {
    const { cartItems, updateCart } = useCart();  // Hook usage in a functional component
    const navigate = useNavigate();

    const handleQuantityChange = (productVariantId, newQuantity) => {
        updateCart(productVariantId, newQuantity);
    };

    const handleRemoveItem = (productVariantId) => {
        updateCart(productVariantId, 0); // Removing item by setting quantity to 0
    };

    const handlePlaceOrder = async () => {
        try {
            const id = await PlaceOrder(); // Ensure this function returns an ID
            if (id) {
                navigate(`/order-summary/${id}`, { state: { orderItems: cartItems } });
                alert('Order Placed Successfully');
            } else {
                alert('Failed to Place Order');
            }
        } catch (error) {
            console.error('Error Placing Order:', error);
            alert('Failed to Place Order');
        }
    };

    return (
        <div className="container mt-1" style={{ width: "700px" }}>
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

