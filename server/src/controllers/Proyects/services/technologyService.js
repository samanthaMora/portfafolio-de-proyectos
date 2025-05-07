import pool from "../../../models/db.js";

export const getAllTechnologies = async () => {
  const { rows } = await pool.query("SELECT * FROM tecnologias ORDER BY nombre");
  return rows;
};

export const createTechnology = async (nombre) => {
  const { rows } = await pool.query(
    "INSERT INTO tecnologias (nombre) VALUES ($1) RETURNING *",
    [nombre]
  );
  return rows[0];
};

export const deleteTechnology = async (id) => {
  await pool.query("DELETE FROM tecnologias WHERE id = $1", [id]);
};
