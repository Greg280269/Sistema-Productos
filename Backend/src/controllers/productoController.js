import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../services/productoService.js';

const validarProducto = (nombre, precio) => {
  if (typeof nombre !== 'string' || nombre.trim() === '') {
    return false;
  }

  const precioNumerico = Number(precio);

  return Number.isFinite(precioNumerico) && precioNumerico > 0;
};

export const getProductos = async (req, res) => {

  try {

    const productos = await obtenerProductos();

    res.json(productos);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: 'Error al obtener los productos'
    });

  }
};

export const getProducto = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const producto = await obtenerProductoPorId(id);

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      });
    }

    res.json(producto);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: 'Error al obtener el producto'
    });

  }
};

export const postProducto = async (req, res) => {
 
  try {
 
    const { nombre, precio } = req.body;
    const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : '';

    if (!validarProducto(nombreNormalizado, precio)) {
      return res.status(400).json({
        mensaje: 'Nombre y precio válido son obligatorios'
      });
    }

    const producto = await crearProducto(nombreNormalizado, Number(precio));

    res.status(201).json(producto);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: 'Error al crear el producto'
    });

  }
};

export const putProducto = async (req, res) => {
 
  try {
 
    const id = Number(req.params.id);
    const { nombre, precio } = req.body;
    const nombreNormalizado = typeof nombre === 'string' ? nombre.trim() : '';

    if (!validarProducto(nombreNormalizado, precio)) {
      return res.status(400).json({
        mensaje: 'Nombre y precio válido son obligatorios'
      });
    }

    const producto = await actualizarProducto(
      id,
      nombreNormalizado,
      Number(precio)
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      });
    }

    res.json(producto);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: 'Error al actualizar el producto'
    });

  }
};

export const deleteProducto = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const producto = await eliminarProducto(id);

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado'
      });
    }

    res.json({
      mensaje: 'Producto eliminado correctamente'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: 'Error al eliminar el producto'
    });

  }
};