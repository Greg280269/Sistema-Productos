import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../services/productoService.js';

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

    if (!nombre || precio === undefined) {
      return res.status(400).json({
        mensaje: 'Nombre y precio son obligatorios'
      });
    }

    const producto = await crearProducto(nombre, precio);

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

    if (!nombre || precio === undefined) {
      return res.status(400).json({
        mensaje: 'Nombre y precio son obligatorios'
      });
    }

    const producto = await actualizarProducto(
      id,
      nombre,
      precio
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