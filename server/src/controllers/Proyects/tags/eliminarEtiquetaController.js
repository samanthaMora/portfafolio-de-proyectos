import { deleteTag } from "../services/tagService.js";

const eliminarEtiquetaController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTag(id);
    res.status(204).send();
  } catch (err) {
    console.error("Error al eliminar etiqueta:", err);
    res.status(500).json({ message: "Error al eliminar etiqueta" });
  }
};

export default eliminarEtiquetaController;
