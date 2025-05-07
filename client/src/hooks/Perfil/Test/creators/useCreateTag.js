// useCreateTag.js
import axios from "axios";
import renewToken from "../../../../utils/renewToken.js";
import { showError } from "../../../../utils/alerts.js";

const API_BASE = "http://localhost:3000";

export function useCreateTag() {
  const create = async (nombre) => {
    console.debug("[useCreateTag] intentando crear etiqueta:", nombre);
    let token = localStorage.getItem("accessToken");
    try {
      const res = await axios.post(
        `${API_BASE}/etiquetas`,
        { nombre },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.debug("[useCreateTag] etiqueta creada, id=", res.data.id);
      return res.data;
    } catch (err) {
      if (err.response?.status === 409) {
        console.debug("[useCreateTag] etiqueta ya existe, id=", err.response.data.id);
        return { id: err.response.data.id };
      }
      console.error("[useCreateTag] error creando etiqueta:", err);
      showError({ text: err.response?.data?.message || "Error al crear etiqueta" });
      return { id: null };
    }
  };
  return { create };
}
