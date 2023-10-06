"use client";

import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { changeSchema } from "@/components/schemas/yup-schema";
import {useRouter} from "next/navigation"


type Values = {
  newEmail: string;
  password: string;
};

type UserInfoType = {
  email: string;
  fullname: string;
};

export default function Change() {
  const router = useRouter()
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    email: "",
    fullname: "",
  });

  const getUserEmail = () => {
    const userEmail = localStorage.getItem("userData");
    return userEmail ? JSON.parse(userEmail) : [];
  };

  useEffect(() => {
    const patEmail = getUserEmail();
    setUserInfo(patEmail);
  }, []);

const {email, fullname} = userInfo

// console.log(email, fullname)

  const onSubmit = async (values: Values) => {
    const forgotInfo = {
      email: email,
      newEmail: values.newEmail,
      password: values.password,
    };

    console.log(forgotInfo);

    try {
      const response = await fetch("/api/change-email", {
        method: "POST",
        body: JSON.stringify(forgotInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userData = await response.json();

      console.log(userData)


        router.push("/login");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const { handleChange, handleBlur, touched, errors, values, handleSubmit } =
    useFormik({
      initialValues: {
        email: email,
        newEmail: "",
        password: "",
      },
      validationSchema: changeSchema,
      onSubmit,
    });

  const setVisibility = (): void => {
    setSeePassword(!seePassword);
  };
  return (
    <>
      <form
        className="flex flex-col justify-center items-center h-400 w-full"
        onSubmit={handleSubmit}
      >
        <div className="w-1/4 mb-6 login-input">
          <label>Old Email:</label>
          <input
            id="oldEmail"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className={`block border-2 w-full px-2 py-2 rounded-md `}
          />
          
        </div>
        <div className="w-1/4 mb-6 login-input">
          <label>New Email:</label>
          <input
            id="newEmail"
            value={values.newEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className={`block border-2 w-full px-2 py-2 rounded-md ${
              errors.newEmail && touched.newEmail && "border-red-600"
            }`}
          />
          {errors.newEmail && touched.newEmail && (
            <p className="mb-0 text-red-600">{errors.newEmail}</p>
          )}
        </div>
        <div className="w-1/4 login-input">
          <label>Password:</label>
          <input
            id="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={seePassword ? "text" : "password"}
            className={`block w-full border-2 mb-0 px-2 py-2 rounded-md ${
              errors.password && touched.password && "border-red-600"
            }`}
          />
          {
            <AiOutlineEyeInvisible
              className="text-2xl visiblity"
              onClick={setVisibility}
            />
          }

          {errors.password && touched.password && (
            <p className="no-margin text-red-600">{errors.password}</p>
          )}
        </div>
        <button
          className="w-1/4 bg-blue-700 text-white rounded-md py-2 login-input mt-3"
          type="submit"
        >
          Change Email
        </button>
      </form>
    </>
  );
}
