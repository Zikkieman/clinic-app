import React, { useContext } from "react";
import { useState } from "react";
import { Doctors } from "../../../doctors";
import Card from "../doctors-card/card";
import Link from "next/link";
import { DoctorContext } from "../../../../../context/doctor";

type PropsType = {
  field: String;
};

export default function Expertise({ field }: PropsType) {
  const { doctorArr } = useContext(DoctorContext);

  const filteredDoctor = doctorArr.filter((doctor) => {
    return doctor.expertise === field;
  });

  return (
    <div>
      {filteredDoctor.map((doctor, index) => (
        <Link href={doctor._id} key={doctor._id}>
          <div >
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
    </div>
  );
}
