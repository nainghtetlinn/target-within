import React from 'react';
import Link from 'next/link';
import { BsHouseDoorFill, BsPlusSquare } from 'react-icons/bs';

const FooterNav = () => {
  return (
    <footer className="fixed bottom-4 left-1/2 translate-x-[-50%] flex rounded-full items-center justify-around bg-white dark:bg-primary text-primary dark:text-white overflow-hidden">
      <Link href={'/'} passHref={true}>
        <section className="footer">
          <BsHouseDoorFill className="text-2xl" />
        </section>
      </Link>
      <Link href={'/addnewtarget'} passHref={true}>
        <section className="footer">
          <BsPlusSquare className="text-2xl" />
        </section>
      </Link>
    </footer>
  );
};

export default FooterNav;
