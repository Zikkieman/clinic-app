"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { loginSchema } from "../../components/schemas/yup-schema";
import Link from "next/link";
import { toast } from "react-toastify";
import ButtonLoader from "@/components/loader/loading";

type Values = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = async (values: Values) => {
    const siginInfo = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch("/api/log-user", {
        method: "POST",
        body: JSON.stringify(siginInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userData = await response.json();
      const { message, userResponse } = userData;

      if (
        message === "Incorrect Email" ||
        message === "Invalid Input - fill all the fields" ||
        message === "Incorrect Password" ||
        message === "Please, Try Again"
      ) {
        toast(message, { position: "bottom-center", type: "error" });
        setIsLoading(false);
        return router.push("/login");
      } else if (message === "Authenticated!") {
        localStorage.setItem("userData", JSON.stringify(userData.userResponse));
        toast("Succesfully signed in", {
          position: "bottom-center",
          type: "success",
        });
        setIsLoading(false);
        return router.push("/user");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during login:", error);
    }
  };

  const { handleChange, handleBlur, touched, errors, values, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        fullname: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  const setVisibility = (): void => {
    setSeePassword(!seePassword);
  };

  const setLoadingHandler = () => {
    if (Object.values(errors).length === 0) {
      setIsLoading(true);
    }
  };

  return (
    <>
      <Link href="/sign-up">
        {" "}
        <div className="flex justify-end mr-32 mt-20 max-md:mr-10">
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
          <div className="flex justify-between">
            <label>Password:</label>
            <Link href="/forgot">
              <p className="text-gray-400">Forgot Password?</p>
            </Link>
          </div>

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
          className="w-1/4 bg-blue-700 text-white rounded-md py-2 login-input mt-3 text-center flex justify-center"
          type="submit"
          onClick={setLoadingHandler}
        >
          {isLoading ? <ButtonLoader /> : "Sign In"}
        </button>
      </form>
    </>
  );
}
