import express from 'express';
import { registrar, iniciarSesion, cerrarSesion, obtenerSesion } from '../controllers/authController.js';
import { autenticarUsuario } from '../middleware/autenticacion.js';

const router = express.Router();
router.post('/registro', registrar);
router.post('/login', iniciarSesion);
router.post('/logout', cerrarSesion);
router.get('/sesion', autenticarUsuario, obtenerSesion);

export default router;
