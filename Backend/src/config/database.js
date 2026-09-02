import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;
const configuracion = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : { host: process.env.DB_HOST, port: process.env.DB_PORT, database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD };

const pool = new Pool({
  ...configuracion,
  max: Number(process.env.DB_POOL_MAX) || 10,
  ssl: process.env.DB_SSL === 'true' || Boolean(process.env.DATABASE_URL)
    ? { rejectUnauthorized: false }
    : undefined
});

export default pool;
