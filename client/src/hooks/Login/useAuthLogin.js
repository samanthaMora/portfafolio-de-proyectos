import { useNavigate } from "react-router-dom";
import axios from "axios";
import parseJwt from "../../utils/parseJwt";
import { showSuccess, showError } from "../../utils/alerts.js";

const useAuthLogin = () => {
  const navigate = useNavigate();

  const login = async (email, pass) => {
    const data = { email, pass };

    try {
      const res = await axios.post("http://localhost:3000/login", data);

      const { accessToken, refreshToken } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = parseJwt(accessToken);
      console.log("Usuario autenticado:", decoded);

      await showSuccess({
        title: "Bienvenido",
        text: "Login exitoso",
      });

      navigate("/home");

    } catch (err) {
      console.error("Error en login:", err);

      // Verificamos si el backend dijo que el usuario no está verificado
      if (err.response?.status === 403) {
        showError({
          title: "Verificación pendiente",
          text: err.response.data.message || "Debes verificar tu correo antes de iniciar sesión",
        });
      } else {
        showError({
          title: "Login fallido",
          text: "Credenciales inválidas",
        });
      }
    }
  };

  return { login };
};

export default useAuthLogin;

