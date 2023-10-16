import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { user } from "@/components/schemas/user-mongoose-schema";

export async function POST(request: Request) {
  if (request.method !== "POST") return;

  const userData = await request.json();

  const { email, newEmail, password } = userData;
  if (
    !email ||
    !password ||
    !email.includes("@") ||
    !newEmail.includes("@") ||
    password.length < 5
  ) {
    return NextResponse.json(
      { message: "Invalid Input - fill all the fields" },
      {
        status: 422,
      }
    );
  }

  if (email === newEmail) {
    return NextResponse.json({ message: "Email Already In Use" });
  }

  try {
    const registeredUser = await user.findOne({ email: email });
    if (!registeredUser) {
      return NextResponse.json({ message: "Incorrect Email" });
    }
    const userLogon = bcrypt.compareSync(password, registeredUser.password);
    console.log("userLong", userLogon);
    if (userLogon) {
      const changeEmail = await user.findOneAndUpdate(
        { email: email },
        {
          $set: {
            email: newEmail,
          },
        }
      );

      // const getEmail = await user.findOne({ email: newEmail });

      return NextResponse.json({ message: "Email Updated Successfully" });
    } else {
      return NextResponse.json({ message: "Incorrect Password" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Please, Try Again" });
  }
}
