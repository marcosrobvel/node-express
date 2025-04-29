import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/hotelDB';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};
