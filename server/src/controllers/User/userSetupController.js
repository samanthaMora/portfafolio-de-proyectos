// src/controllers/User/userSetupController.js
import fs from "fs";
import path from "path";
import axios from "axios";

const setupUserFolderAndAvatar = async (req, res) => {
  const { userId, username } = req.body;

  try {
    if (!userId || !username) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const userFolderPath = path.join("uploads", String(userId));
    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath, { recursive: true });
    }

    const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(username)}`;
    const avatarPath = path.join(userFolderPath, "avatar.svg");

    const response = await axios.get(avatarUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(avatarPath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    return res.status(200).json({ message: "Avatar y carpeta creados correctamente" });

  } catch (error) {
    console.error("Error al generar avatar o carpeta:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default setupUserFolderAndAvatar;
