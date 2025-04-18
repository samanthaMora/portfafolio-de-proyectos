import useVerify from "../../../../hooks/Verify/useVerify.js";
import VerifySuccess from "./VerifySuccess.jsx";
import VerifyFailed from "./VerifyFailed.jsx";

const VerifyEmail = () => {
  const status = useVerify();

  if (status === "loading") {
    return <p className="text-center mt-5">Verificando correo...</p>;
  }

  if (status === "missing") {
    return <VerifyFailed message="Falta el token de verificación." />;
  }

  if (status === "success") {
    return <VerifySuccess />;
  }

  if (status === "error") {
    return <VerifyFailed message="Token inválido o expirado." />;
  }

  return null;
};

export default VerifyEmail;

