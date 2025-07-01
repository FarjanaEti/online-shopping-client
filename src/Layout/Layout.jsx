
import { Outlet } from 'react-router-dom';
import Footer from '../Component/FrontPages/Footer';
import Navbar from '../Component/FrontPages/Navbar';



const Layout = () => {
  
  return (
 <div className='border  bg-gradient-to-b from-red-200 to-blue-300' >  
   <Navbar></Navbar>
   <div className='xl:px-36 px-8 lg:px-24'>

   <Outlet></Outlet>
   </div>
    <Footer></Footer>                                                                                 
 </div>
 );
};

export default Layout;

//online shop management system in this system the administrator
//  keep users interface of a multimedia catalogue one home 
// appliance man woman wardrobe of equipment automobiles phone 
// and telecommunication etc with product details price appropriate
//  photograph user can easily access the categories and choose the
//  specific item can order that item effortlessly they are must be
//  online payment options and exchange options in due Times
//product order and exchange