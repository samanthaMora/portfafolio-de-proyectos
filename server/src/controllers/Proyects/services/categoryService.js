import pool from "../../../models/db.js";

export const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categorias ORDER BY nombre");
  return rows;
};

export const createCategory = async (nombre) => {
  const { rows } = await pool.query(
    "INSERT INTO categorias (nombre) VALUES ($1) RETURNING *",
    [nombre]
  );
  return rows[0];
};

export const deleteCategory = async (id) => {
  await pool.query("DELETE FROM categorias WHERE id = $1", [id]);
};
