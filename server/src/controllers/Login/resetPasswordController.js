// src/controllers/Recovery/resetPasswordController.js
import pool from "../../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  console.log(token);
  console.log(newPassword);

  try {
    const decoded = jwt.verify(token, "Secret_Recovery");
    const email = decoded.email;

    const result = await pool.query("SELECT * FROM login WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE login SET password = $1, token_verificacion = null WHERE email = $2",
      [hashed, email]
    );

    return res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    return res.status(400).json({ message: "Token inválido o expirado" });
  }
};

export default resetPassword;
