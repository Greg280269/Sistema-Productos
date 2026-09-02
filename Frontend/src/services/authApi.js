import { AUTH_URL, USUARIOS_URL } from '../config/api.js';

const solicitar = async (url, opciones) => {
  const respuesta = await fetch(url, { ...opciones, credentials: 'include' });
  const datos = await respuesta.json().catch(() => ({}));
  if (!respuesta.ok) throw new Error(datos.mensaje ?? 'Error de autenticación');
  return datos;
};

export const iniciarSesion = (datos) => solicitar(`${AUTH_URL}/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) });
export const registrar = (datos) => solicitar(`${AUTH_URL}/registro`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) });
export const cerrarSesion = () => solicitar(`${AUTH_URL}/logout`, { method: 'POST' });
export const obtenerSesion = () => solicitar(`${AUTH_URL}/sesion`);
export const listarUsuarios = () => solicitar(USUARIOS_URL);
export const actualizarRol = (id, rol) => solicitar(`${USUARIOS_URL}/${id}/rol`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rol }) });
export const actualizarPassword = (id, password) => solicitar(`${USUARIOS_URL}/${id}/password`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
