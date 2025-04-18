// src/helpers/emailVerification.js
import pool from "../../models/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "./mailerVerfiy.js";

export const handleRegisterWithVerification = async ({ email, pass, user }) => {
  const exist = await pool.query("SELECT * FROM login WHERE email = $1", [email]);
  if (exist.rows.length > 0) {
    return { status: 409, message: "El usuario ya existe" };
  }

  if (!email || !pass || !user) {
    return { status: 400, message: "Todos los campos son obligatorios" };
  }

  const hashedPassword = await bcrypt.hash(pass, 10);
  const token = jwt.sign({ email }, "Secret_Verification", { expiresIn: "15m" });

  const insert = await pool.query(
    `INSERT INTO login (email, password, username, verificado, token_verificacion)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [email, hashedPassword, user, false, token]
  );

  const userId = insert.rows[0].id;

  await sendVerificationEmail(email, token);

  return {
    status: 201,
    message: "Usuario registrado, revisa tu correo para confirmar.",
    userId,
    username: user,
  };
};
