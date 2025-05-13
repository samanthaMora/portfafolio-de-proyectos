import axios from "axios";
import renewToken from "../../utils/renewToken.js"; // ajusta la ruta según dónde tengas esto
import { showSuccess, showError } from "../../utils/alerts.js";

const useUploadAvatar = () => {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  const uploadAvatar = async (file) => {
    const attemptUpload = async (token) => {
      const formData = new FormData();
      formData.append("avatar", file);

      return await axios.post(`${API_BASE}/upload-avatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };

    try {
      const token = localStorage.getItem("accessToken");
      await attemptUpload(token); // intento original
      await showSuccess("Imagen actualizada correctamente");
      return true;

    } catch (error) {
      // Si es por expiración del token (401), intenta renovar
      if (error.response && error.response.status === 500) {
        try {
          const newToken = await renewToken();
          if (!newToken) throw new Error("No se pudo renovar el token");

          await attemptUpload(newToken); // intento con token nuevo
          await showSuccess("Imagen actualizada correctamente tras renovar token");
          return true;

        } catch (renewError) {
          console.error("Error al renovar y volver a intentar:", renewError);
        }
      }

      console.error("Error al subir avatar:", error);
      showError("No se pudo subir la imagen.");
      return false;
    }
  };

  return { uploadAvatar };
};

export default useUploadAvatar;
