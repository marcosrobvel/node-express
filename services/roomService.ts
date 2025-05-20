import { Room } from '../interfaces/roomInterface';
import pool from '../database/mongoConnection';

export class RoomService {
  public async getAllRooms(): Promise<Room[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM rooms'
    );
    return rows as Room[];
  }

  public async getRoomById(id: number): Promise<Room | null> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM rooms WHERE id = ?',
      [id]
    );
    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as Room) : null;
  }

  public async createRoom(roomData: Omit<Room, 'id'>): Promise<Room> {
    const { photo, roomNumber, roomType, amenities, price, offer_price, status } = roomData;
    const [result] = await pool.execute(
      'INSERT INTO rooms (photo, roomNumber, roomType, amenities, price, offer_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [photo.join(','), roomNumber, roomType, amenities, price, offer_price, status]
    );
    return {
      ...roomData,
      id: (result as any).insertId,
    };
  }

  public async updateRoom(id: number, roomData: Partial<Omit<Room, 'id'>>): Promise<Room | null> {
    const { photo, roomNumber, roomType, amenities, price, offer_price, status } = roomData;
    const [result] = await pool.execute(
      'UPDATE rooms SET photo = ?, roomNumber = ?, roomType = ?, amenities = ?, price = ?, offer_price = ?, status = ? WHERE id = ?',
      [photo ? photo.join(',') : undefined, roomNumber, roomType, amenities, price, offer_price, status, id]
    );

    const updateResult = result as import('mysql2').ResultSetHeader;
    if (updateResult.affectedRows === 0) return null;

    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM rooms WHERE id = ?',
      [id]
    );

    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as Room) : null;
  }

  public async deleteRoom(id: number): Promise<Room | null> {
    const [result] = await pool.execute(
      'DELETE FROM rooms WHERE id = ?',
      [id]
    );

    if ((result as import('mysql2').ResultSetHeader).affectedRows === 0) return null;

    return { id } as Room;
  }
}



/*import { Room } from "../interfaces/roomInterface";
import { validateRoomData } from "../validators/roomValidator";
import RoomModel from "../schemas/roomSchema";

export class RoomService {
  public async getAllRooms(): Promise<Room[]> {
    const rooms = await RoomModel.find().lean();
    return rooms.map((room) => ({
      ...room,
      id: Number(room.id),
    }));
  }

  public async getRoomById(id: number): Promise<Room | null> {
    const room = await RoomModel.findOne({ id }).lean();
    return room ? { 
      ...room,
      id: Number(room.id) 
    } : null;
  }

  public async createRoom(roomData: Omit<Room, "id">): Promise<Room> {
    validateRoomData(roomData);

    const lastRoom = await RoomModel.findOne().sort({ id: -1 }).limit(1);
    const newId = lastRoom ? Number(lastRoom.id) + 1 : 1;

    const newRoom = new RoomModel({
      ...roomData,
      id: newId,
    });

    const savedRoom = await newRoom.save();
    return { 
      ...savedRoom.toObject(), 
      id: Number(savedRoom.id)
    };
  }

  public async updateRoom(
    id: number,
    roomData: Partial<Omit<Room, "id">>
  ): Promise<Room> {
    validateRoomData(roomData as Omit<Room, "id">);
    const updatedRoom = await RoomModel.findOneAndUpdate(
      { id },
      roomData,
      { new: true }
    ).lean();

    if (!updatedRoom) throw new Error("Room not found");

    return { 
      ...updatedRoom, 
      id: Number(updatedRoom.id)
    };
  }

  public async deleteRoom(id: number): Promise<Room> {
    const deletedRoom = await RoomModel.findOneAndDelete({ id }).lean();

    if (!deletedRoom) throw new Error("Room not found");

    return { 
      ...deletedRoom, 
      id: Number(deletedRoom.id)
    };
  }
}*/