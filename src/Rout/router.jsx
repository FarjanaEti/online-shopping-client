import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../Component/Home'
import Layout from '../Layout/Layout'
import Error from '../Component/Error'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import DashBoard from '../Component/DashBoard/DashBoard'
import SellerHome from '../Component/DashBoard/Seller/SellerHome'
import AdminHome from '../Component/DashBoard/Admin/AdminHome'
import CustomerHome from '../Component/DashBoard/Customer/CustomerHome'
import AddTask from '../Component/DashBoard/Seller/AddTask'
import AllProducts from '../Component/AllProducts'

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
  },
  {
   path:'/allProducts',
   element:<AllProducts></AllProducts>
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
        {
          path:'addProduct',
          element:<AddTask></AddTask>
        },
        {
          path:'adminHome',
          element:<AdminHome></AdminHome>
        },
        {
          path:'customerHome',
          element:<CustomerHome></CustomerHome>
        },
    ]
  }

])

export default router
