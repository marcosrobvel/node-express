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
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['https://upeur2neoi.execute-api.eu-west-3.amazonaws.com']

// https://upeur2neoi.execute-api.eu-west-3.amazonaws.com/dev

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    credentials: true,
    }

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});
app.use('/api/auth', authRoutes);
app.use('/api/rooms', authenticateToken, roomRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/bookings', authenticateToken, bookingRoutes);
app.use('/api/contacts', authenticateToken, contactRoutes);

connectToMongo();

if(process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

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