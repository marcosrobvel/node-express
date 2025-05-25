import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import serverless from 'serverless-http';

import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import bookingRoutes from './routes/bookingRoutes';
import { authenticateToken } from './middleware/authMiddleware';
import { connectToMongo } from './database/mongoConnection';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:5173',
  'http://miranda-frontend.s3-website.eu-west-3.amazonaws.com',
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Rutas
app.use('/api/health', (_, res) => {
  res.status(200).json({ message: 'API is running' });
});
app.use('/api/auth', authRoutes);
app.use('rooms', authenticateToken, roomRoutes);
app.use('users', authenticateToken, userRoutes);
app.use('bookings', authenticateToken, bookingRoutes);
app.use('contacts', authenticateToken, contactRoutes);

// DB
connectToMongo();

// Local dev
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

// Export serverless handler
export const handler = serverless(app);