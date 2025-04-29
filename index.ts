import express from 'express';
import bodyParser from 'body-parser';
import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middleware/authMiddleware';
import bookingRoutes from './routes/bookingRoutes';
import http from 'http';
import { connectToMongo } from './database/mongoConnection';

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use('/api/rooms', authenticateToken, roomRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/bookings', authenticateToken, bookingRoutes);

const PORT = 3000;
const server = http.createServer(app);

connectToMongo();

function startServer(port: number) {
    server.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    }).on('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`El puerto ${port} está en uso, probando con ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Error al iniciar el servidor:', err);
        }
    });
}

process.on('SIGINT', () => {
    console.log('\nCerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado correctamente.');
        process.exit(0);
    });
});

startServer(PORT);