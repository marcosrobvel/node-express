import { Schema, model } from 'mongoose';
import { Booking } from '../interfaces/bookingInterface';

const bookingSchema = new Schema<Booking>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    guest: {
      type: String,
      required: true,
    },
    orderDate: {
      type: String,
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    special: {
      type: String,
      default: null,
    },
    roomType: {
      type: String,
      enum: ['Single Bed', 'Double Bed', 'Suite', 'Deluxe Suite'],
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    bookStatus: {
      type: String,
      enum: ['in', 'out', 'progress'],
      required: true,
    },
    photo: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Booking>("Booking", bookingSchema);
