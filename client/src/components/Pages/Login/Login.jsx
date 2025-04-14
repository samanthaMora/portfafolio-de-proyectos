import React, { useState } from "react";
import useAuthLogin from "../../../hooks/Login/useAuthLogin.js";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "../../Pages/shared/Backgrounds/ParticlesBackground.jsx";
import "../../../styles/card.css"; // Asegúrate de que exista y esté bien importado

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

  return (
    <>
    <ParticlesBackground/>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form
          className="card-glass"
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4 fw-bold">Login</h3>

          <div className="mb-3">
            <label className="form-label">Correo electrónico:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={goToRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;


