import express from 'express';
import bodyParser from 'body-parser';
import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import { authenticateToken } from './middleware/authMiddleware';
import bookingRoutes from './routes/bookingRoutes';
import { connectToMongo } from './database/mongoConnection';
import serverless from 'serverless-http';

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.use('/api/rooms', authenticateToken, roomRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/bookings', authenticateToken, bookingRoutes);
app.use('/api/contacts', authenticateToken, contactRoutes);

connectToMongo();

app.listen(3000);
export const handler = serverless(app);

//import http from 'http';

/*
const PORT = 3000;
const server = http.createServer(app);*/

/*
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

startServer(PORT);*/