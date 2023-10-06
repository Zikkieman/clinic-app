import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "";

export  async function POST(req: Request) {
  try {
    const email = await req.json();

    const token = sign({ email }, JWT_SECRET, { expiresIn: -1 });

    const serialized = serialize("clinicToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    const response = {
      message: "logged out!",
    };

    return NextResponse.json(
      { message: response },
      { status: 200, headers: { "Set-Cookie": serialized } }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 401 });
  }
}
