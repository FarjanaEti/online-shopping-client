import React from 'react';
import Banner from './FrontPages/Banner';
import TopProducts from './FrontPages/TopProducts';

const Home = () => {
  return (
   <div className="max-w-7xl mx-auto px-4 sm:px-2">

  {/* 🔹 Banner Section */}
      <Banner></Banner>     
      <TopProducts></TopProducts>                              
  </div>
 );
};

export default Home;