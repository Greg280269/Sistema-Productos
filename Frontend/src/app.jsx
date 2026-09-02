import { useState } from 'preact/hooks';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AdminNav from './components/AdminNav.jsx';
import AdministracionUsuarios from './components/AdministracionUsuarios.jsx';
import ConfirmarEliminacion from './components/ConfirmarEliminacion.jsx';
import Login from './components/Login.jsx';
import Mensaje from './components/Mensaje.jsx';
import ProductoForm from './components/ProductoForm.jsx';
import ProductoList from './components/ProductoList.jsx';
import { useAuth } from './hooks/useAuth.js';
import { useProductos } from './hooks/useProductos.js';

function App() {
  const { usuario, cargando: cargandoAuth, iniciarSesion, registrar, cerrarSesion } = useAuth();
  const { productos, cargando, guardando, crearProducto, actualizarProducto, eliminarProducto } = useProductos(Boolean(usuario));
  const [seccion, setSeccion] = useState('productos'); const [productoEnEdicion, setProductoEnEdicion] = useState(null); const [productoParaEliminar, setProductoParaEliminar] = useState(null); const [eliminando, setEliminando] = useState(false); const [mensaje, setMensaje] = useState(null);
  if (cargandoAuth) return <main class="grid min-h-screen place-items-center bg-slate-50 text-slate-500">Comprobando sesión...</main>;
  if (!usuario) return <Login onLogin={iniciarSesion} onRegister={registrar} />;
  const guardar = async (datos) => { try { const editando = productoEnEdicion !== null; if (editando) await actualizarProducto(productoEnEdicion.id, datos); else await crearProducto(datos); setMensaje({ tipo: 'exito', texto: editando ? 'Producto actualizado correctamente.' : 'Producto creado correctamente.' }); setProductoEnEdicion(null); } catch (error) { setMensaje({ tipo: 'error', texto: error.message }); } };
  const confirmarEliminacion = async () => { if (!productoParaEliminar) return; try { setEliminando(true); await eliminarProducto(productoParaEliminar.id); if (productoEnEdicion?.id === productoParaEliminar.id) setProductoEnEdicion(null); setProductoParaEliminar(null); setMensaje({ tipo: 'exito', texto: 'Producto eliminado correctamente.' }); } catch (error) { setMensaje({ tipo: 'error', texto: error.message }); } finally { setEliminando(false); } };
  return <><main class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 px-4 py-8 sm:px-6"><div class="mx-auto max-w-5xl"><header class="mb-7 flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"><div><p class="mb-2 text-sm font-semibold tracking-widest text-indigo-600 uppercase">Panel de control</p><h1 class="text-3xl font-bold tracking-tight text-slate-900">Gestión de productos</h1><p class="mt-2 text-slate-600">Hola, {usuario.nombre}. Rol: <span class="font-semibold capitalize">{usuario.rol}</span>.</p></div><button type="button" onClick={cerrarSesion} class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50">Cerrar sesión</button></header>{usuario.rol === 'admin' && <AdminNav seccion={seccion} onCambiar={(nueva) => { setSeccion(nueva); setMensaje(null); }} />}{seccion === 'productos' || usuario.rol !== 'admin' ? <><section class="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8"><ProductoForm producto={productoEnEdicion} guardando={guardando} onGuardar={guardar} onCancelar={() => setProductoEnEdicion(null)} onError={(texto) => setMensaje({ tipo: 'error', texto })} /><Mensaje mensaje={mensaje} /></section><ProductoList productos={productos} cargando={cargando} onEditar={(producto) => { setProductoEnEdicion(producto); setMensaje(null); }} onEliminar={setProductoParaEliminar} /></> : <AdministracionUsuarios />}</div><ConfirmarEliminacion producto={productoParaEliminar} eliminando={eliminando} onCancelar={() => setProductoParaEliminar(null)} onConfirmar={confirmarEliminacion} /></main><Analytics /><SpeedInsights /></>;
}
export default App;
