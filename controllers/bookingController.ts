import { Request, Response } from 'express';
import  { BookingService }  from '../services/bookingService';
import { Booking } from '../interfaces/bookingInterface';

const bookingService = new BookingService();

export const getAllBookings = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
        const bookings: Booking[] = await bookingService.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error en getAllBookings:', error);
        res.status(500).json({ 
            message: "Error interno al obtener las reservas",
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
};

export const getBookingById = async (req: Request, res: Response): Promise<void> => {
    try {
        const booking = bookingService.getBookingById(Number(req.params.id));
        if (!booking) {
            res.status(404).json({ message: "Reserva no encontrada" });
            return;
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error('Error en getBookingById:', error);
        res.status(500).json({ 
            message: "Error interno al obtener la reserva",
            ...(process.env.NODE_ENV === 'development' && { error: error instanceof Error ? error.message : error })
        });
    }
};

export const createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const newBooking = bookingService.createBooking(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error en createBooking:', error);
        const status = error instanceof Error && error.message.includes('valid') ? 400 : 500;
        res.status(status).json({ 
            message: error instanceof Error ? error.message : "Error interno al crear la reserva",
            ...(process.env.NODE_ENV === 'development' && { error: error instanceof Error ? error.message : error })
        });
    }
};

export const updateBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedBooking = bookingService.updateBooking(Number(req.params.id), req.body);
        if (!updatedBooking) {
            res.status(404).json({ message: "Reserva no encontrada" });
            return;
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error en updateBooking:', error);
        res.status(500).json({ 
            message: "Error interno al actualizar la reserva",
            ...(process.env.NODE_ENV === 'development' && { error: error instanceof Error ? error.message : error })
        });
    }
};

export const deleteBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const isDeleted = bookingService.deleteBooking(Number(req.params.id));
        if (!isDeleted) {
            res.status(404).json({ message: "Reserva no encontrada" });
            return;
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error en deleteBooking:', error);
        res.status(500).json({ 
            message: "Error interno al eliminar la reserva",
            ...(process.env.NODE_ENV === 'development' && { error: error instanceof Error ? error.message : error })
        });
    }
};