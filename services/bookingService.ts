import { Booking } from '../interfaces/bookingInterface';
import pool from '../database/mongoConnection';

export class BookingService {
  public async getAllBookings(): Promise<Booking[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM bookings'
    );
    return rows as Booking[];
  }

  public async getBookingById(id: number): Promise<Booking | null> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM bookings WHERE id = ?',
      [id]
    );
    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as Booking) : null;
  }

  public async createBooking(bookingData: Omit<Booking, 'id'>): Promise<Booking> {
    const { guest, orderDate, checkIn, checkOut, special, roomType, roomNumber, bookStatus, photo } = bookingData;
    const [result] = await pool.execute(
      'INSERT INTO bookings (guest, orderDate, checkIn, checkOut, special, roomType, roomNumber, bookStatus, photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [guest, orderDate, checkIn, checkOut, special, roomType, roomNumber, bookStatus, photo.join(',')]
    );
    return {
      ...bookingData,
      id: (result as any).insertId,
    };
  }

  public async updateBooking(id: number, bookingData: Partial<Omit<Booking, 'id'>>): Promise<Booking | null> {
    const { guest, orderDate, checkIn, checkOut, special, roomType, roomNumber, bookStatus, photo } = bookingData;
    const [result] = await pool.execute(
      'UPDATE bookings SET guest = ?, orderDate = ?, checkIn = ?, checkOut = ?, special = ?, roomType = ?, roomNumber = ?, bookStatus = ?, photo = ? WHERE id = ?',
      [
        guest, orderDate, checkIn, checkOut, special, roomType, roomNumber, bookStatus, photo ? photo.join(',') : undefined, id
      ]
    );

    const updateResult = result as import('mysql2').ResultSetHeader;
    if (updateResult.affectedRows === 0) return null;

    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM bookings WHERE id = ?',
      [id]
    );

    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as Booking) : null;
  }

  public async deleteBooking(id: number): Promise<Booking | null> {
    const [result] = await pool.execute(
      'DELETE FROM bookings WHERE id = ?',
      [id]
    );

    if ((result as import('mysql2').ResultSetHeader).affectedRows === 0) return null;

    return { id } as Booking;
  }
}




/*import { Booking } from "../interfaces/bookingInterface";
import { validateBooking } from "../validators/bookingValidator";
import BookingModel from "../schemas/bookingSchema";

export class BookingService {
  public async getAllBookings(): Promise<Booking[]> {
    const bookings = await BookingModel.find().lean<Booking[]>();
    return bookings.map((booking: Booking) => ({
      ...booking,
      id: Number(booking.id),
      special: booking.special || null,
      photo: booking.photo || [],
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
*/