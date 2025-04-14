import React, { useState, useEffect } from "react";
import useCreateProyects from "../../../../hooks/Perfil/useCreateProyects";
import useUpdateProyect from "../../../../hooks/Perfil/useUpdateProyect";
import useMyProyectList from "../../../../hooks/Perfil/useMyProyectsList";
import "../../../../styles/OverlayMessage.css";

function CreateProyect({
  setArrProyects,
  proyectoEnEdicion,
  setProyectoEnEdicion,
}) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const { create } = useCreateProyects();
  const { update } = useUpdateProyect();
  const { getProyectos } = useMyProyectList();

  useEffect(() => {
    if (proyectoEnEdicion) {
      setTitulo(proyectoEnEdicion.titulo);
      setDescripcion(proyectoEnEdicion.descripcion);
    }
  }, [proyectoEnEdicion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let success = false;

    if (proyectoEnEdicion) {
      success = await update(proyectoEnEdicion.id, titulo, descripcion);
    } else {
      success = await create(titulo, descripcion);
    }

    if (success) {
      const nuevosProyectos = await getProyectos();
      setArrProyects([...nuevosProyectos]);
      setTitulo("");
      setDescripcion("");
      setProyectoEnEdicion(null);
    }
  };

  return (
    <div className="container p-0 mt-4">
        <h3 className="mb-4 view-text">
          {proyectoEnEdicion ? "Editar Proyecto" : "Crear Proyecto"}
        </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label view-text">Título del Proyecto</label>
          <input
            type="text"
            className="form-control glass-card"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="mb-3">
            <label className="form-label view-text">Descripción</label>
          <textarea
            className="form-control glass-card"
            rows="4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary view-button">
          {proyectoEnEdicion ? "Actualizar" : "Crear"}
        </button>

        {proyectoEnEdicion && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setProyectoEnEdicion(null);
              setTitulo("");
              setDescripcion("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateProyect;
