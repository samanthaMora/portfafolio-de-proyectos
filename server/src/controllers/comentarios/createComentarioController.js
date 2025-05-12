import pool from "../../models/db.js";

export const createComentario = async (req, res) => {
  const { id: id_proyecto } = req.params;
  const { contenido }       = req.body;
  const id_usuario          = req.user.id;

  if (!contenido?.trim()) {
    return res.status(400).json({ message: "Contenido vacío" });
  }

  const result = await pool.query(
    `INSERT INTO comentarios (id_proyecto, id_usuario, contenido)
       VALUES ($1,$2,$3)
       RETURNING id, fecha`,
    [id_proyecto, id_usuario, contenido.trim()]
  );

  res.status(201).json({
    id:        result.rows[0].id,
    fecha:     result.rows[0].fecha,
    contenido: contenido.trim(),
    id_usuario
  });
};
