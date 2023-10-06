"use client";
import React, { useEffect, useState } from "react";
import { GrNotification } from "react-icons/Gr";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";

export default function Navbar() {
  const [userProfile, setUserProfile] = useState({
    userResponse: {
      email: "",
      fullname: "",
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const getUserInfo = () => {
        const userProfile = window.localStorage.getItem("userData");
        return userProfile ? JSON.parse(userProfile) : [];
      };
      const userData = getUserInfo();
      setUserProfile(userData);
    }
  }, [userProfile]);
  const router = useRouter();

  const { userResponse } = userProfile;

  // if (userResponse.message === "please try again" || !userResponse) {
  //   router.push("/login");
  // }

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
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="flex flex-row justify-between mx-10 py-5 max-md:mx-2 text-green-950">
        <div>
          <h1 className="text-2xl max-md:text-xl">Schedule Appointment</h1>
        </div>
        <div className="flex mr-10 max-md:mr-2">
          <div className="mr-10 max-sm:text-sm mt-3 max-sm:mr-5">
            <p className="">{fullname}</p>
            <p className="text-sm font-thin">{email}</p>
          </div>

          <div className="pt-3 max-md:text-sm">
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
