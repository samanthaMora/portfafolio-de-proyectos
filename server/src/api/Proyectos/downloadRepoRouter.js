// src/routes/proyectos/downloadRepoRouter.js
import { Router } from "express";
import path from "path";
import archiver from "archiver";
import fs from "fs";

const downloadRepoRouter = Router();

downloadRepoRouter.get("/proyectos/:id/repo/download", async (req, res) => {
  const { id } = req.params;
  const userId  = req.query.userId;           // se recibe desde el front
  const dirPath = path.resolve("uploads", String(userId), String(id), "repo");

  // Si la carpeta no existe, 404
  if (!fs.existsSync(dirPath)) {
    return res.status(404).json({ message: "Repo no encontrado" });
  }

  res.set({
    "Content-Type": "application/zip",
    "Content-Disposition": `attachment; filename=repo_${id}.zip`,
  });

  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.on("error", err => res.status(500).send({ error: err.message }));
  archive.directory(dirPath, false);
  archive.pipe(res);
  archive.finalize();
});

export default downloadRepoRouter;
