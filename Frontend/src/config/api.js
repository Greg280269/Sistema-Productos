const apiUrlConfigurada = import.meta.env.VITE_API_URL?.trim();

if (!apiUrlConfigurada) {
  console.warn('VITE_API_URL no está definida; se usará el backend local.');
}

export const API_URL = apiUrlConfigurada || 'http://localhost:3000/api/productos';
export const AUTH_URL = API_URL.replace(/\/productos$/, '/auth');
export const USUARIOS_URL = API_URL.replace(/\/productos$/, '/usuarios');
