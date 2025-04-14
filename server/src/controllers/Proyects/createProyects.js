import pool from "../../models/db.js";
import getUserFromToken from "../helpers/getUserFromToken.js"

const createProyects = async (req, res) => {
  const { titulo, descripcion } = req.body;

  if (!titulo?.trim() || !descripcion?.trim()) {
    return res
      .status(400)
      .json({ message: "Título y descripción son requeridos" });
  }

  try {

    const { user } = await getUserFromToken(req);
    const exist = await pool.query(
      "SELECT * FROM proyectos WHERE titulo = $1 AND id_usuario = $2",
      [titulo, user.id]
    );
    if (exist.rows.length > 0) {
      return res.status(409).json({ message: "Ese proyecto ya existe" });
    }
    await pool.query(
      "INSERT INTO proyectos (id_usuario, titulo, descripcion) VALUES ($1, $2, $3)",
      [user.id, titulo, descripcion]
    );
    res.status(201).json({ message: "Proyecto creado" });
  } catch (e) {
    console.error("Error en registro:", e);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export default createProyects;
