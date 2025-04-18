import axios from "axios";
import { useNavigate } from "react-router-dom";
import renewToken from "../../utils/renewToken";
import { showSuccess, showError } from "../../utils/alerts";

const useCreateProyects = () => {
  const navigate = useNavigate();

  const create = async (titulo, descripcion) => {
    const data = { titulo, descripcion };
    let token = localStorage.getItem("accessToken");

    try {
      await axios.post("http://localhost:3000/createProyects", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await showSuccess({ text: "Proyecto creado correctamente" });
      return true;

    } catch (err) {
      if (err.response?.status === 403) {
        const newToken = await renewToken();
        if (newToken) {
          try {
            await axios.post("http://localhost:3000/createProyects", data, {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            await showSuccess({ text: "Proyecto creado tras renovar token" });
            return true;

          } catch (e2) {
            showError({ text: "Error al crear proyecto tras renovar token" });
          }
        } else {
          showError({ text: "Sesión expirada. Por favor inicia sesión nuevamente." });
          navigate("/login");
        }
      } else {
        showError({ text: "Error al crear proyecto" });
      }
    }
    return false;
  };

  return { create };
};

export default useCreateProyects;

