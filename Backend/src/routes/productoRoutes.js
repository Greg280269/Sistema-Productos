import express from 'express';
import { autenticarUsuario } from '../middleware/autenticacion.js';

import {
  getProductos,
  getProducto,
  postProducto,
  putProducto,
  deleteProducto
} from '../controllers/productoController.js';

const router = express.Router();
router.use(autenticarUsuario);

router.get('/', getProductos);

router.get('/:id', getProducto);

router.post('/', postProducto);

router.put('/:id', putProducto);

router.delete('/:id', deleteProducto);

export default router;
