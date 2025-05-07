import { getAllTechnologies } from "../services/technologyService.js";

const listarTecnologiasController = async (req, res) => {
  try {
    const tecnologias = await getAllTechnologies();
    res.json(tecnologias);
  } catch (err) {
    console.error("Error al listar tecnologías:", err);
    res.status(500).json({ message: "Error al obtener tecnologías" });
  }
};

export default listarTecnologiasController;
