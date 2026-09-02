import app from './src/app.js';

const PORT = Number(process.env.PORT) || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

const apagar = (senal) => { console.log(`Recibida señal ${senal}; cerrando servidor...`); server.close(() => process.exit(0)); };
process.on('SIGTERM', () => apagar('SIGTERM'));
process.on('SIGINT', () => apagar('SIGINT'));
