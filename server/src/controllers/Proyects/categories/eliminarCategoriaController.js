import { deleteCategory } from "../services/categoryService.js";

const eliminarCategoriaController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategory(id);
    res.status(204).send(); // Sin contenido
  } catch (err) {
    console.error("Error al eliminar categoría:", err);
    res.status(500).json({ message: "Error al eliminar categoría" });
  }
};

export default eliminarCategoriaController;
