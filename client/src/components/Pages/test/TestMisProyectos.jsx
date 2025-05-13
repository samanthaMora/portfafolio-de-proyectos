import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;


const TestMisProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${token}` };

  const load = async () => {
    try {
      const { data } = await axios.get(`${API}/proyectos/mis-proyectos`, { headers });
      setProyectos(data);
    } catch (e) {
      console.error(e);
      setMsg("Error al cargar tus proyectos");
    }
  };

  useEffect(() => { load(); }, []);

  const eliminar = async id => {
    if (!window.confirm("¿Eliminar este proyecto?")) return;
    try {
      await axios.delete(`${API}/proyectos/${id}`, { headers });
      setProyectos(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error(e);
      setMsg("No se pudo eliminar");
    }
  };

  return (
    <div className="container py-4">
      <h2>Mis proyectos</h2>
      <table className="table">
        <thead>
          <tr><th>Título</th><th>Creado</th><th></th></tr>
        </thead>
        <tbody>
          {proyectos.map(p => (
            <tr key={p.id}>
              <td>{p.titulo}</td>
              <td>{new Date(p.fecha_creacion).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => navigate(`/proyectos/${p.id}/editar`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminar(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!!msg && <div className="alert alert-info">{msg}</div>}
    </div>
  );
};

export default TestMisProyectos;
