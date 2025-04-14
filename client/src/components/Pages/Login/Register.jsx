import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../../hooks/Registro/useRegister";
import ParticlesBackground from "../../Pages/shared/Backgrounds/ParticlesBackground";
import "../../../styles/card.css"

function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  const { register } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    !email.trim()
      ? alert("El email es obligatorio")
      : !user.trim()
      ? alert("El username es obligatorio")
      : !pass.trim()
      ? alert("La contraseña es obligatoria")
      : register(email, pass, user);
  };

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <>
      <ParticlesBackground />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form
          className="p-4 border rounded shadow card-glass"
          style={{ minWidth: "300px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          onSubmit={handleSubmit}
        >
          <h3 className="text-center mb-4">Registro</h3>

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
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre de usuario"
              onChange={(e) => setUser(e.target.value)}
              required
              autoComplete="username"
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
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={goToLogin}
            >
              Ir a Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
