// src/components/Proyectos/RatingSelect.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function RatingSelect({ proyectoId }) {
  const [valor, setValor] = useState("");
  const [promedio, setPromedio] = useState(0);
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("accessToken");

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/proyectos/${proyectoId}/calificacion`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const promedioNum = parseFloat(res.data.promedio);
      setPromedio(isNaN(promedioNum) ? 0 : promedioNum);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Error cargando calificaciones:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valor) return alert("Selecciona una calificación");

    try {
      await axios.post(
        `${API_BASE}/proyectos/${proyectoId}/calificacion`,
        { valor },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setValor(""); // reset select
      fetchData();  // recargar promedio y total
    } catch (err) {
      console.error("Error enviando calificación:", err);
      alert("Inicia sesión para calificar.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [proyectoId]);

  return (
    <div className="mt-4">
      <h5>Califica este proyecto</h5>
      <form className="d-flex align-items-center gap-2 flex-wrap" onSubmit={handleSubmit}>
        <select
          className="form-select w-auto"
          value={valor}
          onChange={(e) => setValor(parseInt(e.target.value))}
        >
          <option value="">Elige una opción</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} ★</option>
          ))}
        </select>
        <button type="submit" className="btn btn-sm btn-primary">Enviar</button>
        <span className="text-muted">
          {promedio.toFixed(1)} / 5 ({total} votos)
        </span>
      </form>
    </div>
  );
}
