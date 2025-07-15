import React, { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import AuthContext from '../../../Provider/AuthContext';
import { IoTrashBin } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useCallback } from "react";
const CartItem = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext); 
  const [cartItems, setCartItems] = useState([]);   
  console.log(user,cartItems);

   const fetchCart = useCallback(() => {
  if (user?.email) {
    axiosPublic
      .get(`/cart?email=${user.email}`)
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch cart:", err);
      });
  }
}, [user, axiosPublic]);

useEffect(() => {
  fetchCart();
}, [fetchCart]);

  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
 
       const handleDeleteTask = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/cart/${item._id}`);
                if (res.data.deletedCount > 0) {
                    fetchCart();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.title} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    }


  return (
 <div className='flex flex-col lg:flex-row gap-6 px-4 lg:px-20 py-8'>
      {/* Cart List Section */}
      <div className='flex-1'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center gap-2"><FaShoppingCart /> My Shopping Cart</h2>
          <button className="bg-violet-400 text-white font-bold px-4 py-2 rounded hover:bg-violet-600">
            Clear Cart
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="bg-white border  rounded-xl shadow md:p-4 mb-4 flex gap-4 items-center">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-lg">${item.price}</span>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                </div>
              </div>
              <button   onClick={() => handleDeleteTask(item)} className="text-red-500 hover:text-red-700 text-xl"><IoTrashBin /></button>
            </div>
          ))
        )}
      </div>

      {/* Summary Sidebar */}
      <div className="w-full lg:w-80 bg-gray-100 rounded-xl p-6 shadow h-fit">
        <h3 className="text-xl font-bold mb-4">🧾 Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>
        <div className="flex justify-between mb-2 font-semibold">
          <span>Total Price:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <hr className="my-4" />
        <button className="w-full bg-violet-400 text-white font-bold py-2 rounded hover:bg-violet-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
 
};

export default CartItem;