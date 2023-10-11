"use client"
import React from "react";
import Head from "next/head";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Error</title>
      </Head>
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.293 4.293a1 1 0 011.414 0l8 8a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M4.293 11.293a1 1 0 011.414 0l8 8a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <h1 className="text-3xl text-red-500">Oops! Something went wrong</h1>
        <p className="text-gray-600 mt-2">
          We apologize for the inconvenience. Please try again later.
        </p>
      </div>
    </div>
  );
}
