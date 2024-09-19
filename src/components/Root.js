// Root.js
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Root() {
  const [cartItems, setCartItems] = useState([]);

  const AddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const UpdateCart = (newItems) => {
    setCartItems(newItems);
  };

  const PlaceOrder = () => {
    console.log('Order Placed');
  };
  
  return (
    <div>
      {/* Pass cartItems, AddToCart, UpdateCart, and PlaceOrder as props */}
      <Outlet 
        context={{
          cartItems,
          AddToCart,
          UpdateCart,
          PlaceOrder
        }}
      />
    </div>
  );
}

export default Root;
