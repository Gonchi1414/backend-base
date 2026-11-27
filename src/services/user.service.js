import prisma from "../lib/prisma.js";

// Campos públicos que se devuelven al cliente (nunca incluir password)
const publicUserSelect = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
};

export async function getAllUsers() {
  return prisma.user.findMany({
    select: publicUserSelect,
    orderBy: { id: "asc" },
  });
}

export async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: publicUserSelect,
  });
}

export async function createUser({ email, name, password }) {
  return prisma.user.create({
    data: { email, name, password },
    select: publicUserSelect,
  });
}

export async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
    select: publicUserSelect,
  });
}

export async function deleteUser(id) {
  return prisma.user.delete({
    where: { id },
    select: publicUserSelect,
  });
}
