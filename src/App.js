
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage/SignupPage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Root from './components/Root/Root';
import LoginPage from './components/LoginPage/loginPage';
import Homepage from './components/Homepage';
import ProfilePage from './components/Profile/Profile';
import SearchComponent from './components/SearchComponent/SearchComponent';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Category from './components/Category/Category';
import Wishlist from './components/Wishlist/Wishlist';
import Cart from './components/Cart/Cart';
import  useCart  from './components/Cart/CartLogic';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
const router= createBrowserRouter(
  [
    {
      path:'/',
      element:<Root/>,
      children:[
        {
          path:'/',
          element:<Homepage/>
        },
        {
          path:'/signup',
          element:<SignupPage/>
        },
        {
          path:'/login',
          element:<LoginPage/>
        },
        {
          path:'/profile',
          element:<ProfilePage/>
        },
        {
          path:'/search',
          element:<SearchComponent/>
        },
        {
          path:'/product/:id',
          element:<ProductDetails addToCart={useCart().addToCart}/>
        },
        {
          path:'/Category',
          element:<Category/>
        },
       {
        path:'/wishlist',
        element:<Wishlist/>
       },
       {
        path:'/cart',
        element: (
          <Cart 
              cartItems={useCart().cartItems}
              updateCart={useCart().updateCart}
              onPlaceOrder={PlaceOrder}
          />)
       }      
      ]
    }
  ]
)
function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>

    </>
  );
}
export default App;
