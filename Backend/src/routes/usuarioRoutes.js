import express from 'express';
import { getUsuarios, patchRol, patchPassword } from '../controllers/usuarioController.js';
import { autenticarUsuario, requiereRol } from '../middleware/autenticacion.js';
const router = express.Router();
router.use(autenticarUsuario, requiereRol('admin'));
router.get('/', getUsuarios);
router.patch('/:id/rol', patchRol);
router.patch('/:id/password', patchPassword);
export default router;
