
import { Link } from 'react-router-dom';
import 'animate.css';
import { useContext, useEffect, useState } from 'react';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import AuthContext from '../../Provider/AuthContext';


const Navbar = () => {
   const { user,logOut } = useContext(AuthContext);   
   console.log(user);
  //dark light theme
  //lS store key-value pairs.data stay after refreshes or closes the browser.('key', 'value') → to store data('key') → to retrieve data

  const [darkMode, setDarkMode] = useState(//store the current theme
      localStorage.getItem("theme") === "dark"//theme is the key to save dark in LS
    );
   useEffect(() => {//update when the them changes
      if (darkMode) {// true false
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    }, [darkMode]);
  
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
    
     <h1 className="animate__animated animate__pulse
      animate__infinite">NeoMartX</h1>

     
    </Link>
          </div>
        </a>
      </div>

      {/* Navbar Center  */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/allFood">Products</Link></li>
          <li><Link to="/dashboard">DashBoard</Link></li>
          <li><Link to="/contact">Contact US</Link></li>
          
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
        <button
      onClick={() => setDarkMode(!darkMode)}//toggle
      style={{
        padding: "10px",
        borderRadius: "50%",
        backgroundColor: darkMode ? "#333" : "#ddd",
        color: darkMode ? "#fff" : "#000",
        border: "none",
        cursor: "pointer",
       
      }}
    >
      {darkMode ? <MdDarkMode size={24} /> : <CiLight size={24} />}
    </button>
        {user ? (
                <li className="inline-block mx-2">
                    <button onClick={handleLogOut} className="">LogOut</button>
                </li>
            ) : (
                <>
                    <li className="inline-block mx-2"><Link to="/login">LogIn</Link></li>
                    <li className="inline-block mx-2"><Link to="/register">SignUp</Link></li>
                </>
            )}
      </div>
    </div>
  );
};

export default Navbar;
