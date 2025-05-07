import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import sanitizeInput from "../../middleware/sanitizeInput.js";

import createProyectoController from "../../controllers/Proyects/core/createProyectoController.js";
import updateProyectoController from "../../controllers/Proyects/core/updateProyectoController.js";
import deleteProyectoController from "../../controllers/Proyects/core/deleteProyectoController.js";
import obtenerProyectosController from "../../controllers/Proyects/core/obtenerProyectosController.js";
import listarMisProyectosController from "../../controllers/Proyects/core/listarMisProyectosController.js";
import obtenerProyectoController from "../../controllers/Proyects/core/obtenerProyectoController.js";

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
proyectRouter.delete("/:id", verifyToken, deleteProyectoController);
proyectRouter.get("/publicos", obtenerProyectosController);
proyectRouter.get("/mis-proyectos", verifyToken, listarMisProyectosController);
proyectRouter.get("/:id", verifyToken, obtenerProyectoController); // usaremos esta routa

export default proyectRouter;
