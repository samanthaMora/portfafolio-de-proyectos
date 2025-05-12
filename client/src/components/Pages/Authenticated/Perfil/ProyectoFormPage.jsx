// src/components/Pages/Authenticated/Perfil/ProyectoFormPage.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePerfilContext } from "./PerfilContext.jsx";
import CreateProyect from "./CreateProyect/CreateProyect";

export default function ProyectoFormPage() {
  const { id } = useParams();                   // <— leo el :id de la URL
  const navigate = useNavigate();
  const { setProyectoEnEdicion } = usePerfilContext();

  const handleVolver = () => {
    setProyectoEnEdicion(null);
    navigate("/home/perfil");
  };

  const isEdit = Boolean(id);

  return (
    <div className="container mt-5">
      <h3 className="mb-4">
        {isEdit ? "Editar Proyecto" : "Nuevo Proyecto"}
      </h3>

      <button className="btn btn-secondary mb-3" onClick={handleVolver}>
        Volver a perfil
      </button>

      {/* paso el id a CreateProyect */}
      <CreateProyect id={id} />
    </div>
  );
}
