import pool from "../../models/db.js";
import getUserFromToken from "../helpers/getUserFromToken.js";

const deleteProyect = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const { user } = await getUserFromToken(req);

    const result = await pool.query(
      "DELETE FROM proyectos WHERE id = $1 AND id_usuario = $2 RETURNING *",
      [id, user.id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "Proyecto no encontrado o no autorizado" });
    }

    res.status(200).json({ message: "Proyecto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar proyecto:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default deleteProyect;
