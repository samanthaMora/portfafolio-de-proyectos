import { useState } from "react";
import useValidateToken from "../../../../hooks/Recovery/useValidateToken.js";
import useResetPassword from "../../../../hooks/Recovery/useResetPassword.js";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { status, email } = useValidateToken();
  const [newPassword, setNewPassword] = useState("");

  const { resetPassword } = useResetPassword();
  const { token } = useParams();

  const handleReset = (e) => {
    e.preventDefault();
    if (newPassword.trim()) {
      resetPassword(token, newPassword);
    }
  };

  if (status === "loading")
    return <p className="text-center mt-5">Verificando enlace...</p>;
  if (status === "invalid")
    return (
      <p className="text-center mt-5 text-danger">
        El enlace es inválido o ha expirado.
      </p>
    );

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleReset}
        className="border rounded shadow p-5 bg-white"
      >
        <h3 className="mb-4 text-center">Restablecer contraseña</h3>
        <input
          type="password"
          placeholder="Nueva contraseña"
          className="form-control mb-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Cambiar contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
