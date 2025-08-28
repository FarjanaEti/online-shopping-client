import { useState } from "react";
import { motion as Motion } from "framer-motion";
import useAuth from "../../Hooks/useAuth";


const Profile = () => {
  const {user}=useAuth() 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  console.log(formData)
  const [showSettings, setShowSettings] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    
    console.log("Updated Profile Data:", formData);
    setIsEditing(false);
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
            src={user?.photoURL || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto border-4 border-purple-300 shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {formData.name || "No Name"}
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
            <p className="text-gray-600 mb-4">coming soon</p>
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
