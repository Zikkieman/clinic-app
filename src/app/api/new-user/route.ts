import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { user } from "@/components/schemas/user-mongoose-schema";

const saltRounds = 10;

const db_password = process.env.DB_Password;

export async function POST(request: Request) {
  if (request.method !== "POST") return;

  const userData = await request.json();

  const { email, password, fullname } = userData;

  if (!email || !password || !email.includes("@") || password.length < 5) {
    return NextResponse.json(
      { message: "Invalid Input - fill all the fields" },
      {
        status: 422,
      }
    );
  }

  try {
    const registeredUser = await user.findOne({ email: email });
    if (registeredUser) {
      return NextResponse.json({ message: "Email Already In Use" });
    }
    const createPassword = bcrypt.hashSync(password, saltRounds);

    if (createPassword) {
      const newUser = await new user({
        email: email,
        password: createPassword,
        fullname: fullname,
        date: new Date().toLocaleString().toString(),
      });

      await newUser.save();
      return NextResponse.json({ message: "Successfully Registered" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Please, Try Again" });
  }
}
