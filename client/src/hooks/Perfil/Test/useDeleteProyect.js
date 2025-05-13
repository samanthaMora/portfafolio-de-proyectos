// hooks/Perfil/useDeleteProyect.js (ya existía, pero ajustamos similarmente)
import axios from "axios";
import { useNavigate } from "react-router-dom";
import renewToken from "../../../utils/renewToken.js";
import { showError } from "../../../utils/alerts.js";

const API = import.meta.env.VITE_BACKEND_URL;


export function useDeleteProyect() {
  const navigate = useNavigate();
  const eliminar = async (id) => {
    let token = localStorage.getItem("accessToken");
    try {
      await axios.delete(
        `${API}/proyectos/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return true;
    } catch (err) {
      if (err.response?.status === 403) {
        const newToken = await renewToken();
        if (newToken) {
          try {
            await axios.delete(
              `${API}/proyectos/${id}`,
              { headers: { Authorization: `Bearer ${newToken}` } }
            );
            return true;
          } catch (e2) {
            console.error("Error tras renovar token al eliminar proyecto", e2);
            showError({ text: "No se pudo eliminar proyecto" });
          }
        }
      } else {
        console.error("Error al eliminar proyecto", err);
        showError({ text: err.response?.data?.message || "Error al eliminar proyecto" });
      }
      return false;
    }
  };
  return { eliminar };
}