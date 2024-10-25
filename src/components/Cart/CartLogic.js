import { useState, useEffect } from 'react';

// Custom hook for managing cart operations
export function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartContainer'));
    return Array.isArray(storedCartItems) ? storedCartItems : []; // Ensure it's an array
});
    

    useEffect(() => {
        localStorage.setItem('cartContainer', JSON.stringify(cartItems));
    }, [cartItems]);

    const [cartCount, setCartCount] = useState(0);

    const addToCart = (product) => {
      console.log("Adding product to cart: ", product); 
  
      if (!product || !product.selectedVariant) {
          console.error("Product does not have a selected variant");
          return;
      }
  
      setCartItems((prevItems) => {
          const existingItemIndex = prevItems.findIndex(item => 
              item?.selectedVariant?.productVariantId === product.selectedVariant.productVariantId
          );
  
          let updatedItems;
  
          if (existingItemIndex >= 0) {
              // Update quantity if the item already exists
              updatedItems = [...prevItems];
              updatedItems[existingItemIndex] = {
                  ...updatedItems[existingItemIndex],
                  quantity: updatedItems[existingItemIndex].quantity + 1
              };
          } else {
              // Add new item to the cart
              updatedItems = [...prevItems, { ...product, quantity: 1 }];
          }
  
          // Ensure the cartCount is based on unique product variants
          const uniqueItems = [...new Set(updatedItems.map(item => item?.selectedVariant?.productVariantId))];
          setCartCount(uniqueItems.length);
  
          return updatedItems;
      });
  };
  
const updateCart = (productVariantId, newQuantity) => {
  setCartItems((prevItems) => {
    if (newQuantity <= 0) {
      // Remove the item if the quantity is zero or less
      const updatedItems = prevItems.filter(item => 
        item?.selectedVariant?.productVariantId !== productVariantId
      );
      setCartCount(updatedItems.length);
      return updatedItems;
    }

    // Update the quantity of the item
    const updatedItems = prevItems.map(item =>
      item?.selectedVariant?.productVariantId === productVariantId 
        ? { ...item, quantity: newQuantity } 
        : item
    );

    setCartCount(updatedItems.length);
    return updatedItems;
  });
};

useEffect(() => {
  const uniqueItems = [...new Set(cartItems.map(item => item.selectedVariant.productVariantId))];
  setCartCount(uniqueItems.length);
}, [cartItems]);


    return { cartItems, cartCount, addToCart, updateCart, setCartItems };
}