import pool from "../../models/db.js";
import getUserFromToken from "../helpers/getUserFromToken.js";

const viewMyProyects = async (req, res) => {
  try {
    const { user } = await getUserFromToken(req);

    const result = await pool.query(
      "SELECT id, titulo, descripcion FROM proyectos WHERE id_usuario = $1",
      [user.id]
    );

    res.status(200).json({ proyectos: result.rows });
  } catch (e) {
    console.error("Error en la base de datos:", e);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export default viewMyProyects;
