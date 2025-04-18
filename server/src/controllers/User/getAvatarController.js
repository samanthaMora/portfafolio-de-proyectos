// src/controllers/User/getAvatarController.js
import path from "path";
import fs from "fs";
import getUserFromToken from "../helpers/getUserFromToken.js";

const getAvatar = async (req, res) => {
  try {
    const { user } = await getUserFromToken(req);
    const userFolder = path.join("uploads", String(user.id));

    if (!fs.existsSync(userFolder)) {
      return res.status(404).json({ message: "Carpeta del usuario no encontrada" });
    }

    const files = fs.readdirSync(userFolder);
    const avatarFile = files.find(file => file.startsWith("avatar."));

    if (!avatarFile) {
      return res.status(404).json({ message: "Avatar no encontrado" });
    }

    const publicUrl = `/uploads/${user.id}/${avatarFile}`;
    return res.status(200).json({ avatarUrl: publicUrl });

  } catch (error) {
    console.error("❌ Error al obtener avatar:", error);
    return res.status(error.code || 500).json({ message: error.message || "Error interno del servidor" });
  }
};

export default getAvatar;
