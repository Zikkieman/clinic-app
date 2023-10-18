import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "../../../../email/schedule";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();

  const { name, fullname, time, email } = body;

  if (time === "") {
    return NextResponse.json({ message: "Kindly select a time" });
  } else if (!name || !fullname || !email) {
    return NextResponse.json({
      message: "There is an error creating an appointment, Kindly login again",
    });
  }

 try {
    await resend.emails.send({
      from: "Healthy Clinic <onboarding@resend.dev>",
      // to: [email],
      to: "horlarmeydeileh50@gmail.com",
      reply_to: "horlarmeydeileh50@gmail.com",
      subject: "Message from clinic app",
      react: EmailTemplate({
        name: name,
        fullname: fullname,
        time: time,
      }),
    });

    return NextResponse.json({
      message: "Appointment Confirmed",
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
