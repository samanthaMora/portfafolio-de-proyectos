import { getAllTags } from "../services/tagService.js";

const listarEtiquetasController = async (req, res) => {
  try {
    const tags = await getAllTags();
    res.json(tags);
  } catch (err) {
    console.error("Error al listar etiquetas:", err);
    res.status(500).json({ message: "Error al obtener etiquetas" });
  }
};

export default listarEtiquetasController;
