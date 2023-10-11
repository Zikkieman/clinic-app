"use client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserInfoType = {
  email: string;
  fullname: string;
};

export default function Doctor(props: DoctorArr) {
  const router = useRouter();
  const [time, setTime] = useState("");
  const [check, setCheck] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    email: "",
    fullname: "",
  });
  const { name, expertise, image, period1, period2, period3, _id } = props;

  const handleTime = (event: ChangeEvent): void => {
    event.preventDefault();
    setTime((event.target as HTMLInputElement).value);
  };

  const handleCheck = () => {
    setCheck(!check);
  };

  const getUserEmail = () => {
    const userEmail = localStorage.getItem("userData");
    return userEmail ? JSON.parse(userEmail) : [];
  };

  useEffect(() => {
    const patEmail = getUserEmail();
    setUserInfo(patEmail);
  }, []);

  if (!userInfo) {
    router.push("/login");
  }

  const { email, fullname } = userInfo;


  const handleResendEmail = async () => {
    const emailBody = {
      email: email,
      time: time,
      name: name,
      fullname: fullname,
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailBody),
      });

      const sentEmail = await response.json();

      console.log(sentEmail.message);

      // if (response.ok) {
      //   console.log("Email resent successfully");
      // } else {
      //   console.error("Failed to resend email");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="shadow-lg doctors-card text-green-900 rounded-sm py-1 px-1 mb-10">
        <div className="flex flex-row m-3">
          <div className="img-crop">
            <Image
              className="img-width mr-5 img-crop"
              src={image}
              alt={name}
              width={500}
              height={500}
              priority
            />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p>{expertise}</p>
          </div>
        </div>
        <div className="m-3 max-md:text-sm">
          <table>
            <tbody>
              <tr>
                <td className="pr-10 pb-2">Duration:</td>
                <td className="pb-2">30 minutes</td>
              </tr>
              <tr>
                <td className="">Reminder:</td>
                <td>
                  {email}{" "}
                  <Link href="/change">
                    <span className="ml-4 text-md text-green-700">Change</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          <select name="" id="" className="mt-3 w-52" onChange={handleTime}>
            <option value={time}>Time:</option>
            <option value={period1}>{period1}</option>
            <option value={period2}>{period2}</option>
            <option value={period3}>{period3}</option>
          </select>
        </div>
      </div>

      <div className="flex mb-4">
        <input
          type="checkbox"
          name=""
          id=""
          className="mr-3 bg-green-900"
          onClick={handleCheck}
        />
        <p className="text-green-950 text-sm">
          I certify that I have read and accept the{" "}
          <span className="text-green-800">terms</span> of Temple
        </p>
      </div>
      <button
        disabled={check}
        className="block bg-green-900 rounded-3xl text-white text-xs py-3 px-4 schedule"
        onClick={handleResendEmail}
      >
        Schedule Appointment
      </button>
    </div>
  );
}
