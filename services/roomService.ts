import { Room } from "../interfaces/roomInterface";
import { validateRoomData } from "../validators/roomValidator";
import fs from "fs";


/*
Ejemplo de implementar MongoDB en vez de un archivo JSON:
import { RoomModel } from "../models/roomModel";
import { Room } from "../interfaces/roomInterface";
import { validateRoomData } from "../validators/roomValidator";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI as string;


*/

const rooms: Room[] = require("../data/rooms.json");

export class RoomService {
  private rooms: Room[];
  private roomsFilePath = "./data/rooms.json";

  constructor() {
    this.rooms = rooms;
  }

  private writeRoomsFile(rooms: Room[]): void {
    fs.writeFileSync(this.roomsFilePath, JSON.stringify(rooms, null, 2));
  }

  public getAllRooms(): Room[] {
    return this.rooms;
  }

  public getRoomById(id: number): Room | undefined {
    return this.rooms.find((room) => room.id === id);
  }

  public createRoom(roomData: Omit<Room, "id">): Room {
    validateRoomData(roomData);

    const newId =
      this.rooms.length > 0 ? this.rooms[this.rooms.length - 1].id + 1 : 1;

    const newRoom: Room = { id: newId, ...roomData };

    this.rooms.push(newRoom);

    this.writeRoomsFile(this.rooms);

    return newRoom;
  }

  public updateRoom(id: number, roomData: Partial<Omit<Room, "id">>): Room {
    const roomIndex = this.rooms.findIndex((room) => room.id === id);

    if (roomIndex === -1) {
      throw new Error("Room not found");
    }

    validateRoomData(roomData as Omit<Room, "id">);

    const updatedRoom: Room = { ...this.rooms[roomIndex], ...roomData };

    this.rooms[roomIndex] = updatedRoom;

    this.writeRoomsFile(this.rooms);

    return updatedRoom;
  }

  public deleteRoom(id: number): Room {
    const roomIndex = this.rooms.findIndex((room) => room.id === id);

    if (roomIndex === -1) {
      throw new Error("Room not found");
    }

    const [deletedRoom] = this.rooms.splice(roomIndex, 1);

    this.writeRoomsFile(this.rooms);

    return deletedRoom;
  }
}
