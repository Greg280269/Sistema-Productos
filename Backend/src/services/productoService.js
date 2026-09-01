import pool from '../config/database.js';

export const obtenerProductos = async () => {

  const result = await pool.query(`
    SELECT id, nombre, precio
    FROM productos
    ORDER BY id
  `);

  return result.rows;
};

export const obtenerProductoPorId = async (id) => {

  const result = await pool.query(
    `
    SELECT id, nombre, precio
    FROM productos
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

export const crearProducto = async (nombre, precio) => {

  const result = await pool.query(
    `
    INSERT INTO productos (nombre, precio)
    VALUES ($1, $2)
    RETURNING id, nombre, precio
    `,
    [nombre, precio]
  );

  return result.rows[0];
};

export const actualizarProducto = async (id, nombre, precio) => {

  const result = await pool.query(
    `
    UPDATE productos
    SET nombre = $1,
        precio = $2
    WHERE id = $3
    RETURNING id, nombre, precio
    `,
    [nombre, precio, id]
  );

  return result.rows[0];
};

export const eliminarProducto = async (id) => {

  const result = await pool.query(
    `
    DELETE FROM productos
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0];
};