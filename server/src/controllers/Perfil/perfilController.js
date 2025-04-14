import getUserFromToken from "../helpers/getUserFromToken.js";

const perfil = async (req, res) => {
  try {
    const { user } = await getUserFromToken(req);

    return res.json({
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error("Error en perfil:", err);
    return res
      .status(err.code || 403)
      .json({ message: err.message || "Error inesperado" });
  }
};
export default perfil;
