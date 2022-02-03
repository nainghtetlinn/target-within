import React from 'react';
import Link from 'next/link';
import { BsHouseDoorFill, BsPlusSquare } from 'react-icons/bs';

const Navbar = () => {
  return (
    <div className="flex">
      <Link href={'/'} passHref={true}>
        <a className="w-1/2 flex justify-center p-2 text-primary hover:bg-primary hover:text-white dark:text-white dark:hover:bg-dPri">
          <BsHouseDoorFill className="text-2xl" />
        </a>
      </Link>
      <Link href={'/addnewtarget'} passHref={true}>
        <a className="w-1/2 flex justify-center p-2 text-primary hover:bg-primary hover:text-white dark:text-white dark:hover:bg-dPri">
          <BsPlusSquare className="text-2xl" />
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
