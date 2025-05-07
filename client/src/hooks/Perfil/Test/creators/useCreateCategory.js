import axios from "axios";
import renewToken from "../../../../utils/renewToken.js";
import { showError } from "../../../../utils/alerts.js";

const API_BASE = "http://localhost:3000";


export function useCreateCategory() {
  const create = async (nombre) => {
    console.debug("[useCreateCategory] intentando crear categoría:", nombre);
    let token = localStorage.getItem("accessToken");
    try {
      const res = await axios.post(
        `${API_BASE}/categorias`,
        { nombre },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.debug("[useCreateCategory] categoría creada, id=", res.data.id);
      return res.data;
    } catch (err) {
      if (err.response?.status === 409) {
        console.debug("[useCreateCategory] categoría ya existe, id=", err.response.data.id);
        return { id: err.response.data.id };
      }
      console.error("[useCreateCategory] error creando categoría:", err);
      showError({ text: err.response?.data?.message || "Error al crear categoría" });
      return { id: null };
    }
  };
  return { create };
}