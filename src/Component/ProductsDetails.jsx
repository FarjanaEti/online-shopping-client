import React, {  useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {motion as Motion } from "framer-motion";
import AuthContext from '../Provider/AuthContext';
//import useAxiosPublic from './useAxiosPublic';
const ProductsDetails = () => {
const { id } = useParams();   
     //const axiosPublic=useAxiosPublic();                     
 // const {user}=useContext(AuthContext)
  const [product, setProducts] = useState();

  //const [submission, setSubmission] = useState("");
   
   useEffect(() => {
  fetch(`http://localhost:5000/products/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      setProducts(data);
    })
    .catch(error => {
      console.error("Error fetching task:", error.message);
    });
}, [id]);


  if (!product) return <div className="text-center py-20">Loading...</div>;
return (
 <div className='p-5 text-xl'>
 <Motion.h1
         animate={{ color: ['#D69ADE', '#BA487F', '#A2AADB'] }}
         transition={{ duration: 2, repeat: Infinity }}
         className='text-4xl text-center font-bold mb-8'
       >
         Product Details
       </Motion.h1>
      <Motion.div
      className="bg-gradient-to-br from-violet-100 via-white to-violet-200 max-w-5xl mx-auto mt-10 p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main section */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="w-full">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 text-sm">Category: <span className="font-medium">{product.category}</span></p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-2xl font-semibold text-purple-700">৳ {product.price}</p>
          <p className="text-sm">Stock: <span className={product.stock > 0 ? 'text-purple-600 font-bold' : 'text-red-600'}>{product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</span></p>
          <p className="text-sm text-gray-600">Seller: <span className="font-medium">{product.name}</span></p>
          <p className="text-sm text-gray-600">Email: {product.email}</p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-gradient-to-br from-violet-100 to-violet-300 text-black px-4 py-2 rounded hover:bg-blue-700 transition-all">
              Add to Cart
            </button>
            <button className="bg-gradient-to-br from-violet-300 to-violet-100 px-4 py-2 rounded hover:bg-blue-100 transition-all">
              Wishlist
            </button>
             <button
    className="bg-gradient-to-br from-violet-100 to-violet-300 text-black px-4 py-2 rounded hover:bg-green-700 transition-all"
//     onClick={() => handleBuyNow(product)}
  >
    Buy Now
  </button>
          </div>
        </div>
      </div>
    </Motion.div> 

  </div>
  );
};

export default ProductsDetails;