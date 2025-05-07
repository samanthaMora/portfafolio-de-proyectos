import { getAllCategories } from "../services/categoryService.js";

const listarCategoriasController = async (req, res) => {
  try {
    const categorias = await getAllCategories();
    res.json(categorias);
  } catch (err) {
    console.error("Error al listar categorías:", err);
    res.status(500).json({ message: "Error al obtener categorías" });
  }
};

export default listarCategoriasController;
