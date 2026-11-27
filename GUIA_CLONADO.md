# Cómo clonar este repositorio y subirlo como proyecto propio

Esta guía explica cómo usar este repositorio base para iniciar tu propio proyecto y subirlo a tu cuenta de GitHub de forma independiente.

---

## 1. Clonar el repositorio

Clona el proyecto en una carpeta con el nombre de tu nuevo proyecto y entra en ella:

```bash
git clone https://github.com/Gonchi1414/backend-base.git mi-nuevo-proyecto
cd mi-nuevo-proyecto
```

---

## 2. Desvincularlo del repositorio original

Elige una de estas dos opciones según cómo quieras manejar el historial de Git:

### Opción A (Recomendada): Empezar con un historial limpio desde cero

Elimina la carpeta `.git` original e inicializa un repositorio nuevo:

- **En Windows (PowerShell):**
  ```powershell
  Remove-Item -Recurse -Force .git
  ```
- **En Linux / macOS / Git Bash:**
  ```bash
  rm -rf .git
  ```

Luego crea tu primer commit:

```bash
git init -b main
git add .
git commit -m "Initial commit"
```

### Opción B: Mantener el historial y cambiar solo el remoto

Si prefieres conservar los commits existentes, simplemente cambia la URL de `origin` por la de tu repositorio (en el paso 3):

```bash
git remote set-url origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
```

---

## 3. Crear tu repositorio en GitHub y subir el código

1. Ve a GitHub y crea un repositorio nuevo **vacío** (no marques la opción de agregar `README`, `.gitignore` ni licencia).
2. Copia la URL HTTPS de tu nuevo repositorio y vincúlalo *(si usaste la Opción A)*:

   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   ```

3. Sube la rama `main` a tu repositorio:

   ```bash
   git push -u origin main
   ```

---

## 4. Configurar el entorno local para trabajar

Una vez clonado y vinculado a tu repositorio:

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Crea tu archivo `.env` a partir de `.env.example` y coloca tu `DATABASE_URL` de Neon:
   ```bash
   cp .env.example .env
   ```
3. Genera el cliente de Prisma y sincroniza el esquema con Neon:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
