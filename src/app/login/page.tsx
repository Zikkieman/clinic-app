"use client";
import { useRouter } from "next/navigation";
import { basicSchema } from "@/components/schemas/yup-schema";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";

type Values = {
  email: string;
  password: string;
  fullname: string;
};

export default function Login() {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState<boolean>(false);

  const onSubmit = async (values: Values) => {
    const userProfile = {
      email: values.email,
      password: values.password,
      fullname: values.fullname,
    };

    const response = await fetch("/api/new-user", {
      method: "POST",
      body: JSON.stringify(userProfile),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const userData = await response.json();
    console.log(userData);
    router.push("/user");
  };

  const { handleChange, handleBlur, touched, errors, values, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        fullname: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  const setVisibility = (): void => {
    setSeePassword(!seePassword);
  };

  return (
    <>
      <form
        className="flex flex-col justify-center items-center h-400 border w-full"
        onSubmit={handleSubmit}
      >
        <div className="w-1/4 mb-6 login-input">
          <label>Full Name:</label>
          <input
            id="fullname"
            value={values.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            className={`block border-2 w-full px-2 py-2 rounded-md ${
              errors.fullname && touched.fullname && "border-red-600"
            }`}
          />
          {errors.fullname && touched.fullname && (
            <p className="mb-0">{errors.fullname}</p>
          )}
        </div>
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
            <p className="mb-0">{errors.email}</p>
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
            <p className="no-margin">{errors.password}</p>
          )}
        </div>
        <button
          className="w-1/4 bg-blue-700 text-white rounded-md py-2 login-input mt-3"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
