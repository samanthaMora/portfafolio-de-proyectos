// server/src/controllers/Proyects/core/obtenerProyectoController.js
import pool from "../../../models/db.js";

const obtenerProyectoController = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      `
      SELECT
        p.*,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', c.id, 'nombre', c.nombre))
            FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS categorias,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', t.id, 'nombre', t.nombre))
            FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) AS etiquetas,
        COALESCE(
          json_agg(DISTINCT jsonb_build_object('id', tec.id, 'nombre', tec.nombre))
            FILTER (WHERE tec.id IS NOT NULL),
          '[]'
        ) AS tecnologias
      FROM proyectos p
      LEFT JOIN proyecto_categorias pc ON pc.id_proyecto = p.id
      LEFT JOIN categorias c            ON c.id = pc.id_categoria
      LEFT JOIN proyecto_etiquetas pe   ON pe.id_proyecto = p.id
      LEFT JOIN etiquetas t             ON t.id = pe.id_etiqueta
      LEFT JOIN proyecto_tecnologias pt ON pt.id_proyecto = p.id
      LEFT JOIN tecnologias tec         ON tec.id = pt.id_tecnologia
      WHERE p.id = $1
      GROUP BY p.id
      `,
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: "Proyecto no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error al obtener proyecto:", err);
    res.status(500).json({ message: "Error al obtener proyecto" });
  }
};

export default obtenerProyectoController;

