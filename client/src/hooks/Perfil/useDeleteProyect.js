import axios from "axios";
import renewToken from "../../utils/renewToken";
import { useNavigate } from "react-router-dom";

const useDeleteProyect = () => {
  const navigate = useNavigate();

  const eliminar = async (id) => {
    let token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/deleteProyect/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert("Proyecto eliminado");
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
              withCredentials: true,
            });
            alert("Proyecto eliminado tras renovar token");
            return true;
          } catch (e2) {
            alert("Error al eliminar tras renovar token");
          }
        } else {
          alert("Sesión expirada. Por favor inicia sesión nuevamente.");
          navigate("/");
        }
      } else {
        alert("Error al eliminar proyecto");
      }
    }

    return false;
  };

  return { eliminar };
};

export default useDeleteProyect;
