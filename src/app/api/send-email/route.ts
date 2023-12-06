import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// import { Resend } from "resend";
// import EmailTemplate from "../../../../email/schedule";

// const resend = new Resend(process.env.RESEND_API_KEY);

const API_KEY = process.env.SEND_MAIL || "";

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

  sgMail.setApiKey(API_KEY);
  const message = {
    to: email,
    from: {
      name: "Avance Insight team",
      email: "goldenimperialswifttech@gmail.com",
    },
    text: "You recieved the following message from Healthy Clinic",
    subject: "New message From Healthy Clinic",
    html: `
            <p> Dear ${fullname}, We would like to inform you that your scheduled
            appointment with Dr. ${name} has been confirmed for the specified
            time "${time}". We kindly request your punctual arrival.</p>
            `,
  };

  try {
    const response = await sgMail.send(message);
    if (response[0].statusCode === 202) {
      return NextResponse.json({
        message: "Appointment Confirmed",
      });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
