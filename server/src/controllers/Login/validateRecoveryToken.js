// src/controllers/Login/validateRecoveryToken.js
import jwt from "jsonwebtoken";

const validateRecoveryToken = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, "Secret_Recovery");
    return res.status(200).json({ valid: true, email: decoded.email });
  } catch (err) {
    return res.status(400).json({ valid: false, message: "Token inválido o expirado" });
  }
};

export default validateRecoveryToken;
