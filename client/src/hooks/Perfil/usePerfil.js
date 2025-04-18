import { useState, useEffect } from "react";
import axios from "axios";
import renewToken from "../../utils/renewToken";

const usePerfil = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPerfil = async () => {
      let token = localStorage.getItem("accessToken");

      try {
        const res = await axios.get("http://localhost:3000/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
      } catch (err) {
        if (err.response?.status === 403) {
          const newToken = await renewToken();
          if (newToken) {
            try {
              const res2 = await axios.get("http://localhost:3000/perfil", {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              });
              setUserData(res2.data);
            } catch (e2) {
              setError("No se pudo obtener el perfil tras renovar token.");
            }
          } else {
            setError("Sesión expirada. Por favor inicia sesión.");
          }
        } else {
          setError("Error al obtener el perfil.");
        }
      }
    };

    fetchPerfil();
  }, []);

  return { userData, error };
};

export default usePerfil;
