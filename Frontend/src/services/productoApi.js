import { API_URL } from '../config/api.js';

const solicitar = async (url, opciones) => {
  const respuesta = await fetch(url, { ...opciones, credentials: 'include' });
  const datos = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) throw new Error(datos.mensaje ?? 'Ocurrió un error al comunicarse con la API');
  return datos;
};

export const listarProductos = () => solicitar(API_URL);
export const crearProducto = (producto) => solicitar(API_URL, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(producto)
});
export const actualizarProducto = (id, producto) => solicitar(`${API_URL}/${id}`, {
  method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(producto)
});
export const eliminarProducto = (id) => solicitar(`${API_URL}/${id}`, { method: 'DELETE' });
