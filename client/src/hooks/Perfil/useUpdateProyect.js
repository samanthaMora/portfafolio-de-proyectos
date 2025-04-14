import axios from "axios";
import renewToken from "../../utils/renewToken";
import { useNavigate } from "react-router-dom";

const useUpdateProyect = () => {
  const navigate = useNavigate();

  const update = async (id, titulo, descripcion) => {
    const data = { id, titulo, descripcion };
    let token = localStorage.getItem("token");

    try {
      await axios.put("http://localhost:3000/updateProyects", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert("Proyecto actualizado");
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
              withCredentials: true,
            });
            alert("Proyecto actualizado tras renovar token");
            return true;
          } catch (e2) {
            alert("Error al actualizar tras renovar token");
          }
        } else {
          alert("Sesión expirada. Por favor inicia sesión nuevamente.");
          navigate("/");
        }
      } else {
        alert("Error al actualizar proyecto");
      }
    }
    return false;
  };

  return { update };
};

export default useUpdateProyect;

