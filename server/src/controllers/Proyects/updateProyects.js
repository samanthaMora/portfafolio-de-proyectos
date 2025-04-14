import pool from "../../models/db.js";
import getUserFromToken from "../helpers/getUserFromToken.js";

const updateProyects = async (req, res) => {
  const { id, titulo, descripcion } = req.body;

  if (
    !id ||
    typeof id !== "number" ||
    !titulo?.trim() ||
    !descripcion?.trim()
  ) {
    return res
      .status(400)
      .json({ message: "ID (numérico), título y descripción son requeridos" });
  }

  try {
    const { user } = await getUserFromToken(req);

    const result = await pool.query(
      "SELECT * FROM proyectos WHERE id = $1 AND id_usuario = $2",
      [id, user.id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Proyecto no encontrado o no autorizado" });
    }

    await pool.query(
      "UPDATE proyectos SET titulo = $1, descripcion = $2 WHERE id = $3 AND id_usuario = $4",
      [titulo, descripcion, id, user.id]
    );

    res.status(200).json({ message: "Proyecto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar proyecto:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default updateProyects;
