import mongoose from 'mongoose';
import dotenv from 'dotenv';
//import mysql from 'mysql2/promise';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://marcosrobvel:04052022Marco$@marcosrobvel.kf3is5q.mongodb.net/miranda-mongodb';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};
/*
// sqlConnection.ts
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const getMySQLConnection = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error obteniendo conexión de MySQL:', error);
    throw error;
  }
};

export default pool;*/