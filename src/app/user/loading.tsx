import React from 'react';
import Head from 'next/head';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-12 w-12 text-green-950"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.37V12H0v6.37A8 8 0 0012 24V20h-4z"
          ></path>
        </svg>
        <p className="text-green-950 mt-2 text-lg">Loading...</p>
      </div>
    </div>
  );
};