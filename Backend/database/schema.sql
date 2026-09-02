-- Ejecuta este archivo dentro de la base de datos indicada en DB_NAME.
-- Ejemplo: psql -U postgres -d productos_db -f database/schema.sql

CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL CHECK (btrim(nombre) <> ''),
  email VARCHAR(254) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol VARCHAR(20) NOT NULL DEFAULT 'comprador' CHECK (rol IN ('admin', 'comprador')),
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS productos (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL CHECK (btrim(nombre) <> ''),
  precio NUMERIC(10, 2) NOT NULL CHECK (precio > 0),
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Para una tabla productos creada antes de usuarios, agrega la columna manualmente.
-- Las filas antiguas deben asociarse a un usuario antes de hacerla NOT NULL.
ALTER TABLE productos ADD COLUMN IF NOT EXISTS usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE;
