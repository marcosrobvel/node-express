import express from 'express';
import bodyParser from 'body-parser';
import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middleware/authMiddleware';

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use('/api/rooms', roomRoutes);
app.use('/api/users', authenticateToken, userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});