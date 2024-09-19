import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { useState } from 'react'
function Root() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  const AddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const UpdateCart = (newItems) => {
    setCartItems(newItems);
  };

  const PlaceOrder = () => {
    console.log('Order Placed');
  };
  return (
    <div className="root-container">
    <Header/>
    <main className="content-wrap">
    <Outlet context={{ AddToCart, cartItems, UpdateCart, PlaceOrder }} /> {/* This renders the child routes, like SignupPage or LoginPage */}
    </main>
    <Footer /> {/* Footer is always at the bottom */}
  </div>
  )
}

export default Root