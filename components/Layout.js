import React from 'react';

import Navmenu from './Navmenu';
import Navbar from '../components/Navbar';
import Noti from './Noti';
import { useGlobelContext } from '../context';

const Layout = ({ children }) => {
  const { noti, showNoti } = useGlobelContext();
  return (
    <>
      <div className="max-w-lg m-auto min-h-screen overflow-x-hidden bg-[#fffffe] dark:bg-primary relative">
        <Navmenu />
        <Navbar />
        {children}
        {noti.show && <Noti {...noti} removeNoti={showNoti} />}
      </div>
    </>
  );
};

export default Layout;
