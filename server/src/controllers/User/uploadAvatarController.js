// src/controllers/User/uploadAvatarController.js
import fs from "fs";
import path from "path";
import sharp from "sharp";
import getUserFromToken from "../helpers/getUserFromToken.js";

const uploadAvatar = async (req, res) => {
  try {
    const { user } = await getUserFromToken(req);
    const userFolder = path.join("uploads", String(user.id));

    if (!req.file) {
      return res.status(400).json({ message: "No se envió ninguna imagen" });
    }

    // Crear carpeta si no existe
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }

    // 🔥 Eliminar cualquier imagen anterior (svg, jpg, png, webp)
    const oldExtensions = [".svg", ".jpg", ".jpeg", ".png", ".webp"];
    for (const ext of oldExtensions) {
      const oldPath = path.join(userFolder, `avatar${ext}`);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // 🔄 Convertimos todo a JPG por consistencia
    const avatarPath = path.join(userFolder, "avatar.jpg");
    const buffer = await sharp(req.file.buffer)
      .resize(200, 200)
      .jpeg({ quality: 90 })
      .toBuffer();

    fs.writeFileSync(avatarPath, buffer);

    return res.status(200).json({ message: "Avatar actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al subir avatar:", error);
    return res.status(500).json({ message: "Error al subir imagen" });
  }
};

export default uploadAvatar;



