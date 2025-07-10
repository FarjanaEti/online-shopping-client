import React, { useState, useEffect } from 'react';
import { motion as _motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [ThreeColumn, setThreeColumn] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const [filtered, setFiltered] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

// Calculate pagination
const totalItems = products.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const currentProducts = filtered.slice(startIndex, startIndex + itemsPerPage);

  //  all products 
  useEffect(() => {
  fetch("http://localhost:5000/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      setFiltered(data); 
    });
}, []);


  //  Search products
  const onSearchSubmit = (searchData) => {
    const searchQuery = searchData.search?.trim();
    if (searchQuery) {
      fetch(`http://localhost:5000/products?searchParam=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
        setFiltered(data);     
        setCurrentPage(1);      
      });
    } else {
      
     setFiltered(products);
    setCurrentPage(1);
    }
    reset();
  };
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  //category
  const handleCategoryFilter = (category) => {
  if (category === "All") {
    setFiltered(products);
  } else {
    const results = products.filter(p => p.category === category);
    setFiltered(results);
  }
  setCurrentPage(1); // reset to first page on filter
};

  return (
    <div>
    <div className="px-4 md:px-10 py-8 min-h-screen">
      {/*  heading */}
      <_motion.h1
        animate={{ color: ['#D69ADE', '#BA487F', '#A2AADB'] }}
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

     {/* category */}
  <_motion.h1
        animate={{ color: ['#D69ADE', '#BA487F', '#A2AADB'] }}
        transition={{ duration: 2, repeat: Infinity }}
        className='text-3xl text-center font-bold mb-8'
      >
        Categories
      </_motion.h1>
   {products.length > 0 && (
  <div className="flex flex-wrap gap-2 justify-center mb-6">
    
    {["All", ...new Set(products.map(p => p.category))].map(cat => (
      <button
        key={cat}
        onClick={() => handleCategoryFilter(cat)}
        className="btn btn-sm bg-gradient-to-br from-violet-100 to-violet-300 hover:from-gray-300 hover:to-gray-400"
      >
        {cat}
      </button>
    ))}
  </div>
)}


      {/* Products Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          ThreeColumn ? 'md:grid-cols-3' : 'md:grid-cols-4'
        } gap-6`}
      >
        {products?.length > 0 ? (
         currentProducts.map(product => (
            <div
              key={product._id}
              className="bg-gradient-to-br from-violet-100 via-white to-violet-200  rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={product.title}
                className="w-full h-72 object-cover p-3 rounded-t-xl"
              />
              <div className="p-4 ">
                <h3 className="text-2xl font-semibold text-gray-800">{product.title}</h3>
                <p className="text-xl text-gray-500 my-2">{product.description}</p>
                <p className="text-xl font-bold text-purple-400 mt-2">
                  Category: <span className="text-gray-700">{product.category}</span>
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-purple-600">৳{product.price}</span>

                  <Link to={`/products/${product._id}`}> <button
                  className="btn btn-outline" >
                  View Details
                </button></Link>
                  
                </div>
              </div>
    
            </div>
              
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 mt-10 text-xl">No products found</p>
        )}
      </div>
    </div>

  {/* paging */}
    <div className="pagination flex justify-center mt-4 mb-12 space-x-2">
            <button
              className={`px-4 py-2 border rounded ${
                currentPage === 1//previous
                  ? "bg-gradient-to-br from-gray-100 to-violet-200 text-black cursor-not-allowed"
                  : "bg-gradient-to-br from-violet-200 to-violet-300 text-black "
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 border rounded ${
                  currentPage === page + 1
                    ? "bg-gradient-to-br from-blue-400 to-violet-300 text-white"//current button
                    : "bg-gradient-to-br from-gray-100 to-violet-200 hover:bg-gray-200"//extra button
                }`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
            <button
            // next button
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages
                  ? "bg-gradient-to-br from-gray-100 to-violet-200   text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-br from-violet-200 to-violet-300 text-black hover:bg-blue-600"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
   
    </div>
  );
};

export default AllProducts;
