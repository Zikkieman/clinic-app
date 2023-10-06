"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { forgotSchema } from "../../components/schemas/yup-schema";
import Link from "next/link";

type Values = {
  email: string;
  password: string;
  confirmPassword: string;
};


export default function Forgot() {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState<boolean>(false);
 

  const onSubmit = async (values: Values) => {
    const siginInfo = {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    console.log(siginInfo)

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        body: JSON.stringify(siginInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userData = await response.json();
      // res.setHeader('Location', targetUrl);
      // router.push("/login");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const { handleChange, handleBlur, touched, errors, values, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: forgotSchema,
      onSubmit,
    });

  const setVisibility = (): void => {
    setSeePassword(!seePassword);
  };


  return (
    <>
      <Link href="/sign-up">
        {" "}
        <div className="flex justify-end mr-32 mt-20">
          <button className="border-2 py-2 px-2 border-green-900 rounded-2xl">
            Sign Up
          </button>
        </div>
      </Link>
      <form
        className="flex flex-col justify-center items-center h-400  w-full"
        onSubmit={handleSubmit}
      >
        <div className="w-1/4 mb-6 login-input">
          <label>Email:</label>
          <input
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className={`block border-2 w-full px-2 py-2 rounded-md ${
              errors.email && touched.email && "border-red-600"
            }`}
          />
          {errors.email && touched.email && (
            <p className="mb-0 text-red-600">{errors.email}</p>
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

        <div className="w-1/4 login-input">
          <label>Confirm Password:</label>

          <input
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            type={seePassword ? "text" : "password"}
            className={`block w-full border-2 mb-0 px-2 py-2 rounded-md ${
              errors.confirmPassword &&
              touched.confirmPassword &&
              "border-red-600"
            }`}
          />
          {
            <AiOutlineEyeInvisible
              className="text-2xl visiblity"
              onClick={setVisibility}
            />
          }
    
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="no-margin text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
        <button
          className="w-1/4 bg-blue-700 text-white rounded-md py-2 login-input mt-3"
          type="submit"
        >
          Change Password
        </button>
      </form>
    </>
  );
}
