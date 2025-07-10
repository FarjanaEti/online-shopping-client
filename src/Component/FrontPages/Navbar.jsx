
import { Link } from 'react-router-dom';
import 'animate.css';
import { useContext } from 'react';
import AuthContext from '../../Provider/AuthContext';
import { FaShopify } from 'react-icons/fa';



const Navbar = () => {
   const { user,logOut } = useContext(AuthContext);   
   console.log(user);
    
   const handleLogOut=()=>{
     logOut()
            .then(() => { })
            .catch(error => console.log(error));
   }

  
  return (
    <div className="navbar mb-3 w-full  py-4 rounded-3xl bg-transparent sticky top-0 z-50 shadow-sm px-16">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allFood">All Foods</Link></li>
            <li><Link to="/about">ABout Us</Link></li>
            <li><Link to="/contact">Contact US</Link></li>
            
          </ul>
        </div>
        <a className=" hidden lg:block btn-ghost text-xl mb-6">
          <div className='flex space-x-5'>
           
   <Link to="/" className="block text-3xl  text-center mt-3">
   <div className='flex  items-center gap-2'>
           <FaShopify  className=" bg-gradient-to-r    from-[#BA487F] via-[#722323] to-[#254D70] text-white rounded-2xl p-1  text-4xl"/>
      <h1
  className="text-4xl font-extrabold text-center 
  bg-gradient-to-r from-[#BA487F] via-[#722323] to-[#254D70]
  bg-clip-text text-transparent w-fit mx-auto animate__animated animate__pulse
      animate__infinite "
>
  NeoMartX
</h1>  
           </div>
   
  
    </Link>
          </div>
        </a>
      </div>

      {/* Navbar Center  */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-xl px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/allProducts">All Products</Link></li>
          <li><Link to="/dashboard">DashBoard</Link></li>
          <li><Link to="/contactUs">Contact US</Link></li>
          
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
       {user ? (
                <img
                    src={user.
                        photoURL
                         || "https://picsum.photos/150"}
                    alt="user"
                    className="w-10 mr-1 h-10 rounded-full border"
                />
            ) : null}


     

        {user ? (
                <li className="inline-block text-2xl mx-2">
                    <button onClick={handleLogOut} className="">LogOut</button>
                </li>
            ) : (
                <>
                    <li className="inline-block text-xl mx-2"><Link to="/login">LogIn</Link></li>
                    <li className="inline-block text-xl mx-2"><Link to="/register">SignUp</Link></li>
                </>
            )}
      </div>
    </div>
  );
};

export default Navbar;
