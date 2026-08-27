import express from 'express';
import cors from 'cors';

const app = express();

app.disable('x-powered-by');

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

const PORT = 3000;

let productos = [
  {
    id: 1,
    nombre: 'Laptop',
    precio: 2500
  },
  {
    id: 2,
    nombre: 'Monitor',
    precio: 800
  },
  {
    id: 3,
    nombre: 'Teclado',
    precio: 150
  }
];

// GET - Obtener todos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// GET - Obtener uno por ID
app.get('/api/productos/:id', (req, res) => {

  const id = Number(req.params.id);

  const producto = productos.find(producto => producto.id === id);

  if (!producto) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado'
    });
  }

  res.json(producto);
});

// POST - Crear producto
app.post('/api/productos', (req, res) => {

  const { nombre, precio } = req.body;

  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio
  };

  productos.push(nuevoProducto);

  res.status(201).json(nuevoProducto);
});

// PUT - Actualizar producto
app.put('/api/productos/:id', (req, res) => {

  const id = Number(req.params.id);

  const producto = productos.find(producto => producto.id === id);

  if (!producto) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado'
    });
  }

  const { nombre, precio } = req.body;

  producto.nombre = nombre;
  producto.precio = precio;

  res.json(producto);
});

// DELETE - Eliminar producto
app.delete('/api/productos/:id', (req, res) => {

  const id = Number(req.params.id);

  const existe = productos.some(producto => producto.id === id);

  if (!existe) {
    return res.status(404).json({
      mensaje: 'Producto no encontrado'
    });
  }

  productos = productos.filter(producto => producto.id !== id);

  res.json({
    mensaje: 'Producto eliminado correctamente'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});