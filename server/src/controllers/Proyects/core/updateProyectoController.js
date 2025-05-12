// src/controllers/Proyects/core/updateProyectoController.js
import pool from "../../../models/db.js";
import getUserFromToken from "../../helpers/getUserFromToken.js";
import { promises as fs } from "fs";
import path from "path";
import { cloneRepo } from "../../helpers/cloneRepo.js";

const updateProyectoController = async (req, res) => {
  const { id } = req.params;
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

  const client = await pool.connect();
  try {
    /* 1) Verificar usuario ------------------------------------------------ */
    const { user } = await getUserFromToken(req);

    /* 2) Obtener URL antigua --------------------------------------------- */
    const oldRes = await client.query(
      `SELECT repositorio_github 
         FROM proyectos 
        WHERE id = $1 AND id_usuario = $2`,
      [id, user.id]
    );
    if (oldRes.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Proyecto no encontrado o no autorizado" });
    }
    const oldRepoUrl = oldRes.rows[0].repositorio_github;

    /* Iniciar transacción ------------------------------------------------- */
    await client.query("BEGIN");

    /* 3) Datos básicos ---------------------------------------------------- */
    const upd = await client.query(
      `UPDATE proyectos
          SET titulo            = $1,
              descripcion       = $2,
              url               = $3,
              repositorio_github= $4,
              publico           = $5
        WHERE id          = $6
          AND id_usuario  = $7`,
      [titulo, descripcion, url || null, repositorio_github || null, publico, id, user.id]
    );
    if (upd.rowCount === 0) {
      await client.query("ROLLBACK");
      return res
        .status(404)
        .json({ message: "Proyecto no encontrado o no autorizado" });
    }

    /* 4) Limpiar relaciones ---------------------------------------------- */
    await client.query("DELETE FROM proyecto_categorias   WHERE id_proyecto = $1", [id]);
    await client.query("DELETE FROM proyecto_etiquetas    WHERE id_proyecto = $1", [id]);
    await client.query("DELETE FROM proyecto_tecnologias  WHERE id_proyecto = $1", [id]);

    /* 5) Insertar nuevas relaciones -------------------------------------- */
    const insertPuente = async (tabla, campo, lista) => {
      for (const fk of lista || []) {
        await client.query(
          `INSERT INTO ${tabla}(id_proyecto, ${campo}) VALUES ($1,$2)`,
          [id, fk]
        );
      }
    };
    await insertPuente("proyecto_categorias",  "id_categoria",  categorias);
    await insertPuente("proyecto_etiquetas",   "id_etiqueta",   etiquetas);
    await insertPuente("proyecto_tecnologias", "id_tecnologia", tecnologias);

    /* 6) Commit ----------------------------------------------------------- */
    await client.query("COMMIT");

    /* 7) Manejo de carpeta repo ------------------------------------------ */
    const newRepoUrl = repositorio_github?.trim();
    const repoDir = path.resolve("uploads", String(user.id), String(id), "repo");

    try {
      /* 7a. Si NO hay nuevo repo pero sí había antiguo → borrar carpeta   */
      if (!newRepoUrl && oldRepoUrl) {
        await fs.rm(repoDir, { recursive: true, force: true });
      }

      /* 7b. Si cambió la URL → borrar y clonar en background             */
      if (newRepoUrl && newRepoUrl !== oldRepoUrl) {
        await fs.rm(repoDir, { recursive: true, force: true });

        // Clonar sin bloquear la respuesta
        cloneRepo(user.id, id, newRepoUrl).catch((err) =>
          console.error("Error clonando repo tras actualización:", err)
        );
      }
    } catch (fsErr) {
      console.error("Error manejando carpeta repo:", fsErr);
      // (no abortamos la petición porque los datos del proyecto ya se actualizaron)
    }

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
