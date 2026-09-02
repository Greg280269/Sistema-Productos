import { useEffect, useState } from 'preact/hooks';

function ProductoForm({ producto, guardando, onGuardar, onCancelar, onError }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const editando = producto !== null;

  useEffect(() => {
    setNombre(producto?.nombre ?? '');
    setPrecio(producto?.precio ?? '');
  }, [producto]);

  const enviar = async (event) => {
    event.preventDefault();
    const nombreLimpio = nombre.trim();
    const precioNumero = Number(precio);
    if (!nombreLimpio || !Number.isFinite(precioNumero) || precioNumero <= 0) {
      onError('Completa el nombre y un precio mayor que cero.');
      return;
    }
    await onGuardar({ nombre: nombreLimpio, precio: precioNumero });
  };

  return <><div class="mb-5 flex items-center justify-between gap-4"><h2 class="text-xl font-semibold text-slate-800">{editando ? 'Editar producto' : 'Nuevo producto'}</h2>{editando && <button type="button" onClick={onCancelar} class="text-sm font-medium text-slate-500 hover:text-slate-800">Cancelar edición</button>}</div><form onSubmit={enviar} class="grid gap-4 sm:grid-cols-[1fr_11rem_auto] sm:items-end"><label class="grid gap-1.5 text-sm font-medium text-slate-700">Nombre<input type="text" value={nombre} onInput={(event) => setNombre(event.currentTarget.value)} placeholder="Ej. Teclado mecánico" required class="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></label><label class="grid gap-1.5 text-sm font-medium text-slate-700">Precio (S/)<input type="number" value={precio} onInput={(event) => setPrecio(event.currentTarget.value)} placeholder="0.00" min="0.01" step="0.01" required class="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></label><button type="submit" disabled={guardando} class="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300">{guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Agregar'}</button></form></>;
}

export default ProductoForm;
