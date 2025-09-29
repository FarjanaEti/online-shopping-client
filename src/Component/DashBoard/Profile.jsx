import { useState } from "react";
import { motion as Motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";
//import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useCart from "../../Hooks/useCart";
import axios from "axios";

const Profile = () => {
  const {user}=useAuth();   
   const [cart] = useCart();              
  console.log(cart)
  //const axiosPublic = useAxiosPublic();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    shopName: user?.shopName || "", 
  });

  const [showSettings, setShowSettings] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
  try {
    const res = await axios.put(
      `http://localhost:5000/users/${encodeURIComponent(cart[0]?.email)}`,
      formData
    );
    console.log("Updated Profile Data:", res.data);
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200">
      <Motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg"
      >
        <div className="text-center">
          <img
            src={cart[0]?.url|| "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto border-4 border-purple-300 shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {cart[0]?.name || "No Name"}
          </h2>
          <p className="text-gray-500">{formData.email}</p>
        </div>

        {/* Profile Info / Edit Form */}
        <div className="mt-6 space-y-4">
          {isEditing ? (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                placeholder="Enter Name"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                placeholder="Enter Phone"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
                placeholder="Enter Address"
              />

              {/* if seller want to change*/}
              {cart[0]?.role === "worker" && (
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                  placeholder="Enter Shop Name"
                />
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            </Motion.div>
          ) : (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-700 space-y-2"
            >
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {formData.phone || "Not set"}
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {formData.address || "Not set"}
              </p>

              {/*  for seller */}
              {cart[0]?.role === "worker" && (
                <p>
                  <span className="font-semibold">Shop Name:</span>{" "}
                  {formData.shopName || "Not set"}
                </p>
              )}
            </Motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-around">
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="px-5 py-2 rounded-lg bg-purple-400 text-white hover:bg-purple-600 transition"
          >
            Settings
          </button>
        </div>
      </Motion.div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <Motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-lg w-96"
          >
            <h3 className="text-xl font-bold mb-4">Settings</h3>
            <p className="text-gray-600 mb-4">Coming soon</p>
            <button
              onClick={() => setShowSettings(false)}
              className="px-4 py-2 rounded-lg bg-red-400 text-white hover:bg-red-600 transition"
            >
              Close
            </button>
          </Motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;
