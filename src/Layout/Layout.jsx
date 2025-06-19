
import { Outlet } from 'react-router-dom';
import Footer from '../Component/FrontPages/Footer';
import Navbar from '../Component/FrontPages/Navbar';



const Layout = () => {
  
  return (
 <div >  
   <Navbar></Navbar>
   <div className='max-w-7xl mx-auto'>

   <Outlet></Outlet>
   </div>
    <Footer></Footer>                                                                                 
 </div>
 );
};

export default Layout;