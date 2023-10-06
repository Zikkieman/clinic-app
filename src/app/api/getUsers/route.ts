import mongoose from "mongoose";
import { user } from "@/components/schemas/user-mongoose-schema";
import { NextResponse } from "next/server";

const db_password = process.env.DB_Password;

export async function POST(request: Request) {

  const email = await request.json();

  console.log(email)

  if (!email) {
    return NextResponse.json("Invalid email");
  }

  try {
    await mongoose.connect(
      `mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/Clinic?retryWrites=true&w=majority`
    );

    console.log("Connected to DB");

    const res = await user.findOne({ email: email })
    // .select("email fullname");
    console.log(res);
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.json("An error occurred while processing the request");
  }

  // return NextResponse.json({ res: "Done" });
}
