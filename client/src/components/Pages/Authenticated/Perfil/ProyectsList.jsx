// src/components/Perfil/ProyectsList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { showConfirm } from "../../../../utils/alerts.js";
import { useDeleteProyect } from "../../../../hooks/Perfil/Test/useDeleteProyect.js";
import { usePerfilContext } from "./PerfilContext.jsx";

export default function ProyectsList() {
  const {
    arrProyects,
    setArrProyects
  } = usePerfilContext();
  const navigate = useNavigate();
  const { eliminar } = useDeleteProyect();

  const handleEdit = (proyecto) => {
    // Redirige al modo edición con ID en la URL
    navigate(`/home/proyecto/editar/${proyecto.id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = await showConfirm({
      title: "¿Eliminar proyecto?",
      text: "Esta acción no se puede deshacer.",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirmed) return;

    const ok = await eliminar(id);
    if (ok) {
      setArrProyects(arrProyects.filter(p => p.id !== id));
    }
  };

  const handleCreate = () => {
    // Redirige a modo creación (sin ID)
    navigate("/home/proyecto");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Mis Proyectos</h3>
        <button className="btn btn-success" onClick={handleCreate}>
          + Nuevo Proyecto
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr className="table-success">
            <th>#</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {arrProyects.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">No hay proyectos</td>
            </tr>
          ) : (
            arrProyects.map((proy, i) => (
              <tr key={proy.id}>
                <th scope="row">{i + 1}</th>
                <td>{proy.titulo}</td>
                <td>{proy.descripcion}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(proy)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(proy.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
