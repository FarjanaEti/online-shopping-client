import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Provider/AuthContext";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { IoTrashBinOutline } from "react-icons/io5";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";

const Wishlist = () => {
   const { user } = useContext(AuthContext); 
  const axiosPublic = useAxiosPublic();
  const [wishlist, setWishlist] = useState([]);
  console.log(wishlist,user);
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/wishlist?email=${user.email}`)
        .then((res) => {
          setWishlist(res.data);
        })
        .catch((err) => console.error("Error fetching wishlist:", err));
    }
  }, [user, axiosPublic]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl text-center font-bold mb-6 justify-center flex items-center gap-2">
        <FaHeart className="text-purple-400" /> My Wishlist</h2>

      <div className="space-y-4">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md rounded-lg p-4  border-b-2 gap-4"
          >
            {/* Image */}
            <div className="w-full border  sm:w-32 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-28 object-cover rounded"
              />
            </div>

            {/* Info */}
            <div className="flex-1 sm:px-4 text-center sm:text-left">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-lg text-gray-600">Category: {item.category}</p>

              <button
                //onClick={() => handleDelete(item._id)}
                className="mt-2 px-3 py-1 text-xl rounded hover:bg-red-500 hover:text-white transition"
              >
                <IoTrashBinOutline />
              </button>
            </div>

            {/* Price + Add to Cart */}
            <div className="flex flex-col items-center sm:items-end">
              <p className="text-lg font-bold text-purple-600">${item.price}</p>
              <button
               // onClick={() => handleAddToCart(item)}
                className="mt-2 text-xl px-4 py-1 bg-purple-300 hover:text-white rounded hover:bg-purple-700 transition"
              >
                <FaCartArrowDown />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Wishlist;
