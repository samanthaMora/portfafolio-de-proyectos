import pool from "../../../models/db.js";
import getUserFromToken from "../../helpers/getUserFromToken.js";

const listarMisProyectosController = async (req, res) => {
  try {
    // Extrae el usuario del token
    const { user } = await getUserFromToken(req);

    // Busca solo los proyectos de este usuario
    const { rows } = await pool.query(
      `SELECT id, titulo, fecha_creacion
         FROM proyectos
        WHERE id_usuario = $1
        ORDER BY fecha_creacion DESC`,
      [user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error al listar mis proyectos:", err);
    res.status(500).json({ message: "Error al obtener tus proyectos" });
  }
};

export default listarMisProyectosController;
