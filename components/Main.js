import React from 'react';
import { useGlobelContext } from '../context';
import Dropdown from './Dropdown';
import SingleTarget from './SingleTarget';

const Main = () => {
  const { targets } = useGlobelContext();
  return (
    <>
      {targets.length ? (
        <main className="min-h-[92vh] w-full bg-slate-200 dark:bg-dSec  flex flex-col p-5 text-primary">
          <Dropdown />
          <section>
            {targets.map((target) => {
              return <SingleTarget key={target.id} {...target} />;
            })}
          </section>
        </main>
      ) : (
        <main className="min-h-[92vh] w-full bg-slate-200 dark:bg-dSec flex flex-col justify-center items-center text-xl p-5 text-secondary dark:text-white">
          <div>There is no target yet.</div>
        </main>
      )}
    </>
  );
};

export default Main;
