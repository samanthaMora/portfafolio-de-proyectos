import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { showSuccess, showError } from "../../utils/alerts";

const useVerify = () => {
  const [status, setStatus] = useState("loading");
  const { token } = useParams(); // ✅ aquí va el cambio

  useEffect(() => {
    if (!token) {
      setStatus("missing");
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/verify/${token}`);
        if (res.status === 200) {
          setStatus("success");
          showSuccess({ text: res.data.message || "Correo verificado correctamente" });
        }
      } catch (err) {
        console.error("Verificación fallida:", err);
        setStatus("error");
        showError({ text: "Token inválido o expirado." });
        // Puedes navegar a /verify-failed si quieres también
      }
    };

    verify();
  }, [token]);

  return status;
};

export default useVerify;

