import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },

  fullname: {
    type: String,
  },

  password: {
    type: String,
  },

  date: Date,
});

export const user = mongoose.models.user ?? mongoose.model("user", userSchema);
