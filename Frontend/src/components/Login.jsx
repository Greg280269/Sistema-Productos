import { useState } from 'preact/hooks';

function Login({ onLogin, onRegister }) {
  const [modoRegistro, setModoRegistro] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async (event) => {
    event.preventDefault(); setError(''); setEnviando(true);
    try {
      if (modoRegistro) await onRegister({ nombre, email, password });
      else await onLogin({ email, password });
    } catch (problema) { setError(problema.message); }
    finally { setEnviando(false); }
  };

  return <main class="grid min-h-screen place-items-center bg-gradient-to-br from-indigo-600 to-cyan-500 px-4"><form onSubmit={enviar} class="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"><p class="text-sm font-semibold tracking-widest text-indigo-600 uppercase">Inventario simple</p><h1 class="mt-2 text-3xl font-bold text-slate-900">{modoRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</h1><p class="mt-2 text-slate-500">{modoRegistro ? 'Regístrate para comenzar.' : 'Ingresa para administrar tus productos.'}</p><div class="mt-6 grid gap-4">{modoRegistro && <label class="grid gap-1.5 text-sm font-medium text-slate-700">Nombre<input type="text" value={nombre} onInput={(event) => setNombre(event.currentTarget.value)} required class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></label>}<label class="grid gap-1.5 text-sm font-medium text-slate-700">Email<input type="email" value={email} onInput={(event) => setEmail(event.currentTarget.value)} required class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></label><label class="grid gap-1.5 text-sm font-medium text-slate-700">Contraseña<input type="password" value={password} onInput={(event) => setPassword(event.currentTarget.value)} minLength="8" required class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100" /></label>{error && <p role="alert" class="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}<button type="submit" disabled={enviando} class="rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:bg-indigo-300">{enviando ? 'Procesando...' : modoRegistro ? 'Crear cuenta' : 'Ingresar'}</button><button type="button" onClick={() => { setModoRegistro(!modoRegistro); setError(''); }} class="text-sm font-medium text-indigo-600 hover:text-indigo-800">{modoRegistro ? 'Ya tengo una cuenta' : 'Crear una cuenta nueva'}</button></div></form></main>;
}

export default Login;
