import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showLoading, showError } from "../../utils/alerts";
import Swal from "sweetalert2";

const useForgotPassword = () => {
  const navigate = useNavigate();

  const sendRecovery = async (email) => {
    try {
      showLoading({ title: "Enviando correo..." });

      await axios.post("http://localhost:3000/RecoveryEmail", { email });

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
