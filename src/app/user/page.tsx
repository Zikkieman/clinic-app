"use client";
import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Select from "./components/content/select-doc";

export default function User() {
  return (
    <div className="mx-20 max-md:mx-1 ">
      <Navbar />
      <Select />{" "}
    </div>
  );
}
