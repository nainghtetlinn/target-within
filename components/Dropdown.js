import React, { useState, useEffect, useRef } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { useGlobelContext } from '../context';

const Dropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const {
    sortByNewest,
    sortByOldest,
    sortByNearDeadline,
    sortByIncomplete,
    sortType,
  } = useGlobelContext();

  const toggleDropdown = (e) => {
    setOpenDropdown(!openDropdown);
  };

  const dropDown = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (!dropDown.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  return (
    <section ref={dropDown} className="flex justify-end relative rounded-md">
      <article
        className="flex items-center text-base cursor-pointer select-none p-1 bg-white dark:bg-dPri text-primary dark:text-white rounded-md shadow"
        onClick={toggleDropdown}
      >
        <BsFilterLeft className="mr-1 text-3xl" />
        {sortType}
      </article>
      <article
        className={`dropDown z-10 flex flex-col items-stretch bg-primary absolute top-[120%] right-0 rounded-md shadow-[#094067] shadow-md overflow-hidden ${
          openDropdown ? 'visible' : 'invisible'
        }`}
      >
        <button
          onClick={() => {
            sortByNewest();
          }}
        >
          Newest tasks
        </button>
        <button
          onClick={() => {
            sortByOldest();
          }}
        >
          Oldest tasks
        </button>
        <button
          onClick={() => {
            sortByNearDeadline();
          }}
        >
          Near deadline
        </button>
        <button
          onClick={() => {
            sortByIncomplete();
          }}
        >
          Incomplete
        </button>
      </article>
    </section>
  );
};

export default Dropdown;
