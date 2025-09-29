import { FaBoxOpen, FaShoppingCart, FaClock, FaDollarSign } from "react-icons/fa";

const SellerHome = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Welcome back, Prithaa! 👋</h2>
          <p className="text-gray-500">Here’s a quick overview of your shop.</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Current Balance</p>
          <h3 className="text-xl font-bold text-green-600">$540</h3>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaBoxOpen className="text-3xl text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Products</p>
            <h3 className="text-lg font-bold">12</h3>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaShoppingCart className="text-3xl text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h3 className="text-lg font-bold">58</h3>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaClock className="text-3xl text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Pending Orders</p>
            <h3 className="text-lg font-bold">3</h3>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center gap-4">
          <FaDollarSign className="text-3xl text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Earnings</p>
            <h3 className="text-lg font-bold">$2.4k</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="pb-2">Order ID</th>
              <th className="pb-2">Product</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">#1234</td>
              <td className="py-2">iPhone 14</td>
              <td className="py-2 text-yellow-600">Pending</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">#1235</td>
              <td className="py-2">Laptop</td>
              <td className="py-2 text-green-600">Delivered</td>
            </tr>
            <tr>
              <td className="py-2">#1236</td>
              <td className="py-2">AirPods</td>
              <td className="py-2 text-green-600">Delivered</td>
            </tr>
          </tbody>
        </table>
        <button className="mt-4 text-blue-500 hover:underline">View All Orders</button>
      </div>

      {/* Best Seller + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-3">Best Selling Product</h3>
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80"
              alt="best seller"
              className="rounded-lg"
            />
            <div>
              <h4 className="font-bold">AirPods Pro</h4>
              <p className="text-gray-500 text-sm">15 Sales</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
            + Add Product
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">
            Withdraw Earnings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
