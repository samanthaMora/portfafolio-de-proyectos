// controllers/calificaciones/crearOActualizarCalificacion.js
import pool from "../../models/db.js";
import getUserFromToken from "../helpers/getUserFromToken.js";

export const crearOActualizarCalificacion = async (req, res) => {
  const { id: id_proyecto } = req.params;
  const { valor } = req.body;

  if (!valor || valor < 1 || valor > 5)
    return res.status(400).json({ message: "Valor inválido (1–5)" });

  try {
    const { user } = await getUserFromToken(req);
    await pool.query(`
      INSERT INTO calificaciones (id_usuario, id_proyecto, valor)
      VALUES ($1, $2, $3)
      ON CONFLICT (id_usuario, id_proyecto)
      DO UPDATE SET valor = EXCLUDED.valor, fecha = CURRENT_TIMESTAMP
    `, [user.id, id_proyecto, valor]);

    res.json({ message: "Calificación registrada" });
  } catch (err) {
    console.error("Error al guardar calificación:", err);
    res.status(500).json({ message: "Error al guardar calificación" });
  }
};
