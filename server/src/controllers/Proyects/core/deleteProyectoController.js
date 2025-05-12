// server/src/controllers/Proyects/core/deleteProyectoController.js
import pool from "../../../models/db.js";
import getUserFromToken from "../../helpers/getUserFromToken.js";
import { promises as fs } from "fs";
import path from "path";

const deleteProyectoController = async (req, res) => {
  const { id } = req.params;

  // Intentamos obtener el userId para borrar la carpeta
  let userId;
  try {
    const { user } = await getUserFromToken(req);
    userId = user.id;
  } catch (tokenErr) {
    console.error("Error obteniendo usuario del token:", tokenErr);
    // Seguimos con userId indefinido
  }

  const client = await pool.connect();

  try {
    // Inicia transacción
    await client.query("BEGIN");

    // 1) Elimina relaciones en tablas puente
    await client.query(
      "DELETE FROM proyecto_categorias WHERE id_proyecto = $1",
      [id]
    );
    await client.query(
      "DELETE FROM proyecto_etiquetas WHERE id_proyecto = $1",
      [id]
    );
    await client.query(
      "DELETE FROM proyecto_tecnologias WHERE id_proyecto = $1",
      [id]
    );

    // 2) Elimina el proyecto principal
    const { rowCount } = await client.query(
      "DELETE FROM proyectos WHERE id = $1",
      [id]
    );

    if (rowCount === 0) {
      // No existe ese proyecto
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    // 3) Confirma la transacción
    await client.query("COMMIT");

    // 4) Borra la carpeta uploads/<userId>/<projectId>
    if (userId) {
      const projectDir = path.resolve(
        "uploads",
        String(userId),
        String(id)
      );
      try {
        await fs.rm(projectDir, { recursive: true, force: true });
        console.debug(`Carpeta del proyecto eliminada: ${projectDir}`);
      } catch (fsErr) {
        console.error(
          "Error eliminando carpeta del proyecto:",
          fsErr
        );
      }
    }

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
