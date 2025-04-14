import pool from "../../models/db.js";

const searchProyects = async (req, res) => {
  const { query } = req.query;
  let { page = 1, limit = 5 } = req.query; // valores por defecto

  // Asegúrate de que page y limit sean números válidos
  page = parseInt(page);
  limit = parseInt(limit);

  const offset = (page - 1) * limit;

  try {
    // 1. Contar el total de resultados
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM vista_proyectos_con_autor WHERE titulo ILIKE $1`,
      [`%${query}%`]
    );
    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    // 2. Obtener resultados con paginación
    const result = await pool.query(
      `
      SELECT * FROM vista_proyectos_con_autor
      WHERE titulo ILIKE $1
      ORDER BY titulo
      LIMIT $2 OFFSET $3
      `,
      [`%${query}%`, limit, offset]
    );

    res.status(200).json({
      proyectos: result.rows,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (e) {
    console.error("Error en la base de datos:", e);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export default searchProyects;
