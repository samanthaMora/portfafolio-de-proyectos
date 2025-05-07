import { deleteTechnology } from "../services/technologyService.js";

const eliminarTecnologiaController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTechnology(id);
    res.status(204).send();
  } catch (err) {
    console.error("Error al eliminar tecnología:", err);
    res.status(500).json({ message: "Error al eliminar tecnología" });
  }
};

export default eliminarTecnologiaController;
