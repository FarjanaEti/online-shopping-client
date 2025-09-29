
import { FaBell, FaCoins } from "react-icons/fa";
//import { AuthContext } from "../../Provider/AuthProvider";
import { FaShopify } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";

const DashTop = () => {
  const [cart] = useCart();
  const {user}=useAuth();                 
  //console.log(user,cart)
    return (
    <header className="flex items-center justify-between bg-gradient-to-b
             from-red-200 to-blue-300 py-8 md:px-18 shadow">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
      <Link to={'/'} className="btn btn-ghost normal-case text-xl">
 <FaShopify  className=" bg-gradient-to-r from-[#BA487F] via-[#722323] to-[#254D70] text-white rounded-2xl p-1  text-4xl"/>
   <h1
  className="text-4xl font-extrabold text-center 
  bg-gradient-to-r from-[#BA487F] via-[#722323] to-[#254D70]
  bg-clip-text text-transparent w-fit mx-auto animate__animated animate__pulse
      animate__infinite "
>
  NeoMartX
</h1>

                    </Link>
      </div>

        {/* User Info  */}
        {cart.map((users, index) => (
        <div key={index} className="flex items-center gap-6">
         
          {/* User Info */}
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-gray-800">
              {users.role || "Unknown Role"} 
            </span>
            <span className="text-xl text-gray-600">
              {users.name || "Anonymous"} 
            </span>
          </div>

          {/* User profile */}
          {user?
          <img
          src={user.photoURL || "https://picsum.photos/150"} 
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