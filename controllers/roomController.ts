import { Request, Response } from 'express';
import { RoomService } from '../services/roomService';
import { Room } from '../interfaces/roomInterface';

const roomService = new RoomService();

export const getRooms = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const rooms: Room[] = await roomService.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error en getRooms:', error);
    res.status(500).json({ 
      message: "Error interno al obtener las habitaciones",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }

};

export const getRoomById = async (req: Request, res: Response) => {
  const roomId = req.params.id;
  
  if (!roomId) {
    return res.status(400).json({ message: "ID de habitación no proporcionado" });
  }

  try {
    const room : Room | undefined = await roomService.getRoomById(Number(roomId));
    if (room) {
      return res.status(200).json(room);
    } else {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }
  } catch (error) {
    console.error(`Error en getRoomById para ID ${roomId}:`, error);
    return res.status(500).json({ 
      message: "Error interno al obtener la habitación",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const createRoom = async (req: Request, res: Response) => {
  const roomData: Partial<Room> = req.body;
  
  if (!roomData.roomNumber || !roomData.roomType) {
    return res.status(400).json({ 
      message: "Datos incompletos: roomNumber y roomType son requeridos" 
    });
  }

  try {
    const newRoom: Room = await roomService.createRoom(roomData as Omit<Room, 'id'>);
    return res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error en createRoom:', error);

    if (error instanceof Error) {
      const statusCode = error.name === 'ValidationError' ? 400 : 500;
      return res.status(statusCode).json({ 
        message: error.name === 'ValidationError' 
          ? error.message 
          : "Error interno al crear la habitación",
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    } else {
      return res.status(500).json({ 
        message: "Error interno al crear la habitación",
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  const roomData = req.body;

  if (!roomData.roomNumber || !roomData.roomType) {
    return res.status(400).json({ 
      message: "Datos incompletos: roomNumber y roomType son requeridos" 
    });
  }

  try {
    const updatedRoom = await roomService.updateRoom(Number(id), roomData);
    return res.status(200).json(updatedRoom);
  } catch (error: any) {
    if (error.message === 'Room not found') {
      return res.status(404).json({ message: 'Habitación no encontrada' });
    } else {
      
      return res.status(500).json({ message: 'Error interno al actualizar la habitación' });
    }
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("ID recibido para eliminar:", id);
  try {
    const deletedRoom = await roomService.deleteRoom(Number(id));
    res.status(200).json(deletedRoom);
  } catch (error: any) {
    if (error.message === 'Room not found') {
      res.status(404).json({ message: 'Habitación no encontrada' });
    } else {
      
      res.status(500).json({ message: 'Error interno al eliminar la habitación' });
    }
  }
};