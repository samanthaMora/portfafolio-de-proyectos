import axios from "axios";
import { useNavigate } from "react-router-dom";
import renewToken from "../../utils/renewToken";

const useCreateProyects = () => {
  const navigate = useNavigate();

  const create = async (titulo, descripcion) => {
    const data = { titulo, descripcion };
    let token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:3000/createProyects", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      alert("Proyecto creado");
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
              withCredentials: true,
            });
            alert("Proyecto creado tras renovar token");
            return true;
          } catch (e2) {
            alert("Error al crear proyecto tras renovar token");
          }
        } else {
          alert("Sesión expirada. Por favor inicia sesión nuevamente.");
          navigate("/");
        }
      } else {
        alert("Error al crear proyecto");
      }
    }
    return false;
  };

  return { create };
};

export default useCreateProyects;

