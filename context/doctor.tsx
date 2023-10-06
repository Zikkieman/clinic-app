"use client";

import { createContext, useEffect, useState, ReactNode } from 'react';

type Doctor = {
  _id: string;
  name: string;
  image: string,
  post: string,
  expertise: string;
  profile: string;
  period1: string;
  period2: string;
  period3: string;
}

type DoctorContextType = {
  doctorArr: Doctor[];
}

type ChildrenProps = {
  children: ReactNode;
}

const initContextState: DoctorContextType = {
    doctorArr: []
  };

export const DoctorContext = createContext<DoctorContextType>(initContextState);

const DoctorProvider = ({ children }: ChildrenProps) => {
  const [doctorArr, setDoctorArr] = useState<Doctor[]>([]);

  const getDocs = async () => {
    try {
      const response = await fetch("/api/getDocs");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const doctors = await response.json();
      setDoctorArr(doctors);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDocs();
  }, []);

  const value = { doctorArr };

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorProvider;

