import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showLoading, showError } from "../../utils/alerts";
import Swal from "sweetalert2";

const useForgotPassword = () => {
  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const sendRecovery = async (email) => {
    try {
      showLoading({ title: "Enviando correo..." });

      await axios.post(`${API_BASE}/RecoveryEmail`, { email });

      Swal.close();
      navigate("/recovery-success");
    } catch (err) {
      Swal.close();
      console.error(err);
      navigate("/recovery-failed");
    }
  };

  return { sendRecovery };
};

export default useForgotPassword;
