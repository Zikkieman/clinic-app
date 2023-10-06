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
    bcrypt.hash(password, saltRounds, async function (err, hash) {
    //   const client =
    //     await mongoose.connect(`mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/Clinic?retryWrites=true&w=majority
    // `);

      console.log("Connected to the database");

      const newUser = await new user({
        email: email,
        password: hash,
        fullname: fullname,
        date: new Date().toLocaleString().toString(),
      });

      await newUser.save();
      // mongoose.connection.close()


      return NextResponse.json({
        post: newUser,
        message: "Backend received",
      });
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: "Saved" });
}
