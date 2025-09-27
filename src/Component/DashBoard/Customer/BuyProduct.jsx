
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BuyProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get product from state
  const { product } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  // If no product is passed, fallback
  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold"> No product selected!</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-300 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleConfirmPurchase = () => {
    alert(
      ` Order placed: ${product.title} (x${quantity}) - Total: $${
        product.price * quantity
      }`
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 my-20 bg-purple-100 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Buy Product</h2>

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

          {/* Quantity */}
          <div className="mt-4 flex items-center gap-4">
            <span className="font-medium">Quantity:</span>
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-4 py-1 border rounded">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>

        {/* Right: Price + Actions */}
        <div className="text-right">
          <p className="text-xl font-semibold mb-2 text-purple-600">
            Price: ${product.price * quantity}
          </p>

          <div className="mt-4">
            <button
              onClick={handleConfirmPurchase}
              className="bg-purple-600 font-bold text-white px-5 py-2 rounded hover:bg-purple-700 transition"
            >
              Confirm Purchase
            </button>
            <button
              onClick={() => navigate(-1)}
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
