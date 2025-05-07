// hooks/Perfil/Test/useCreateProyect.js
import { useCallback } from "react";
import axios from "axios";
import renewToken from "../../../utils/renewToken.js";
import { showError } from "../../../utils/alerts.js";

const API_BASE = "http://localhost:3000";

async function getValidToken() {
  return localStorage.getItem("accessToken");
}

export function useCreateProyect() {
  const create = useCallback(async (body) => {
    try {
      const token = await getValidToken();
      const headers = { Authorization: `Bearer ${token}` };

      // intento inicial
      const res = await axios.post(`${API_BASE}/proyectos`, body, { headers });
      return res.data;

    } catch (err) {
      if (err.response?.status === 403) {
        const newToken = await renewToken();
        if (newToken) {
          try {
            const res2 = await axios.post(
              `${API_BASE}/proyectos`,
              body,
              { headers: { Authorization: `Bearer ${newToken}` } }
            );
            return res2.data;
          } catch (e2) {
            console.error("Error tras renovar token al crear proyecto", e2);
            showError({ text: "No se pudo crear el proyecto tras renovar sesión." });
            return null;
          }
        } else {
          showError({ text: "Sesión expirada, por favor inicia sesión de nuevo." });
          return null;
        }
      }
      console.error("Error al crear proyecto", err);
      showError({ text: err.response?.data?.message || "Error al crear proyecto" });
      return null;
    }
  }, []);

  return { create };
}
