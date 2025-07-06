import React from 'react';
import { motion as Motion } from 'framer-motion';


const ContactUs = () => {
  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-6 lg:px-24">
      {/* Header */}
      <Motion.h2
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch with <span className=" bg-gradient-to-r from-[#BA487F] via-[#722323] to-[#254D70]
  bg-clip-text text-transparent w-fit">NeoMartX</span>
      </Motion.h2>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Form Section */}
        <Motion.form
          className="bg-white p-8 rounded-xl shadow-md space-y-6"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@neomartx.com"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your message..."
              required
            />
          </div>

          <Motion.button
            type="submit"
            className="bg-gradient-to-br from-violet-200 to-violet-400 hover:bg-blue-700 text-black font-semibold py-3 px-6 rounded-lg w-full transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </Motion.button>
        </Motion.form>

        {/* Info Section */}
        <Motion.div
          className="bg-blue-50 p-8 rounded-xl shadow-md space-y-6"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-violet-300">Contact Info</h3>

          <div>
            <p className="font-medium">📍 Address</p>
            <p>NeoMartX HQ, 123 Innovation Street, Dhaka, Bangladesh</p>
          </div>

          <div>
            <p className="font-medium">📞 Phone</p>
            <p>+880 1234-567890</p>
          </div>

          <div>
            <p className="font-medium">✉️ Email</p>
            <p>support@neomartx.com</p>
          </div>

          <div>
            <p className="font-medium">⏰ Working Hours</p>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
