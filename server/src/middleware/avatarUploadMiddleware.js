// src/middleware/avatarUploadMiddleware.js
import multer from "multer";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
];

const avatarUploadMiddleware = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes JPG, PNG, SVG o WebP"));
    }
  },
}).single("avatar");

export default avatarUploadMiddleware;

