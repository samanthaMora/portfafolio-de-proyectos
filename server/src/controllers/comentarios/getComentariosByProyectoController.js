import pool from "../../models/db.js";

/**
 * GET /public/proyectos/:id/comentarios
 * Devuelve todos los comentarios del proyecto ordenados del más reciente al más antiguo.
 * [
 *   { id, id_usuario, username, contenido, fecha },
 *   ...
 * ]
 */
export const getComentariosByProyecto = async (req, res) => {
  const { id } = req.params;              // id del proyecto

  const { rows } = await pool.query(
    `SELECT
        c.id,
        c.id_usuario,
        l.username,
        c.contenido,
        c.fecha
     FROM comentarios c
     JOIN login l ON l.id = c.id_usuario
     WHERE c.id_proyecto = $1
     ORDER BY c.fecha DESC`,
    [id]
  );

  res.json(rows);
};
