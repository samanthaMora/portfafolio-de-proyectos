import { createProyectoConRelaciones } from "../services/proyectoService.js";
import getUserFromToken from "../../helpers/getUserFromToken.js";

const createProyectoController = async (req, res) => {
  try {
    const { titulo, descripcion, url, repositorio_github, publico, categorias, etiquetas, tecnologias } = req.body;

    if (!titulo?.trim() || !descripcion?.trim()) {
      return res.status(400).json({ message: "Título y descripción son requeridos" });
    }

    const { user } = await getUserFromToken(req);

    const proyectoId = await createProyectoConRelaciones(
      { titulo, descripcion, url, repositorio_github, publico },
      categorias,
      etiquetas,
      tecnologias,
      user.id
    );

    res.status(201).json({ message: "Proyecto creado", id: proyectoId });
  } catch (err) {
    console.error("Error al crear proyecto:", err);
    res.status(500).json({ message: "Error al crear proyecto" });
  }
};

export default createProyectoController;
