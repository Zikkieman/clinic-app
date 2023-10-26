import React from "react";
import Navbar from "../user/components/navbar/Navbar";
import { FaLessThan } from "react-icons/fa";
import Doctor from "./components/Doctor";
import Link from "next/link";
import mongoose from "mongoose";
import { Docs } from "@/components/schemas/doctors-schema";
import { v4 as uuidv4 } from "uuid";

const db_password = process.env.DB_Password;

type Params = {
  params: {
    _id: string;
  };
};

export async function generateMetadata({ params: { _id } }: Params) {
  const id = _id;

  await mongoose.connect(
    `mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/Clinic?retryWrites=true&w=majority`
  );

  const doctor = (await Docs.findOne({ _id: id })) as DoctorArr;

  if (!doctor) {
    return {
      title: "Page not found",
    };
  }

  return {
    title: `Dr. ${doctor.name}`,
    description: `Health is wealth`,
  };
}

export default async function Booking({ params: { _id } }: Params) {
  await mongoose.connect(
    `mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/Clinic?retryWrites=true&w=majority`
  );

  const doctor = (await Docs.findOne({ _id: _id })) as DoctorArr;

  const docArr = [doctor];

  return (
    <div className="">
      <Navbar />
      <div className="flex justify-between mx-32 max-md:mx-2 mt-10 max-md:flex-col">
        <div>
          <Link href="/user">
            <div className="flex text-green-950">
              <FaLessThan className="mr-4 mt-1" />

              <p>Go Back</p>
            </div>
          </Link>
          <div className="max-w-sm mt-10">
            <p className=" text-green-950 text-2xl">
              Confirm your appointment details
            </p>
          </div>
        </div>
        <div className="mt-32 max-md:mt-10">
          {docArr.map((doctor) => (
            <div key={uuidv4()}>
              <Doctor
                name={doctor.name}
                expertise={doctor.expertise}
                image={doctor.image}
                period1={doctor.period1}
                period2={doctor.period2}
                period3={doctor.period3}
                profile={doctor.profile}
                post={doctor.post}
                _id={doctor._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
