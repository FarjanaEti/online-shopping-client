import React from 'react';
import useProducts from '../../Hooks/useProducts';

const TopProducts = () => {
  const [products] = useProducts(); // Assuming it's returning an array
  console.log(products);

  return (
    <div className="px-4 md:px-10 py-8  min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Top Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products?.map(product => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={product.title}
              className="w-full h-48 object-cover"
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

export default TopProducts;
