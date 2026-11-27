import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn(
    "Advertencia: DATABASE_URL no está definida en el archivo .env."
  );
}

const adapter = new PrismaPg({ connectionString });

// Instancia única de PrismaClient reutilizable en toda la aplicación
const prisma = globalThis.__prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

export { prisma };
export default prisma;
