import { useEffect, useState } from 'preact/hooks';
import * as authApi from '../services/authApi.js';

export const useAuth = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    authApi.obtenerSesion().then((respuesta) => setUsuario(respuesta.usuario)).catch(() => setUsuario(null)).finally(() => setCargando(false));
  }, []);

  const iniciarSesion = async (datos) => { const respuesta = await authApi.iniciarSesion(datos); setUsuario(respuesta.usuario); };
  const registrar = async (datos) => { const respuesta = await authApi.registrar(datos); setUsuario(respuesta.usuario); };
  const cerrarSesion = async () => { await authApi.cerrarSesion(); setUsuario(null); };
  return { usuario, cargando, iniciarSesion, registrar, cerrarSesion };
};
