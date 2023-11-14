import React from 'react';
import Head from 'next/head';

export default function Loading() {
  return (
   < div className="min-h-screen flex items-center justify-center">
    <Head>
      <title>Loading...</title>
    </Head>
    <div className="flex items-center flex-col">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-950"></div>
      <p className="text-green-950 ml-2 text-lg">Loading...</p>
    </div>
  </div>
  );
};