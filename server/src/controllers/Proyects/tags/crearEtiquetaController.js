import pool from "../../../models/db.js";
import { createTag } from "../services/tagService.js";

const crearEtiquetaController = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre?.trim()) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }

  try {
    const nueva = await createTag(nombre.trim());
    return res.status(201).json(nueva);
  } catch (err) {
    if (err.code === "23505") {
      const { rows } = await pool.query(
        "SELECT id FROM etiquetas WHERE nombre = $1",
        [nombre.trim()]
      );
      return res.status(409).json({ id: rows[0].id, message: "Ya existe" });
    }
    console.error("Error al crear etiqueta:", err);
    res.status(500).json({ message: "Error al crear etiqueta" });
  }
};
export default crearEtiquetaController;
