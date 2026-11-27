import "dotenv/config";
import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Endpoint de salud para verificar el servidor y la conexión a Neon
app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    res.status(500).json({
      status: "error",
      database: "disconnected",
      message: "No se pudo conectar con la base de datos",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
