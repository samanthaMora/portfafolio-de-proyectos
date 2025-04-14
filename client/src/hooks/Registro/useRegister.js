import { useNavigate } from "react-router-dom";
import axios from "axios";

const useRegister = () => {
    const navigate = useNavigate();
  
    const register = async (email, pass, user) => {
      const data = { email, pass, user };
  
      try {
        const res = await axios.post("http://localhost:3000/register", data, {
          withCredentials: true,
        });
        alert("Usuario registrado exitosamente");
        navigate("/");
      } catch (err) {
        if (err.response?.status === 409) {
          alert("El correo ya está registrado.");
        } else {
          console.error(err);
          alert("Registro fallido. Intenta más tarde.");
        }
      }
    };
  
    return { register };
  };
  
  export default useRegister;