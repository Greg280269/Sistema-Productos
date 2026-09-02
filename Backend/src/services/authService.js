import pool from '../config/database.js';

export const buscarUsuarioPorEmail = async (email) => {
  const result = await pool.query('SELECT id, nombre, email, password_hash, rol FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};

export const crearUsuario = async (nombre, email, passwordHash) => {
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING id, nombre, email, rol',
    [nombre, email, passwordHash]
  );
  return result.rows[0];
};
