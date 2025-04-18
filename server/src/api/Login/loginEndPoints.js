import { Router } from "express";
import login from "../../controllers/Login/loginController.js";
import logout from "../../controllers/Login/logout.js";
import register from "../../controllers/Login/registerController.js";
import refresh from "../../controllers/Login/refreshController.js";
import sanitizeInput from "../../middleware/sanitizeInput.js";
import verifyEmail from "../../controllers/Login/verifyEmailController.js";
import { RecoveryEmail } from "../../controllers/Login/emailRecoveryController.js";
import validateRecoveryToken from "../../controllers/Login/validateRecoveryToken.js";
import resetPassword from "../../controllers/Login/resetPasswordController.js";

const loginRouter = Router();

loginRouter.post("/refresh", refresh);

loginRouter.post("/login", sanitizeInput(["email"]), login);

loginRouter.post("/logout", logout);

loginRouter.post("/register", sanitizeInput(["username", "email"]), register);

loginRouter.get("/verify/:token", verifyEmail);

loginRouter.post("/RecoveryEmail", RecoveryEmail);

loginRouter.get("/validate-recovery/:token", validateRecoveryToken);

loginRouter.post("/reset-password/:token", resetPassword);





export default loginRouter;
