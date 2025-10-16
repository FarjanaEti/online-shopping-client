import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [orders, setOrders] = useState([]);
 console.log(orders)
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/orders?email=${user.email}`)
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user, axiosPublic]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>

      {/* Orders List */}
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          You have no orders yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 border border-gray-200"
            >
              {/* Order Info */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">
                  Order ID: <span className="font-medium">{order._id}</span>
                </span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    order.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Product Section */}
              <div className="flex items-center gap-4">
                <img
                  src={order.image || "https://via.placeholder.com/100"}
                  alt={order.title}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {order.title}
                  </h2>
                  <p className="text-sm text-gray-500">{order.category}</p>
                  <p className="text-sm text-gray-500">
                    Seller:{" "}
                    <span className="font-medium">{order.sellerName}</span>
                  </p>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex justify-between items-center mt-4 border-t pt-3">
                <div>
                  <p className="text-purple-600 font-bold text-lg">
                    ৳ {order.price}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Qty: {order.quantity || 1}
                  </p>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
