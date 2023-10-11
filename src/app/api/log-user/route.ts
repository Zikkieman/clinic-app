import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { user } from "@/components/schemas/user-mongoose-schema";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const db_password = process.env.DB_Password;
const JWT_SECRET = process.env.JWT_SECRET || "";
const maxAge = 60 * 60 * 24 * 30;

export async function POST(request: Request, res: Response) {
  if (request.method !== "POST") return;
  const newUrl = "/login";

  const userData = await request.json();

  const { email, password } = userData;

  if (!email || !password || !email.includes("@") || password.length < 5) {
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
    if (!registeredUser) {
      return NextResponse.json({ message: "Incorrect Email" });
    }

    const userLogon = bcrypt.compareSync(password, registeredUser.password);

    if (userLogon) {
      const userResponse = {
        email: registeredUser.email,
        fullname: registeredUser.fullname,
      };

      const token = sign({ email }, JWT_SECRET, { expiresIn: maxAge });

      const serialized = serialize("clinicToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: maxAge,
        path: "/",
      });

      // const res = {
      //   ,
      // };

      return NextResponse.json(
        { userResponse,  "message": "Authenticated!"},
        { status: 200, headers: { "Set-Cookie": serialized } }
      );
      // redirect("/user");
    } else {
      return NextResponse.json({ message: "Incorrect Password" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Please, Try Again" });
  }
}
