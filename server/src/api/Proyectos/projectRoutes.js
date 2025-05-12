import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import sanitizeInput from "../../middleware/sanitizeInput.js";
import uploadProjectImages from "../../middleware/uploadProjectImages.js";

import createProyectoController from "../../controllers/Proyects/core/createProyectoController.js";
import updateProyectoController from "../../controllers/Proyects/core/updateProyectoController.js";
import deleteProyectoController from "../../controllers/Proyects/core/deleteProyectoController.js";
import obtenerProyectosController from "../../controllers/Proyects/core/obtenerProyectosController.js";
import listarMisProyectosController from "../../controllers/Proyects/core/listarMisProyectosController.js";
import obtenerProyectoController from "../../controllers/Proyects/core/obtenerProyectoController.js";
import uploadImagesController from "../../controllers/Proyects/core/uploadImagesController.js"
import {
  listImagesController,
  deleteImageController
} from "../../controllers/Proyects/core/listDeleteImagesControllers.js";

const proyectRouter = express.Router();

proyectRouter.post(
  "/",
  verifyToken,
  sanitizeInput(["titulo", "descripcion", "url", "repositorio_github"]),
  createProyectoController
);
proyectRouter.put(
  "/:id",
  verifyToken,
  sanitizeInput(["titulo", "descripcion", "url", "repositorio_github"]),
  updateProyectoController
);
proyectRouter.post(
  "/:id/images",
  verifyToken,
  uploadProjectImages,      // multer ya maneja req, res, next
  uploadImagesController
);

// Listar imágenes existentes
proyectRouter.get(
  "/:id/images",
  verifyToken,
  listImagesController
);

// Eliminar imagen específica
proyectRouter.delete(
  "/:id/images/:filename",
  verifyToken,
  deleteImageController
);

proyectRouter.delete("/:id", verifyToken, deleteProyectoController);
proyectRouter.get("/publicos", obtenerProyectosController);
proyectRouter.get("/mis-proyectos", verifyToken, listarMisProyectosController);
proyectRouter.get("/:id", verifyToken, obtenerProyectoController); // usaremos esta routa

export default proyectRouter;
