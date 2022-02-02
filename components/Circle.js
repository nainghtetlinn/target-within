import React from 'react';

const Circle = ({ percent }) => {
  return (
    <div className="w-10 h-10">
      <div
        className="w-full h-full rounded-full p-[5px]"
        style={{
          background: `conic-gradient(
            ${percent === 100 ? '#2cb67d' : '#3da9fc'} ${percent * 3.6}deg,
            #90b4ce50 ${percent * 3.6}deg
          )`,
        }}
      >
        <div className="bg-white dark:bg-dPri w-full h-full rounded-full text-xs flex justify-center items-center select-none">
          {percent}%
        </div>
      </div>
    </div>
  );
};

export default Circle;
