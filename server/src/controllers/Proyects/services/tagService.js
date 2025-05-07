import pool from "../../../models/db.js";

export const getAllTags = async () => {
  const { rows } = await pool.query("SELECT * FROM etiquetas ORDER BY nombre");
  return rows;
};

export const createTag = async (nombre) => {
  const { rows } = await pool.query(
    "INSERT INTO etiquetas (nombre) VALUES ($1) RETURNING *",
    [nombre]
  );
  return rows[0];
};

export const deleteTag = async (id) => {
  await pool.query("DELETE FROM etiquetas WHERE id = $1", [id]);
};
