import pool from "../../../models/db.js";

export const createProyectoConRelaciones = async (
  proyecto,
  categorias,
  etiquetas,
  tecnologias,
  userId
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { titulo, descripcion, url, repositorio_github, publico } = proyecto;

    const res = await client.query(
      `INSERT INTO proyectos (id_usuario, titulo, descripcion, url, repositorio_github, publico)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [userId, titulo, descripcion, url, repositorio_github, publico]
    );

    const proyectoId = res.rows[0].id;

    // Relaciones
    // … dentro de createProyectoConRelaciones
    const insertPuente = async (tabla, campo, valores) => {
      const idCol = "id_proyecto"; // ← nombre real en las 3 tablas
      for (let item of valores) {
        await client.query(
          `INSERT INTO ${tabla} (${idCol}, ${campo}) VALUES ($1, $2)`,
          [proyectoId, item]
        );
      }
    };

    if (categorias?.length)
      await insertPuente("proyecto_categorias", "id_categoria", categorias);
    if (etiquetas?.length)
      await insertPuente("proyecto_etiquetas", "id_etiqueta", etiquetas);
    if (tecnologias?.length)
      await insertPuente("proyecto_tecnologias", "id_tecnologia", tecnologias);

    await client.query("COMMIT");
    return proyectoId;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
