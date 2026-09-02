import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import productoRoutes from './routes/productoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.disable('x-powered-by');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);

export default app;
