import { Docs } from "@/components/schemas/doctors-schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const db_password = process.env.DB_Password;

export async function GET() {
  try {
    await mongoose.connect(
      `mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/Clinic?retryWrites=true&w=majority`
    );

    const doctors = await Docs.find({});
    // console.log(doctors);
    return NextResponse.json(doctors)
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ res: "Done" });
}
