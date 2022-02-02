import React from 'react';

import Navmenu from './Navmenu';
import FooterNav from './FooterNav';

const Layout = ({ children }) => {
  return (
    <>
      <div className="max-w-lg m-auto min-h-screen overflow-hidden bg-[#fffffe] dark:bg-primary relative">
        <Navmenu />
        {children}
        <FooterNav />
      </div>
    </>
  );
};

export default Layout;
