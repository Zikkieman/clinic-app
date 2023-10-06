import { verify } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "";


export default function middleware() {

    const cookieStore = cookies();
    const token = cookieStore.get("clinicToken");

    console.log("token:", token)
  
    if (!token) {
      redirect("/")
    }
  
    try {
      verify(token.value, JWT_SECRET);
      return NextResponse.json({ message: "Successful" });
    } catch (error) {
      return NextResponse.json({ message: error });
    }
}