"use client";

import { createContext, ReactNode, useState } from "react";

type UserObj = {
  email: string;
  fullname: string;
};

type ChildrenProps = {
  children: ReactNode;
};

type UserContextType = {
  email: string;
  fullname: string;
  getUser: (email: string) => void;
};

const initContextState = {
  email: "",
  fullname: "",
  getUser: () => {},
};

const initState: UserObj = {
  email: "",
  fullname: "",
};

export const UserContext = createContext<UserContextType>(initContextState);

const UserProvider = ({ children }: ChildrenProps) => {
  const [currentUser, setCurrentUser] = useState<UserObj>(initState);

  const getUser = async (email: string) => {
    const response = await fetch("/api/getUsers", {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user: UserObj = await response.json();
    console.log(user)
    setCurrentUser(user);
  };

  const value: UserContextType = {
    email: currentUser.email,
    fullname: currentUser.fullname,
    getUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
