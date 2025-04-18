import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../../hooks/Registro/useRegister";
import { showError } from "../../../utils/alerts";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  const { register } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showError({ text: "El email es obligatorio" });
    } else if (!user.trim()) {
      showError({ text: "El username es obligatorio" });
    } else if (!pass.trim()) {
      showError({ text: "La contraseña es obligatoria" });
    } else {
      register(email, pass, user);
    }
  };
  
  const goToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 fw-bold">Crear Cuenta</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(e) => setUser(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/login")}
            >
              Ir a Login
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <span
            onClick={goToForgotPassword}
            className="text-decoration-none"
            style={{ color: "#0d6efd", cursor: "pointer" }}
          >
            ¿Olvidaste tu contraseña?
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
