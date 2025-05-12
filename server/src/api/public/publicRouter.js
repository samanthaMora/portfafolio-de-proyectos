// src/routes/public/publicRouter.js
import { Router } from "express";
import { getProyectoPublico } from "../../controllers/public/getProyectoPublicoController.js";

const publicRouter = Router();
publicRouter.get("/proyectos/:id", getProyectoPublico);

export default publicRouter;
