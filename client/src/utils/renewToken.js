import axios from "axios";

const renewToken = async () => {
  try {
    const res = await axios.post("http://localhost:3000/refresh", {}, {
      withCredentials: true,
    });

    const newToken = res.data.token;

    localStorage.setItem("token", newToken);
    return newToken;
  } catch (err) {
    console.error("Error al renovar el token:", err);
    localStorage.removeItem("token");
    window.location.href = "/";
    return null;
  }
};

export default renewToken;
