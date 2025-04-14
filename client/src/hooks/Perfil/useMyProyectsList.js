import axios from "axios";
import { useNavigate } from "react-router-dom";
import renewToken from "../../utils/renewToken";

const useMyProyectList = () => {
  const navigate = useNavigate();

  const getProyectos = async () => {
    let token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://localhost:3000/viewMyProyects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data.proyectos;
    } catch (err) {
      // Si el token expiró, intentamos renovarlo
      if (err.response?.status === 403) {
        const newToken = await renewToken();
        if (newToken) {
          try {
            const res2 = await axios.get("http://localhost:3000/viewMyProyects", {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
              withCredentials: true,
            });
            return res2.data.proyectos;
          } catch (e2) {
            console.error("Error al reintentar con token renovado", e2);
            alert("Error al obtener proyectos tras renovar token");
          }
        } else {
          alert("Sesión expirada. Por favor inicia sesión nuevamente.");
          navigate("/");
        }
      } else {
        console.error(err);
        alert("Error al obtener proyectos");
      }

      return []; // En caso de error, retornar lista vacía
    }
  };

  return { getProyectos };
};

export default useMyProyectList;
