import React, { useState } from 'react';
import { motion as _motion } from "framer-motion";
import useProducts from '../Hooks/useProducts';
import { useForm } from 'react-hook-form';

const AllProducts = () => {
  const [products] = useProducts();     
   const [ThreeColumn, setThreeColumn] = useState(true);
   const { register, handleSubmit } = useForm();
   const onSearchSubmit=()=>{

   }
  return (
    <div className="px-4 md:px-10 py-8  min-h-screen">
      <_motion.h1 
  animate={{ color: ['#090040', '#722323', '#5409DA'] }} 
  transition={{ duration: 2, repeat: Infinity }}
  className='text-3xl text-center font-bold mb-8'
>
  All Products
</_motion.h1>

{/* div for search and layout */}
   <div className='flex md:gap-4  items-center justify-center mx-auto  py-5'>
       <button 
       onClick={() => setThreeColumn(!ThreeColumn)}
      className='btn bg-gradient-to-br from-violet-100 to-violet-300'>
                              Change Layout</button>                         
   {/* search */}
       <div className=" ">
        <form onSubmit={handleSubmit(onSearchSubmit)}>
          <input
            {...register('search')} 
            type="text"
            name="search"
            placeholder="Search Product"
            className="input input-bordered  md:w-full ml-14 md:ml-0"
            required
          />
        </form>
      </div>
   </div>

     <div
  className={`grid grid-cols-1 sm:grid-cols-2 ${
    ThreeColumn ? 'md:grid-cols-3' : 'md:grid-cols-4'
  } gap-6`}
>

        {products?.map(product => (
          <div
            key={product._id}
            className="bg-gradient-to-r from-pink-200 to-emerald-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={product.title}
              className="w-full h-72 p-3 "
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
              <p className="text-sm text-gray-500 my-2">{product.description}</p>

              <p className="text-sm font-medium text-blue-600 mt-2">
                Category: <span className="text-gray-700">{product.category}</span>
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-green-600">৳{product.price}</span>
                <button className="btn btn-sm btn-outline btn-primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
         <div className="py-12 text-center">
        <a
          href="/signup"
          className="inline-block px-6 py-3 bg-cyan-300 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700"
        >
          See More
        </a>
      </div>
    </div>
  );
};

export default AllProducts;