import { useEffect, useState } from 'preact/hooks';
import * as authApi from '../services/authApi.js';

function AdministracionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [passwords, setPasswords] = useState({});
  const cargar = () => authApi.listarUsuarios().then(setUsuarios).catch((error) => setMensaje(error.message));
  useEffect(cargar, []);
  const cambiarRol = async (id, rol) => { try { const usuario = await authApi.actualizarRol(id, rol); setUsuarios((actuales) => actuales.map((item) => item.id === id ? { ...item, ...usuario } : item)); setMensaje('Rol actualizado.'); } catch (error) { setMensaje(error.message); } };
  const cambiarPassword = async (id) => { const password = passwords[id] ?? ''; try { await authApi.actualizarPassword(id, password); setPasswords((actuales) => ({ ...actuales, [id]: '' })); setMensaje('Contraseña actualizada.'); } catch (error) { setMensaje(error.message); } };
  return <section class="mt-7 rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8"><h2 class="text-xl font-semibold text-slate-800">Administrar usuarios</h2><p class="mt-1 text-sm text-slate-500">Gestiona roles y contraseñas de compradores.</p>{mensaje && <p class="mt-3 text-sm text-indigo-700">{mensaje}</p>}<div class="mt-5 overflow-x-auto"><table class="w-full min-w-[42rem] text-left text-sm"><thead class="border-b border-slate-200 text-slate-500"><tr><th class="px-3 py-3 font-semibold">Usuario</th><th class="px-3 py-3 font-semibold">Rol</th><th class="px-3 py-3 font-semibold">Nueva contraseña</th><th class="px-3 py-3"></th></tr></thead><tbody class="divide-y divide-slate-100">{usuarios.map((usuario) => <tr key={usuario.id}><td class="px-3 py-4"><p class="font-semibold text-slate-800">{usuario.nombre}</p><p class="text-slate-500">{usuario.email}</p></td><td class="px-3 py-4"><select value={usuario.rol} onChange={(event) => cambiarRol(usuario.id, event.currentTarget.value)} class="rounded-lg border border-slate-300 px-2 py-2" disabled={usuario.rol === 'admin'}><option value="comprador">Comprador</option><option value="admin">Administrador</option></select></td><td class="px-3 py-4"><input type="password" minLength="8" value={passwords[usuario.id] ?? ''} onInput={(event) => setPasswords((actuales) => ({ ...actuales, [usuario.id]: event.currentTarget.value }))} placeholder="8 caracteres" class="rounded-lg border border-slate-300 px-3 py-2" /></td><td class="px-3 py-4"><button type="button" onClick={() => cambiarPassword(usuario.id)} class="rounded-lg bg-indigo-50 px-3 py-2 font-semibold text-indigo-700 hover:bg-indigo-100">Actualizar</button></td></tr>)}</tbody></table></div></section>;
}

export default AdministracionUsuarios;
