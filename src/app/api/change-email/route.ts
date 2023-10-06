import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { user } from "@/components/schemas/user-mongoose-schema";

const saltRounds = 10;

const db_password = process.env.DB_Password;

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

  try {
    const registeredUser = await user.findOne({ email: email });
    if (!registeredUser) {
      return NextResponse.json({ message: "Incorrect Email" });
    }
    const userLogon = bcrypt.compareSync(password, registeredUser.password);
    console.log("userLong", userLogon);
    if (userLogon) {
      const changeEmail = await user
        .findOneAndUpdate(
          { email: email },
          {
            $set: {
              email: newEmail,
            },
          }
        )
        // .then(() => console.log("Successfully Replaced"));

      const getEmail = await user.findOne({ email: newEmail });
      const newUserInfo = {
        newUserEmail: getEmail.email,
        newUserFullname: getEmail.fullname,
      };

    //   const getUserEmail = () => {
    //     localStorage.setItem("userData", JSON.stringify(newUserInfo));
    //     const userProfile = localStorage.getItem("userData");
    //     return userProfile ? JSON.parse(userProfile) : [];
    //   };
    //   await getUserEmail();
      return NextResponse.json(newUserInfo);
    } else {
      return NextResponse.json({ message: "Incorrect Password" });
    }
  } catch (error) {
    return NextResponse.json({ message: "Please, Try Again" });
  }
}
