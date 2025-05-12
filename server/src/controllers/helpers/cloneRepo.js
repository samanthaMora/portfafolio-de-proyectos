// server/src/helpers/cloneRepo.js
import simpleGit from "simple-git";
import { promises as fs } from "fs";
import path from "path";

/**
 * Clona un repositorio Git en la carpeta uploads/<userId>/<projectId>/repo
 * Si falla, escribe error_repo_git.txt con el stack o mensaje.
 *
 * @param {number|string} userId
 * @param {number|string} projectId
 * @param {string} repoUrl
 * @returns {Promise<void>}
 */
export async function cloneRepo(userId, projectId, repoUrl) {
  // Validación básica
  if (!repoUrl || typeof repoUrl !== "string") {
    throw new Error("URL de repositorio inválida");
  }

  // Directorio destino: uploads/<userId>/<projectId>/repo
  const repoDir = path.resolve(
    "uploads",
    String(userId),
    String(projectId),
    "repo"
  );
  // Aseguramos que exista
  await fs.mkdir(repoDir, { recursive: true });

  // Intentamos clonar
  const git = simpleGit();
  try {
    await git.clone(repoUrl.trim(), repoDir);
  } catch (err) {
    // En caso de error, escribir un txt explicativo
    const errorFile = path.join(repoDir, "error_repo_git.txt");
    const text = err.stack || err.message || "Error desconocido al clonar";
    try {
      await fs.writeFile(errorFile, text, "utf8");
    } catch (writeErr) {
      console.error("Error escribiendo error_repo_git.txt:", writeErr);
    }
  }
}
