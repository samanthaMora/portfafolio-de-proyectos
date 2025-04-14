import { useState, useEffect } from "react";
import axios from "axios";
import useAuthReady from "../General/useAuthReady.js";

const usePerfil = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const ready = useAuthReady();

  useEffect(() => {
    if (!ready) return;

    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.post(
          "http://localhost:3000/perfil",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(res.data);
      } catch (err) {
        console.error("Error al obtener el perfil:", err);
        setError("No se pudo cargar el perfil");
      }
    };

    fetchPerfil();
  }, [ready]);

  return { userData, error };
};

export default usePerfil;
