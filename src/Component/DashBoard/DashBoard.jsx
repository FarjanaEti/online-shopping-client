import React from 'react';
import useRole from '../../Hooks/useRole';
import DashTop from './DashTop';

const DashBoard = () => {
    const [role] = useRole();
    console.log(role)
  
   if (role === undefined) {
    return <div>Loading...</div>;
      }

    return (
        <div className="flex flex-col">
           
              <div className=" py-8">
                {/* Dashboard Content */}
               <DashTop></DashTop>
            </div>   
           
                     
        </div>
    );
};

export default DashBoard;