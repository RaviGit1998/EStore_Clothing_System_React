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

import { createContext, useState } from 'react';
import { useCart } from './CartLogic';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
import { useEffect } from 'react';
const CartContext = createContext();
 
 
const CartProvider = ({ children }) => {
    const { cartItems, addToCart, updateCart } = useCart();
    const [cartCount, setCartCount] = useState(0); // Add this line
    const onPlaceOrder = PlaceOrder;
    useEffect(() => {
      setCartCount(cartItems.length); // Update cartCount here
    }, [cartItems]); // Add this effect
 
    return (
      <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateCart,onPlaceOrder }}>
        {children}
      </CartContext.Provider>
    );
};
export { CartProvider, CartContext };