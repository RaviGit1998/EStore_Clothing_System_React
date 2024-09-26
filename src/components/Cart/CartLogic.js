
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer,toast } from 'react-toastify';
// Custom hook for managing cart operations
export function useCart() {
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartContainer'));
        return storedCartItems || [];
    });

    useEffect(()=>{
        localStorage.setItem('cartContainer',JSON.stringify(cartItems));
    },[cartItems])
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
         
            }
 
            const uniqueItems = [...new Set(updatedItems.map(item => item.productVariants[0].productVariantId))];
                 setCartCount(uniqueItems.length); // Update cartCount here
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
    useEffect(() => {
        const uniqueItems = [...new Set(cartItems.map(item => item.productVariants[0].productVariantId))];
        setCartCount(uniqueItems.length);
      }, [cartItems]);
 
    return { cartItems, cartCount, addToCart, updateCart,setCartItems };
}