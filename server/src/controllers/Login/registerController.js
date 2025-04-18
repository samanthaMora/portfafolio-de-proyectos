// src/controllers/Login/registerController.js
import { handleRegisterWithVerification } from "../helpers/emailVerification.js";
import axios from "axios";

const register = async (req, res) => {
  try {
    const result = await handleRegisterWithVerification(req.body);

    if (result.status !== 201) {
      return res.status(result.status).json({ message: result.message });
    }

    await axios.post("http://localhost:3000/user-setup", {
      userId: result.userId,
      username: result.username,
    });

    return res.status(201).json({ message: result.message });
  } catch (e) {
    console.error("Error en registro:", e);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default register;


