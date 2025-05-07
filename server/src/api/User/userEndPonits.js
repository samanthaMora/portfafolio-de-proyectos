import { Router } from "express";
import setupUserFolderAndAvatar from "../../controllers/User/userSetupController.js";
import getAvatar from "../../controllers/User/getAvatarController.js";
import uploadAvatar from "../../controllers/User/uploadAvatarController.js";
import avatarUploadMiddleware from "../../middleware/avatarUploadMiddleware.js"; // ✅ aquí estaba el error
import verifyToken from "../../middleware/verifyToken.js";

const userRouter = Router();

userRouter.post("/user-setup", setupUserFolderAndAvatar);
userRouter.get("/get-avatar", getAvatar);
userRouter.post("/upload-avatar",avatarUploadMiddleware, uploadAvatar); // middleware + controlador

export default userRouter;
