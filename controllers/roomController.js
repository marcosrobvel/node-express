"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = exports.getRoomById = exports.getRooms = void 0;
const roomService = __importStar(require("../services/roomService"));
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield roomService.getAllRooms();
        res.status(200).json(rooms);
    }
    catch (error) {
        console.error('Error en getRooms:', error);
        res.status(500).json({
            message: "Error interno al obtener las habitaciones",
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
});
exports.getRooms = getRooms;
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = req.params.id;
    if (!roomId) {
        return res.status(400).json({ message: "ID de habitación no proporcionado" });
    }
    try {
        const room = yield roomService.getRoomById(roomId);
        if (room) {
            res.status(200).json(room);
        }
        else {
            res.status(404).json({ message: "Habitación no encontrada" });
        }
    }
    catch (error) {
        console.error(`Error en getRoomById para ID ${roomId}:`, error);
        res.status(500).json({
            message: "Error interno al obtener la habitación",
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
});
exports.getRoomById = getRoomById;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const roomData = req.body;
    if (!roomData.roomNumber || !roomData.roomType) {
        return res.status(400).json({
            message: "Datos incompletos: roomNumber y roomType son requeridos"
        });
    }
    try {
        const newRoom = yield roomService.createRoom(roomData);
        res.status(201).json(newRoom);
    }
    catch (error) {
        console.error('Error en createRoom:', error);
        if (error instanceof Error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            res.status(statusCode).json({
                message: error.name === 'ValidationError'
                    ? error.message
                    : "Error interno al crear la habitación",
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
        else {
            res.status(500).json({
                message: "Error interno al crear la habitación",
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }
});
exports.createRoom = createRoom;
