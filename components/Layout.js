import React from 'react';

import Navmenu from './Navmenu';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <div className="max-w-lg m-auto min-h-screen overflow-x-hidden bg-[#fffffe] dark:bg-primary relative">
        <Navmenu />
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
