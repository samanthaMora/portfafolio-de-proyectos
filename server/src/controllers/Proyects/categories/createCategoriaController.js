import pool from "../../../models/db.js";
import { createCategory } from "../services/categoryService.js";

const createCategoriaController = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre?.trim()) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }

  try {
    const nueva = await createCategory(nombre.trim());
    return res.status(201).json(nueva);
  } catch (err) {
    if (err.code === "23505") {                       // conflicto UNIQUE
      const { rows } = await pool.query(
        "SELECT id FROM categorias WHERE nombre = $1",
        [nombre.trim()]
      );
      return res.status(409).json({ id: rows[0].id, message: "Ya existe" });
    }
    console.error("Error al crear categoría:", err);
    res.status(500).json({ message: "Error al crear categoría" });
  }
};
export default createCategoriaController;