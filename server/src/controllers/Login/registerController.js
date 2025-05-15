// src/controllers/Login/registerController.js
import { handleRegisterWithVerification } from "../helpers/emailVerification.js";
import axios from "axios";
import https from "https";               // ← NUEVO
import dotenv from "dotenv";
dotenv.config();

const register = async (req, res) => {
  try {
    const result = await handleRegisterWithVerification(req.body);

    if (result.status !== 201) {
      return res.status(result.status).json({ message: result.message });
    }

    /*  🔐  Agente que omite la validación del certificado (hace la llamada segura,
        pero acepta tu certificado autofirmado)                          */
    const insecureAgent = new https.Agent({ rejectUnauthorized: false });

    await axios.post(
      `${process.env.BACKEND_URL}/user-setup`,
      {
        userId: result.userId,
        username: result.username,
      },
      { httpsAgent: insecureAgent }      // ← aquí lo aplicamos
    );

    return res.status(201).json({ message: result.message });
  } catch (e) {
    console.error("Error en registro:", e);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default register;
