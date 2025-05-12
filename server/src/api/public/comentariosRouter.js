import { Router } from "express";
import verifyToken           from "../../middleware/verifyToken.js";
import { createComentario }  from "../../controllers/comentarios/createComentarioController.js";
import { deleteComentario }  from "../../controllers/comentarios/deleteComentarioController.js";
import { getComentariosByProyecto }    from "../../controllers/comentarios/getComentariosByProyectoController.js";

const comentariosRouter = Router();

comentariosRouter.post(
  "/proyectos/:id/comentarios",
  verifyToken,
  createComentario
);

comentariosRouter.delete(
  "/comentarios/:id",
  verifyToken,
  deleteComentario
);

comentariosRouter.get("/proyectos/:id/comentarios", getComentariosByProyecto);

export default comentariosRouter;
