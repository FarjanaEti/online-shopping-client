import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { CiLocationOn } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";

const OrderReceived = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [orders, setOrders] = useState([]);
  console.log(orders)
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/orders?email=${user.email}`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user, axiosPublic]);

  //delivery status
  const handleMarkDelivered = async (orderId) => {
    try {
      const res = await axios.put(`http://localhost:5000/orders/${orderId}/delivered`);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Order marked as delivered!",
          timer: 1500,
          showConfirmButton: false,
        });

        // Update UI instantly
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: "delivered", deliveredAt: new Date() }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update order",
        text: "Please try again later.",
      });
    }
  };

  //order cancel by seller
     const handleDelete = (id) => {
      fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
           if (data.success) {
      alert(data.message);
      setOrders((prev) => prev.filter((p) => p._id !== id));
    }
        })
        .catch((err) => console.error(err));
    }
  ;

  return (
    <div className="max-w-7xl mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Orders Received
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Buyer</th>
                <th className="px-4 py-2 border">Qty</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Payment</th>
                <th className="px-4 py-2 border">Delivery</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    <img
                      src={order.image}
                      alt={order.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">
                    <p className="font-medium">{order.title}</p>
                    <p className="text-sm text-gray-500">
                      {order.category || "N/A"}
                    </p>
                  </td>
                  <td className="px-4 py-2 border">
                    <p>{order.userName}</p>
                    <p className="text-sm text-gray-500">{order.email}</p>
                    <p className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                      <CiLocationOn /> {order.address || "N/A"}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                      <FaPhone /> {order.phone || "N/A"}
                    </p>
                  </td>
                  <td className="px-4 py-2 border">{order.quantity}</td>
                  <td className="px-4 py-2 border">${order.price}</td>
                  <td className="px-4 py-2 border font-semibold text-purple-600">
                    ${order.totalPrice}
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.paymentStatus === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-pink-100 text-black-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2 justify-center">
                      <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Mark as Paid
                      </button>
                      <button
                       onClick={() => handleMarkDelivered(order._id)}
                      className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Mark as Delivered
                      </button>
                      <button 
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderReceived;
