// src/middleware/uploadProjectImages.js
import multer from "multer";
import fs from "fs";
import getUserFromToken from "../controllers/helpers/getUserFromToken.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    getUserFromToken(req)
      .then(({ user }) => {
        const userId = user.id.toString();
        const projectId = req.params.id.toString();
        // ahora join usa __dirname sin error
        const uploadPath = join(
          __dirname,
          "../../uploads",
          userId,
          projectId,
          "images"
        );
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
      })
      .catch(cb);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadProjectImages = multer({
  storage,
  limits: { files: 10 },
}).array("images", 10);

export default uploadProjectImages;
