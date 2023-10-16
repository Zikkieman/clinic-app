import { Doctors } from "@/app/doctors";
import { Docs } from "@/components/schemas/doctors-schema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const db_password = process.env.DB_Password;

export async function GET() {
  try {
    const doctors = await Docs.insertMany(Doctors);
    return NextResponse.json({ res: doctors });
  } catch (error) {
    return NextResponse.json({ res: error });
  }

}
