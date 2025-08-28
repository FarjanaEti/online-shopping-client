import React from 'react';

const BuyProduct = () => {
  const product={
  title: 'Mi Smart Band 6',
  category: 'Smart Devices',
  image: 'https://i.ibb.co/FL1w4QtM/watch.jpg',
  seller: 'Mi Official Store',
  rating: 4.5,
  reviewCount: 321,
  price: 4999,
  description: '1.56” AMOLED display, heart rate, SpO2, 30 fitness modes, waterproof.',
  specs: ['AMOLED Display', '30 Sports Modes', '5 ATM Water Resistant']
}  



  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Buy Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left: Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-64 h-64 object-cover rounded-lg shadow"
          />
        </div>

        {/* Middle: Details */}
        <div>
          <h3 className="text-xl font-bold mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Category:</span> {product.category}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Brand:</span> {product.brand || "N/A"}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Description:</span>{" "}
            {product.description || "No description available."}
          </p>
        </div>

        {/* Right: Price and Action */}
        <div className="text-right">
          <p className="text-xl font-semibold mb-2 text-green-600">
            Price: ${product.price}
          </p>

          <div className="mt-4">
            <button
//               onClick={handleConfirmPurchase}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              Confirm Purchase
            </button>
            <button
//               onClick={() => navigate(-1)}
              className="ml-4 bg-gray-300 text-black px-5 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;