import pool from "../../models/db.js";
import jwt from "jsonwebtoken";

// verifyEmailController.js
const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, "Secret_Verification");
    const email = decoded.email;

    const result = await pool.query("SELECT * FROM login WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    if (user.verificado) {
      return res.status(200).json({ message: "Usuario ya estaba verificado" });
    }

    await pool.query(
      "UPDATE login SET verificado = true, token_verificacion = null WHERE email = $1",
      [email]
    );

    return res.status(200).json({ message: "Correo verificado correctamente" });

  } catch (e) {
    console.error("Error al verificar el correo:", e);
    return res.status(400).json({ message: "Token inválido o expirado" });
  }
};


export default verifyEmail;

