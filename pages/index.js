import React from 'react';
import Head from 'next/head';

import Main from '../components/Main';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Main />
    </>
  );
}
