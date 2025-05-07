import pool from "../../../models/db.js";

const obtenerProyectosController = async (req, res) => {
  try {
    const { rows: proyectos } = await pool.query(`
      SELECT p.*,
        json_agg(DISTINCT c.nombre) AS categorias,
        json_agg(DISTINCT e.nombre) AS etiquetas,
        json_agg(DISTINCT t.nombre) AS tecnologias
      FROM proyectos p
      LEFT JOIN proyecto_categorias pc ON p.id = pc.proyecto_id
      LEFT JOIN categorias c ON pc.categoria_id = c.id
      LEFT JOIN proyecto_etiquetas pe ON p.id = pe.proyecto_id
      LEFT JOIN etiquetas e ON pe.etiqueta_id = e.id
      LEFT JOIN proyecto_tecnologias pt ON p.id = pt.proyecto_id
      LEFT JOIN tecnologias t ON pt.tecnologia_id = t.id
      WHERE p.publico = true
      GROUP BY p.id
      ORDER BY p.fecha_creacion DESC
    `);

    res.json(proyectos);
  } catch (err) {
    console.error("Error al obtener proyectos:", err);
    res.status(500).json({ message: "Error al obtener proyectos" });
  }
};

export default obtenerProyectosController;
