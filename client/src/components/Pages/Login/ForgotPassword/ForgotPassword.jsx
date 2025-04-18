import { useState } from "react";
import useForgotPassword from "../../../../hooks/Recovery/useForgotPassword.js";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { sendRecovery } = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRecovery(email);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-5 shadow" style={{ width: "100%", maxWidth: "600px" }}>
        <h2 className="mb-3 fw-bold text-center">¿Olvidaste tu contraseña?</h2>
        <p className="text-muted text-center mb-4">
          Ingresa tu correo electrónico y te enviaremos un enlace para recuperar el acceso.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="form-label">Correo electrónico</label>
          <div className="input-group mb-4">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 fw-semibold" type="submit">
            Enviar enlace de recuperación
          </button>
        </form>

        <div className="text-center mt-4">
          <button className="btn btn-link text-decoration-none" onClick={() => navigate("/login")}>
            Volver al login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;




