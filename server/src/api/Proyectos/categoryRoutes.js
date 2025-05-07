import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import sanitizeInput from "../../middleware/sanitizeInput.js";
import createCategoriaController from "../../controllers/Proyects/categories/createCategoriaController.js";
import listarCategoriasController from "../../controllers/Proyects/categories/listarCategoriasController.js";
import eliminarCategoriaController from "../../controllers/Proyects/categories/eliminarCategoriaController.js";

const router = express.Router();

router.get("/", listarCategoriasController);
router.post(
    "/",
    verifyToken,
    sanitizeInput(["nombre"]),
    createCategoriaController
  );
router.delete("/:id", eliminarCategoriaController);




export default router;

