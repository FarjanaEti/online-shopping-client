import React from 'react';
import Banner from './FrontPages/Banner';
import TopProducts from './FrontPages/TopProducts';

const Home = () => {
  return (
   <div className=" ">

  {/* 🔹 Banner Section */}
      <Banner></Banner>     
      <TopProducts></TopProducts>                              
  </div>
 );
};

export default Home;