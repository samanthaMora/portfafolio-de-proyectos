import { useNavigate } from "react-router-dom";

const VerifyFailed = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h4 className="text-danger">No se pudo verificar tu cuenta</h4>
      <p>{message}</p>
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/login")}>
        Volver al inicio
      </button>
    </div>
  );
};

export default VerifyFailed;
