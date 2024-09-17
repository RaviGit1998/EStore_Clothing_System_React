// import { useState } from "react";
 
 
// export function AddToCart (product)  {
//     const [cartItems, setCartItems] = useState([]);
//     const [cartCount, setCartCount] = useState(0); // State to track the number of items in the cart
 
//     setCartItems((prevItems) => {
//       const existingItemIndex = prevItems.findIndex(item => item.productVariants[0].productVariantId === product.productVariants[0].productVariantId);
//       let updatedItems;
 
//       if (existingItemIndex >= 0) {
//         // Update quantity if the item already exists
//         const updatedItems = [...prevItems];
//         updatedItems[existingItemIndex] = {
//             ...updatedItems[existingItemIndex],
//             quantity: updatedItems[existingItemIndex].quantity + 1
//         };
//         return updatedItems;
       
//       } else {
//         // New item, add to the cart
//         updatedItems = [...prevItems, { ...product, quantity: 1 }];
//         alert('Item added to the cart.');
//       }
 
//       setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0)); // Update cart count
//       return updatedItems;
//     });
//   };
 
//   const UpdateCart = (productVariantId, newQuantity) => {
//     const [cartItems, setCartItems] = useState([]);
//     const [cartCount, setCartCount] = useState(0); // State to track the number of items in the cart
//     setCartItems((prevItems) => {
//       if (newQuantity <= 0) {
//         // Remove the item if the quantity is zero or less
//         const updatedItems = prevItems.filter(item => item.productVariants[0].productVariantId !== productVariantId);
//         setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0)); // Update cart count
//         return updatedItems;
//       }
//       // Update the quantity of the item
//       const updatedItems = prevItems.map(item =>
//         item.productVariants[0].productVariantId === productVariantId ? { ...item, quantity: newQuantity } : item
//       );
//       setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0)); // Update cart count
//       return updatedItems;
//     });
//   };
 
//   export default UpdateCart;
 // CartLogic.js
// CartLogic.js
import { useState } from 'react';

// Custom hook for managing cart operations
export function useCart() {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(item => item.productVariants[0].productVariantId === product.productVariants[0].productVariantId);
            let updatedItems;

            if (existingItemIndex >= 0) {
                // Update quantity if the item already exists
                updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1
                };
            } else {
                // New item, add to the cart
                updatedItems = [...prevItems, { ...product, quantity: 1 }];
                alert('Item added to the cart.');
            }

            setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0));
            return updatedItems;
        });
    };

    const updateCart = (productVariantId, newQuantity) => {
        setCartItems((prevItems) => {
            if (newQuantity <= 0) {
                // Remove the item if the quantity is zero or less
                const updatedItems = prevItems.filter(item => item.productVariants[0].productVariantId !== productVariantId);
                setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0));
                return updatedItems;
            }
            // Update the quantity of the item
            const updatedItems = prevItems.map(item =>
                item.productVariants[0].productVariantId === productVariantId ? { ...item, quantity: newQuantity } : item
            );
            setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0));
            return updatedItems;
        });
    };

    return { cartItems, cartCount, addToCart, updateCart };
}
