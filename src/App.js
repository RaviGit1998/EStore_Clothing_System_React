
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import ProductDetails from './components/Productssss/ProductDetails';
// // import ProductList from './components/Productssss/ProductList';
// // //import SearchComponent from './SearchComponent';
// // import Cart from './components/Productssss/Cart1';


 
// // function App() {

// //     return (
// //       <Router>   
// //     <div className="App">
// //             {/* <SearchComponent /> */}
// //         </div>  
// //         <Routes>
// //             <Route path="/" element={<ProductList />} />
// //             <Route path="/product/:id" element={<ProductDetails />} /> 
// //             <Route path="/cart" element={<Cart />} />
// //         </Routes>
       
// //     </Router>  

// //     );
// // }

// // export default App;

// import './App.css';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes, useNavigate,RouterProvider } from 'react-router-dom';
// import Cart from './components/Productssss/Cart1';
// import ProductDetails from './components/Productssss/ProductDetails';
// import ProductListing from './components/Productssss/ProductList';
// import OrderSummary from './components/OrderComponent/OrderSummary';

 
 
 
// function App() {
//     const [products, setProducts] = useState([]);
//     const [cart, setCart] = useState([]);
//     const [isCheckout, setIsCheckout] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(); // To track selected product
//     const [loading,setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [id, setOrderId] = useState(null);
 
   
 
//     useEffect(() => {
//       async function fetchProducts() {
//         try {
// const productsResponse = await axios.get('https://localhost:7181/api/Product');
// const variantsResponse = await axios.get('https://localhost:7181/api/Product/ProductVariants');
    
//           console.log('Products Response:', productsResponse.data);
//           console.log('Variants Response:', variantsResponse.data);
    
//           // Combining products with their variants
//           const productsWithVariants = productsResponse.data.map(product => {
//             const productVariants = variantsResponse.data.filter(variant => variant.productId === product.productId);
//             return {
//               ...product,
//               variants: productVariants
//             };
//           });
    
//           console.log('Fetched products with variants:', productsWithVariants);
//           setProducts(productsWithVariants);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error Fetching Products or Variants:', error);
//           setError('Error fetching products or variants. Please try again.');
//           setLoading(false);
//         }
//       }
    
//       fetchProducts();
//     }, []);
    
    
 
//   function handleProductClick(product) {
//     console.log('Product clicked:', product); // Add this log
   
// // navigate(`/product/${product.productId}`);
//   setSelectedProduct(product); // Store the selected product
// }
 
 
 
 
 
//   function addToCart(productVariant) {
//     setCart((prevCart) => {
//         const existingItem = prevCart.find((cartItem) => cartItem.productVariantId === productVariant.productVariantId);
//         let updatedCart;
 
//         if (existingItem) {
//             updatedCart = prevCart.map((cartItem) =>
//                 cartItem.productVariantId === productVariant.productVariantId
//                     ? { ...cartItem, quantity: cartItem.quantity + 1 }
//                     : cartItem
//             );
//         } else {
//             updatedCart = [
//                 ...prevCart,
//                 { ...productVariant, quantity: 1 }
//             ];
//         }
 
//         console.log('Updated Cart:', updatedCart); // Check the updated cart
//         return updatedCart; // Return the new cart state
//     });
//     setSelectedProduct(null);
// }
 
 
 
// function updateCart(productVariantId, newQuantity) {
//   setCart((prevCart) =>
//       prevCart
//           .map((cartItem) =>
//               cartItem.productVariantId === productVariantId
//                   ? { ...cartItem, quantity: newQuantity }
//                   : cartItem
//           )
//           .filter((cartItem) => cartItem.quantity > 0)
//   );
// }
 
 
//     async function placeOrder() {
//       try {
//           const orderItems = cart.map((cartItem) => ({
//               productVariantId: cartItem.productVariantId,
//               quantity: cartItem.quantity,
//           }));
  
//           const orderData = {
//               orderDate: new Date().toISOString(),
//               userId: 1, // Replace with actual userId if needed
//               isCancelled: false,
//               orderItemreq: orderItems,
//           };
  
// const response= await axios.post('https://localhost:7181/api/Order', orderData);
//          console.log("Order Id",response);
// setOrderId(response.data.id) ;
//           setCart([]); // Clear cart on successful order
//           setIsCheckout(true)
         
//       } catch (error) {
//           console.error('Error Placing Order:', error);
//           alert('Failed to Place Order');
//       }
//   }
 
//   const uniqueItemsCount = cart.length;
  
//     return (
//         <Router>
//             <div className="App">
//                 <header>
                 
//                 </header>
//                 <main>
//                     <button className="btn btn-primary">
//                         <p>Cart Count: {uniqueItemsCount}</p>
//                     </button>
//                      {/* <button className="btn btn-primary" onClick={handleCartClick}>
//             <p>Cart Count: {cart.length}</p>
//           </button> */}
//                     </main>
//                     <Routes>
//                         <Route path="/" element={
//                             selectedProduct ? (
//                                 <ProductDetails
//                                     product={selectedProduct}
//                                     onAddToCart={addToCart}
//                                     onBack={() => setSelectedProduct(null)}
//                                 />
//                             ) : (
//                                 <>
//                                     <ProductListing products={products} onProductClick={handleProductClick} onAddToCart={addToCart} />
//                                     <Cart cartItems={cart} onUpdateCart={updateCart} onPlaceOrder={placeOrder} />
//                                 </>
//                             )
//                         } />
//                         {id && isCheckout && <Route path="/order-summary/:Id" element={<OrderSummary id={id} />} />}
//                     </Routes>
 
// {/* <Routes>
//             <Route path="/" element={<ProductListing products={products} onProductClick={handleProductClick} onAddToCart={addToCart} />} />
//             <Route path="/product/:productId" element={<ProductDetails product={selectedProduct} onAddToCart={addToCart} onBack={() => setSelectedProduct(null)} />} />
//             <Route path="/cart" element={<Cart cartItems={cart} onUpdateCart={updateCart} onPlaceOrder={placeOrder} />} />
//             <Route path="/order-summary/:orderId" element={<OrderSummary id={id} />} />
//             <Route path="/checkout" element={<Checkout onPlaceOrder={placeOrder} />} />
//           </Routes>
//        */}
 
//             </div>
//         </Router>
//     );
// }
 
 
// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import ProductDetails from './components/OrderComponent/ProductDetails';
import ProductList from './components/OrderComponent/ProductListing';
import Cart from './components/OrderComponent/Cart';
import axios from 'axios';
import OrderSummary from './components/OrderComponent/OrderSummary';
import Success from './components/OrderComponent/SuccessPage';

import { AddToCart } from './components/OrderComponent/CartLogic';
import UpdateCart from './components/OrderComponent/CartLogic';
import PlaceOrder from './components/OrderComponent/PlaceOrder';
function App() {

  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); // State to toggle cart visibility
  const [cartCount, setCartCount] = useState(0); // State to track the number of items in the cart
  const [id,setOrderId]=useState(null);
  const [isCheckout, setIsCheckout] = useState(false); 

 


  const AddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.productVariants[0].productVariantId === product.productVariants[0].productVariantId);
      let updatedItems;

      if (existingItemIndex >= 0) {
        // Update quantity if the item already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
       
      } else {
        // New item, add to the cart
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
        alert('Item added to the cart.');
      }

      setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0)); // Update cart count
      return updatedItems;
    });
  };

  const UpdateCart = (productVariantId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        // Remove the item if the quantity is zero or less
        const updatedItems = prevItems.filter(item => item.productVariants[0].productVariantId !== productVariantId);
        setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0)); // Update cart count
        return updatedItems;
      }
      // Update the quantity of the item
      const updatedItems = prevItems.map(item =>
        item.productVariants[0].productVariantId === productVariantId ? { ...item, quantity: newQuantity } : item
      );
      setCartCount(updatedItems.reduce((total, item) => total + item.quantity, 0)); // Update cart count
      return updatedItems;
    });
  };


// async function placeOrder(cart, setOrderId, setCart, setIsCheckout) {
//   try {
//     const orderItems = cart.map((cartItem) => ({
//       productVariantId: cartItem.productVariants[0].productVariantId,
//       quantity: cartItem.quantity,
//     }));

//     const orderData = {
//       orderDate: new Date().toISOString(),
//       userId: 1, // Replace with actual userId if needed
//       isCancelled: false,
//       orderItemreq: orderItems,
//     };

//     const response = await axios.post('https://localhost:7181/api/Order', orderData);
//     const orderId = response.data.id; // Assuming the response contains an ID

//     setOrderId(orderId); // Update the order ID state
//     setCartItems([]); // Clear cart on successful order
//     setIsCheckout(true); // Set checkout flag

//     // Navigate to order summary page
//     navigate(`/order-summary/${orderId}`, { state: { orderItems: cart } });

//     alert('Order Placed Successfully');
//    } catch (error) {
//     console.error('Error Placing Order:', error);
//     alert('Failed to Place Order');
//   }
// }

 
 
    async function PlaceOrder() {
      try {
          const orderItems = cartItems.map((cartItem) => ({
              productVariantId: cartItem.productVariants[0].productVariantId,
              quantity: cartItem.quantity,
          }));
  
          const orderData = {
              orderDate: new Date().toISOString(),
              userId: 2, // Replace with actual userId if needed
              isCancelled: false,
              orderItemreq: orderItems,
          };
  
const response= await axios.post('https://localhost:7181/api/Order', orderData);
         console.log("Order Id",response);

      if (response.status === 200) {
             const id = response.data.id; }
      setOrderId(response.data.id) ;
          setCartItems([]); // Clear cart on successful order
          setIsCheckout(true)
         
      } catch (error) {
          console.error('Error Placing Order:', error);
          alert('Failed to Place Order');
      }
  }
 
  //const uniqueItemsCount = cart.length;

  return (
    <Router>
      <div className="App">
        <button onClick={() => setShowCart(!showCart)} className="ml-5">
          Cart ({cartCount})
        </button>
        {showCart && (
          <Cart cartItems={cartItems} updateCart={UpdateCart} onPlaceOrder={PlaceOrder} />
        )}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={AddToCart} />} />
          {id && isCheckout && <Route path="/order-summary/:Id" element={<OrderSummary id={id} />} />}
          <Route path="/Success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
