import React, { useEffect } from 'react';

const Noti = ({ type, message, removeNoti }) => {
  useEffect(() => {
    const timout = setTimeout(() => {
      removeNoti();
    }, 3000);
    return () => clearTimeout(timout);
  }, []);
  return (
    <section
      className={`absolute left-1/2 bottom-5 translate-x-[-50%] bg-white dark:bg-dPri/40 p-3 rounded font-semibold text-lg text-${type}`}
    >
      {message}
    </section>
  );
};

export default Noti;
