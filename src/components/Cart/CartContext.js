
import { createContext, useState } from 'react';
import { useCart } from './CartLogic';
import PlaceOrder from '../PlaceOrder/PlaceOrder';
import { useEffect } from 'react';
const CartContext = createContext();
const CartProvider = ({ children }) => {
    const { cartItems, addToCart, updateCart } = useCart();
    const [cartCount, setCartCount] = useState(0); // Add this line
    const [shippingDetails, setShippingDetails] = useState(null);
    const onPlaceOrder = PlaceOrder;
    useEffect(() => {
      setCartCount(cartItems.length); // Update cartCount here
    }, [cartItems]); // Add this effect
 
    return (
      <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateCart,onPlaceOrder,shippingDetails,setShippingDetails }}>
        {children}
      </CartContext.Provider>
    );
};
export { CartProvider, CartContext };