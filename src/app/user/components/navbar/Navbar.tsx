import React from "react";
import { GrNotification } from "react-icons/Gr";

export default function Navbar() {
  return (
    <div>
      <nav className="flex flex-row justify-between mx-10 py-9 max-md:mx-2 text-green-950">
        <div>
          <h1 className="text-2xl ">Schedule Appointment</h1>
        </div>
        <div className="flex mr-10 max-md:mr-2">
         <div className="pt-3">
         <GrNotification className="mr-10" />
         </div>
        <div>
          <p>Fullname</p>
          <p>Email</p>
        </div>
        </div>
      </nav>
    </div>
  );
}
