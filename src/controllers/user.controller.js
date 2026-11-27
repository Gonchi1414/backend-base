import * as userService from "../services/user.service.js";

function parseId(rawId) {
  const id = Number(rawId);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function handlePrismaError(error, res) {
  if (error?.code === "P2002") {
    return res.status(409).json({
      error: "El email ya está registrado.",
    });
  }
  if (error?.code === "P2025") {
    return res.status(404).json({
      error: "Usuario no encontrado.",
    });
  }
  console.error("Error en controlador de usuarios:", error);
  return res.status(500).json({
    error: "Error interno del servidor.",
  });
}

export async function listUsers(_req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function getUser(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID de usuario inválido." });
  }

  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    return res.json(user);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function createUser(req, res) {
  const { email, name, password } = req.body ?? {};
  if (!email || !name || !password) {
    return res.status(400).json({
      error: "Los campos email, name y password son obligatorios.",
    });
  }

  try {
    const user = await userService.createUser({ email, name, password });
    return res.status(201).json(user);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function updateUser(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID de usuario inválido." });
  }

  const { email, name, password } = req.body ?? {};
  const dataToUpdate = {};
  if (email !== undefined) dataToUpdate.email = email;
  if (name !== undefined) dataToUpdate.name = name;
  if (password !== undefined) dataToUpdate.password = password;

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).json({
      error: "Debes enviar al menos un campo para actualizar (email, name o password).",
    });
  }

  try {
    const user = await userService.updateUser(id, dataToUpdate);
    return res.json(user);
  } catch (error) {
    return handlePrismaError(error, res);
  }
}

export async function deleteUser(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "ID de usuario inválido." });
  }

  try {
    const deleted = await userService.deleteUser(id);
    return res.json({
      message: "Usuario eliminado correctamente.",
      user: deleted,
    });
  } catch (error) {
    return handlePrismaError(error, res);
  }
}
