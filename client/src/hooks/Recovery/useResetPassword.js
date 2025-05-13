// src/hooks/Recovery/useResetPassword.js
import axios from "axios";
import { showSuccess, showError } from "../../utils/alerts.js";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const resetPassword = async (token, newPassword) => {
    console.log(token);
    console.log(newPassword);
    try {
      const res = await axios.post(`${API_BASE}/reset-password/${token}`, {
        newPassword,
      });

      await showSuccess({
        title: "Contraseña actualizada",
        text: res.data.message || "Ya puedes iniciar sesión con tu nueva contraseña.",
      });

      navigate("/login");
    } catch (err) {
      console.error("Error al cambiar contraseña:", err);
      showError({
        title: "Error",
        text: err.response?.data?.message || "Algo salió mal.",
      });
    }
  };

  return { resetPassword };
};

export default useResetPassword;
