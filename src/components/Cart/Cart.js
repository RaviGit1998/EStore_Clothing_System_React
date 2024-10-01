// // Cart.js
// import React, { useContext } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import CartItem from './CartItem';
// import { useNavigate} from 'react-router-dom';
// import { CartContext } from './CartContext';
//  import placeOrder from '../PlaceOrder/PlaceOrder';
//  import { ToastContainer,toast } from 'react-toastify';
//  import 'react-toastify/dist/ReactToastify.css';
// export default function Cart() {
//     const { cartItems, updateCart } = useContext(CartContext);
//     const navigate = useNavigate();
//     const handleQuantityChange = (productVariantId, newQuantity) => {
     
//         updateCart(productVariantId, newQuantity);
//     };
 
//     const handleRemoveItem = (productVariantId) => {
       
//         updateCart(productVariantId, 0); // Removing item by setting quantity to 0
//     };
 
//     const handlePlaceOrder = async () => {
//         const token = localStorage.getItem('jwtToken');
        
//         if (!token) {
//             toast.warning("Please login to order");
//             navigate('/login');
//             return;
//         }
//         if (!cartItems || cartItems.length === 0) {
//           toast.error("no items in the cart")
//           return;
//         }
      
//         try {
//           const id = await placeOrder(cartItems);
//           navigate(`/order-summary/${id}`, { state: { orderItems: cartItems } });
//         } catch (error) {
//           console.error('Error Placing Order:', error);
//         }
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
//                    Check Out
//                 </button>
//             )}
//             <ToastContainer />  
//         </div>
//     );
// }

import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import placeOrder from '../PlaceOrder/PlaceOrder';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {
    const { cartItems, updateCart } = useContext(CartContext);
    const navigate = useNavigate();
    
    // State to track selected items
    const [selectedItems, setSelectedItems] = useState([]);

    const handleQuantityChange = (productVariantId, newQuantity) => {
        updateCart(productVariantId, newQuantity);
    };

    const handleRemoveItem = (productVariantId) => {
        updateCart(productVariantId, 0);
    };

    const handleSelectItem = (productVariantId, isSelected) => {
        setSelectedItems((prevSelectedItems) =>
            isSelected
                ? [...prevSelectedItems, productVariantId]
                : prevSelectedItems.filter(id => id !== productVariantId)
        );
    };

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem('jwtToken');
        
        if (!token) {
            toast.warning("Please login to order");
            navigate('/login');
            return;
        }

        // Filter only selected items for placing the order
        const selectedCartItems = cartItems.filter(item =>
            selectedItems.includes(item.productVariants[0].productVariantId)
        );

        if (!selectedCartItems || selectedCartItems.length === 0) {
            toast.error("No items selected for the order");
            return;
        }

        try {
            const id = await placeOrder(selectedCartItems);
            navigate(`/order-summary/${id}`, { state: { orderItems: selectedCartItems } });
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="container mt-1" style={{ width: "700px" }}>
            <h2>Cart</h2>
            <ul className="list-group">
                {cartItems.map((item) => (
                    <CartItem
                        key={item.productVariants[0].productVariantId}
                        item={item}
                        isSelected={selectedItems.includes(item.productVariants[0].productVariantId)}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}
                        onSelectItem={handleSelectItem}
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



