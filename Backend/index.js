import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const app = express();

app.disable('x-powered-by');

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

const PORT = 3000;

// Conexión a PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Endpoint de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Backend funcionando'
    });
});

// Obtener productos
app.get('/api/productos', async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT * FROM productos ORDER BY id'
        );

        res.json(result.rows);

    } catch (error) {

        console.error('Error al consultar PostgreSQL:', error);

        res.status(500).json({
            mensaje: 'Error al consultar la base de datos'
        });

    }

});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});