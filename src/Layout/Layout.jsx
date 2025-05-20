
import { Outlet } from 'react-router-dom';
import Footer from '../Component/FrontPages/Footer';
import Navbar from '../Component/FrontPages/Navbar';


const Layout = () => {
  return (
 <div className='max-w-7xl mx-auto'>  
   <Navbar></Navbar>
   <Outlet></Outlet>
    <Footer></Footer>                                                                                 
 </div>
 );
};

export default Layout;