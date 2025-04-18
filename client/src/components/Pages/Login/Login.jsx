import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import useAuthLogin from "../../../hooks/Login/useAuthLogin.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { login } = useAuthLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, pass);
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        className="p-4 border rounded shadow"
        style={{ minWidth: "320px", backgroundColor: "#fff" }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-4 fw-bold">Iniciar sesión</h3>

        <div className="mb-3">
          <label className="form-label">Correo electrónico:</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
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
            Login
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={goToRegister}
          >
            Ir a Registro
          </button>
        </div>
        
        <div className="text-center mt-3">
          <span
            onClick={goToForgotPassword}
            className="text-decoration-none"
            style={{ color: "#0d6efd", cursor: "pointer" }}
          >
            ¿Olvidaste tu contraseña?
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
