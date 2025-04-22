import express from 'express';
import bodyParser from 'body-parser';
import roomRoutes from './routes/roomRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/api/rooms', roomRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});