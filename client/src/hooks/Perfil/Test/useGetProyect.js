// src/hooks/Perfil/useGetProyect.js
import axios from "axios";
import renewToken from "../../../utils/renewToken";
import { showError } from "../../../utils/alerts";

const API_BASE = "http://localhost:3000";

export function useGetProyect() {
  const get = async (id) => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        `${API_BASE}/proyectos/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      if (err.response?.status === 403) {
        const newToken = await renewToken();
        if (newToken) {
          try {
            const res2 = await axios.get(
              `${API_BASE}/proyectos/${id}`,
              { headers: { Authorization: `Bearer ${newToken}` } }
            );
            return res2.data;
          } catch (e2) {
            console.error("Error tras renovar token al obtener proyecto", e2);
            showError({ text: "No se pudo cargar proyecto tras renovar sesión." });
          }
        } else {
          showError({ text: "Sesión expirada. Por favor inicia sesión nuevamente." });
        }
      } else {
        console.error("Error al obtener proyecto", err);
        showError({ text: err.response?.data?.message || "Error al obtener proyecto" });
      }
      return null;
    }
  };

  return { get };
}
