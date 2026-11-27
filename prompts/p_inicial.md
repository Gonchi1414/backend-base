Crea un proyecto base de backend con Node.js, Express y Prisma ORM configurado para conectarse a PostgreSQL en Neon. 

Requisitos técnicos:
1. NO uses Docker ni TypeScript (usa JavaScript moderno con ES Modules: `"type": "module"` en el `package.json`).
2. Inicializa el proyecto con `npm init -y` e instala solo lo esencial: `express`, `cors`, `dotenv`, `@prisma/client` y `prisma` (como devDependency).
3. En `package.json`, agrega los scripts:
   - `"dev": "node --watch src/index.js"` (para recarga automática sin instalar nodemon)
   - `"start": "node src/index.js"`
4. Inicializa Prisma para PostgreSQL (`npx prisma init --datasource-provider postgresql`).
5. En `prisma/schema.prisma`, crea un modelo de ejemplo sencillo (por ejemplo, `User` con `id`, `email`, `name`, `password`, `createdAt`) para poder probar la conexión.
6. Crea la siguiente estructura de carpetas dentro de `src/`:
   - `src/index.js` (servidor Express con `cors`, `express.json()` y puerto desde `.env`)
   - `src/lib/prisma.js` (instancia única de PrismaClient exportada)
   - `src/routes/` (carpeta lista para rutas)
   - `src/controllers/` (carpeta lista para controladores)
   - `src/middlewares/` (carpeta lista para middlewares como JWT)
7. Agrega un endpoint `GET /api/health` en `src/index.js` que haga una consulta simple a la base de datos con Prisma (`$queryRaw`) para verificar que el servidor y Neon están conectados correctamente.
8. Crea un archivo `.env.example` con las variables `PORT=3000` y `DATABASE_URL="postgresql://usuario:password@host.neon.tech/neondb?sslmode=require"`, y asegúrate de que `.env` y `node_modules` estén en el `.gitignore`.

Al terminar, indícame los comandos exactos para sincronizar el esquema con Neon (`npx prisma db push`) y levantar el servidor.