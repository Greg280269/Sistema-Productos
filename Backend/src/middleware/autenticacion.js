import jwt from 'jsonwebtoken';

const obtenerSecreto = () => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET no está configurado');
  return process.env.JWT_SECRET;
};

export const autenticarUsuario = (req, res, next) => {
  try {
    const token = req.cookies.sesion;
    if (!token) return res.status(401).json({ mensaje: 'Debes iniciar sesión' });
    const datos = jwt.verify(token, obtenerSecreto());
    req.usuario = { id: Number(datos.sub), nombre: datos.nombre, rol: datos.rol };
    next();
  } catch {
    return res.status(401).json({ mensaje: 'Sesión inválida o expirada' });
  }
};

export const requiereRol = (...rolesPermitidos) => (req, res, next) => {
  if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
    return res.status(403).json({ mensaje: 'No tienes permisos para esta acción' });
  }
  next();
};
