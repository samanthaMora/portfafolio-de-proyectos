import jwt from "jsonwebtoken";

const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No se proporcionó refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, "StackRefresh");
    const newAccessToken = jwt.sign({ email: decoded.email }, "Stack", {
      expiresIn: "15m",
    });
    return res.status(200).json({ token: newAccessToken });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Refresh token inválido o expirado" });
  }
};

export default refresh;
