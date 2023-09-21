import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
  name: String,
  image: String,
  post: String,
  expertise: String,
  profile: String,
  period1: String,
  period2: String,
  period3: String,
});

const doctorsSchema = new Schema({
  doctors: [doctorSchema],
});

export const Docs = mongoose.model("Doctor", doctorsSchema);
