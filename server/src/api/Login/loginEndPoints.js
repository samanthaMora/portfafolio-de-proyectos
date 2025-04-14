import { Router } from "express";
import login from "../../controllers/Login/loginController.js";
import logout from "../../controllers/Login/logout.js";
import register from "../../controllers/Login/registerController.js";
import refresh from "../../controllers/Login/refreshController.js";
import sanitizeInput from "../../middleware/sanitizeInput.js";

const loginRouter = Router();

loginRouter.post("/refresh", refresh);

loginRouter.post("/login", sanitizeInput(["email"]), login);

loginRouter.post("/logout", logout);

loginRouter.post("/register", sanitizeInput(["username", "email"]), register);

export default loginRouter;
