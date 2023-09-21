"use client";
import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Select from "./components/content/select-doc";

const db_password = process.env.DB_Password;

export default function User() {
  return (
    <div className="mx-20 max-md:mx-2 ">
      <Navbar /> 
      <Select />{" "}
    </div>
  );
}
