import axios from "axios";

const renewToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const res = await axios.post("http://localhost:3000/refresh", {
      refreshToken,
    });

    const newToken = res.data.token;
    localStorage.setItem("token", newToken);
    return newToken;
  } catch (err) {
    console.error("Error al renovar el token:", err);
    
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    window.location.href = "/";

    return null;
  }
};

export default renewToken;
