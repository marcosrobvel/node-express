"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = exports.getRoomById = exports.getAllRooms = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const roomsFilePath = path_1.default.join(__dirname, '../data/rooms.json');
const getAllRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = JSON.parse(fs_1.default.readFileSync(roomsFilePath, 'utf-8'));
    return rooms;
});
exports.getAllRooms = getAllRooms;
const getRoomById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = JSON.parse(fs_1.default.readFileSync(roomsFilePath, 'utf-8'));
    return rooms.find((room) => room.id === id);
});
exports.getRoomById = getRoomById;
const createRoom = (roomData) => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = JSON.parse(fs_1.default.readFileSync(roomsFilePath, 'utf-8'));
    rooms.push(roomData);
    fs_1.default.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));
    return roomData;
});
exports.createRoom = createRoom;
