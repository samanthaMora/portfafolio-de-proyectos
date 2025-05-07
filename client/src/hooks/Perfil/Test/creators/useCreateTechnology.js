// useCreateTechnology.js
import axios from "axios";
import renewToken from "../../../../utils/renewToken.js";
import { showError } from "../../../../utils/alerts.js";

const API_BASE = "http://localhost:3000";

export function useCreateTechnology() {
  const create = async (nombre) => {
    console.debug("[useCreateTechnology] intentando crear tecnología:", nombre);
    let token = localStorage.getItem("accessToken");
    try {
      const res = await axios.post(
        `${API_BASE}/tecnologias`,
        { nombre },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.debug("[useCreateTechnology] tecnología creada, id=", res.data.id);
      return res.data;
    } catch (err) {
      if (err.response?.status === 409) {
        console.debug("[useCreateTechnology] tecnología ya existe, id=", err.response.data.id);
        return { id: err.response.data.id };
      }
      console.error("[useCreateTechnology] error creando tecnología:", err);
      showError({ text: err.response?.data?.message || "Error al crear tecnología" });
      return { id: null };
    }
  };
  return { create };
}
