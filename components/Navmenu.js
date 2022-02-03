import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useGlobelContext } from '../context';
import { BsMoonStarsFill } from 'react-icons/bs';

const Navmenu = () => {
  const { isDark, setIsDark } = useGlobelContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const toggleDark = () => {
    setIsDark(!isDark);
  };

  const navContainer = useRef();
  const navHeight = useRef();
  const btnDark = useRef();

  useEffect(() => {
    if (isDark) {
      btnDark.current.style.transform = 'translateX(27px)';
    } else {
      btnDark.current.style.transform = 'translateX(0px)';
    }
  }, [isDark]);

  useEffect(() => {
    if (isOpen) {
      navContainer.current.style.height = navHeight.current.offsetHeight + 'px';
    } else {
      navContainer.current.style.height = 0;
    }
  }, [isOpen]);

  return (
    <nav className="z-10 min-h-[8vh] relative flex items-center justify-between px-5 py-3 text-primary dark:text-white border-b-2">
      <div>
        <h2 className="font-bold select-none">Target_within</h2>
      </div>
      <div
        className={`h-6 w-7 flex flex-col justify-between cursor-pointer select-none`}
        onClick={toggleOpen}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {/* drop nav menu */}
      <div
        ref={navContainer}
        className="overflow-hidden absolute top-full left-0 right-0 bg-[#fffffe] dark:bg-dSec transition-all shadow-lg"
      >
        <ul ref={navHeight}>
          <li onClick={() => setIsOpen(false)}>
            <Link href={'/policy'}>
              <a className="block px-5 py-3 hover:bg-primary hover:text-white">
                Policy
              </a>
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link href={'/about'}>
              <a className="block px-5 py-3 hover:bg-primary hover:text-white">
                About
              </a>
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link href={'/content'}>
              <a className="block px-5 py-3 hover:bg-primary hover:text-white">
                Content
              </a>
            </Link>
          </li>
          <li className="select-none px-5 py-3 flex items-center">
            Dark Mode{' '}
            <span
              className={`ml-5 flex w-14 rounded-full p-[3px] cursor-pointer select-none items-center transition-all ${
                isDark ? 'bg-primary' : 'bg-secondary'
              }`}
              onClick={toggleDark}
            >
              <span
                ref={btnDark}
                className={`inline-block transition-all p-1 rounded-full bg-white`}
              >
                <BsMoonStarsFill
                  className={`${isDark ? 'text-primary' : 'text-secondary'}`}
                />
              </span>
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navmenu;
