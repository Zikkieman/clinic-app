// import { Docs } from "@/components/schemas/doctors-schema";
// import mongoose from "mongoose";
// // import { NextResponse } from "next/server";
// const db_password = process.env.DB_Password;

// export async function getDocs() {
//   try {
//     await mongoose.connect(
//       `mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/Clinic?retryWrites=true&w=majority`
//     );

//     const doctors = await Docs.find({});

//     return doctors;
//     console.log(doctors);
//   } catch (error) {
//     console.log(error);
//   }
//   //   return NextResponse.json({ res: "Done" });
// }
