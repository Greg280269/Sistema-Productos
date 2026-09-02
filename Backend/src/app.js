import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import productoRoutes from './routes/productoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';
app.disable('x-powered-by');
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.get('/health', (req, res) => res.json({ estado: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);
export default app;
