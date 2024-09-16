
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
          element:<ProductDetails/>
        },
        {
          path:'/Category',
          element:<Category/>
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
