import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { user } from "@/components/schemas/user-mongoose-schema";
import mongoose from "mongoose";
const db_password = process.env.DB_Password;

const saltRounds = 10;

export async function POST(request: Request) {
  if (request.method !== "POST") return;

  const userData = await request.json();

  console.log(userData)

  const { email, password, confirmPassword } = userData;

  if (password !== confirmPassword) {
    return NextResponse.json({ message: "Password doesn't match" });
  }

  if (
    !email ||
    !password ||
    !email.includes("@") ||
    password.length < 5 ||
    confirmPassword.length < 5
  ) {
    return NextResponse.json(
      { message: "Invalid Input - fill all the fields" },
      {
        status: 422,
      }
    );
  }

  try {
    await mongoose.connect(
      `mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/Clinic?retryWrites=true&w=majority`
    );
    const registeredUser = await user.findOne({ email: email });
    console.log(registeredUser)
    if (!registeredUser) {
      return NextResponse.json({ message: "Incorrect Email" });
    }

    const newPassword = bcrypt.hashSync(password, saltRounds);

    if (newPassword) {
      await user.findOneAndUpdate(
        { email: email },
        {
          $set: {
            password: newPassword,
          },
        }
      );

      return NextResponse.json({ message: "Password Successfully Replaced" });
    } else {
      return NextResponse.json({ message: "Kindly Try Again" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Please, Try Again" });
  }
}
