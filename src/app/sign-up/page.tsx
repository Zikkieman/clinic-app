"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { basicSchema } from "../../components/schemas/yup-schema";
import Link from "next/link";
import { toast } from "react-toastify";
import ButtonLoader from "@/components/loader/loading";

type Values = {
  email: string;
  password: string;
  fullname: string;
};

export default function Login() {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const setLoadingHandler = () => {
    if (
      values.email.length !== 0 &&
      values.password.length !== 0 &&
      values.email.includes("@") &&
      values.password.length >= 5 &&
      values.fullname.length !== 0
    ) {
      setIsLoading(true);
    }
  };

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

    const { message } = await response.json();

    if (
      message === "Email Already In Use" ||
      message === "Invalid Input - fill all the fields" ||
      message === "Please, Try Again"
    ) {
      toast(message, { position: "bottom-center", type: "error" });
      setIsLoading(false);
      return router.push("/sign-up");
    } else if (message === "Successfully Registered") {
      toast(message, {
        position: "bottom-center",
        type: "success",
      });
      setIsLoading(false);
      return router.push("/login");
    }

    router.push("/login");
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
      <Link href="/login">
        {" "}
        <div className="flex justify-end mr-32 mt-12 max-md:mr-10">
          <button className="border-2 py-2 px-2 border-green-900 rounded-2xl">
            Sign In
          </button>
        </div>
      </Link>
      <form
        className="flex flex-col justify-center items-center h-400 w-full"
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
            <p className="mb-0 text-red-600">{errors.fullname}</p>
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
        <button
          className="w-1/4 flex justify-center bg-green-700 text-white rounded-md py-2 login-input mt-3"
          type="submit"
          onClick={setLoadingHandler}
        >
          {isLoading ? <ButtonLoader /> : "Sign Up"}
        </button>
      </form>
    </>
  );
}
