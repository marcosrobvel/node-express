import { Booking } from "../interfaces/bookingInterface";
import { validateBooking } from "../validators/bookingValidator";
import BookingModel from "../schemas/bookingSchema";


export class BookingService {
  public async getAllBookings(): Promise<Booking[]> {
    const bookings = await BookingModel.find();

    return bookings.map((booking) => ({
      ...booking.toObject(),
      id: Number(booking.id || booking._id),
      special: booking.special ?? null,
      photo: booking.photo ?? [],
      guest: booking.guest ?? "",
      orderDate: booking.orderDate ?? "",
      checkIn: booking.checkIn ?? "",
      checkOut: booking.checkOut ?? "",
      roomType: booking.roomType ?? "Single Bed",
      roomNumber: booking.roomNumber ?? 0,
      bookStatus: booking.bookStatus ?? "in",
    }));
  }

  public async getBookingById(id: number): Promise<Booking | null> {
    const booking = await BookingModel.findOne({ id }).lean();
    return booking
      ? {
          ...booking,
          id: Number(booking.id),
          special: booking.special || null,
          photo: booking.photo || [],
        }
      : null;
  }

  public async createBooking(
    bookingData: Omit<Booking, "id">
  ): Promise<Booking> {
    validateBooking({ id: 0, ...bookingData });

    const lastBooking = await BookingModel.findOne().sort({ id: -1 }).limit(1);
    const newId = lastBooking ? Number(lastBooking.id) + 1 : 1;

    const newBooking = new BookingModel({
      ...bookingData,
      id: newId,
      special: bookingData.special || null,
      photo: bookingData.photo || [],
    });

    const savedBooking = await newBooking.save();
    return {
      ...savedBooking.toObject(),
      id: Number(savedBooking.id),
    };
  }

  public async updateBooking(
    id: number,
    bookingData: Partial<Omit<Booking, "id">>
  ): Promise<Booking> {
    const existingBooking = await BookingModel.findOne({ id }).lean();
    if (!existingBooking) throw new Error("Booking not found");

    if (
      bookingData.roomType ||
      bookingData.bookStatus ||
      bookingData.checkIn ||
      bookingData.checkOut
    ) {
      validateBooking({
        ...existingBooking,
        ...bookingData,
        id: existingBooking.id,
      });
    }

    const updatedBooking = await BookingModel.findOneAndUpdate(
      { id },
      bookingData,
      { new: true }
    ).lean();

    if (!updatedBooking) throw new Error("Booking not found");

    return {
      ...updatedBooking,
      id: Number(updatedBooking.id),
    };
  }

  public async deleteBooking(id: number): Promise<Booking> {
    const deletedBooking = await BookingModel.findOneAndDelete({ id }).lean();

    if (!deletedBooking) throw new Error("Booking not found");

    return {
      ...deletedBooking,
      id: Number(deletedBooking.id),
    };
  }
}
