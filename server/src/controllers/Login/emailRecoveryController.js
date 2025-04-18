import pool from "../../models/db.js";
import jwt from "jsonwebtoken";
import { sendRecoveryEmail } from "../helpers/mailerRecovery.js";

export const RecoveryEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Verifica si el correo existe
    const result = await pool.query("SELECT * FROM login WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "El correo no está registrado" });
    }
    const token = jwt.sign({ email }, "Secret_Recovery", { expiresIn: "15m" });

    await pool.query("UPDATE login SET token_verificacion = $1 WHERE email = $2", [token, email]);
    await sendRecoveryEmail(email, token);

    return res.status(200).json({ message: "Te hemos enviado un correo con instrucciones" });

  } catch (e) {
    console.error("Error en recuperación:", e);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
