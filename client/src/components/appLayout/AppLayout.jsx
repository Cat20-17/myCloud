import {Outlet} from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import React from 'react';

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;