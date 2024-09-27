// // CartContext.js
// import { createContext } from 'react';
// import { useCart } from './CartLogic';
// import PlaceOrder from '../PlaceOrder/PlaceOrder';
// const CartContext = createContext();


// const CartProvider = ({ children }) => {
//     const { cartItems, cartCount, addToCart, updateCart } = useCart();
//     const onPlaceOrder = PlaceOrder; 

//     return (
//       <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateCart,onPlaceOrder }}>
//         {children}
//       </CartContext.Provider>
//     );
// };


// CartContext.js

// import { createContext, useState } from 'react';
// import { useCart } from './CartLogic';
// import PlaceOrder from '../PlaceOrder/PlaceOrder';
// import { useEffect } from 'react';
// const CartContext = createContext();
// const CartProvider = ({ children }) => {
//     const { cartItems,setCartItems, addToCart, updateCart } = useCart();
//     const [cartCount, setCartCount] = useState(0); // Add this line
//     const onPlaceOrder = PlaceOrder;
//     useEffect(() => {
//       setCartCount(cartItems.length); // Update cartCount here
//     }, [cartItems]); // Add this effect
 
//     return (
//       <CartContext.Provider value={{ cartItems, cartCount,setCartItems, addToCart, updateCart,onPlaceOrder }}>
//         {children}
//       </CartContext.Provider>
//     );
// };
// export { CartProvider, CartContext };

// import { createContext } from 'react';
// import { useEffect,useState } from 'react';
// import { useCart } from './CartLogic';
// import PlaceOrder from '../PlaceOrder/PlaceOrder';
// const CartContext = createContext();
 
// const CartProvider = ({ children }) => {
//     const { cartItems,setCartItems, addToCart, updateCart } = useCart();
//     const [cartCount, setCartCount] = useState(0); // Add this line
//     const [shippingDetails, setShippingDetails] = useState(null);
//     const [selectedAddress, setSelectedAddress] = useState(null);
 
//     const onPlaceOrder = PlaceOrder;
//     useEffect(() => {
//              setCartCount(cartItems.length); // Update cartCount here
//          }, [cartItems]); // Add this effect
//          useEffect(() => {
//           if (cartItems.length === 0) {
//             setCartCount(0); // Update cartCount to 0 when cart is empty
//           }
//         }, [cartItems]);
        
//     return (
//       <CartContext.Provider value={{ cartItems, cartCount,setCartItems, addToCart, updateCart,onPlaceOrder,shippingDetails,setShippingDetails,selectedAddress, setSelectedAddress }}>
//         {children}
//       </CartContext.Provider>
//     );
// };
 
// export {CartProvider,CartContext}

import { createContext } from 'react';
import { useEffect,useState } from 'react';
import { useCart } from './CartLogic';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
const CartContext = createContext();
const CartProvider = ({ children }) => {
    const { cartItems,setCartItems, addToCart, updateCart } = useCart();
    const [cartCount, setCartCount] = useState(0); // Add this line
    //const [shippingDetails, setShippingDetails] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
 
    const [shippingDetails, setShippingDetails] = useState(() => {
      // Retrieve from localStorage if available
      const savedShippingDetails = localStorage.getItem('shippingDetails');
      return savedShippingDetails ? JSON.parse(savedShippingDetails) : null;
    });
 
    const onPlaceOrder = PlaceOrder;
    useEffect(() => {
             setCartCount(cartItems.length); // Update cartCount here
         }, [cartItems]); // Add this effect
         useEffect(() => {
          if (cartItems.length === 0) {
            setCartCount(0); // Update cartCount to 0 when cart is empty
          }
        }, [cartItems]);
        useEffect(() => {
          if (shippingDetails) {
            localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
          }
        }, [shippingDetails]);      
    return (
      <CartContext.Provider value={{ cartItems, cartCount,setCartItems, addToCart, updateCart,onPlaceOrder,shippingDetails,setShippingDetails,selectedAddress, setSelectedAddress }}>
        {children}
      </CartContext.Provider>
    );
};
export {CartProvider,CartContext}