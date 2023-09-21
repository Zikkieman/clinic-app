import React from "react";
import Image from "next/image";

export default function Card(props: Doctor) {
  const { name, image, period1, period2, period3, expertise, profile } = props;
  return (
    <div className="shadow-lg max-w-lg text-green-900 rounded-sm py-2 px-2 mb-10">
      <div className="flex flex-row">
      <div className="img-crop"><Image loader={() => image} className="img-width mr-5 img-crop" src={image} alt="prof-pic" width={500} height={500} /></div>  
        <div>
          <h3>{name}</h3>
          <p>{expertise}</p>
        </div>
      </div>
      <p className="text-xs my-2">{profile}</p>
      <p>Next Available Slots</p>
      <div className="flex flex-row my-2">
        <div className="rounded-3xl border py-2 px-1 mx-3 text-xs">{period1}</div>
        <div className="rounded-3xl border py-2 px-2 mx-3 text-xs">{period2}</div>
        <div className="rounded-3xl border py-2 px-2 mx-3 text-xs">{period3}</div>
      </div>
    </div>
  );
}
