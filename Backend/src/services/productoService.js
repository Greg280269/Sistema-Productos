import pool from '../config/database.js';

const columnas = 'p.id, p.nombre, p.precio, p.usuario_id, u.nombre AS usuario_nombre, u.email AS usuario_email';
const esAdmin = (usuario) => usuario.rol === 'admin';

export const obtenerProductos = async (usuario) => { const result = await pool.query(`SELECT ${columnas} FROM productos p JOIN usuarios u ON u.id = p.usuario_id ${esAdmin(usuario) ? '' : 'WHERE p.usuario_id = $1'} ORDER BY p.id`, esAdmin(usuario) ? [] : [usuario.id]); return result.rows; };
export const obtenerProductoPorId = async (id, usuario) => { const result = await pool.query(`SELECT ${columnas} FROM productos p JOIN usuarios u ON u.id = p.usuario_id WHERE p.id = $1 ${esAdmin(usuario) ? '' : 'AND p.usuario_id = $2'}`, esAdmin(usuario) ? [id] : [id, usuario.id]); return result.rows[0]; };
export const crearProducto = async (nombre, precio, usuarioId) => { const result = await pool.query('INSERT INTO productos (nombre, precio, usuario_id) VALUES ($1, $2, $3) RETURNING id, nombre, precio, usuario_id', [nombre, precio, usuarioId]); return result.rows[0]; };
export const actualizarProducto = async (id, nombre, precio, usuario) => { const result = esAdmin(usuario) ? await pool.query('UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING id, nombre, precio, usuario_id', [nombre, precio, id]) : await pool.query('UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 AND usuario_id = $4 RETURNING id, nombre, precio, usuario_id', [nombre, precio, id, usuario.id]); return result.rows[0]; };
export const eliminarProducto = async (id, usuario) => { const result = esAdmin(usuario) ? await pool.query('DELETE FROM productos WHERE id = $1 RETURNING id', [id]) : await pool.query('DELETE FROM productos WHERE id = $1 AND usuario_id = $2 RETURNING id', [id, usuario.id]); return result.rows[0]; };
