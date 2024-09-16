
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage/SignupPage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Root from './components/Root/Root';
import LoginPage from './components/LoginPage/loginPage';
import Homepage from './components/Homepage';
import ProfilePage from './components/Profile/Profile';

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
