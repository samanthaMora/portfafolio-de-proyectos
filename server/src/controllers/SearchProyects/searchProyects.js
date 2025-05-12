// src/controllers/busqueda/searchProyects.js
import pool from "../../models/db.js";

const searchProyects = async (req, res) => {
  const { query } = req.query;
  let { page = 1, limit = 5 } = req.query;

  // Validación mínima
  if (!query?.trim()) {
    return res.status(400).json({ message: "Parámetro `query` es requerido" });
  }

  page  = parseInt(page);
  limit = parseInt(limit);
  if (Number.isNaN(page)  || page  < 1) page  = 1;
  if (Number.isNaN(limit) || limit < 1) limit = 5;

  const offset = (page - 1) * limit;

  try {
    /* 1. Total de resultados (solo públicos) */
    const countResult = await pool.query(
      `
      SELECT COUNT(*) 
        FROM vista_proyectos_con_autor
       WHERE publico = true            -- ← nuevo filtro
         AND titulo  ILIKE $1
      `,
      [`%${query}%`]
    );
    const total       = parseInt(countResult.rows[0].count, 10);
    const totalPages  = Math.ceil(total / limit);

    /* 2. Datos paginados */
    const result = await pool.query(
      `
      SELECT *
        FROM vista_proyectos_con_autor
       WHERE publico = true            -- ← nuevo filtro
         AND titulo  ILIKE $1
       ORDER BY titulo
       LIMIT  $2
       OFFSET $3
      `,
      [`%${query}%`, limit, offset]
    );

    res.status(200).json({
      proyectos:  result.rows,
      total,
      totalPages,
      currentPage: page,
    });
  } catch (e) {
    console.error("Error en la base de datos:", e);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default searchProyects;
