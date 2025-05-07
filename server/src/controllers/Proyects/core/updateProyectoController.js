// src/controllers/Proyects/core/updateProyectoController.js
import pool from "../../../models/db.js";
import getUserFromToken from "../../helpers/getUserFromToken.js";

const updateProyectoController = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, url, repositorio_github, publico, categorias, etiquetas, tecnologias } = req.body;

  const client = await pool.connect();
  try {
    // 1. Verificar usuario
    const { user } = await getUserFromToken(req);

    await client.query("BEGIN");

    // 2. Actualizar datos básicos
    const updateRes = await client.query(
      `UPDATE proyectos
         SET titulo = $1,
             descripcion = $2,
             url = $3,
             repositorio_github = $4,
             publico = $5
       WHERE id = $6
         AND id_usuario = $7`,
      [titulo, descripcion, url || null, repositorio_github || null, publico, id, user.id]
    );
    if (updateRes.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Proyecto no encontrado o no autorizado" });
    }

    // 3. Limpiar relaciones antiguas
    await client.query("DELETE FROM proyecto_categorias   WHERE id_proyecto = $1", [id]);
    await client.query("DELETE FROM proyecto_etiquetas   WHERE id_proyecto = $1", [id]);
    await client.query("DELETE FROM proyecto_tecnologias WHERE id_proyecto = $1", [id]);

    // 4. Insertar nuevas relaciones
    const insertPuente = async (tabla, campo, lista) => {
      for (const fk of lista) {
        await client.query(
          `INSERT INTO ${tabla} (id_proyecto, ${campo}) VALUES ($1, $2)`,
          [id, fk]
        );
      }
    };

    await insertPuente("proyecto_categorias",   "id_categoria",  categorias   || []);
    await insertPuente("proyecto_etiquetas",    "id_etiqueta",   etiquetas    || []);
    await insertPuente("proyecto_tecnologias",  "id_tecnologia", tecnologias  || []);

    await client.query("COMMIT");
    return res.json({ message: "Proyecto actualizado correctamente" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error al actualizar proyecto:", err);
    return res.status(500).json({ message: "Error al actualizar proyecto" });
  } finally {
    client.release();
  }
};

export default updateProyectoController;
