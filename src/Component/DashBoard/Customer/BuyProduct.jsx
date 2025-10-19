import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../../../Provider/AuthContext";

const BuyProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const { product } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
   console.log(product)
  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">No product selected!</h2>
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

  // Handle Cash on Delivery
  const handleCashOnDelivery = () => {
    const orderItem = {
      productId: product._id,
      title: product.title,
      rating: product.rating,
      category: product.category,
      price: product.price || 0,
      image: product.image,
      worker_email:product.email,

      // buyer info
      email: user?.email,
      userName: user?.displayName || "Anonymous",
      address: shippingAddress || "No address",
      phone: phoneNumber || "No number",

      // order details
      quantity: quantity,
      totalPrice: (product.price || 0) * quantity,
      paymentStatus: "pending",
      status: "processing",
      paymentMethod: "Cash on Delivery",

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderItem),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Success!", "Order placed successfully.", "success");
          setShowDropdown(false);
        } else {
          Swal.fire("Error", "Failed to place order.", "error");
        }
      })
      .catch((err) => console.error("Order error:", err));
  };

  // Handle Online Payment (navigate to payment page)
  const handleOnlinePayment = () => {
  const orderItem = {
    productId: product._id,
    title: product.title,
    rating: product.rating,
    category: product.category,
    price: product.price || 0,
    image: product.image,
    worker_email:product.email,

    // buyer info
    email: user?.email,
    userName: user?.displayName || "Anonymous",
    address: shippingAddress || "No address",
    phone: phoneNumber || "No number",

    // order details
    quantity: quantity,
    totalPrice: (product.price || 0) * quantity,
    paymentStatus: "paid", // since user chose online payment
    status: "processing",
    paymentMethod: "Online Payment",

    createdAt: new Date(),
    updatedAt: new Date(),
  };

  fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderItem),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertedId) {
        // Navigate to payment confirmation page or success screen
        navigate("/payment", {
          state: {
            product,
            quantity,
            shippingAddress,
            phoneNumber,
            orderId: data.insertedId,
          },
        });
      } else {
        Swal.fire("Error", "Failed to create order for online payment.", "error");
      }
    })
    .catch((err) => console.error("Order creation error:", err));
};


  return (
    <div className="max-w-6xl mx-auto p-6 my-20 bg-purple-100 rounded-xl shadow-lg relative">
      <h2 className="text-3xl font-bold mb-6 text-center">Buy Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-64 h-64 object-cover rounded-lg shadow"
          />
        </div>

        {/* Product Info */}
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

          {/* Shipping Info */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Shipping Address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </div>

        
        <div className="text-right relative">
          <p className="text-xl font-semibold mb-2 text-purple-600">
            Total: ${product.price * quantity}
          </p>

          <div className="mt-4 relative inline-block">
          
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-purple-600 font-bold text-white px-5 py-2 rounded hover:bg-purple-700 transition"
            >
              Confirm Purchase ▾
            </button>

            {/* payment */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-lg z-10">
                <button
                  onClick={handleOnlinePayment}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                   Online Payment
                </button>
                <button
                  onClick={handleCashOnDelivery}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                   Cash on Delivery
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate(-1)}
            className="ml-4 bg-gray-300 text-black px-5 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
