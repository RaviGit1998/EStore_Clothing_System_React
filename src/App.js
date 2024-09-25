
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage/SignupPage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Root from './components/Root/Root';
import LoginPage from './components/LoginPage/loginPage';
import Homepage from './components/Homepage';
import ProfilePage from './components/Profile/Profile';
import SearchPage from './components/SearchComponent/SearchPage';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Category from './components/Category/Category';
import Wishlist from './components/Wishlist/Wishlist';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/Cart/CartContext';
import OrderSummaryWrapper from './components/PlaceOrder/OrderSummaryWrapper';
import SuccessPage from './components/PlaceOrder/SuccessPage';
import ResetPassword from './components/PasswordRecovery/PasswordReset';
import EmailSender from './components/PasswordRecovery/EmailSender';
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
          element:<SearchPage/>
        },
        {
          path:'/product/:id',
          element:<ProductDetails />
        },
        {
          path:'/category/:categoryId',
          element:<Category />
        },
       
       {
        path:'/wishlist',
        element:<Wishlist/>
       },
       {
        path:'/cart',
        element: (
          <Cart />)
       } ,
       {
        path: '/order-summary/:id',
        element:<OrderSummaryWrapper />
       } ,
       {
        path:'/Success',
        element:<SuccessPage/>
       },
       {
        path:'/passwordRecovery',
        element:<EmailSender/>
       } ,
       {
        path:'/passwordReset',
        element:<ResetPassword/>
       }
      ]
    }
  ]
)
function App() {
  return (
    <>
    <CartProvider>
    <RouterProvider router={router}></RouterProvider>
    </CartProvider>

    </>
  );
}
export default App;
