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
import { showErrorToast, showWarningToast } from '../Toasting/ThrottledToast';

export default function Cart() {
    const { cartItems, updateCart } = useContext(CartContext);
    const navigate = useNavigate();
    
    // State to track selected items
    const [selectedItems, setSelectedItems] = useState([]);

    const handleQuantityChange = (productVariantId, newQuantity) => {
        if (newQuantity < 0) return;
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
           showWarningToast("Please login to order");
            navigate('/login');
            return;
        }

        // Filter only selected items for placing the order
        const selectedCartItems = cartItems.filter(item =>
            selectedItems.includes(item.productVariants[0].productVariantId)
        );

        if (!selectedCartItems || selectedCartItems.length === 0) {
            showErrorToast("No items selected for the order");
            return;
        }
          // Check if any items have a quantity of 0
    const outOfStockItems = cartItems.filter(item => {
        return item.productVariants[0].quantity === 0; // Check if the quantity is zero
    });
 
    // Show toast for out-of-stock items only
    if (outOfStockItems.length > 0) {
        outOfStockItems.forEach(item => {
       showErrorToast(`Product "${item.name}" is out of stock!`, {
                autoClose: 2000, // Set the duration for this toast
            });
        });
        return; // Exit if any items are out of stock
    }
 
    // Check if any items have an insufficient available quantity
    const insufficientItems = cartItems.filter(item => {
        const availableQuantity = item.productVariants[0].quantity; // Get available quantity
        return item.quantity > availableQuantity; // Check against available quantity
    });
 
    if (insufficientItems.length > 0) {
        insufficientItems.forEach(item => {
            const availableQuantity = item.productVariants[0].quantity; // Get available quantity
        toast.error(`Oh no! Only ${availableQuantity} quantities left for ${item.name}.`, {
                autoClose: 2000, // Set the duration for this toast
            });
        });
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
        <div className="container mt-1" style={{ width: "600px" }}>
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
           
        </div>
    );
}



