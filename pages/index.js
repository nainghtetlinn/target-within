import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { useGlobelContext } from '../context';
import Dropdown from '../components/Dropdown';
import SingleTarget from '../components/SingleTarget';

export default function Home() {
  console.log('home rendered');
  const { targets } = useGlobelContext();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
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
}
