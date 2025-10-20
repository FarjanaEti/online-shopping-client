import { FaBoxOpen, FaShoppingCart, FaClock, FaDollarSign } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const SellerHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  console.log(orders)
  //  all products
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  
  const sellerProducts = products.filter((p) => p.email === user?.email);

  // orders related 
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/orders?sellerEmail=${user.email}`) 
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user, axiosPublic]);

 
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.paymentStatus === "pending").length;
 // const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

 
  const totalEarnings = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome back, {user?.displayName || "Seller"}
          </h2>
          <p className="text-gray-500">Here’s a quick overview of your shop.</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Total Earnings</p>
          <h3 className="text-xl font-bold text-green-600">
            ${totalEarnings.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaBoxOpen className="text-3xl text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <h3 className="text-lg font-bold">{sellerProducts.length}</h3>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaShoppingCart className="text-3xl text-green-500" />
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
          <FaDollarSign className="text-3xl text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Earnings</p>
            <h3 className="text-lg font-bold">${totalEarnings.toLocaleString()}</h3>
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
                  <td
                    className={`py-2 font-medium ${
                      order.status === "pending"
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
          <p className="text-gray-500">No orders yet.</p>
        )}
        <button className="mt-4 text-blue-500 hover:underline">
          View All Orders
        </button>
      </div>

      {/* Best Seller + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-3">Best Selling Product</h3>
          <div className="flex items-center gap-4">
            <img
              src="https://i.ibb.co.com/WWcBtHgg/phn.jpg"
              alt="best seller"
              className="rounded-lg w-20"
            />
            <div>
              <h4 className="font-bold">iPhone 15 Pro Max 256GB</h4>
              <p className="text-gray-500 text-sm">15 Sales</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center gap-4">
          <Link to='/dashboard/addProduct' className="bg-purple-300 text-white px-4 py-2 rounded-lg w-full">
          <button className="bg-purple-200 text-black px-4 font-semibold  rounded-lg w-full">
            + Add Product
          </button>
          </Link>
          <button className="bg-purple-300 text-black font-bold px-4 py-2 rounded-lg w-full">
            Withdraw Earnings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
