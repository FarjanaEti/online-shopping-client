import React, { useState, useEffect } from 'react';
import { motion as _motion } from "framer-motion";
import { useForm } from 'react-hook-form';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [ThreeColumn, setThreeColumn] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  //  all products 
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  //  Search products
  const onSearchSubmit = (searchData) => {
    const searchQuery = searchData.search?.trim();
    if (searchQuery) {
      fetch(`http://localhost:5000/products?searchParam=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    } else {
      // If search is empty, reload all products
      fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }
    reset();
  };

  return (
    <div className="px-4 md:px-10 py-8 min-h-screen">
      {/*  heading */}
      <_motion.h1
        animate={{ color: ['#090040', '#722323', '#5409DA'] }}
        transition={{ duration: 2, repeat: Infinity }}
        className='text-3xl text-center font-bold mb-8'
      >
        All Products
      </_motion.h1>

      {/* Search  Layout toggle */}
      <div className='flex flex-col md:flex-row md:gap-4 items-center justify-center mb-6'>
        <button
          onClick={() => setThreeColumn(!ThreeColumn)}
          className='btn bg-gradient-to-br from-violet-100 to-violet-300 mb-4 md:mb-0'
        >
          {ThreeColumn ? '4 Columns' : '3 Columns'}
        </button>

        <form onSubmit={handleSubmit(onSearchSubmit)} className="w-full md:w-auto flex">
          <input
            {...register('search')}
            type="text"
            placeholder="Search Product"
            className="input input-bordered w-full md:w-72"
          />
          <button type="submit" className="btn bg-gradient-to-br from-violet-100 to-violet-300 ml-2">Search</button>
        </form>
      </div>

      {/* Products Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          ThreeColumn ? 'md:grid-cols-3' : 'md:grid-cols-4'
        } gap-6`}
      >
        {products?.length > 0 ? (
          products.map(product => (
            <div
              key={product._id}
              className="bg-gradient-to-r from-pink-200 to-emerald-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={product.title}
                className="w-full h-72 object-cover p-3 rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-sm text-gray-500 my-2">{product.description}</p>
                <p className="text-sm font-medium text-green-600 mt-2">
                  Category: <span className="text-gray-700">{product.category}</span>
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-green-600">৳{product.price}</span>
                  <button className="btn btn-sm btn-outline">View Details</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 mt-10 text-xl">No products found</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
