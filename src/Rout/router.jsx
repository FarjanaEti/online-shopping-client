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
import ContactUs from '../Component/ContactUs'
import ProductsDetails from '../Component/ProductsDetails'
import CartItem from '../Component/DashBoard/Customer/CartItem'

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
  },
  {
   path:'/contactUs',
   element:<ContactUs></ContactUs>
  },
  {
          path:'products/:id',
          element:<ProductsDetails></ProductsDetails>
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
        {
          path:'cart',
          element:<CartItem></CartItem>
        },
    ]
  }

])

export default router
