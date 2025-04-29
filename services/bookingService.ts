import { Booking } from "../interfaces/bookingInterface";
import { validateBooking } from "../validators/bookingValidator";
import fs from "fs";

const bookings: Booking[] = require("../data/bookings.json");

export class BookingService {
  private bookings: Booking[];
  private bookingsFilePath = "./data/bookings.json";

  constructor() {
    this.bookings = bookings;
  }

  private writeBookingsFile(bookings: Booking[]): void {
    fs.writeFileSync(this.bookingsFilePath, JSON.stringify(bookings, null, 2));
  }

  public getAllBookings(): Booking[] {
    return this.bookings;
  }

  public getBookingById(id: number): Booking | undefined {
    return this.bookings.find((booking) => booking.id === id);
  }

  public createBooking(bookingData: Omit<Booking, "id">): Booking {
    validateBooking({ id: 0, ...bookingData });

    const newId = 
      this.bookings.length > 0 
        ? Math.max(...this.bookings.map(b => b.id)) + 1 
        : 1;

    const newBooking: Booking = { 
      id: newId, 
      ...bookingData,
      special: bookingData.special || null,
      photo: bookingData.photo || []
    };

    this.bookings.push(newBooking);
    this.writeBookingsFile(this.bookings);

    return newBooking;
  }

  public updateBooking(id: number, bookingData: Partial<Omit<Booking, "id">>): Booking {
    const bookingIndex = this.bookings.findIndex((booking) => booking.id === id);

    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }

    if (bookingData.roomType || bookingData.bookStatus || bookingData.checkIn || bookingData.checkOut) {
      validateBooking({
        ...this.bookings[bookingIndex],
        ...bookingData,
        id: this.bookings[bookingIndex].id
      });
    }

    const updatedBooking: Booking = { 
      ...this.bookings[bookingIndex], 
      ...bookingData 
    };

    this.bookings[bookingIndex] = updatedBooking;
    this.writeBookingsFile(this.bookings);

    return updatedBooking;
  }

  public deleteBooking(id: number): Booking {
    const bookingIndex = this.bookings.findIndex((booking) => booking.id === id);

    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }

    const [deletedBooking] = this.bookings.splice(bookingIndex, 1);
    this.writeBookingsFile(this.bookings);

    return deletedBooking;
  }
}