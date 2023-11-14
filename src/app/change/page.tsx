"use client";

import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { changeSchema } from "@/components/schemas/yup-schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ButtonLoader from "@/components/loader/loading";

type Values = {
  newEmail: string;
  password: string;
};

type UserInfoType = {
  email: string;
  fullname: string;
};

export default function Change() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    email: "",
    fullname: "",
  });

  const setLoadingHandler = () => {
    if (
      values.newEmail.length !== 0 &&
      values.password.length !== 0 &&
      values.newEmail.includes("@") &&
      values.password.length >= 5
    ) {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const getUserInfo = () => {
        const userProfile = window.localStorage.getItem("userData");
        return userProfile ? JSON.parse(userProfile) : [];
      };
      const userData = getUserInfo();
      setUserInfo(userData);
    }
  }, []);

  const { email, fullname } = userInfo;

  const onSubmit = async (values: Values) => {
    const forgotInfo = {
      email: email,
      newEmail: values.newEmail,
      password: values.password,
    };

    try {
      const response = await fetch("/api/change-email", {
        method: "POST",
        body: JSON.stringify(forgotInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const userData = await response.json();

      const { message } = userData;

      if (
        message === "Invalid Input - fill all the fields" ||
        message === "Incorrect Email" ||
        message === "Incorrect Password" ||
        message === "Please, Try Again" ||
        message === "Email Already In Use"
      ) {
        toast(message, { position: "bottom-center", type: "error" });
        setIsLoading(false);
        return router.push("/change");
      } else if (message === "Email Updated Successfully") {
        toast(message, { position: "bottom-center", type: "success" });
        setIsLoading(false);
        return router.push("/login");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
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
          className="w-1/4 bg-green-700 text-white rounded-md py-2 login-input mt-3"
          type="submit"
          onClick={setLoadingHandler}
        >
          {isLoading ? <ButtonLoader /> : "Change Email"}
        </button>
      </form>
    </>
  );
}
