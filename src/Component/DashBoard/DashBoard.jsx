import React from 'react';
import useRole from '../../Hooks/useRole';
import DashTop from './DashTop';
import { FaBoxOpen, FaClipboardList, FaCoins, FaHeart, FaHome, FaPlus, FaShoppingCart, FaTasks, FaUser} from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { NavLink, Outlet } from 'react-router-dom';

const DashBoard = () => {
    const [role] = useRole();
    console.log(role)
  //const role="admin";
   if (role === undefined) {
    return <div>Loading...</div>;
      }

     return (
        <div className="flex flex-col ">
            
              <div className="md:px-24 py-8">
                {/* Dashboard Content */}
               <DashTop></DashTop>
            </div>   
            <div className="lg:flex  px-24">
            <div className="lg:w-64 text-4xl font-semibold w-full 
            lg:min-h-screen px-8 border bg-gradient-to-b
             from-red-200 to-blue-300 text-black">
                <ul className="menu p-4">
                    {role === "admin" ? (
                        <>
                        <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    <FaUser></FaUser>
                                    Manage Worker</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allTask">
                                    <FaTasks></FaTasks>
                                    Manage Product</NavLink>
                            </li>
                            <li>
            <NavLink to="/dashboard/profile">
                <FaUser />
                Profile
            </NavLink>
        </li>
                        </>
                    ) : role === "worker" ? (
                       <>
                       <li>
                                <NavLink to="/dashboard/sellerHome">
                                    <FaHome></FaHome>
                                    Seller Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addProduct">
                                      <FaPlus></FaPlus>
                                       Add Product
                                     </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myProducts">
                                 <FaBoxOpen></FaBoxOpen>
                                   My Products
                                  </NavLink>
                            </li>
                             <li>
                       <NavLink to="/dashboard/orders">
                            <FaClipboardList></FaClipboardList>
                           Orders Received
                             </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/withdraw">
                                <FaMoneyCheckDollar />
                                    Earnings</NavLink>
                            </li>
                            <li>
            <NavLink to="/dashboard/profile">
                <FaUser />
                Profile
            </NavLink>
        </li>
                       </>
                    ) : role === "buyer" ? (
                       <>
                       <li>
                                 <NavLink to="/dashboard/customerHome">
                                   <FaHome />
                                     Customer Home
                                   </NavLink>
                            </li>
                            <li>
                               <NavLink to="/dashboard/myOrders">
                              <FaTasks />
                              My Orders
                           </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/wishlist">
                                 <FaHeart></FaHeart>
                                  Wishlist
                                 </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/cart">
                                  <FaShoppingCart></FaShoppingCart>
                                    Shopping Cart
                                  </NavLink>
                            </li>
                            <li>
            <NavLink to="/dashboard/profile">
                <FaUser />
                Profile
            </NavLink>
        </li>
                       </>
                    ) : (
                        <li>Default Navigation</li>
                    )}
                </ul>
            </div>
            <div className="flex-1 py-8">
                
                <Outlet></Outlet>
            </div>
            </div>   
                 
        </div>
    );

};

export default DashBoard;