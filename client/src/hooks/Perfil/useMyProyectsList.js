import axios from "axios";
import { useNavigate } from "react-router-dom";
import renewToken from "../../utils/renewToken";
import { showError } from "../../utils/alerts";

const useMyProyectList = () => {
  const navigate = useNavigate();

  const getProyectos = async () => {
    let token = localStorage.getItem("accessToken");

    try {
      const res = await axios.get("http://localhost:3000/viewMyProyects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.proyectos;
    } catch (err) {
      if (err.response?.status === 403) {
        const newToken = await renewToken();
        if (newToken) {
          try {
            const res2 = await axios.get("http://localhost:3000/viewMyProyects", {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            return res2.data.proyectos;
          } catch (e2) {
            console.error("Error al reintentar con token renovado", e2);
            showError({ text: "Error al obtener proyectos tras renovar token" });
          }
        } else {
          showError({ text: "Sesión expirada. Por favor inicia sesión nuevamente." });
          navigate("/login");
        }
      } else {
        console.error(err);
        showError({ text: "Error al obtener proyectos" });
      }

      return [];
    }
  };

  return { getProyectos };
};

export default useMyProyectList;
