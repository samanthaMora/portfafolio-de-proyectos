// controllers/calificaciones/obtenerCalificacionProyecto.js
import pool from "../../models/db.js";
import getUserFromToken from "../helpers/getUserFromToken.js";

export const obtenerCalificacionProyecto = async (req, res) => {
  const { id: id_proyecto } = req.params;
  let userId = null;

  try {
    const auth = req.headers.authorization;
    if (auth?.startsWith("Bearer ")) {
      const { user } = await getUserFromToken(req);
      userId = user.id;
    }

    const result = await pool.query(`
      SELECT 
        ROUND(AVG(valor)::numeric, 1) AS promedio,
        COUNT(*) AS total,
        MAX(CASE WHEN id_usuario = $1 THEN valor ELSE NULL END) AS mi_valor
      FROM calificaciones
      WHERE id_proyecto = $2
    `, [userId, id_proyecto]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener calificaciones:", err);
    res.status(500).json({ message: "Error al obtener calificaciones" });
  }
};
