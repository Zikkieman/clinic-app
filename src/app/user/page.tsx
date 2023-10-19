"use client";
import React, { Suspense } from "react";
import Navbar from "./components/navbar/Navbar";
import Select from "./components/content/select-doc";
import type { Metadata } from "next";
import Loading from "./loading";

const metadata: Metadata = {
  title: "Healthy Clinic",
  description: "Health is wealth",
};

export default function User() {
  return (
    <div className="mx-20 max-md:mx-1 ">
      <Navbar />
      <Select />{" "}
    </div>
  );
}
