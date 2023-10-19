import React from "react";
import Image from "next/image";

export default function Card(props: DoctorArr) {
  const { name, image, period1, period2, period3, expertise, profile } = props;
  return (
    <div className="shadow-sm border  max-w-md text-green-900 py-2 px-2 my-10 rounded-md">
      <div className="flex flex-row">
        <div className="img-crop">
          <Image
            className="img-width mr-5 img-crop"
            src={image}
            alt={name}
            width={500}
            height={500}
          />
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p>{expertise}</p>
        </div>
      </div>
      <p className="text-xs my-2">{profile}</p>
      <p>Next Available Slots</p>
      <div className="flex flex-row my-2">
        <div className="rounded-3xl border py-2 px-1 mx-3 text-xs">
          {period1}
        </div>
        <div className="rounded-3xl border py-2 px-2 mx-3 text-xs">
          {period2}
        </div>
        <div className="rounded-3xl border py-2 px-2 mx-3 text-xs">
          {period3}
        </div>
      </div>
    </div>
  );
}
