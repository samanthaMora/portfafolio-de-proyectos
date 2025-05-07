import React from "react";
import CreateProyect from "./CreateProyect/CreateProyect";
import { useNavigate } from "react-router-dom";
import { usePerfilContext } from "./PerfilContext";

const ProyectoFormPage = () => {
  const navigate = useNavigate();
  const { setProyectoEnEdicion, proyectoEnEdicion } = usePerfilContext();

  const handleVolver = () => {
    setProyectoEnEdicion(null);
    navigate("/home/perfil");
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">
        {proyectoEnEdicion ? "Editar Proyecto" : "Nuevo Proyecto"}
      </h3>

      <button className="btn btn-secondary mb-3" onClick={handleVolver}>
        Volver a perfil
      </button>

      <CreateProyect />
    </div>
  );
};

export default ProyectoFormPage;

