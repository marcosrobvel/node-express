import express from 'express';
import bodyParser from 'body-parser';
import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});