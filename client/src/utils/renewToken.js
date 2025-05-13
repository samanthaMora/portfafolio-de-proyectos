import axios from "axios";

const renewToken = async () => {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const res = await axios.post(`${API_BASE}/refresh`, {
      refreshToken,
    });

    const newToken = res.data.token;

    localStorage.setItem("accessToken", newToken);
    return newToken;
  } catch (err) {
    console.error("Error al renovar el token:", err);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
    return null;
  }
};

export default renewToken;

