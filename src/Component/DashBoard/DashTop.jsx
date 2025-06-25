
import { FaBell, FaCoins } from "react-icons/fa";
//import { AuthContext } from "../../Provider/AuthProvider";
import { FaShopify } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";

const DashTop = () => {
  const [cart] = useCart();
  const {user}=useAuth();                 
  console.log(user)
    return (
    <header className="flex items-center justify-between bg-gray-100 p-4 shadow">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
      <Link to={'/'} className="btn btn-ghost normal-case text-xl">
                   <FaShopify  className="text-black"/>
                            NeoMartX
                    </Link>
      </div>

        {/* User Info  */}
        {cart.map((users, index) => (
        <div key={index} className="flex items-center gap-6">
         
          {/* User Info */}
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-800">
              {users.role || "Unknown Role"} 
            </span>
            <span className="text-sm text-gray-600">
              {users.name || "Anonymous"} 
            </span>
          </div>

          {/* User profile */}
          {user?
          <img
          src={user.photoURL || "https://ibb.co.com/55JfK0L"} 
          alt="User"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
          :<></>}

          {/* Notification */}
          <button className="p-2 text-gray-700 hover:text-gray-900">
            <FaBell className="text-2xl" />
          </button>
        </div>
      ))}

     
    </header>
  );
};
    

export default DashTop;