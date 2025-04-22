import fs from 'fs';
import path from 'path';

const roomsFilePath = path.join(__dirname, '../data/rooms.json');

export const getAllRooms = async () => {
  const rooms = JSON.parse(fs.readFileSync(roomsFilePath, 'utf-8'));
  return rooms;
};

export const getRoomById = async (id: string) => {
  const rooms = JSON.parse(fs.readFileSync(roomsFilePath, 'utf-8'));
  return rooms.find((room: any) => room.id === id);
};

export const createRoom = async (roomData: any) => {
  const rooms = JSON.parse(fs.readFileSync(roomsFilePath, 'utf-8'));
  const newId = (rooms.length > 0 ? parseInt(rooms[rooms.length - 1].id) : 0) + 1;
  roomData.id = newId;
  rooms.push(roomData);
  fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));
  return roomData;
};

const readRoomsFile = () => {
  return JSON.parse(fs.readFileSync(roomsFilePath, 'utf-8'));
};

const writeRoomsFile = (rooms: any) => {
  fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));
};

export const updateRoom = async (id: string, roomData: any) => {
  const rooms = readRoomsFile();
  const roomIndex = rooms.findIndex((room: any) => room.id === id);

  if (roomIndex === -1) {
    throw new Error('Room not found');
  }

  const updatedRoom = { ...rooms[roomIndex], ...roomData, id };
  rooms[roomIndex] = updatedRoom;

  writeRoomsFile(rooms);
  return updatedRoom;
};

export const deleteRoom = async (id: string) => {
  const rooms = readRoomsFile();
  const roomIndex = rooms.findIndex((room: any) => room.id === id);

  if (roomIndex === -1) {
    throw new Error('Room not found');
  }

  const [deletedRoom] = rooms.splice(roomIndex, 1);
  writeRoomsFile(rooms);
  return deletedRoom;
};