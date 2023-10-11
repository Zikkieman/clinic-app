"use client";
import React, { ChangeEvent, useContext } from "react";
import { useState } from "react";
import Card from "../doctors-card/card";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import Expertise from "../select-expertise/expertise";
import { DoctorContext } from "../../../../../context/doctor";

type DoctorProps = {
  doctors: [];
};

export default function Select() {
  const [currentPage, setCurrentPage] = useState(0);
  const [expertise, setExpertise] = useState("Select Expertise");

  const { doctorArr } = useContext(DoctorContext);
  const next = () => {
    if (currentPage === 2) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const previous = () => {
    if (currentPage === 0) {
      setCurrentPage(currentPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderCards = doctorArr.slice(currentPage * 3, (currentPage + 1) * 3);

  const submit = (event: ChangeEvent) => {
    event.preventDefault();
    setExpertise((event.target as HTMLInputElement).value);
  };

  return (
    <div className="flex justify-between mx-10 max-md:mx-2 my-2 max-lg:flex-col">
      <div className="text-green-950">
        <Link href="/login">
          <div className="flex text-green-950 mb-10">
            <FaLessThan className="mr-4 mt-1" />

            <p>Go Back</p>
          </div>
        </Link>
        <div className="max-w-sm">
          <p className="text-2xl">Select your doctor and appointment time</p>
        </div>
      </div>
      <div className="mt-10">
        <label className="block mb-2 max-sm:hidden">Expertise</label>
        <select
          className="py-2 mb-2 border-2 border-green-950 focus:border-green-950 rounded-md"
          onChange={submit}
        >
          <option>Select Expertise</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Family Medicine">Family Medicine</option>
          <option value="Neurosurgery">Neurosurgery</option>
          <option value="Neurology">Neurology</option>
          <option value="Dentistry">Dentistry</option>
        </select>
        <Expertise field={expertise} />

        <div>
          {expertise === "Select Expertise" ? (
            <>
              {renderCards.map((doctor: DoctorArr) => (
                <Link href={doctor._id} key={uuidv4()}>
                  <div>
                    <Card
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
                </Link>
              ))}
            </>
          ) : (
            <></>
          )}

          <div className="control-div">
            <button onClick={previous} className="text-green-950 mr-5">
              <FaLessThan />
            </button>
            <button onClick={next} className="text-green-950">
              <FaGreaterThan />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
