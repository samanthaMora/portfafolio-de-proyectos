import { Router } from "express";
import perfil from "../../controllers/Perfil/perfilController.js";

const perfilRouter = Router();

perfilRouter.get("/perfil", perfil);



export default perfilRouter;
