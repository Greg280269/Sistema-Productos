import pool from '../config/database.js';
export const listarUsuarios = async () => (await pool.query('SELECT id, nombre, email, rol, creado_en FROM usuarios ORDER BY id')).rows;
export const cambiarRol = async (id, rol) => (await pool.query('UPDATE usuarios SET rol = $1 WHERE id = $2 RETURNING id, nombre, email, rol', [rol, id])).rows[0];
export const cambiarPassword = async (id, hash) => (await pool.query('UPDATE usuarios SET password_hash = $1 WHERE id = $2 RETURNING id', [hash, id])).rows[0];
