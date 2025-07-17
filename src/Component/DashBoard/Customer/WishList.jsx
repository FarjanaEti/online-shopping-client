import React from 'react';
import { FaHeart } from "react-icons/fa6";
const WishList = () => {
 return (
 <div>
    <div className='flex-1'>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-2"><FaHeart /> My WishList</h2>
              <button className="bg-violet-400 text-white font-bold px-4 py-2 rounded hover:bg-violet-600">
                Clear wishList
              </button>
            </div>
            </div>                                                                     
 </div>
  );
};

export default WishList;