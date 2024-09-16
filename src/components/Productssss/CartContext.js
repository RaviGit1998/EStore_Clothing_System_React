import React, { createContext, useContext, useState } from 'react';

// Create a Context for the Cart
const CartContext = createContext();

// Create a Provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.productVariantId === item.productVariantId);
            if (existingItemIndex > -1) {
                // Update the quantity of the existing item
                const newCart = [...prevCart];
                newCart[existingItemIndex].quantity += item.quantity;
                return newCart;
            }
            // Add the new item to the cart
            return [...prevCart, item];
        });
    };

    const removeFromCart = (productVariantId) => {
        setCart(prevCart => prevCart.filter(item => item.productVariantId !== productVariantId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);
