# Backend Base — Node.js + Express + Prisma ORM + Neon (PostgreSQL)

Proyecto base en **JavaScript moderno (ES Modules)** sin Docker ni TypeScript, pensado como plantilla limpia para un curso universitario práctico.

## Stack utilizado

- **Node.js** (ES Modules con `"type": "module"` y `--watch` nativo para desarrollo)
- **Express 5** (servidor HTTP y rutas REST)
- **CORS** y **dotenv**
- **Prisma ORM 7** (`prisma` + `@prisma/client` + `@prisma/adapter-pg`) conectado a **PostgreSQL en Neon**

---

## Estructura del proyecto

```text
clase_2/
├── prisma/
│   └── schema.prisma        # Modelos de base de datos (incluye modelo User de ejemplo)
├── src/
│   ├── controllers/         # Controladores de la aplicación
│   ├── lib/
│   │   └── prisma.js        # Instancia única (singleton) de PrismaClient
│   ├── middlewares/         # Middlewares personalizados (por ej. autenticación JWT)
│   ├── routes/              # Definición de rutas de Express
│   └── index.js             # Punto de entrada del servidor y GET /api/health
├── .env                     # Variables de entorno reales (ignorado por Git)
├── .env.example             # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── prisma7.config.js        # Configuración de Prisma 7 en JavaScript
```

---

## Resumen de los pasos de instalación realizados

1. **Inicializar el proyecto Node.js**
   ```bash
   npm init -y
   ```
   En `package.json` se configuró `"type": "module"` para habilitar ES Modules (`import`/`export`), `"main": "src/index.js"` y los scripts:
   - `"dev": "node --watch src/index.js"` (recarga automática sin `nodemon`)
   - `"start": "node src/index.js"`

2. **Instalar dependencias esenciales**
   ```bash
   npm install express cors dotenv @prisma/client @prisma/adapter-pg
   npm install -D prisma
   ```
   > **Nota sobre Prisma 7:** A partir de Prisma 7, `PrismaClient` requiere un *driver adapter* para conectarse directamente a PostgreSQL, por eso se incluye `@prisma/adapter-pg`.

3. **Inicializar y configurar Prisma para PostgreSQL**
   ```bash
   npx prisma init --datasource-provider postgresql
   ```
   - Se adaptó la configuración generada a JavaScript puro en `prisma7.config.js` (cargando `dotenv/config` y leyendo `process.env.DATABASE_URL`).
   - En `prisma/schema.prisma` se configuró `provider = "prisma-client-js"` para generar el cliente en JavaScript y se definió el modelo `User` (`id`, `email`, `name`, `password`, `createdAt`).
   - Se generó el cliente de Prisma:
     ```bash
     npx prisma generate
     ```

4. **Crear la estructura base en `src/`, `.env.example` y `.gitignore`**
   - `src/lib/prisma.js`: crea el adaptador `PrismaPg` con `DATABASE_URL` y exporta una instancia única de `PrismaClient`.
   - `src/index.js`: configura Express con `cors()`, `express.json()`, puerto desde `.env` y el endpoint `GET /api/health` usando `prisma.$queryRaw` (`SELECT 1`).
   - Carpetas listas para crecer: `src/routes/`, `src/controllers/` y `src/middlewares/`.
   - `.env.example` con `PORT=3000` y `DATABASE_URL` de ejemplo, y `.gitignore` excluyendo `node_modules` y `.env`.

---

## Cómo sincronizar con Neon y ejecutar el proyecto

1. **Configurar variables de entorno** (si aún no creaste `.env`):
   ```bash
   cp .env.example .env
   ```
   Edita `.env` y coloca tu cadena de conexión de Neon en `DATABASE_URL`.

2. **Sincronizar el esquema de Prisma con Neon:**
   ```bash
   npx prisma db push
   ```

3. **Levantar el servidor:**
   - Modo desarrollo (con recarga automática):
     ```bash
     npm run dev
     ```
   - Modo producción:
     ```bash
     npm start
     ```

4. **Probar la conexión:**
   Abre o consulta `GET http://localhost:3000/api/health`. Si todo está conectado correctamente, responderá con JSON `status: "ok"` y `database: "connected"`.
