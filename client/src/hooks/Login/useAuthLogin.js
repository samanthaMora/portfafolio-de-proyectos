import { useNavigate } from "react-router-dom";
import axios from "axios";
import parseJwt from "../../utils/parseJwt";

const useAuthLogin = () => {
  const navigate = useNavigate();

  const login = async (email, pass) => {
    const data = { email, pass };

    try {
      const res = await axios.post("http://localhost:3000/login", data, {
        withCredentials: true,
      });
      const { token } = res.data;

      localStorage.setItem("token", token);

      const decoded = parseJwt(token);
      console.log("Usuario autenticado:", decoded);
      alert("Login exitoso");

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Credenciales inválidas");
    }
  };

  return { login };
};

export default useAuthLogin;
