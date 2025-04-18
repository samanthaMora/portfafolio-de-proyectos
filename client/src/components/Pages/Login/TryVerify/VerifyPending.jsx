import { useNavigate } from "react-router-dom";

const VerifyPending = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <div className="alert alert-info p-4" role="alert">
        <h4 className="alert-heading">Revisa tu correo</h4>
        <p>
          Te hemos enviado un enlace para verificar tu cuenta. Haz clic en el
          enlace para activar tu cuenta.
        </p>
        <hr />
        <button className="btn btn-secondary mt-2" onClick={() => navigate("/login")}>
          Volver al Login
        </button>
      </div>
    </div>
  );
};

export default VerifyPending;
