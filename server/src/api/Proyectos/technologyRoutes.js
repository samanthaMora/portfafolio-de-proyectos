import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import sanitizeInput from "../../middleware/sanitizeInput.js";

import crearTecnologiaController from "../../controllers/Proyects/technologies/crearTecnologiaController.js";
import listarTecnologiasController from "../../controllers/Proyects/technologies/listarTecnologiasController.js";
import eliminarTecnologiaController from "../../controllers/Proyects/technologies/eliminarTecnologiaController.js";

const tecRouter = express.Router();

tecRouter.get("/", listarTecnologiasController);
tecRouter.post("/", verifyToken, sanitizeInput(["nombre"]), crearTecnologiaController);
tecRouter.delete("/:id", verifyToken, eliminarTecnologiaController);

export default tecRouter;
