// File: server/src/controllers/Proyects/core/listDeleteImagesControllers.js
import path from "path";
import { promises as fs } from "fs";
import getUserFromToken from "../../helpers/getUserFromToken.js";

/**
 * Lista los nombres de archivo en uploads/<userId>/<projectId>/images
 */
export const listImagesController = async (req, res) => {
  try {
    const { user } = await getUserFromToken(req);
    const projectId = req.params.id;
    const imagesDir = path.resolve(
      "uploads",
      String(user.id),
      String(projectId),
      "images"
    );

    // Asegura que existe
    await fs.mkdir(imagesDir, { recursive: true });

    const files = await fs.readdir(imagesDir);
    res.json({ images: files });
  } catch (err) {
    console.error("Error listando imágenes:", err);
    res.status(500).json({ message: "Error listando imágenes" });
  }
};

/**
 * Elimina un archivo de imágenes: uploads/<userId>/<projectId>/images/:filename
 */
export const deleteImageController = async (req, res) => {
  try {
    const { user } = await getUserFromToken(req);
    const projectId = req.params.id;
    const filename = req.params.filename;
    const filePath = path.resolve(
      "uploads",
      String(user.id),
      String(projectId),
      "images",
      filename
    );

    await fs.unlink(filePath);
    res.json({ message: "Imagen eliminada" });
  } catch (err) {
    console.error("Error eliminando imagen:", err);
    res.status(500).json({ message: "Error eliminando imagen" });
  }
};

// Rutas a añadir en router:
// proyectRouter.get("/:id/images", verifyToken, listImagesController);
// proyectRouter.delete("/:id/images/:filename", verifyToken, deleteImageController);


// --------------------------------------------------------------