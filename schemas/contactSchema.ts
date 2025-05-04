import { Schema, model } from "mongoose";
import { Contact } from "../interfaces/contactInterface";

const contactSchema = new Schema<Contact>(
  {
    photo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["", "archived"],
      required: true,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Contact>("Contact", contactSchema);
