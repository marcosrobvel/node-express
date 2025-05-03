import { Schema, model } from "mongoose";
import { Room } from "../interfaces/roomInterface";

const roomSchema = new Schema<Room>(
  {
    photo: {
      type: [String],
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offer_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Room>("Room", roomSchema);
