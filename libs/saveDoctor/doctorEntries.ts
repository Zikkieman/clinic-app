import {Doctors} from "../../src/app/doctors"
import { Docs } from "@/components/schemas/doctors-schema";
import mongoose from "mongoose";
const db_password = process.env.DB_Password;

export default async function entry() {
  try {
    await mongoose.connect(`mongodb+srv://exxcelservicess:${db_password}@cluster0.qxcsr2b.mongodb.net/Clinic?retryWrites=true&w=majority
    `);

    const doctors = new Docs({ Doctors});

    await doctors.save().then(() => {
      console.log("Documents successfully saved");
    });
  } catch (error) {
    console.log(error)
  }
}
