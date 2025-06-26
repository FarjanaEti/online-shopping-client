import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../Component/Home'
import Layout from '../Layout/Layout'
import Error from '../Component/Error'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import DashBoard from '../Component/DashBoard/DashBoard'
import SellerHome from '../Component/DashBoard/Seller/SellerHome'

const router = createBrowserRouter([
  {
    path: '/',
    element:<Layout></Layout>,
  errorElement:<Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
  path:'/login',
   element:<Login></Login>
  },
  {
   path:'/register',
   element:<Register></Register>
  }
    ]
  },
  {
    path:'/dashboard',
    element:<DashBoard></DashBoard>,
    children:[
      //Seller
        {
          path:'sellerHome',
          element:<SellerHome></SellerHome>
        },
    ]
  }

])

export default router
