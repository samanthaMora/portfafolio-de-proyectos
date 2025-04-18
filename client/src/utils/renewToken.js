import axios from "axios";

const renewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const res = await axios.post("http://localhost:3000/refresh", {
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

