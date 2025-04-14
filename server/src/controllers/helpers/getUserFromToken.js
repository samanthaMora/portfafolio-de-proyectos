// helpers/getUserFromToken.js
import jwt from "jsonwebtoken";
import pool from "../../models/db.js";

const getUserFromToken = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw { code: 401, message: "Token no proporcionado o mal formado" };
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "Stack");
    const result = await pool.query("SELECT * FROM login WHERE email = $1", [
      decoded.email,
    ]);
    if (result.rows.length === 0) {
      throw { code: 404, message: "Usuario no encontrado" };
    }
    return {
      user: result.rows[0],
      decoded,
    };
  } catch (err) {
    if (err.code && err.message) throw err;
    throw { code: 403, message: "Token inválido o expirado" };
  }
};

export default getUserFromToken;
