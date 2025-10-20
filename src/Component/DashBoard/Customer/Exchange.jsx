import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Exchange = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  const [exchangeType, setExchangeType] = useState("exchange");
  const [reason, setReason] = useState("");
  const [replacement, setReplacement] = useState("");
  const [loading, setLoading] = useState(false);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-gray-600 mb-3">No order data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Request submitted successfully!");
      
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Return / Exchange Request</h2>

      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-4 mb-6">
        <img
          src={order.image}
          alt={order.productName}
          className="w-28 h-28 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold">{order.productName}</h3>
          <p className="text-gray-600">Order ID: {order._id}</p>
          <p className="text-gray-600">Price: ${order.price}</p>
          <p className="text-gray-600">Status: {order.status}</p>
          <p className="text-gray-600">Delivered on: {order.date}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Exchange or Return choice */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Request Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="exchange"
                checked={exchangeType === "exchange"}
                onChange={() => setExchangeType("exchange")}
              />
              Exchange
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="return"
                checked={exchangeType === "return"}
                onChange={() => setExchangeType("return")}
              />
              Return
            </label>
          </div>
        </div>

        {/* Replacement field only if exchange selected */}
        {exchangeType === "exchange" && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Replacement Product (Name or ID)
            </label>
            <input
              type="text"
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              placeholder="Enter replacement product name or ID"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        )}

        {/* Reason */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain your reason..."
            className="w-full border rounded-lg p-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700 transition"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Exchange;
