import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import OrderDetails from './components/OrderComponent/OrderDetails';
import OrderList from './components/OrderComponent/OrderList';
import Cart from './components/OrderComponent/Cart';
import ProductListing from './components/OrderComponent/ProductListing';
import Checkout from './components/OrderComponent/Checkout';
function App() {

//   const [selectedOrderId,setselectedOrderId]=useState(null);
//   const userId=1;
//   const handleOrderSelect=(orderId)=>{
//     setselectedOrderId(orderId);
//   }
//   const handleDeselectOrder = () => {
//     setselectedOrderId(null);
// };
   const [products,setProducts]=useState([]);
   const [cart,setCart]=useState([]);
   const [isCheckout, setIsCheckout] = useState(false);

   useEffect(() => {
    async function fetchProducts() {
        try {
            const response = await axios.get('https://localhost:7181/api/Product'); // Adjust endpoint as needed
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    fetchProducts();
}, []);

async function addToCart(productId){
   setCart((prevCart)=>{
    const item =prevCart.find((item)=>item.productId==productId);
    if(item){
      return prevCart.map((item)=>
      item.productId===productId ? {...item,quantity: item.quantity+1} : item);
    }
    else{
      const product=products.find((product)=>product.productId===productId);
      return[
        ...prevCart,
        {...product,quantity: 1}
      ];
    }
   })
}

async function updateCart(productId,quantity){
    setCart((prevCart)=>
    prevCart.map((item)=>
    item.productId===productId ? {...item,quantity} : item).filter((item)=>item.quantity>0));
}

async function handleCheckout(address,couponCode){
    try{
      const response=await axios.post(`https://localhost:7181/api/Order`,{items:cart,address,couponCode})
      setCart([]);
      setIsCheckout(false);
      alert('Order Placed successfully!');
    }
    catch(error){
      console.log('Error Placing order:', error);
      alert('Failed to place order.');
    }
}

async function placeOrder(){
  try{
    await axios.post(`https://localhost:7181/api/Order`,{item:cart});
    setCart([]);
    alert('Order Placed Successfully');
  }
  catch(error){
    console.error('Error Placing Order',error);
    alert('Failed to Place order');
  }
}
  return (
    <div className="App">
 {/* displaying the orders of a specific user */}
 {/* <div className="container mt-4">
                <h1>E-Commerce App</h1>
                <OrderList userId={userId} onSelectOrder={handleOrderSelect} />
                {selectedOrderId && (
                    <div>
                        <button className="btn btn-secondary mb-3" onClick={handleDeselectOrder}>
                            Back to Order List
                        </button>
                        <OrderDetails orderId={selectedOrderId} />
                    </div>
                )}
            </div> */}


      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
  <header className="App-header">
               
            </header>
            <main>
              {isCheckout ? (
                <Checkout cart={cart} onPlaceOrder={handleCheckout} />
              ):(
                <>
                <ProductListing products={products} onAddToCart={addToCart} />
                <Cart cartItems={cart} onUpdateCart={updateCart} onPlaceOrder={placeOrder} /></>
              )}
                
            </main>

    </div>
  );
}

export default App;
