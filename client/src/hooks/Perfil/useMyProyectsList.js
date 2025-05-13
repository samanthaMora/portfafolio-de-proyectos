// src/hooks/Perfil/useMyProyectList.js
import axios from "axios";
import renewToken from "../../utils/renewToken";
import { showError } from "../../utils/alerts";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export default function useMyProyectList() {
  const navigate = useNavigate();

  const getProyectos = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        `${API_BASE}/proyectos/mis-proyectos`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // asumimos que el controller responde con un array de proyectos
      return res.data;
    } catch (err) {
      if (err.response?.status === 403) {
        // token expirado: renovar y reintentar
        const newToken = await renewToken();
        if (newToken) {
          try {
            const res2 = await axios.get(
              `${API_BASE}/proyectos/mis-proyectos`,
              { headers: { Authorization: `Bearer ${newToken}` } }
            );
            return res2.data;
          } catch (e2) {
            console.error("Error tras renovar token:", e2);
            showError({ text: "Error obteniendo proyectos tras renovar sesión." });
          }
        } else {
          showError({ text: "Sesión expirada. Por favor inicia sesión nuevamente." });
          navigate("/login");
        }
      } else {
        console.error(err);
        showError({ text: "Error al obtener proyectos" });
      }
      return [];
    }
  };

  return { getProyectos };
}
