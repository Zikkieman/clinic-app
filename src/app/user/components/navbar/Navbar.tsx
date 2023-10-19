"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

export default function Navbar() {
  const [userProfile, setUserProfile] = useState({
    email: "",
    fullname: "",
  });

  const [icon, setIcon] = useState(false);

  const handleIcon = () => {
    setIcon(!icon);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const getUserInfo = () => {
        const userProfile = window.localStorage.getItem("userData");
        return userProfile ? JSON.parse(userProfile) : [];
      };
      const userData = getUserInfo();
      setUserProfile(userData);
    }
  }, []);
  const router = useRouter();

  const { email, fullname } = userProfile;

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
      <nav>
        <div className="flex flex-row justify-between mx-10 py-5 max-md:mx-2 text-green-950">
          <div>
            <h1 className="text-2xl max-md:text-xl">Schedule Appointment</h1>
          </div>
          <div className="flex mr-10 max-md:mr-2 max-md:hidden">
            <div className="mr-10 max-sm:text-sm mt-3 ">
              <p className="">{fullname}</p>
              <p className="text-sm font-thin">{email}</p>
            </div>

            <div className="pt-3 max-md:text-sm">
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
          <div
            className="md:hidden text-2xl border px-1 py-1 rounded-md mr-2"
            onClick={handleIcon}
          >
            {icon ? <RxCross1 /> : <GiHamburgerMenu />}
          </div>
        </div>
        {icon && (
          <div className="absolute w-full z-10 shadow-lg bg-white text-green-950 md:hidden">
            <div className="flex flex-col items-start ml-3 h-56">
              <div className="my-8">
                <p className="mb-2 text-lg">{fullname}</p>
                <p className="text-sm font-thin">{email}</p>
              </div>

              <div className="pb-5">
                <button onClick={logout}>Log Out</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
