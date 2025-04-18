import { useEffect, useState } from "react";
import axios from "axios";
import renewToken from "../../utils/renewToken.js"; // ajusta la ruta si es necesario

const useAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchAvatar = async (token) => {
      const res = await axios.get("http://localhost:3000/get-avatar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvatarUrl(`http://localhost:3000${res.data.avatarUrl}`);
    };

    const loadAvatar = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        await fetchAvatar(token);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          try {
            const newToken = await renewToken();
            if (!newToken) throw new Error("No se pudo renovar el token");
            await fetchAvatar(newToken);
          } catch (renewError) {
            console.error("Error al renovar el token o volver a intentar:", renewError);
          }
        } else {
          console.error("Error al obtener avatar:", error);
        }
      }
    };

    loadAvatar();
  }, []);

  return avatarUrl;
};

export default useAvatar;
