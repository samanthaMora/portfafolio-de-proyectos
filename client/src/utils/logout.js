import axios from "axios";

const logout = async () => {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  try {
    await axios.post(`${API_BASE}/logout`);
  } catch (err) {
    console.error("Error al cerrar sesión:", err);
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

export default logout;
