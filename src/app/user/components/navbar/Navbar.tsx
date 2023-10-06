"use client";
import React, { useEffect } from "react";
import { GrNotification } from "react-icons/Gr";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

export default function Navbar() {
  const router = useRouter();
  const getUserInfo = () => {
    const userProfile = localStorage.getItem("userData");
    return userProfile ? JSON.parse(userProfile) : [];
  };

  const userData = getUserInfo();

  const { userResponse } = userData;
  if (userResponse.message === "please try again" || !userResponse) {
    router.push("/login");
  }

  const { email, fullname } = userResponse;

  const logout = async () => {
    try {
      const response = fetch("/api/logout", {
        method: "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = (await response).json();
      router.push("/")

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="flex flex-row justify-between mx-10 py-5 max-md:mx-2 text-green-950">
        <div>
          <h1 className="text-2xl ">Schedule Appointment</h1>
        </div>
        <div className="flex mr-10 max-md:mr-2">
          <div className="mr-10">
            <p className="">{fullname}</p>
            <p className="text-sm font-thin">{email}</p>
          </div>

          <div className="pt-3">
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
