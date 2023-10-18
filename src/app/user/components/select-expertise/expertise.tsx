import React, { useContext } from "react";
import Card from "../doctors-card/card";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid'

type PropsType = {
  field: String;
};

export default function Expertise({ field, docs }: PropsType & any) {

  const filteredDoctor = docs.filter((doctor: any) => {
    return doctor.expertise === field;
  });


  return (
    <div>
      {filteredDoctor.map((doctor: any) => (
        <Link href={doctor._id} key={uuidv4()}>
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
