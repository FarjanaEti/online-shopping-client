import { FaShoppingCart, FaClock, FaCheckCircle, FaAlipay, FaHeart } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const CustomerHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
 console.log(orders)
  // Fetch buyer's orders
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/orders?buyerEmail=${user.email}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user, axiosPublic]);

  // Fetch wishlist items
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/wishlist?email=${user.email}`)
        .then((res) => setWishlist(res.data))
        .catch((err) => console.error("Error fetching wishlist:", err));
    }
  }, [user, axiosPublic]);

  // Derived stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "processing").length;
  const pendingPay = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const totalSpent = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome back, {user?.displayName || "Buyer"}
          </h2>
          <p className="text-gray-500">
            Here’s a snapshot of your recent shopping activity.
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <h3 className="text-xl font-bold text-green-600">
            ${totalSpent.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaShoppingCart className="text-3xl text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h3 className="text-lg font-bold">{totalOrders}</h3>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaClock className="text-3xl text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Pending Orders</p>
            <h3 className="text-lg font-bold">{pendingOrders}</h3>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaAlipay  className="text-3xl text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">To Pay</p>
            <h3 className="text-lg font-bold">{pendingPay}</h3>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaCheckCircle className="text-3xl text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Delivered Orders</p>
            <h3 className="text-lg font-bold">{deliveredOrders}</h3>
          </div>
        </div>
       
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        {orders.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Product</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3).map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 text-sm text-gray-700">
                    #{order._id.slice(-5)}
                  </td>
                  <td className="py-2 flex items-center gap-2">
                    <img
                      src={order.image}
                      alt={order.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{order.title}</span>
                  </td>
                  <td className="py-2 text-gray-700">${order.totalPrice}</td>
                  <td
                    className={`py-2 font-medium ${
                      order.status === "processing"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">You haven’t placed any orders yet.</p>
        )}
        <button className="mt-4 text-blue-500 hover:underline">
          View All Orders
        </button>
      </div>

      {/* Wishlist & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <FaHeart className="text-red-500" /> Wishlist
          </h3>
          {wishlist.length > 0 ? (
            <div className="space-y-3">
              {wishlist.slice(0, 3).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 border-b pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-gray-500 text-sm">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No items in wishlist.</p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center gap-4">
          <button className="bg-purple-300 text-black px-4 py-2 rounded-lg w-full">
           <Link to='/allProducts'>Continue Shopping</Link> 
          </button>
          <Link to='/dashboard/wishlist' className="bg-blue-200  px-4  rounded-lg w-full">
          <button className="bg-blue-200 text-black px-4 py-2 rounded-lg w-full">
            View All Wishlist
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
