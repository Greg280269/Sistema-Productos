import { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto } from '../services/productoService.js';

const PRECIO_MAXIMO = 99999999.99;
const validarId = (id) => Number.isInteger(id) && id > 0;

const obtenerErrorProducto = (nombre, precio) => {
  if (typeof nombre !== 'string' || nombre.trim() === '') return 'El nombre es obligatorio';
  const precioNumerico = Number(precio);
  if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) return 'El precio debe ser un número mayor que cero';
  if (precioNumerico > PRECIO_MAXIMO) return `El precio máximo permitido es S/ ${PRECIO_MAXIMO.toLocaleString('es-PE')}`;
  return null;
};

const errorServidor = (res, error, mensaje) => {
  if (error.code === '22003') return res.status(400).json({ mensaje: `El precio máximo permitido es S/ ${PRECIO_MAXIMO.toLocaleString('es-PE')}` });
  console.error(error);
  return res.status(500).json({ mensaje });
};

export const getProductos = async (req, res) => {
  try { res.json(await obtenerProductos(req.usuario)); }
  catch (error) { errorServidor(res, error, 'Error al obtener los productos'); }
};

export const getProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!validarId(id)) return res.status(400).json({ mensaje: 'El id debe ser un entero positivo' });
    const producto = await obtenerProductoPorId(id, req.usuario);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) { errorServidor(res, error, 'Error al obtener el producto'); }
};

export const postProducto = async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const errorValidacion = obtenerErrorProducto(nombre, precio);
    if (errorValidacion) return res.status(400).json({ mensaje: errorValidacion });
    res.status(201).json(await crearProducto(nombre.trim(), Number(precio), req.usuario.id));
  } catch (error) { errorServidor(res, error, 'Error al crear el producto'); }
};

export const putProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, precio } = req.body;
    if (!validarId(id)) return res.status(400).json({ mensaje: 'El id debe ser un entero positivo' });
    const errorValidacion = obtenerErrorProducto(nombre, precio);
    if (errorValidacion) return res.status(400).json({ mensaje: errorValidacion });
    const producto = await actualizarProducto(id, nombre.trim(), Number(precio), req.usuario);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) { errorServidor(res, error, 'Error al actualizar el producto'); }
};

export const deleteProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!validarId(id)) return res.status(400).json({ mensaje: 'El id debe ser un entero positivo' });
    const producto = await eliminarProducto(id, req.usuario);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) { errorServidor(res, error, 'Error al eliminar el producto'); }
};
