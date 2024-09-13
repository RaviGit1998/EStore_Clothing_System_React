
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/SignupPage/SignupPage';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Root from './components/Root';
const router= createBrowserRouter(
  [
    {
      path:'/',
      element:<Root/>,
      children:[
        {
          path:'/profile',
          element:<SignupPage/>
        }
      ]
    }
  ]
)
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}
export default App;
