import React from "react";
import { useNavigate } from "react-router-dom";
import useDeleteProyect from "../../../../hooks/Perfil/useDeleteProyect.js";
import { showConfirm } from "../../../../utils/alerts.js";
import { usePerfilContext } from "./PerfilContext.jsx";

function ProyectsList() {
  const {
    arrProyects,
    setArrProyects,
    setProyectoEnEdicion
  } = usePerfilContext();

  const { eliminar } = useDeleteProyect();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = await showConfirm({
      title: "¿Eliminar proyecto?",
      text: "Esta acción no se puede deshacer.",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm) return;

    const success = await eliminar(id);
    if (success) {
      const nuevaLista = arrProyects.filter((p) => p.id !== id);
      setArrProyects(nuevaLista);
    }
  };

  const handleEdit = (proyecto) => {
    setProyectoEnEdicion(proyecto);
    navigate("/home/proyecto");
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Mis Proyectos</h3>
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
              <td colSpan="4" className="text-center">
                No hay proyectos
              </td>
            </tr>
          ) : (
            arrProyects.map((proyecto, index) => (
              <tr key={proyecto.id}>
                <th scope="row">{index + 1}</th>
                <td>{proyecto.titulo}</td>
                <td>{proyecto.descripcion}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(proyecto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => handleDelete(proyecto.id)}
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

export default ProyectsList;

