# Project1: gestión de productos

Aplicación full-stack para practicar un CRUD: Preact + Vite en el frontend, Express en el backend y PostgreSQL como base de datos.

## Preparación inicial

1. Crea una base de datos PostgreSQL llamada `productos_db`.
2. Copia `Backend/.env.example` como `Backend/.env` y completa tus credenciales locales.
3. Ejecuta el esquema:

   ```powershell
   psql -U postgres -d productos_db -f Backend/database/schema.sql
   ```

4. Instala dependencias y levanta cada aplicación en terminales distintas:

   ```powershell
   cd Backend
   npm.cmd install
   npm.cmd start
   ```

   ```powershell
   cd Frontend
   npm.cmd install
   npm.cmd run dev
   ```

Abre la dirección que Vite muestre, normalmente `http://localhost:5173`.

## Pruebas automáticas

Las pruebas de la API no usan PostgreSQL: simulan las consultas para comprobar rutas, validaciones y códigos HTTP.

```powershell
cd Backend
npm.cmd test
```

## Rutas de la API

| Método | Ruta | Acción |
| --- | --- | --- |
| GET | `/api/productos` | Lista productos |
| GET | `/api/productos/:id` | Obtiene un producto |
| POST | `/api/productos` | Crea un producto |
| PUT | `/api/productos/:id` | Actualiza un producto |
| DELETE | `/api/productos/:id` | Elimina un producto |

## Autenticación

Antes de usar productos, registra un usuario o inicia sesión:

```text
POST /api/auth/registro  { nombre, email, password }
POST /api/auth/login     { email, password }
POST /api/auth/logout
GET  /api/auth/sesion
```

Las rutas de productos requieren la cookie de sesión. Los compradores solo reciben sus propios productos; los administradores pueden consultar todos. Si ya tenías una tabla `productos`, ejecuta el `ALTER TABLE` incluido en `Backend/database/schema.sql` y asigna las filas antiguas a un usuario antes de usarlas.

Ejemplo de cuerpo para crear o actualizar:

```json
{
  "nombre": "Teclado mecánico",
  "precio": 189.90
}

## Preparación para V1

Puedes desplegar el frontend como sitio estático y el backend como servicio Node. Configura estas variables en el proveedor del backend:

```env
DB_HOST=host-de-tu-postgres
DB_PORT=5432
DB_NAME=project1
DB_USER=usuario-de-produccion
DB_PASSWORD=clave-de-produccion
DB_SSL=true
JWT_SECRET=una-clave-aleatoria-larga
FRONTEND_URL=https://tu-frontend.example.com
```

Usa `npm install` como instalación y `npm start` como comando de inicio en `Backend`. Para `Frontend`, usa `npm run build` y publica la carpeta `dist`; define `VITE_API_URL` con la URL pública del backend, por ejemplo `https://tu-backend.example.com/api/productos`.

Comprueba el despliegue visitando `https://tu-backend.example.com/health`, que debe responder `{ "estado": "ok" }`.
```
