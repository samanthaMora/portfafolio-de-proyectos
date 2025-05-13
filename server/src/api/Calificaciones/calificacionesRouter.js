// routes/calificacionesRouter.js
import { Router } from "express";
import verifyToken from "../../middleware/verifyToken.js";
import { crearOActualizarCalificacion } from "../../controllers/calificaciones/crearOActualizarCalificacion.js";
import { obtenerCalificacionProyecto } from "../../controllers/calificaciones/obtenerCalificacionProyecto.js";

const router = Router();

router.post("/proyectos/:id/calificacion", verifyToken, crearOActualizarCalificacion);
router.get("/proyectos/:id/calificacion", obtenerCalificacionProyecto);

export default router;
