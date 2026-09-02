function ConfirmarEliminacion({ producto, eliminando, onCancelar, onConfirmar }) {
  if (!producto) return null;

  return (
    <div class="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4" role="presentation">
      <section role="dialog" aria-modal="true" aria-labelledby="titulo-confirmacion" class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div class="flex size-11 items-center justify-center rounded-full bg-rose-100 text-xl text-rose-700" aria-hidden="true">!</div>
        <h2 id="titulo-confirmacion" class="mt-4 text-xl font-bold text-slate-900">¿Eliminar producto?</h2>
        <p class="mt-2 text-slate-600">Eliminarás <strong>{producto.nombre}</strong>. Esta acción no se puede deshacer.</p>
        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancelar} disabled={eliminando} class="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed">Cancelar</button>
          <button type="button" onClick={onConfirmar} disabled={eliminando} class="rounded-lg bg-rose-600 px-4 py-2.5 font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-300">{eliminando ? 'Eliminando...' : 'Sí, eliminar'}</button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmarEliminacion;
