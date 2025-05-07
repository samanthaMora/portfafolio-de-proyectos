import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import sanitizeInput from "../../middleware/sanitizeInput.js";

import crearEtiquetaController from "../../controllers/Proyects/tags/crearEtiquetaController.js";
import listarEtiquetasController from "../../controllers/Proyects/tags/listarEtiquetasController.js";
import eliminarEtiquetaController from "../../controllers/Proyects/tags/eliminarEtiquetaController.js";

const tagsRouter = express.Router();

tagsRouter.get("/", listarEtiquetasController);
tagsRouter.post("/", verifyToken, sanitizeInput(["nombre"]), crearEtiquetaController);
tagsRouter.delete("/:id", verifyToken, eliminarEtiquetaController);

export default tagsRouter;
