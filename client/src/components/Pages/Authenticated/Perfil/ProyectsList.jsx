import React from "react";
import useDeleteProyect from "../../../../hooks/Perfil/useDeleteProyect.js";
import "../../../../styles/OverlayMessage.css";

function ProyectsList({ arrProyects, setArrProyects, setProyectoEnEdicion }) {
  const { eliminar } = useDeleteProyect();

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "¿Estás seguro de que quieres eliminar este proyecto?"
    );
    if (!confirm) return;

    const success = await eliminar(id);
    if (success) {
      const nuevaLista = arrProyects.filter((p) => p.id !== id);
      setArrProyects(nuevaLista);
    }
  };

  return (
    <div className="container mt-5">
        <h3 className="mb-4 view-text">Mis Proyectos</h3>
      <table className="table table-striped glass-card">
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
                    onClick={() => setProyectoEnEdicion(proyecto)}
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
