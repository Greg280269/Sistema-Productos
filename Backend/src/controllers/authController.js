import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { buscarUsuarioPorEmail, crearUsuario } from '../services/authService.js';

const COOKIE = 'sesion';
const esProduccion = process.env.NODE_ENV === 'production';
const opcionesCookie = { httpOnly: true, sameSite: esProduccion ? 'none' : 'lax', secure: esProduccion, maxAge: 1000 * 60 * 60 * 8 };
const usuarioPublico = ({ id, nombre, email, rol }) => ({ id, nombre, email, rol });
const emitirSesion = (res, usuario) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET no está configurado');
  const token = jwt.sign({ nombre: usuario.nombre, rol: usuario.rol }, process.env.JWT_SECRET, { subject: String(usuario.id), expiresIn: '8h' });
  res.cookie(COOKIE, token, opcionesCookie);
};

export const registrar = async (req, res) => {
  try {
    const nombre = typeof req.body.nombre === 'string' ? req.body.nombre.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    if (!nombre || !/^\S+@\S+\.\S+$/.test(email) || password.length < 8) return res.status(400).json({ mensaje: 'Nombre, email válido y contraseña de al menos 8 caracteres son obligatorios' });
    const usuario = await crearUsuario(nombre, email, await bcrypt.hash(password, 12));
    emitirSesion(res, usuario);
    res.status(201).json({ usuario: usuarioPublico(usuario) });
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ mensaje: 'El email ya está registrado' });
    console.error(error); res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario || !(await bcrypt.compare(password, usuario.password_hash))) return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
    emitirSesion(res, usuario);
    res.json({ usuario: usuarioPublico(usuario) });
  } catch (error) { console.error(error); res.status(500).json({ mensaje: 'Error al iniciar sesión' }); }
};

export const cerrarSesion = (req, res) => { res.clearCookie(COOKIE, opcionesCookie); res.json({ mensaje: 'Sesión cerrada correctamente' }); };
export const obtenerSesion = (req, res) => res.json({ usuario: req.usuario });
