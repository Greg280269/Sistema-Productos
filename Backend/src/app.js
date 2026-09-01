import express from 'express';
import cors from 'cors';

import productoRoutes from './routes/productoRoutes.js';

const app = express();

app.disable('x-powered-by');

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/productos', productoRoutes);

export default app;