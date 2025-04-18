import { useNavigate } from "react-router-dom";

const VerifySuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h3 className="text-success">Tu correo fue verificado correctamente</h3>
      <p className="mt-3">Ahora puedes iniciar sesión</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/login")}>
        Ir a Login
      </button>
    </div>
  );
};

export default VerifySuccess;

