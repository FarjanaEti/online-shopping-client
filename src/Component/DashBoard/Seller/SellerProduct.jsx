import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const SellerProduct = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  //getting order palaced by user on a seller product
  const axiosPublic = useAxiosPublic();
  const [order, setOrders] = useState([]);
  console.log(order.length);
  
  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/orders?sellerEmail=${user.email}`) 
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user, axiosPublic]);
  
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const sellerProduct = products.filter((t) => t.email === user.email);

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
           if (data.success) {
      alert(data.message);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Products</h1>

      {/* Seller Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl">{sellerProduct.length}</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Value</h2>
          <p className="text-2xl">
            $
            {sellerProduct.reduce((sum, p) => sum + parseFloat(p.price), 0)}
          </p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-2xl">{order.length}</p> {/* later connect with orders API */}
        </div>
      </div>

      {/* Add Product Button */}
      <Link to="/dashboard/addProduct">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
          + Add Product
        </button>
      </Link>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {sellerProduct.map((product) => (
          <Motion.div
            key={product._id}
            className="p-4 border rounded-lg shadow hover:shadow-lg bg-white flex flex-col"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex justify-between items-center mt-4">
              <Link to={`/dashboard/editProduct/${product._id}`}>
                <button className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                  <FaEdit /> Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default SellerProduct;
