import React from "react";
import Card from "../doctors-card/card";
import { Doctors } from "@/app/doctors";
import { useRef } from "react";

export default function Select() {
  const submit = (event: any):void => {
    event.preventDefault();
    const expertise = (event.target as HTMLInputElement).value;

    console.log(expertise);
  };
  return (
    <div className="flex justify-between mx-10 max-md:mx-2 my-5 max-lg:flex-col">
      <div className="text-green-950">
        <p className="mb-7">Go Back</p>
        <div className="max-w-sm">
          <p className="text-2xl">Select your doctor and appointment time</p>
        </div>
      </div>
      <div className="mt-10">
        <label className="block mb-2 max-sm:hidden">Expertise</label>
        <select
          className="py-2 mb-2 border-2 border-blue-700 rounded-md"
          onChange={submit}
        >
          <option value="" selected className="">
            Select Expertise
          </option>
          <option value="Cardiology">Cardiology</option>
          <option value="Family Medicine">Family Medicine</option>
          <option value="Neurosurgery">Neurosurgery</option>
          <option value="Neurology">Neurology</option>
        </select>

        <div>
          {Doctors.map((doctor, index) => (
            <div key={index}>
              <Card
                name={doctor.name}
                expertise={doctor.expertise}
                image={doctor.image}
                period1={doctor.period1}
                period2={doctor.period2}
                period3={doctor.period3}
                profile={doctor.profile}
                post={doctor.post}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
