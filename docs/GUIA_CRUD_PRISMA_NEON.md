# Guía: CRUD con Express, Prisma y Neon

Esta guía explica la estructura del CRUD de `User` implementado en `src/` siguiendo buenas prácticas (separación por capas) y cómo usar Prisma para sincronizar tu base de datos en **Neon**.

---

## 1. Estructura y explicación de cada archivo

### `src/lib/prisma.js`
Configura una única instancia reutilizable (singleton) de `PrismaClient` usando el adaptador `@prisma/adapter-pg` y la variable `DATABASE_URL` de `.env`. Evita abrir múltiples conexiones innecesarias en desarrollo.

### `src/services/user.service.js`
**Capa de acceso a datos.** Contiene exclusivamente las consultas a la base de datos con Prisma (`findMany`, `findUnique`, `create`, `update`, `delete`).
- **Buena práctica:** Usa `publicUserSelect` en todas las consultas para **nunca devolver el campo `password`** en las respuestas de la API.

### `src/controllers/user.controller.js`
**Capa de controladores (HTTP).** Recibe `req` y `res`, valida los datos de entrada (IDs numéricos válidos, campos obligatorios) y llama al servicio correspondiente.
- **Buena práctica:** Centraliza el manejo de errores de Prisma:
  - `P2002` (valor único duplicado, como `email`) $\rightarrow$ `409 Conflict`.
  - `P2025` (registro no encontrado al actualizar/eliminar) $\rightarrow$ `404 Not Found`.

### `src/routes/user.routes.js`
**Capa de rutas.** Define los endpoints RESTful del recurso `User` y los conecta con su controlador:
- `GET /api/users` $\rightarrow$ Listar todos los usuarios.
- `GET /api/users/:id` $\rightarrow$ Obtener un usuario por ID.
- `POST /api/users` $\rightarrow$ Crear un usuario.
- `PUT /api/users/:id` $\rightarrow$ Actualizar un usuario.
- `DELETE /api/users/:id` $\rightarrow$ Eliminar un usuario.

### `src/index.js`
Punto de entrada del servidor Express. Configura middlewares globales (`cors`, `express.json()`), mantiene `/api/health` y monta las rutas de usuarios en `/api/users`.

---

## 2. Cómo usar Prisma para subir cambios a Neon

Asegúrate de tener tu cadena de conexión de Neon en el archivo `.env`:

```env
DATABASE_URL="postgresql://usuario:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require"
```

### Flujo recomendado

1. **Editar el esquema** en `prisma/schema.prisma` (agregar modelos, columnas o relaciones).
2. **Subir cambios en desarrollo:**
   - **Opción rápida (sin historial de migraciones):**
     ```bash
     npx prisma db push
     ```
     Sincroniza directamente `prisma/schema.prisma` con tu base de datos en Neon.
   - **Opción con historial de migraciones (recomendada para proyectos en equipo/producción):**
     ```bash
     npx prisma migrate dev --name nombre_del_cambio
     ```
     Crea una carpeta en `prisma/migrations/` y aplica los cambios en Neon.
3. **Regenerar el cliente de Prisma** (si `db push` o `migrate` no lo hizo automáticamente, o tras clonar el repo):
   ```bash
   npx prisma generate
   ```
4. **Inspeccionar datos visualmente (opcional):**
   ```bash
   npx prisma studio
   ```
   Abre una interfaz web local para ver y editar los registros de Neon.

---

## 3. Ejemplos rápidos para probar el CRUD

Inicia el servidor con:

```bash
npm run dev
```

- **Crear usuario (`POST /api/users`):**
  ```bash
  curl -X POST http://localhost:3000/api/users \
    -H "Content-Type: application/json" \
    -d '{"email":"ana@ejemplo.com","name":"Ana","password":"secreto123"}'
  ```
- **Listar usuarios (`GET /api/users`):**
  ```bash
  curl http://localhost:3000/api/users
  ```
- **Actualizar usuario (`PUT /api/users/1`):**
  ```bash
  curl -X PUT http://localhost:3000/api/users/1 \
    -H "Content-Type: application/json" \
    -d '{"name":"Ana María"}'
  ```
- **Eliminar usuario (`DELETE /api/users/1`):**
  ```bash
  curl -X DELETE http://localhost:3000/api/users/1
  ```
