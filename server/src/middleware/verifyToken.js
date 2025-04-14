import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token no proporcionado o mal formado" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "Stack", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }

    req.user = decoded;
    next();
  });
};

export default verifyToken;
