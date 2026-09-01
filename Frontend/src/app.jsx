import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/productos';

function App() {

  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  // Obtener productos
  const obtenerProductos = async () => {

    try {

      const response = await fetch(API_URL);
      const data = await response.json();

      setProductos(data);

    } catch (error) {

      console.error('Error:', error);

    }
  };

  // Ejecutar al cargar la página
  useEffect(() => {
    obtenerProductos();
  }, []);

  // Crear producto
  const crearProducto = async () => {
 
    const nombreNormalizado = nombre.trim();
    const precioNumerico = Number(precio);

    if (!nombreNormalizado || !Number.isFinite(precioNumerico) || precioNumerico <= 0) {
      alert('Completa todos los campos con un precio válido');
      return;
    }

    try {

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombreNormalizado,
          precio: precioNumerico
        })
      });

      if (!response.ok) {
        throw new Error('No se pudo crear el producto');
      }

      const nuevoProducto = await response.json();

      setProductos((prevProductos) => [...prevProductos, nuevoProducto]);

      setNombre('');
      setPrecio('');

    } catch (error) {

      console.error('Error:', error);
      alert('No se pudo crear el producto. Verifica los datos ingresados.');

    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {

    try {

      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      setProductos(
        productos.filter(producto => producto.id !== id)
      );

    } catch (error) {

      console.error('Error:', error);

    }
  };

  return (
    <div>

      <h1>Gestión de productos</h1>

      <div>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <button type="button" onClick={crearProducto}>
          Crear producto
        </button>

      </div>

      <hr />

      <h2>Productos</h2>

      {productos.map(producto => (

        <div key={producto.id}>

          <strong>{producto.nombre}</strong>

          <span>
            {' '} - S/ {producto.precio}
          </span>

          <button
            type="button"
            onClick={() => eliminarProducto(producto.id)}
          >
            Eliminar
          </button>

        </div>

      ))}

    </div>
  );
}

export default App;