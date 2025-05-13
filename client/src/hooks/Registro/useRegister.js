import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // 👈 Agregado para poder usar Swal.close()
import { showSuccess, showError, showLoading } from "../../utils/alerts";

const useRegister = () => {
  const navigate = useNavigate();

  const register = async (email, pass, user) => {
    const API_BASE = import.meta.env.VITE_BACKEND_URL;
    const data = { email, pass, user };
    try {
      // Mostrar loading mientras se hace el registro
      showLoading({
        title: "Registrando...",
        text: "Estamos creando tu cuenta, por favor espera.",
      });
      

      await axios.post(`${API_BASE}/register`, data);

      // Cerrar el loading manualmente
      Swal.close();

      // Mostrar éxito
      await showSuccess({
        title: "Registro exitoso",
        text: "Te hemos enviado un correo para verificar tu cuenta. Revisa tu bandeja de entrada.",
      });

      navigate("/verify");

    } catch (err) {
      Swal.close(); // Cerrar también si hay error

      if (err.response?.status === 409) {
        showError({ text: "El correo ya está registrado." });
      } else {
        console.error(err);
        showError({ text: "Registro fallido. Intenta más tarde." });
      }
    }
  };

  return { register };
};

export default useRegister;
