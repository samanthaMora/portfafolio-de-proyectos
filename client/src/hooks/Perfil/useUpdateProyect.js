import axios from "axios";
import renewToken from "../../utils/renewToken";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../utils/alerts";

const useUpdateProyect = () => {
  const navigate = useNavigate();

  const update = async (id, titulo, descripcion) => {
    const data = { id, titulo, descripcion };
    let token = localStorage.getItem("accessToken");

    try {
      await axios.put("http://localhost:3000/updateProyects", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await showSuccess({ text: "Proyecto actualizado correctamente" });
      return true;

    } catch (err) {
      if (err.response?.status === 403) {
        const newToken = await renewToken();
        if (newToken) {
          try {
            await axios.put("http://localhost:3000/updateProyects", data, {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            await showSuccess({ text: "Proyecto actualizado tras renovar token" });
            return true;

          } catch (e2) {
            showError({ text: "Error al actualizar tras renovar token" });
          }
        } else {
          showError({ text: "Sesión expirada. Por favor inicia sesión nuevamente." });
          navigate("/login");
        }
      } else {
        showError({ text: "Error al actualizar proyecto" });
      }
    }

    return false;
  };

  return { update };
};

export default useUpdateProyect;
