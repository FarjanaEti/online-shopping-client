
import { Link } from 'react-router-dom';
import 'animate.css';

const Navbar = () => {
  
  return (
    <div className="navbar mb-3 bg-zinc-100 py-4 rounded-3xl bg-transparent sticky top-0 z-50 shadow-sm px-5">
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
    
      <span className="animate__animated animate__pulse animate__infinite animate__delay-1s text-3xl"> NeoMartX</span>
     
    </Link>
          </div>
        </a>
      </div>

      {/* Navbar Center  */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/allFood">Products</Link></li>
          <li><Link to="/about">ABout Us</Link></li>
          <li><Link to="/contact">Contact US</Link></li>
          
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
       <Link to="/login" className="btn ">Login</Link>
   <Link to="/register" className="btn  text-black ml-2">Signup</Link>
      </div>
    </div>
  );
};

export default Navbar;
