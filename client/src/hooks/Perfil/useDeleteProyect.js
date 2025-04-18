import axios from "axios";
import renewToken from "../../utils/renewToken";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../utils/alerts";

const useDeleteProyect = () => {
  const navigate = useNavigate();

  const eliminar = async (id) => {
    let token = localStorage.getItem("accessToken");

    try {
      await axios.delete(`http://localhost:3000/deleteProyect/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await showSuccess({ text: "Proyecto eliminado correctamente" });
      return true;

    } catch (err) {
      if (err.response?.status === 403) {
        const newToken = await renewToken();
        if (newToken) {
          try {
            await axios.delete(`http://localhost:3000/deleteProyect/${id}`, {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            await showSuccess({ text: "Proyecto eliminado tras renovar token" });
            return true;

          } catch (e2) {
            showError({ text: "Error al eliminar tras renovar token" });
          }
        } else {
          showError({ text: "Sesión expirada. Por favor inicia sesión nuevamente." });
          navigate("/login");
        }
      } else {
        showError({ text: "Error al eliminar proyecto" });
      }
    }

    return false;
  };

  return { eliminar };
};

export default useDeleteProyect;
