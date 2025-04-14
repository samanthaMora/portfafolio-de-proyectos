import pool from "../../models/db.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { email, pass, user } = req.body;
  try {
    const exist = await pool.query("SELECT * FROM login WHERE email = $1", [
      email,
    ]);
    if (exist.rows.length > 0) {
      return res.status(409).json({ message: "el usuario ya existe" });
    }

    if (!email || !pass || !user) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const hashedPasword = await bcrypt.hash(pass, 10);

    await pool.query(
      "INSERT INTO login (email, password, username) VALUES ($1, $2, $3)",
      [email, hashedPasword, user]
    );

    res.status(201).json({ message: "el usuario registrado" });
  } catch (e) {
    console.error("Error en registro:", e);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export default register;
