import { useMemo, useState } from 'preact/hooks';

const moneda = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });
const TAMANO_PAGINA = 6;

function ProductoList({ productos, cargando, onEditar, onEliminar }) {
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);

  const productosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return productos;
    return productos.filter((producto) => [producto.nombre, producto.usuario_nombre, producto.usuario_email].some((valor) => valor?.toLowerCase().includes(termino)));
  }, [productos, busqueda]);
  const totalPaginas = Math.max(1, Math.ceil(productosFiltrados.length / TAMANO_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = productosFiltrados.slice((paginaActual - 1) * TAMANO_PAGINA, paginaActual * TAMANO_PAGINA);

  const cambiarBusqueda = (event) => { setBusqueda(event.currentTarget.value); setPagina(1); };
  if (cargando) return <section class="mt-7 rounded-2xl bg-white px-6 py-16 text-center text-slate-500 shadow-xl ring-1 ring-slate-200"><span class="inline-block size-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" aria-label="Cargando" /></section>;

  return <section class="mt-7 overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-200">
    <div class="border-b border-slate-100 px-6 py-5 sm:px-8"><div class="flex items-center justify-between gap-4"><div><h2 class="text-xl font-semibold text-slate-800">Productos</h2><p class="mt-1 text-sm text-slate-500">{productosFiltrados.length} resultado{productosFiltrados.length === 1 ? '' : 's'}</p></div><span class="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">{productos.length}</span></div><label class="relative mt-4 block"><span class="sr-only">Buscar productos</span><input type="search" value={busqueda} onInput={cambiarBusqueda} placeholder="Buscar por nombre o propietario..." class="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" /></label></div>
    {visibles.length === 0 ? <div class="px-6 py-16 text-center sm:px-8"><div class="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-400">⌕</div><h3 class="mt-4 font-semibold text-slate-800">{productos.length ? 'No encontramos resultados' : 'Aún no hay productos'}</h3><p class="mt-1 text-sm text-slate-500">{productos.length ? 'Prueba con otro término de búsqueda.' : 'Crea el primero desde el formulario superior.'}</p></div> : <ul class="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">{visibles.map((producto) => <li key={producto.id} class="group rounded-xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"><div class="flex items-start justify-between gap-3"><div><p class="font-semibold text-slate-800">{producto.nombre}</p><p class="mt-1 text-lg font-bold text-indigo-700">{moneda.format(Number(producto.precio))}</p></div><span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">#{producto.id}</span></div>{producto.usuario_nombre && <p class="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500"><span class="font-semibold text-slate-600">Propietario:</span> {producto.usuario_nombre}<br />{producto.usuario_email}</p>}<div class="mt-4 flex gap-2"><button type="button" onClick={() => onEditar(producto)} aria-label={`Editar ${producto.nombre}`} class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Editar</button><button type="button" onClick={() => onEliminar(producto)} aria-label={`Eliminar ${producto.nombre}`} class="flex-1 rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">Eliminar</button></div></li>)}</ul>}
    {productosFiltrados.length > TAMANO_PAGINA && <nav aria-label="Paginación de productos" class="flex items-center justify-between border-t border-slate-100 px-6 py-4 sm:px-8"><button type="button" onClick={() => setPagina((actual) => Math.max(1, actual - 1))} disabled={paginaActual === 1} class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Anterior</button><span class="text-sm text-slate-500">Página <strong class="text-slate-800">{paginaActual}</strong> de {totalPaginas}</span><button type="button" onClick={() => setPagina((actual) => Math.min(totalPaginas, actual + 1))} disabled={paginaActual === totalPaginas} class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Siguiente</button></nav>}
  </section>;
}

export default ProductoList;
