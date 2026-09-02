function Mensaje({ mensaje }) {
  if (!mensaje) return null;

  const clases = mensaje.tipo === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700';
  return <p role="status" class={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${clases}`}>{mensaje.texto}</p>;
}

export default Mensaje;
