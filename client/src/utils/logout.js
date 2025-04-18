import axios from "axios";

const logout = async () => {
  try {
    await axios.post("http://localhost:3000/logout");
  } catch (err) {
    console.error("Error al cerrar sesión:", err);
  }

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

export default logout;
