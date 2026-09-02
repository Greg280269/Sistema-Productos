import assert from 'node:assert/strict';
import { after, beforeEach, test } from 'node:test';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/config/database.js';

process.env.JWT_SECRET = 'test-secret';
const token = jwt.sign({ nombre: 'Admin', rol: 'admin' }, process.env.JWT_SECRET, { subject: '1' });
const autenticada = (peticion) => peticion.set('Cookie', [`sesion=${token}`]);
let productos;
let siguienteId;
const consultaOriginal = pool.query;

beforeEach(() => { productos = [{ id: 1, nombre: 'Cuaderno', precio: '12.50', usuario_id: 1 }]; siguienteId = 2; });
pool.query = async (consulta, parametros = []) => {
  const sql = consulta.trim().toUpperCase();
  if (sql.startsWith('SELECT') && sql.includes('WHERE ID = $1')) return { rows: productos.filter((item) => item.id === Number(parametros[0])) };
  if (sql.startsWith('SELECT')) return { rows: productos };
  if (sql.startsWith('INSERT')) { const item = { id: siguienteId++, nombre: parametros[0], precio: String(parametros[1]), usuario_id: parametros[2] }; productos.push(item); return { rows: [item] }; }
  if (sql.startsWith('UPDATE')) { const item = productos.find((producto) => producto.id === Number(parametros[2])); if (!item) return { rows: [] }; item.nombre = parametros[0]; item.precio = String(parametros[1]); return { rows: [item] }; }
  if (sql.startsWith('DELETE')) { const index = productos.findIndex((item) => item.id === Number(parametros[0])); return index === -1 ? { rows: [] } : { rows: [productos.splice(index, 1)[0]] }; }
  throw new Error(`Consulta no contemplada: ${consulta}`);
};
after(() => { pool.query = consultaOriginal; });

test('las rutas de productos exigen autenticación', async () => { await request(app).get('/api/productos').expect(401); });
test('GET /api/productos devuelve la lista autenticada', async () => { const respuesta = await autenticada(request(app).get('/api/productos')).expect(200); assert.equal(respuesta.body[0].nombre, 'Cuaderno'); });
test('POST /api/productos crea un producto válido', async () => { const respuesta = await autenticada(request(app).post('/api/productos')).send({ nombre: 'Mouse', precio: 49.9 }).expect(201); assert.equal(respuesta.body.usuario_id, 1); });
test('POST rechaza datos inválidos y precios demasiado grandes', async () => { await autenticada(request(app).post('/api/productos')).send({ nombre: '', precio: 0 }).expect(400); const respuesta = await autenticada(request(app).post('/api/productos')).send({ nombre: 'Costoso', precio: 100000000 }).expect(400); assert.match(respuesta.body.mensaje, /máximo/i); });
test('PUT /api/productos/:id actualiza un producto', async () => { const respuesta = await autenticada(request(app).put('/api/productos/1')).send({ nombre: 'Cuaderno grande', precio: 18 }).expect(200); assert.equal(respuesta.body.nombre, 'Cuaderno grande'); });
test('la API responde 400 para un id inválido y 404 si no existe', async () => { await autenticada(request(app).get('/api/productos/no-es-id')).expect(400); await autenticada(request(app).delete('/api/productos/99')).expect(404); });
test('DELETE /api/productos/:id elimina un producto', async () => { await autenticada(request(app).delete('/api/productos/1')).expect(200); assert.equal((await autenticada(request(app).get('/api/productos')).expect(200)).body.length, 0); });
