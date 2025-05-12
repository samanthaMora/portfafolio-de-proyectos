// server/src/controllers/Proyects/core/createProyectoController.js
import { createProyectoConRelaciones } from "../services/proyectoService.js";
import getUserFromToken from "../../helpers/getUserFromToken.js";
import { promises as fs } from "fs";
import path from "path";
import { cloneRepo } from "../../helpers/cloneRepo.js";

/**
 * Crea un proyecto, genera carpetas para images y repo,
 * y dispara clonación de repo en background.
 */
const createProyectoController = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      url,
      repositorio_github,
      publico,
      categorias,
      etiquetas,
      tecnologias,
    } = req.body;

    if (!titulo?.trim() || !descripcion?.trim()) {
      return res
        .status(400)
        .json({ message: "Título y descripción son requeridos" });
    }

    const { user } = await getUserFromToken(req);

    // 1️⃣ Crear proyecto en BD
    const proyectoId = await createProyectoConRelaciones(
      { titulo, descripcion, url, repositorio_github, publico },
      categorias,
      etiquetas,
      tecnologias,
      user.id
    );

    // 2️⃣ Definir carpetas
    const baseDir = path.resolve(
      "uploads",
      String(user.id),
      String(proyectoId)
    );
    const imagesDir = path.join(baseDir, "images");
    const repoDir = path.join(baseDir, "repo");

    // 3️⃣ Crear carpetas recursivamente
    await fs.mkdir(imagesDir, { recursive: true });
    await fs.mkdir(repoDir, { recursive: true });

    // 4️⃣ Disparar clonación de repositorio en background
    if (repositorio_github?.trim()) {
      cloneRepo(user.id, proyectoId, repositorio_github.trim())
        .catch((err) => console.error("Error clonando repo en background:", err));
    }

    // 5️⃣ Responder inmediatamente al cliente
    res.status(201).json({ message: "Proyecto creado", id: proyectoId });
  } catch (err) {
    console.error("Error al crear proyecto:", err);
    res.status(500).json({ message: "Error al crear proyecto" });
  }
};

export default createProyectoController;
