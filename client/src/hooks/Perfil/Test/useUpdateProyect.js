// src/hooks/Perfil/Test/useUpdateProyect.js

import { useCallback } from "react";
import axios from "axios";
import renewToken from "../../../utils/renewToken.js";
import { showError } from "../../../utils/alerts.js";

const API_BASE = "http://localhost:3000";

async function getValidToken() {
  return localStorage.getItem("accessToken");
}

export function useUpdateProyect() {
  const update = useCallback(async (id, body) => {
    try {
      const token = await getValidToken();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(`${API_BASE}/proyectos/${id}`, body, { headers });
      return true;
    } catch (err) {
      if (err.response?.status === 403) {
        const newToken = await renewToken();
        if (newToken) {
          try {
            await axios.put(
              `${API_BASE}/proyectos/${id}`,
              body,
              { headers: { Authorization: `Bearer ${newToken}` } }
            );
            return true;
          } catch (e2) {
            console.error("Error tras renovar token al actualizar proyecto", e2);
            showError({ text: "No se pudo actualizar proyecto tras renovar sesión." });
            return false;
          }
        }
      }
      console.error("Error al actualizar proyecto", err);
      showError({ text: err.response?.data?.message || "Error al actualizar proyecto" });
      return false;
    }
  }, []);

  return { update };
}
