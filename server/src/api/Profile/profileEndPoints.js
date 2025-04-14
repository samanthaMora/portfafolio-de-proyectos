import { Router } from "express";
import perfil from "../../controllers/Perfil/perfilController.js";
import createProyects from "../../controllers/Proyects/createProyects.js";
import viewMyProyects from "../../controllers/Proyects/viewMyProyects.js";
import updateProyects from "../../controllers/Proyects/updateProyects.js";
import deleteProyect from "../../controllers/Proyects/deleteProyect.js";
import sanitizeInput from "../../middleware/sanitizeInput.js";

const perfilRouter = Router();

perfilRouter.post("/perfil", perfil);

perfilRouter.post(
  "/createProyects",
  sanitizeInput(["titulo", "descripcion"]),
  createProyects
);

perfilRouter.get("/viewMyProyects", viewMyProyects);

perfilRouter.put(
  "/updateProyects",
  sanitizeInput(["titulo", "descripcion"]),
  updateProyects
);

perfilRouter.delete("/deleteProyect/:id", deleteProyect);

export default perfilRouter;
