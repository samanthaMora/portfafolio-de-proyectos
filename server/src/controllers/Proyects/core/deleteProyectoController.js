// src/controllers/Proyects/core/deleteProyectoController.js
import pool from "../../../models/db.js";

const deleteProyectoController = async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    // Inicia transacción
    await client.query("BEGIN");

    // 1) Elimina relaciones
    await client.query(
      "DELETE FROM proyecto_categorias WHERE id_proyecto = $1",
      [id]
    );
    await client.query(
      "DELETE FROM proyecto_etiquetas  WHERE id_proyecto = $1",
      [id]
    );
    await client.query(
      "DELETE FROM proyecto_tecnologias WHERE id_proyecto = $1",
      [id]
    );

    // 2) Elimina el proyecto
    const { rowCount } = await client.query(
      "DELETE FROM proyectos WHERE id = $1",
      [id]
    );

    if (rowCount === 0) {
      // No existe ese proyecto
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    // Confirma la transacción
    await client.query("COMMIT");
    return res.json({ message: "Proyecto eliminado correctamente" });
  } catch (err) {
    // En caso de error, revierte
    await client.query("ROLLBACK");
    console.error("Error al eliminar proyecto:", err);
    return res.status(500).json({ message: "Error al eliminar proyecto" });
  } finally {
    client.release();
  }
};

export default deleteProyectoController;
