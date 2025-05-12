// File: src/controllers/Proyects/core/uploadImagesController.js
import getUserFromToken from "../../helpers/getUserFromToken.js";

const uploadImagesController = async (req, res) => {
  try {
    // Solo para asegurarnos que el token es válido
    await getUserFromToken(req);

    // Multer ya puso los archivos en uploads/<userId>/<projectId>/images
    const files = req.files.map((f) => f.filename);
    return res.json({ message: "Imágenes subidas", files });
  } catch (err) {
    console.error("Error en uploadImagesController:", err);
    return res.status(500).json({ message: "Error al subir imágenes" });
  }
};

export default uploadImagesController;

