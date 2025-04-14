import axios from "axios";

const logout = async () => {
  try {
    await axios.post("http://localhost:3000/logout", {}, {
      withCredentials: true,
    });
  } catch (err) {
    console.error("Error al cerrar sesión:", err);
  }

  localStorage.removeItem("token");
  window.location.href = "/";
};

export default logout;


  