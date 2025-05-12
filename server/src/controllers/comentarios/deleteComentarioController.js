import pool from "../../models/db.js";

export const deleteComentario = async (req, res) => {
  const { id }      = req.params;       // id del comentario
  const id_usuario  = req.user.id;

  // comprobar autor
  const { rows } = await pool.query(
    "SELECT id_usuario FROM comentarios WHERE id = $1",
    [id]
  );
  if (!rows.length)
    return res.status(404).json({ message: "Comentario no encontrado" });

  if (rows[0].id_usuario !== id_usuario)
    return res.status(403).json({ message: "No autorizado" });

  // borrar
  await pool.query("DELETE FROM comentarios WHERE id = $1", [id]);
  res.sendStatus(204);
};
