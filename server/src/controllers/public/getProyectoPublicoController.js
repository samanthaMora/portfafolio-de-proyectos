import pool from "../../models/db.js";
import path from "path";
import fs from "fs/promises";

/**
 * GET /public/proyectos/:id
 * Devuelve datos del proyecto + arrays de nombres de imágenes y archivos repo.
 */
export const getProyectoPublico = async (req, res) => {
  const { id } = req.params;

  /* ------------------------------------------------------------------ */
  /* 1) Datos de la vista                                                */
  /* ------------------------------------------------------------------ */
  const { rows } = await pool.query(
    "SELECT * FROM vista_proyectos_publicos WHERE proyecto_id = $1",
    [id]
  );

  if (!rows.length) {
    return res.status(404).json({ message: "Proyecto no encontrado" });
  }

  const proyecto = rows[0];

  /* ------------------------------------------------------------------ */
  /* 2) Ficheros físicos (imágenes y repo)                              */
  /* ------------------------------------------------------------------ */
  const baseDir = path.join(
    process.cwd(),
    "uploads",
    proyecto.autor_id.toString(),
    id.toString()
  );

  // imágenes
  let imagenes = [];
  try {
    imagenes = await fs.readdir(path.join(baseDir, "images"));
  } catch (_) {
    /* carpeta vacía o no existe */
  }

  // archivos repo
  let repo_files = [];
  try {
    repo_files = await fs.readdir(path.join(baseDir, "repo"));
  } catch (_) {
    /* carpeta vacía o no existe */
  }

  /* ------------------------------------------------------------------ */
  res.json({
    ...proyecto,
    imagenes,     // ['foto.jpg', ...]
    repo_files,   // ['README.pdf', ...]
  });
};
